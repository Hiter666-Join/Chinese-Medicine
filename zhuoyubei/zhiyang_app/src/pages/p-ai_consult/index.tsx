

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  type: 'text' | 'image';
  imageUrl?: string;
}

interface RelatedLink {
  text: string;
  href: string;
}

const AIConsultPage: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messageInputValue, setMessageInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showAIQuestionArea, setShowAIQuestionArea] = useState(false);
  const [aiQuestionText, setAIQuestionText] = useState('');
  const [aiQuestionOptions, setAIQuestionOptions] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '智能咨询 - 滋智通';
    return () => { 
      document.title = originalTitle; 
    };
  }, []);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping, showAIQuestionArea]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleGlobalSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyword = (e.target as HTMLInputElement).value.trim();
      if (keyword) {
        navigate(`/search-result?q=${encodeURIComponent(keyword)}`);
      }
    }
  };

  const handleNewChat = () => {
    setChatHistory([]);
    setShowAIQuestionArea(false);
  };

  const handleHistoryClick = () => {
    navigate('/personal-center#consultation-history');
  };

  const handleQuickReply = (question: string) => {
    sendMessage(question);
  };

  const adjustTextareaHeight = () => {
    if (messageInputRef.current) {
      messageInputRef.current.style.height = 'auto';
      messageInputRef.current.style.height = Math.min(messageInputRef.current.scrollHeight, 120) + 'px';
    }
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      type: 'text'
    };

    setChatHistory(prev => [...prev, newMessage]);
    setMessageInputValue('');
    
    if (messageInputRef.current) {
      messageInputRef.current.style.height = 'auto';
      messageInputRef.current.blur();
    }

    setShowAIQuestionArea(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      generateAIResponse(text);
    }, 1500);
  };

  const handleSendClick = () => {
    sendMessage(messageInputValue);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(messageInputValue);
    }
  };

  const handleVoiceClick = () => {
    console.log('需要调用第三方接口实现语音输入功能');
    
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      
      setTimeout(() => {
        const voiceText = '我想了解人参的功效';
        setMessageInputValue(voiceText);
        adjustTextareaHeight();
      }, 500);
    }
  };

  const handleImageClick = () => {
    console.log('需要调用第三方接口实现图片上传功能');
    
    setPreviewImageUrl('https://s.coze.cn/image/FlpOIVeMWOs/');
    setShowImagePreview(true);
  };

  const handleConfirmUpload = () => {
    setShowImagePreview(false);

    const imageMessage: ChatMessage = {
      id: Date.now().toString(),
      text: '',
      sender: 'user',
      type: 'image',
      imageUrl: 'https://s.coze.cn/image/tEMjZdkPJJk/'
    };

    setChatHistory(prev => [...prev, imageMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = '这是人参，具有补气养血、增强体质的功效。适合气虚体质的人群。建议您可以搭配枸杞一起泡水饮用。';
      addMessage(aiResponse, 'ai');
      addRelatedLinks([
        { text: '查看人参详细信息', href: '/knowledge-base?herb=ginseng' },
        { text: '查看枸杞详细信息', href: '/knowledge-base?herb=wolfberry' }
      ]);
    }, 2000);
  };

  const handleCancelUpload = () => {
    setShowImagePreview(false);
  };

  const addMessage = (text: string, sender: 'user' | 'ai') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      type: 'text'
    };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const addRelatedLinks = (links: RelatedLink[]) => {
    // 相关链接将作为特殊消息添加到聊天历史中
    const linksMessage: ChatMessage = {
      id: Date.now().toString() + '-links',
      text: JSON.stringify(links),
      sender: 'ai',
      type: 'text'
    };
    setChatHistory(prev => [...prev, linksMessage]);
  };

  const generateAIResponse = (userMessage: string) => {
    let aiResponse = '';

    if (userMessage.includes('体质') || userMessage.includes('测试')) {
      aiResponse = '了解自己的体质是科学养生的第一步。我建议您先完成我们的体质测试，这样我可以为您提供更准确的建议。您现在方便进行测试吗？';
      showAIQuestion('您希望现在进行体质测试吗？', ['现在测试', '稍后再说']);
    } else if (userMessage.includes('滋补品') || userMessage.includes('推荐')) {
      aiResponse = '为了给您推荐合适的滋补品，我需要了解一些基本信息。请问您的年龄和主要的身体状况是什么？';
      showAIQuestion('您的年龄段是？', ['40-50岁', '50-60岁', '60-70岁', '70岁以上']);
    } else if (userMessage.includes('冬季') || userMessage.includes('养生')) {
      aiResponse = '冬季养生确实很重要。根据中医理论，冬季应该注重"藏"，也就是养肾藏精。建议您可以：\n\n1. 早睡晚起，保证充足睡眠\n2. 适当进补，如羊肉、牛肉等温补食物\n3. 坚持适度运动，但避免大汗\n4. 注意保暖，特别是脚部和腰部\n\n您平时有什么特别的养生习惯吗？';
      addMessage(aiResponse, 'ai');
      addRelatedLinks([
        { text: '冬季滋补食谱', href: '/content?id=winter-recipes' },
        { text: '中医体质养生', href: '/content?id=constitution-health' }
      ]);
    } else if (userMessage.includes('人参')) {
      aiResponse = '人参是非常好的滋补品，具有补气养血、增强免疫力的功效。不过人参性温，适合气虚体质的人。如果您有上火、高血压等症状，建议在专业指导下使用。';
      addMessage(aiResponse, 'ai');
      addRelatedLinks([
        { text: '人参详细介绍', href: '/knowledge-base?herb=ginseng' },
        { text: '如何辨别优质人参', href: '/content?id=ginseng-guide' }
      ]);
    } else {
      aiResponse = '感谢您的问题。根据您的情况，我建议您可以先完成体质测试，这样我可以为您制定个性化的养生方案。您也可以继续问我其他关于滋补养生的问题。';
      addMessage(aiResponse, 'ai');
    }
  };

  const showAIQuestion = (question: string, options: string[]) => {
    setAIQuestionText(question);
    setAIQuestionOptions(options);
    setShowAIQuestionArea(true);
  };

  const handleAIQuestionOption = (option: string) => {
    setShowAIQuestionArea(false);
    sendMessage(option);
  };

  const renderChatMessage = (message: ChatMessage) => {
    if (message.type === 'image' && message.imageUrl) {
      return (
        <div key={message.id} className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
            <img src="https://s.coze.cn/image/XLrBCwKO_D4/" alt="用户头像" className="w-8 h-8 rounded-full" />
          </div>
          <div className="flex-1">
            <div className={`${styles.chatBubbleUser} max-w-md p-4`}>
              <img src={message.imageUrl} alt="上传的图片" className="w-32 h-32 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      );
    }

    // 检查是否是相关链接消息
    if (message.text.startsWith('[') && message.text.endsWith(']')) {
      try {
        const links = JSON.parse(message.text) as RelatedLink[];
        return (
          <div key={message.id} className="flex items-start space-x-3 mt-4">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-link text-white"></i>
            </div>
            <div className="flex-1">
              <div className={`${styles.chatBubbleAi} max-w-md p-4`}>
                <p className="text-text-primary text-sm mb-3">相关内容推荐：</p>
                <div className="space-y-2">
                  {links.map((link, index) => (
                    <Link 
                      key={index}
                      to={link.href} 
                      className="block text-accent hover:text-opacity-80 text-sm underline"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>{link.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      } catch (e) {
        // 如果解析失败，当作普通文本消息处理
      }
    }

    return (
      <div key={message.id} className="flex items-start space-x-3">
        {message.sender === 'user' ? (
          <>
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <img src="https://s.coze.cn/image/NsgoJj9BGaU/" alt="用户头像" className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex-1">
              <div className={`${styles.chatBubbleUser} max-w-md p-4`}>
                <p className="text-white">{message.text}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-robot text-white"></i>
            </div>
            <div className="flex-1">
              <div className={`${styles.chatBubbleAi} max-w-md p-4`}>
                <p className="text-text-primary">{message.text}</p>
              </div>
            </div>
          </>
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
            <Link to="/ai-consult" className="text-accent font-medium border-b-2 border-accent py-1">智能咨询</Link>
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
                onKeyPress={handleGlobalSearch}
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
                <img src="https://s.coze.cn/image/SBx_bf9jRis/" 
                     alt="用户头像" className="w-8 h-8 rounded-full" />
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
            <Link to="/home" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-home text-lg"></i>
              {!sidebarCollapsed && <span>首页</span>}
            </Link>
            <Link to="/plan" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-file-alt text-lg"></i>
              {!sidebarCollapsed && <span>我的方案</span>}
            </Link>
            <Link to="/ai-consult" className="flex items-center space-x-3 p-3 rounded-lg bg-accent text-white">
              <i className="fas fa-comments text-lg"></i>
              {!sidebarCollapsed && <span>智能咨询</span>}
            </Link>
            <Link to="/personal-center" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-heart text-lg"></i>
              {!sidebarCollapsed && <span>我的收藏</span>}
            </Link>
            <Link to="/physical-test" className="flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:bg-glass-bg hover:text-accent transition-all">
              <i className="fas fa-stethoscope text-lg"></i>
              {!sidebarCollapsed && <span>体质测试</span>}
            </Link>
          </nav>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className={`${sidebarCollapsed ? styles.mainContentCollapsed : styles.mainContentExpanded} pt-16 min-h-screen transition-all duration-300`}>
        <div className="p-6 h-screen flex flex-col">
          {/* 页面头部 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">智能咨询</h2>
                <nav className="text-sm text-text-secondary">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>智能咨询</span>
                </nav>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={handleNewChat}
                  className={`px-4 py-2 ${styles.glassButton} rounded-lg text-accent font-medium hover:bg-accent hover:text-white transition-all`}
                >
                  <i className="fas fa-plus mr-2"></i>新对话
                </button>
                <button 
                  onClick={handleHistoryClick}
                  className={`px-4 py-2 ${styles.glassButton} rounded-lg text-accent font-medium hover:bg-accent hover:text-white transition-all`}
                >
                  <i className="fas fa-history mr-2"></i>历史记录
                </button>
              </div>
            </div>
          </div>

          {/* 对话区域 */}
          <div className={`flex-1 flex flex-col ${styles.glassCard} rounded-xl overflow-hidden`}>
            {/* 对话历史区 */}
            <div ref={chatHistoryRef} className="flex-1 p-6 overflow-y-auto space-y-4">
              {/* AI欢迎消息 */}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-robot text-white"></i>
                </div>
                <div className="flex-1">
                  <div className={`${styles.chatBubbleAi} max-w-md p-4`}>
                    <p className="text-text-primary">您好！我是您的智能养生顾问。我可以为您提供个性化的滋补养生建议。请问有什么可以帮助您的吗？</p>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button 
                      onClick={() => handleQuickReply('我想了解自己的体质')}
                      className={`px-4 py-2 ${styles.glassButton} rounded-lg text-sm text-accent hover:bg-accent hover:text-white transition-all`}
                    >
                      我想了解自己的体质
                    </button>
                    <button 
                      onClick={() => handleQuickReply('推荐适合我的滋补品')}
                      className={`px-4 py-2 ${styles.glassButton} rounded-lg text-sm text-accent hover:bg-accent hover:text-white transition-all`}
                    >
                      推荐适合我的滋补品
                    </button>
                    <button 
                      onClick={() => handleQuickReply('冬季如何养生')}
                      className={`px-4 py-2 ${styles.glassButton} rounded-lg text-sm text-accent hover:bg-accent hover:text-white transition-all`}
                    >
                      冬季如何养生
                    </button>
                  </div>
                </div>
              </div>

              {/* 动态生成的对话消息 */}
              {chatHistory.map(renderChatMessage)}

              {/* 正在输入指示器 */}
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-robot text-white"></i>
                  </div>
                  <div className="flex-1">
                    <div className={`${styles.chatBubbleAi} max-w-md p-4`}>
                      <div className={styles.typingIndicator}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 智能体主动提问区 */}
            {showAIQuestionArea && (
              <div className="p-6 border-t border-glass-border">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-robot text-white"></i>
                  </div>
                  <div className="flex-1">
                    <div className={`${styles.chatBubbleAi} max-w-md p-4`}>
                      <p className="text-text-primary mb-4">{aiQuestionText}</p>
                      <div className="space-y-2">
                        {aiQuestionOptions.map((option, index) => (
                          <button 
                            key={index}
                            onClick={() => handleAIQuestionOption(option)}
                            className={`w-full text-left px-4 py-3 ${styles.glassButton} rounded-lg text-sm text-accent hover:bg-accent hover:text-white transition-all mb-2`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 输入区 */}
            <div className={`${styles.chatInputArea} p-6 border-t border-glass-border`}>
              <div className="flex items-end space-x-4">
                {/* 输入框 */}
                <div className="flex-1 relative">
                  <textarea 
                    ref={messageInputRef}
                    value={messageInputValue}
                    onChange={(e) => {
                      setMessageInputValue(e.target.value);
                      adjustTextareaHeight();
                    }}
                    onKeyPress={handleInputKeyPress}
                    placeholder="输入您的问题，或点击语音按钮..." 
                    className={`w-full px-4 py-3 pr-12 ${styles.glassEffect} rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent`}
                    rows={1}
                    style={{ maxHeight: '120px' }}
                  />
                  {/* 发送按钮 */}
                  <button 
                    onClick={handleSendClick}
                    className="absolute right-3 bottom-3 w-8 h-8 bg-accent text-white rounded-lg flex items-center justify-center hover:bg-opacity-90 transition-all"
                  >
                    <i className="fas fa-paper-plane text-sm"></i>
                  </button>
                </div>
                
                {/* 语音输入按钮 */}
                <button 
                  onClick={handleVoiceClick}
                  className={`w-12 h-12 ${styles.glassButton} ${isRecording ? styles.voiceRecording : ''} rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all`}
                >
                  <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'} text-lg`}></i>
                </button>
                
                {/* 图片上传按钮 */}
                <button 
                  onClick={handleImageClick}
                  className={`w-12 h-12 ${styles.glassButton} rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all`}
                >
                  <i className="fas fa-image text-lg"></i>
                </button>
              </div>
              
              {/* 图片上传预览 */}
              {showImagePreview && (
                <div className="mt-4">
                  <div className="flex items-center space-x-4">
                    <img src={previewImageUrl} alt="预览" className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-sm text-text-secondary">确认上传这张图片吗？</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleConfirmUpload}
                        className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-opacity-90 transition-all"
                      >
                        确认
                      </button>
                      <button 
                        onClick={handleCancelUpload}
                        className={`px-4 py-2 ${styles.glassButton} rounded-lg text-sm text-accent hover:bg-accent hover:text-white transition-all`}
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIConsultPage;

