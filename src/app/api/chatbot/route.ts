import { createAzure } from '@ai-sdk/azure'
import { streamText, UIMessage, convertToModelMessages } from 'ai'

import { redis } from '@/app/api/redisdb'
import { Ratelimit } from '@upstash/ratelimit'

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

  const message: { messages: UIMessage[] } = await request.json();

  const result = await streamText({
    model: azure("gpt-4o-mini"),
    messages: convertToModelMessages(message.messages),
    maxRetries: 1,
  });

  return result.toUIMessageStreamResponse();
}