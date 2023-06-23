'use client';
import "./output.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import AuthenticationForm from "./components/AuthenticationForm";
import AppProvider, { AppContext } from "./context";
import { useContext, useEffect } from "react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    let { setIsSigned, setUser } = useContext(AppContext);

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

    return (
        <html lang="en">
        <body>
            <AppProvider>
                <div className="screen-view">
                <Header />
                <main className="main mt-14">
                    {children}
                </main>
                <Footer />
                <AuthenticationForm />
                </div>
            </AppProvider>
        </body>
    </html>
  )
}
