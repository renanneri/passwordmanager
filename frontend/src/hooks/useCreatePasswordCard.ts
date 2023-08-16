import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch,RootState } from 'store';
import { createPasswordCard } from 'store/slices/passwordCardSlice';
import {
   CreatePasswordCard
} from 'api/passwordCard/passwordCard.model';

const useCreatepasswordCard = () => {
    const dispatch = useDispatch<AppDispatch>();

    const createPasswordCardSlice = useSelector((state: RootState) => state.createPasswordCard);

   const { loading, error } = createPasswordCardSlice;
  
    const createCard = useCallback(async (passwordCard: CreatePasswordCard) => {
       const response = await dispatch(createPasswordCard(passwordCard));
       return response;
    }, [dispatch]);
 
    return { createCard, loading, error };
 };

 export default useCreatepasswordCard;