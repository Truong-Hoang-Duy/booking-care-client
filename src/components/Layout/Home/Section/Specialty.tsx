import './SpecialtyStyle.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '@/assets/specialty/co-xuong-khop.jpeg';

const Specialty = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div className="section-specialty">
      <div className="specialty-container">
        <div className="header">
          <span>Chuyên khoa phổ biến</span>
          <button>Xem thêm</button>
        </div>

        <div className="body">
          <Slider {...settings}>
            <a href="" className="specialty-img-link">
              <div className="specialty-img" style={{ backgroundImage: `url(${img})` }}></div>
              <div>Cơ xương khớp</div>
            </a>
            <a href="" className="specialty-img-link">
              <div className="specialty-img" style={{ backgroundImage: `url(${img})` }}></div>
              <div>Cơ xương khớp 2</div>
            </a>
            <a href="" className="specialty-img-link">
              <div className="specialty-img" style={{ backgroundImage: `url(${img})` }}></div>
              <div>Cơ xương khớp3</div>
            </a>
            <a href="" className="specialty-img-link">
              <div className="specialty-img" style={{ backgroundImage: `url(${img})` }}></div>
              <div>Cơ xương khớp 4</div>
            </a>
            <a href="" className="specialty-img-link">
              <div className="specialty-img" style={{ backgroundImage: `url(${img})` }}></div>
              <div>Cơ xương khớp 5</div>
            </a>
            <a className="specialty-img-link">
              <div>4</div>
            </a>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Specialty;
