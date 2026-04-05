import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useCustomers = () => {
    return useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await api.get('/loyalty/customers');
            return response.data;
        },
    });
};

export const useEarnPoints = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/loyalty/earn', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['customers']);
            toast.success('Points earned successfully');
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Error earning points');
        }
    });
};

export const useRedeemPoints = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/loyalty/redeem', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['customers']);
            toast.success('Points redeemed successfully');
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Error redeeming points');
        }
    });
};

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const response = await api.get('/loyalty/profile');
            return response.data;
        },
    });
};

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const response = await api.delete(`/loyalty/customers/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['customers']);
            toast.success('Customer deleted successfully');
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Error deleting customer');
        }
    });
};
