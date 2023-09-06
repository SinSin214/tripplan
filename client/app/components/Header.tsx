import { usePathname, useRouter } from "next/navigation";
import { Fragment, useContext } from 'react';
import { AppContext } from '../context';
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';

export default function Navbar() {
    const router = useRouter();
    const pathName = usePathname();
    const { isSigned, setIsOpenSignInForm, setIsOpenSignUpForm } = useContext(AppContext);
    return (
        <div className="background-color fixed w-full h-14 z-10 flex">
            <div className="container-navbar-part w-full">
                <Button 
                    className={`${pathName === '/' ? 'btn-navbar-active' : 'btn-navbar-inactive'} btn-navbar`}
                    onClick={() => router.push('/')}>Home</Button>
                <Button 
                    className={`${pathName.includes('/destination') ? 'btn-navbar-active' : 'btn-navbar-inactive'} btn-navbar`}
                    onClick={() => router.push('/destination')}>Destination</Button>
                <Button 
                    className={`${pathName.includes('/planning') ? 'btn-navbar-active' : 'btn-navbar-inactive'} btn-navbar`}
                    onClick={() => router.push('/planning')}>Planning</Button>
            </div>
            <div className="container-navbar-part">
                <Button className="btn-write-post min-w-max"
                    startIcon={<CreateIcon />}
                    onClick={() => writePost()}>
                    Write post
                </Button>
            </div>
            <div className="container-navbar-part mx-3">
                { isSigned ? 
                    <Button 
                        className="btn-auth">Sign Out</Button>
                    :
                    <Fragment>
                        <Button 
                            className="btn-auth"
                            onClick={() => setIsOpenSignInForm(true)}>Sign In</Button>
                        <div style={{
                              borderRight: '1px solid white',
                              width: '1px',
                              height: '20px',
                              position: 'relative',
                        }}></div>
                        <Button 
                            className="btn-auth"
                            onClick={() => setIsOpenSignUpForm(true)}>Sign Up</Button>
                    </Fragment>
                }
            </div>
        </div>
    )
}