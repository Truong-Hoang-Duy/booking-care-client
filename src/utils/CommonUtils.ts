import dayjs from 'dayjs';
import { capitalize } from 'lodash';

class CommonUtils {
  static getBase64(file: File): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  static formatIntoVND(money: string) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
      Number(money)
    );
  }

  static formatIntoUSD(money: string) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      Number(money)
    );
  }

  static capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static lowercaseFirstLetter(string: string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  static validatePhoneNumber(phone: string) {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return regexPhoneNumber.test(phone);
  }

  static formatDate(date: number, language: string) {
    return language === 'vi'
      ? capitalize(dayjs(new Date(date)).locale('vi').format('dddd - DD/MM/YYYY'))
      : dayjs(new Date(date)).format('dddd - DD/MM/YYYY');
  }
}

export default CommonUtils;
