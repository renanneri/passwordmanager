import { useState, useEffect } from 'react';
import { PasswordCard } from 'api/passwordCard/passwordCard.model';
import { Card, Button } from '@mui/material';
import './App.css'
import { DecryptPassword } from 'decrypt';
import useDeletepasswordCard from 'hooks/useDeletePasswordCard';


export function PasswordCardComponent(props:{ passwordCard: PasswordCard, setEdit: (card: PasswordCard) => void}) {

    const { deleteCard } = useDeletepasswordCard();

    const [passwordInfo, setPasswordInfo] = useState({
        showPassword: false,
        password: "",
    })

    useEffect(() => {
        console.log(props.passwordCard.password)
        const decryptedPassword = DecryptPassword(props.passwordCard.password);
        console.log("DECRYPTED PASSWORD")
        console.log(decryptedPassword)
        setPasswordInfo({
            showPassword: false,
            password: decryptedPassword,
        })
        },[])

    

    const togglePassword = () => {
        if (passwordInfo.showPassword) {
            setPasswordInfo({ ...passwordInfo, showPassword: false });
        } else {
            setPasswordInfo({ ...passwordInfo, showPassword: true });
        }

    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(passwordInfo.password)
    }
        
        return (
          <Card className="card">
            <h2>Name: {props.passwordCard.name}</h2>
            <p>Username: {props.passwordCard.username}</p>
            <div>
                <p>Password: {passwordInfo.showPassword ? passwordInfo.password : "****"}</p>
                <Button
                onClick={togglePassword}
                >
                    {passwordInfo.showPassword ? "Hide" : "Show"}
                </Button>
                <Button
                onClick={copyToClipboard}
                >
                    Copy
                </Button>
            </div>
            <p>URL: {props.passwordCard.url}</p>
            <Button
                onClick={() => deleteCard(props.passwordCard.id)}
                >
                    Delete
                </Button>
                <Button
                onClick={() => props.setEdit(props.passwordCard)}
                >
                    Edit
                </Button>
          </Card>
  )
}
