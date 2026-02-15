"use client";

import React, { useState } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen((prev) => !prev);

    return (
        <>
            <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <ChatButton isOpen={isOpen} onClick={toggleChat} />
        </>
    );
}
