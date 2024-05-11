import "@/app/output.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import AppProvider from './context/appContext';
import AuthProvider from "./context/authContext";
import SelectionProvider from "./context/selectionContext";
import AppLoadingProvider from "./context/loadingContext";

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
                        <SelectionProvider>
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
                        </SelectionProvider>
                    </AuthProvider>
                </AppProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}