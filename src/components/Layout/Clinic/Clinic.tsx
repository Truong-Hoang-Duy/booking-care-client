import { HomeHeader } from '@/components/Common';
import { Footer } from '@/components/Common/Footer';
import { GetOneClinic, doctorApi } from '@/services/doctorService';
import { useAppSelector } from '@/utils/useGetData';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileDoctor from '../Doctor/DetailDoctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DetailDoctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DetailDoctor/DoctorExtraInfor';

const Clinic = () => {
  const { id } = useParams();

  const { language } = useAppSelector((state) => state.lang);
  const [detailClinic, setDetailClinic] = useState<GetOneClinic>();

  const [listDoctorId, setListDoctorId] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const response = await doctorApi.getOneClinic(id);
      if (response.code === 200) {
        const getDoctorId = response.data.doctorClinic.map((item) => item.doctorId.toString());
        console.log('getDoctorId:', getDoctorId);
        setListDoctorId(getDoctorId);
        setDetailClinic(response.data);
      }
    })();
  }, []);

  return (
    <>
      <HomeHeader />

      <div className="detail-specialty">
        <div className="container">
          <div className="p-1"></div>
          <div className="description-specialty d-block">
            {!_.isEmpty(detailClinic) && (
              <>
                <h3>{detailClinic.name}</h3>
                <div dangerouslySetInnerHTML={{ __html: detailClinic.descriptionHTML }}></div>
              </>
            )}
          </div>

          {listDoctorId.map((item) => (
            <div className="doctor-box" key={item}>
              <div className="content-left">
                <ProfileDoctor id={item} isShowDescDoctor={true} isShowLink={true} />
              </div>
              <div className="content-right">
                <DoctorSchedule id={item} />
                <DoctorExtraInfor id={item} />
              </div>
            </div>
          ))}
          <div className="p-1"></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Clinic;
