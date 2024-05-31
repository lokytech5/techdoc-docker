"use client"
import React, { useState } from 'react'
import LayoutContainer from '../components/LayoutContainer';
import LoginAlert from '../components/LoginAlert';
import useUserStore from '../components/useUserStore';
import { useRouter } from 'next/navigation';
import { AiOutlineRead, AiOutlineFileAdd } from 'react-icons/ai'; 



const GuidePage = () => {
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
          <h1 className="text-4xl font-bold mb-4">Technical Guides Creation</h1>
          <p className="text-lg">
            Automate the creation of technical guides with AI. Generate comprehensive documentation by analyzing your codebase.
          </p>
        </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="grid gap-8 p-8 md:mb-10 lg:mb-30 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-500 rounded-lg">
                <div className="card-body text-center p-6">
                  <AiOutlineFileAdd className="mx-auto text-4xl text-purple-400 mb-4" />
                  <h2 className="card-title text-2xl text-purple-400 mb-4 mx-auto">Generate Guide</h2>
                  <p className="text-gray-300 mb-6">Start creating a new guide for your selected projects.</p>
                  <div className="card-actions justify-center">
                    <button className="btn bg-purple-500 hover:bg-purple-700 text-white py-2 px-6 rounded" onClick={() => handleAction('/generateGuide')}>
                      Generate
                    </button>
                  </div>
                </div>
              </div>
              <div className="card bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-500 rounded-lg">
                <div className="card-body text-center p-6">
                  <AiOutlineRead className="mx-auto text-4xl text-blue-400 mb-4" />
                  <h2 className="card-title text-2xl text-blue-400 mb-4 mx-auto">View Guides</h2>
                  <p className="text-gray-300 mb-6">Explore and read the guides you created.</p>
                  <div className="card-actions justify-center">
                    <button className="btn bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded" onClick={() => handleAction('/guideList')}>
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

export default GuidePage