import { useMutation } from "@tanstack/react-query";
import { LoginUserData, LoginUserResponse } from "../components/types";
import { AxiosError } from "axios";
import { apiClient } from "../components/api-client";
import { showToast } from "../components/ToastNotifier";
import useUserStore from "../components/useUserStore";
import usePageStore from "../components/usePageStore";
import { useRouter } from "next/navigation";


interface LoginErrorResponse {
    error?: string;
    errors?: { msg: string }[];
    message?: string;
  }


  const useLogin = () => {
    const router = useRouter()
    return useMutation<LoginUserResponse, AxiosError<LoginErrorResponse>, LoginUserData>(
        (loginData: LoginUserData) => {
          return apiClient.post<LoginUserResponse>('/auth/login', loginData)
            .then(response => response.data);
        },
        {
          onSuccess: (data) => {
            const setUser = useUserStore.getState().setUser;

            setUser({
              _id: data._id,
              username: data.username,
              email: data.email,
            }, data.token);
           
            showToast('Login successful', 'success');
           router.push('/home')
            },
          onError: (error: AxiosError<LoginErrorResponse>) => {
             // Handle login error
        const errorMessage = error.response?.data?.errors 
        ? error.response.data.errors.map(e => e.msg).join(', ')
        : error.response?.data?.error ?? 'An unexpected error occurred';
        console.error('Login failed:', errorMessage);   
        showToast('Login failed', 'error');
        },
        }
      );
  
}

export default useLogin