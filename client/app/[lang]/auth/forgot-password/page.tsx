'use client';
import Loading from '@/app/[lang]/components/AppLoading';
import { AppContext } from '@/app/[lang]/context/appContext';
import { forgotPasswordSchema } from '@/utils/validationSchema';
import { Button, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function ForgotPasswordForm() {
    const { requestAPI, navigation } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations();
    const formik = useFormik({
        initialValues: {
            username: ""
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: handleForgotPassword
    });

    async function handleForgotPassword() {
        try {
            const oParams = { username: formik.values.username };
            setIsLoading(true);
            const res = await requestAPI('/auth/forgotPassword', 'POST', oParams);
            setIsLoading(false);
            toast.success(res.message);
        } catch(err: any) {
            setIsLoading(false)
            toast.error(err.response.data.message);
        }
        
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
                disabled={isLoading}
                required
                fullWidth
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username} />

            {isLoading ? <Loading /> : ''}

            <Button
                className="w-full mt-2 btn-custom"
                variant="contained"
                type="submit"
                disabled={isLoading}>{t('SendRecoveryEmail')}</Button>

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
    )
}