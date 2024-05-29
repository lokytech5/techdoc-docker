import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { projectSchema } from "../validation/projectValidator";
import { CloudStorageService } from "../service/cloudStorageService";


const prisma = new PrismaClient();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

if(!AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error('Azure Storage Coonection String is not Set');
}

const cloudStorageService = new CloudStorageService(AZURE_STORAGE_CONNECTION_STRING, 'techdoc-api')

export const createProject = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({ error: 'Request body is missing'});
    }

    const file = req.file;
    if(!file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }

    const {error, value} = projectSchema.validate(req.body);

    if(error) {
        return res.status(400).send({ error: error.message });
    }

    const { name, repository_url, description, technicalStack, goals, additionalDocs } = value;

    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).send({ error: 'Unauthorized access' });
    }

    try {
        const blobUrl = await cloudStorageService.uploadFile(file.buffer, file.originalname);

        const project = await prisma.project.create({
            data: {
                name: name,
                repository_url: repository_url,
                description: description,
                userId: userId,
                technicalStack: technicalStack,
                goals: goals,
                additionalDocs: additionalDocs,
                blobUrl: blobUrl
            }
        });
        res.status(201).send({ message: 'Project created successfully', project });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to upload the file' });
    }
    
}

export const getUserProjects = async (req: Request, res: Response) => {
    const page = parseInt (req.query.page as string) || 1;
    const limit = parseInt (req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const userId = req.user?.id;

    if(!userId) {
        return res.status(401).send({error: 'Unauthorized access'})
    }

    try {
        const userProjects = await prisma.project.findMany({
            where: {
                userId: userId,
            },
            skip: skip,
            take: limit
        });
        res.status(200).send(userProjects);
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Failed to retrieve projects' });
    }
}

export const getProjectById = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    const userId = req.user?.id;

    
    if (!userId) {
        return res.status(401).send({ error: 'Unauthorized access' });
    }
    
    try {
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId: userId
            }
        });

        if(project) {
            res.status(200).send(project);
        } else {
            res.status(404).send({ error: 'Project not found' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Failed to retrieve the project' });
    }

}

export const deleteProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).send({ error: 'Unauthorized access' });
    }

    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        });

        if (!project) {
            return res.status(404).send({ error: 'Project not found' });

        } else if (project.userId !== userId) {
            return res.status(403).send({ error: 'Permission denied' });
            
        } else {
            
            await prisma.project.delete({
                where: {
                    id: projectId
                }
            });
        }
        res.status(200).send({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete the project' });
    }
};