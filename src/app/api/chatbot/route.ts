import { createAzure } from '@ai-sdk/azure';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

import { redis } from '@/app/api/redisdb';
import { Ratelimit } from '@upstash/ratelimit';

import { Laminar, getTracer } from '@lmnr-ai/lmnr';

import { NextRequest, NextResponse } from 'next/server';

import z from 'zod';
import { routing } from '@/i18n/routing';

const promptSchema = z.object({
  locale: z.enum(routing.locales).default(routing.defaultLocale),
});

export const maxDuration = 30;

const azure = createAzure({
  useDeploymentBasedUrls: true,
  baseURL: process.env.NODE_ENV === 'production'
    ? process.env.AZURE_OPENAI_ENDPOINT
    : process.env.AZURE_OPENAI_ENDPOINT_DEV,
  apiKey: process.env.NODE_ENV === 'production'
    ? process.env.AZURE_OPENAI_API_KEY
    : process.env.AZURE_OPENAI_API_KEY_DEV,
  apiVersion: '2024-10-21',
});

const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
});

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const parsedData = promptSchema.safeParse({
    locale: searchParams.get('locale'),
  });
  
  if (!parsedData.success) {
    return new NextResponse("Invalid request", { status: 400 });
  }

  const ip = request.headers.get('x-real-ip') ?? "generic-ip";
  const { success } = await rateLimit.limit(ip);

  if (!success) {
    return new NextResponse("Rate limit exceeded", { status: 429 });
  }

  const { locale } = parsedData.data;

  const prompt = await import(`@/messages/${locale}/prompt.json`);

  const chatRequest: { messages: UIMessage[] } = await request.json();

  const result = await streamText({
    model: azure("gpt-4o-mini"),
    system: prompt.systemPrompt,
    messages: convertToModelMessages(chatRequest.messages),
    maxRetries: 1,
    experimental_telemetry: {
      isEnabled: true,
      tracer: getTracer(),
    },
  });

  return result.toUIMessageStreamResponse({
    onFinish: async () => {
      await Laminar.flush();
    }
  });
}