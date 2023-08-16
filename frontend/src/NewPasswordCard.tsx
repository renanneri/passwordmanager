import { useEffect, useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';

import useCreateOrUpdatePasswordCards from 'hooks/useCreateorUpdatePasswordCard';
import { CreatePasswordCard, PasswordCard } from 'api/passwordCard/passwordCard.model';

const FormStyle = {
   display: 'flex',
   flexDirection: 'column' as 'column',
   gap: '1rem',
   padding: '1rem',
};

export function NewPasswordCard(props: {
   closeModal: () => void;
   edit: boolean;
   passwordCard?: PasswordCard;
}) {
   const [formData, setFormData] = useState({ name: '', username: '', url: '', password: '' });

   const { createCard, updateCard, error } = useCreateOrUpdatePasswordCards();

   useEffect(() => {
      if (props.edit && props.passwordCard) {
         setFormData({
            name: props.passwordCard.name,
            username: props.passwordCard.username,
            url: props.passwordCard.url,
            password: props.passwordCard.password,
         });
      }
   }, [props.edit, props.passwordCard]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (props.edit) {
         const passwordCard: PasswordCard = {
            id: props.passwordCard!.id,
            name: formData.name,
            username: formData.username,
            url: formData.url,
            password: formData.password,
         };

         const response = await updateCard(passwordCard);
         if (response.meta.requestStatus === 'fulfilled') {
            props.closeModal();
         }
      } else {
         const passwordCard: CreatePasswordCard = {
            name: formData.name,
            username: formData.username,
            url: formData.url,
            password: formData.password,
         };

         const response = await createCard(passwordCard);

         if (response.meta.requestStatus === 'fulfilled') {
            props.closeModal();
         }
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div style={FormStyle}>
            <TextField
               name="name"
               label="Name"
               variant="outlined"
               value={formData.name}
               onChange={handleChange}
            />
            <TextField
               name="username"
               label="Username"
               variant="outlined"
               value={formData.username}
               onChange={handleChange}
            />
            <TextField
               name="url"
               label="Url"
               variant="outlined"
               value={formData.url}
               onChange={handleChange}
            />
            <TextField
               name="password"
               label="Password"
               variant="outlined"
               value={formData.password}
               onChange={handleChange}
            />
            <Button variant="contained" type="submit">
               {props.edit ? 'Edit' : 'Create'}
            </Button>
            {error ? (
               <Alert severity="error">
                  Error while {props.edit ? 'editing' : 'creating'} card. You must have left an
                  empty field
               </Alert>
            ) : null}
         </div>
      </form>
   );
}
