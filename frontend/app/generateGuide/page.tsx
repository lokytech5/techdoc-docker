"use client"
import React, { useState } from 'react'
import useFetchUserProjects from '../hooks/useFetchUserProject';
import { GuideResponse } from '../components/types';
import LayoutContainer from '../components/LayoutContainer';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { useRouter } from 'next/navigation';
import { AiOutlineFileText } from 'react-icons/ai';


const GenerateGuidePage = () => {
  const { data: projects, isLoading, isError } = useFetchUserProjects({ page: 1, limit: 10 });
  const router = useRouter();

  const handleSelectProject = (projectId: string) => {
      router.push(`/generateGuide/${projectId}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorAlert />;

  return (
    <LayoutContainer>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
      <h1 className="text-4xl font-bold mb-10">Generate Documentation From Your Projects</h1>
      {projects.length === 0 ? (
        <div className="text-center mt-20">
          <p>No projects created, create one to generate guide documentation.</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6 p-6 hover:bg-gray-700 transition duration-300 cursor-pointer" 
              onClick={() => handleSelectProject(project.id)}
            >
              <div className="flex items-center">
                <AiOutlineFileText className="text-4xl text-blue-400 mr-4" />
                <div>
                  <h2 className="text-2xl font-semibold">{project.name}</h2>
                  <p className="text-gray-400">Created at: {new Date(project.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </LayoutContainer>
  );
};

export default GenerateGuidePage