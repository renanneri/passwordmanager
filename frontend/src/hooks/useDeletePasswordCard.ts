import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'store';
import { deletePasswordCard } from 'store/slices/passwordCardSlice';

const useDeletepasswordCard = () => {
   const dispatch = useDispatch<AppDispatch>();

   const deleteCard = useCallback(
      async (id: string) => {
         const response = await dispatch(deletePasswordCard(id));
         return response.payload;
      },
      [dispatch],
   );

   return { deleteCard };
};

export default useDeletepasswordCard;
