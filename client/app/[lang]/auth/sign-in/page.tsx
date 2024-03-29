'use client';
import { AppContext } from '@/app/[lang]/context/appContext';
import { AppLoadingContext } from '@/app/[lang]/context/loadingContext';
import { ProfileContext } from '@/app/[lang]/context/profileContext';
import { signInSchema } from '@/utils/validationSchema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

export default function SignInForm() {
    const { requestAPI, navigation } = useContext(AppContext);
    const { setIsAppLoading } = useContext(AppLoadingContext);
    const { setupUserInfo } = useContext(ProfileContext);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const t = useTranslations();

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
            setIsAppLoading(true);
            const oParams = {
                username: formik.values.username,
                password: formik.values.password
            }
            const res = await requestAPI('/auth/signIn', 'POST', oParams);
            setupUserInfo(res.user);
            toast.success(t(`${res.messageCode}`));
            navigation('/');
        } catch(err: any) {
            let oError = err.response.data;
            if(oError.detail) {
                oError.detail.forEach((detail: any) => {
                    formik.setFieldError(detail.field, detail.message);
                })
            } else toast.error(oError.message);
        } finally {
            setIsAppLoading(false);
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
                    label={t("Username")}
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
                    label={t("Password")}
                    variant="outlined"
                    type={isShowPassword ? 'text' : 'password'}
                    size="small"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
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

                <Button
                    className="w-full mt-2 btn-custom"
                    variant="contained"
                    type="submit">{t('SignIn')}</Button>

                <div className="separate-line"></div>
                
                <div className="flex justify-around">
                    <Link href="#"
                        underline="hover"
                        onClick={() => navigation('/auth/sign-up')}>{t('HadAccount')}</Link>
                    <Link href="#"
                        underline="hover"
                        onClick={() => navigation('/auth/forgot-password')}>{t('Forgot')}</Link>
                </div>
        </form>
    )
}