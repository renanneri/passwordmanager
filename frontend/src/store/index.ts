import { configureStore } from '@reduxjs/toolkit';

import passwordCardReducer, { createOrUpdatePasswordCardSlice } from 'store/slices/passwordCardSlice';

const store = configureStore({
   reducer: {
      passwordCard: passwordCardReducer,
      createOrUpdatePasswordCard: createOrUpdatePasswordCardSlice.reducer,
   },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch