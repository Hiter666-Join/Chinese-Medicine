// src/context/UserContext.tsx
import { createContext, useState, ReactNode } from 'react';
import moren from '../photo/moren.jpg'; // 默认头像

interface UserContextType {
  avatar: string;
  setAvatar: (avatar: string) => void;
}

export const UserContext = createContext<UserContextType>({
  avatar: moren,
  setAvatar: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [avatar, setAvatar] = useState<string>(moren);

  return (
    <UserContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </UserContext.Provider>
  );
};
