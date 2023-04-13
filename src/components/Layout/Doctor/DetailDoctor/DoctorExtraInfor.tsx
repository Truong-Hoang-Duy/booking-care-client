import { DoctorInfor, doctorApi } from '@/services/doctorService';
import CommonUtils from '@/utils/CommonUtils';
import { useAppSelector } from '@/utils/useGetData';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import './Styles/DoctorExtraInforStyle.scss';
import { initDoctorInfor } from './constants';

const DoctorExtraInfor = ({ id }: { id: string | undefined }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const { language } = useAppSelector((state) => state.lang);

  const [doctorInfo, setDoctorInfo] = useState<DoctorInfor>(initDoctorInfor);

  useEffect(() => {
    (async () => {
      if (id) {
        const { data } = await doctorApi.getDetailInfoDoctor(id);
        setDoctorInfo(data.Doctor_Infor);
      }
    })();
  }, []);

  return (
    <div className="doctor-extra-infor-container">
      <div className="content-up">
        <div className="title">
          <FormattedMessage id="patient.extra-infor-doctor.text-address" />
        </div>
        <div className="name-clinic">{doctorInfo?.nameClinic}</div>
        <div className="address-clinic">{doctorInfo?.addressClinic}</div>
      </div>
      <div className="content-down">
        {!isShowDetail ? (
          <>
            <span className="title">
              <FormattedMessage id="patient.extra-infor-doctor.price" />
              &nbsp;
            </span>
            <span className="price">
              {language === 'vi'
                ? CommonUtils.formatIntoVND(doctorInfo?.priceTypeData.valueVi)
                : CommonUtils.formatIntoUSD(doctorInfo?.priceTypeData.valueEn)}
              ,
            </span>
            <span className="show-detail px-2" onClick={() => setIsShowDetail(!isShowDetail)}>
              <FormattedMessage id="patient.extra-infor-doctor.detail" />
            </span>
          </>
        ) : (
          <>
            <div className="title">
              <FormattedMessage id="patient.extra-infor-doctor.price" />
            </div>
            <div className="price-detail">
              <div className="left">
                <div className="heading">
                  <FormattedMessage id="patient.extra-infor-doctor.price" />
                </div>
                <small className="description">
                  <FormattedMessage id="patient.extra-infor-doctor.note" />
                  {CommonUtils.capitalizeFirstLetter(doctorInfo.note)}
                </small>
              </div>
              <span className="right">
                {language === 'vi'
                  ? CommonUtils.formatIntoVND(doctorInfo?.priceTypeData.valueVi)
                  : CommonUtils.formatIntoUSD(doctorInfo?.priceTypeData.valueEn)}
              </span>
            </div>

            <div className="payment">
              <FormattedMessage id="patient.extra-infor-doctor.payment" />
              {language === 'vi'
                ? doctorInfo?.paymentTypeData.valueVi
                : doctorInfo?.paymentTypeData.valueEn}
            </div>

            <div className="show-detail" onClick={() => setIsShowDetail(!isShowDetail)}>
              <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorExtraInfor;
