'use client';
import Loading from '@/app/components/Loading';
import { AppContext } from '@/app/context/appContext';
import { changePasswordSchema } from '@/utils/validationSchema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function ChangePasswordForm({ params }: { params: { token: string } }) {
    const { requestAPI, navigation } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
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
        try {
            const oParams = {
                password: formik.values.password
            }
            const res = await requestAPI(`/auth/changePassword/${params.token}`, 'POST', oParams);
            toast.success(res.message);
            navigation('/');
        }
        catch(err: any) {
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

            {isLoading ? <Loading /> : ''}

            <Button
                className="w-full mt-2 btn-custom"
                variant="contained"
                type="submit">Update</Button>
        </form>
    )
}