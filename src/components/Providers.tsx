"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useState } from "react";

import Chatbot from "@/components/Chatbot";


export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="portfolio-theme">
                <TooltipProvider>
                    {children}
                    <Toaster />
                    <Sonner />
                    <Chatbot />

                </TooltipProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
