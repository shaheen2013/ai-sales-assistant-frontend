'use client';

import { useStartChatMutation } from '@/features/chat/chatSlice';
import { useEffect, useRef, useState } from 'react';

import Header from '@/components/header';
import AISalesInitializer from '@/components/partials/chat/ai-sales-initializer';
import ChatApp from '@/components/partials/chat/chat-interface';

export default function AnonymousChat() {
  const messageRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const [email, setEmail] = useState('');
  const [selectedDealer, setSelectedDealer] = useState('');
  const [initiateChat, setInitiateChat] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '5151',
      isMe: false,
      message: 'Hello! How can I help you?',
      timestamp: '2025-05-07T12:00:00Z',
    },
  ]);

  const [startChat, { isLoading }] = useStartChatMutation();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleDealerChange = (value: string) => {
    console.log('value in dealer change', value);
    setSelectedDealer(value);
  };

  const handleEmojiClick = (e: any) => {
    setMessage((prevMessage) => prevMessage + e.native);
  };

  const handleEmailSubmit = async () => {
    if (email && selectedDealer) {
      try {
        setInitiateChat(true);
      } catch (error) {
        console.error('Email or Dealer ID Not found', error);
      }
    }
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
        email: email,
        dealer_id: 1, // hard coded set the dealer id for now
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
    <div className="h-[calc(100vh)] overflow-hidden flex flex-col justify-center">
      <Header />
      <div className="flex-1">
        {!initiateChat ? (
          <AISalesInitializer
            emailValue={email}
            selectedDealer={selectedDealer}
            onEmailChange={handleEmailChange}
            onDealerChange={handleDealerChange}
            onEmailSubmit={handleEmailSubmit}
          />
        ) : (
          <ChatApp
            isLoading={isLoading}
            message={message}
            onMessageChange={(e) => setMessage(e.target.value)}
            onEmojiClick={handleEmojiClick}
            messageRef={messageRef}
            messagesRef={messagesRef}
            messages={messages}
            onMessageSend={handleMessageSend}
            selectedDealer={selectedDealer}
          />
        )}
      </div>
    </div>
  );
}
