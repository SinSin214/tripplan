'use client';
import { AppContext } from "@/app/[lang]/context/appContext"
import { AuthContext } from "@/app/[lang]/context/authContext";
import { useContext, useEffect } from "react"

export default function UserActivation({ params }: { params: { token: string } }) {
    const { requestAPI, navigation } = useContext(AppContext);
    const { setupUserInfo } = useContext(AuthContext);

    useEffect(() => {
        async function activateUser() {
            const res = await requestAPI(`/auth/activate/${params.token}`, 'GET');
            setupUserInfo(res.data);
            navigation('/');
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