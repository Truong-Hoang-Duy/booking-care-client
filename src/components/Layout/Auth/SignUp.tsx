import { authActions } from '@/modules/Auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/utils/useGetData';
import { KeyboardEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginStyle.scss';
import { FormattedMessage } from 'react-intl';
import { userApi } from '@/services';
import { toast } from 'react-toastify';
import axios from 'axios';
import CommonUtils from '@/utils/CommonUtils';
import _ from 'lodash';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isShowPw, setIsShowPw] = useState(false);
  const [isShowRePw, setIsShowRePw] = useState(false);

  const response = useAppSelector((state) => state.auth);
  const { code, message, isLoading } = response;

  const handleSignUp = async () => {
    const reGmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const validateEmail = reGmail.test(email);
    const validatePw = _.isEqual(password, rePassword);

    if (validateEmail && validatePw) {
      const data = { email, password };
      try {
        const response = await userApi.handleSignUp(data);
        if (response && response.code === 200) {
          toast.success(response.message);
          setEmail('');
          setPassword('');
          setRePassword('');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error('Kiểm tra thông tin tài khoản');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 login-text">
            <FormattedMessage id="account.sign-up" />
          </div>
          <div className="col-12 form-group login-input">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              className="form-control "
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="col-12 form-group login-input">
            <label className="mb-2" htmlFor="password">
              <FormattedMessage id="account.password" />
            </label>
            <div className="login-control-pw">
              <input
                type={isShowPw ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div onClick={() => setIsShowPw(!isShowPw)}>
                <i className={isShowPw ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
              </div>
            </div>
          </div>

          <div className="col-12 form-group login-input">
            <label className="mb-2" htmlFor="re-password">
              <FormattedMessage id="account.re-password" />
            </label>
            <div className="login-control-pw">
              <input
                type={isShowRePw ? 'text' : 'password'}
                className="form-control"
                id="re-password"
                placeholder="Enter your password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <div onClick={() => setIsShowRePw(!isShowRePw)}>
                <i className={isShowRePw ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
              </div>
            </div>
          </div>

          {code === 500 && <span className="text-danger">{message}</span>}

          <div className="col-12">
            <button className="login-btn" onClick={handleSignUp}>
              {isLoading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
          <div className="col-12">
            <span className="login-note">
              <FormattedMessage id="account.verify-doctor" />
            </span>
          </div>
          <div className="col-12 text-center mt-3 text-uppercase account-option">
            <span className="position-relative d-block">
              <div className="position-relative">
                <FormattedMessage id="account.or" />
              </div>
            </span>
          </div>
          <div className="col-12 login-social">
            <i className="fa-brands fa-google-plus-g google"></i>
            <i className="fa-brands fa-facebook-f facebook"></i>
          </div>

          <div className="policy text-center mt-3">
            <p>
              <FormattedMessage id="account.policy" />
            </p>
            <p>
              <a href="">
                <FormattedMessage id="account.term" />
              </a>
              &
              <a href="">
                <FormattedMessage id="account.privacy" />
              </a>
            </p>
          </div>

          <div className="text-center mt-3 new-account">
            <FormattedMessage id="account.have-account" />
            <Link to="/login">
              <FormattedMessage id="home.header.login" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
