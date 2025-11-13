
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { HerbData, CategoryData, ViewMode } from './types';

const KnowledgeBasePage: React.FC = () => {
  const navigate = useNavigate();
  const { avatar, nickname } = useContext(UserContext);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState('buqi');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedHerbId, setSelectedHerbId] = useState<string>('');
  const [globalSearchValue, setGlobalSearchValue] = useState('');

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '滋补品知识库 - 滋智通';
    return () => { document.title = originalTitle; };
  }, []);

  // 滋补品数据
  const herbData: Record<string, HerbData> = {
    'ren参': {
      name: '人参',
      pinyin: 'Renshen / Ginseng',
      category: '补气类',
      origin: '长白山、朝鲜半岛',
      season: '秋季',
      suitable: '气虚体弱、免疫力低下者',
      image: 'https://s.coze.cn/image/5QsBtVIy6xM/',
      efficacy: '大补元气，复脉固脱，补脾益肺，生津养血，安神益智。用于体虚欲脱，肢冷脉微，脾虚食少，肺虚喘咳，津伤口渴，内热消渴，气血亏虚，久病虚羸，惊悸失眠，阳痿宫冷。'
    },
    '黄芪': {
      name: '黄芪',
      pinyin: 'Huangqi / Astragalus',
      category: '补气类',
      origin: '内蒙古、山西、甘肃',
      season: '春秋季',
      suitable: '气虚乏力、易感冒者',
      image: 'https://s.coze.cn/image/cjPeCrt0odA/',
      efficacy: '补气升阳，固表止汗，利水消肿，生津养血，行滞通痹，托毒排脓，敛疮生肌。用于气虚乏力，食少便溏，中气下陷，久泻脱肛，便血崩漏，表虚自汗，气虚水肿，内热消渴，血虚萎黄，半身不遂，痹痛麻木，痈疽难溃，久溃不敛。'
    },
    '党参': {
      name: '党参',
      pinyin: 'Dangshen / Codonopsis',
      category: '补气类',
      origin: '山西、甘肃、陕西',
      season: '秋季',
      suitable: '脾胃虚弱、气血不足者',
      image: 'https://s.coze.cn/image/Quexa8l9d-o/',
      efficacy: '补中益气，健脾益肺。用于脾肺气虚，食少倦怠，咳嗽虚喘，气血不足，面色萎黄，心悸气短，津伤口渴，内热消渴。'
    },
    '太子参': {
      name: '太子参',
      pinyin: 'Taizishen / Pseudostellaria',
      category: '补气类',
      origin: '江苏、安徽、山东',
      season: '夏季',
      suitable: '气阴两虚、体质较弱者',
      image: 'https://s.coze.cn/image/KEnTkno0IBo/',
      efficacy: '益气生津，健脾养胃。用于脾虚体倦，食欲不振，病后虚弱，气阴不足，自汗口渴，肺燥干咳。'
    },
    '西洋参': {
      name: '西洋参',
      pinyin: 'Xiyangshen / American Ginseng',
      category: '补气类',
      origin: '美国、加拿大、中国东北',
      season: '秋季',
      suitable: '气阴两虚、易上火者',
      image: 'https://s.coze.cn/image/KxkT4A6xVAc/',
      efficacy: '补气养阴，清热生津。用于气虚阴亏，内热，咳喘痰血，虚热烦倦，消渴，口燥咽干。'
    },
    '白术': {
      name: '白术',
      pinyin: 'Baizhu / Atractylodes',
      category: '补气类',
      origin: '浙江、安徽、湖南',
      season: '冬季',
      suitable: '脾胃虚弱、湿气重者',
      image: 'https://s.coze.cn/image/pXzNKWBJ31w/',
      efficacy: '健脾益气，燥湿利水，止汗，安胎。用于脾虚食少，腹胀泄泻，痰饮眩悸，水肿，自汗，胎动不安。'
    }
  };

  // 分类数据
  const categoryData: Record<string, CategoryData> = {
    'buqi': { name: '补气类', count: 12 },
    'buxue': { name: '补血类', count: 8 },
    'buyang': { name: '补阳类', count: 10 },
    'buyin': { name: '补阴类', count: 15 },
    'jianpi': { name: '健脾类', count: 9 },
    'root': { name: '根茎类', count: 25 },
    'fruit': { name: '果实类', count: 18 },
    'animal': { name: '动物类', count: 6 },
    'mushroom': { name: '菌菇类', count: 12 },
    'youth': { name: '青年人群', count: 20 },
    'middle': { name: '中年人群', count: 28 },
    'elderly': { name: '老年人群', count: 32 },
    'women': { name: '女性人群', count: 24 },
    'men': { name: '男性人群', count: 26 }
  };

  // 处理侧边栏折叠
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // 处理分类切换
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setViewMode('list');
  };

  // 处理滋补品卡片点击
  const handleHerbCardClick = (herbId: string) => {
    setSelectedHerbId(herbId);
    setViewMode('detail');
  };

  // 处理返回列表
  const handleBackToList = () => {
    setViewMode('list');
  };

  // 处理全局搜索
  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = globalSearchValue.trim();
      if (keyword) {
        navigate(`/search-result?q=${encodeURIComponent(keyword)}`);
      }
    }
  };

  const selectedHerb = selectedHerbId ? herbData[selectedHerbId] : null;

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
            <Link to="/knowledge-base" className="text-accent font-medium border-b-2 border-accent py-1">知识库</Link>
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
            <button className={`relative p-2 ${styles.glassButton} rounded-lg`}>
              <i className="fas fa-bell text-text-secondary"></i>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button className={`flex items-center space-x-2 p-2 ${styles.glassButton} rounded-lg`}>
                <img src= {avatar} 
                     alt="用户头像" className="w-8 h-8 rounded-full" />
                <span className="hidden md:block text-sm text-text-primary">{nickname}</span>
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
          <button 
            onClick={handleSidebarToggle}
            className={`w-full mb-6 p-2 ${styles.glassButton} rounded-lg text-center`}
          >
            <i className="fas fa-bars text-text-secondary"></i>
          </button>
          
          {/* 分类导航 */}
          <div className="space-y-2">
            <div className="mb-4">
              <h3 className={`text-sm font-semibold text-text-secondary mb-2 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>按滋补功效分类</h3>
              <div className="space-y-1">
                <button 
                  onClick={() => handleCategoryChange('buqi')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'buqi' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-wind text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>补气类</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('buxue')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'buxue' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-heart text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>补血类</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('buyang')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'buyang' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-sun text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>补阳类</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('buyin')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'buyin' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-moon text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>补阴类</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('jianpi')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'jianpi' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-leaf text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>健脾类</span>
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className={`text-sm font-semibold text-text-secondary mb-2 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>按产品类型分类</h3>
              <div className="space-y-1">
                <button 
                  onClick={() => handleCategoryChange('root')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'root' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-seedling text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>根茎类</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('fruit')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'fruit' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-apple-alt text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>果实类</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('animal')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'animal' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-drumstick-bite text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>动物类</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('mushroom')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'mushroom' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-spa text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>菌菇类</span>
                </button>
              </div>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold text-text-secondary mb-2 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>按适用人群分类</h3>
              <div className="space-y-1">
                <button 
                  onClick={() => handleCategoryChange('youth')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'youth' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-running text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>青年人群</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('middle')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'middle' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-briefcase text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>中年人群</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('elderly')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'elderly' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-walking text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>老年人群</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('women')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'women' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-venus text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>女性人群</span>
                </button>
                <button 
                  onClick={() => handleCategoryChange('men')}
                  className={`w-full text-left p-3 rounded-lg transition-all ${activeCategory === 'men' ? styles.categoryActive : styles.categoryInactive}`}
                >
                  <i className="fas fa-mars text-lg mr-3"></i>
                  <span className={isSidebarCollapsed ? 'hidden' : 'inline-block'}>男性人群</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className={`${isSidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded} pt-16 min-h-screen transition-all duration-300`}>
        <div className="p-6">
          {/* 页面头部 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">滋补品知识库</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>滋补品知识库</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 滋补品列表视图 */}
          {viewMode === 'list' && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-text-primary">{categoryData[activeCategory].name}滋补品</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">共 <span>{categoryData[activeCategory].count}</span> 种滋补品</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* 滋补品卡片 */}
                <div 
                  onClick={() => handleHerbCardClick('ren参')}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="text-center mb-4">
                    <img src="https://s.coze.cn/image/eoAW0iCQib8/" 
                         alt="人参" className="w-20 h-20 rounded-lg mx-auto mb-3" />
                    <h4 className="font-semibold text-text-primary">人参</h4>
                    <p className="text-sm text-text-secondary">补气第一要药</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">主要功效：</span>
                      <span className="text-text-primary">大补元气，复脉固脱</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">适用人群：</span>
                      <span className="text-text-primary">气虚体弱</span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleHerbCardClick('黄芪')}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="text-center mb-4">
                    <img src="https://s.coze.cn/image/Kw1sHMCXQZk/" 
                         alt="黄芪" className="w-20 h-20 rounded-lg mx-auto mb-3" />
                    <h4 className="font-semibold text-text-primary">黄芪</h4>
                    <p className="text-sm text-text-secondary">补气升阳要药</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">主要功效：</span>
                      <span className="text-text-primary">补气升阳，固表止汗</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">适用人群：</span>
                      <span className="text-text-primary">气虚乏力</span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleHerbCardClick('党参')}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="text-center mb-4">
                    <img src="https://s.coze.cn/image/pRuctcG9VMI/" 
                         alt="党参" className="w-20 h-20 rounded-lg mx-auto mb-3" />
                    <h4 className="font-semibold text-text-primary">党参</h4>
                    <p className="text-sm text-text-secondary">补中益气良药</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">主要功效：</span>
                      <span className="text-text-primary">补中益气，健脾益肺</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">适用人群：</span>
                      <span className="text-text-primary">脾胃虚弱</span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleHerbCardClick('太子参')}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="text-center mb-4">
                    <img src="https://s.coze.cn/image/Bo10InXQ8Os/" 
                         alt="太子参" className="w-20 h-20 rounded-lg mx-auto mb-3" />
                    <h4 className="font-semibold text-text-primary">太子参</h4>
                    <p className="text-sm text-text-secondary">清补之品</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">主要功效：</span>
                      <span className="text-text-primary">益气生津，健脾养胃</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">适用人群：</span>
                      <span className="text-text-primary">气阴两虚</span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleHerbCardClick('西洋参')}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="text-center mb-4">
                    <img src="https://s.coze.cn/image/_iT2ptTjWtY/" 
                         alt="西洋参" className="w-20 h-20 rounded-lg mx-auto mb-3" />
                    <h4 className="font-semibold text-text-primary">西洋参</h4>
                    <p className="text-sm text-text-secondary">补气养阴佳品</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">主要功效：</span>
                      <span className="text-text-primary">补气养阴，清热生津</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">适用人群：</span>
                      <span className="text-text-primary">气阴两虚</span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleHerbCardClick('白术')}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="text-center mb-4">
                    <img src="https://s.coze.cn/image/b851OoX-Dqs/" 
                         alt="白术" className="w-20 h-20 rounded-lg mx-auto mb-3" />
                    <h4 className="font-semibold text-text-primary">白术</h4>
                    <p className="text-sm text-text-secondary">健脾燥湿要药</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">主要功效：</span>
                      <span className="text-text-primary">健脾益气，燥湿利水</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">适用人群：</span>
                      <span className="text-text-primary">脾胃虚弱</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 滋补品详情视图 */}
          {viewMode === 'detail' && selectedHerb && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleBackToList}
                    className={`p-2 ${styles.glassButton} rounded-lg`}
                  >
                    <i className="fas fa-arrow-left text-text-secondary"></i>
                  </button>
                  <h3 className="text-xl font-semibold text-text-primary">滋补品详情</h3>
                </div>
              </div>
              
              <div className={`${styles.glassCard} rounded-xl p-8`}>
                {/* 滋补品基本信息 */}
                <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 mb-8">
                  <div className="text-center lg:text-left">
                    <img 
                      src={selectedHerb.image}
                      alt={selectedHerb.name} 
                      className="w-32 h-32 rounded-lg mx-auto lg:mx-0 mb-4" 
                    />
                    <div className="flex items-center justify-center lg:justify-start space-x-4">
                      <div className="flex text-yellow-400">
                        <i className="fas fa-star text-sm"></i>
                        <i className="fas fa-star text-sm"></i>
                        <i className="fas fa-star text-sm"></i>
                        <i className="fas fa-star text-sm"></i>
                        <i className="fas fa-star text-sm"></i>
                      </div>
                      <span className="text-sm text-text-secondary">4.9</span>
                    </div>
                    <span className="text-sm text-text-secondary">1,234人收藏</span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-text-primary mb-2">{selectedHerb.name}</h4>
                    <p className="text-lg text-text-secondary mb-4">{selectedHerb.pinyin}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-tag text-accent"></i>
                        <span className="text-sm text-text-secondary">分类：</span>
                        <span className="text-sm text-text-primary">{selectedHerb.category}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-map-marker-alt text-accent"></i>
                        <span className="text-sm text-text-secondary">产地：</span>
                        <span className="text-sm text-text-primary">{selectedHerb.origin}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-calendar-alt text-accent"></i>
                        <span className="text-sm text-text-secondary">采收季节：</span>
                        <span className="text-sm text-text-primary">{selectedHerb.season}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-users text-accent"></i>
                        <span className="text-sm text-text-secondary">适用人群：</span>
                        <span className="text-sm text-text-primary">{selectedHerb.suitable}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 滋补品详细信息 */}
                <div className="space-y-8">
                  {/* 功效主治 */}
                  <div>
                    <h5 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <i className="fas fa-heartbeat text-accent mr-2"></i>功效主治
                    </h5>
                    <div className={`${styles.glassEffect} rounded-lg p-4`}>
                      <p className="text-text-primary leading-relaxed">
                        {selectedHerb.efficacy}
                      </p>
                    </div>
                  </div>

                  {/* 食用方法 */}
                  <div>
                    <h5 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <i className="fas fa-utensils text-accent mr-2"></i>食用方法
                    </h5>
                    <div className={`${styles.glassEffect} rounded-lg p-4`}>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-circle text-accent text-xs mt-2"></i>
                          <div>
                            <span className="font-medium text-text-primary">泡水饮用：</span>
                            <span className="text-text-secondary">取3-5片人参片，用开水冲泡，闷盖5-10分钟后饮用，可反复冲泡2-3次。</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-circle text-accent text-xs mt-2"></i>
                          <div>
                            <span className="font-medium text-text-primary">炖汤服用：</span>
                            <span className="text-text-secondary">与鸡肉、排骨等食材一起炖汤，每次用量10-15克。</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <i className="fas fa-circle text-accent text-xs mt-2"></i>
                          <div>
                            <span className="font-medium text-text-primary">研粉冲服：</span>
                            <span className="text-text-secondary">将人参研成细粉，每次1-2克，用温水冲服，每日2次。</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 禁忌人群 */}
                  <div>
                    <h5 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <i className="fas fa-exclamation-triangle text-accent mr-2"></i>禁忌人群
                    </h5>
                    <div className={`${styles.glassEffect} rounded-lg p-4`}>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <i className="fas fa-times-circle text-red-500"></i>
                          <span className="text-text-secondary">实热证、湿热证及正气不虚者忌服</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <i className="fas fa-times-circle text-red-500"></i>
                          <span className="text-text-secondary">高血压、高血脂患者慎用</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <i className="fas fa-times-circle text-red-500"></i>
                          <span className="text-text-secondary">孕妇、哺乳期妇女应在医生指导下使用</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <i className="fas fa-times-circle text-red-500"></i>
                          <span className="text-text-secondary">不宜与藜芦、五灵脂同用</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 配伍建议 */}
                  <div>
                    <h5 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <i className="fas fa-handshake text-accent mr-2"></i>配伍建议
                    </h5>
                    <div className={`${styles.glassEffect} rounded-lg p-4`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-text-primary mb-2">最佳配伍</h6>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <i className="fas fa-check-circle text-green-500"></i>
                              <span className="text-text-secondary">人参 + 黄芪：增强补气效果</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <i className="fas fa-check-circle text-green-500"></i>
                              <span className="text-text-secondary">人参 + 当归：气血双补</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <i className="fas fa-check-circle text-green-500"></i>
                              <span className="text-text-secondary">人参 + 麦冬：气阴双补</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h6 className="font-medium text-text-primary mb-2">配伍禁忌</h6>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <i className="fas fa-times-circle text-red-500"></i>
                              <span className="text-text-secondary">人参 + 藜芦：产生毒性</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <i className="fas fa-times-circle text-red-500"></i>
                              <span className="text-text-secondary">人参 + 五灵脂：降低药效</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 专家问答 */}
                  <div>
                    <h5 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <i className="fas fa-question-circle text-accent mr-2"></i>专家问答
                    </h5>
                    <div className="space-y-4">
                      <div className={`${styles.glassEffect} rounded-lg p-4`}>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-user-md text-white text-sm"></i>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-text-primary mb-2">李教授，人参适合每天服用吗？</p>
                            <p className="text-text-secondary text-sm">人参是滋补良药，但不宜长期连续服用。建议服用7-10天后停服3-5天，让身体有时间代谢和吸收。具体用量应根据个人体质和医生建议调整。</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`${styles.glassEffect} rounded-lg p-4`}>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-user-md text-white text-sm"></i>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-text-primary mb-2">年轻人可以吃人参吗？</p>
                            <p className="text-text-secondary text-sm">年轻人如果体质虚弱、经常疲劳，也可以适量服用人参。但体质健壮、容易上火的年轻人则不宜过多服用，以免引起不适。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 相关滋补品推荐 */}
          {viewMode === 'detail' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text-primary mb-6">相关滋补品推荐</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  onClick={() => handleHerbCardClick('党参')}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="flex items-center mb-4">
                    <img src="https://s.coze.cn/image/eLxmtcEr80M/" 
                         alt="党参" className="w-12 h-12 rounded-lg mr-4" />
                    <div>
                      <h4 className="font-semibold text-text-primary">党参</h4>
                      <p className="text-sm text-text-secondary">补中益气良药</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">与人参功效相似但药性更温和，适合长期调理。</p>
                </div>
                
                <div 
                  onClick={() => handleHerbCardClick('黄芪')}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="flex items-center mb-4">
                    <img src="https://s.coze.cn/image/HZ22jj7Y5qA/" 
                         alt="黄芪" className="w-12 h-12 rounded-lg mr-4" />
                    <div>
                      <h4 className="font-semibold text-text-primary">黄芪</h4>
                      <p className="text-sm text-text-secondary">补气升阳要药</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">擅长补气升阳，固表止汗，常与人参配伍使用。</p>
                </div>
                
                <div 
                  onClick={() => handleHerbCardClick('西洋参')}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="flex items-center mb-4">
                    <img src="https://s.coze.cn/image/SI6MGzcEdrA/" 
                         alt="西洋参" className="w-12 h-12 rounded-lg mr-4" />
                    <div>
                      <h4 className="font-semibold text-text-primary">西洋参</h4>
                      <p className="text-sm text-text-secondary">补气养阴佳品</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">补气养阴，清热生津，适合气阴两虚且有热象者。</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部区域 */}
        <footer className={`${styles.glassEffect} py-6 mt-12`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-text-secondary">© 2025 滋智通. 保留所有权利.</p>
                <p className="text-xs text-text-secondary mt-1">粤ICP备12345678号-1</p>
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

export default KnowledgeBasePage;

