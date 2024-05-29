import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { generateTechnicalGuide } from '../service/openaiService';

interface ProjectData {
    name: string;
    description: string;
    repository_url?: string | null;
    technicalStack?: string | null;
    goals?: string | null;
    additionalDocs?: string | null;
}


const prisma = new PrismaClient();


function buildPrompt(projectData: ProjectData, sections: string[], customRequest?: string): string{
    let prompt = `Create a detailed technical guide for the project: ${projectData.name}.`;
    if (sections.includes("introduction")) {
        prompt += "\n- Introduction: Provide a thorough overview of the project.";
    }
    if (sections.includes("setup")) {
        prompt += "\n- Setup: Describe the installation process and initial configuration.";
    }
    if (customRequest) {
        prompt += `\n- Custom Request: ${customRequest}`;
    }
    return prompt;
}


export const generateGuide = async (req: Request, res: Response) => {
    const { sections, customRequest } = req.body as { sections: string[], customRequest?: string };
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
        goals: project.goals,
        additionalDocs: project.additionalDocs
    };

    const prompt = buildPrompt(projectData, sections, customRequest);

    try {
        const guideContent = await generateTechnicalGuide(projectData, prompt);
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

        res.status(201).send({ message: 'Guide generated successfully', guide: guideContent });
    } catch (error) {
        console.error('Failed to generate guide:', error);
        res.status(500).send({ error: 'Failed to generate guide', details: error });
    }
 };


export const getGuideById = async (req: Request, res: Response) => {
    const { guideId } = req.params;

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
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).send({ error: 'Unauthorized access' });
    }

    try {

        const projectsWithGuides = await prisma.project.findMany({
            where: {
                userId: userId 
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

    try {
       
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        });

        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

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
