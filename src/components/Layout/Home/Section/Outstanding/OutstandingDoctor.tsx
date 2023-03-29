import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './OutstangdingStyle.scss';

interface OutstandingDoctorProps {
  heading: React.ReactNode;
  buttonText: React.ReactNode;
  data: {
    id: string;
    img: string;
    name: string;
    title: string;
  }[];
}

const OutstandingDoctor = ({ heading, buttonText, data }: OutstandingDoctorProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div className="section-doctor">
      <div className="section-doctor-container">
        <div className="header">
          <span>{heading}</span>
          <button>{buttonText}</button>
        </div>

        <div className="body">
          <Slider {...settings}>
            {data.map((item) => (
              <a key={item.id} href="" className="section-img-link">
                <div className="outer-bg">
                  <div
                    className="section-img"
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                </div>
                <div className="position text-center">
                  <div>{item.name}</div>
                  <div>{item.title}</div>
                </div>
              </a>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OutstandingDoctor;
