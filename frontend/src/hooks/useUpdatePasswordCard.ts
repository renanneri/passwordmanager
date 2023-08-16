import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    PasswordCard
 } from 'api/passwordCard/passwordCard.model';

import { AppDispatch } from 'store';
import { updatePasswordCard } from 'store/slices/passwordCardSlice';

const useUpdatePasswordCard = () => {
    const dispatch = useDispatch<AppDispatch>();
   
    const updateCard = useCallback(async (passwordCard: PasswordCard) => {
        const response = await dispatch(updatePasswordCard(passwordCard));
        return response;
    }, [dispatch]);

    return { updateCard };
}


export default useUpdatePasswordCard;