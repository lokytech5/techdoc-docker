import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ProjectData } from '../components/types';
import { authApiClient } from '../components/api-client';

interface Props {
  projectId: string | undefined;
}

const useFetchProjectById = ({ projectId }: Props) => {
  return useQuery<ProjectData, AxiosError>(
    ['project', projectId],
    () => authApiClient.get<ProjectData>(`/projects/${projectId}`).then(res => res.data),
    {
      enabled: !!projectId,
      onError: (error) => {
        console.error('Error fetching project:', error.message);
      }
    }
  );
};

export default useFetchProjectById;
