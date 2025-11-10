
<<<<<<< HEAD

=======
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
>>>>>>> 570d511 (first commit)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface ProductData {
  id: string;
  name: string;
  image: string;
  rating: number;
  recommendationScore: number;
  description: string;
  herbId: string;
}

const ProductRecommendPage: React.FC = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const { avatar } = useContext(UserContext);
>>>>>>> 570d511 (first commit)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [globalSearchValue, setGlobalSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '个性化产品推荐 - 滋智通';
    return () => { document.title = originalTitle; };
  }, []);

  // 滋补品数据
  const productsData: ProductData[] = [
    {
      id: 'product-1',
      name: '长白山人参',
      image: 'https://s.coze.cn/image/S7TmnKkeF-E/',
      rating: 4.9,
      recommendationScore: 8.5,
      description: '补气养血，增强体质，适合阳虚体质人群',
      herbId: 'ginseng'
    },
    {
      id: 'product-2',
      name: '内蒙古黄芪',
      image: 'https://s.coze.cn/image/qAQGnA9x4nE/',
      rating: 4.8,
      recommendationScore: 7.8,
      description: '补气升阳，固表止汗，提高免疫力',
      herbId: 'astragalus'
    },
    {
      id: 'product-3',
      name: '宁夏枸杞',
      image: 'https://s.coze.cn/image/JkDY4XrT9WU/',
      rating: 4.9,
      recommendationScore: 8.2,
      description: '滋补肝肾，明目，适合长期调理',
      herbId: 'wolfberry'
    },
    {
      id: 'product-4',
      name: '党参',
      image: 'https://s.coze.cn/image/1YIzCe5f4g8/',
      rating: 4.7,
      recommendationScore: 7.5,
      description: '补中益气，健脾益肺，温和滋补',
      herbId: 'dangshen'
    },
    {
      id: 'product-5',
      name: '生姜',
      image: 'https://s.coze.cn/image/W--p3NWtyWE/',
      rating: 4.6,
      recommendationScore: 7.0,
      description: '温中散寒，驱寒暖胃，适合日常调理',
      herbId: 'ginger'
    },
    {
      id: 'product-6',
      name: '龙眼肉',
      image: 'https://s.coze.cn/image/MFp-S1I7hC0/',
      rating: 4.5,
      recommendationScore: 6.8,
      description: '补益心脾，养血安神，改善睡眠质量',
      herbId: 'longan'
    },
    {
      id: 'product-7',
      name: '红枣',
      image: 'https://s.coze.cn/image/7KuqHIgOijM/',
      rating: 4.8,
      recommendationScore: 7.6,
      description: '补中益气，养血安神，适合日常食用',
      herbId: 'date'
    },
    {
      id: 'product-8',
      name: '肉桂',
      image: 'https://s.coze.cn/image/wF_uXuJeZuY/',
      rating: 4.4,
      recommendationScore: 6.5,
      description: '补火助阳，散寒止痛，温经通脉',
      herbId: 'cinnamon'
    }
  ];

  // 处理侧边栏切换
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // 处理搜索
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = globalSearchValue.trim();
      if (keyword) {
        navigate(`/search-result?q=${encodeURIComponent(keyword)}`);
      }
    }
  };

  // 处理产品卡片点击
  const handleProductCardClick = (herbId: string) => {
    navigate(`/knowledge-base?herb=${herbId}`);
  };

  // 处理分页
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`跳转到第${page}页`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
    console.log('跳转到下一页');
  };

  // 渲染星级评分
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
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
                onKeyPress={handleSearchKeyPress}
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
<<<<<<< HEAD
                <img src="https://s.coze.cn/image/WXuRKVgheDM/" 
=======
                <img src= {avatar}
>>>>>>> 570d511 (first commit)
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
            <Link to="/product-recommend" className="flex items-center space-x-3 p-3 rounded-lg bg-accent text-white">
              <i className="fas fa-thumbs-up text-lg"></i>
              {!isSidebarCollapsed && <span>产品推荐</span>}
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
                <h2 className="text-2xl font-bold text-text-primary mb-2">个性化产品推荐</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>产品推荐</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 推荐理由 */}
          <section className="mb-8">
            <div className={`${styles.glassCard} rounded-xl p-6`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-magic text-accent text-lg"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">为您精心推荐</h3>
                  <p className="text-sm text-text-secondary">基于您的体质测试和生活习惯分析</p>
                </div>
              </div>
              <p className="text-text-secondary">
                根据您的阳虚体质特征和生活习惯，我们为您推荐以下滋补品。这些产品经过专业中医师认证，适合您的体质特点，能够帮助改善畏寒怕冷、免疫力低下等症状。
              </p>
            </div>
          </section>

          {/* 滋补品推荐列表 */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6">推荐滋补品</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsData.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductCardClick(product.herbId)}
                  className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}
                >
                  <div className="text-center mb-4">
                    <img 
                      src={product.image}
                      alt={product.name} 
                      className="w-24 h-24 rounded-lg mx-auto mb-3 object-cover" 
                    />
                    <h4 className="font-semibold text-text-primary mb-2">{product.name}</h4>
                    <div className="flex items-center justify-center mb-2">
                      <div className={`flex ${styles.ratingStars} text-sm`}>
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-text-secondary ml-2">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${(product.recommendationScore / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-text-secondary ml-2">推荐指数 {product.recommendationScore}</span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-4 text-center">
                    {product.description}
                  </p>
                  <button className={`w-full py-2 ${styles.glassButton} rounded-lg text-accent font-medium hover:bg-accent hover:text-white transition-all`}>
                    查看详情
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 分页控件 */}
          <section className="mb-8">
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePrevPage}
                  className={`px-3 py-2 ${styles.glassButton} rounded-lg text-text-secondary hover:text-accent transition-all`}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                  onClick={() => handlePageChange(1)}
                  className={`px-3 py-2 rounded-lg ${currentPage === 1 ? styles.paginationActive : `${styles.glassButton} text-text-secondary`}`}
                >
                  1
                </button>
                <button 
                  onClick={() => handlePageChange(2)}
                  className={`px-3 py-2 rounded-lg ${currentPage === 2 ? styles.paginationActive : `${styles.glassButton} text-text-secondary`}`}
                >
                  2
                </button>
                <button 
                  onClick={() => handlePageChange(3)}
                  className={`px-3 py-2 rounded-lg ${currentPage === 3 ? styles.paginationActive : `${styles.glassButton} text-text-secondary`}`}
                >
                  3
                </button>
                <span className="px-2 text-text-secondary">...</span>
                <button 
                  onClick={() => handlePageChange(8)}
                  className={`px-3 py-2 rounded-lg ${currentPage === 8 ? styles.paginationActive : `${styles.glassButton} text-text-secondary`}`}
                >
                  8
                </button>
                <button 
                  onClick={handleNextPage}
                  className={`px-3 py-2 ${styles.glassButton} rounded-lg text-text-secondary hover:text-accent transition-all`}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* 底部区域 */}
        <footer className={`${styles.glassEffect} py-6 mt-12`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
<<<<<<< HEAD
                <p className="text-sm text-text-secondary">© 2024 滋智通. 保留所有权利.</p>
                <p className="text-xs text-text-secondary mt-1">京ICP备12345678号-1</p>
=======
                <p className="text-sm text-text-secondary">© 2025 滋智通. 保留所有权利.</p>
                <p className="text-xs text-text-secondary mt-1">粤ICP备12345678号</p>
>>>>>>> 570d511 (first commit)
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

export default ProductRecommendPage;

