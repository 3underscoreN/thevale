import { createAzure } from '@ai-sdk/azure';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import prompt from './prompt.json';

import { redis } from '@/app/api/redisdb';
import { Ratelimit } from '@upstash/ratelimit';

import { Laminar, getTracer } from '@lmnr-ai/lmnr';

import { NextRequest, NextResponse } from 'next/server';

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
  const ip = request.headers.get('x-real-ip') ?? "generic-ip";
  const { success } = await rateLimit.limit(ip);

  if (!success) {
    return new NextResponse("Rate limit exceeded", { status: 429 });
  }

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

      try {
        await Laminar.flush();
      } catch (error) {
        // Optionally log the error or handle it as needed
        console.error('Error flushing Laminar:', error);
      }
    }
  });
}