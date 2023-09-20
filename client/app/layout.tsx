'use client';
import "./output.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import AuthenticationForm from "./components/AuthenticationForm";
import AppProvider, { AppContext } from "./context";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathName = usePathname();
    const { setIsSigned, setUser } = useContext(AppContext);
    const [isShowFooter, setIsShowFooter] = useState(true);

    useEffect(() => {
        let userInfo = localStorage.getItem("user");
        if(userInfo) {
            let {username, email} = JSON.parse(userInfo);
            setIsSigned(true);
            setUser({
                username: username,
                email: email
            })
        }
    }, []);
    useEffect(() => {
        if(pathName === '/post/write') {
            setIsShowFooter(false);
        } else setIsShowFooter(true);
    })


    return (
        <html lang="en">
        <body>
            <AppProvider>
                <div className="screen-view">
                <Header />
                <div className="h-14"></div>
                <main className="main">
                    {children}
                    {isShowFooter ? <Footer /> : ''}
                </main>
                <AuthenticationForm />
                </div>
            </AppProvider>
        </body>
    </html>
  )
}