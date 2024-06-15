'use client';
import { AppContext } from '@/app/[lang]/context/appContext';
import { AuthContext } from '@/app/[lang]/context/authContext';
import { signInSchema } from '@/utils/validationSchema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useTranslations } from 'next-intl';
import { RequestMethod } from '@/types/globalType';
import Loading from '../../loading';

export default function SignInForm() {
    const { navigation, requestAPI } = useContext(AppContext);
    const { setProfile } = useContext(AuthContext);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: signInSchema,
        onSubmit: async () => {
            setIsLoading(true);
            const params = {
                username: formik.values.username,
                password: formik.values.password
            }
            const res = await requestAPI('/auth/sign_in', RequestMethod.Post, params);
            const userInfo = res.data;
            setProfile({
                username: userInfo.username,
                email: userInfo.email,
                displayName: userInfo.displayName,
                isSigned: true
            })
            setIsLoading(false);
            navigation('/');
        }
    });

    const showPassword = (e: React.MouseEvent<HTMLOrSVGElement>) => {
        e.preventDefault()
        setIsShowPassword(!isShowPassword);
    }

    if(isLoading) return <Loading />

    return (
        <div className="authentication-popup">
            <Loading />
            <form onSubmit={formik.handleSubmit}>
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
        </div>
    )
}