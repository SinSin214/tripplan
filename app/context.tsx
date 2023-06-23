'use client'
 
import { IUser } from '@/utils/types';
import { createContext, useState } from 'react'
 
export const AppContext = createContext({
  isSigned: false,
  setIsSigned: (state: boolean) => {},
  user: {},
  setUser: (user: IUser) => {},
  isOpenSignInForm: false,
  setIsOpenSignInForm: (state: boolean) => {},
  isOpenSignUpForm: false,
  setIsOpenSignUpForm: (state: boolean) => {}
})
 
export default function AppProvider({ children }: any) {
    const [isSigned, setIsSigned] = useState(false);
    const [user, setUser] = useState({});
    const [isOpenSignInForm, setIsOpenSignInForm] = useState(false);
    const [isOpenSignUpForm, setIsOpenSignUpForm] = useState(false);

  return (
    <AppContext.Provider 
        value={{
            isSigned, setIsSigned,
            user, setUser,
            isOpenSignInForm, setIsOpenSignInForm,
            isOpenSignUpForm, setIsOpenSignUpForm
        }}>
        {children}
    </AppContext.Provider>
  )
}