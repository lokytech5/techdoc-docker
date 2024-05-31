"use client"
import React, { useState } from 'react'
import LayoutContainer from '../components/LayoutContainer';
import { useRouter } from 'next/navigation';
import useUserStore from '../components/useUserStore';
import LoginAlert from '../components/LoginAlert';
import { AiOutlineAppstore, AiOutlineProject } from 'react-icons/ai';

const ProjectPage = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
 const router = useRouter()


 const handleAction = (route: string) => {
  if(!isAuthenticated) {
    setShowLoginAlert(true);
  } else {
    router.push(route);
  }
 }
   
  
  return (
    <LayoutContainer>
    {showLoginAlert ? (
      <LoginAlert onClose={() => setShowLoginAlert(false)} />
    ) : (
      <>
        <div className="bg-gradient-to-r from-purple-600 via-purple-800 to-blue-800 text-white text-center py-10 px-4">
          <h1 className="text-4xl font-bold mb-4">Project Management</h1>
          <p className="text-lg">
            Start and manage your projects efficiently. Utilize tools to add, update, or delete projects as your portfolio grows.
          </p>
        </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="grid gap-8 p-8 md:mb-10 lg:mb-30 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-white rounded-lg">
                <div className="card-body text-center p-6 bg-secondary">
                  <AiOutlineProject className="mx-auto text-4xl text-white mb-4" />
                  <h2 className="card-title text-2xl text-white mb-4 mx-auto">Add Project</h2>
                  <p className="text-white mb-6">Start new projects to explore and expand your portfolio.</p>
                  <div className="card-actions justify-center">
                    <button className="btn bg-primary hover:bg-primary-700 text-white py-2 px-6 rounded" onClick={() => handleAction('/addProject')}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-500 rounded-lg">
                <div className="card-body text-center p-6">
                  <AiOutlineAppstore className="mx-auto text-4xl text-blue-400 mb-4" />
                  <h2 className="card-title text-2xl text-blue-400 mb-4 mx-auto">Manage Projects</h2>
                  <p className="text-blue-400 mb-6">Access and manage all your projects, including updates and deletions.</p>
                  <div className="card-actions justify-center">
                    <button className="btn bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded" onClick={() => handleAction('/projectList')}>
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </LayoutContainer>
  )
}

export default ProjectPage