
import { useMutation } from '@tanstack/react-query';
import { authApiClient } from '../components/api-client';
import { AxiosError } from 'axios';
import { GuideResponse } from '../components/types';

interface Props {
  projectId: string;
  sections: string[];
  customRequest?: string;
}

const useFetchGenerateGuide = () => {
  return useMutation<GuideResponse, AxiosError, Props>(
    ({ projectId, sections, customRequest }) => {
        return authApiClient.post<{ guide: GuideResponse }>(
            `/guides/generate-custom/${projectId}`,
            { sections, customRequest }
        ).then(res => res.data.guide);
    }
);
};
  

export default useFetchGenerateGuide;
