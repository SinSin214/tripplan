'use client';
import "./output.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import AppProvider from './context/appContext';
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./loading";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname();
    const [layout, setLayout] = useState({
        header: true,
        footer: true
    })
    const routeHideHeader: string[] = [];
    const routeHideFooter: string[] = ['/auth/', '/post/write'];

    useEffect(() => {
        setLayout({
            ...layout,
            header: !routeHideHeader.some(item => pathName.includes(item)),
            footer: !routeHideFooter.some(item => pathName.includes(item))
        })
    }, [pathName])

    return (
        <html lang="en">
            <body>
                <AppProvider>
                    <div className="screen-view">
                        {layout.header ? <Header /> : ''}
                        {/* <Suspense fallback={<Loading />}> */}
                        <main className="main">
                            {children}
                            {layout.footer ? <Footer /> : ''}
                        </main>
                        {/* </Suspense> */}
                        <ToastContainer />
                    </div>
                </AppProvider>
            </body>
        </html>
    )
}