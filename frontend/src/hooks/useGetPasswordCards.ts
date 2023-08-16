import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from 'store';
import { getAllPasswordCards } from 'store/slices/passwordCardSlice';

const useGetPasswordCards = () => {
   const dispatch = useDispatch<AppDispatch>();
   const passwordCard = useSelector((state: RootState) => state.passwordCard);

   const { passwordCards, loading, error } = passwordCard;

   const getCards = useCallback(async () => {
      const response = await dispatch(getAllPasswordCards());
      return response.payload;
   }, [dispatch]);

   return { getCards, passwordCards, loading, error };
};

export default useGetPasswordCards;
