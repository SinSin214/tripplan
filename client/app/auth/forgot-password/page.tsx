'use client';
import Loading from '@/app/components/Loading';
import { AppContext } from '@/app/context/appContext';
import { forgotPasswordSchema } from '@/utils/validationSchema';
import { Button, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function ForgotPasswordForm() {
    const { isLoading, requestAPI, navigation } = useContext(AppContext);
    const formik = useFormik({
        initialValues: {
            username: ""
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: handleForgotPassword
    });

    async function handleForgotPassword() {
        const oParams = {
            username: formik.values.username
        }
        
        const res = await requestAPI('/auth/forgotPassword', 'POST', oParams);
        toast.success(res.message);
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
                required
                fullWidth
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username} />

            {isLoading ? <Loading /> : ''}

            <Button
                className="w-full mt-2 btn-custom"
                variant="contained"
                type="submit">Send email</Button>
            
            <div className="flex justify-around mt-2">
                <Link href="#"
                    underline="hover"
                    onClick={() => navigation('/auth/sign-in')}>Already have account ?</Link>
                <Link href="#"
                    underline="hover"
                    onClick={() => navigation('/auth/sign-up')}>Create an account</Link>
            </div>
        </form>
    )
}