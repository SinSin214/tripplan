'use client';
import { signInSchema } from '@/utils/validationSchema';
import { Button, Link, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

interface Props {
    navigateForgetPassword: Function,
    navigateSignUp: Function
}

export default function SignInForm(props: Props) {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: signInSchema,
        onSubmit: handleSignIn
    });

    async function handleSignIn() {
        let res = await axios.post('http://localhost:3001/auth/signIn', {
            username: formik.values.username,
            password: formik.values.password
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
            <TextField
                className="my-2"
                label="Password"
                variant="outlined"
                type="password"
                size="small"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
                fullWidth
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                />
            <Button
                className="w-full mt-2"
                variant="contained"
                type="submit">Sign in</Button>
            <div style={{
                width: '80%',
                height: '1px',
                background: 'gray',
                margin: '15px auto'
            }}></div>
            <div className="flex justify-around mt-2">
                <Link href="#"
                    underline="hover"
                    onClick={(e) => router.push('/auth/sign-up')}>Create an account</Link>
                <Link href="#"
                    underline="hover"
                    onClick={(e) => router.push('/auth/forget-password')}>Forgot password ?</Link>
            </div>
        </form>
    )
}