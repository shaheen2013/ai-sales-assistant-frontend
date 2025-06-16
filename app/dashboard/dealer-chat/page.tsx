'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import AISalesInitializer from '@/components/partials/chat/ai-sales-initializer';
import ChatApp from '@/components/partials/chat/chat-interface';
import { useToast } from '@/hooks/useToast';
import { useDealerChatMutation } from '@/features/chat/chatSlice';
import { useGetPublicDealersQuery } from '@/features/dealer/dealerSlice';
import moment from 'moment';

export default function DealerChat() {
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
    ]);

    const [startChat, { isLoading, error }] = useDealerChatMutation();
    const { data: dealers } = useGetPublicDealersQuery();

    const selectedDealerInfo: any = useMemo(() => {
        return dealers?.find((dealer: any) => dealer?.user?.dealer_details?.id === selectedDealer);
    }, [selectedDealer, dealers]);

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
            setMessages((prevMessages) => {
                const newMessages = prevMessages?.map((message, index) => {
                    if (index === 0) {
                        return {
                            ...message,
                            message: `Hello! I'm Clara from the ${selectedDealerInfo?.business_name || selectedDealerInfo?.user?.email || "N/A"} dealership. To serve you quickly—whether it's checking vehicle availability, booking a test drive or service appointment, or discussing a trade-in—I'll first need a few details. Could you please share your name, email, phone number, and address?`,
                            timestamp: moment().toISOString(),
                        }
                    }
                    return message
                })
                return newMessages
            })
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
                message,
                email,
                dealer_id: selectedDealer,
            }).unwrap();
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: (Date.now() + 1).toString(),
                    isMe: false,
                    message: response.response,
                    timestamp: moment().toISOString(),
                },
            ]);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <div className="h-full overflow-hidden flex flex-col justify-center">
            <div className="flex-1">
                {
                    !initiateChat ? (
                        <AISalesInitializer
                            emailValue={email}
                            onDealerChange={handleDealerChange}
                            onEmailChange={handleEmailChange}
                            onEmailSubmit={handleEmailSubmit}
                            selectedDealer={selectedDealer}
                        />
                    ) : (
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
                    )
                }
            </div>
        </div>
    );
}
