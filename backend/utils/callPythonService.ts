import axios from 'axios';

// Define the expected return type of the Python service
interface PythonServiceResponse {
    keywords: string[];
    summary: string;
}

async function callPythonService(text: string): Promise<PythonServiceResponse> {
    try {
        const response = await axios.post<PythonServiceResponse>('http://techdoc_python_service:5001/endpoint', { text });
        return response.data;
    } catch (error) {
        console.error('Error calling Python service:', error);
        throw error;
    }
}

export default callPythonService;
