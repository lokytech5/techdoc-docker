import axios from 'axios';

// Define the expected return type of the Python service
interface PythonServiceResponse {
    keywords: string[];
    summary: string;
}

async function callPythonService(text: string): Promise<PythonServiceResponse> {
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://techdoc_python_service:5001';
    try {
        const response = await axios.post<PythonServiceResponse>(`${pythonServiceUrl}/endpoint`, { text });
        return response.data;
    } catch (error) {
        console.error('Error calling Python service:', error);
        throw error;
    }
}

export default callPythonService;
