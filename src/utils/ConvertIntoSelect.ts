import { Allcode } from '@/services';

export function ConvertIntoSelect(data: Allcode[], language: string) {
  const result = data.map((item) => {
    const labelVi = `${item.valueVi}`;
    const labelEn = `${item.valueEn}`;
    return {
      value: item.keyMap,
      label: language === 'vi' ? labelVi : labelEn,
    };
  });
  return result;
}
