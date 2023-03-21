'use client';
import "./output.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import styles from './page.module.css'

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
          <Navbar />
          <main className={styles.main}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
