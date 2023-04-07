import { authActions } from '@/modules/Auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/utils/useGetData';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyle.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPw, setIsShowPw] = useState(false);

  const dispatch = useAppDispatch();
  const response = useAppSelector((state) => state.auth);
  const { code, message, isLoading } = response;

  const handleLogin = () => {
    dispatch(authActions.loginRequest({ email, password }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (isLoggedIn) navigate('/system/user-manage');
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 login-text">Login</div>
          <div className="col-12 form-group login-input">
            <label htmlFor="email">Email:</label>
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
            <label htmlFor="password">Password:</label>
            <div className="login-control-pw">
              <input
                type={isShowPw ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <div onClick={() => setIsShowPw(!isShowPw)}>
                <i className={isShowPw ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
              </div>
            </div>
          </div>

          {code === 500 && <span className="text-danger">{message}</span>}

          <div className="col-12">
            <button className="login-btn" onClick={handleLogin}>
              {isLoading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </div>
          <div className="col-12">
            <span className="login-forgot-pw">Forgot your password?</span>
          </div>
          <div className="col-12 text-center mt-3">
            <span>Or Login with:</span>
          </div>
          <div className="col-12 login-social">
            <i className="fa-brands fa-google-plus-g google"></i>
            <i className="fa-brands fa-facebook-f facebook"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
