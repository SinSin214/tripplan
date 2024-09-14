'use client';
import React, { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from 'next-intl';
import { RequestMethod, ResponseStatus } from "@/types/globalType";


export const AppContext = createContext({
    requestAPI: async (path: string, method: RequestMethod, data?: Object): Promise<any> => {},
    navigation: (path: string) => {},
    fileUploader: async (files: File[]): Promise<any> => {},
    checkPermission: () => {}
});

export default function AppProvider({ children }: any) {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations();

    const requestAPI = async (path: string, method: RequestMethod, data?: object): Promise<any> => {
        try {
            const requestConfig = {
                method: method,
                url: `${process.env.NEXT_PUBLIC_API_ROUTE}${path}`,
                data: data,
                withCredentials: true
            }
            const axiosRes = await axios(requestConfig);
            const res = axiosRes.data;
            if(res.messageCode) toast.success(t(res.messageCode));
            return res.data;
        } catch(err: any) {
            // Error from backend
            if(err.response.data.message) {
                const resErr = err.response.data.message;
                const parsedErr = JSON.parse(resErr);
                if(parsedErr.messageCode) {
                    toast.error(t(parsedErr.messageCode));
                };
                // Implement if error is require login
                throw new Error(resErr);
            } else {
                toast.error(t('Unknown error'));
                throw new Error();
            }
        }
    }

    const fileUploader = async (files: File[]) => {
        try {
            // prepare data
            let formData = new FormData();
            for(let i = 0; i < files.length; i++) {
                formData.append('files', files[i])
            }
            // sending data
            const requestConfig = {
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_ROUTE}/image/upload`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const axiosRes = await axios(requestConfig);
            const res = axiosRes.data;
            if(res.messageCode) toast.success(t(res.messageCode));
            return res.data;
        }
        catch(err: any) {
            // Error from backend
            if(err.response.data.message) {
                const resErr = err.response.data.message;
                const parsedErr = JSON.parse(resErr);
                if(parsedErr.messageCode) {
                    toast.error(t(parsedErr.messageCode));
                };
                // Implement if error is require login
                throw new Error(resErr);
            } else {
                toast.error(t('Unknown error'));
                throw new Error();
            }
        }
    }

    const navigation = (path: string): void => {
        router.push(`/${locale}${path}`);
    }

    const checkPermission = async () => {
        const result = await requestAPI('/auth/check_permission', RequestMethod.Get);
        console.log('checkpermission', result);
    }

    return (
        <AppContext.Provider
            value={{
                requestAPI,
                navigation,
                fileUploader,
                checkPermission
            }}>
                {children}
        </AppContext.Provider>
    )
}