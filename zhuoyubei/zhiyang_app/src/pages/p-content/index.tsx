
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  views: string;
  date: string;
  tag: string;
  rating: number;
  duration?: string;
  expert?: string;
  comments?: string;
}

type TabType = 'articles' | 'videos' | 'qa' | 'topics';
type ContentType = 'article' | 'video' | 'qa' | 'topic';

const ContentPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('articles');
  const [showContentDetail, setShowContentDetail] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '养生科普 - 滋智通';
    return () => { document.title = originalTitle; };
  }, []);

  // 模拟数据
  const articlesData: ContentItem[] = [
    {
      id: 'article1',
      title: '冬季滋补指南：如何科学进补不伤身',
      description: '冬季是滋补的黄金时节，但很多人不知道如何正确进补。本文将从中医理论出发，为您详细介绍冬季滋补的原则、适合的食材以及注意事项...',
      image: 'https://s.coze.cn/image/DYobKgPQsKE/',
      category: '食物',
      views: '3,456阅读',
      date: '2024-01-15',
      tag: '冬季养生',
      rating: 4.8
    },
    {
      id: 'article2',
      title: '人参的正确食用方法与禁忌',
      description: '人参是名贵的滋补品，但并不是所有人都适合食用。了解人参的种类、功效、正确食用方法以及禁忌人群，才能更好地发挥其滋补作用...',
      image: 'https://s.coze.cn/image/bbcrzv3Ovrc/',
      category: '食物',
      views: '2,890阅读',
      date: '2024-01-12',
      tag: '人参',
      rating: 4.6
    },
    {
      id: 'article3',
      title: '中医体质辨识：了解自己的体质类型',
      description: '中医将人的体质分为平和质、阳虚质、阴虚质等多种类型。了解自己的体质类型，才能选择适合的滋补方法和食材...',
      image: 'https://s.coze.cn/image/d5N93BJRxcw/',
      category: '人物',
      views: '4,123阅读',
      date: '2024-01-10',
      tag: '体质辨识',
      rating: 4.9
    }
  ];

  const videosData: ContentItem[] = [
    {
      id: 'video1',
      title: '枸杞的功效与食用方法详解',
      description: '通过视频详细了解枸杞的营养价值、不同食用方法的效果差异，以及适合的人群和食用禁忌...',
      image: 'https://s.coze.cn/image/LKHjbsyk6VY/',
      category: '食物',
      views: '1,234播放',
      date: '2024-01-14',
      tag: '枸杞',
      rating: 4.7,
      duration: '8:32'
    },
    {
      id: 'video2',
      title: '黄芪补气的正确用法',
      description: '专家讲解黄芪的补气功效，适合的体质类型，以及不同的炮制方法对药效的影响...',
      image: 'https://s.coze.cn/image/BOe_8J-MA0c/',
      category: '食物',
      views: '987播放',
      date: '2024-01-11',
      tag: '黄芪',
      rating: 4.5,
      duration: '12:15'
    }
  ];

  const qaData: ContentItem[] = [
    {
      id: 'qa1',
      title: '高血压患者可以吃人参吗？',
      description: '专家解答：高血压患者是否适合食用人参，需要根据具体情况判断。一般来说，血压控制稳定的患者可以少量食用...',
      category: '问答',
      views: '1,567阅读',
      date: '2024-01-13',
      tag: '高血压',
      rating: 4.8,
      expert: '张教授'
    },
    {
      id: 'qa2',
      title: '女性更年期适合哪些滋补品？',
      description: '专家解答：更年期女性可以适当食用一些滋阴补肾的滋补品，如枸杞、百合、莲子等，有助于缓解更年期症状...',
      category: '问答',
      views: '2,345阅读',
      date: '2024-01-09',
      tag: '更年期',
      rating: 4.6,
      expert: '李医生'
    }
  ];

  const topicsData: ContentItem[] = [
    {
      id: 'topic1',
      title: '春季养肝正当时',
      description: '春季是养肝的最佳时节，了解养肝的重要性、方法和适合的食材，让肝脏更健康...',
      category: '话题',
      views: '5,678阅读',
      date: '2024-01-16',
      tag: '养肝',
      rating: 4.9,
      comments: '123讨论'
    },
    {
      id: 'topic2',
      title: '夏季防暑降温小贴士',
      description: '夏季高温如何防暑降温，了解科学的降温方法和适合的清热解暑食材...',
      category: '话题',
      views: '4,123阅读',
      date: '2024-01-14',
      tag: '防暑',
      rating: 4.7,
      comments: '89讨论'
    }
  ];

  const relatedData: ContentItem[] = [
    {
      id: 'related1',
      title: '春季养生食谱推荐',
      description: '适合春季的养肝食谱，营养美味又健康',
      category: '推荐',
      views: '1,234阅读',
      date: '2天前',
      tag: '食谱',
      rating: 4.7
    },
    {
      id: 'related2',
      title: '如何判断自己的体质类型',
      description: '中医体质辨识的简单方法',
      category: '推荐',
      views: '2,456阅读',
      date: '3天前',
      tag: '体质',
      rating: 4.8
    },
    {
      id: 'related3',
      title: '枸杞的正确保存方法',
      description: '延长枸杞保质期的小窍门',
      category: '推荐',
      views: '890阅读',
      date: '1周前',
      tag: '保存',
      rating: 4.6
    }
  ];

  const getCurrentData = (): ContentItem[] => {
    switch (activeTab) {
      case 'articles':
        return articlesData;
      case 'videos':
        return videosData;
      case 'qa':
        return qaData;
      case 'topics':
        return topicsData;
      default:
        return articlesData;
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = (e.target as HTMLInputElement).value.trim();
      if (keyword) {
        navigate(`/search-result?q=${encodeURIComponent(keyword)}`);
      }
    }
  };

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setShowContentDetail(false);
    setSelectedContent(null);
  };

  const handleContentClick = (content: ContentItem) => {
    setSelectedContent(content);
    setShowContentDetail(true);
  };

  const getContentType = (contentId: string): ContentType => {
    if (contentId.startsWith('article')) return 'article';
    if (contentId.startsWith('video')) return 'video';
    if (contentId.startsWith('qa')) return 'qa';
    if (contentId.startsWith('topic')) return 'topic';
    return 'article';
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`${i <= rating ? 'fas' : 'far'} fa-star text-xs`}
        />
      );
    }
    return stars;
  };

  const renderContentList = () => {
    const currentData = getCurrentData();
    
    return (
      <div className="space-y-4">
        {currentData.map((item) => (
          <div 
            key={item.id}
            className={`${styles.glassCard} rounded-xl p-6 ${styles.contentListItem} cursor-pointer`}
            onClick={() => handleContentClick(item)}
          >
            <div className="flex items-start space-x-4">
              {activeTab === 'articles' || activeTab === 'videos' ? (
                <div className={activeTab === 'videos' ? 'relative' : ''}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-16 rounded-lg object-cover"
                  />
                  {activeTab === 'videos' && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <i className="fas fa-play text-white text-lg"></i>
                    </div>
                  )}
                </div>
              ) : activeTab === 'qa' ? (
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <i className="fas fa-user-md text-accent text-lg"></i>
                </div>
              ) : (
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-fire text-red-500 text-lg"></i>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span>
                      <i className={`fas ${activeTab === 'videos' ? 'fa-play' : 'fa-eye'} mr-1`}></i>
                      {item.views}
                    </span>
                    <span><i className="fas fa-calendar mr-1"></i>{item.date}</span>
                    <span><i className={`fas ${activeTab === 'qa' ? 'fa-user-md' : activeTab === 'topics' ? 'fa-comments' : 'fa-tag'} mr-1`}></i>
                      {activeTab === 'qa' ? item.expert : activeTab === 'topics' ? item.comments : item.tag}
                    </span>
                    {activeTab === 'videos' && (
                      <span><i className="fas fa-clock mr-1"></i>{item.duration}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      {renderStars(item.rating)}
                    </div>
                    <span className="text-xs text-text-secondary">{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContentDetail = () => {
    if (!selectedContent) return null;

    const contentType = getContentType(selectedContent.id);

    return (
      <div className={`${styles.glassCard} rounded-xl p-8`}>
        {contentType === 'article' && (
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-6">{selectedContent.title}</h1>
            <div className="flex items-center space-x-6 text-sm text-text-secondary mb-6">
              <span><i className="fas fa-calendar mr-2"></i>{selectedContent.date}</span>
              <span><i className="fas fa-eye mr-2"></i>{selectedContent.views}</span>
              <span><i className="fas fa-tag mr-2"></i>{selectedContent.tag}</span>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {renderStars(selectedContent.rating)}
                </div>
                <span>{selectedContent.rating}</span>
              </div>
            </div>
            
            <div className="prose prose-lg text-text-primary max-w-none">
              <p className="mb-6">冬季是一年中最适合滋补的季节。根据中医理论，冬季对应肾脏，是养肾藏精的最佳时机。科学的冬季滋补不仅能够增强体质，还能为来年的健康打下坚实基础。</p>
              
              <h2 className="text-2xl font-bold mb-4">冬季滋补的基本原则</h2>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>以温补为主，避免过度燥热</li>
                <li>根据个人体质选择适合的滋补品</li>
                <li>循序渐进，不可急于求成</li>
                <li>注意脾胃功能，避免消化不良</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">适合冬季的滋补食材</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`${styles.glassEffect} rounded-lg p-4`}>
                  <h3 className="font-semibold mb-2">温补类</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• 羊肉：温中补虚，补肾壮阳</li>
                    <li>• 牛肉：补脾胃，益气血</li>
                    <li>• 鸡肉：温中益气，补精填髓</li>
                  </ul>
                </div>
                <div className={`${styles.glassEffect} rounded-lg p-4`}>
                  <h3 className="font-semibold mb-2">滋补药材</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• 人参：大补元气，复脉固脱</li>
                    <li>• 黄芪：补气升阳，固表止汗</li>
                    <li>• 枸杞：滋补肝肾，益精明目</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">冬季滋补注意事项</h2>
              <div className={`${styles.glassEffect} rounded-lg p-6 mb-6`}>
                <h3 className="font-semibold mb-3">禁忌人群</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>体质燥热者不宜过度温补</li>
                  <li>感冒发热期间不宜滋补</li>
                  <li>高血压、高血脂患者应在医生指导下进行</li>
                  <li>孕妇及哺乳期妇女需谨慎选择</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {contentType === 'video' && (
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-6">{selectedContent.title}</h1>
            <div className="flex items-center space-x-6 text-sm text-text-secondary mb-6">
              <span><i className="fas fa-calendar mr-2"></i>{selectedContent.date}</span>
              <span><i className="fas fa-play mr-2"></i>{selectedContent.views}</span>
              <span><i className="fas fa-tag mr-2"></i>{selectedContent.tag}</span>
              <span><i className="fas fa-clock mr-2"></i>{selectedContent.duration}</span>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {renderStars(selectedContent.rating)}
                </div>
                <span>{selectedContent.rating}</span>
              </div>
            </div>
            
            <div className={`${styles.videoContainer} mb-6`}>
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
            
            <div className="prose prose-lg text-text-primary max-w-none">
              <p className="mb-6">本视频详细介绍了枸杞的营养价值、不同食用方法的效果差异，以及适合的人群和食用禁忌。通过专家的讲解，让您全面了解枸杞这一传统滋补品。</p>
            </div>
          </div>
        )}

        {contentType === 'qa' && (
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-6">{selectedContent.title}</h1>
            <div className="flex items-center space-x-6 text-sm text-text-secondary mb-6">
              <span><i className="fas fa-calendar mr-2"></i>{selectedContent.date}</span>
              <span><i className="fas fa-eye mr-2"></i>{selectedContent.views}</span>
              <span><i className="fas fa-user-md mr-2"></i>{selectedContent.expert} 主任医师</span>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {renderStars(selectedContent.rating)}
                </div>
                <span>{selectedContent.rating}</span>
              </div>
            </div>
            
            <div className="prose prose-lg text-text-primary max-w-none">
              <div className={`${styles.glassEffect} rounded-lg p-6 mb-6`}>
                <h3 className="font-semibold mb-3 text-accent">专家解答：</h3>
                <p className="mb-4">高血压患者是否适合食用人参，需要根据具体情况判断。一般来说，血压控制稳定的患者可以少量食用，但需要注意以下几点：</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>选择红参、高丽参等温补型人参时要格外谨慎</li>
                  <li>建议选择西洋参等性质较为平和的参类</li>
                  <li>食用前最好咨询专业医师的意见</li>
                  <li>密切监测血压变化，如有异常立即停止食用</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {contentType === 'topic' && (
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-6">{selectedContent.title}</h1>
            <div className="flex items-center space-x-6 text-sm text-text-secondary mb-6">
              <span><i className="fas fa-calendar mr-2"></i>{selectedContent.date}</span>
              <span><i className="fas fa-eye mr-2"></i>{selectedContent.views}</span>
              <span><i className="fas fa-comments mr-2"></i>{selectedContent.comments}</span>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {renderStars(selectedContent.rating)}
                </div>
                <span>{selectedContent.rating}</span>
              </div>
            </div>
            
            <div className="prose prose-lg text-text-primary max-w-none">
              <p className="mb-6">春季是养肝的最佳时节。中医认为，春季对应肝脏，此时肝气旺盛，是调理肝脏功能的好时机。</p>
              
              <h2 className="text-2xl font-bold mb-4">养肝的重要性</h2>
              <p className="mb-6">肝脏是人体最大的解毒器官，具有代谢、解毒、合成等重要功能。春季养肝有助于改善肝功能，提高免疫力。</p>
              
              <h2 className="text-2xl font-bold mb-4">春季养肝方法</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className={`${styles.glassEffect} rounded-lg p-4 text-center`}>
                  <i className="fas fa-leaf text-3xl text-accent mb-3"></i>
                  <h3 className="font-semibold mb-2">饮食调理</h3>
                  <p className="text-sm">多吃绿色蔬菜，如菠菜、芹菜、韭菜等</p>
                </div>
                <div className={`${styles.glassEffect} rounded-lg p-4 text-center`}>
                  <i className="fas fa-running text-3xl text-accent mb-3"></i>
                  <h3 className="font-semibold mb-2">运动锻炼</h3>
                  <p className="text-sm">适当进行有氧运动，如散步、慢跑、太极拳</p>
                </div>
                <div className={`${styles.glassEffect} rounded-lg p-4 text-center`}>
                  <i className="fas fa-moon text-3xl text-accent mb-3"></i>
                  <h3 className="font-semibold mb-2">作息调整</h3>
                  <p className="text-sm">保证充足睡眠，避免熬夜</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 相关内容推荐 */}
        <div className="mt-8 pt-8 border-t border-white border-opacity-20">
          <h3 className="text-xl font-semibold text-text-primary mb-6">相关推荐</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedData.map((item) => (
              <div 
                key={item.id}
                className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                onClick={() => handleContentClick(item)}
              >
                <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
                <p className="text-sm text-text-secondary mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{item.date}</span>
                  <span className="text-xs text-text-secondary">{item.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                className={`w-64 px-4 py-2 pl-10 ${styles.glassEffect} rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent`}
                onKeyPress={handleSearchKeyPress}
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
                  src="https://s.coze.cn/image/1Q2pSiCCiOQ/" 
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
            className={`w-full mb-6 p-2 ${styles.glassButton} rounded-lg text-center`}
            onClick={handleSidebarToggle}
          >
            <i className="fas fa-bars text-text-secondary"></i>
          </button>
          
          {/* 菜单项 */}
          <nav className="space-y-2">
            <Link 
              to="/home" 
              className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all"
            >
              <i className="fas fa-home text-lg"></i>
              {!isSidebarCollapsed && <span>首页</span>}
            </Link>
            <Link 
              to="/plan" 
              className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all"
            >
              <i className="fas fa-file-alt text-lg"></i>
              {!isSidebarCollapsed && <span>我的方案</span>}
            </Link>
            <Link 
              to="/ai-consult" 
              className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all"
            >
              <i className="fas fa-comments text-lg"></i>
              {!isSidebarCollapsed && <span>我的咨询</span>}
            </Link>
            <Link 
              to="/personal-center" 
              className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all"
            >
              <i className="fas fa-heart text-lg"></i>
              {!isSidebarCollapsed && <span>我的收藏</span>}
            </Link>
            <Link 
              to="/physical-test" 
              className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all"
            >
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
                <h2 className="text-2xl font-bold text-text-primary mb-2">养生科普</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>养生科普</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 科普内容分类导航 */}
          <div className="mb-8">
            <div className="flex space-x-4" role="tablist">
              <button 
                className={`px-6 py-3 text-sm font-medium rounded-lg focus:outline-none ${activeTab === 'articles' ? styles.tabActive : styles.tabInactive}`}
                role="tab" 
                onClick={() => handleTabClick('articles')}
              >
                <i className="fas fa-newspaper mr-2"></i>文章
              </button>
              <button 
                className={`px-6 py-3 text-sm font-medium rounded-lg focus:outline-none ${activeTab === 'videos' ? styles.tabActive : styles.tabInactive}`}
                role="tab" 
                onClick={() => handleTabClick('videos')}
              >
                <i className="fas fa-play-circle mr-2"></i>视频
              </button>
              <button 
                className={`px-6 py-3 text-sm font-medium rounded-lg focus:outline-none ${activeTab === 'qa' ? styles.tabActive : styles.tabInactive}`}
                role="tab" 
                onClick={() => handleTabClick('qa')}
              >
                <i className="fas fa-question-circle mr-2"></i>问答
              </button>
              <button 
                className={`px-6 py-3 text-sm font-medium rounded-lg focus:outline-none ${activeTab === 'topics' ? styles.tabActive : styles.tabInactive}`}
                role="tab" 
                onClick={() => handleTabClick('topics')}
              >
                <i className="fas fa-fire mr-2"></i>热门话题
              </button>
            </div>
          </div>

          {/* 内容列表区域 */}
          {!showContentDetail && (
            <div className="mb-8">
              {renderContentList()}
            </div>
          )}

          {/* 内容详情区域 */}
          {showContentDetail && (
            <div className="mb-8">
              {renderContentDetail()}
            </div>
          )}
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

export default ContentPage;

