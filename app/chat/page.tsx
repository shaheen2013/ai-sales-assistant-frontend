"use client";

import { useStartChatMutation } from "@/features/chat/chatSlice";
import { useEffect, useRef, useState } from "react";

import Header from "@/components/header";
import ChatApp from "@/components/partials/chat/chat-interface";

type Message = {
  id: string;
  isMe: boolean;
  message: string;
  timestamp: string;
};

export default function AnonymousChat() {
  const messageRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  // const [email, setEmail] = useState("");
  // const [selectedDealer, setSelectedDealer] = useState("");
  // const [initiateChat, setInitiateChat] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    // {
    //   id: "5151",
    //   isMe: false,
    //   message: `Hey! I'm Clara from TEEZ AI — here to get your dealership up and running fast. I can help with onboarding, CRM setup, voice calls, live analytics, and branding. Ready to dive in?`,
    //   timestamp: "2025-05-07T12:00:00Z",
    // },
  ]);

  const [startChat, { isLoading, error }] = useStartChatMutation();

  // Initialize the chat with a welcome message
  useEffect(() => {
    const initialMessage = {
      id: Date.now().toString(),
      isMe: false,
      message: `Hey! I'm Clara from TEEZ AI — here to get your dealership up and running fast. I can help with onboarding, CRM setup, voice calls, live analytics, and branding. Ready to dive in?`,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, initialMessage]);
  }, []);

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
    if (message.trim() === "") return;
    // clear the input field
    setMessage("");

    const newMessage = {
      id: Date.now().toString(),
      isMe: true,
      message: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const payload = {
        question: message,
      };

      const response = await startChat(payload).unwrap();
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
      console.error("Failed to send message:", error);
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
        />
      </div>
    </div>
  );
}
