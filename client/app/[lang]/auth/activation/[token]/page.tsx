'use client';
import { AppContext } from "@/app/[lang]/context/appContext"
import { RequestMethod } from "@/types/globalType";
import { useContext, useEffect } from "react"

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
        <div className="md-limited-width-layout__content">
            <div className="top-[40%] text-center relative">
                Please wait for account activation
            </div>
        </div>
    )
}