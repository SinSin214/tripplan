'use client';
import { createContext, useState } from "react";
import Loading from "../components/AppLoading";

export const AppLoadingContext = createContext({
    isAppLoading: false,
    setIsAppLoading: (value: boolean) => { }
});

export default function AppLoadingProvider({ children }: any) {
    const [isAppLoading, setIsAppLoading] = useState<boolean>(false);

    return (
        <AppLoadingContext.Provider
            value={{
                isAppLoading,
                setIsAppLoading
            }}>
            {isAppLoading ? <Loading /> : ''}
            {children}
        </AppLoadingContext.Provider>
    )
}