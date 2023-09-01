import { Button, Dialog, TextField } from '@mui/material';
import axios from 'axios';
import { Fragment, useContext, useState } from 'react';
import { AppContext } from '../context';

export default function AuthenticationForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const { isOpenSignInForm, setIsOpenSignInForm, isOpenSignUpForm, setIsOpenSignUpForm, setIsSigned } = useContext(AppContext);
    
    async function handleSignIn() {
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

    async function handleSignUp() {
        let res = await axios.post('http://localhost:3001/auth/signUp', {
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        });
        if(res.status === 200) {
            setIsSigned(true);
        } else {
            // fail
        }
    }

    return (
        <Fragment>
            <Dialog open={isOpenSignInForm} 
            disableScrollLock={true}
            onClose={() => setIsOpenSignInForm(false)}>
            <div className="authentication-popup">
                <div className="text-3xl mb-3">SIGN IN</div>
                <TextField
                    className="my-2" 
                    label="Email" 
                    variant="outlined" 
                    type="email" 
                    size="small" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth />
                <TextField 
                    className="my-2" 
                    label="Password" 
                    variant="outlined" 
                    type="password" 
                    size="small" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth />
                <Button 
                    className="btn-sign" 
                    variant="contained" 
                    onClick={() => handleSignIn()}>Sign in</Button>
            </div>
            </Dialog>

            <Dialog open={isOpenSignUpForm} 
                disableScrollLock={true}
                onClose={() => setIsOpenSignUpForm(false)}>
                <div className="authentication-popup">
                    <div className="text-3xl mb-3">SIGN UP</div>
                    <TextField
                        className="my-2" 
                        label="Email" 
                        variant="outlined" 
                        type="email" 
                        size="small" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth />
                    <TextField
                        className="my-2" 
                        label="Username" 
                        variant="outlined" 
                        size="small" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth />
                    <TextField 
                        className="my-2" 
                        label="Password" 
                        variant="outlined" 
                        type="password" 
                        size="small" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth />
                    <TextField 
                        className="my-2" 
                        label="Confirm password" 
                        variant="outlined" 
                        type="password" 
                        size="small" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth />
                    <div style={{
                        width: '80%',
                        height: '1px',
                        background: 'gray',
                        margin: '10px auto'
                    }}></div>
                    <Button 
                        className="w-full mt-2"
                        variant="contained" 
                        onClick={() => handleSignUp()}>Sign up</Button>
                </div>
            </Dialog>
        </Fragment>

    )
}