import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { passwordCardApi } from 'api/services';
import { PasswordCard } from 'api/passwordCard/passwordCard.model';

export interface passwordCardSlice {
   passwordCards: PasswordCard[];
   loading: boolean;
   error: any;
}

export interface createPasswordCardSlice {
   loading: boolean;
   error: any;
}

const INITIAL_STATE = {
   passwordCards: [],
   loading: false,
   error: null,
} as passwordCardSlice;

const INITIAL_STATE_CREATE = {
   loading: false,
   error: null,
} as createPasswordCardSlice;

export const getAllPasswordCards = createAsyncThunk('passwordCard/getAllPasswordCards', passwordCardApi.getAllPasswordCards);
export const deletePasswordCard = createAsyncThunk('passwordCard/deletePasswordCard', passwordCardApi.deletePasswordCard);
export const createPasswordCard = createAsyncThunk('passwordCard/createPasswordCard', passwordCardApi.createPasswordCard);
export const updatePasswordCard = createAsyncThunk('passwordCard/updatePasswordCard', passwordCardApi.updatePasswordCard);

const passwordCardSlice = createSlice({
   name: 'passwordCard',
   initialState: INITIAL_STATE,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllPasswordCards.pending, (state) => {
            state.loading = true;
         })
         .addCase(getAllPasswordCards.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.passwordCards = action.payload.data;
         })
         .addCase(getAllPasswordCards.rejected, (state, action) => {
            state.loading = false;
            state.passwordCards = [];
            state.error = action.payload;
         })
         .addCase(deletePasswordCard.fulfilled, (state,action) => {
            state.passwordCards = state.passwordCards.filter((passwordCard) => passwordCard.id !== action.meta.arg);
         });
   },
});

export const createPasswordCardSlice = createSlice({
   name: 'createPasswordCard',
   initialState: INITIAL_STATE_CREATE,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createPasswordCard.pending, (state) => {
            state.loading = true;
         })
         .addCase(createPasswordCard.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
         })
         .addCase(createPasswordCard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
   },
});

export default passwordCardSlice.reducer;