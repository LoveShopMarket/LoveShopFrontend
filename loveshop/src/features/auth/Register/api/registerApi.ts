import { api } from '@/shared/api/axiosInstance';
import {login} from '../../Login/api/loginApi';
export async function register(email: string, password: string) {
    const response = await api.post('/register', { email, password });
    await login(email, password);
    return response.data;
};
