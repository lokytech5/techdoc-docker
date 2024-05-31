"use client"
import ErrorAlert from '@/app/components/ErrorAlert';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import useFetchProjectById from '@/app/hooks/useFetchProjectById';
import React from 'react'
import ChatBot from '../ChatBot';

interface Props {
    params: { projectId: string}
}

const ProjectDetailsPage = ({params: {projectId }}: Props) => {

    const id: string | undefined = projectId as string;

    const { data: project, isLoading, error } = useFetchProjectById({ projectId: id});

    if (isLoading) return <div><LoadingSpinner/></div>;
    if (error) return <div><ErrorAlert/></div>;

  return (
    <div>
        {project ? (
        <ChatBot project={project} />
      ) : (
        <div>No project data available.</div>
      )}
    </div>
  )
}

export default ProjectDetailsPage