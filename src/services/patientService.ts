import instance from '@/api/axios';
import { ListOneResponse, ListResponse } from '@/api/statusCodes';
import { BASE_URL } from '@/shared/configs/config';

export interface PatientData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phonenumber: string;
  gender: string;
}

export interface PostPatientBook {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phonenumber: string;
  gender: string;
  doctorId: number;
  date: number;
  timeType: string;
}

export const patientApi = {
  getPatientByEmail(email: string | undefined): Promise<ListOneResponse<PatientData>> {
    const url = `${BASE_URL}/patient-by-email/get?email=${email}`;
    return instance.get(url);
  },
  postPatientBookDoctor(data: PostPatientBook): Promise<ListResponse<[]>> {
    const url = `${BASE_URL}/patient-book-doctor/create`;
    return instance.post(url, data);
  },
};
