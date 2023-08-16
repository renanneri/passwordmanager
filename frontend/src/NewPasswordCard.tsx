import { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material';

import useCreatePasswordCards from 'hooks/useCreatePasswordCard';
import useUpdatePasswordCards from 'hooks/useUpdatePasswordCard';
import { CreatePasswordCard, PasswordCard } from 'api/passwordCard/passwordCard.model';


export function NewPasswordCard(props:{ closeModal: () => void, edit: boolean, passwordCard?: PasswordCard }) {

const [formData, setFormData] = useState({name: "",username: "",url: "", password: ""});

const { createCard } = useCreatePasswordCards();

const { updateCard } = useUpdatePasswordCards();

useEffect(() => {
    if (props.edit && props.passwordCard) {
        setFormData({
            name: props.passwordCard.name,
            username: props.passwordCard.username,
            url: props.passwordCard.url,
            password: props.passwordCard.password
        })
    }
}, [props.edit, props.passwordCard])

  const handleChange = (event :React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (props.edit) {
        const passwordCard: PasswordCard ={
            id: props.passwordCard!.id,
            name: formData.name,
            username: formData.username,
            url: formData.url,
            password: formData.password
        }

        const response = await updateCard(passwordCard);
        if (response.meta.requestStatus === "fulfilled") {
            props.closeModal();
        };
    } else {
        const passwordCard: CreatePasswordCard ={
            name: formData.name,
            username: formData.username,
            url: formData.url,
            password: formData.password
        }
    
         const response = await createCard(passwordCard);

         if (response.meta.requestStatus === "fulfilled") {
            props.closeModal();
        };
    }
};

    return (
        <form onSubmit={handleSubmit}>
            <TextField name="name" label="Name" variant="outlined" value={formData.name} onChange={handleChange} />
            <TextField name="username" label="Username" variant="outlined" value={formData.username} onChange={handleChange}/>
            <TextField name="url" label="Url" variant="outlined" value={formData.url} onChange={handleChange}/>
            <TextField name="password" label="Password" variant="outlined" value={formData.password} onChange={handleChange}/>
            <Button variant="contained" type="submit">{props.edit ? "Edit" : "Create"}</Button>
        </form>
    )
}