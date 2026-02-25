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
        { role: 'assistant', content: "Hi! I'm Suriya's Assistant. How can I help you today? You can ask about my experience, projects, or even my resume!" }
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
                        className="flex items-center gap-3 mt-3 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all shadow-md group no-underline"
                    >
                        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors shrink-0">
                            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">Resume / CV</div>
                            <div className="text-sm font-bold truncate text-zinc-900 dark:text-zinc-100 italic">Suriya_Resume.pdf</div>
                            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">PDF Document • 68 KB</div>
                        </div>
                        <Download className="w-5 h-5 text-zinc-400 group-hover:text-blue-600 transition-colors ml-2" />
                    </a>
                );
            }

            // Check for regular URL matches
            if (part.match(urlPattern)) {
                return (
                    <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all font-semibold">
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
        bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800
        flex flex-col overflow-hidden z-[9999] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) origin-bottom-right
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-5 pointer-events-none'}
      `}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex justify-between items-center text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-tight">Hi! I&apos;m Suriya&apos;s Assistant</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Always Available</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all border border-transparent hover:border-white/20 active:scale-95"
                    aria-label="Close chat"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-zinc-50 dark:bg-zinc-950 scrollbar-hide">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs border ${msg.role === 'user'
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                            }`}>
                            {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div
                            className={`max-w-[80%] px-4 py-3 rounded-2xl text-[14px] shadow-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-tl-none font-medium'
                                }`}
                        >
                            {renderMessageContent(msg.content)}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-center gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-zinc-500" />
                        </div>
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            <span className="text-[12px] font-bold uppercase tracking-wider opacity-60">Assistant is typing</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
                onSubmit={handleSubmit}
                className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex gap-3 items-center sticky bottom-0"
            >
                <div className="flex-1 relative group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about resume, skills, experience..."
                        className="w-full px-5 py-3 bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent rounded-2xl focus:outline-none focus:border-blue-500/50 focus:bg-white dark:focus:bg-zinc-900 text-[14px] text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 transition-all shadow-inner"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-3.5 bg-blue-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl active:scale-95 flex items-center justify-center group"
                    aria-label="Send message"
                >
                    <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </form>
        </div>
    );
}
