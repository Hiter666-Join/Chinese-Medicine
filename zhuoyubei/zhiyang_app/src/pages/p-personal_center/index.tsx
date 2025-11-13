

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import styles from './styles.module.css';

interface UserProfile {
  nickname: string;
  gender: 'male' | 'female';
  age: number;
  phone: string;
  registerTime: string;
  lastLogin: string;
}

type PersonalCenterTab = 'basic-info' | 'physical' | 'my-plans' | 'my-consult' | 'my-favorites' | 'security';

const PersonalCenter: React.FC = () => {
  const navigate = useNavigate();
  const { avatar, setAvatar, nickname, setNickname } = useContext(UserContext);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<PersonalCenterTab>('basic-info');
  const [globalSearchKeyword, setGlobalSearchKeyword] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nickname: '',
    gender: 'male',
    age: 18,
    phone: '',
    registerTime: '',
    lastLogin: ''
  });

  const [searchParams] = useSearchParams();

  const tabTitles: Record<PersonalCenterTab, string> = {
    'basic-info': '基本资料',
    'physical': '我的体质',
    'my-plans': '我的方案',
    'my-consult': '我的咨询',
    'my-favorites': '我的收藏',
    'security': '账号安全'
  };

  const tabIcons: Record<PersonalCenterTab, string> = {
    'basic-info': 'fas fa-user',
    'physical': 'fas fa-stethoscope',
    'my-plans': 'fas fa-file-alt',
    'my-consult': 'fas fa-comments',
    'my-favorites': 'fas fa-heart',
    'security': 'fas fa-shield-alt'
  };

  // 获取 URL tab 参数
  useEffect(() => {
    const tabParam = searchParams.get('tab') as PersonalCenterTab;
    if (tabParam && Object.keys(tabTitles).includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // 页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '个人中心 - 滋智通';
    return () => { document.title = originalTitle; };
  }, []);

  // 获取用户信息
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = 1; // TODO: 根据实际登录信息替换
        const res = await fetch(`http://localhost:5000/api/user/${userId}`);
        if (!res.ok) throw new Error('获取用户信息失败');
        const data = await res.json();
        setUserProfile({
          nickname: data.nickname,
          gender: data.gender,
          age: data.age,
          phone: data.phone,
          registerTime: data.registerTime,
          lastLogin: data.lastLogin
        });
        setNickname(data.nickname); // 更新全局昵称
      } catch (err) {
        console.error(err);
        alert('无法获取用户信息，请稍后重试');
      }
    };
    fetchUserProfile();
  }, [setNickname]);

  const handleSidebarToggle = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = globalSearchKeyword.trim();
      if (keyword) navigate(`/search-result?q=${encodeURIComponent(keyword)}`);
    }
  };

  const handleTabChange = (tab: PersonalCenterTab) => {
    setActiveTab(tab);
    navigate(`/personal-center?tab=${tab}`, { replace: true });
  };

  const handleSaveProfile = async () => {
    try {
      const userId = 1; // TODO: 根据实际登录信息替换
      const res = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: userProfile.nickname,
          gender: userProfile.gender,
          phone: userProfile.phone
        })
      });
      if (!res.ok) throw new Error('更新失败');
      const data = await res.json();
      if (data.success) {
        setNickname(userProfile.nickname);
        alert('资料保存成功！');
      } else {
        alert('保存失败，请重试');
      }
    } catch (err) {
      console.error(err);
      alert('保存失败，请重试');
    }
  };

  const handleTakePhysicalTest = () => navigate('/physical-test');
  const handleConsultItemClick = (consultId: string) => navigate(`/ai-consult?consultId=${consultId}`);
  const handleFavoriteItemClick = (type: string, id: string) => {
    if (type === 'herb') navigate(`/knowledge-base?herb=${id}`);
    else if (type === 'content') navigate(`/content?id=${id}`);
  };
  const handleChangePassword = () => alert('修改密码功能即将上线，请关注后续更新！');

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <header className={`fixed top-0 left-0 right-0 h-16 ${styles.glassEffect} z-50 shadow-md`}>
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-md">
              <i className="fas fa-leaf text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-text-primary">滋智通</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/home" className="text-text-secondary hover:text-accent py-1 transition-colors">首页</a>
            <a href="/knowledge-base" className="text-text-secondary hover:text-accent py-1 transition-colors">知识库</a>
            <a href="/ai-consult" className="text-text-secondary hover:text-accent py-1 transition-colors">智能咨询</a>
            <a href="/personal-center" className="text-accent font-medium border-b-2 border-accent py-1">个人中心</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <input 
                type="text" 
                placeholder="搜索滋补品、方案..." 
                value={globalSearchKeyword}
                onChange={(e) => setGlobalSearchKeyword(e.target.value)}
                onKeyPress={handleGlobalSearchKeyPress}
                className={`w-64 px-4 py-2 pl-10 ${styles.glassEffect} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-sm`}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"></i>
            </div>
            <button className={`relative p-2 ${styles.glassButton} rounded-lg hover:bg-accent/20 transition-colors`}>
              <i className="fas fa-bell text-text-secondary"></i>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="relative">
              <button className={`flex items-center space-x-2 p-2 ${styles.glassButton} rounded-lg hover:bg-accent/10 transition-colors`}>
                <img src={avatar} alt="用户头像" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                <span>{nickname}</span>
                <i className="fas fa-chevron-down text-xs text-text-secondary"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 左侧菜单 */}
      <aside className={`fixed left-0 top-16 bottom-0 ${isSidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded} ${styles.glassEffect} z-40 shadow-inner transition-all duration-300`}>
        <div className="p-4 flex flex-col items-center">
          <button onClick={handleSidebarToggle} className={`w-full mb-6 p-2 ${styles.glassButton} rounded-lg text-center hover:bg-accent/20 transition-colors`}>
            <i className="fas fa-bars text-text-secondary"></i>
          </button>
          <nav className="space-y-3 w-full">
            {Object.entries(tabTitles).map(([tabKey, tabLabel]) => (
              <button
                key={tabKey}
                onClick={() => handleTabChange(tabKey as PersonalCenterTab)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                  ${activeTab === tabKey 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'text-text-secondary hover:bg-accent/10 hover:text-accent'}`}
                title={tabLabel}
              >
                <i className={`${tabIcons[tabKey as PersonalCenterTab]} text-lg`}></i>
                {!isSidebarCollapsed && <span className="font-medium">{tabLabel}</span>}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className={`${isSidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded} pt-20 min-h-screen transition-all duration-300 bg-gray-50`}>
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2">{tabTitles[activeTab]}</h2>

          <div className="flex flex-col space-y-6">
            {/* 基本资料 */}
            {activeTab === 'basic-info' && (
              <div className="p-6 bg-white rounded-2xl shadow-lg max-w-xl mx-auto space-y-6">
                <div className="flex items-center space-x-4">
                  <img src={avatar} alt="用户头像" className="w-20 h-20 rounded-full border-4 border-accent shadow-md"/>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                      <label className="text-sm text-text-secondary w-20">昵称</label>
                      <input
                        type="text"
                        value={userProfile.nickname}
                        onChange={(e) => setUserProfile({ ...userProfile, nickname: e.target.value })}
                        className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div className="text-sm text-text-secondary">注册时间: {userProfile.registerTime}</div>
                    <div className="text-sm text-text-secondary">上次登录: {userProfile.lastLogin}</div>
                  </div>
                </div>

                {/* 性别、年龄、手机号 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/10 rounded-xl shadow-inner flex flex-col">
                    <label className="text-sm text-text-secondary mb-1">性别</label>
                    <select
                      value={userProfile.gender}
                      onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value as 'male' | 'female' })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="male">男</option>
                      <option value="female">女</option>
                    </select>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-xl shadow-inner flex flex-col">
                    <label className="text-sm text-text-secondary mb-1">年龄</label>
                    <input
                      type="number"
                      value={userProfile.age}
                      onChange={(e) => setUserProfile({ ...userProfile, age: Number(e.target.value) })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div className="p-4 bg-accent/10 rounded-xl shadow-inner flex flex-col md:col-span-2">
                    <label className="text-sm text-text-secondary mb-1">手机号</label>
                    <input
                      type="text"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSaveProfile}
                  className="w-full py-2 bg-accent text-white rounded-xl hover:bg-accent-dark transition-colors font-medium"
                >
                  保存资料
                </button>

                <button
                  onClick={() => navigate('/login-register')}
                  className="w-full py-2 mt-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
                >
                  退出登录
                </button>
              </div>
            )}

            {/* 其他 tab 可以保持原逻辑 */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalCenter;
