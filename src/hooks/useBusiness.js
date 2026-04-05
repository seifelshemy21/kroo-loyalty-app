import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export const useBusinessAnalytics = () => {
    return useQuery({
        queryKey: ['analytics'],
        queryFn: async () => {
            const response = await api.get('/business/analytics');
            return response.data;
        },
    });
};
