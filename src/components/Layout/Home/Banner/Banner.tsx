import { useAppSelector } from '@/utils/useGetData';
import { FormattedMessage } from 'react-intl';
import './BannerStyle.scss';
import { options } from './constants';

const Banner = () => {
  const { language } = useAppSelector((state) => state.lang);
  return (
    <div className="home-banner">
      <div className="content-up">
        <div className="heading">
          <FormattedMessage id="home.banner.heading" />
        </div>
        <div className="title">
          <FormattedMessage id="home.banner.title" />
        </div>

        <div className="search">
          <i className="fas fa-search"></i>
          <input type="text" placeholder={language === 'vi' ? 'Tìm bác sĩ' : 'Find a doctor'} />
        </div>
      </div>

      <div className="content-down">
        <div className="options container-fluid">
          <ul className="options-child row">
            {options.map((item) => (
              <li key={item.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <a href="">
                  <div className="icon" style={item.img}></div>
                  <div className="text">
                    <FormattedMessage id={item.text1} />
                    <br></br>
                    <FormattedMessage id={item.text2} />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
