import { NextResponse } from "next/server";
import { generateObject } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { z } from "zod";

// Add detailed logging
console.log("Environment variables:", {
    GROQ_API_KEY: process.env.GROQ_API_KEY ? "Present" : "Missing",
    GROQ_API_KEY_length: process.env.GROQ_API_KEY?.length || 0,
    all_env_vars: Object.keys(process.env)
});

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY || "",
});

console.log("Groq API Key:", process.env.GROQ_API_KEY ? "Present" : "Missing");

const clarifyResearchGoals = async (topic: string) => {
    const prompt = `
    Given the research topic <topic>${topic}</topic>, generate 2-4 clarifying questions to help narrow down the research scope. Focus on identifying:
    - Specific aspects of interest
    - Required depth/complexity level
    - Any particular perspective or excluded sources
    `;

    try {
        const { object } = await generateObject({
            model: groq("mixtral-8x7b-32768"),
            prompt,
            schema: z.object({
                questions: z.array(z.string())
            })
        });

        return object.questions;
    } catch(error) {
        console.log("Error while generating questions: ", error)
        throw error;
    }
}

export async function POST(req: Request) {
    const {topic} = await req.json();
    console.log("Topic: ", topic);

    try {
        const questions = await clarifyResearchGoals(topic);
        console.log("Questions: ", questions)
        return NextResponse.json(questions)
    } catch(error) {
        console.error("Error while generating questions: ", error)
        return NextResponse.json({
            success: false, 
            error: "Failed to generate questions"
        }, {status: 500})
    }
}