import instance from '@/api/axios';
import { ListOneResponse, ListResponse } from '@/api/statusCodes';
import { BASE_URL } from '@/shared/configs/config';

export interface ValueAllCode {
  valueEn: string;
  valueVi: string;
}

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
  genderData: ValueAllCode;
}

export interface CreateDoctorInfo {
  doctorId?: number;
  contentHTML: string;
  contentMarkdown: string;
  description: string;
}

export interface DoctorInfor {
  addressClinic: string;
  nameClinic: string;
  note: string;
  paymentId: string;
  paymentTypeData: ValueAllCode;
  priceId: string;
  priceTypeData: ValueAllCode;
  provinceId: string;
  provinceTypeData: ValueAllCode;
  clinicId: number;
  specialtyId: number;
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
  positionData: ValueAllCode;
  Markdown: CreateDoctorInfo;
  Doctor_Infor: DoctorInfor;
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
  timeTypeData: ValueAllCode;
  doctorData: {
    firstName: string;
    lastName: string;
  };
}

export interface CreateSpecialty {
  name: string;
  imageBase64: string;
  contentHTML: string;
  contentMarkdown: string;
}

export interface GetSpecialty {
  id: number;
  name: string;
  image: string;
  contentHTML: string;
  contentMarkdown: string;
}

export interface GetOneSpecialty {
  descriptionHTML: string;
  descriptionMarkdown: string;
  doctorSpecialty: {
    doctorId: number;
    provinceId: string;
  }[];
}

export interface CreateClinic {
  name: string;
  address: string;
  imageBase64: string;
  contentHTML: string;
  contentMarkdown: string;
}

export interface GetClinic {
  id: number;
  name: string;
  image: string;
  contentHTML: string;
  contentMarkdown: string;
}

export interface GetOneClinic {
  name: string;
  address: string;
  image: string;
  descriptionHTML: string;
  descriptionMarkdown: string;
  doctorClinic: {
    doctorId: number;
    provinceId: string;
  }[];
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
  createSpecialty(data: CreateSpecialty): Promise<ListResponse<[]>> {
    const url = `${BASE_URL}/specialty/create`;
    return instance.post(url, data);
  },
  getAllSpecialty(): Promise<ListResponse<GetSpecialty>> {
    const url = `${BASE_URL}/specialty/get-all`;
    return instance.get(url);
  },
  getOneSpecialty(
    id: string | undefined,
    location: number | string | undefined
  ): Promise<ListOneResponse<GetOneSpecialty>> {
    const url = `${BASE_URL}/specialty/get-one?id=${id}&location=${location}`;
    return instance.get(url);
  },

  createClinic(data: CreateClinic): Promise<ListResponse<[]>> {
    const url = `${BASE_URL}/clinic/create`;
    return instance.post(url, data);
  },
  getAllClinic(): Promise<ListResponse<GetClinic>> {
    const url = `${BASE_URL}/clinic/get-all`;
    return instance.get(url);
  },
  getOneClinic(id: string | undefined): Promise<ListOneResponse<GetOneClinic>> {
    const url = `${BASE_URL}/clinic/get-one?id=${id}`;
    return instance.get(url);
  },
};
