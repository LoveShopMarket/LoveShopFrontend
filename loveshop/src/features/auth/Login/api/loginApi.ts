import { api } from '@/shared/api/axiosInstance';
import { setToken } from '@/shared/auth/authState';
import type { LoginResponse } from '../model/LoginResponse';
import { Result } from '@/shared/lib/Result';
import axios from 'axios';

export async function login(email: string, password: string): Promise<Result<LoginResponse>> {
    const response = await api.post<LoginResponse>('/login', { email, password })
      .then(result => Result.ok(result.data))
      .catch(error => {
        if (axios.isAxiosError(error)) {
          console.log(`Status code: ${error.response?.status}`)
          console.log(`Data: ${error.response?.data}`)

          const errorsObject = error.response?.data.detail
          return Result.fail<boolean>([new Error(errorsObject)])
        }
        return Result.fail<LoginResponse>([new Error('Unknown error')])
      })
    if (response.isSuccess) {
      const value = response.getValue!
      setToken(value.accessToken)
    }
    return response;
};
