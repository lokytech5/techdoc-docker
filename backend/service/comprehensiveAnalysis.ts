import { eslintAnalysis } from "./eslintAnalysisService";
import { analyzeCodeSnippet } from "./openaiService2";


interface AnalysisReport {
    openAIAnalysis: string;
    eslintAnalysis: string;
}

export async function comprehensiveCodeAnalysis(codeSnippet: string): Promise<AnalysisReport> {
    const openAIAnalysis = await analyzeCodeSnippet(codeSnippet);
    const eslintAnalysisResult = await eslintAnalysis(codeSnippet);

    return {
        openAIAnalysis,
        eslintAnalysis: eslintAnalysisResult,
    };
}
