import { ListResponse } from '@/api/statusCodes';
import { UserData } from '@/services';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoading?: boolean;
  data?: UserData[];
  message: string;
  code?: number;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  data: [],
  message: '',
  code: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
    },

    loginSuccess(state, action: PayloadAction<ListResponse<UserData>>) {
      const { payload } = action;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.data = payload.data;
      state.code = payload.code;
      state.message = payload.message;
    },

    loginError(state, action: PayloadAction<string>) {
      state.isLoading = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.data = undefined;
    },
  },
});

// Export actions
export const authActions = authSlice.actions;

// Export selectors
export const authSelector = (state: any) => state.auth;

// Export reducer
const authReducer = authSlice.reducer;
export default authReducer;
