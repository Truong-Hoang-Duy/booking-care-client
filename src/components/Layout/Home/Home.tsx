import { HomeHeader } from '@/components/Common';
import { Footer } from '@/components/Common/Footer';
import { HomeSection } from '@/components/Common/HomeSection';
import {
  DoctorData,
  HandbookData,
  MedicalData,
  SpecialtyData,
} from '@/components/Common/HomeSection/fakeData';
import { useEffect } from 'react';
import { Banner } from './Banner';
import { About } from './Section/About';
import { Handbook } from './Section/Handbook';
import { OutstandingDoctor } from './Section/Outstanding';

const Home = () => {
  useEffect(() => {
    localStorage.setItem('language', 'vi');
  });
  return (
    <>
      <HomeHeader />
      <Banner />
      <HomeSection
        heading="Chuyên khoa phổ biến"
        buttonText="Xem thêm"
        data={SpecialtyData}
        backgroundSize="cover"
      />
      <HomeSection
        backgroundColor="#f5f5f5"
        heading="Chuyên khoa phổ biến"
        buttonText="Xem thêm"
        data={MedicalData}
        backgroundSize="contain"
      />

      <OutstandingDoctor heading="Chuyên khoa phổ biến" buttonText="Xem thêm" data={DoctorData} />

      <Handbook heading="Cẩm nang" buttonText="Tất cả bài viết" data={HandbookData} />

      <About />

      <Footer />
    </>
  );
};

export default Home;
