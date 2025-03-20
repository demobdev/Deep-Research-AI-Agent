import { generateObject, generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";
import { ActivityTracker, ModelCallOptions, ResearchState } from "./types";
import { MAX_RETRY_ATTEMPTS, RETRY_DELAY_MS } from "./constants";
import { delay } from "./utils";

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY || "",
});

export async function callModel<T>({
    model,
    prompt,
    schema,
    system,
    activityTracker,
    activityType = "generate",
    researchState
}: ModelCallOptions<T> & {
    activityTracker?: ActivityTracker;
    researchState?: ResearchState;
}): Promise<T | string> {
    let attempts = 0;
    let lastError: Error | null = null;

    while (attempts < MAX_RETRY_ATTEMPTS) {
        try {
            if (schema) {
                const { object, usage } = await generateObject({
                    model: groq(model) as any,
                    prompt,
                    system,
                    schema
                });

                if (researchState) {
                    researchState.tokenUsed += usage.totalTokens;
                    researchState.completedSteps++;
                }

                return object;
            } else {
                const { text, usage } = await generateText({
                    model: groq(model) as any,
                    prompt,
                    system,
                });

                if (researchState) {
                    researchState.tokenUsed += usage.totalTokens;
                    researchState.completedSteps++;
                }

                return text;
            }
        } catch (error) {
            attempts++;
            lastError = error instanceof Error ? error : new Error('Unknown error');

            if (attempts < MAX_RETRY_ATTEMPTS) {
                if (activityTracker) {
                    activityTracker.add(activityType, 'warning', `Model call failed, attempt ${attempts}/${MAX_RETRY_ATTEMPTS}. Retrying...`);
                }
                await delay(RETRY_DELAY_MS * attempts);
            }
        }
    }

    throw lastError || new Error(`Failed after ${MAX_RETRY_ATTEMPTS} attempts!`);
}

export async function generateTextWithModel(
    model: string,
    prompt: string,
    system?: string,
    options?: {
        temperature?: number;
        maxTokens?: number;
    }
): Promise<{ text: string; usage: { promptTokens: number; completionTokens: number; totalTokens: number } }> {
    let attempts = 0;
    while (attempts < MAX_RETRY_ATTEMPTS) {
        try {
            const { text, usage } = await generateText({
                model: groq(model) as any,
                prompt,
                system,
                ...options,
            });
            return { text, usage };
        } catch (error) {
            attempts++;
            if (attempts === MAX_RETRY_ATTEMPTS) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        }
    }
    throw new Error(`Failed after ${MAX_RETRY_ATTEMPTS} attempts`);
}