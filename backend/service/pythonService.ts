import { spawn } from 'child_process';
import path from 'path';

interface PythonScriptInput {
    text: string;
}

export async function callPythonScript(text: string): Promise<{ keywords: string[], summary: string }> {
    return new Promise((resolve, reject) => {
        const pythonPath = '/opt/venv/bin/python'; // Path to Python binary in the virtual environment
        const scriptPath = '/app/backend/python/model.py'; // Path to your Python script in Docker

        const process = spawn(pythonPath, [scriptPath]);
        let output = '';
        let errorOutput = '';

        process.stdout.on('data', (data) => {
            output += data.toString();
        });

        process.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        process.on('close', (code) => {
            if (code !== 0) {
                console.error('Python script error output:', errorOutput);
                reject(new Error(`Python script exited with code ${code}`));
            } else {
                try {
                    resolve(JSON.parse(output));
                } catch (error) {
                    console.error('Failed to parse Python script output:', output);
                    reject(new Error('Failed to parse Python script output'));
                }
            }
        });

        process.on('error', (err) => {
            console.error('Failed to start subprocess:', err);
            reject(err);
        });

        try {
            process.stdin.write(JSON.stringify({ text }));
            process.stdin.end();
        } catch (error) {
            console.error('Failed to write to subprocess stdin:', error);
            reject(new Error('Failed to write to subprocess stdin'));
        }
    });
}
