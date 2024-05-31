"use client"
import React, { useState } from 'react'
import LayoutContainer from '../components/LayoutContainer'
import useFetchCodeAnalysis, { ErrorResponse } from '../hooks/useFetchCodeAnalysis';
import LoadingSpinner from '../components/LoadingSpinner';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Footer from '../components/Footer';
import useUserStore from '../components/useUserStore';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '../components/ConfirmationModal';

const schema = z.object({
  code: z.string().min(1, 'Code snippet is required'),
});

type FormData = z.infer<typeof schema>;


const CodeAnalysisPage = () => {
  const [analysisResult, setAnalysisResult] = useState({ openAIAnalysis: '', eslintAnalysis: '' });
  const { mutate: analyzeCode, isLoading: isAnalyzing, error: analysisError } = useFetchCodeAnalysis();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isAuthenticated, loading } = useUserStore(state => ({
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
  }));

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    analyzeCode(data, {
      onSuccess: (data) => {
        setAnalysisResult({
          openAIAnalysis: data.savedAnalysis.openAIAnalysis,
          eslintAnalysis: data.savedAnalysis.eslintAnalysis
        });
      },
      onError: (error) => {
        console.error('Failed to analyze code:', error);
      }
    });
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push('/login');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  const renderError = () => {
    if (analysisError) {
      const error = analysisError as AxiosError<ErrorResponse>;
      return (
        <div role="alert" className="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error.response?.data.error || 'Failed to analyze code'}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <LayoutContainer>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-800 to-blue-800 text-white text-center py-10 px-4">
        <h1 className="text-4xl font-bold mb-4">Code Analysis</h1>
        <p className="text-lg">
          Use our AI with GPT-4 to analyze your code or use it as a copilot.
        </p>
      </div>

      <div className="flex flex-col items-center py-10 bg-gray-900 text-white min-h-screen">
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl mb-10">
          <div className="card-body">
            <h2 className="card-title text-white text-3xl font-bold mb-6 text-center">Paste Your Code</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-white">Code Snippet</span>
                </label>
                <textarea
                  {...register('code')}
                  className="textarea textarea-primary w-full h-64 mb-4 bg-slate-800 text-white"
                  placeholder="Enter your code here..."
                ></textarea>
                {errors.code && <p className="text-red-500">{errors.code.message}</p>}
              </div>
              {renderError()}
              <div className="form-control">
                <button type="submit" className="btn btn-primary" disabled={isAnalyzing}>
                  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
            </form>
            {isAnalyzing && (
                    <div className="flex justify-center items-center my-4">
                     <span className="loading loading-bars loading-sm"></span>
                     </div>
            )}
          </div>
        </div>
        {analysisResult.openAIAnalysis && (
          <div className="card w-full max-w-4xl bg-base-100 shadow-xl mb-10">
            <div className="card-body">
              <h2 className="card-title text-white text-3xl font-bold mb-6 text-center">Analysis Result</h2>
              <div className="mockup-code bg-gray-800 text-white mb-4">
                <pre data-prefix=">" className="text-success"><code>{analysisResult.openAIAnalysis}</code></pre>
              </div>
            </div>
          </div>
        )}
        {analysisResult.eslintAnalysis && (
          <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-white text-3xl font-bold mb-6 text-center">ESLint Analysis Result</h2>
              <div className="mockup-code bg-gray-800 text-white">
                <pre data-prefix=">" className="text-warning"><code>{analysisResult.eslintAnalysis}</code></pre>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onConfirm={handleModalConfirm} 
        message="You need to be logged in to analyze code. Do you want to log in now?" 
      />
    </LayoutContainer>
  )
}

export default CodeAnalysisPage