'use client';
import { createContext, useEffect, useState } from "react";
import { IProfile } from '@/utils/types';
import { useTranslations } from "next-intl";

interface ProfileContext {
    profile: IProfile | null,
    setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
}

export const AuthContext = createContext<ProfileContext>({} as ProfileContext);

export default function AuthProvider({ children }: any) {
    const t = useTranslations();
    const [profile, setProfile] = useState<IProfile | null>(null);

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
                bio: parsedUserInfo.bio,
                avatarPath: parsedUserInfo.avatarPath,
                roleId: parsedUserInfo.roleId
            })
        } else {
            setProfile(null);
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