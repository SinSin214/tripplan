'use client';
import { usePathname } from "next/navigation";
import { Fragment, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { AppContext } from "../context/appContext";
import { useTranslations } from 'next-intl';
import { RequestMethod } from "@/types/globalType";

export default function Navbar() {
    const pathName = usePathname();
    const { profile, setProfile } = useContext(AuthContext);
    const { navigation, requestAPI } = useContext(AppContext);
    const t = useTranslations();

    async function signOut() {
        await requestAPI('/auth/sign_out', RequestMethod.Get);
        setProfile({
            username: '',
            email: '',
            displayName: '',
            isSigned: false
        })
        navigation('/');
    }

    return (
        <div className="header">
            <div className="container-navbar-part w-full">
                <Button
                    className={`${pathName === '/' ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/')}>{t('Home')}</Button>
                <Button
                    className={`${pathName.includes('/thread') ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/thread')}>{t('Thread')}</Button>
                <Button
                    className={`${pathName.includes('/destination') ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/destination')}>{t('Destination')}</Button>
                <Button
                    className={`${pathName.includes('/planning') ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/planning')}>{t('Planning')}</Button>
            </div>
            {profile.isSigned ?
                <div className="container-navbar-part">
                    <Button className="btn-custom min-w-max"
                        startIcon={<CreateIcon />}
                        hidden
                        onClick={() => navigation('/thread/write')}>
                        {t('NewThread')}
                    </Button>
                </div>
                : ''}
            <div className="container-navbar-part mx-3">
                {profile.isSigned ?
                    <Fragment>
                        <Button className="btn-custom" >Hi, {profile.username}</Button>
                        <Button className="btn-custom" 
                            onClick={() => signOut()}>{t('SignOut')}</Button>
                    </Fragment>
                    :
                    <Fragment>
                        <Button
                            className="btn-custom" 
                            onClick={() => navigation('/auth/sign-in')}>{t('SignIn')}</Button>
                        <Button 
                            className="btn-custom"
                            onClick={() => navigation('/auth/sign-up')}>{t('SignUp')}</Button>
                    </Fragment>
                }
            </div>
        </div>
    )
}