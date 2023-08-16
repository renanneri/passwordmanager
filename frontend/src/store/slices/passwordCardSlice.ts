import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { passwordCardApi } from 'api/services';
import { PasswordCard } from 'api/passwordCard/passwordCard.model';

export interface passwordCardSlice {
   passwordCards: PasswordCard[];
   loading: boolean;
   error: any;
}

export interface createOrUpdatePasswordCardSlice {
   loading: boolean;
   error: any;
}

const INITIAL_STATE = {
   passwordCards: [],
   loading: false,
   error: null,
} as passwordCardSlice;

const INITIAL_STATE_CREATE_OR_UPDATE = {
   loading: false,
   error: null,
} as createOrUpdatePasswordCardSlice;

export const getAllPasswordCards = createAsyncThunk('passwordCard/getAllPasswordCards', passwordCardApi.getAllPasswordCards);
export const deletePasswordCard = createAsyncThunk('passwordCard/deletePasswordCard', passwordCardApi.deletePasswordCard);
export const createPasswordCard = createAsyncThunk('passwordCard/createorUpdatePasswordCard', passwordCardApi.createPasswordCard);
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

export const createOrUpdatePasswordCardSlice = createSlice({
   name: 'createOrUpdatePasswordCard',
   initialState: INITIAL_STATE_CREATE_OR_UPDATE,
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
            state.error = action.error;
         })
         .addCase(updatePasswordCard.pending, (state) => {
            state.loading = true;
         })
         .addCase(updatePasswordCard.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
         })
         .addCase(updatePasswordCard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
         })
   },
});

export default passwordCardSlice.reducer;