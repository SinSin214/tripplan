import { usePathname } from "next/navigation";
import { Fragment, useContext } from 'react';
import { ProfileContext } from '../context/profileContext';
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { AppContext } from "../context/appContext";
import { IUserInfo } from "@/utils/types";
import { toast } from "react-toastify";
import { AppLoadingContext } from "../context/loadingContext";

export default function Navbar() {
    const pathName = usePathname();
    const { profile, clearUserInfo } = useContext(ProfileContext);
    const { navigation, requestAPI } = useContext(AppContext);
    const { setIsAppLoading } = useContext(AppLoadingContext);

    async function signOut() {
        try {
            setIsAppLoading(true);
            let sUserInfo = localStorage.getItem("user");
            if (sUserInfo) {
                let oUserInfo: IUserInfo = JSON.parse(sUserInfo);
                let oParams = {
                    username: oUserInfo.username,
                    refreshToken: oUserInfo.refreshToken
                };

                const res = await requestAPI('/auth/signOut', 'POST', oParams);
                clearUserInfo();
                toast.success(res.message);
                navigation('/');
            }
        } catch (err: any) {
            toast.error(err.response.data.message);
        } finally {
            setIsAppLoading(false);
        }
    }

    return (
        <div className="background-color w-full h-14 z-1 flex">
            <div className="container-navbar-part w-full">
                <Button
                    className={`${pathName === '/' ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/')}>Home</Button>
                <Button
                    className={`${pathName.includes('/thread') ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/thread')}>Threads</Button>
                <Button
                    className={`${pathName.includes('/destination') ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/destination')}>Destination</Button>
                <Button
                    className={`${pathName.includes('/planning') ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/planning')}>Planning</Button>
            </div>
            {profile.isSigned ?
                <div className="container-navbar-part">
                    <Button className="btn-custom min-w-max"
                        startIcon={<CreateIcon />}
                        hidden
                        onClick={() => navigation('/thread/write')}>
                        Write thread
                    </Button>
                </div>
                : ''}
            <div className="container-navbar-part mx-3">
                {profile.isSigned ?
                    <Fragment>
                        <Button className="btn-custom" >Hi, {profile.username}</Button>
                        <Button className="btn-custom" 
                            onClick={() => signOut()}>Sign Out</Button>
                    </Fragment>
                    :
                    <Fragment>
                        <Button
                            className="btn-custom" 
                            onClick={() => navigation('/auth/sign-in')}>Sign In</Button>
                        <Button 
                            className="btn-custom"
                            onClick={() => navigation('/auth/sign-up')}>Sign Up</Button>
                    </Fragment>
                }
            </div>
        </div>
    )
}