import { HomeHeader } from '@/components/Common';
import { Banner } from './Banner';
import Specialty from './Section/Specialty';

const Home = () => {
  return (
    <>
      <HomeHeader />
      <Banner />
      <Specialty />
      <div className="" style={{ height: '300px' }}></div>
    </>
  );
};

export default Home;
