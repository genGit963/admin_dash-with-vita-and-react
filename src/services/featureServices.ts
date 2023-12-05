import { Feature } from 'src/models';
import api from './configs/axiosConfigs';


export const FeatureServices = {
    getAll: async (): Promise<Feature[]> => {
        return await api.request({
            url: `/features`,
            method: 'GET',
        });
    },
    get: async (id: string):Promise<Feature>=>{
        return await api.request({
            url: `/features/${id}`,
            method: 'GET',
        });
    },
    edit: async (id:string, data: Feature): Promise<Feature> => {
        return await api.request({
            url: `/features/${id}`,
            method: 'PATCH',
            data: data,
        });
    },
    addNew: async (data: Feature): Promise<Feature> => {
        return await api.request({
            url: '/features',
            method: 'POST',
            data: data,
        });
    },

    delete: async (id: string): Promise<Feature> => {
        return await api.request({
            url: `/features/${id}`,
            method: 'Delete',
            data: { Id: id },
        });
    },
};
