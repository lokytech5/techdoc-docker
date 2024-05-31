// src/services/openaiService.ts

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

async function generateTechnicalGuide(projectData: ProjectData): Promise<string> {
    const technicalStackFormatted = projectData.technicalStack ? projectData.technicalStack.split(',').map(tech => tech.trim()).join(', ') : 'Not provided';

    const messages = [
        {
            role: "system",
            content: "You are a helpful assistant designed to generate detailed technical guides. Please follow the structure of Introduction, Setup, Configuration, and Examples."
        },
        {
            role: "user",
            content: `Create a detailed technical guide for the project:
            - Project Name: ${projectData.name}
            - Description: ${projectData.description}
            - Repository URL: ${projectData.repository_url || 'Not provided'}
            - Technical Stack: ${technicalStackFormatted}
            - Goals: ${projectData.goals || 'Not provided'}
            - Additional Documents: ${projectData.additionalDocs || 'Not provided'}

            Structure the guide to include detailed sections on:
            1. Introduction - Provide a thorough overview of the project.
            2. Setup - Describe the installation process and initial configuration.
            3. Configuration - Outline further configuration steps and dependencies.
            4. Usage Examples - Detail how to use the project effectively.
            5. Best Practices - Discuss maintaining and scaling the project.
            6. Troubleshooting - List common issues and their solutions.
            Ensure each section is detailed and informative.`
        }
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
