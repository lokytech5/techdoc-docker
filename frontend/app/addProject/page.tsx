"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LayoutContainer from '../components/LayoutContainer'
import { useRouter } from 'next/navigation'
import useUserStore from '../components/useUserStore';
import useFetchAddProject from '../hooks/useFetchAddProject';
import LoadingSpinner from '../components/LoadingSpinner';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  repository_url: z.string().url('Enter a valid URL'),
  description: z.string().min(5, 'Description must be at least 5 characters long'),
  technicalStack: z.string().min(1, 'Technical stack is required'),
});


type ProjectFormData = z.infer<typeof projectSchema>;

const AddProjectPage = () => {
  const router = useRouter();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const addProject = useFetchAddProject();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    addProject.mutate(data);
    }

    if (addProject.isLoading) return <LoadingSpinner />;


  return (
    <LayoutContainer>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="card w-full max-w-lg bg-gray-800 shadow-xl p-5">
          <h1 className="text-center text-3xl font-bold text-white mb-4">Add New Project</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-300">Project Name</span>
              </label>
              <input {...register('name')} className="input input-bordered w-full bg-gray-700 text-white" />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-300">Repository URL</span>
              </label>
              <input type="url" {...register('repository_url')} className="input input-bordered w-full bg-gray-700 text-white" />
              {errors.repository_url && <p className="text-red-500">{errors.repository_url.message}</p>}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-300">Description</span>
              </label>
              <textarea {...register('description')} className="textarea textarea-bordered w-full bg-gray-700 text-white" />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-300">Technical Stack</span>
              </label>
              <input {...register('technicalStack')} className="input input-bordered w-full bg-gray-700 text-white" />
              {errors.technicalStack && <p className="text-red-500">{errors.technicalStack.message}</p>}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn bg-blue-600 text-white w-full hover:bg-blue-700">Add Project</button>
            </div>
          </form>
        </div>
      </div>
    </LayoutContainer>
  )
}

export default AddProjectPage