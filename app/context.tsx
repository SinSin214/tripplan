'use client'
 
import { IUser } from '@/utils/types';
import { createContext, useState } from 'react'
 
export const AppContext = createContext({
  isSigned: false,
  setIsSigned: (state: boolean) => {},
  user: {},
  setUser: (user: IUser) => {},
  isOpenAuthForm: false,
  setIsOpenAuthForm: (state: boolean) => {}
})
 
export default function AppProvider({ children }: any) {
    const [isSigned, setIsSigned] = useState(false);
    const [user, setUser] = useState({});
    const [isOpenAuthForm, setIsOpenAuthForm] = useState(false);
  return (
    <AppContext.Provider 
        value={{
            isSigned, setIsSigned,
            user, setUser,
            isOpenAuthForm, setIsOpenAuthForm
        }}>
        {children}
    </AppContext.Provider>
  )
}