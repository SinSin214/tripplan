'use client';
import { AppContext } from "@/app/[lang]/context/appContext"
import { RequestMethod } from "@/types/globalType";
import { useContext, useEffect } from "react";
import { CircularProgress } from '@mui/material';

export default function UserActivation({ params }: { params: { token: string } }) {
    const { requestAPI, navigation } = useContext(AppContext);

    useEffect(() => {
        async function activateUser() {
            await requestAPI(`/auth/activate/${params.token}`, RequestMethod.Get);
            navigation('/auth/sign-in');
        };
        activateUser();
    }, []);

    return (
        <div className="authentication-layout">
            <div className="text-center flex flex-col">
                <span>Please wait for account activation</span>
                <CircularProgress className="mx-auto mt-4" />
            </div>
        </div>
    )
}