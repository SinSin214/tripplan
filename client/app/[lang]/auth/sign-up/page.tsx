'use client';
import { signUpSchema } from '@/utils/validationSchema';
import { Button, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { AppContext } from '@/app/[lang]/context/appContext';
import { toast } from 'react-toastify';
import { IResponse } from '@/utils/types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AppLoadingContext } from '@/app/[lang]/context/loadingContext';
import { useTranslations } from 'next-intl';

export default function SignUpForm() {
    const { requestAPI, navigation,  } = useContext(AppContext);
    const { setIsAppLoading } = useContext(AppLoadingContext);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const t = useTranslations();
    
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: signUpSchema,
        onSubmit: async (values, { resetForm }) => {
            await handleSignUp(resetForm);
        }
    });

    async function handleSignUp(resetForm: Function) {
        try {
            setIsAppLoading(true);
            const data = {
                username: formik.values.username,
                password: formik.values.password,
                email: formik.values.email
            }
            let res: IResponse = await requestAPI('/auth/signUp', 'POST', data);
            setIsAppLoading(false);
            toast.success(res.message);
            resetForm();
        }
        catch (err: any) {
            let oError = err.response.data;
            setIsAppLoading(false);
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
                label={t('Username')}
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
                label={t('Email')}
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
            <div className="inline">
                <TextField
                    className="my-2"
                    label={t('Password')}
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
            </div>

            <TextField
                className="my-2"
                label={t('ConfirmPassword')}
                variant="outlined"
                type={isShowPassword ? 'text' : 'password'}
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
                className="w-full mt-2 btn-custom"
                variant="contained"
                type="submit">{t('SignUp')}
            </Button>

            <div className="separate-line"></div>

            <div className="flex justify-around">
                <Link href="#"
                    underline="hover"
                    onClick={(e) => navigation('/auth/sign-in')}>{t('HadAccount')}</Link>
                <Link href="#"
                    underline="hover"
                    onClick={(e) => navigation('/auth/forgot-password')}>{t('Forgot')}</Link>
            </div>
        </form>
    )
}