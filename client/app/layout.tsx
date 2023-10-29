'use client';
import "./output.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import AppProvider, { ProfileContext, SignInContext } from "./context";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ErrorDlg from "./components/ErrorDlg";


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname();
    const { setIsSigned } = useContext(SignInContext);
    const { setProfile } = useContext(ProfileContext);
    const [isShowHeader, setIsShowHeader] = useState(true);
    const [isShowFooter, setIsShowFooter] = useState(true);
    const routeHideHeader = ['/auth/'];
    const routeHideFooter = ['/auth/', '/post/write'];
    useEffect(() => {
        let userInfo = localStorage.getItem("user");
        if (userInfo) {
            let { username, email } = JSON.parse(userInfo);
            setIsSigned(true);
            setProfile({
                username: username,
            })
        }
    }, []);
    useEffect(() => {
        if (routeHideHeader.some(item => pathName.includes(item))) setIsShowHeader(false);
        else setIsShowHeader(true);
        if (routeHideFooter.some(item => pathName.includes(item))) setIsShowFooter(false);
        else setIsShowFooter(true);
    }, [])


    return (
        <html lang="en">
            <body>
                <AppProvider>
                    <div className="screen-view">
                        {isShowHeader ? <Header /> : ''}
                        <ErrorDlg />
                        <main className="main">
                            {children}
                            {isShowFooter ? <Footer /> : ''}
                        </main>
                    </div>
                </AppProvider>
            </body>
        </html>
    )
}