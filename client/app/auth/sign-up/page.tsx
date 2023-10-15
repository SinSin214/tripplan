'use client';
import { signUpSchema } from '@/utils/validationSchema';
import { Button, Link, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

interface Props {
    navigateForgetPassword: Function,
    navigateSignUp: Function
}

export default function SignUpForm(props: Props) {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: signUpSchema,
        onSubmit: handleSignUp
    });

    async function handleSignUp() {
        let res = await axios.post('http://localhost:3001/auth/signUp', {
            username: formik.values.username,
            password: formik.values.password,
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
            <TextField
                className="my-2"
                label="Confirm password"
                variant="outlined"
                type="password"
                size="small"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                required
                fullWidth
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
            <Button
                className="w-full mt-2"
                variant="contained"
                type="submit">Sign up</Button>
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
                    onClick={(e) => router.push('/auth/forget-password')}>Forgot password ?</Link>
            </div>
        </form>
    )
}