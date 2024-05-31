"use client"
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorAlert from '../components/ErrorAlert'
import LoadingSpinner from '../components/LoadingSpinner'
import { showToast } from '../components/ToastNotifier'
import useRegister from '../hooks/useRegister'
import LayoutContainer from '../components/LayoutContainer'

const schema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters long'),
});

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<FormData>({ resolver: zodResolver(schema),});
  const { mutate: registerUser, isLoading, isError, error } = useRegister();

  const onSubmit = (data: FormData) => {
    registerUser(data)
  };
 
  
  return (
    <LayoutContainer>
    <div className="flex items-center justify-center min-h-screen bg-base-200">
     {isLoading || isSubmitting ? <LoadingSpinner /> : (
   <div className="card w-full max-w-xs md:max-w-md lg:max-w-lg bg-base-100 shadow-xl p-5">
      {/* Consistent Welcome Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-500 rounded-lg p-8 shadow-xl mb-6 transform transition duration-500 hover:scale-105 text-center">
        <h1 className="text-xl font-bold text-white">Join TechDocAI</h1>
        <p className="text-sm text-gray-100 mt-2">Start creating and managing your technical documentation with ease.</p>
      </div>
      
      <div className="card bg-base-100 shadow-xl p-5">
        <div className="card-body">
        <h2 className="card-title justify-center text-center text-3xl font-bold mb-4">Create Your Account</h2>         
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
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
            <div className="form-control mb-4">
              <label className="input input-bordered flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                <input 
                 {...register('email')}
                  type="email" 
                  placeholder="Email" 
                  className="grow w-full sm:w-3/4" 
                  required
                />
              </label>
                   {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="form-control mb-4">
              <label className="input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
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
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
          {isError && error && <ErrorAlert message={error.message} />}
        </div>
        
      </div>
    </div>
     )}
  </div>
  </LayoutContainer>
  )
}


export default RegisterPage