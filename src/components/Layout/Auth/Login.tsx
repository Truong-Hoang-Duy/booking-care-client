import request from 'axios';
import { useReducer, useState } from 'react';
import { userApi } from '@/services';
import { ActionType, ApiActionKind, StateType } from '@/api/statusCodes';
import './LoginStyle.scss';
import { useAppDispatch } from '@/shared/hooks/useGetData';
import { authActions } from '@/modules/Auth/authSlice';

function fetchReducer<T extends Record<string, unknown>>(
  state: StateType<T>,
  action: ActionType<T>
) {
  const { type, payload } = action;
  switch (type) {
    case ApiActionKind.REQUEST:
      return { ...state, isLoading: payload.isLoading };

    case ApiActionKind.SUCCESS:
    case ApiActionKind.ERROR:
      return {
        ...state,
        code: payload.code,
        data: payload.data,
        isLoading: payload.isLoading,
        message: payload.message,
      };

    default:
      return state;
  }
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPw, setIsShowPw] = useState(false);

  // const [state, dispatch] = useReducer(fetchReducer, {
  //   data: [],
  //   isLoading: false,
  //   message: '',
  // });
  // const { data, isLoading, message, code } = state;

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    // dispatch({
    //   type: ApiActionKind.REQUEST,
    //   payload: { data: [], isLoading: true, message: 'request' },
    // });
    // try {
    //   const response = await userApi.handleLogin(email, password);
    //   dispatch({
    //     type: ApiActionKind.SUCCESS,
    //     payload: {
    //       code: response.code,
    //       data: response.data as any,
    //       isLoading: false,
    //       message: response.message,
    //     },
    //   });
    // } catch (error) {
    //   if (request.isAxiosError(error) && error.response) {
    //     const { data } = error.response;
    //     dispatch({
    //       type: ApiActionKind.ERROR,
    //       payload: {
    //         code: data.code,
    //         data: data.data,
    //         isLoading: false,
    //         message: data.message,
    //       },
    //     });
    //   }
    // }

    dispatch(authActions.loginRequest({ email, password }));

    console.log('login');
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
              />
              <div onClick={() => setIsShowPw(!isShowPw)}>
                <i className={isShowPw ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
              </div>
            </div>
          </div>

          {/* {code === 500 && <span className="text-danger">{message}</span>} */}

          <div className="col-12">
            <button className="login-btn" onClick={handleLogin}>
              {false ? (
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
