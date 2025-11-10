

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';

interface SearchResult {
  id: string;
  type: 'herb' | 'content' | 'plan';
  title: string;
  description: string;
  image?: string;
  category: string;
  categoryColor: string;
  views?: string;
 收藏?: string;
  date?: string;
  users?: string;
  rating: number;
  relevance: string;
}

const SearchResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('人参');
  const [globalSearchValue, setGlobalSearchValue] = useState('');

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '搜索结果 - 滋智通';
    return () => { document.title = originalTitle; };
  }, []);

  // 获取URL参数
  useEffect(() => {
    const keyword = searchParams.get('q') || searchParams.get('keyword') || '人参';
    setSearchKeyword(keyword);
    setGlobalSearchValue(keyword);
  }, [searchParams]);

  // 模拟搜索结果数据
  const searchResults: SearchResult[] = [
    {
      id: '1',
      type: 'herb',
      title: '长白山人参',
      description: '补气养血，增强体质。适合气血不足、免疫力低下的人群。人参是传统名贵滋补品，具有极高的药用价值。',
      image: 'https://s.coze.cn/image/zJxlsR7kORg/',
      category: '滋补品',
      categoryColor: 'bg-secondary text-accent',
      views: '1,234 浏览',
      收藏: '892 收藏',
      rating: 4.9,
      relevance: '95%'
    },
    {
      id: '1',
      type: 'content',
      title: '如何正确食用人参',
      description: '详细介绍人参的正确食用方法、用量和注意事项，帮助您科学滋补，避免误区。',
      category: '科普文章',
      categoryColor: 'bg-green-100 text-green-700',
      views: '3,456 阅读',
      date: '2天前',
      rating: 4.6,
      relevance: '88%'
    },
    {
      id: '1',
      type: 'plan',
      title: '气血双补调理方案（含人参）',
      description: '针对气血不足体质的综合调理方案，包含人参、当归等滋补品的科学搭配。',
      category: '个性化方案',
      categoryColor: 'bg-blue-100 text-blue-700',
      users: '1,234 人使用',
      date: '1周前更新',
      rating: 4.8,
      relevance: '82%'
    },
    {
      id: '2',
      type: 'herb',
      title: '西洋参（花旗参）',
      description: '补气养阴，清热生津。与人参相比，西洋参性凉，适合夏季滋补或体质偏热者。',
      image: 'https://s.coze.cn/image/x8k7baGQjs8/',
      category: '滋补品',
      categoryColor: 'bg-secondary text-accent',
      views: '987 浏览',
      收藏: '654 收藏',
      rating: 4.7,
      relevance: '78%'
    }
  ];

  const tabCounts = {
    all: 23,
    herbs: 8,
    content: 12,
    plans: 3
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleGlobalSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = (e.target as HTMLInputElement).value.trim();
      if (keyword) {
        navigate(`/search-result?q=${encodeURIComponent(keyword)}`);
      }
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleResultClick = (result: SearchResult) => {
    switch(result.type) {
      case 'herb':
        navigate(`/knowledge-base?herb=${result.id}`);
        break;
      case 'content':
        navigate(`/content?id=${result.id}`);
        break;
      case 'plan':
        navigate(`/plan?id=${result.id}`);
        break;
      default:
        console.log('未知类型:', result.type);
    }
  };

  const highlightKeyword = (text: string, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span class="' + styles.highlight + '">$1</span>');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={i <= rating ? 'fas fa-star' : 'far fa-star'}></i>
      );
    }
    return stars;
  };

  const getFilteredResults = () => {
    if (activeTab === 'all') return searchResults;
    if (activeTab === 'herbs') return searchResults.filter(r => r.type === 'herb');
    if (activeTab === 'content') return searchResults.filter(r => r.type === 'content');
    if (activeTab === 'plans') return searchResults.filter(r => r.type === 'plan');
    return searchResults;
  };

  const renderResultIcon = (result: SearchResult) => {
    if (result.image) {
      return (
        <img 
          src={result.image} 
          alt={result.title} 
          className="w-16 h-16 rounded-lg object-cover"
        />
      );
    }
    
    if (result.type === 'content') {
      return (
        <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
          <i className="fas fa-book-open text-accent text-xl"></i>
        </div>
      );
    }
    
    if (result.type === 'plan') {
      return (
        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
          <i className="fas fa-file-alt text-blue-600 text-xl"></i>
        </div>
      );
    }
    
    return (
      <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
        <i className="fas fa-seedling text-accent text-xl"></i>
      </div>
    );
  };

  const renderResultStats = (result: SearchResult) => {
    return (
      <div className="flex items-center space-x-4 text-xs text-text-secondary">
        {result.views && (
          <span><i className="fas fa-eye mr-1"></i>{result.views}</span>
        )}
        {result.收藏 && (
          <span><i className="fas fa-heart mr-1"></i>{result.收藏}</span>
        )}
        {result.date && (
          <span><i className="fas fa-calendar mr-1"></i>{result.date}</span>
        )}
        {result.users && (
          <span><i className="fas fa-users mr-1"></i>{result.users}</span>
        )}
      </div>
    );
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
                onKeyPress={handleGlobalSearch}
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
                <img 
                  src="https://s.coze.cn/image/vEBCHSp-N38/" 
                  alt="用户头像" 
                  className="w-8 h-8 rounded-full"
                />
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
          <button 
            onClick={handleSidebarToggle}
            className={`w-full mb-6 p-2 ${styles.glassButton} rounded-lg text-center`}
          >
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
                <h2 className="text-2xl font-bold text-text-primary mb-2">搜索结果</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>搜索结果</span>
                </nav>
                <p className="text-sm text-text-secondary mt-2">
                  为 "<span className={styles.highlight}>{searchKeyword}</span>" 找到 
                  <span className="font-semibold text-accent"> {tabCounts[activeTab as keyof typeof tabCounts]}</span> 个结果
                </p>
              </div>
            </div>
          </div>

          {/* 结果分类Tab */}
          <div className="flex space-x-4 mb-6" role="tablist">
            <button 
              onClick={() => handleTabClick('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none ${activeTab === 'all' ? styles.tabActive : styles.tabInactive}`}
              role="tab"
            >
              全部 <span className="ml-1">({tabCounts.all})</span>
            </button>
            <button 
              onClick={() => handleTabClick('herbs')}
              className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none ${activeTab === 'herbs' ? styles.tabActive : styles.tabInactive}`}
              role="tab"
            >
              滋补品 <span className="ml-1">({tabCounts.herbs})</span>
            </button>
            <button 
              onClick={() => handleTabClick('content')}
              className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none ${activeTab === 'content' ? styles.tabActive : styles.tabInactive}`}
              role="tab"
            >
              科普文章 <span className="ml-1">({tabCounts.content})</span>
            </button>
            <button 
              onClick={() => handleTabClick('plans')}
              className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none ${activeTab === 'plans' ? styles.tabActive : styles.tabInactive}`}
              role="tab"
            >
              方案 <span className="ml-1">({tabCounts.plans})</span>
            </button>
          </div>

          {/* 搜索结果内容 */}
          <div className="mb-8">
            <div className="space-y-4">
              {getFilteredResults().map((result) => (
                <div 
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="flex items-start space-x-4">
                    {renderResultIcon(result)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 
                          className="text-lg font-semibold text-text-primary"
                          dangerouslySetInnerHTML={{ __html: highlightKeyword(result.title, searchKeyword) }}
                        />
                        <span className={`px-2 py-1 ${result.categoryColor} text-xs rounded-full`}>
                          {result.category}
                        </span>
                      </div>
                      <p 
                        className="text-sm text-text-secondary mb-3"
                        dangerouslySetInnerHTML={{ __html: highlightKeyword(result.description, searchKeyword) }}
                      />
                      <div className="flex items-center justify-between">
                        {renderResultStats(result)}
                        <div className="flex items-center space-x-2">
                          <div className="flex text-yellow-400 text-xs">
                            {renderStars(result.rating)}
                          </div>
                          <span className="text-xs text-text-secondary">{result.rating}</span>
                          {result.relevance && (
                            <span className="text-xs text-accent font-medium">相关度: {result.relevance}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 分页控件 */}
          <div className="flex items-center justify-center space-x-2">
            <button 
              className={`px-3 py-2 ${styles.glassButton} rounded-lg text-sm text-text-secondary`} 
              disabled
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="px-3 py-2 bg-accent text-white rounded-lg text-sm">1</button>
            <button className={`px-3 py-2 ${styles.glassButton} rounded-lg text-sm text-text-secondary`}>2</button>
            <button className={`px-3 py-2 ${styles.glassButton} rounded-lg text-sm text-text-secondary`}>3</button>
            <span className="px-3 py-2 text-sm text-text-secondary">...</span>
            <button className={`px-3 py-2 ${styles.glassButton} rounded-lg text-sm text-text-secondary`}>8</button>
            <button className={`px-3 py-2 ${styles.glassButton} rounded-lg text-sm text-text-secondary`}>
              <i className="fas fa-chevron-right"></i>
            </button>
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

export default SearchResultPage;

