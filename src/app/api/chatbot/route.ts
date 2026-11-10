import { createAzure } from '@ai-sdk/azure';
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';

import { Laminar, aiSdkTelemetry } from '@lmnr-ai/lmnr';

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

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const parsedData = promptSchema.safeParse({
    locale: searchParams.get('locale'),
  });
  
  if (!parsedData.success) {
    return new NextResponse("Invalid request", { status: 400 });
  }

  const { locale } = parsedData.data;

  const prompt = await import(`@/messages/${locale}/prompt.json`);

  const chatRequest: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    // Keep using the Chat Completions API, which is what this Azure deployment
    // was configured for. `azure()` now defaults to the Responses API.
    model: azure.chat("gpt-4o-mini"),
    instructions: prompt.systemPrompt,
    messages: await convertToModelMessages(chatRequest.messages),
    maxRetries: 1,
    telemetry: {
      isEnabled: true,
      integrations: aiSdkTelemetry(),
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onFinish: async () => {
        await Laminar.flush();
      },
    }),
  });
}
