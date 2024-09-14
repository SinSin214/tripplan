import "@/output.css";
import Header from './components/App/Header';
import Footer from "./components/App/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import AppProvider from './context/appContext';
import AuthProvider from "./context/authContext";
import SelectionProvider from "./context/selectionContext";
import AppLoadingProvider from "./context/loadingContext";
import { Suspense } from "react";
import Loading from "./loading";
import LoadingBackdrop from "./components/App/LoadingBackdrop";

export default function RootLayout({ children, params: {locale} }: { children: React.ReactNode; params: {locale: string}}) {

    const messages = useMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <AppProvider>
                        <AuthProvider>
                            <SelectionProvider>
                                <AppLoadingProvider>
                                    <Header/>
                                    <Suspense fallback={<Loading />}>
                                        <main className="main" id="mainLayout">
                                            {children}
                                        </main>
                                    </Suspense>
                                    <Footer/>
                                </AppLoadingProvider>
                                <ToastContainer/>
                            </SelectionProvider>
                        </AuthProvider>
                    </AppProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}