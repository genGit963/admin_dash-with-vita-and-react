import { Notification } from 'src/models';
import api from './configs/axiosConfigs';

export const NotificationServices = {
    getAll: async (id: string): Promise<Notification[]> => {
        return (await api.request({
            url: `/notifications/${id}`,
            method: 'GET',
        })) as Notification[];
    },
};
