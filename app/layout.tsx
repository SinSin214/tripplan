'use client';
import "./output.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import AuthenticationForm from "./components/AuthenticationForm";
import AppProvider, { AppContext } from "./context";
import { useContext, useEffect } from "react";
import { IUser } from "@/utils/types";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    useEffect(() => {
        let userInfo = localStorage.getItem("user");
        if(userInfo) {
            let {username, email} = JSON.parse(userInfo);
            let { setIsSigned, setUser } = useContext(AppContext);
            setIsSigned(true);
            setUser({
                username: username,
                email: email
            })
        }
    }, []);

    return (
        <html lang="en">
        <body>
            <AppProvider>
                <Header />
                <main className="main mt-14">
                    {children}
                </main>
                <Footer />
                <AuthenticationForm />
            </AppProvider>
        </body>
    </html>
  )
}
