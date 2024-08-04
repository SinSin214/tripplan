'use client';
import { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { AppContext } from "../context/appContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { navigation } = useContext(AppContext);
    const { profile } = useContext(AuthContext);

    useEffect(() => {
        if(profile) {
            navigation('/');
        }
    });
    

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}