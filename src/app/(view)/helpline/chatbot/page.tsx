'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chatbot'
    })
  });
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mt-16 mb-8">聊天機器人</h1>
      
    </div>
  );
}