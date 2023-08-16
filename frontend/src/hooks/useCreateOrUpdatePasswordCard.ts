import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from 'store';
import { createPasswordCard, updatePasswordCard } from 'store/slices/passwordCardSlice';
import { CreatePasswordCard, PasswordCard } from 'api/passwordCard/passwordCard.model';

const useCreateOrUpdatePasswordCard = () => {
   const dispatch = useDispatch<AppDispatch>();

   const createOrUpdatePasswordCardSlice = useSelector(
      (state: RootState) => state.createOrUpdatePasswordCard,
   );

   const { loading, error } = createOrUpdatePasswordCardSlice;

   const createCard = useCallback(
      async (passwordCard: CreatePasswordCard) => {
         const response = await dispatch(createPasswordCard(passwordCard));
         return response;
      },
      [dispatch],
   );

   const updateCard = useCallback(
      async (passwordCard: PasswordCard) => {
         const response = await dispatch(updatePasswordCard(passwordCard));
         return response;
      },
      [dispatch],
   );

   return { createCard, updateCard, loading, error };
};

export default useCreateOrUpdatePasswordCard;
