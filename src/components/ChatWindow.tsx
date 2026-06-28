"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, X, FileText, Download, User, Bot } from 'lucide-react';

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
        { role: 'assistant', content: "Hey there! 👋 I'm Suriya's friendly assistant. Ask me anything about him — his projects, the tech he loves, what he's like to work with, or grab his resume. What would you like to know?" }
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

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const data = await response.json();
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

    const renderMessageContent = (content: string) => {
        // Find PDF and URL patterns
        const pdfPattern = /(\/[a-zA-Z0-9._-]+\.pdf|https?:\/\/[^\s]+\.pdf)/i;
        const urlPattern = /(https?:\/\/[^\s]+)/i;

        // Single capturing group for split to avoid nested capture issues
        // This regex matches either a PDF path or a standard URL
        const splitPattern = /(\/[a-zA-Z0-9._-]+\.pdf|https?:\/\/[^\s]+)/gi;
        const parts = content.split(splitPattern);

        return parts.map((part, i) => {
            if (!part) return null;

            // Check for PDF match first
            if (part.match(pdfPattern)) {
                return (
                    <a
                        key={i}
                        href={part}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 mt-3 p-3 bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-xl hover:border-[#D7E2EA]/50 transition-all group no-underline"
                    >
                        <div className="p-2.5 bg-[#D7E2EA]/10 rounded-lg group-hover:bg-[#D7E2EA]/20 transition-colors shrink-0">
                            <FileText className="w-6 h-6 text-[#D7E2EA]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-bold text-[#D7E2EA]/60 uppercase tracking-wider mb-0.5">Resume / CV</div>
                            <div className="text-sm font-bold truncate text-[#D7E2EA] italic">Suriya_Resume.pdf</div>
                            <div className="text-[11px] text-[#D7E2EA]/50">PDF Document</div>
                        </div>
                        <Download className="w-5 h-5 text-[#D7E2EA]/50 group-hover:text-[#D7E2EA] transition-colors ml-2" />
                    </a>
                );
            }

            // Check for regular URL matches
            if (part.match(urlPattern)) {
                return (
                    <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline break-all font-semibold hover:opacity-80">
                        {part}
                    </a>
                );
            }

            return <span key={i} className="whitespace-pre-wrap">{part}</span>;
        });
    };

    return (
        <div
            className={`
        fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[550px]
        rounded-[28px] shadow-2xl border border-[#D7E2EA]/20
        flex flex-col overflow-hidden z-[9999] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) origin-bottom-right
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-5 pointer-events-none'}
      `}
            style={{ backgroundColor: "#0C0C0C" }}
        >
            {/* Header */}
            <div className="p-5 flex justify-between items-center border-b border-[#D7E2EA]/15 relative overflow-hidden" style={{ backgroundColor: "#0C0C0C" }}>
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(182,0,168,0.18), transparent 70%)" }}></div>
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-[#D7E2EA]/10 flex items-center justify-center border border-[#D7E2EA]/25">
                        <Bot className="w-6 h-6 text-[#D7E2EA]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-tight text-[#D7E2EA]">Suriya&apos;s Assistant</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D7E2EA]/60">Always Available</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-xl transition-all border border-transparent hover:border-[#D7E2EA]/20 hover:bg-[#D7E2EA]/10 active:scale-95 text-[#D7E2EA]"
                    aria-label="Close chat"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide" style={{ backgroundColor: "#0C0C0C" }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs border ${msg.role === 'user'
                            ? 'bg-[#D7E2EA] border-[#D7E2EA] text-[#0C0C0C]'
                            : 'bg-[#D7E2EA]/10 border-[#D7E2EA]/25 text-[#D7E2EA]'
                            }`}>
                            {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div
                            className={`max-w-[80%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${msg.role === 'user'
                                ? 'bg-[#D7E2EA] text-[#0C0C0C] rounded-tr-none font-medium'
                                : 'bg-[#161616] text-[#D7E2EA] border border-[#D7E2EA]/15 rounded-tl-none'
                                }`}
                        >
                            {renderMessageContent(msg.content)}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-center gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-[#D7E2EA]/10 border border-[#D7E2EA]/25 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-[#D7E2EA]" />
                        </div>
                        <div className="bg-[#161616] border border-[#D7E2EA]/15 text-[#D7E2EA]/70 rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-[#D7E2EA]" />
                            <span className="text-[12px] font-bold uppercase tracking-wider opacity-70">Assistant is typing</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-[#D7E2EA]/15 flex gap-3 items-center sticky bottom-0"
                style={{ backgroundColor: "#0C0C0C" }}
            >
                <div className="flex-1 relative group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about projects, skills, experience..."
                        className="w-full px-5 py-3 bg-[#161616] border border-[#D7E2EA]/20 rounded-2xl focus:outline-none focus:border-[#D7E2EA]/50 text-[14px] text-[#D7E2EA] placeholder-[#D7E2EA]/40 transition-all"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-3.5 bg-[#D7E2EA] text-[#0C0C0C] rounded-2xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center group"
                    aria-label="Send message"
                >
                    <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </form>
        </div>
    );
}
