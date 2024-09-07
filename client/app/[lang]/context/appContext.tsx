'use client';
import React, { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from 'next-intl';
import { RequestMethod } from "@/types/globalType";

const STATUS = {
    SUCCESS: 'success',
    FAIL: 'fail',
    WARNING: 'warning'
}

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

            // Handle response without progress blocking
            switch(res.status) {
                case STATUS.SUCCESS:
                    if(res.messageCode) toast.success(t(res.messageCode));
                    break;
                case STATUS.FAIL:
                    if(res.messageCode) toast.error(t(res.messageCode));
                    break;
                case STATUS.WARNING:
                    if(res.messageCode) toast.warning(t(res.messageCode));
                    break;
                default:
                    toast.error('Unknown status');
                    break;
            }
            return res.data;
        } catch(err: any) {
            // Handle error with progress blocking
            // If has response => custom error else network errr
            const errorObject = err.response ? err.response.data : err;
            toast.error(t(errorObject.messageCode));
            throw new Error();
        }
    }

    const fileUploader = async (files: File[]) => {
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
                },
            }
            const axiosRes = await axios(requestConfig);
            const res = axiosRes.data;

            // Handle response without progress blocking
            switch(res.status) {
                case STATUS.SUCCESS:
                    if(res.messageCode) toast.success(t(res.messageCode));
                    break;
                case STATUS.FAIL:
                    if(res.messageCode) toast.error(t(res.messageCode));
                    break;
                case STATUS.WARNING:
                    if(res.messageCode) toast.warning(t(res.messageCode));
                    break;
                default:
                    toast.error('Unknown status');
                    break;
            }
            return res.data;
        }
        catch(err: any) {
            const errorObject = err.response ? err.response.data : err;
            toast.error(t(errorObject.messageCode));
            throw new Error();
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