// 'use client';
import "@/app/output.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import AppProvider from './context/appContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "./context/authContext";
import AppLoadingProvider from "./context/loadingContext";
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function RootLayout({
    children,
    params: {locale}
  }: {
    children: React.ReactNode;
    params: {locale: string};
  }) {

    const messages = useMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                <AppProvider>
                    <AuthProvider>
                    <div className="screen-view">
                        <Header />
                        <AppLoadingProvider>
                        <main className="main" id="mainLayout">
                            {children}
                            <Footer />
                        </main>
                        </AppLoadingProvider>
                        <ToastContainer />
                    </div>
                    </AuthProvider>
                </AppProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}