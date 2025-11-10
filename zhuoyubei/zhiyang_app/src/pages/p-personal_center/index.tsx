
<<<<<<< HEAD

=======
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
>>>>>>> 570d511 (first commit)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<PersonalCenterTab>('basic-info');
  const [globalSearchKeyword, setGlobalSearchKeyword] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nickname: '张先生',
    gender: 'male',
    age: 55,
    phone: '138****8888',
    registerTime: '2024-01-15',
    lastLogin: '2024-03-15 14:30'
  });

  const tabTitles: Record<PersonalCenterTab, string> = {
    'basic-info': '基本资料',
    'physical': '我的体质',
    'my-plans': '我的方案',
    'my-consult': '我的咨询',
    'my-favorites': '我的收藏',
    'security': '账号安全'
  };

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '个人中心 - 滋智通';
    return () => { document.title = originalTitle; };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = globalSearchKeyword.trim();
      if (keyword) {
        navigate(`/search-result?q=${encodeURIComponent(keyword)}`);
      }
    }
  };

  const handleTabChange = (tab: PersonalCenterTab) => {
    setActiveTab(tab);
  };

  const handleSaveProfile = () => {
    console.log('保存基本资料:', userProfile);
    alert('资料保存成功！');
  };

  const handleTakePhysicalTest = () => {
    navigate('/physical-test');
  };

  const handleConsultItemClick = (consultId: string) => {
    navigate(`/ai-consult?consultId=${consultId}`);
  };

  const handleFavoriteItemClick = (type: string, id: string) => {
    if (type === 'herb') {
      navigate(`/knowledge-base?herb=${id}`);
    } else if (type === 'content') {
      navigate(`/content?id=${id}`);
    }
  };

  const handleChangePassword = () => {
    console.log('需要实现修改密码功能');
    alert('修改密码功能即将上线，请关注后续更新！');
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <header className={`fixed top-0 left-0 right-0 h-16 ${styles.glassEffect} z-50`}>
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo和产品名称 */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <i className="fas fa-leaf text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-text-primary">滋智通</h1>
          </div>
          
          {/* 主导航菜单 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-text-secondary hover:text-accent py-1 transition-colors">首页</Link>
            <Link to="/knowledge-base" className="text-text-secondary hover:text-accent py-1 transition-colors">知识库</Link>
            <Link to="/ai-consult" className="text-text-secondary hover:text-accent py-1 transition-colors">智能咨询</Link>
            <Link to="/personal-center" className="text-accent font-medium border-b-2 border-accent py-1">个人中心</Link>
          </nav>
          
          {/* 搜索框和用户操作区 */}
          <div className="flex items-center space-x-4">
            {/* 搜索框 */}
            <div className="relative hidden lg:block">
              <input 
                type="text" 
                placeholder="搜索滋补品、方案..." 
                value={globalSearchKeyword}
                onChange={(e) => setGlobalSearchKeyword(e.target.value)}
                onKeyPress={handleGlobalSearchKeyPress}
                className={`w-64 px-4 py-2 pl-10 ${styles.glassEffect} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent`}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"></i>
            </div>
            
            {/* 消息通知 */}
            <button className={`relative p-2 ${styles.glassButton} rounded-lg`}>
              <i className="fas fa-bell text-text-secondary"></i>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button className={`flex items-center space-x-2 p-2 ${styles.glassButton} rounded-lg`}>
                <img src="https://s.coze.cn/image/2YD7NbQOwsE/" 
                     alt="用户头像" className="w-8 h-8 rounded-full" />
                <span className="hidden md:block text-sm text-text-primary">张先生</span>
                <i className="fas fa-chevron-down text-xs text-text-secondary"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 左侧菜单 */}
      <aside className={`fixed left-0 top-16 bottom-0 ${isSidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded} ${styles.glassEffect} z-40 transition-all duration-300`}>
        <div className="p-4">
          {/* 菜单切换按钮 */}
          <button onClick={handleSidebarToggle} className={`w-full mb-6 p-2 ${styles.glassButton} rounded-lg text-center`}>
            <i className="fas fa-bars text-text-secondary"></i>
          </button>
          
          {/* 菜单项 */}
          <nav className="space-y-2">
            <Link to="/home" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-home text-lg"></i>
              {!isSidebarCollapsed && <span>首页</span>}
            </Link>
            <Link to="/plan" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-file-alt text-lg"></i>
              {!isSidebarCollapsed && <span>我的方案</span>}
            </Link>
            <Link to="/ai-consult" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-comments text-lg"></i>
              {!isSidebarCollapsed && <span>我的咨询</span>}
            </Link>
            <Link to="/personal-center" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-heart text-lg"></i>
              {!isSidebarCollapsed && <span>我的收藏</span>}
            </Link>
            <Link to="/physical-test" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-stethoscope text-lg"></i>
              {!isSidebarCollapsed && <span>体质测试</span>}
            </Link>
          </nav>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className={`${isSidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded} pt-16 min-h-screen transition-all duration-300`}>
        <div className="p-6">
          {/* 页面头部 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">{tabTitles[activeTab]}</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>个人中心</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 个人中心左侧导航 */}
          <div className="flex space-x-6">
            <div className="w-64 flex-shrink-0">
              <div className={`${styles.glassCard} rounded-xl p-6`}>
                <h3 className="text-lg font-semibold text-text-primary mb-6">个人中心</h3>
                <nav className="space-y-2">
                  <button 
                    onClick={() => handleTabChange('basic-info')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeTab === 'basic-info' ? styles.sidebarNavItemActive : `text-text-secondary ${styles.sidebarNavItemInactive}`
                    }`}
                  >
                    <i className="fas fa-user text-lg"></i>
                    <span>基本资料</span>
                  </button>
                  <button 
                    onClick={() => handleTabChange('physical')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeTab === 'physical' ? styles.sidebarNavItemActive : `text-text-secondary ${styles.sidebarNavItemInactive}`
                    }`}
                  >
                    <i className="fas fa-heartbeat text-lg"></i>
                    <span>我的体质</span>
                  </button>
                  <button 
                    onClick={() => handleTabChange('my-plans')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeTab === 'my-plans' ? styles.sidebarNavItemActive : `text-text-secondary ${styles.sidebarNavItemInactive}`
                    }`}
                  >
                    <i className="fas fa-file-medical text-lg"></i>
                    <span>我的方案</span>
                  </button>
                  <button 
                    onClick={() => handleTabChange('my-consult')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeTab === 'my-consult' ? styles.sidebarNavItemActive : `text-text-secondary ${styles.sidebarNavItemInactive}`
                    }`}
                  >
                    <i className="fas fa-comments-dots text-lg"></i>
                    <span>我的咨询</span>
                  </button>
                  <button 
                    onClick={() => handleTabChange('my-favorites')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeTab === 'my-favorites' ? styles.sidebarNavItemActive : `text-text-secondary ${styles.sidebarNavItemInactive}`
                    }`}
                  >
                    <i className="fas fa-star text-lg"></i>
                    <span>我的收藏</span>
                  </button>
                  <button 
                    onClick={() => handleTabChange('security')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeTab === 'security' ? styles.sidebarNavItemActive : `text-text-secondary ${styles.sidebarNavItemInactive}`
                    }`}
                  >
                    <i className="fas fa-shield-alt text-lg"></i>
                    <span>账号安全</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* 主内容区域 */}
            <div className="flex-1 min-w-0">
              {/* 基本资料 */}
              {activeTab === 'basic-info' && (
                <div className={`${styles.glassCard} rounded-xl p-6`}>
                  <h3 className="text-lg font-semibold text-text-primary mb-6">基本资料</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">昵称</label>
                        <input 
                          type="text" 
                          value={userProfile.nickname}
                          onChange={(e) => setUserProfile({...userProfile, nickname: e.target.value})}
                          className={`w-full px-4 py-2 ${styles.glassEffect} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">性别</label>
                        <select 
                          value={userProfile.gender}
                          onChange={(e) => setUserProfile({...userProfile, gender: e.target.value as 'male' | 'female'})}
                          className={`w-full px-4 py-2 ${styles.glassEffect} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent`}
                        >
                          <option value="male">男</option>
                          <option value="female">女</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">年龄</label>
                        <input 
                          type="number" 
                          value={userProfile.age}
                          onChange={(e) => setUserProfile({...userProfile, age: parseInt(e.target.value)})}
                          className={`w-full px-4 py-2 ${styles.glassEffect} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent`}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">手机号</label>
                        <input 
                          type="tel" 
                          value={userProfile.phone} 
                          readOnly
                          className={`w-full px-4 py-2 ${styles.glassEffect} rounded-lg text-sm bg-gray-100 text-text-secondary`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">注册时间</label>
                        <input 
                          type="text" 
                          value={userProfile.registerTime} 
                          readOnly
                          className={`w-full px-4 py-2 ${styles.glassEffect} rounded-lg text-sm bg-gray-100 text-text-secondary`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">最后登录</label>
                        <input 
                          type="text" 
                          value={userProfile.lastLogin} 
                          readOnly
                          className={`w-full px-4 py-2 ${styles.glassEffect} rounded-lg text-sm bg-gray-100 text-text-secondary`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={handleSaveProfile}
                      className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all"
                    >
                      保存修改
                    </button>
                  </div>
                </div>
              )}

              {/* 我的体质 */}
              {activeTab === 'physical' && (
                <div className={`${styles.glassCard} rounded-xl p-6`}>
                  <h3 className="text-lg font-semibold text-text-primary mb-6">体质测试结果</h3>
                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-4 ${styles.glassEffect} rounded-lg`}>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <i className="fas fa-heartbeat text-accent text-lg"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary">阳虚体质</h4>
                          <p className="text-sm text-text-secondary">测试时间：2024-03-10</p>
                        </div>
                      </div>
                      <button className={`px-4 py-2 ${styles.glassButton} rounded-lg text-sm text-accent`}>查看详情</button>
                    </div>
                    <div className={`flex items-center justify-between p-4 ${styles.glassEffect} rounded-lg`}>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <i className="fas fa-heartbeat text-accent text-lg"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary">平和体质</h4>
                          <p className="text-sm text-text-secondary">测试时间：2024-02-15</p>
                        </div>
                      </div>
                      <button className={`px-4 py-2 ${styles.glassButton} rounded-lg text-sm text-accent`}>查看详情</button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button 
                      onClick={handleTakePhysicalTest}
                      className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all"
                    >
                      <i className="fas fa-stethoscope mr-2"></i>重新测试
                    </button>
                  </div>
                </div>
              )}

              {/* 我的方案 */}
              {activeTab === 'my-plans' && (
                <div className={`${styles.glassCard} rounded-xl p-6`}>
                  <h3 className="text-lg font-semibold text-text-primary mb-6">我的滋补方案</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-text-primary">方案名称</th>
                          <th className="text-left py-3 px-4 font-medium text-text-primary">生成日期</th>
                          <th className="text-left py-3 px-4 font-medium text-text-primary">状态</th>
                          <th className="text-left py-3 px-4 font-medium text-text-primary">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-glass-bg">
                          <td className="py-3 px-4">
                            <Link to="/plan?id=1" className="text-accent hover:underline">阳虚体质调理方案</Link>
                          </td>
                          <td className="py-3 px-4 text-text-secondary">2024-03-10</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">进行中</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-500 hover:text-blue-700">
                                <i className="fas fa-eye"></i>
                              </button>
                              <button className="text-green-500 hover:text-green-700">
                                <i className="fas fa-share"></i>
                              </button>
                              <button className="text-red-500 hover:text-red-700">
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-glass-bg">
                          <td className="py-3 px-4">
                            <Link to="/plan?id=2" className="text-accent hover:underline">春季养生方案</Link>
                          </td>
                          <td className="py-3 px-4 text-text-secondary">2024-02-20</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">已完成</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-500 hover:text-blue-700">
                                <i className="fas fa-eye"></i>
                              </button>
                              <button className="text-green-500 hover:text-green-700">
                                <i className="fas fa-share"></i>
                              </button>
                              <button className="text-red-500 hover:text-red-700">
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 我的咨询 */}
              {activeTab === 'my-consult' && (
                <div className={`${styles.glassCard} rounded-xl p-6`}>
                  <h3 className="text-lg font-semibold text-text-primary mb-6">咨询记录</h3>
                  <div className="space-y-4">
                    <div 
                      className={`p-4 ${styles.glassEffect} rounded-lg ${styles.hoverLift} cursor-pointer`}
                      onClick={() => handleConsultItemClick('1')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">关于人参食用方法的咨询</h4>
                        <span className="text-sm text-text-secondary">2024-03-15 10:30</span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">咨询了人参的正确食用方法和注意事项...</p>
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <span><i className="fas fa-clock mr-1"></i>15分钟</span>
                        <span><i className="fas fa-comments mr-1"></i>8条消息</span>
                      </div>
                    </div>
                    <div 
                      className={`p-4 ${styles.glassEffect} rounded-lg ${styles.hoverLift} cursor-pointer`}
                      onClick={() => handleConsultItemClick('2')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">体质调理方案调整</h4>
                        <span className="text-sm text-text-secondary">2024-03-12 15:45</span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">根据最新体质情况，调整了滋补方案...</p>
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <span><i className="fas fa-clock mr-1"></i>22分钟</span>
                        <span><i className="fas fa-comments mr-1"></i>12条消息</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 我的收藏 */}
              {activeTab === 'my-favorites' && (
                <div className={`${styles.glassCard} rounded-xl p-6`}>
                  <h3 className="text-lg font-semibold text-text-primary mb-6">我的收藏</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 收藏的滋补品 */}
                    <div 
                      className={`p-4 ${styles.glassEffect} rounded-lg ${styles.hoverLift} cursor-pointer`}
                      onClick={() => handleFavoriteItemClick('herb', '1')}
                    >
                      <div className="flex items-center space-x-3">
                        <img src="https://s.coze.cn/image/hmFYJx720EA/" 
                             alt="人参" className="w-12 h-12 rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary">长白山人参</h4>
                          <p className="text-sm text-text-secondary">补气养血，增强体质</p>
                          <span className="text-xs text-text-secondary">收藏于 2024-03-10</span>
                        </div>
                      </div>
                    </div>
                    {/* 收藏的科普内容 */}
                    <div 
                      className={`p-4 ${styles.glassEffect} rounded-lg ${styles.hoverLift} cursor-pointer`}
                      onClick={() => handleFavoriteItemClick('content', '1')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <i className="fas fa-book-open text-accent text-lg"></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary">冬季滋补指南</h4>
                          <p className="text-sm text-text-secondary">科普文章</p>
                          <span className="text-xs text-text-secondary">收藏于 2024-03-08</span>
                        </div>
                      </div>
                    </div>
                    <div 
                      className={`p-4 ${styles.glassEffect} rounded-lg ${styles.hoverLift} cursor-pointer`}
                      onClick={() => handleFavoriteItemClick('herb', '2')}
                    >
                      <div className="flex items-center space-x-3">
                        <img src="https://s.coze.cn/image/gRaiQfqvOpU/" 
                             alt="枸杞" className="w-12 h-12 rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary">宁夏枸杞</h4>
                          <p className="text-sm text-text-secondary">滋补肝肾，明目</p>
                          <span className="text-xs text-text-secondary">收藏于 2024-03-05</span>
                        </div>
                      </div>
                    </div>
                    <div 
                      className={`p-4 ${styles.glassEffect} rounded-lg ${styles.hoverLift} cursor-pointer`}
                      onClick={() => handleFavoriteItemClick('content', '2')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <i className="fas fa-video text-accent text-lg"></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary">中医体质辨识方法</h4>
                          <p className="text-sm text-text-secondary">科普视频</p>
                          <span className="text-xs text-text-secondary">收藏于 2024-03-01</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 账号安全 */}
              {activeTab === 'security' && (
                <div className={`${styles.glassCard} rounded-xl p-6`}>
                  <h3 className="text-lg font-semibold text-text-primary mb-6">账号安全</h3>
                  <div className="space-y-6">
                    <div className={`flex items-center justify-between p-4 ${styles.glassEffect} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                          <i className="fas fa-mobile-alt text-accent"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary">绑定手机</h4>
                          <p className="text-sm text-text-secondary">138****8888</p>
                        </div>
                      </div>
                      <button className={`px-4 py-2 ${styles.glassButton} rounded-lg text-sm text-accent`}>更换</button>
                    </div>
                    <div className={`flex items-center justify-between p-4 ${styles.glassEffect} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                          <i className="fab fa-weixin text-accent"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary">微信绑定</h4>
                          <p className="text-sm text-text-secondary">已绑定</p>
                        </div>
                      </div>
                      <button className={`px-4 py-2 ${styles.glassButton} rounded-lg text-sm text-accent`}>解绑</button>
                    </div>
                    <div className={`flex items-center justify-between p-4 ${styles.glassEffect} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                          <i className="fas fa-key text-accent"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary">修改密码</h4>
                          <p className="text-sm text-text-secondary">定期更换密码保护账号安全</p>
                        </div>
                      </div>
                      <button 
                        onClick={handleChangePassword}
                        className={`px-4 py-2 ${styles.glassButton} rounded-lg text-sm text-accent`}
                      >
                        修改
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 底部区域 */}
        <footer className={`${styles.glassEffect} py-6 mt-12`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-text-secondary">© 2024 滋智通. 保留所有权利.</p>
                <p className="text-xs text-text-secondary mt-1">京ICP备12345678号-1</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-text-secondary hover:text-accent transition-colors">隐私政策</a>
                <a href="#" className="text-sm text-text-secondary hover:text-accent transition-colors">服务条款</a>
                <a href="#" className="text-sm text-text-secondary hover:text-accent transition-colors">联系我们</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PersonalCenter;

