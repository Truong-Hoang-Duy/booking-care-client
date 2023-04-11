import { ListOption } from '@/components/Layout/Admin/DoctorManage/DoctorManage';
import { Allcode } from '@/services';
import { DetailInfoDoctor } from '@/services/doctorService';

export function ConvertIntoSelect(type: string, data: any, language: string) {
  let result: ListOption[] = [];
  if (type === 'user') {
    result = data.map((item: DetailInfoDoctor) => {
      const nameVi = `${item.lastName} ${item.firstName}`;
      const nameEn = `${item.firstName} ${item.lastName}`;
      return {
        value: item.id,
        label: language === 'vi' ? nameVi : nameEn,
      };
    });
  } else if (type === 'price') {
    result = data.map((item: Allcode) => {
      const labelVi = `${item.valueVi} VND`;
      const labelEn = `${item.valueEn} USD`;
      return {
        value: item.keyMap,
        label: language === 'vi' ? labelVi : labelEn,
      };
    });
  } else {
    result = data.map((item: Allcode) => {
      const labelVi = `${item.valueVi}`;
      const labelEn = `${item.valueEn}`;
      return {
        value: item.keyMap,
        label: language === 'vi' ? labelVi : labelEn,
      };
    });
  }

  return result;
}
