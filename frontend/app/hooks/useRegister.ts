import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { RegisterUserData, RegisterUserResponse } from '../components/types';
import { AxiosError } from 'axios';
import useUserStore from '../components/useUserStore';
import { apiClient } from '../components/api-client';
import usePageStore from '../components/usePageStore';
import { showToast } from '../components/ToastNotifier';
import { useRouter } from 'next/navigation';

interface ErrorResponse {
    error?: string;
    msg?: string;
  }

const useRegister = (): UseMutationResult<RegisterUserResponse, AxiosError<ErrorResponse>, RegisterUserData> => {
    const { setError } = useUserStore.getState();
   
    const router = useRouter();

    return useMutation<RegisterUserResponse, AxiosError<ErrorResponse>, RegisterUserData>(
      (userData: RegisterUserData) => {
        return apiClient.post<RegisterUserResponse>('/users/add-user', userData)
          .then(response => response.data);
      },
      {
        onSuccess: (data) => {
          showToast('Registration successful, please log in.', 'success'); // Show success message
          setTimeout(() => {
            router.push('/login')
          }, 3000);
        
        },
        onError: (error: AxiosError<ErrorResponse>) => {
          let errorMessage = error.response?.data?.error || error.response?.data?.msg || 'An unexpected error occurred';
          setError(errorMessage);
          console.error('Registration failed:', errorMessage);
          showToast('Registration failed', 'error');
      },
      }
    );
  };

export default useRegister