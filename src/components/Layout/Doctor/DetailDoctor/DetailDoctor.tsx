import { HomeHeader } from '@/components/Common';
import './Styles/DetailDoctorStyle.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doctorApi } from '@/services/doctorService';
import { DetailInfoDoctor } from '@/services/doctorService';
import { useAppSelector } from '@/utils/useGetData';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import { Footer } from '@/components/Common/Footer';
import { initialValue } from './constants';

const DetailDoctor = () => {
  const { id } = useParams();
  const [detailDoctor, setDetailDoctor] = useState<DetailInfoDoctor>(initialValue);
  const { language } = useAppSelector((state) => state.lang);
  useEffect(() => {
    (async () => {
      const { data } = await doctorApi.getDetailInfoDoctor(id);
      setDetailDoctor(data);
    })();
  }, []);
  return (
    <>
      <HomeHeader />
      <div className="doctor-detail-container">
        <div className="intro-doctor container">
          <div className="avatar" style={{ backgroundImage: `url(${detailDoctor?.image})` }}></div>
          <div className="information">
            <div className="title">
              {language === 'vi'
                ? `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
                : `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`}
            </div>
            <div className="desc">
              {detailDoctor.Markdown.description &&
                detailDoctor.Markdown.description.split(/\n/).map((item) => (
                  <p className="mb-1" key={item}>
                    {item}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="schedule-doctor container">
          <div className="schedule-doctor-left">
            <DoctorSchedule />
          </div>
          <div className="schedule-doctor-right">
            <DoctorExtraInfor doctorInfo={detailDoctor.Doctor_Infor} />
          </div>
        </div>

        <div className="detail-info-doctor">
          <div className="container">
            {detailDoctor.Markdown && (
              <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
            )}
          </div>
        </div>
        <div className="comment-doctor container"></div>
      </div>

      <Footer />
    </>
  );
};

export default DetailDoctor;
