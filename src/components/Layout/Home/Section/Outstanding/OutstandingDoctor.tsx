import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './OutstangdingStyle.scss';
import { doctorData } from '@/services/doctorService';
import { useAppSelector } from '@/utils/useGetData';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
interface OutstandingDoctorProps {
  heading: React.ReactNode;
  buttonText: React.ReactNode;
  data: doctorData[];
  settings: any;
}

const OutstandingDoctor = ({ heading, buttonText, data, settings }: OutstandingDoctorProps) => {
  const { language } = useAppSelector((state) => state.lang);

  return (
    <div className="section-doctor">
      <div className="section-doctor-container">
        <div className="header">
          <span>{heading}</span>
          <button>{buttonText}</button>
        </div>

        <div className="body">
          <Slider {...settings}>
            {data.map((item) => {
              let imageBase64;
              if (item.image) {
                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
              }
              const nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
              const nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
              return (
                <Link to={`detail-doctor/${item.id}`} key={item.id} className="section-img-link">
                  <div className="outer-bg">
                    <div
                      className="section-img"
                      style={{ backgroundImage: `url(${imageBase64})` }}
                    ></div>
                  </div>
                  <div className="position text-center">
                    <div>{language === 'vi' ? nameVi : nameEn}</div>
                    <div>{'Cơ xương khớp'}</div>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OutstandingDoctor;
