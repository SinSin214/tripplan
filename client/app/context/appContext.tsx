import React, { createContext, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ProfileContext } from "./profileContext";
import Error from "../not-found"

export const AppContext = createContext({
    requestAPI: async (path: string, method: string, data?: Object | null): Promise<any> => {},
    navigation: (path: string) => {},
    fileUploader: async (files: File[]): Promise<any> => {}
});

export default function AppProvider({ children }: any) {
    const router = useRouter();

    async function requestAPI(path: string, method: string, data?: Object | null): Promise<any>  {
        try {
            const requestConfig = {
                method: method,
                url: `${process.env.NEXT_PUBLIC_API_ROUTE}${path}`,
                headers: { 'Authorization': 'Bearer ' + getToken() },
                data: data
            }
            const res = await axios(requestConfig);
            return res.data;
        } catch(err: any) {
            if(err.response.data.message === 'jwt expired') {
                // Request login again
            } else {
                throw err;
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
                    'Content-Type': 'multipart/form-data'
                },
                // ??? Need to add authen
            }
            const res = await axios(requestConfig);
            return res.data;
        }
        catch(err: any) {
            const res = err.response.data;
            toast.error(res.message);
        }
    }

    function getToken(): string {
        let token = '';
        let userInfo = localStorage.getItem("user");
        if (userInfo) token = JSON.parse(userInfo).accessToken;
        return token;
    }

    function navigation(path: string): void {
        router.push(path);
    }

    return (
        <AppContext.Provider
            value={{
                requestAPI,
                navigation,
                fileUploader
            }}>
                {children}
        </AppContext.Provider>
    )
}