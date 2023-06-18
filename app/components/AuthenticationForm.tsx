import { Button, Dialog, TextField } from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from '../context';

export default function AuthenticationForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isOpenAuthForm, setIsOpenAuthForm, setIsSigned } = useContext(AppContext);
    
    async function handleSubmit() {
        let res = await axios.post('http://localhost:3001/auth/signIn', {
            email: email,
            password: password
        });
        if(res.status === 200) {
            setIsSigned(true);
        } else {
            // fail
        }
    }

    return (
        <Dialog open={isOpenAuthForm} 
            onClose={() => setIsOpenAuthForm(false)}>
            <div className="authentication-popup">
                <div className="text-3xl mb-3">Sign in</div>
                <TextField
                    className="my-2.5" 
                    label="Email" 
                    variant="outlined" 
                    type="email" 
                    size="small" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth />
                <TextField 
                    className="my-2.5" 
                    label="Password" 
                    variant="outlined" 
                    type="password" 
                    size="small" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth />
                <Button 
                    className="my-2.5 w-full" 
                    variant="contained" 
                    onClick={() => handleSubmit()}>Sign in</Button>
            </div>
        </Dialog>
    )
}