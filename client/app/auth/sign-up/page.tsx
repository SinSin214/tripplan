'use client';
import { signUpSchema } from '@/utils/validationSchema';
import { Button, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AppContext } from '@/app/context/appContext';
import { toast } from 'react-toastify';
import { IResponse } from '@/utils/types';
import Loading from '@/app/components/Loading';

export default function SignUpForm() {
    const router = useRouter();
    const { isLoading, requestAPI } = useContext(AppContext);
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: signUpSchema,
        onSubmit: async (values, {resetForm}) => {
            await handleSignUp(resetForm);
        }
    });

    async function handleSignUp(resetForm: Function) {
        try {
            const data = {
                username: formik.values.username,
                password: formik.values.password,
                email: formik.values.email
            }
            let res: IResponse = await requestAPI('/auth/signUp', 'POST', data);
            toast.success(res.message);
            resetForm();
        }
        catch(err: any) {
            err.cause.detail.forEach((detail: any) => {
                formik.setFieldError(detail.field, detail.message);
            })
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
                disabled={isLoading}
                value={formik.values.username}
                onChange={formik.handleChange}
                required
                fullWidth
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username} />
            <TextField
                className="my-2"
                label="Email"
                variant="outlined"
                type="email"
                size="small"
                name="email"
                disabled={isLoading}
                value={formik.values.email}
                onChange={formik.handleChange}
                required
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email} />
            <TextField
                className="my-2"
                label="Password"
                variant="outlined"
                type="password"
                size="small"
                name="password"
                disabled={isLoading}
                value={formik.values.password}
                onChange={formik.handleChange}
                required
                fullWidth
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
                className="my-2"
                label="Confirm password"
                variant="outlined"
                type="password"
                size="small"
                name="confirmPassword"
                disabled={isLoading}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                required
                fullWidth
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />

            {isLoading ? <Loading /> : ''}
            
            <Button
                className="w-full mt-2 btn-custom"
                variant="contained"
                type="submit"
                disabled={isLoading}>Sign up
            </Button>
            
            <div style={{
                width: '80%',
                height: '1px',
                background: 'gray',
                margin: '15px auto'
            }}></div>
            <div className="flex justify-around mt-2">
                <Link href="#"
                    underline="hover"
                    onClick={(e) => router.push('/auth/sign-in')}>Already have account ?</Link>
                <Link href="#"
                    underline="hover"
                    onClick={(e) => router.push('/auth/forgot-password')}>Forgot password ?</Link>
            </div>
        </form>
    )
}