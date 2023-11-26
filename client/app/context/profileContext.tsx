import { createContext, useEffect, useState } from "react";

interface IProfile {
  username: string,
  isSigned: boolean
}

const initProfile = {
  profile: { username: '', isSigned: false },
  setProfile: (value: IProfile) => {},
  setupUser: (token: string, username: string) => {}
};

export const ProfileContext = createContext(initProfile);

export default function ProfileProvider({ children }: any) {
  const [profile, setProfile] = useState<IProfile>(initProfile.profile);

  function setupUser(token: string, username: string) {
    let user = {
      access_token: token,
      username: username
    };

    localStorage.setItem("user", JSON.stringify(user));
    setProfile({
      username: username,
      isSigned: true
    })
  }

  useEffect(() => {
    let userInfo = localStorage.getItem("user");
    if (userInfo) {
        let { username } = JSON.parse(userInfo);
        setProfile({
            username: username,
            isSigned: true
        });
    }
}, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, setupUser }}>
      {children}
    </ProfileContext.Provider>
  )
}