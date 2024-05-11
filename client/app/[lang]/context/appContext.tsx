'use client';
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from 'next-intl';

type RequestConfig = {
    path: string,
    method: string,
    data?: Object
  }

export const AppContext = createContext({
    requestAPI: async (path: string, method: string, data?: Object): Promise<any> => {},
    navigation: (path: string) => {},
    fileUploader: async (files: File[]): Promise<any> => {},
    isGetNewAccessToken: false,
    setIsGetNewAccessToken: (value: boolean) => {},
    isCallRequestAgain: false,
    setIsCallRequestAgain: (value: boolean) => {}
});

export default function AppProvider({ children }: any) {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations();
    const [isGetNewAccessToken, setIsGetNewAccessToken] = useState<boolean>(false);
    const [isCallRequestAgain, setIsCallRequestAgain] = useState<boolean>(false);
    const [requestConfig, setRequestConfig] = useState<RequestConfig>({
        path: '',
        method: '',
        data: undefined
    });

    useEffect(() => {
        if(isCallRequestAgain) {
            requestAPI(requestConfig.path, requestConfig.method, requestConfig.data);
            setIsCallRequestAgain(false);
        }
    }, [isCallRequestAgain]);

    async function requestAPI (path: string, method: string, data?: Object): Promise<any> {
        try {
            const requestConfig = {
                method: method,
                url: `${process.env.NEXT_PUBLIC_API_ROUTE}${path}`,
                headers: { 'Authorization': 'Bearer ' + getToken() },
                data: data
            }
            const res = await axios(requestConfig);
            if(res.data.messageCode) toast.success(t(res.data.messageCode));
            return res.data;
        } catch(err: any) {
            const error = err.response.data;
            if(error.messageCode === 'AccessTokenExpired') {
                setIsGetNewAccessToken(true);
                setRequestConfig({
                    path: path,
                    method: method,
                    data: data
                });
            } else if(error.messageCode === 'RefreshTokenExpired'){
                throw Error(error.messageCode);
            } else {
                toast.error(t(error.messageCode));
            }
        }
    }

    async function fileUploader(files: File[]) {
        try {
            // prepare data
            let data = new FormData();
            for(let i = 0; i < files.length; i++) {
                data.append('files', files[i])
            }
            // sending data
            const requestConfig = {
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_ROUTE}/image/upload`,
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + getToken()
                },
            }
            const res = await axios(requestConfig);
            return res.data;
        }
        catch(err: any) {
            const error = err.response.data;
            toast.error(error.messageCode);
        }
    }

    function getToken(): string {
        let token = '';
        const userInfo = localStorage.getItem("user");
        if(userInfo) {
            token = JSON.parse(userInfo).accessToken;
        }
        return token;
    }

    function navigation(path: string): void {
        router.push(`/${locale}${path}`);
    }

    return (
        <AppContext.Provider
            value={{
                requestAPI,
                navigation,
                fileUploader,
                isGetNewAccessToken,
                setIsGetNewAccessToken,
                isCallRequestAgain,
                setIsCallRequestAgain
            }}>
                {children}
        </AppContext.Provider>
    )
}