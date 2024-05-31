import { AxiosError } from 'axios';
import React from 'react';
import { showToast } from '../components/ToastNotifier';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { CodeAnalysisData, CodeAnalysisResponse } from '../components/types';
import { authApiClient } from '../components/api-client';

export interface ErrorResponse {
    error?: string;
    message?: string;
}

const useFetchCodeAnalysis = () => {
  
    return useMutation<CodeAnalysisResponse, AxiosError<ErrorResponse>, CodeAnalysisData>(
      async (codeData: CodeAnalysisData) => {
        return authApiClient.post<CodeAnalysisResponse>('/analyze/code', codeData).then(response => response.data);
      },
      {
        onSuccess: (data) => {
          showToast('Code analysis completed successfully', 'success');
          // You can handle redirection or any other logic here if needed
        },
        onError: (error: AxiosError<ErrorResponse>) => {
          const errorMessage = error.response?.data.error || 'Unknown error';
          console.error('Failed to analyze code:', errorMessage);
          showToast('Failed to analyze code: ' + errorMessage, 'error');
        }
      }
    );
}

export default useFetchCodeAnalysis;
