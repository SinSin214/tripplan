'use client';
import { forgetPasswordSchema } from '@/utils/validationSchema';
import { Button, Link, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

export default function ForgetPasswordForm() {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: forgetPasswordSchema,
        onSubmit: handleForgetPassword
    });

    async function handleForgetPassword() {
        let res = await axios.post('http://localhost:3001/auth/forgetPassword', {
            email: formik.values.email
        });
        if (res.status === 200) {

        } else {
            // fail
        }
    }

    return (
        <form className="authentication-popup" onSubmit={formik.handleSubmit}>
            <TextField
                className="my-2"
                label="Email"
                variant="outlined"
                type="email"
                size="small"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email} />
            <Button
                className="w-full mt-2"
                variant="contained"
                type="submit">Send email</Button>
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
                    onClick={(e) => router.push('/auth/sign-up')}>Create an account</Link>
            </div>
        </form>
    )
}