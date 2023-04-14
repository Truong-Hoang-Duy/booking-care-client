import { HomeHeader } from '@/components/Common';
import { Footer } from '@/components/Common/Footer';
import { userApi } from '@/services';
import { GetOneSpecialty, doctorApi } from '@/services/doctorService';
import { useAppSelector } from '@/utils/useGetData';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { ListOption } from '../Admin/DoctorManage/DoctorManage';
import DoctorExtraInfor from '../Doctor/DetailDoctor/DoctorExtraInfor';
import DoctorSchedule from '../Doctor/DetailDoctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/DetailDoctor/ProfileDoctor';
import './SpecialtyStyle.scss';
import { FakeSpecialty } from './constant';

const Specialty = () => {
  const { id } = useParams();
  const { language } = useAppSelector((state) => state.lang);

  const [detailSpecialty, setDetailSpecialty] = useState<GetOneSpecialty>(FakeSpecialty);

  const [listDoctorId, setListDoctorId] = useState<string[]>([]);

  const [listLocation, setListLocation] = useState<ListOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<ListOption | null>({
    label: 'Toàn quốc',
    value: 'ALL',
  });

  useEffect(() => {
    (async () => {
      const response = await doctorApi.getOneSpecialty(id, selectedLocation?.value || 'ALL');

      if (response.code === 200) {
        const getDoctorId = response.data.doctorSpecialty.map((item) => item.doctorId.toString());
        setListDoctorId(getDoctorId);
        setDetailSpecialty(response.data);
      }
    })();
  }, [selectedLocation?.value]);

  useEffect(() => {
    (async () => {
      const resAllcode = await userApi.getAllcode('PROVINCE');
      if (resAllcode.code === 200) {
        const getProvince = resAllcode.data.map((item) => ({
          label: language === 'vi' ? item.valueVi : item.valueEn,
          value: item.keyMap,
        }));
        getProvince.unshift({ label: 'Toàn quốc', value: 'ALL' });
        setListLocation(getProvince);
      }
    })();
  }, [language]);

  return (
    <>
      <HomeHeader />
      <div className="detail-specialty">
        <div className="container">
          <div className="p-1"></div>
          <div className="description-specialty">
            {detailSpecialty && !_.isEmpty(detailSpecialty) && (
              <div dangerouslySetInnerHTML={{ __html: detailSpecialty.descriptionHTML }}></div>
            )}
          </div>

          <div className="select-location-doctor">
            <Select
              value={selectedLocation}
              onChange={setSelectedLocation}
              options={listLocation}
            />
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

export default Specialty;
