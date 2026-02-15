"use client";

import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function ChatButton({ isOpen, onClick }: ChatButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
        fixed bottom-8 right-8 z-[9999] flex items-center justify-center 
        w-14 h-14 rounded-full shadow-lg transition-transform duration-300 transform 
        hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${isOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'bg-blue-600 hover:bg-blue-700 rotate-0'}
      `}
            aria-label={isOpen ? "Close chat" : "Open chat"}
        >
            {isOpen ? (
                <X className="w-6 h-6 text-white" />
            ) : (
                <MessageCircle className="w-6 h-6 text-white" />
            )}
        </button>
    );
}
