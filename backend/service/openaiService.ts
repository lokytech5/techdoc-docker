
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not set');
}

interface ProjectData {
    name: string;
    description: string;
    repository_url?: string | null;
    technicalStack?: string | null;
    goals?: string | null;
    additionalDocs?: string | null;
}

async function generateTechnicalGuide(projectData: ProjectData, customPrompt: string): Promise<string> {
    const messages = [
        { role: "system", content: "You are a helpful assistant designed to generate detailed technical guides." },
        { role: "user", content: customPrompt }
    ];



    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 4000,
            temperature: 0.4,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["### END ###"]
        });

        if (response.choices && response.choices.length > 0 && response.choices[0].message && response.choices[0].message.content) {
            return response.choices[0].message.content.trim();
        } else {
            throw new Error('No completion found or content is missing.');
        }
    } catch (error) {
        console.error('Failed to generate technical guide:', error);
        throw new Error('Failed to generate technical guide');
    }
}

export { generateTechnicalGuide };
