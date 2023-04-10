'use client';
import "./output.css";
import Header from './components/Header';
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <Header />
          <main className="main">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  )
}
