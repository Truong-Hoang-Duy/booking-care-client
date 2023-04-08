import instance from '@/api/axios';
import { ListOneResponse, ListResponse } from '@/api/statusCodes';
import { BASE_URL } from '@/shared/configs/config';

export interface doctorData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phonenumber: string;
  gender: string;
  image: string;
  roleId: string;
  positionId: string;
  positionData: {
    valueEn: string;
    valueVi: string;
  };
  genderData: {
    valueEn: string;
    valueVi: string;
  };
}

export interface CreateDoctorInfo {
  doctorId?: number;
  contentHTML: string;
  contentMarkdown: string;
  description: string;
}

export interface DetailInfoDoctor {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phonenumber: string;
  gender: string;
  image: string;
  positionData: {
    valueEn: string;
    valueVi: string;
  };
  Markdown: CreateDoctorInfo;
}

export interface ScheduleData {
  doctorId: number;
  date: number;
  timeType: string;
}

export interface CreateSchedule {
  arrSchedule: ScheduleData[];
  doctorId: number;
  date: number;
}

export interface GetScheduleData {
  id: number;
  doctorId: number;
  date: number;
  timeType: string;
  timeTypeData: {
    valueEn: string;
    valueVi: string;
  };
}

export const doctorApi = {
  getAllDoctor(limit = 10): Promise<ListResponse<doctorData>> {
    const url = `${BASE_URL}/doctor/get-all?limit=${limit}`;
    return instance.get(url);
  },
  createDoctorInfo(data: CreateDoctorInfo): Promise<ListResponse<[]>> {
    const url = `${BASE_URL}/doctor-info/create`;
    return instance.post(url, data);
  },
  getDetailInfoDoctor(id: string | number | undefined): Promise<ListOneResponse<DetailInfoDoctor>> {
    const url = `${BASE_URL}/doctor/get-detail-by-id?id=${id}`;
    return instance.get(url);
  },
  createSchedule(data: CreateSchedule): Promise<ListResponse<[]>> {
    const url = `${BASE_URL}/schedule/create`;
    return instance.post(url, data);
  },
  getSchedule(doctorId: number, date: number): Promise<ListResponse<GetScheduleData>> {
    const url = `${BASE_URL}/schedule-by-date/get-all?doctorId=${doctorId}&date=${date}`;
    return instance.get(url);
  },
};
