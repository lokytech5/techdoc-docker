import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ProjectData } from '../components/types';
import { authApiClient } from '../components/api-client';


interface Props {
  page: number;
  limit: number;
}

const useFetchUserProjects = ({ page, limit }: Props) => {
  return useQuery<ProjectData[], AxiosError>(
      ['userProjects', page, limit],
      () => authApiClient.get<ProjectData[]>(`/projects/user-projects?page=${page}&limit=${limit}`).then(res => res.data),
      {
          keepPreviousData: true,
          staleTime: 5000,
          onError:(error) => {
              console.error('Error fetching user projects:', error.message);

          }
      }
  )
}

export default useFetchUserProjects;
