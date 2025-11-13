

// src/context/UserContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import moren from '../photo/moren.jpg'; // 默认头像
import axios from 'axios';

interface UserContextType {
  avatar: string;
  setAvatar: (avatar: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  saveNickname: (newNickname: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  avatar: moren,
  setAvatar: () => {},
  nickname: 'a',
  setNickname: () => {},
  saveNickname: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [avatar, setAvatar] = useState<string>(moren);
  const [nickname, setNickname] = useState<string>('a');

  const userId = 1; // 数据库中用户 ID

  useEffect(() => {
    const fetchOrCreateUser = async () => {
      try {
        // 尝试获取用户
        const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
        if (res.data) {
          setNickname(res.data.nickname || 'a');
          setAvatar(res.data.avatar || moren);
        }
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          // 用户不存在，自动创建
          const createRes = await axios.post(`http://localhost:5000/api/user`, {
            id: userId,
            nickname: 'a',
            avatar: '',
          });
          setNickname(createRes.data.nickname || 'a');
          setAvatar(createRes.data.avatar || moren);
          console.log(' 用户首次访问已自动创建');
        } else {
          console.error('获取用户信息失败:', err);
        }
      }
    };

    fetchOrCreateUser();
  }, []);

  const saveNickname = async (newNickname: string) => {
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}`, {
        nickname: newNickname,
      });
      setNickname(newNickname); // 更新全局状态
      console.log('昵称已更新到数据库');
    } catch (err) {
      console.error('更新昵称失败:', err);
    }
  };

  return (
    <UserContext.Provider
      value={{ avatar, setAvatar, nickname, setNickname, saveNickname }}
    >
      {children}
    </UserContext.Provider>
  );
};
