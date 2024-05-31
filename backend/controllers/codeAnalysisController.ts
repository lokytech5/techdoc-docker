import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { comprehensiveCodeAnalysis } from "../service/comprehensiveAnalysis";

const prisma = new PrismaClient();

export const createAnalysisCode = async (req: Request, res: Response): Promise<void> => {
    const { code } = req.body;

    if (!code) {
        res.status(400).json({ error: 'Code snippet and projectId are required' });
        return;
    }

    try {
        
        const analysisReport = await comprehensiveCodeAnalysis(code);

        // Save the analysis result to the database
        const savedAnalysis = await prisma.codeAnalysis.create({
            data: {
                code,
                openAIAnalysis: analysisReport.openAIAnalysis,
                eslintAnalysis: analysisReport.eslintAnalysis,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        // Respond with the analysis report
        res.status(200).json({ savedAnalysis });
    } catch (error) {
        console.error('Failed to analyze code snippet:', error);
        res.status(500).json({ error: 'Failed to analyze code snippet' });
    }
};
