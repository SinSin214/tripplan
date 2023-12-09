'use client';
import Loading from "@/app/components/Loading";
import { AppContext } from "@/app/context/appContext"
import { ProfileContext } from "@/app/context/profileContext";
import { Fragment, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function UserActivation({ params }: { params: { token: string } }) {
    const { requestAPI, navigation } = useContext(AppContext);
    const { setupUser } = useContext(ProfileContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function activateUser() {
            try {
                setIsLoading(true);
                const res = await requestAPI(`/auth/activate/${params.token}`, 'GET');
                setIsLoading(false);
                toast.success(res.message);
                setupUser(res.accessToken, res.username);
                navigation('/');
            } catch(err: any) {
                setIsLoading(false);
                toast.error(err.response.data.message);
            }
        };
        activateUser();
    }, []);

    return (
        <div className="md-limited-width-layout__content">
            <div className="top-[40%] relative">
            { isLoading ?
                <Fragment>
                    <div className="text-center mb-8">Please wait for account activation</div>
                    <Loading />
                </Fragment>
                : ''}
            </div>
        </div>
    )
}