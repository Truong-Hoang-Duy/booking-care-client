import { useParams } from 'react-router-dom';
import './Styles/ProfileDoctorStyle.scss';
import { ReactNode, useEffect, useState } from 'react';
import { DetailInfoDoctor, GetScheduleData, doctorApi } from '@/services/doctorService';
import { initialValue } from './constants';
import { useAppSelector } from '@/utils/useGetData';
import { ConvertIntoSelect } from '@/utils/ConvertIntoSelect';
import CommonUtils from '@/utils/CommonUtils';
import { FormattedMessage } from 'react-intl';
import _, { capitalize } from 'lodash';
import dayjs from 'dayjs';

const ProfileDoctor = ({
  isShowDescDoctor,
  dataSchdule,
}: {
  isShowDescDoctor: boolean;
  dataSchdule?: GetScheduleData;
}) => {
  const { id } = useParams();
  const [detailDoctor, setDetailDoctor] = useState<DetailInfoDoctor>(initialValue);
  const { language } = useAppSelector((state) => state.lang);

  useEffect(() => {
    (async () => {
      const { data } = await doctorApi.getDetailInfoDoctor(id);
      setDetailDoctor(data);
    })();
  }, []);

  const renderTimeBooking = (dataTime: GetScheduleData | undefined): ReactNode => {
    if (dataTime && !_.isEmpty(dataTime)) {
      const date =
        language === 'vi'
          ? capitalize(dayjs(new Date(dataTime.date)).locale('vi').format('dddd - DD/MM/YYYY'))
          : dayjs(new Date(dataTime.date)).format('dddd - DD/MM/YYYY');

      const time =
        language === 'vi' ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
      return (
        <>
          <div className="mb-1 fs-6">
            {time}, {date}
          </div>
          <div className="fs-6">
            <FormattedMessage id="patient.booking-modal.free-booking" />
          </div>
        </>
      );
    }
    return;
  };

  return (
    <>
      <div className="profile-doctor">
        <div className="avatar" style={{ backgroundImage: `url(${detailDoctor.image})` }}></div>
        <div className="information">
          <div className="title">
            {language === 'vi'
              ? `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
              : `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`}
          </div>
          <div className="desc">
            {isShowDescDoctor
              ? detailDoctor.Markdown.description &&
                detailDoctor.Markdown.description.split(/\n/).map((item) => (
                  <p className="mb-1" key={item}>
                    {item}
                  </p>
                ))
              : renderTimeBooking(dataSchdule)}
          </div>
        </div>
      </div>
      <div className="price">
        <FormattedMessage id="patient.extra-infor-doctor.price" />{' '}
        {language === 'vi'
          ? CommonUtils.formatIntoVND(detailDoctor.Doctor_Infor.priceTypeData.valueVi)
          : CommonUtils.formatIntoUSD(detailDoctor.Doctor_Infor.priceTypeData.valueEn)}
      </div>
    </>
  );
};

export default ProfileDoctor;
