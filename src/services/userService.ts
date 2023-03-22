import instance from '../api/axios';
import { BASE_URL } from '../shared/configs/config';
import { ListResponse } from '../api/statusCodes';

export interface UserData {
  email: string;
  roleId: string;
}

export const userApi = {
  handleLogin(email: string, password: string): Promise<ListResponse<UserData>> {
    const url = `${BASE_URL}/login`;
    return instance.post(url, { email, password });
  },
};
