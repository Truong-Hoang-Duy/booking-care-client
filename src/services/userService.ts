import instance from '../api/axios';
import { BASE_URL } from '../shared/configs/config';
import { ListOneResponse, ListResponse } from '../api/statusCodes';

export interface LoginData {
  email: string;
  roleId: string;
}

export interface UserData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phonenumber: string;
  gender: number;
  image: string;
  roleId: string;
  positionId: string;
}

export interface CreateData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
}

export interface EditUser {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
}

export const userApi = {
  handleLogin(email: string, password: string): Promise<ListResponse<LoginData>> {
    const url = `${BASE_URL}/login`;
    return instance.post(url, { email, password });
  },

  getUsers(id: string): Promise<ListResponse<UserData>> {
    const url = `${BASE_URL}/user/get-all?id=${id}`;
    return instance.get(url);
  },

  getOneUser(id: number): Promise<ListOneResponse<UserData>> {
    const url = `${BASE_URL}/user/get-all?id=${id}`;
    return instance.get(url);
  },

  createUser(data: CreateData): Promise<ListResponse<UserData>> {
    const url = `${BASE_URL}/user/create`;
    return instance.post(url, { ...data });
  },

  editUser(data: EditUser): Promise<ListResponse<[]>> {
    const url = `${BASE_URL}/user/edit`;
    return instance.put(url, data);
  },

  deleteUser(id: number): Promise<ListResponse<[]>> {
    const url = `${BASE_URL}/user/delete`;
    return instance.delete(url, { data: { id } });
  },
};
