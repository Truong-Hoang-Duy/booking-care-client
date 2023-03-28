import './FooterStyle.scss';

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="https://www.facebook.com/bookingcare" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-6 mb-4 font-size-14 footer-left">
              <a
                href="/"
                className="d-flex align-items-center justify-content-center  justify-content-md-start"
              >
                <div className="footer-logo"></div>
              </a>
              <p className="fw-bold">Công ty Cổ phần Công nghệ BookingCare</p>
              <p className="address">
                <i className="fa-solid fa-location-dot"></i>
                <span>Tầng 6, Tòa nhà D'Office, tổ 28, P. Dịch Vọng, Q. Cầu Giấy, Tp. Hà Nội</span>
              </p>
              <p className="address">
                <i className="fa-solid fa-check"></i>
                <span>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span>
              </p>
            </div>

            <div className="col-md-3 mb-4 footer-center d-flex flex-column gap-1">
              <a href="#!" className="text-black text-decoration-none py-2">
                Liên hệ hợp tác
              </a>
              <a href="#!" className="text-black text-decoration-none py-2">
                Gói chuyển đổi số doanh nghiệp
              </a>
              <a href="#!" className="text-black text-decoration-none py-2">
                Câu hỏi thường gặp
              </a>
              <a href="#!" className="text-black text-decoration-none py-2">
                Điều khoản sử dụng
              </a>
              <a href="#!" className="text-black text-decoration-none py-2">
                Chính sách Bảo mật
              </a>
            </div>

            <div className="col-md-3 mb-md-0 mb-4 footer-right">
              <div>
                <p className="title mb-1 fw-bold">Trụ sở tại Hà Nội</p>
                <p className="child">
                  Tầng 6, Tòa nhà D'Office, tổ 28, P. Dịch Vọng, Q. Cầu Giấy, Tp. Hà Nội
                </p>
              </div>

              <div>
                <p className="title mb-1 fw-bold">Văn phòng tại TP Hồ Chí Minh</p>
                <p className="child">Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
              </div>

              <div>
                <p className="title mb-1 fw-bold">Hỗ trợ khách hàng</p>
                <p className="child">support@bookingcare.vn (7h - 20h)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4 footer-bottom">
        © 2021 Copyright:&nbsp;
        <a className="text-reset text-decoration-none fw-bold" href="#">
          BookingCare
        </a>
      </div>
    </footer>
  );
};

export default Footer;
