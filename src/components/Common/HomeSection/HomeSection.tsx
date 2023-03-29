import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomeSectionStyle.scss';

interface HomeSectionProps {
  backgroundColor?: string;
  heading: React.ReactNode;
  buttonText: React.ReactNode;
  backgroundSize: string;
  data: {
    id: string;
    img: string;
    title: string;
  }[];
}

const HomeSection = ({
  backgroundColor,
  heading,
  buttonText,
  data,
  backgroundSize,
}: HomeSectionProps) => {
  const settings = {
    dots: false,
    infinite: true,
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
              <a key={item.id} href="" className="section-img-link">
                <div
                  className="section-img"
                  style={{ backgroundImage: `url(${item.img})`, backgroundSize }}
                ></div>
                <div>{item.title}</div>
              </a>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
