import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { authApiClient } from '../components/api-client';
import { AxiosError } from 'axios';

interface ErrorResponse {
    error: string;
}

const useFetchRemoveProject = () => {
    const queryClient = useQueryClient();

    return useMutation(
      (projectId: string) => authApiClient.delete(`/projects/${projectId}`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['projects']);
          console.info('Project deleted successfully');
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const errorMessage = error.response?.data.error || error.message;
            console.error('Error deleting project:', errorMessage);
        }
      }
    );
  };

export default useFetchRemoveProject