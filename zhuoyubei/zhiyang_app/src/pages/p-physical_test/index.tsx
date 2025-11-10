
<<<<<<< HEAD

=======
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
>>>>>>> 570d511 (first commit)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface QuestionOption {
  text: string;
  score: number;
}

interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

interface TestResult {
  id: string;
  date: string;
  answers: Record<number, number>;
  totalScore: number;
}

const PhysicalTestPage: React.FC = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const { avatar } = useContext(UserContext);
>>>>>>> 570d511 (first commit)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalSearchValue, setGlobalSearchValue] = useState('');

  // 问卷数据
  const questionnaireData: Question[] = [
    {
      id: 1,
      question: '您平时怕冷吗？',
      options: [
        { text: '从不', score: 1 },
        { text: '很少', score: 2 },
        { text: '有时', score: 3 },
        { text: '经常', score: 4 },
        { text: '总是', score: 5 }
      ]
    },
    {
      id: 2,
      question: '您容易感到疲劳吗？',
      options: [
        { text: '从不', score: 1 },
        { text: '很少', score: 2 },
        { text: '有时', score: 3 },
        { text: '经常', score: 4 },
        { text: '总是', score: 5 }
      ]
    },
    {
      id: 3,
      question: '您容易上火吗？',
      options: [
        { text: '从不', score: 1 },
        { text: '很少', score: 2 },
        { text: '有时', score: 3 },
        { text: '经常', score: 4 },
        { text: '总是', score: 5 }
      ]
    },
    {
      id: 4,
      question: '您的皮肤容易干燥吗？',
      options: [
        { text: '从不', score: 1 },
        { text: '很少', score: 2 },
        { text: '有时', score: 3 },
        { text: '经常', score: 4 },
        { text: '总是', score: 5 }
      ]
    },
    {
      id: 5,
      question: '您容易便秘吗？',
      options: [
        { text: '从不', score: 1 },
        { text: '很少', score: 2 },
        { text: '有时', score: 3 },
        { text: '经常', score: 4 },
        { text: '总是', score: 5 }
      ]
    },
    {
      id: 6,
      question: '您容易出汗吗？',
      options: [
        { text: '从不', score: 1 },
        { text: '很少', score: 2 },
        { text: '有时', score: 3 },
        { text: '经常', score: 4 },
        { text: '总是', score: 5 }
      ]
    },
    {
      id: 7,
      question: '您的性格比较急躁吗？',
      options: [
        { text: '从不', score: 1 },
        { text: '很少', score: 2 },
        { text: '有时', score: 3 },
        { text: '经常', score: 4 },
        { text: '总是', score: 5 }
      ]
    },
    {
      id: 8,
      question: '您容易感冒吗？',
      options: [
        { text: '从不', score: 1 },
        { text: '很少', score: 2 },
        { text: '有时', score: 3 },
        { text: '经常', score: 4 },
        { text: '总是', score: 5 }
      ]
    },
    {
      id: 9,
      question: '您的睡眠质量如何？',
      options: [
        { text: '很好', score: 1 },
        { text: '较好', score: 2 },
        { text: '一般', score: 3 },
        { text: '较差', score: 4 },
        { text: '很差', score: 5 }
      ]
    },
    {
      id: 10,
      question: '您的食欲如何？',
      options: [
        { text: '很好', score: 1 },
        { text: '较好', score: 2 },
        { text: '一般', score: 3 },
        { text: '较差', score: 4 },
        { text: '很差', score: 5 }
      ]
    }
  ];

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '体质测试 - 滋智通';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // 侧边栏折叠功能
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // 搜索功能
  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = globalSearchValue.trim();
      if (keyword) {
        navigate(`/search-result?q=${encodeURIComponent(keyword)}`);
      }
    }
  };

  // 开始测试
  const handleStartTest = () => {
    setIsTestStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  // 选择答案
  const handleAnswerSelect = (questionId: number, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  // 上一题
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // 下一题
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionnaireData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // 提交测试
  const handleSubmitTest = () => {
    // 检查是否所有题目都已回答
    if (Object.keys(answers).length !== questionnaireData.length) {
      alert('请回答所有问题后再提交');
      return;
    }

    setIsSubmitting(true);

    // 模拟提交过程
    setTimeout(() => {
      // 生成体质测试结果ID
      const testResultId = 'test_result_' + Date.now();
      
      // 保存测试结果到本地存储
      const testResult: TestResult = {
        id: testResultId,
        date: new Date().toISOString(),
        answers: answers,
        totalScore: Object.values(answers).reduce((sum, score) => sum + score, 0)
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('latestTestResult', JSON.stringify(testResult));
      }
      
      console.log('体质测试提交成功，结果ID：', testResultId);
      
      setIsTestCompleted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  // 查看报告
  const handleViewReport = () => {
    navigate('/lifestyle-questionnaire');
  };

  // 继续生活习惯问卷
  const handleContinueLifestyleQuestionnaire = () => {
    navigate('/lifestyle-questionnaire');
  };

  // 导航离开确认
  const handleNavigationConfirm = (path: string) => {
    if (isTestStarted && !isTestCompleted) {
      if (confirm('测试尚未完成，确定要离开吗？')) {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  // 计算进度
  const answeredQuestionsCount = Object.keys(answers).length;
  const totalQuestionsCount = questionnaireData.length;
  const progressPercentage = (answeredQuestionsCount / totalQuestionsCount) * 100;
  const remainingQuestions = totalQuestionsCount - answeredQuestionsCount;
  const remainingMinutes = Math.ceil((remainingQuestions * 8) / 60);

  const currentQuestion = questionnaireData[currentQuestionIndex];
  const currentQuestionId = currentQuestion?.id;
  const currentAnswer = answers[currentQuestionId];

  const canProceed = currentAnswer !== undefined;
  const isLastQuestion = currentQuestionIndex === questionnaireData.length - 1;

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
            <button 
              onClick={() => handleNavigationConfirm('/home')}
              className="text-text-secondary hover:text-accent py-1 transition-colors"
            >
              首页
            </button>
            <button 
              onClick={() => handleNavigationConfirm('/knowledge-base')}
              className="text-text-secondary hover:text-accent py-1 transition-colors"
            >
              知识库
            </button>
            <button 
              onClick={() => handleNavigationConfirm('/ai-consult')}
              className="text-text-secondary hover:text-accent py-1 transition-colors"
            >
              智能咨询
            </button>
            <button 
              onClick={() => handleNavigationConfirm('/personal-center')}
              className="text-text-secondary hover:text-accent py-1 transition-colors"
            >
              个人中心
            </button>
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
                <img 
                  src="https://s.coze.cn/image/bYDLTbtt4lM/" 
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
      <aside className={`fixed left-0 top-16 bottom-0 ${sidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded} ${styles.glassEffect} z-40 transition-all duration-300`}>
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
            <button 
              onClick={() => handleNavigationConfirm('/home')}
              className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all w-full text-left"
            >
              <i className="fas fa-home text-lg"></i>
              {!sidebarCollapsed && <span>首页</span>}
            </button>
            <button 
              onClick={() => handleNavigationConfirm('/plan')}
              className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all w-full text-left"
            >
              <i className="fas fa-file-alt text-lg"></i>
              {!sidebarCollapsed && <span>我的方案</span>}
            </button>
            <button 
              onClick={() => handleNavigationConfirm('/ai-consult')}
              className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all w-full text-left"
            >
              <i className="fas fa-comments text-lg"></i>
              {!sidebarCollapsed && <span>我的咨询</span>}
            </button>
            <button 
              onClick={() => handleNavigationConfirm('/personal-center')}
              className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all w-full text-left"
            >
              <i className="fas fa-heart text-lg"></i>
              {!sidebarCollapsed && <span>我的收藏</span>}
            </button>
            <button className="flex items-center space-x-3 p-3 rounded-lg bg-accent text-white w-full text-left">
              <i className="fas fa-stethoscope text-lg"></i>
              {!sidebarCollapsed && <span>体质测试</span>}
            </button>
          </nav>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className={`${sidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded} pt-16 min-h-screen transition-all duration-300`}>
        <div className="p-6">
          {/* 页面头部 */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">体质测试</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>体质测试</span>
                </nav>
              </div>
            </div>
          </div>

          {/* 问卷说明 */}
          {!isTestStarted && (
            <div className={`${styles.glassCard} rounded-xl p-6 mb-8 ${styles.fadeIn}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-info-circle text-accent text-lg"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">中医体质辨识</h3>
                  <p className="text-sm text-text-secondary">了解您的体质类型，获得个性化养生建议</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                中医体质辨识是根据中医理论，通过问答形式判断人体的体质类型。本测试包含60个问题，大约需要5-8分钟完成。
                请根据您近一年的身体状况和感受，选择最符合您的选项。
              </p>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-clock"></i>
                  <span>预计用时：5-8分钟</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-question-circle"></i>
                  <span>共60题</span>
                </div>
              </div>
              <button 
                onClick={handleStartTest}
                className="mt-6 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all"
              >
                <i className="fas fa-play mr-2"></i>开始测试
              </button>
            </div>
          )}

          {/* 测试进度条 */}
          {isTestStarted && !isTestCompleted && (
            <div className={`${styles.glassCard} rounded-xl p-6 mb-8`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">测试进度</h3>
                <span className="text-sm text-text-secondary">{answeredQuestionsCount} / {totalQuestionsCount}</span>
              </div>
              <div className="w-full bg-glass-bg rounded-full h-3 mb-4">
                <div 
                  className={`bg-accent h-3 rounded-full ${styles.progressBar}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>请根据您的实际情况选择最符合的选项</span>
                <span>预计剩余时间：{remainingMinutes}分钟</span>
              </div>
            </div>
          )}

          {/* 问卷题目区域 */}
          {isTestStarted && !isTestCompleted && currentQuestion && (
            <div className={`${styles.glassCard} rounded-xl p-6 mb-8`}>
              <div className={styles.fadeIn}>
                <h3 className="text-lg font-semibold text-text-primary mb-6">{currentQuestion.question}</h3>
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div 
                      key={option.score}
                      onClick={() => handleAnswerSelect(currentQuestion.id, option.score)}
                      className={`${styles.questionOption} ${styles.glassEffect} rounded-lg p-4 border-2 border-transparent ${
                        currentAnswer === option.score ? styles.questionOptionSelected : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary">{option.text}</span>
                        <span className="text-sm text-text-secondary">{option.score}分</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 操作按钮区域 */}
          {isTestStarted && !isTestCompleted && (
            <div className="flex items-center justify-between">
              <button 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 ${styles.glassButton} rounded-lg text-text-secondary font-medium hover:text-accent transition-all ${
                  currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <i className="fas fa-chevron-left mr-2"></i>上一题
              </button>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-text-secondary">第 {currentQuestionIndex + 1} 题</span>
                {isLastQuestion ? (
                  <button 
                    onClick={handleSubmitTest}
                    disabled={!canProceed || isSubmitting}
                    className={`px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all ${
                      !canProceed || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>提交中...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check mr-2"></i>提交测试
                      </>
                    )}
                  </button>
                ) : (
                  <button 
                    onClick={handleNextQuestion}
                    disabled={!canProceed}
                    className={`px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all ${
                      !canProceed ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    下一题<i className="fas fa-chevron-right ml-2"></i>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 测试完成页面 */}
          {isTestCompleted && (
            <div className={`${styles.glassCard} rounded-xl p-6 mb-8`}>
              <div className="text-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-accent text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">测试完成！</h3>
                <p className="text-sm text-text-secondary mb-6">
                  感谢您完成体质测试，我们正在为您生成个性化的体质报告。
                </p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={handleViewReport}
                    className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all"
                  >
                    <i className="fas fa-file-alt mr-2"></i>查看报告
                  </button>
                  <button 
                    onClick={handleContinueLifestyleQuestionnaire}
                    className={`px-6 py-3 ${styles.glassButton} rounded-lg text-accent font-medium hover:bg-accent hover:text-white transition-all`}
                  >
                    <i className="fas fa-arrow-right mr-2"></i>继续生活习惯问卷
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PhysicalTestPage;

