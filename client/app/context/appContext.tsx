import React, { createContext } from "react";
import ProfileProvider from "./profileContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export const AppContext = createContext({
    requestAPI: async (path: string, method: string, data?: Object): Promise<any> => {},
    navigation: (path: string) => {}
});

export default function AppProvider({ children }: any) {
    const router = useRouter();

    async function requestAPI(path: string, method: string, data?: any): Promise<any>  {
        const requestConfig = {
            method: method,
            url: `${process.env.NEXT_PUBLIC_API_ROUTE}${path}`,
            headers: { 'Authorization': 'Bearer ' + getToken() },
            data: data
        }
        const res = await axios(requestConfig);
        return res.data;
    }

    function getToken(): string {
        let token = '';
        let userInfo = localStorage.getItem("user");
        if (userInfo) token = JSON.parse(userInfo).access_token;
        return token;
    }

    function navigation(path: string): void {
        router.push(path);
    }

    return (
        <AppContext.Provider
            value={{
                requestAPI,
                navigation
            }}>
                <ProfileProvider>
                    {children}
                </ProfileProvider>
        </AppContext.Provider>
    )
}