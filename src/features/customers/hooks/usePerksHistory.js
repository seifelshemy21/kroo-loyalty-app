import { useQuery } from '@tanstack/react-query';
import * as perksService from '../services/perksService';

export const useRoomsHistory = (customerId) => {
    return useQuery({
        queryKey: ['rooms-history', customerId],
        queryFn: () => perksService.getRoomsHistory(customerId),
        enabled: !!customerId,
    });
};

export const useSharedSpaceHistory = (customerId) => {
    return useQuery({
        queryKey: ['shared-space-history', customerId],
        queryFn: () => perksService.getSharedSpaceHistory(customerId),
        enabled: !!customerId,
    });
};

export const useDeskHistory = (customerId) => {
    return useQuery({
        queryKey: ['desk-history', customerId],
        queryFn: () => perksService.getDeskHistory(customerId),
        enabled: !!customerId,
    });
};

export const useCafeHistory = (customerId) => {
    return useQuery({
        queryKey: ['cafe-history', customerId],
        queryFn: () => perksService.getCafeHistory(customerId),
        enabled: !!customerId,
    });
};
