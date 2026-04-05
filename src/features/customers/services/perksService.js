import api from '../../../api/axios';

export const getRoomsHistory = async (customerId) => {
    const response = await api.get(`/loyalty/customers/${customerId}/rooms-history`);
    return response.data;
};

export const getSharedSpaceHistory = async (customerId) => {
    const response = await api.get(`/loyalty/customers/${customerId}/shared-space-history`);
    return response.data;
};

export const getDeskHistory = async (customerId) => {
    const response = await api.get(`/loyalty/customers/${customerId}/dedicated-desk-history`);
    return response.data;
};

export const getCafeHistory = async (customerId) => {
    const response = await api.get(`/loyalty/customers/${customerId}/cafe-history`);
    return response.data;
};
