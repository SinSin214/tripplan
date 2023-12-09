import { usePathname } from "next/navigation";
import { Fragment, useContext } from 'react';
import { ProfileContext } from '../context/profileContext';
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { AppContext } from "../context/appContext";

export default function Navbar() {
    const pathName = usePathname();
    const { profile, setProfile } = useContext(ProfileContext);
    const { navigation } = useContext(AppContext);

    function signOut() {
        localStorage.clear();
        setProfile({
            username: '',
            isSigned: false
        })
        navigation('/');
    }

    return (
        <div className="background-color w-full h-14 z-1 flex">
            <div className="container-navbar-part w-full">
                <Button
                    className={`${pathName === '/' ? 'btn-navbar-active' : ''} btn-navbar`}
                    onClick={() => navigation('/')}>Home</Button>
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
                        variant="contained"
                        startIcon={<CreateIcon />}
                        hidden
                        onClick={() => navigation('/post/write')}>
                        Write post
                    </Button>
                </div>
                : ''}
            <div className="container-navbar-part mx-3">
                {profile.isSigned ?
                    <Fragment>
                        <Button className="btn-custom" variant="contained">Hi, {profile.username}</Button>
                        <Button className="btn-custom" variant="contained"
                            onClick={() => signOut()}>Sign Out</Button>
                    </Fragment>
                    :
                    <Fragment>
                        <Button
                            className="btn-custom" variant="contained"
                            onClick={() => navigation('/auth/sign-in')}>Sign In</Button>
                        <Button variant="contained"
                            className="btn-custom"
                            onClick={() => navigation('/auth/sign-up')}>Sign Up</Button>
                    </Fragment>
                }
            </div>
        </div>
    )
}