'use client';
import "./output.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <header>
          </header>
          <Header />
          <main className="main">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
