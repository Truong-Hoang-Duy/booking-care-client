import { FormattedMessage } from 'react-intl';
import './AboutStyle.scss';

const About = () => {
  return (
    <div className="section-about">
      <div className="header">
        <span>
          <FormattedMessage id="home.section.media" />
        </span>
      </div>
      <div className="section-about-container">
        <div className="section-about-left">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/FyDQljKtWnI"
            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="section-about-right">
          <a href="">
            <div style={{ backgroundImage: 'url(src/assets/media/suckhoedoisong.png)' }}></div>
          </a>
          <a href="">
            <div style={{ backgroundImage: 'url(src/assets/media/ictnews.png)' }}></div>
          </a>
          <a href="">
            <div style={{ backgroundImage: 'url(src/assets/media/vtv1.png)' }}></div>
          </a>
          <a href="">
            <div style={{ backgroundImage: 'url(src/assets/media/vnexpress.png)' }}></div>
          </a>
          <a href="">
            <div style={{ backgroundImage: 'url(src/assets/media/suckhoedoisong.png)' }}></div>
          </a>
          <a href="">
            <div style={{ backgroundImage: 'url(src/assets/media/suckhoedoisong.png)' }}></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
