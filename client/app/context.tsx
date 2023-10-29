'use client'

import { IUser } from '@/utils/types';
import { createContext, useState } from 'react'

interface IProfile {
  username: string
}

interface IError {
  show: boolean,
  error: string
}

const defaultSignIn = {
  isSigned: false,
  setIsSigned: (value: boolean) => {}
}

const defaultProfile = {
  profile: { username: ''},
  setProfile: (value: IProfile) => {}
}

const defaultErrorDlg = {
  errorDlg: { show: false, error: '' },
  setErrorDlg: (value: IError) => {}
}

export const SignInContext = createContext(defaultSignIn);
export const ProfileContext = createContext(defaultProfile);
export const ErrorContext = createContext(defaultErrorDlg);


export default function AppProvider({ children }: any) {
  const [isSigned, setIsSigned] = useState(defaultSignIn.isSigned);
  const [errorDlg, setErrorDlg] = useState(defaultErrorDlg.errorDlg);
  const [profile, setProfile] = useState(defaultProfile.profile);

  return (
    <SignInContext.Provider value={{ isSigned, setIsSigned }}>
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <ErrorContext.Provider value={{ errorDlg, setErrorDlg }}>
          {children}
        </ErrorContext.Provider>
      </ProfileContext.Provider>
    </SignInContext.Provider>
  )
}