import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomeSectionStyle.scss';
import { Link } from 'react-router-dom';

interface HomeSectionProps {
  settings: any;
  backgroundColor?: string;
  heading: React.ReactNode;
  buttonText: React.ReactNode;
  backgroundSize: string;
  data: {
    id: string | number;
    img: string;
    title: string;
  }[];
  option: string;
}

const HomeSection = ({
  backgroundColor,
  heading,
  buttonText,
  data,
  backgroundSize,
  settings,
  option,
}: HomeSectionProps) => {
  return (
    <div className="home-section" style={{ backgroundColor: backgroundColor }}>
      <div className="section-container">
        <div className="header">
          <span>{heading}</span>
          <button>{buttonText}</button>
        </div>

        <div className="body">
          <Slider {...settings}>
            {data.map((item) => (
              <Link
                to={
                  option === 'specialty'
                    ? `detail-specialty/${item.id}`
                    : `detail-clinic/${item.id}`
                }
                key={item.id}
                className="section-img-link"
              >
                <div
                  className="section-img"
                  style={{ backgroundImage: `url(${item.img})`, backgroundSize }}
                ></div>
                <div className="mt-2">{item.title}</div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
