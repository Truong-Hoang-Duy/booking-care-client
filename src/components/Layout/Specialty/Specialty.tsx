import { HomeHeader } from '@/components/Common';
import { useState } from 'react';
import DoctorSchedule from '../Doctor/DetailDoctor/DoctorSchedule';
import { useParams } from 'react-router-dom';
import './SpecialtyStyle.scss';
import DoctorExtraInfor from '../Doctor/DetailDoctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/DetailDoctor/ProfileDoctor';
import { Footer } from '@/components/Common/Footer';

const Specialty = () => {
  const [state, setState] = useState(['11', '12']);
  const { id } = useParams();

  return (
    <>
      <HomeHeader />
      <div className="detail-specialty">
        <div className="container">
          <div className="description-specialty"></div>

          {state.map((item) => (
            <div className="doctor-box" key={item}>
              <div className="content-left">
                <ProfileDoctor id={item} isShowDescDoctor={true} />
              </div>
              <div className="content-right">
                <DoctorSchedule id={item} />
                <DoctorExtraInfor id={item} />
              </div>
            </div>
          ))}
          <div className="frequently-questions"></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Specialty;
