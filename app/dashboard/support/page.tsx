'use client';

import { useStartChatMutation } from '@/features/chat/chatSlice';
import { useEffect, useRef, useState } from 'react';

import ChatApp from '@/components/partials/chat/chat-interface';

export default function AnonymousChat() {
  const messageRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState('');
  const [selectedDealer, setSelectedDealer] = useState('');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '5151',
      isMe: false,
      message:
        'Hello, I am Clara, from Teez AI. How can I assist you with your vehicle parts inventory today?',
      timestamp: '2025-05-07T12:00:00Z',
    },
  ]);

  const [startChat, { isLoading, error }] = useStartChatMutation();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleEmojiClick = (e: any) => {
    setMessage((prevMessage) => prevMessage + e.native);
  };

  const handleMessageSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    // clear the input field
    setMessage('');
    const newMessage = {
      id: Date.now().toString(),
      isMe: true,
      message: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await startChat({
        message,
        email: email || 'example@gmail.com',
        dealer_id: 1 || 'selectedDealer', // hard coded set the dealer id for now
      }).unwrap();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (Date.now() + 1).toString(),
          isMe: false,
          message: response.response,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="h-[calc(100vh-150px)] overflow-hidden flex flex-col justify-center">
      <div className="flex-1">
        <ChatApp
          isLoading={isLoading}
          isError={!!error}
          message={message}
          messages={messages}
          onMessageChange={(e) => setMessage(e.target.value)}
          messageRef={messageRef}
          messagesRef={messagesRef}
          onEmojiClick={handleEmojiClick}
          onMessageSend={handleMessageSend}
          selectedDealer={selectedDealer}
        />
      </div>
    </div>
  );
}
