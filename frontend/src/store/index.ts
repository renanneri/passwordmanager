import { configureStore } from '@reduxjs/toolkit';

import passwordCardReducer, { createPasswordCardSlice } from 'store/slices/passwordCardSlice';

const store = configureStore({
   reducer: {
      passwordCard: passwordCardReducer,
      createPasswordCard: createPasswordCardSlice.reducer,
   },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch