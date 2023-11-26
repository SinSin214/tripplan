'use client';
import React, { createContext, useState } from "react";
import ProfileProvider from "./profileContext";
import { toast } from 'react-toastify';
import axios from "axios";
import { useRouter } from "next/navigation";

export const AppContext = createContext({
    requestAPI: async (path: string, method: string, data?: Object): Promise<any> => {},
    isLoading: false,
    setIsLoading: (value: boolean) => {},
    navigation: (path: string) => {}
});

export default function AppProvider({ children }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    async function requestAPI(path: string, method: string, data?: any): Promise<any>  {
        try {
            setIsLoading(true);
            const res = await axios({
                method: method,
                url: `${process.env.NEXT_PUBLIC_API_ROUTE}${path}`,
                headers: { 'Authorization': 'Bearer ' + getToken() },
                data: data
            });
            setIsLoading(false);
            return res.data;
        } catch (err: any) {
            let error = err.response ? err.response.data.message : err.message;
            setIsLoading(false);
            toast.error(error);
            throw Error(error);
        }
    }

    function getToken(): string {
        let token = '';
        let userInfo = localStorage.getItem("user");
        if (userInfo) token = JSON.parse(userInfo).token;
        return token;
    }

    function navigation(path: string): void {
        router.push(path);
    }

    return (
        <AppContext.Provider
            value={{
                requestAPI,
                isLoading,
                setIsLoading,
                navigation
            }}>
                <ProfileProvider>
                    {children}
                </ProfileProvider>
        </AppContext.Provider>
    )
}