import { User, Permission } from 'src/models';
import api from './configs/axiosConfigs';
interface LoginInterface{
    User:User;
    Permissions: Permission[];
}
export const UserServices = {
    login: async (email: string, password: string): Promise<LoginInterface> => {
        return await api.request({
            url: '/users/login',
            method: 'POST',
            data: { Email: email, Pwd: password },
        });
    },
    logout: async () => {
        return await api.request({
            url: '/users/logout',
            method: 'POST',
            data: {},
        });
    },
    getUser: async (id: string): Promise<User> => {
        return await api.request({
            url: `/users/${id}`,
            method: 'GET',
        });
    },
    getUserByVerificationToken: async (id: string): Promise<User> => {
        return await api.request({
            url: `/users/verification/${id}`,
            method: 'GET',
        });
    },
    getAll: async (): Promise<User[]> => {
        return await api.request({
            url: `/users`,
            method: 'GET',
        });
    },
    edit: async (id:string, data: User): Promise<User> => {
        return await api.request({
            url: `/users/${id}`,
            method: 'Put',
            data: data,
        });
    },
    addNew: async (data: User): Promise<User> => {
        return await api.request({
            url: '/users/register',
            method: 'POST',
            data: data,
        });
    },
    
    completeRegistration: async (data: User): Promise<User> => {
        delete data.Confirm;
        return await api.request({
            url: '/users/register-complete',
            method: 'POST',
            data,
        });
    },


    delete: async (id: string): Promise<User> => {
        return await api.request({
            url: `/users/${id}`,
            method: 'Delete',
            data: { Id: id },
        });
    },
};
