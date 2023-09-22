import { Button, Dialog, TextField } from '@mui/material';
import axios from 'axios';
import { Fragment, useContext, useState } from 'react';
import { AppContext } from '../context';

export default function AuthenticationForm() {
    const initialValueFormData = {
        email: "",
        username: "",
        confirmPassword: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialValueFormData)
    const { isOpenSignInForm, setIsOpenSignInForm, isOpenSignUpForm, setIsOpenSignUpForm, setIsSigned } = useContext(AppContext);
    
    async function handleSignIn() {
        // let res = await axios.post('http://localhost:3001/auth/signIn', {
        //     email: formData.email,
        //     password: formData.password
        // });
        // if(res.status === 200) {
        //     setIsSigned(true);
        // } else {
        //     // fail
        // }
    }

    async function handleSignUp() {
        // let res = await axios.post('http://localhost:3001/auth/signUp', {
        //     email: formData.email,
        //     username: formData.username,
        //     password: formData.password,
        //     confirmPassword: formData.confirmPassword
        // });
        // if(res.status === 200) {
            
        // } else {
        //     // fail
        // }
    }

    function handleForgetPassword(e: any) {
        e.preventDefault();
    }

    function closeForm() {
        setFormData(initialValueFormData);
    }

    function handleOnChange(e: any) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Fragment>
            <Dialog open={isOpenSignInForm} 
            disableScrollLock={true}
            onClose={() => {
                setIsOpenSignInForm(false);
                closeForm()
            }}>
            <form className="authentication-popup">
                <div className="text-3xl mb-3">SIGN IN</div>
                <TextField
                    className="my-2" 
                    label="Email" 
                    variant="outlined" 
                    type="email" 
                    size="small" 
                    name="email"
                    value={formData.email} 
                    onChange={(e) => handleOnChange(e)}
                    autoComplete="email"
                    fullWidth />
                <TextField 
                    className="my-2" 
                    label="Password" 
                    variant="outlined" 
                    type="password" 
                    size="small"
                    name="password" 
                    value={formData.password}
                    onChange={(e) => handleOnChange(e)}
                    autoComplete="current-password"
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
                        onClick={() => handleSignIn()}>Sign in</Button>
                <div>
                    <a href="" 
                        onClick={(e) => handleForgetPassword(e)}>Forget password</a>
                </div>
            </form>
            </Dialog>

            <Dialog open={isOpenSignUpForm} 
                disableScrollLock={true}
                onClose={() => {
                    setIsOpenSignUpForm(false);
                    closeForm()
                }}>
                <form className="authentication-popup">
                    <div className="text-3xl mb-3">SIGN UP</div>
                    <TextField
                        className="my-2" 
                        label="Email" 
                        variant="outlined" 
                        type="email" 
                        size="small" 
                        name="email"
                        value={formData.email} 
                        onChange={(e) => handleOnChange(e)}
                        autoComplete="email"
                        fullWidth />
                    <TextField
                        className="my-2" 
                        label="Username" 
                        variant="outlined" 
                        size="small" 
                        name="username"
                        value={formData.username} 
                        onChange={(e) => handleOnChange(e)}
                        autoComplete="username"
                        fullWidth />
                    <TextField 
                        className="my-2" 
                        label="Password" 
                        variant="outlined" 
                        type="password" 
                        size="small" 
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleOnChange(e)}
                        autoComplete="new-password"
                        fullWidth />
                    <TextField 
                        className="my-2" 
                        label="Confirm password" 
                        variant="outlined" 
                        type="password" 
                        size="small" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => handleOnChange(e)}
                        autoComplete="new-password"
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
                </form>
            </Dialog>
        </Fragment>

    )
}