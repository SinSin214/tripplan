'use client';
import { createContext, useEffect, useState } from "react";
import { IProfile } from '@/utils/types';
import { useTranslations } from "next-intl";

const defaultProfile = {
    username: '',
    email: '',
    displayName: '',
    isSigned: false
}

export const AuthContext = createContext({
    profile: defaultProfile,
    setProfile: (profile: IProfile) => { }
});

export default function AuthProvider({ children }: any) {
    const t = useTranslations();
    const [profile, setProfile] = useState<IProfile>(defaultProfile);

    // Check if session not expired yet, set user profile
    useEffect(() => {
        // const session = document.cookie;
        const session = getCookieByName('session');
        const userInfo = getCookieByName('userInfo');
        if(userInfo && session) {
            const parsedUserInfo = JSON.parse(userInfo);
            setProfile({
                username: parsedUserInfo.username,
                email: parsedUserInfo.email,
                displayName: parsedUserInfo.displayName,
                isSigned: true
            })
        } else {
            setProfile(defaultProfile);
        }
    }, []);

    function getCookieByName(cookieName: string): string {
        const name = cookieName + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const listCookies = decodedCookie.split('; ');
        for(let i = 0; i < listCookies.length; i++) {
            const cookie = listCookies[i];
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return '';
    }

    return (
        <AuthContext.Provider value={{
            profile,
            setProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}