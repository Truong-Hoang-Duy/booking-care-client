import { HomeHeader } from '@/components/Common';
import './DetailDoctorStyle.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doctorApi } from '@/services/doctorService';
import { DetailInfoDoctor } from '@/services/doctorService';
import { useAppSelector } from '@/utils/useGetData';

const DetailDoctor = () => {
  const { id } = useParams();
  const [detailDoctor, setDetailDoctor] = useState<DetailInfoDoctor>();
  const { language } = useAppSelector((state) => state.lang);
  console.log('DetailDoctor ~ detailDoctor:', detailDoctor);
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
                ? `${detailDoctor?.positionData.valueVi}, ${detailDoctor?.lastName} ${detailDoctor?.firstName}`
                : `${detailDoctor?.positionData.valueEn}, ${detailDoctor?.firstName} ${detailDoctor?.lastName}`}
            </div>
            <div className="desc">
              {detailDoctor?.Markdown.description &&
                detailDoctor?.Markdown.description.split(/\n/).map((item) => (
                  <p className="mb-1" key={item}>
                    {item}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="schedule-doctor container"></div>
        <div className="detail-info-doctor">
          <div className="container">
            {detailDoctor?.Markdown && (
              <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
            )}
          </div>
        </div>
        <div className="comment-doctor container"></div>
      </div>
    </>
  );
};

export default DetailDoctor;