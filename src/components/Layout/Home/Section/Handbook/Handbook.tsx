import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './HandbookStyle.scss';

interface HandbookProps {
  heading: React.ReactNode;
  buttonText: React.ReactNode;
  data: {
    id: string;
    img: string;
    title: string;
  }[];
}

const Handbook = ({ heading, buttonText, data }: HandbookProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <div className="section-handbook">
      <div className="section-handbook-container">
        <div className="header">
          <span>{heading}</span>
          <button>{buttonText}</button>
        </div>

        <div className="body">
          <Slider {...settings}>
            {data.map((item) => (
              <a key={item.id} href="" className="section-img-link">
                <div className="section-img" style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="title">{item.title}</div>
              </a>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Handbook;
