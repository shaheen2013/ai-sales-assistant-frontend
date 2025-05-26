'use client';

import { useStartChatMutation } from '@/features/chat/chatSlice';
import { useEffect, useRef, useState } from 'react';

import Header from '@/components/header';
import AISalesInitializer from '@/components/partials/chat/ai-sales-initializer';
import ChatApp from '@/components/partials/chat/chat-interface';
import { useToast } from '@/hooks/useToast';

export default function AnonymousChat() {
  const toast = useToast();
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
      message:
        'Hello, I am Clara, from Teez AI. How can I assist you with your vehicle parts inventory today?',
      timestamp: '2025-05-07T12:00:00Z',
    },
    {
      id: '5151',
      isMe: false,
      message:
        `Hello! I'm your friendly sales assistant for Teez AI, here to help you understand the incredible value of joining our platform. Teez AI is an AI-driven solution specifically designed to empower dealerships like yours with intelligent automation, real-time customer engagement, and streamlined operations.

By becoming a dealer with Teez AI, you'll not only gain access to advanced tools and features that can significantly boost your sales, but you'll also receive personalized support from our admin team. This includes expert onboarding, customized platform configurations, and integration with your existing systems, ensuring a seamless experience.

If you're ready to transform your dealership and enhance your customer interactions, I encourage you to sign up today! You can register through this link: [Join Teez AI](http://localhost:8000/api/dealer-registration/?source=ai&session_id=87882dfb-ca50-418c-a2db-829147262a69).

Don't miss out on the opportunity to elevate your dealership's digital presence! If you have any questions or need assistance, feel free to reach out. I'm here to help you every step of the way!
        `,
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      toast('error', 'Email is invalid');
      return;
    }

    if (!selectedDealer) {
      toast('error', 'Please select a dealer');

      return;
    }

    try {
      setInitiateChat(true);
    } catch (error) {
      console.error('Error initiating chat', error);
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
        question: message,
      }).unwrap();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (Date.now() + 1).toString(),
          isMe: false,
          message: response.answer,
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
