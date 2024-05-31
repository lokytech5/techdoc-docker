import { ESLint } from "eslint";

export async function eslintAnalysis(codeSnippet: string): Promise<string> {
    const eslint = new ESLint({ useEslintrc: true });
    const results = await eslint.lintText(codeSnippet, { filePath: 'file.ts' }); // Specify file path with .ts extension
    return results[0].messages.map(msg => `${msg.message} at line ${msg.line}, column ${msg.column}`).join('\n');
}
