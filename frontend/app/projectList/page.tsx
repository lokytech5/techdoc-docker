"use client"
import React, { useState } from 'react'
import LayoutContainer from '../components/LayoutContainer';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import useFetchUserProjects from '../hooks/useFetchUserProject';
import useUserStore from '../components/useUserStore';
import useFetchRemoveProject from '../hooks/useFetchRemoveProject';
import { ProjectData } from '../components/types';
import ConfirmationModal from '../components/ConfirmationModal';

const ProjectListPage = () => {
    const { data: projects, isLoading, isError } = useFetchUserProjects({page: 1, limit: 10});
    const removeProject = useFetchRemoveProject()
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState('');


    if (isLoading) return <div><LoadingSpinner/></div>;
    if (isError) return <div><ErrorAlert/></div>;

    const handleRemoveProject = (projectId:string) => {
      setSelectedProjectId(projectId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (selectedProjectId) {
            removeProject.mutate(selectedProjectId);
            setModalOpen(false);
        }
    };

    if (projects.length === 0) {
      return (
        <LayoutContainer>
          <div className="text-white text-center mt-20">
          No Projects created yet. Create one to see it listed here.
            </div>
        </LayoutContainer>
      );
    }

  
    return (
      <LayoutContainer>
      <ConfirmationModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}
              message="Are you sure you want to delete this project?"
          />
          
      <div className="p-5">
        <h1 className="text-2xl font-bold text-purple-400 mb-6">Projects Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects?.map(project => (
            <div key={project.id} className="bg-gray-700 rounded-lg shadow-lg p-6 border border-gray-600 hover:bg-gray-600 transition duration-300 ease-in-out">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-4">{project.name}</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>
              <div className="text-gray-300 mb-4">
                <p><strong>Stack:</strong> {project.technicalStack}</p>
                <p><strong>Repository:</strong> <a href={project.repository_url} className="underline text-blue-400">GitHub</a></p>
              </div>
              <div>
                <button className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-pink-700 transition duration-300 ease-in-out" onClick={() => handleRemoveProject(project.id)}>Remove</button>
              </div>    
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
    )
  }

  export default ProjectListPage