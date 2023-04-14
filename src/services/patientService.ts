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
  language: string;
  timeString: string;
  doctorName: string;
}

interface VerifyBookDoctor {
  confirmTime: string;
  doctorId: string;
}

export interface ListPatientForDoctor {
  id: number;
  statusId: string;
  doctorId: number;
  patientId: number;
  date: string;
  timeType: string;
  patientData: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    genderData: {
      id: number;
      valueEn: string;
      valueVi: string;
    };
  };
  timeTypePatient: {
    valueEn: string;
    valueVi: string;
  };
}

export interface SendRemedy {
  email: string;
  imgBase64: string;
  doctorId?: number;
  patientId?: number;
  timeType?: string;
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
  postVerifyBookDoctor(data: VerifyBookDoctor): Promise<ListResponse<[]>> {
    const url = `${BASE_URL}/verify-book-doctor/create`;
    return instance.post(url, data);
  },
  getListPatientForDoctor(
    doctorId: number | undefined,
    date: number | undefined
  ): Promise<ListResponse<ListPatientForDoctor>> {
    const url = `${BASE_URL}/list-patient-for-doctor/get-all?date=${date}&doctorId=${doctorId}`;
    return instance.get(url);
  },
  postSendRemedy(data: SendRemedy): Promise<ListResponse<ListPatientForDoctor>> {
    const url = `${BASE_URL}/send-remedy`;
    return instance.post(url, data);
  },
};
