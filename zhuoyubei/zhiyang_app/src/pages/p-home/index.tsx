

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const HomePage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [globalSearchValue, setGlobalSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '滋智通 - 智能滋补养生平台';
    return () => { document.title = originalTitle; };
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = globalSearchValue.trim();
      if (keyword) {
        navigate(`/search-result?q=${encodeURIComponent(keyword)}`);
      }
    }
  };

  const handleStartTestClick = () => {
    navigate('/physical-test');
  };

  const handleAiConsultClick = () => {
    navigate('/ai-consult');
  };

  const handleNotificationClick = () => {
    console.log('打开消息通知');
  };

  const handlePrivacyPolicyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('跳转到隐私政策页面');
  };

  const handleTermsOfServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('跳转到服务条款页面');
  };

  const handleContactUsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('跳转到联系我们页面');
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
            <Link to="/home" className="text-accent font-medium border-b-2 border-accent py-1">首页</Link>
            <Link to="/knowledge-base" className="text-text-secondary hover:text-accent py-1 transition-colors">知识库</Link>
            <Link to="/ai-consult" className="text-text-secondary hover:text-accent py-1 transition-colors">智能咨询</Link>
            <Link to="/personal-center" className="text-text-secondary hover:text-accent py-1 transition-colors">个人中心</Link>
          </nav>
          
          {/* 搜索框和用户操作区 */}
          <div className="flex items-center space-x-4">
            {/* 搜索框 */}
            <div className="relative hidden lg:block">
              <input 
                type="text" 
                placeholder="搜索滋补品、方案..." 
                value={globalSearchValue}
                onChange={(e) => setGlobalSearchValue(e.target.value)}
                onKeyPress={handleGlobalSearchKeyPress}
                className={`w-64 px-4 py-2 pl-10 ${styles.glassEffect} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent`}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"></i>
            </div>
            
            {/* 消息通知 */}
            <button onClick={handleNotificationClick} className={`relative p-2 ${styles.glassButton} rounded-lg`}>
              <i className="fas fa-bell text-text-secondary"></i>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <Link to="/personal-center" className={`flex items-center space-x-2 p-2 ${styles.glassButton} rounded-lg`}>
                <img src="https://s.coze.cn/image/7Jur9SkWYDg/" 
                     alt="用户头像" className="w-8 h-8 rounded-full" />
                <span className="hidden md:block text-sm text-text-primary">张先生</span>
                <i className="fas fa-chevron-down text-xs text-text-secondary"></i>
              </Link>
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
            <Link to="/home" className="flex items-center space-x-3 p-3 rounded-lg bg-accent text-white">
              <i className="fas fa-home text-lg"></i>
              {!isSidebarCollapsed && <span>首页</span>}
            </Link>
            <Link to="/personal-center?tab=plans" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-file-alt text-lg"></i>
              {!isSidebarCollapsed && <span>我的方案</span>}
            </Link>
            <Link to="/personal-center?tab=consultations" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-comments text-lg"></i>
              {!isSidebarCollapsed && <span>我的咨询</span>}
            </Link>
            <Link to="/personal-center?tab=favorites" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
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
                <h2 className="text-2xl font-bold text-text-primary mb-2">欢迎回来，张先生</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                </nav>
              </div>
              <div className="flex space-x-4">
                <button onClick={handleStartTestClick} className={`px-6 py-3 ${styles.glassButton} rounded-lg text-accent font-medium hover:bg-accent hover:text-white transition-all`}>
                  <i className="fas fa-stethoscope mr-2"></i>开始体质测试
                </button>
                <button onClick={handleAiConsultClick} className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all">
                  <i className="fas fa-robot mr-2"></i>智能咨询
                </button>
              </div>
            </div>
          </div>

          {/* 个性化推荐区 */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6">为您推荐</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 推荐方案卡片 */}
              <Link to="/plan?id=plan1" className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} block`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-prescription-bottle text-accent text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">阳虚体质调理方案</h4>
                    <p className="text-sm text-text-secondary">基于您的体质测试结果</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-4">针对您的体质特点，推荐温和滋补的调理方案，帮助改善畏寒怕冷等症状。</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star text-xs"></i>
                      <i className="fas fa-star text-xs"></i>
                      <i className="fas fa-star text-xs"></i>
                      <i className="fas fa-star text-xs"></i>
                      <i className="fas fa-star text-xs"></i>
                    </div>
                    <span className="text-xs text-text-secondary">4.8</span>
                  </div>
                  <span className="text-xs text-text-secondary">1,234人使用</span>
                </div>
              </Link>

              {/* 推荐滋补品卡片 */}
              <Link to="/knowledge-base?herb=herb1" className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} block`}>
                <div className="flex items-center mb-4">
                  <img src="https://s.coze.cn/image/FJ7X0SONVLo/" 
                       alt="长白山人参" className="w-12 h-12 rounded-lg mr-4" />
                  <div>
                    <h4 className="font-semibold text-text-primary">长白山人参</h4>
                    <p className="text-sm text-text-secondary">补气养血，增强体质</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-4">适合阳虚体质，能够有效改善气血不足、免疫力低下等问题。</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star text-xs"></i>
                      <i className="fas fa-star text-xs"></i>
                      <i className="fas fa-star text-xs"></i>
                      <i className="fas fa-star text-xs"></i>
                      <i className="fas fa-star text-xs"></i>
                    </div>
                    <span className="text-xs text-text-secondary">4.9</span>
                  </div>
                  <span className="text-xs text-text-secondary">892人收藏</span>
                </div>
              </Link>

              {/* 推荐科普内容卡片 */}
              <Link to="/content?id=content1" className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} block`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-book-open text-accent text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">冬季滋补指南</h4>
                    <p className="text-sm text-text-secondary">科普文章</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-4">了解冬季如何科学滋补，避免滋补不当带来的健康风险。</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-eye text-xs text-text-secondary"></i>
                    <span className="text-xs text-text-secondary">3,456阅读</span>
                  </div>
                  <span className="text-xs text-text-secondary">2天前</span>
                </div>
              </Link>
            </div>
          </section>

          {/* 热门内容区 */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6">热门内容</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 热门滋补方案 */}
              <div className={`${styles.glassCard} rounded-xl p-6`}>
                <h4 className="font-semibold text-text-primary mb-4">热门滋补方案</h4>
                <div className="space-y-4">
                  <Link to="/plan?id=plan2" className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg block`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-accent">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">平和体质保养方案</p>
                        <p className="text-xs text-text-secondary">适合大多数健康人群</p>
                      </div>
                    </div>
                    <span className="text-sm text-text-secondary">5,678人使用</span>
                  </Link>
                  <Link to="/plan?id=plan3" className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg block`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-accent">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">阴虚体质调理方案</p>
                        <p className="text-xs text-text-secondary">针对易上火人群</p>
                      </div>
                    </div>
                    <span className="text-sm text-text-secondary">4,321人使用</span>
                  </Link>
                  <Link to="/plan?id=plan4" className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg block`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-accent">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">痰湿体质改善方案</p>
                        <p className="text-xs text-text-secondary">帮助祛湿化痰</p>
                      </div>
                    </div>
                    <span className="text-sm text-text-secondary">3,890人使用</span>
                  </Link>
                </div>
              </div>

              {/* 热门滋补品 */}
              <div className={`${styles.glassCard} rounded-xl p-6`}>
                <h4 className="font-semibold text-text-primary mb-4">热门滋补品</h4>
                <div className="space-y-4">
                  <Link to="/knowledge-base?herb=herb2" className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg block`}>
                    <div className="flex items-center space-x-3">
                      <img src="https://s.coze.cn/image/t0p_DMwP1j8/" 
                           alt="宁夏枸杞" className="w-10 h-10 rounded-lg" />
                      <div>
                        <p className="font-medium text-text-primary">宁夏枸杞</p>
                        <p className="text-xs text-text-secondary">滋补肝肾，明目</p>
                      </div>
                    </div>
                    <span className="text-sm text-text-secondary">1,234收藏</span>
                  </Link>
                  <Link to="/knowledge-base?herb=herb3" className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg block`}>
                    <div className="flex items-center space-x-3">
                      <img src="https://s.coze.cn/image/C1irTxevZBA/" 
                           alt="内蒙古黄芪" className="w-10 h-10 rounded-lg" />
                      <div>
                        <p className="font-medium text-text-primary">内蒙古黄芪</p>
                        <p className="text-xs text-text-secondary">补气升阳，固表止汗</p>
                      </div>
                    </div>
                    <span className="text-sm text-text-secondary">987收藏</span>
                  </Link>
                  <Link to="/knowledge-base?herb=herb4" className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg block`}>
                    <div className="flex items-center space-x-3">
                      <img src="https://s.coze.cn/image/G3OPOeisSqY/" 
                           alt="甘肃当归" className="w-10 h-10 rounded-lg" />
                      <div>
                        <p className="font-medium text-text-primary">甘肃当归</p>
                        <p className="text-xs text-text-secondary">补血活血，调经止痛</p>
                      </div>
                    </div>
                    <span className="text-sm text-text-secondary">756收藏</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 用户评价展示区 */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6">用户评价</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`${styles.glassCard} rounded-xl p-6`}>
                <div className="flex items-center mb-4">
                  <img src="https://s.coze.cn/image/VGG5ldcslwk/" 
                       alt="李阿姨头像" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-medium text-text-primary">李阿姨</p>
                    <div className="flex text-yellow-400 text-xs">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">"体质测试很准，推荐的方案很适合我，用了一个月感觉精神好多了。"</p>
                <span className="text-xs text-text-secondary">3天前</span>
              </div>
              <div className={`${styles.glassCard} rounded-xl p-6`}>
                <div className="flex items-center mb-4">
                  <img src="https://s.coze.cn/image/NCRhx3uYYfw/" 
                       alt="王先生头像" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-medium text-text-primary">王先生</p>
                    <div className="flex text-yellow-400 text-xs">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">"智能咨询很方便，回答专业，解决了我多年的养生困惑。"</p>
                <span className="text-xs text-text-secondary">1周前</span>
              </div>
              <div className={`${styles.glassCard} rounded-xl p-6`}>
                <div className="flex items-center mb-4">
                  <img src="https://s.coze.cn/image/VqCsQx2OsK8/" 
                       alt="张奶奶头像" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-medium text-text-primary">张奶奶</p>
                    <div className="flex text-yellow-400 text-xs">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">"科普文章写得很通俗易懂，学到了很多养生知识。"</p>
                <span className="text-xs text-text-secondary">2周前</span>
              </div>
            </div>
          </section>
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
                <a href="#" onClick={handlePrivacyPolicyClick} className="text-sm text-text-secondary hover:text-accent transition-colors">隐私政策</a>
                <a href="#" onClick={handleTermsOfServiceClick} className="text-sm text-text-secondary hover:text-accent transition-colors">服务条款</a>
                <a href="#" onClick={handleContactUsClick} className="text-sm text-text-secondary hover:text-accent transition-colors">联系我们</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;

