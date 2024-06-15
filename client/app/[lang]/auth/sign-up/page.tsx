'use client';
import { signUpSchema } from '@/utils/validationSchema';
import { Button, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { AppContext } from '@/app/[lang]/context/appContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { RequestMethod } from '@/types/globalType';

export default function SignUpForm() {
    const { requestAPI, navigation,  } = useContext(AppContext);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const t = useTranslations();
    
    const formik = useFormik({
        initialValues: {
            username: "",
            displayName: "",
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
        const data = {
            username: formik.values.username,
            password: formik.values.password,
            email: formik.values.email,
            displayName: formik.values.displayName
        }
        await requestAPI('/auth/sign_up', RequestMethod.Post, data);
        resetForm();
    }

    function showPassword(e: React.MouseEvent<HTMLOrSVGElement>) {
        e.preventDefault()
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className="authentication-popup">
            <form onSubmit={formik.handleSubmit}>
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
                <TextField
                    className="my-2"
                    label={t('DisplayName')}
                    variant="outlined"
                    type="text"
                    size="small"
                    name="displayName"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    required
                    fullWidth
                    error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                    helperText={formik.touched.displayName && formik.errors.displayName} />

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
        </div>
    )
}