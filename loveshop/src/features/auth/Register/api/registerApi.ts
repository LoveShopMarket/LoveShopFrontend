import { api } from '@/shared/api/axiosInstance';
import {login} from '../../Login/api/loginApi';
import axios from 'axios';
import { Result } from '@/shared/lib/Result';

export async function register(email: string, password: string): Promise<Result<boolean>> {
    const response = await api.post('/register', { email, password })
      .then(async () => {
        await login(email, password);
        return Result.ok(true);
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          console.log(`Status code: ${error.response?.status}`)
          console.log(`Data: ${error.response?.data}`)

          const errorsObject = error.response?.data.errors
          const errors = Object.entries(errorsObject)
            .map(([_, value]) => value.join('\n'))
            .join('\n');
          return Result.fail<boolean>([new Error(errors)])
        }
        return Result.fail<boolean>([new Error('Unknown error')])
      })
    return response
};
