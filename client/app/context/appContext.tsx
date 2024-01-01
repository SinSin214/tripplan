import React, { createContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const AppContext = createContext({
    requestAPI: async (path: string, method: string, data?: Object | null): Promise<any> => {},
    navigation: (path: string) => {}
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
                navigation
            }}>
                {children}
        </AppContext.Provider>
    )
}