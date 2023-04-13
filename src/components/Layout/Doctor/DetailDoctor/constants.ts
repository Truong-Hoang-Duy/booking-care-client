export const initialValue = {
  id: 1,
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  phonenumber: '',
  gender: '',
  image: '',
  positionData: {
    valueEn: '',
    valueVi: '',
  },
  Markdown: {
    contentHTML: '',
    contentMarkdown: '',
    description: '',
  },
  Doctor_Infor: {
    addressClinic: '',
    nameClinic: '',
    note: '',
    paymentId: '',
    paymentTypeData: {
      valueEn: '',
      valueVi: '',
    },
    priceId: '',
    priceTypeData: {
      valueEn: '',
      valueVi: '',
    },
    provinceId: '',
    provinceTypeData: {
      valueEn: '',
      valueVi: '',
    },
    specialtyId: 0,
    clinicId: 0,
  },
};

export const initialValueModal = {
  id: 1,
  doctorId: 1,
  date: 1,
  timeType: '',
  timeTypeData: {
    valueEn: '',
    valueVi: '',
  },
  doctorData: {
    firstName: '',
    lastName: '',
  },
};

export const initialValuePatient = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  phonenumber: '',
  gender: '',
};

export const initDoctorInfor = {
  doctorId: 0,
  specialtyId: 0,
  clinicId: 0,
  priceId: '',
  provinceId: '',
  paymentId: '',
  addressClinic: '',
  nameClinic: '',
  note: '',
  paymentTypeData: {
    valueEn: '',
    valueVi: '',
  },
  priceTypeData: {
    valueEn: '',
    valueVi: '',
  },
  provinceTypeData: {
    valueEn: '',
    valueVi: '',
  },
};
