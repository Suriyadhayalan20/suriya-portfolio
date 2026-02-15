"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, X } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hi! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        console.log("Sending message:", userMessage);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                console.error("API Error Response:", errorData);
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received AI response:", data);

            if (!data.content) {
                console.warn("Received empty content from API", data);
            }

            setMessages(prev => [...prev, data]);
        } catch (error) {
            console.error('Chat Submission Error:', error);
            const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please check console.";
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: errorMessage }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={`
        fixed bottom-24 right-6 w-[85vw] sm:w-[380px] h-[500px] 
        bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800
        flex flex-col overflow-hidden z-[9999] transition-all duration-300 ease-in-out origin-bottom-right
        ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-5 pointer-events-none'}
      `}
        >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white shadow-md">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    AI Assistant
                </h3>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-blue-700 rounded-full transition-colors sm:hidden"
                    aria-label="Close chat"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-zinc-950 scrollbar-hide">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 border border-gray-200 dark:border-zinc-700 rounded-bl-none'
                                }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 rounded-2xl rounded-bl-none px-4 py-2 text-sm shadow-sm flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            <span className="text-xs font-medium">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
                onSubmit={handleSubmit}
                className="p-3 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex gap-2 items-center"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition-all"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 flex items-center justify-center group"
                    aria-label="Send message"
                >
                    <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </form>
        </div>
    );
}
