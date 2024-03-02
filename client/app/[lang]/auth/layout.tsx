'use client';
import { Fragment, useContext, useEffect } from "react";
import { ProfileContext } from "../context/profileContext";
import { AppContext } from "../context/appContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { navigation } = useContext(AppContext);
    const { profile } = useContext(ProfileContext);

    useEffect(() => {
        if(profile.isSigned) {
            navigation('/');
        } 
    });
    

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}