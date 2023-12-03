'use client';
import Loading from '@/app/components/Loading';
import { AppContext } from '@/app/context/appContext';
import { ProfileContext } from '@/app/context/profileContext';
import { signInSchema } from '@/utils/validationSchema';
import { Button, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function SignInForm() {
    const { requestAPI, navigation } = useContext(AppContext);
    const { setupUser } = useContext(ProfileContext);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: signInSchema,
        onSubmit: handleSignIn
    });

    async function handleSignIn() {
        try {
            const oParams = {
                username: formik.values.username,
                password: formik.values.password
            }
            setIsLoading(true);
            const res = await requestAPI('/auth/signIn', 'POST', oParams);
            setIsLoading(false);
            toast.success(res.message);
            setupUser(res.accessToken, res.username);
            navigation('/');
        } catch(err: any) {
            setIsLoading(false);
            toast.error(err.response.data.message);
            if(err.response.data.cause) {
                err.cause.detail.forEach((detail: any) => {
                    formik.setFieldError(detail.field, detail.message);
                })
            }
        }
        
    }

    return (
        <form className="authentication-popup" onSubmit={formik.handleSubmit}>
            <TextField
                className="my-2"
                label="Username"
                variant="outlined"
                type="text"
                size="small"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                disabled={isLoading}
                required
                fullWidth
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username} />
            <TextField
                className="my-2"
                label="Password"
                variant="outlined"
                type="password"
                size="small"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                disabled={isLoading}
                required
                fullWidth
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                />

            {isLoading ? <Loading /> : ''}

            <Button
                className="w-full mt-2 btn-custom"
                variant="contained"
                type="submit"
                disabled={isLoading}>Sign in</Button>
            
            <div className="flex justify-around mt-2">
                <Link href="#"
                    underline="hover"
                    onClick={() => navigation('/auth/sign-up')}>Create an account</Link>
                <Link href="#"
                    underline="hover"
                    onClick={() => navigation('/auth/forgot-password')}>Forgot password ?</Link>
            </div>
        </form>
    )
}