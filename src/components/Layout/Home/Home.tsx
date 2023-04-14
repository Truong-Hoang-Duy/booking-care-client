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
import { GetSpecialty, doctorApi, doctorData } from '@/services/doctorService';
import { useAppSelector } from '@/utils/useGetData';

export interface HomeSection {
  id: number;
  img: string;
  title: string;
}

const Home = () => {
  const [doctor, setDoctor] = useState<doctorData[]>([]);
  const [specialty, setSpecialty] = useState<HomeSection[]>([]);
  const [clinic, setClinic] = useState<HomeSection[]>([]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    (async () => {
      const resDoctor = await doctorApi.getAllDoctor();
      if (resDoctor.code === 200) {
        setDoctor(resDoctor.data);
      }
      const resSpecialty = await doctorApi.getAllSpecialty();
      if (resSpecialty.code === 200) {
        const resSpecialtyData = resSpecialty.data.map((item) => {
          return {
            id: item.id,
            img: item.image,
            title: item.name,
          };
        });
        setSpecialty(resSpecialtyData);
      }

      const resClinic = await doctorApi.getAllClinic();
      if (resClinic.code === 200) {
        const resClinicData = resClinic.data.map((item) => {
          return {
            id: item.id,
            img: item.image,
            title: item.name,
          };
        });
        setClinic(resClinicData);
      }
    })();
  }, []);

  return (
    <>
      <HomeHeader />
      <Banner />
      <HomeSection
        heading={<FormattedMessage id="home.section.specialty" />}
        buttonText={<FormattedMessage id="home.section.button" />}
        data={specialty}
        backgroundSize="cover"
        settings={settings}
        option={'specialty'}
      />
      <HomeSection
        backgroundColor="#f5f5f5"
        heading={<FormattedMessage id="home.section.outstanding" />}
        buttonText={<FormattedMessage id="home.section.button" />}
        data={clinic}
        backgroundSize="contain"
        settings={settings}
        option={'clinic'}
      />

      <OutstandingDoctor
        heading={<FormattedMessage id="home.section.doctor" />}
        buttonText={<FormattedMessage id="home.section.button" />}
        data={doctor}
        settings={settings}
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
