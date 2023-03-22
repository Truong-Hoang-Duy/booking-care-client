import { ListResponse } from '@/api/statusCodes';
import { userApi, UserData } from '@/services';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import request from 'axios';

function fetchUser(payload: { email: string; password: string }) {
  const { email, password } = payload;
  return userApi.handleLogin(email, password);
}

function* handleLogin(payload: LoginPayload) {
  try {
    const response: ListResponse<UserData> = yield call(fetchUser, payload);
    console.log(response);
    yield put(authActions.loginSuccess(response));
    localStorage.setItem('access_token', 'token');
  } catch (error) {
    if (request.isAxiosError(error) && error.response) {
      console.log(error.response.data);
    }
  }
}

function* handleLogout() {
  localStorage.removeItem('access_token');
  // redirect to login page
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.loginRequest.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
