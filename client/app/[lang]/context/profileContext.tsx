'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { IProfile, IUserInfo } from '@/utils/types';
import { AppContext } from "./appContext";

const initProfile = {
  profile: { username: '', email: '', isSigned: false },
  setProfile: (value: IProfile) => { },
  setupUserInfo: (userInfo: IUserInfo) => { },
  clearUserInfo: () => { }
};

export const ProfileContext = createContext(initProfile);

export default function ProfileProvider({ children }: any) {
  const { requestAPI } = useContext(AppContext);
  const [profile, setProfile] = useState<IProfile>(initProfile.profile);

  function setupUserInfo(userInfo: IUserInfo) {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setProfile({
      username: userInfo.username,
      email: userInfo.email,
      isSigned: true
    })
  }

  function clearUserInfo() {
    localStorage.clear();
    setProfile({
      username: '',
      email: '',
      isSigned: false
    })
  }

  // At the first time visit page, check if token available
  useEffect(() => {
    async function checkToken() {
      let sUserInfo = localStorage.getItem("user");
      if (sUserInfo) {
        let oUserInfo = JSON.parse(sUserInfo);
        try {
          let res = await requestAPI('/auth/check_token_expiration', 'POST', oUserInfo);
          // If access token expired and refresh token is not expired yet
          // server return userInfo with new access token
          if (res.user) oUserInfo = res.user;
          // If access token is not expired yet
          // server does not return anything then use old userInfo
          setupUserInfo(res.user);
        } catch (err: any) {
          if(err) clearUserInfo();
        }
      }
    }
    checkToken();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, setupUserInfo, clearUserInfo }}>
      {children}
    </ProfileContext.Provider>
  )
}