import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const langSlice = createSlice({
  name: 'lang',
  initialState: {
    language: 'vi',
  },
  reducers: {
    switchLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const langActions = langSlice.actions;

const langReducer = langSlice.reducer;
export default langReducer;
