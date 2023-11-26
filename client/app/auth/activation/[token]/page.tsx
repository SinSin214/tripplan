'use client';
import Loading from "@/app/components/Loading";
import { AppContext } from "@/app/context/appContext"
import { ProfileContext } from "@/app/context/profileContext";
import { useContext, useEffect } from "react"
import { toast } from "react-toastify";

export default function UserActivation({ params }: { params: { token: string } }) {
    const { isLoading, requestAPI, navigation } = useContext(AppContext);
    const { setupUser } = useContext(ProfileContext);

    useEffect(() => {
        const activateUser = async () => {
            const res = await requestAPI(`/auth/activate/${params.token}`, 'GET');
            toast.success(res.message);
            setupUser(res.accessToken, res.username);
            navigation('/');
        };
        activateUser();
    }, []);

    return (
        <div className="md-limited-width-layout__content">
            <span>Please wait for account activation</span>
            {isLoading ? <Loading /> : ''}
        </div>
    )
}