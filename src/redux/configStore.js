import { configureStore } from '@reduxjs/toolkit'
import bookingSlice from './reducers/booking/bookingSlice';
import userSlice from './reducers/user/UserLogin';
import movieManagerSlice from './reducers/admin/movieManagerSlice';
import accountManagerSlice from './reducers/admin/accountManagerSlice';
import newsSlice from './reducers/booking/newsSlice';

export const store = configureStore({
  reducer: {
    bookingSlice,userSlice,movieManagerSlice,accountManagerSlice,newsSlice,

  },
})