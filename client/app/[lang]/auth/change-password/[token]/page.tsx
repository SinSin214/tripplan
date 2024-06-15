'use client';
import { AppContext } from '@/app/[lang]/context/appContext';
import { RequestMethod } from '@/types/globalType';
import { changePasswordSchema } from '@/utils/validationSchema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';

export default function ChangePasswordForm({ params }: { params: { token: string } }) {
    const { requestAPI, navigation } = useContext(AppContext);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: changePasswordSchema,
        onSubmit: handleChangePassword
    });

    async function handleChangePassword() {
        const oParams = { password: formik.values.password }
        await requestAPI(`/auth/change_password/${params.token}`, RequestMethod.Post, oParams);
        navigation('/');
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
                    label="New password"
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
                    }} />

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
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} />

                <Button
                    className="w-full mt-2 btn-custom"
                    variant="contained"
                    type="submit">Update</Button>
            </form>
        </div>
    )
}