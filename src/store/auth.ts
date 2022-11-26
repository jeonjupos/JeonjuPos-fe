import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  user: ''
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user: string}>){
      const {user} = action.payload;

      state.user = user;
    }
  }
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
