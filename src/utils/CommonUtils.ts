class CommonUtils {
  static getBase64(file: File) {
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
}

export default CommonUtils;
