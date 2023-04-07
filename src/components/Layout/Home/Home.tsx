import { HomeHeader } from '@/components/Common';
import { Footer } from '@/components/Common/Footer';
import { HomeSection } from '@/components/Common/HomeSection';
import {
  DoctorData,
  HandbookData,
  MedicalData,
  SpecialtyData,
} from '@/components/Common/HomeSection/fakeData';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Banner } from './Banner';
import { About } from './Section/About';
import { Handbook } from './Section/Handbook';
import { OutstandingDoctor } from './Section/Outstanding';
import { doctorApi, doctorData } from '@/services/doctorService';
import { useAppSelector } from '@/utils/useGetData';

const Home = () => {
  const [doctor, setDoctor] = useState<doctorData[]>([]);

  useEffect(() => {
    (async () => {
      const response = await doctorApi.getAllDoctor();
      setDoctor(response.data);
    })();
  }, []);

  return (
    <>
      <HomeHeader />
      <Banner />
      <HomeSection
        heading={<FormattedMessage id="home.section.specialty" />}
        buttonText={<FormattedMessage id="home.section.button" />}
        data={SpecialtyData}
        backgroundSize="cover"
      />
      <HomeSection
        backgroundColor="#f5f5f5"
        heading={<FormattedMessage id="home.section.outstanding" />}
        buttonText={<FormattedMessage id="home.section.button" />}
        data={MedicalData}
        backgroundSize="contain"
      />

      <OutstandingDoctor
        heading={<FormattedMessage id="home.section.doctor" />}
        buttonText={<FormattedMessage id="home.section.button" />}
        data={doctor}
      />

      <Handbook
        heading={<FormattedMessage id="home.section.handbook" />}
        buttonText={<FormattedMessage id="home.section.button" />}
        data={HandbookData}
      />

      <About />

      <Footer />
    </>
  );
};

export default Home;
