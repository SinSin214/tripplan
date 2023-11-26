'use client';
import Loading from '@/app/components/Loading';
import { AppContext } from '@/app/context/appContext';
import { changePasswordSchema } from '@/utils/validationSchema';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function ChangePasswordForm({ params }: { params: { token: string } }) {
    const { isLoading, requestAPI, navigation } = useContext(AppContext);
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: changePasswordSchema,
        onSubmit: handleChangePassword
    });

    async function handleChangePassword() {
        const oParams = {
            password: formik.values.password
        }
        
        const res = await requestAPI(`/auth/changePassword/${params.token}`, 'POST', oParams);
        toast.success(res.message);
        navigation('/');
    }

    return (
        <form className="authentication-popup" onSubmit={formik.handleSubmit}>
            <TextField
                className="my-2"
                label="New password"
                variant="outlined"
                type="password"
                size="small"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
                fullWidth
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password} />

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