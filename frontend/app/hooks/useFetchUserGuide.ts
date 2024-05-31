import { AxiosError } from 'axios';
import React from 'react'
import { authApiClient } from '../components/api-client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { GuideResponse } from '../components/types';

interface Props {
    page?: number;
    limit?: number;
  }
  
  const useFetchUserGuide = ({ page = 1, limit = 3 }: Props = {}) => {
    return useInfiniteQuery<GuideResponse[], AxiosError>(
      ['userGuides', page, limit],
      ({ pageParam = page }) => authApiClient.get<GuideResponse[]>(`/guides/user-guides?page=${pageParam}&limit=${limit}`).then(res => res.data),
      {
        getNextPageParam: (lastPage, pages) => lastPage.length ? pages.length + 1 : undefined, // Adjust based on actual pagination logic
        keepPreviousData: true,
        staleTime: 5000,
        onError: (error) => {
          console.error('Error fetching user guides:', error.message);
        }
      }
    );
  };
  

export default useFetchUserGuide