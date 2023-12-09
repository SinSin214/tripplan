'use client';
import Loading from '@/app/components/Loading';
import { AppContext } from '@/app/context/appContext';
import { ProfileContext } from '@/app/context/profileContext';
import { signInSchema } from '@/utils/validationSchema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function SignInForm() {
    const { requestAPI, navigation } = useContext(AppContext);
    const { setupUser } = useContext(ProfileContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

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
            let oError = err.response.data;
            setIsLoading(false);
            if(oError.detail) {
                oError.detail.forEach((detail: any) => {
                    formik.setFieldError(detail.field, detail.message);
                })
            } else toast.error(oError.message);
        }
    }

    function showPassword(e: React.MouseEvent<HTMLOrSVGElement>) {
        e.preventDefault()
        setIsShowPassword(!isShowPassword);
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
                type={isShowPassword ? 'text' : 'password'}
                size="small"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                disabled={isLoading}
                required
                fullWidth
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={(e) => showPassword(e)}
                            edge="end"
                            >
                            {isShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                }}
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