"use client"
import React from 'react'
import useFetchUserGuide from '../hooks/useFetchUserGuide';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import LayoutContainer from '../components/LayoutContainer';
import GuideContent from '../components/GuideContent';

const GuideListPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useFetchUserGuide();
  

  if (isLoading) return <div><LoadingSpinner/></div>;
    if (isError) return <div><ErrorAlert/></div>;

    if (data.pages.length === 0 || data.pages[0].length === 0) {
      return (
        <LayoutContainer>
          <div className="text-center mt-20">
            <p>No guides created yet. Create one to see it listed here.</p>
          </div>
        </LayoutContainer>
      );
    }

    
  return (
    <LayoutContainer>
      <div className="min-h-screen bg-gray-900 p-5">
        <h1 className="text-2xl font-bold text-gray-300 mb-6 text-center">Generated Guides</h1>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map(guide => (
              <div key={guide.id} className="collapse collapse-arrow bg-gray-700 rounded-box mb-4">
                <input type="checkbox" className="peer" id={`collapse-guide-${guide.id}`} />
                <label htmlFor={`collapse-guide-${guide.id}`} className="collapse-title text-xl font-medium text-white">
                  {guide.title}
                </label>
                <div className="collapse-content text-base p-4 border border-gray-600">
                  <GuideContent content={guide.content} />
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
        {hasNextPage && (
          <div className="flex justify-center">
            <button 
              onClick={() => fetchNextPage()} 
              disabled={!hasNextPage || isFetchingNextPage}
              className="btn bg-blue-600 text-white hover:bg-blue-700 mt-4">
              {isFetchingNextPage ? 'Loading more...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </LayoutContainer>
  )
}

export default GuideListPage