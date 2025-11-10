

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

// 问题选项类型
interface Option {
  value: number;
  text: string;
}

// 已知问题 ID 类型
type QuestionKey = '1' | '2' | '3' | '6' | '7' | '8';
type TextQuestionKey = '4' | '5';

// 答案类型
type AnswerValue = number | string | number[];
type Answers = Partial<Record<QuestionKey | TextQuestionKey, AnswerValue>>;

// 问题类型
type QuestionType = 'single' | 'multiple' | 'text';

interface Question {
  id: string;
  type: QuestionType;
  question: string;
}

const LifestyleQuestionnaire: React.FC = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const totalSections = 3;

  // 页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '生活习惯问卷 - 滋智通';
    return () => { document.title = originalTitle; };
  }, []);

  // 加载保存的进度
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAnswers = localStorage.getItem('lifestyle_answers');
      const savedSection = localStorage.getItem('current_section');

      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      if (savedSection) setCurrentSection(parseInt(savedSection));
    }
  }, []);

  const handleSidebarToggle = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = (e.target as HTMLInputElement).value.trim();
      if (keyword) navigate(`/search-result?q=${encodeURIComponent(keyword)}`);
    }
  };

  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('问卷尚未完成，确定要离开吗？')) navigate(path);
  };

  // 单选
  const handleSingleSelect = (questionId: QuestionKey, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // 多选
  const handleMultipleSelect = (questionId: QuestionKey, value: number) => {
    setAnswers(prev => {
      const currentValues = (prev[questionId] as number[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [questionId]: newValues };
    });
  };

  // 文本输入
  const handleTextInput = (questionId: TextQuestionKey, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const getCurrentSectionQuestions = (): Question[] => {
    switch (currentSection) {
      case 1:
        return [
          { id: '1', type: 'single', question: '您的三餐是否规律？' },
          { id: '2', type: 'single', question: '您的口味偏好？' },
          { id: '3', type: 'multiple', question: '您经常食用哪些类型的食物？（可多选）' }
        ];
      case 2:
        return [
          { id: '4', type: 'text', question: '您通常几点睡觉？' },
          { id: '5', type: 'text', question: '您通常几点起床？' },
          { id: '6', type: 'single', question: '您的睡眠质量如何？' }
        ];
      case 3:
        return [
          { id: '7', type: 'single', question: '您每周运动几次？' },
          { id: '8', type: 'multiple', question: '您喜欢的运动类型？（可多选）' }
        ];
      default:
        return [];
    }
  };

  const optionsMap: Record<QuestionKey, Option[]> = {
    '1': [
      { value: 1, text: '非常规律，按时定量' },
      { value: 2, text: '比较规律，偶尔不按时' },
      { value: 3, text: '不太规律，经常错过用餐时间' },
      { value: 4, text: '很不规律，饮食时间混乱' }
    ],
    '2': [
      { value: 1, text: '清淡，少油少盐' },
      { value: 2, text: '适中，口味平和' },
      { value: 3, text: '偏咸，喜欢重口味' },
      { value: 4, text: '偏辣，喜欢刺激性食物' }
    ],
    '3': [
      { value: 1, text: '新鲜蔬菜' },
      { value: 2, text: '水果' },
      { value: 3, text: '粗粮杂粮' },
      { value: 4, text: '肉类' },
      { value: 5, text: '海鲜' },
      { value: 6, text: '加工食品' }
    ],
    '6': [
      { value: 1, text: '很好，一觉到天亮' },
      { value: 2, text: '较好，偶尔醒来' },
      { value: 3, text: '一般，经常醒来' },
      { value: 4, text: '较差，难以入睡或早醒' }
    ],
    '7': [
      { value: 1, text: '5次以上' },
      { value: 2, text: '3-4次' },
      { value: 3, text: '1-2次' },
      { value: 4, text: '基本不运动' }
    ],
    '8': [
      { value: 1, text: '散步、快走' },
      { value: 2, text: '跑步、慢跑' },
      { value: 3, text: '太极拳、气功' },
      { value: 4, text: '游泳' },
      { value: 5, text: '球类运动' },
      { value: 6, text: '其他' }
    ]
  };

  const getOptions = (questionId: string): Option[] => {
    if ((questionId as QuestionKey) in optionsMap) return optionsMap[questionId as QuestionKey];
    return [];
  };

  const isCurrentSectionComplete = (): boolean => {
    return getCurrentSectionQuestions().every(q => {
      const answer = answers[q.id as keyof Answers];
      if (q.type === 'text' || q.type === 'single') return answer !== undefined && answer !== '';
      if (q.type === 'multiple') return Array.isArray(answer) && answer.length > 0;
      return false;
    });
  };

  const handlePrevious = () => currentSection > 1 && setCurrentSection(currentSection - 1);
  const handleNext = () => {
    if (!isCurrentSectionComplete()) return;
    if (currentSection < totalSections) setCurrentSection(currentSection + 1);
    else handleSubmit();
  };

  const handleSaveProgress = () => {
    if (typeof window !== 'undefined') {
      setIsSaving(true);
      localStorage.setItem('lifestyle_answers', JSON.stringify(answers));
      localStorage.setItem('current_section', currentSection.toString());
      setTimeout(() => setIsSaving(false), 2000);
    }
  };

  const handleSubmit = () => {
    const allQuestions: Question[] = [
      { id: '1', type: 'single', question: '' },
      { id: '2', type: 'single', question: '' },
      { id: '3', type: 'multiple', question: '' },
      { id: '4', type: 'text', question: '' },
      { id: '5', type: 'text', question: '' },
      { id: '6', type: 'single', question: '' },
      { id: '7', type: 'single', question: '' },
      { id: '8', type: 'multiple', question: '' }
    ];
    const allAnswered = allQuestions.every(q => {
      const answer = answers[q.id as keyof Answers];
      if (q.type === 'text' || q.type === 'single') return answer !== undefined && answer !== '';
      if (q.type === 'multiple') return Array.isArray(answer) && answer.length > 0;
      return false;
    });

    if (!allAnswered) {
      alert('请完成所有问题后再提交');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('lifestyle_answers', JSON.stringify(answers));
        localStorage.removeItem('current_section');
      }
      navigate('/ai-consult?lifestyle_submitted=true');
    }, 1500);
  };

  const renderOption = (questionId: QuestionKey, option: Option, type: 'single' | 'multiple') => {
    const isSelected =
      type === 'single'
        ? answers[questionId] === option.value
        : Array.isArray(answers[questionId]) && (answers[questionId] as number[]).includes(option.value);

    const handleClick =
      type === 'single'
        ? () => handleSingleSelect(questionId, option.value)
        : () => handleMultipleSelect(questionId, option.value);

    return (
      <div
        key={option.value}
        className={`${styles.optionItem} ${styles.glassEffect} rounded-lg p-4 border-2 border-transparent ${
          isSelected ? styles.selected : ''
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-5 h-5 border-2 border-accent ${
              type === 'single' ? 'rounded-full' : 'rounded'
            } flex items-center justify-center`}
          >
            {type === 'single' ? (
              <div className={`w-3 h-3 bg-accent rounded-full ${isSelected ? '' : 'hidden'}`}></div>
            ) : (
              <i className={`fas fa-check text-accent text-sm ${isSelected ? '' : 'hidden'}`}></i>
            )}
          </div>
          <span className="text-text-primary">{option.text}</span>
        </div>
      </div>
    );
  };

  const renderQuestion = (question: Question) => {
    const id = question.id as QuestionKey | TextQuestionKey;
    return (
      <div key={question.id} className="mb-6">
        <h4 className="font-medium text-text-primary mb-4">{question.question}</h4>
        {question.type === 'text' ? (
          <input
            type="time"
            value={(answers[id] as string) || ''}
            onChange={(e) => handleTextInput(id as TextQuestionKey, e.target.value)}
            className={`w-full px-4 py-3 ${styles.glassEffect} rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent`}
          />
        ) : (
          getOptions(question.id).map(option =>
            renderOption(question.id as QuestionKey, option, question.type as 'single' | 'multiple')
          )
        )}
      </div>
    );
  };

  const progress = (currentSection / totalSections) * 100;

  return (
    <div className={styles.pageWrapper}>
      {/* 这里省略导航栏和侧边栏 JSX，为重点演示 TS 类型安全 */}
      <main className={`${isSidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded} pt-16 min-h-screen transition-all duration-300`}>
        <div className="p-6">
          {getCurrentSectionQuestions().map(renderQuestion)}
          <div className="flex items-center justify-between mt-6">
            <button onClick={handlePrevious} disabled={currentSection === 1}>上一题</button>
            <div>
              <button onClick={handleSaveProgress}>{isSaving ? '已保存' : '保存进度'}</button>
              <button onClick={handleNext} disabled={!isCurrentSectionComplete() || isSubmitting}>
                {currentSection === totalSections ? '提交问卷' : '下一题'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LifestyleQuestionnaire;
