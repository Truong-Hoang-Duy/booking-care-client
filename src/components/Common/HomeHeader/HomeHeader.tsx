import './HomeHeaderStyle.scss';
import { FormattedMessage } from 'react-intl';
import { ChangeEvent, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/useGetData';
import { langActions } from '@/modules/Lang/langSlice';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { authActions } from '@/modules/Auth/authSlice';

const HomeHeader = () => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.auth);

  const handleChooseLang = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(langActions.switchLanguage(e.currentTarget.id));
  };

  return (
    <div className="home-header-container">
      <div className="home-header-content">
        <div className="left-content">
          {/* <i className="fa-solid fa-bars left-content-menu"></i> */}
          <a href="/" className="home-header-link">
            <img src="/src/assets/images/logo.svg" className="home-header-logo" alt="" />
          </a>
        </div>

        <div className="center-content d-none d-xl-flex">
          <div className="center-content-child">
            <div className="heading-title">
              <FormattedMessage id="home.header.specialist" />
            </div>
            <div className="subs-title">
              <FormattedMessage id="home.header.searchDoctor" />
            </div>
          </div>

          <div className="center-content-child">
            <div className="heading-title">
              <FormattedMessage id="home.header.health" />
            </div>
            <div className="subs-title">
              <FormattedMessage id="home.header.selectRoom" />
            </div>
          </div>

          <div className="center-content-child">
            <div className="heading-title">
              <FormattedMessage id="home.header.doctor" />
            </div>
            <div className="subs-title">
              <FormattedMessage id="home.header.selectDoctor" />
            </div>
          </div>

          <div className="center-content-child">
            <div className="heading-title">
              <FormattedMessage id="home.header.fee" />
            </div>
            <div className="subs-title">
              <FormattedMessage id="home.header.checkHealth" />
            </div>
          </div>
        </div>

        <div className="right-content">
          <div className="language-option">
            <i className="fa-solid fa-globe"></i>
            <span>
              <FormattedMessage id="home.header.lang" />
            </span>
            <div className="language-select">
              <div
                className="language-vn language-child"
                id="vi"
                onClick={(e) => handleChooseLang(e)}
              >
                <span id="vi" className="fi fi-vn"></span>
                <span id="vi">VN</span>
              </div>
              <div
                className="language-en language-child"
                id="en"
                onClick={(e) => handleChooseLang(e)}
              >
                <span className="fi fi-gb" id="en"></span>
                <span id="en">EN</span>
              </div>
            </div>
            <i className="fa-solid fa-chevron-down px-2"></i>
          </div>

          {_.isEmpty(data?.email) ? (
            <>
              <Link to="/signup" className="account login">
                <FormattedMessage id="account.sign-up" />
              </Link>
              <Link to="/login" className="account">
                <FormattedMessage id="home.header.login" />
              </Link>
            </>
          ) : (
            <>
              <div className="account login pe-none">{data?.email}</div>
              <div className="account" onClick={() => dispatch(authActions.logout())}>
                <FormattedMessage id="home.header.logout" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
