import { Reservation } from 'src/models';
import api from './configs/axiosConfigs';

export const ReservationServices = {
    getAll: async (): Promise<Reservation[]> => {
        return await api.request({
            url: `/reservations`,
            method: 'GET',
        });
    },
};
