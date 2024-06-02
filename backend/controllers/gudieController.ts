// src/controllers/guideController.ts
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { generateTechnicalGuide } from '../service/openaiService';
import { generateTechnicalGuide2 } from '../service/openaiService2';
import callPythonService from '../utils/callPythonService';


interface ProjectData {
    name: string;
    description: string;
    repository_url?: string | null;
    technicalStack?: string | null;
    goals?: string | null;
    additionalDocs?: string | null;
}


const prisma = new PrismaClient();


function buildPrompt(projectData: ProjectData, customRequest: string): string {
    let prompt = '';

    if (customRequest.toLowerCase().includes("ux design guide")) {
        prompt = `Create a detailed UX Design Documentation for the project: ${projectData.name}.`;
        prompt += `\n- Description: ${projectData.description}`;
        prompt += `\n- Technical Stack: ${projectData.technicalStack}`;
        prompt += `\n- Repository URL: ${projectData.repository_url}`;
        prompt += `\n\nPlease include sections on:\n1. Introduction: Overview of the project and its design goals.\n2. User Research: Insights and findings from user research.\n3. Personas: Detailed description of user personas.\n4. User Journey Maps: Visual representation of user interactions.\n5. Wireframes: Low-fidelity wireframes for each major screen.\n6. Prototypes: High-fidelity prototypes and interactive demos.\n7. Usability Testing: Test scenarios, results, and improvements.\n8. Design Specifications: Detailed design guidelines and specifications.\n\nThank you.`;
    } else if (customRequest.toLowerCase().includes("user documentation")) {
        prompt = `Create a detailed User Documentation for the project: ${projectData.name}.`;
        prompt += `\n- Description: ${projectData.description}`;
        prompt += `\n- Technical Stack: ${projectData.technicalStack}`;
        prompt += `\n- Repository URL: ${projectData.repository_url}`;
        prompt += `\n\nPlease include sections on:\n1. Introduction: Overview of the project and its objectives.\n2. Getting Started: Steps to set up and start using the project.\n3. Features: Description of the main features and how to use them.\n4. Troubleshooting: Common issues and their solutions.\n5. FAQ: Frequently asked questions and their answers.\n6. Contact Information: How to get support or report issues.\n\nThank you.`;
    } else if (["hello", "hi", "hey"].some(greeting => customRequest.toLowerCase().includes(greeting))) {
        prompt = `You are a helpful assistant. Respond to the user's greeting in a friendly and helpful manner.`;
    } else {
        prompt = `Create a detailed technical guide for the project: ${projectData.name}.`;
        prompt += `\n- Description: ${projectData.description}`;
        prompt += `\n- Technical Stack: ${projectData.technicalStack}`;
        prompt += `\n- Repository URL: ${projectData.repository_url}`;
        prompt += `\n\nPlease include sections on introduction, setup, and troubleshooting.`;
    }

    return prompt;
}

export const generateCustomGuide = async (req: Request, res: Response) => {
 const { sections, customRequest} = req.body as { sections: string[], customRequest?: string };
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
        where: { id: projectId },
    });

    if (!project) {
        return res.status(404).send({ error: 'Project not found' });
    }

    const projectData: ProjectData = {
        name: project.name,
        description: project.description,
        repository_url: project.repository_url,
        technicalStack: project.technicalStack,
    };

    const prompt = buildPrompt(projectData, customRequest || "");

    try {
        //call python script
        const pythonResult = await callPythonService(projectData.description);
        
        const guideContent = await generateTechnicalGuide2(projectData, prompt);
        const guide = await prisma.guide.create({
            data: {
                projectId,
                title: `Guide for ${projectData.name}`,
                content: guideContent,
                selections: JSON.stringify(sections),
                customRequest,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        res.status(201).send({ message: 'Guide generated successfully', guide: guideContent, pythonResult: pythonResult  });
    } catch (error) {
        console.error('Failed to generate guide:', error);
        res.status(500).send({ error: 'Failed to generate guide', details: error });
    }
 };

export const getGuideById = async (req: Request, res: Response) => {
    const { guideId } = req.params;
    const prisma = new PrismaClient();

    try {
        const guide = await prisma.guide.findUnique({
            where: { id: guideId },
        });

        if (!guide) {
            return res.status(404).send({ error: 'Guide not found' });
        }

        res.status(200).send(guide);
    } catch (error) {
        console.error('Failed to retrieve guide:', error);
        res.status(500).send({ error: 'Failed to retrieve guide' });
    }
};

export const getUserGuides = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const userId = req.user?.id;  // Extracting the user ID from the request
    const prisma = new PrismaClient();

    if (!userId) {
        return res.status(401).send({ error: 'Unauthorized access' });
    }

    try {
        // Fetch guides by finding all projects associated with the user, and then fetching guides for those projects
        const projectsWithGuides = await prisma.project.findMany({
            where: {
                userId: userId  // Filter projects by user ID
            },
            include: {
                guides: {
                    skip: skip,
                    take: limit,
                    orderBy: {
                        created_at: 'desc'
                    }
                }
            }
        });

        // Define the type for the accumulator to prevent type errors
        const userGuides = projectsWithGuides.reduce((acc: typeof projectsWithGuides[0]['guides'], project) => {
            return acc.concat(project.guides);
        }, []);

        res.status(200).send(userGuides);
    } catch (error) {
        console.error('Failed to retrieve guides:', error);
        res.status(500).send({ error: 'Failed to retrieve guides' });
    }
};

export const getGuidesByProjectId = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const prisma = new PrismaClient();

    try {
        // First, check if the project exists
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        });

        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

        // Fetch all guides associated with the project
        const guides = await prisma.guide.findMany({
            where: { projectId: projectId },
            orderBy: {
                created_at: 'desc'
            }
        });

        if (guides.length === 0) {
            return res.status(404).send({ error: 'No guides found for this project' });
        }

        res.status(200).send(guides);
    } catch (error) {
        console.error('Failed to retrieve guides:', error);
        res.status(500).send({ error: 'Failed to retrieve guides' });
    }
};


