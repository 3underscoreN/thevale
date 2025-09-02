import { createAzure } from '@ai-sdk/azure'
import { streamText, UIMessage, convertToModelMessages } from 'ai'

import { NextRequest } from 'next/server';

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

export async function POST(request: NextRequest) {
  const message: { messages: UIMessage[] } = await request.json();

  const result = await streamText({
    model: azure("gpt-4o-mini"),
    messages: convertToModelMessages(message.messages)
  });

  return result.toUIMessageStreamResponse();
}