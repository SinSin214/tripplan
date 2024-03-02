'use client';
import Loading from "@/app/[lang]/components/AppLoading";
import { AppContext } from "@/app/[lang]/context/appContext"
import { AppLoadingContext } from "@/app/[lang]/context/loadingContext";
import { ProfileContext } from "@/app/[lang]/context/profileContext";
import { Fragment, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function UserActivation({ params }: { params: { token: string } }) {
    const { requestAPI, navigation } = useContext(AppContext);
    const { setupUserInfo } = useContext(ProfileContext);
    const { setIsAppLoading } = useContext(AppLoadingContext);

    useEffect(() => {
        async function activateUser() {
            try {
                setIsAppLoading(true);
                const res = await requestAPI(`/auth/activate/${params.token}`, 'GET');
                setupUserInfo(res.user);
                toast.success(res.message);
                navigation('/');
            } catch(err: any) {
                toast.error(err.response.data.message);
            } finally {
                setIsAppLoading(false);
            }
        };
        activateUser();
    }, []);

    return (
        <div className="md-limited-width-layout__content">
            <div className="top-[40%] text-center relative">
                Please wait for account activation
            </div>
        </div>
    )
}