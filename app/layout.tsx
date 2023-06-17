'use client';
import "./output.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import AuthenticationForm from "./components/AuthenticationForm";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <Header />
          <main className="main mt-14">
            {children}
          </main>
          <Footer />
	  		<AuthenticationForm />

      </body>
    </html>
  )
}
