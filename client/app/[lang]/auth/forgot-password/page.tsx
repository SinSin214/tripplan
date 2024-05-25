'use client';
import { AppContext } from '@/app/[lang]/context/appContext';
import { forgotPasswordSchema } from '@/utils/validationSchema';
import { Button, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

export default function ForgotPasswordForm() {
    const { requestAPI, navigation } = useContext(AppContext);
    const t = useTranslations();
    const formik = useFormik({
        initialValues: {
            username: ""
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: handleForgotPassword
    });

    async function handleForgotPassword() {
        const oParams = { username: formik.values.username };
        await requestAPI('/auth/forgot_password', 'POST', oParams);
    }

    return (
        <div className="authentication-popup">
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


                <Button
                    className="w-full mt-2 btn-custom"
                    variant="contained"
                    type="submit">{t('SendRecoveryEmail')}</Button>

                <div className="separate-line"></div>
                
                <div className="flex justify-around">
                    <Link href="#"
                        underline="hover"
                        onClick={() => navigation('/auth/sign-in')}>{t('HadAccount')}</Link>
                    <Link href="#"
                        underline="hover"
                        onClick={() => navigation('/auth/sign-up')}>{t('SignUp')}</Link>
                </div>
            </form>
        </div>
    )
}