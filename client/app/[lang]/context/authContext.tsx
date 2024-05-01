'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { IProfile, ILocalStorageUserInfo } from '@/utils/types';
import { AppContext } from "./appContext";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const defaultProfile = {
    username: '',
    email: '',
    isSigned: false
}

export const AuthContext = createContext({
    profile: defaultProfile,
    setProfile: (profile: IProfile) => { },
    setupUserInfo: (userInfo: ILocalStorageUserInfo) => { },
    clearUserInfo: () => { },
});

export default function AuthProvider({ children }: any) {
    const t = useTranslations();
    const { requestAPI, 
            navigation, 
            isGetNewAccessToken, 
            setIsGetNewAccessToken,
            setIsCallRequestAgain } = useContext(AppContext);
    const [profile, setProfile] = useState<IProfile>(defaultProfile);

    // At the first time visit page, check if token available
    useEffect(() => {
        getNewAccessToken(false);
    }, [])

    // When perform a request need auth
    useEffect(() => {
        if(isGetNewAccessToken) getNewAccessToken(true);
    }, [isGetNewAccessToken]);

    function setupUserInfo(userInfo: ILocalStorageUserInfo) {
        localStorage.setItem("user", JSON.stringify(userInfo));
        setProfile({
            username: userInfo.username,
            email: userInfo.email,
            isSigned: true
        })
    }

    function clearUserInfo() {
        localStorage.clear();
        setProfile({
            username: '',
            email: '',
            isSigned: false
        })
    }

    async function getNewAccessToken(isNeedTokenToRequest: boolean) {
        try {
            const userInfo = localStorage.getItem("user");
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo) as ILocalStorageUserInfo;
                const param = {
                    refreshToken: parsedUserInfo.refreshToken
                }
                const res = await requestAPI('/auth/new_access_token', 'POST', param);
                setupUserInfo(res.data);
                if(isNeedTokenToRequest) setIsCallRequestAgain(true);
            }
        } catch (err: any) {
            clearUserInfo();
            if (isNeedTokenToRequest) {
                toast.error(t(err));
                navigation('/auth/sign-in');
            }
        } finally {
            setIsGetNewAccessToken(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            profile,
            setProfile,
            setupUserInfo,
            clearUserInfo
        }}>
            {children}
        </AuthContext.Provider>
    )
}