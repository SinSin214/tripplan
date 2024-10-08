'use client';
import { createContext, useState } from "react";
import LoadingBackdrop from "../components/App/LoadingBackdrop";

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
            <LoadingBackdrop loading={isAppLoading} />
            {children}
        </AppLoadingContext.Provider>
    )
}