import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.warn("WARNING: OPENAI_API_KEY is not set in environment variables.");
}

const openai = new OpenAI({
    apiKey: apiKey || 'dummy-key', // Prevent crash on initialization, but requests will fail if key is missing
});

export async function POST(req: Request) {
    try {
        console.log("--------------------");
        console.log("Received Chat Request");

        if (!apiKey) {
            console.error("Critical Error: OPENAI_API_KEY is missing on server.");
            return NextResponse.json(
                { error: "Server Configuration Error", details: "API Key missing" },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { messages } = body;

        console.log("Request Payload:", JSON.stringify(messages));

        if (!messages || !Array.isArray(messages)) {
            console.error("Invalid messages format:", messages);
            return NextResponse.json({ error: "No messages provided or invalid format" }, { status: 400 });
        }

        console.log("Sending request to OpenAI...");

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
        });

        console.log("OpenAI Response Received");

        // Extract the message content correctly
        const reply = completion.choices[0].message;

        if (!reply) {
            console.error("No valid message in OpenAI response:", completion);
            return NextResponse.json({ error: "Invalid response from OpenAI" }, { status: 502 });
        }

        console.log("Sending reply to client:", JSON.stringify(reply));
        return NextResponse.json(reply);

    } catch (error: any) {
        console.error("OpenAI API Critical Error:", error);

        let errorMessage = "Error processing request";
        let statusCode = 500;

        if (error?.code === 'insufficient_quota') {
            errorMessage = "You have exceeded your OpenAI API quota. Please check your billing details.";
            statusCode = 429;
        } else if (error?.code === 'invalid_api_key') {
            errorMessage = "Invalid OpenAI API Key. Please check your .env.local file.";
            statusCode = 401;
        } else if (error?.error?.message) {
            errorMessage = error.error.message;
        }

        return NextResponse.json(
            {
                error: errorMessage,
                details: error instanceof Error ? error.message : "Unknown error",
                code: error?.code || 'UNKNOWN'
            },
            { status: statusCode }
        );
    }
}
