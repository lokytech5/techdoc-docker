import { AxiosError } from 'axios';
import React from 'react'
import { showToast } from '../components/ToastNotifier';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ProjectFormData, ProjectResponse } from '../components/types';
import { authApiClient } from '../components/api-client';

interface ErrorResponse {
    error?: string;
    message?: string;
  }

const useFetchAddProject = () => {
    const router = useRouter();
  
    return useMutation<ProjectResponse, AxiosError<ErrorResponse>, ProjectFormData>(
      async (projectData: ProjectFormData) => {
        return authApiClient.post<ProjectResponse>('/projects', projectData).then(response => response.data);
      },
      {
        onSuccess: (data) => {
          showToast('Project created successfully', 'success');
          router.push('/projectList'); // Redirect to the project list or dashboard
        },
        onError: (error: AxiosError<ErrorResponse>) => {
          const errorMessage = error.response?.data.error
          console.error('Failed to add project:', errorMessage);
          showToast('Failed to add project: ' + errorMessage, 'error');
        }
      }
    );

}

export default useFetchAddProject