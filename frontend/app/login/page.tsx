"use client"
import React, { useState } from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useLogin from '../hooks/useLogin';
import useUserStore from '../components/useUserStore';
import { showToast } from '../components/ToastNotifier';
import { SubmitHandler } from 'react-hook-form';
import ErrorAlert from '../components/ErrorAlert';
import LayoutContainer from '../components/LayoutContainer';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(5, 'Password must be at least 5 characters long'),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate: login, isLoading, error } = useLogin();
  const setUser = useUserStore((state) => state.setUser);
const router = useRouter();

const onSubmit: SubmitHandler<FormData> = (data) => {
  login(data, {
    onError: (errorData) => {
      if (error) return <ErrorAlert message={error.message}/>
    }
  });
};


  return (
    <LayoutContainer>

   
    <div className="flex items-center justify-center min-h-screen bg-base-200">
    <div className="card w-full max-w-xs md:max-w-md lg:max-w-lg bg-base-100 shadow-xl p-5">
      {/* Responsive Welcome Banner for small screens */}
      <div className="md:hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg mb-10">
          <h1 className="text-center text-2xl font-bold text-white">Welcome to TechDoc</h1>
          <p className="text-center text-white opacity-80 text-sm">
            Your hub for efficient tech documentation.
          </p>
        </div>
      </div>
      {/* New Banner for Medium and Large Screens */}
      <div className="hidden md:block lg:block">
          <div className="p-4 mb-10 bg-gradient-to-br from-blue-600 to-purple-500 rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-3xl font-bold text-white">Unlock AI-Powered Documentation</h1>
              <p className="text-center text-white text-lg mt-2">
                Transform code into comprehensive guides effortlessly.
              </p>
            </div>
          </div>
        </div>
      {/* Card Body */}
      <div className="card bg-base-100 shadow-xl w-full">
      <div className="card-body">
      <h2 className="card-title justify-center text-center text-3xl font-bold mb-4">Login to Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-6">
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input 
               {...register('username')}  
                type="text" 
                placeholder="Username" 
                className="grow w-full sm:w-3/4"
                required
              />
            </label>
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>
          <div className="form-control mb-6">
            <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 opacity-70">
                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2 a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
              </svg>
              <input 
               {...register('password')}
                type="password" 
                placeholder="Password" 
                className="grow w-full sm:w-3/4" 
                required
              />
            </label>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
              </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>
  </LayoutContainer>
  )
}

export default LoginPage