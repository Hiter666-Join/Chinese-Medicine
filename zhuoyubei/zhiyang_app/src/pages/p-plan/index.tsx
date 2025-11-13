
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';

interface PlanData {
  title: string;
  targetPopulation: string;
  goal: string;
  period: string;
  description: string;
}

const PlanPage: React.FC = () => {
  const navigate = useNavigate();
  const { avatar, setAvatar, nickname, setNickname } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [globalSearchValue, setGlobalSearchValue] = useState('');
  const [currentPlanData, setCurrentPlanData] = useState<PlanData>({
    title: '阳虚体质调理方案',
    targetPopulation: '阳虚体质人群',
    goal: '温阳散寒，改善体质',
    period: '3个月为一周期',
    description: '本方案针对阳虚体质特点，通过温和滋补的方式，逐步改善畏寒怕冷、手脚冰凉、精神不振等症状。方案结合了传统中医理论和现代养生理念，安全可靠，适合长期调理。'
  });

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '滋补方案详情 - 滋智通';
    return () => { document.title = originalTitle; };
  }, []);

  // 根据URL参数加载方案数据
  useEffect(() => {
    const planId = searchParams.get('id');
    
    const mockPlans: Record<string, PlanData> = {
      '1': {
        title: '阳虚体质调理方案',
        targetPopulation: '阳虚体质人群',
        goal: '温阳散寒，改善体质',
        period: '3个月为一周期',
        description: '本方案针对阳虚体质特点，通过温和滋补的方式，逐步改善畏寒怕冷、手脚冰凉、精神不振等症状。方案结合了传统中医理论和现代养生理念，安全可靠，适合长期调理。'
      },
      '2': {
        title: '阴虚体质调理方案',
        targetPopulation: '阴虚体质人群',
        goal: '滋阴降火，平衡阴阳',
        period: '2个月为一周期',
        description: '本方案针对阴虚体质特点，通过滋阴润燥的方式，改善口干舌燥、心烦失眠、便秘等症状。方案注重清热养阴，适合阴虚内热的人群。'
      },
      '3': {
        title: '平和体质保养方案',
        targetPopulation: '平和体质人群',
        goal: '维持健康，预防疾病',
        period: '长期保养',
        description: '本方案针对健康人群，通过科学的养生方法，维持身体的阴阳平衡，增强体质，预防疾病的发生。适合大多数健康成年人。'
      }
    };

    if (planId && mockPlans[planId]) {
      setCurrentPlanData(mockPlans[planId]);
    }
  }, [searchParams]);

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

  const handleSavePlan = () => {
    console.log('保存方案功能');
    alert('方案已保存');
  };

  const handleSharePlan = () => {
    console.log('分享方案功能');
    alert('分享功能');
  };

  const handlePrintPlan = () => {
    console.log('打印方案功能');
    window.print();
  };

  const handleHerbCardClick = (herbId: string) => {
    navigate(`/knowledge-base?herb=${herbId}`);
  };

  const handleContentCardClick = (contentId: string) => {
    navigate(`/content?id=${contentId}`);
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
          <button onClick={handleSidebarToggle} className={`w-full mb-6 p-2 ${styles.glassButton} rounded-lg text-center`}>
            <i className="fas fa-bars text-text-secondary"></i>
          </button>
          
          {/* 菜单项 */}
          <nav className="space-y-2">
            <Link to="/home" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-home text-lg"></i>
              {!isSidebarCollapsed && <span>首页</span>}
            </Link>
            <Link to="/personal-center#plans" className="flex items-center space-x-3 p-3 rounded-lg bg-accent text-white">
              <i className="fas fa-file-alt text-lg"></i>
              {!isSidebarCollapsed && <span>我的方案</span>}
            </Link>
            <Link to="/ai-consult" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-comments text-lg"></i>
              {!isSidebarCollapsed && <span>我的咨询</span>}
            </Link>
            <Link to="/personal-center#favorites" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">{currentPlanData.title}</h2>
                <nav className="text-sm text-text-secondary">
                  <Link to="/home" className="hover:text-accent">首页</Link>
                  <span className="mx-2">/</span>
                  <Link to="/personal-center" className="hover:text-accent">个人中心</Link>
                  <span className="mx-2">/</span>
                  <span>滋补方案</span>
                </nav>
              </div>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <button onClick={handleSavePlan} className={`px-4 py-2 ${styles.glassButton} rounded-lg text-text-primary font-medium hover:bg-accent hover:text-white transition-all`}>
                  <i className="fas fa-save mr-2"></i>保存方案
                </button>
                <button onClick={handleSharePlan} className={`px-4 py-2 ${styles.glassButton} rounded-lg text-text-primary font-medium hover:bg-accent hover:text-white transition-all`}>
                  <i className="fas fa-share mr-2"></i>分享方案
                </button>
                <button onClick={handlePrintPlan} className={`px-4 py-2 ${styles.glassButton} rounded-lg text-text-primary font-medium hover:bg-accent hover:text-white transition-all`}>
                  <i className="fas fa-print mr-2"></i>打印方案
                </button>
              </div>
            </div>
          </div>

          {/* 方案概览 */}
          <section className="mb-8">
            <div className={`${styles.glassCard} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                <i className="fas fa-info-circle text-accent mr-2"></i>方案概览
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`text-center p-4 ${styles.glassEffect} rounded-lg`}>
                  <i className="fas fa-user-check text-2xl text-accent mb-2"></i>
                  <h4 className="font-medium text-text-primary mb-1">适用人群</h4>
                  <p className="text-sm text-text-secondary">{currentPlanData.targetPopulation}</p>
                </div>
                <div className={`text-center p-4 ${styles.glassEffect} rounded-lg`}>
                  <i className="fas fa-bullseye text-2xl text-accent mb-2"></i>
                  <h4 className="font-medium text-text-primary mb-1">调理目标</h4>
                  <p className="text-sm text-text-secondary">{currentPlanData.goal}</p>
                </div>
                <div className={`text-center p-4 ${styles.glassEffect} rounded-lg`}>
                  <i className="fas fa-calendar-alt text-2xl text-accent mb-2"></i>
                  <h4 className="font-medium text-text-primary mb-1">建议周期</h4>
                  <p className="text-sm text-text-secondary">{currentPlanData.period}</p>
                </div>
              </div>
              <div className={`mt-6 p-4 ${styles.glassEffect} rounded-lg`}>
                <h4 className="font-medium text-text-primary mb-2">方案说明</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {currentPlanData.description}
                </p>
              </div>
            </div>
          </section>

          {/* 推荐滋补品列表 */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              <i className="fas fa-leaf text-accent mr-2"></i>推荐滋补品
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 滋补品卡片1 */}
              <div onClick={() => handleHerbCardClick('1')} className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}>
                <div className="flex items-start space-x-4">
                  <img src="https://s.coze.cn/image/PcaULvIO2lc/" 
                       alt="人参" className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-2">长白山人参</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">主要功效</h5>
                        <p className="text-xs text-text-secondary">大补元气，复脉固脱，补脾益肺，生津养血，安神益智</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">食用方法</h5>
                        <p className="text-xs text-text-secondary">切片泡水、炖汤、研粉冲服，每日3-5克</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">注意事项</h5>
                        <p className="text-xs text-text-secondary">不宜与藜芦同用，实证、热证者慎用</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 滋补品卡片2 */}
              <div onClick={() => handleHerbCardClick('2')} className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}>
                <div className="flex items-start space-x-4">
                  <img src="https://s.coze.cn/image/LCqPDv1jVjg/" 
                       alt="黄芪" className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-2">内蒙古黄芪</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">主要功效</h5>
                        <p className="text-xs text-text-secondary">补气升阳，固表止汗，利水消肿，生津养血</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">食用方法</h5>
                        <p className="text-xs text-text-secondary">煎水服用、煮粥、煲汤，每日10-15克</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">注意事项</h5>
                        <p className="text-xs text-text-secondary">阴虚阳亢者不宜单独使用</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 滋补品卡片3 */}
              <div onClick={() => handleHerbCardClick('3')} className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}>
                <div className="flex items-start space-x-4">
                  <img src="https://s.coze.cn/image/_cpC8Y6owvg/" 
                       alt="枸杞" className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-2">宁夏枸杞</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">主要功效</h5>
                        <p className="text-xs text-text-secondary">滋补肝肾，益精明目，增强免疫力</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">食用方法</h5>
                        <p className="text-xs text-text-secondary">直接食用、泡水、煮粥，每日10-15克</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">注意事项</h5>
                        <p className="text-xs text-text-secondary">外邪实热、脾虚有湿者不宜</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 滋补品卡片4 */}
              <div onClick={() => handleHerbCardClick('4')} className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}>
                <div className="flex items-start space-x-4">
                  <img src="https://s.coze.cn/image/qpRE80oJprY/" 
                       alt="当归" className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-2">甘肃当归</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">主要功效</h5>
                        <p className="text-xs text-text-secondary">补血活血，调经止痛，润肠通便</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">食用方法</h5>
                        <p className="text-xs text-text-secondary">煎水服用、炖汤，每日5-10克</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-text-primary mb-1">注意事项</h5>
                        <p className="text-xs text-text-secondary">湿盛中满、大便溏泄者不宜</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 养生建议 */}
          <section className="mb-8">
            <div className={`${styles.glassCard} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                <i className="fas fa-lightbulb text-accent mr-2"></i>养生建议
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className={`p-4 ${styles.glassEffect} rounded-lg`}>
                    <h4 className="font-medium text-text-primary mb-2 flex items-center">
                      <i className="fas fa-utensils text-accent mr-2"></i>饮食建议
                    </h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 多食用温热性食物，如羊肉、牛肉、韭菜等</li>
                      <li>• 避免生冷食物，如西瓜、苦瓜、冷饮等</li>
                      <li>• 可适量饮用姜茶、桂圆茶等温热饮品</li>
                      <li>• 规律饮食，避免暴饮暴食</li>
                    </ul>
                  </div>
                  <div className={`p-4 ${styles.glassEffect} rounded-lg`}>
                    <h4 className="font-medium text-text-primary mb-2 flex items-center">
                      <i className="fas fa-running text-accent mr-2"></i>运动建议
                    </h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 选择温和的有氧运动，如散步、太极拳、瑜伽</li>
                      <li>• 运动时间以白天为宜，避免在寒冷环境中运动</li>
                      <li>• 运动强度以微微出汗为宜，避免大汗淋漓</li>
                      <li>• 每周运动3-5次，每次30-45分钟</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className={`p-4 ${styles.glassEffect} rounded-lg`}>
                    <h4 className="font-medium text-text-primary mb-2 flex items-center">
                      <i className="fas fa-bed text-accent mr-2"></i>作息建议
                    </h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 保证充足睡眠，早睡早起，避免熬夜</li>
                      <li>• 中午可适当午休，时间以30分钟为宜</li>
                      <li>• 睡前可用温水泡脚，促进血液循环</li>
                      <li>• 保持卧室温暖舒适，避免受凉</li>
                    </ul>
                  </div>
                  <div className={`p-4 ${styles.glassEffect} rounded-lg`}>
                    <h4 className="font-medium text-text-primary mb-2 flex items-center">
                      <i className="fas fa-heart text-accent mr-2"></i>情志调节
                    </h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 保持心情舒畅，避免过度思虑和焦虑</li>
                      <li>• 培养积极乐观的心态</li>
                      <li>• 可适当参加社交活动，丰富精神生活</li>
                      <li>• 学习放松技巧，如冥想、深呼吸等</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 注意事项 */}
          <section className="mb-8">
            <div className={`${styles.glassCard} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                <i className="fas fa-exclamation-triangle text-accent mr-2"></i>注意事项
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-shield-alt text-accent mt-1"></i>
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">用药安全</h4>
                      <p className="text-sm text-text-secondary">请严格按照建议剂量服用，如有不适请及时咨询专业医师</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-user-md text-accent mt-1"></i>
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">个体差异</h4>
                      <p className="text-sm text-text-secondary">体质调理效果因人而异，建议定期复查调整方案</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-phone text-accent mt-1"></i>
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">及时就医</h4>
                      <p className="text-sm text-text-secondary">如出现严重不适或症状加重，请立即停止使用并就医</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-calendar-check text-accent mt-1"></i>
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">定期复查</h4>
                      <p className="text-sm text-text-secondary">建议每1-2个月进行一次体质评估，调整调理方案</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 相关科普内容推荐 */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              <i className="fas fa-book-open text-accent mr-2"></i>相关科普内容
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 科普文章卡片1 */}
              <div onClick={() => handleContentCardClick('1')} className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-file-alt text-accent text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">阳虚体质的辨识与调理</h4>
                    <p className="text-sm text-text-secondary">科普文章</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-4">详细介绍阳虚体质的特征表现、形成原因以及科学的调理方法，帮助您更好地了解自己的体质状况。</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-eye text-xs text-text-secondary"></i>
                    <span className="text-xs text-text-secondary">2,345阅读</span>
                  </div>
                  <span className="text-xs text-text-secondary">3天前</span>
                </div>
              </div>

              {/* 科普文章卡片2 */}
              <div onClick={() => handleContentCardClick('2')} className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-video text-accent text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">冬季滋补食谱大全</h4>
                    <p className="text-sm text-text-secondary">视频教程</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-4">专业营养师为您讲解冬季滋补的正确方法，推荐适合阳虚体质的美味食谱。</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-play text-xs text-text-secondary"></i>
                    <span className="text-xs text-text-secondary">1,567观看</span>
                  </div>
                  <span className="text-xs text-text-secondary">1周前</span>
                </div>
              </div>

              {/* 科普文章卡片3 */}
              <div onClick={() => handleContentCardClick('3')} className={`${styles.glassCard} rounded-xl p-6 ${styles.hoverLift} cursor-pointer`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-comments text-accent text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">专家解答：滋补常见问题</h4>
                    <p className="text-sm text-text-secondary">问答内容</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-4">权威专家解答用户最关心的滋补养生问题，为您的健康保驾护航。</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-thumbs-up text-xs text-text-secondary"></i>
                    <span className="text-xs text-text-secondary">892点赞</span>
                  </div>
                  <span className="text-xs text-text-secondary">5天前</span>
                </div>
              </div>
            </div>
          </section>
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

export default PlanPage;

