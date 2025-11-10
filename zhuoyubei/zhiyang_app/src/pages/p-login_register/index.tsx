

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface FormData {
  phone: string;
  code: string;
  password?: string;
  newPassword?: string;
}

type TabType = 'login' | 'register' | 'forgot';

const LoginRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [loginForm, setLoginForm] = useState<FormData>({ phone: '', code: '' });
  const [registerForm, setRegisterForm] = useState<FormData>({ phone: '', code: '', password: '' });
  const [forgotForm, setForgotForm] = useState<FormData>({ phone: '', code: '', newPassword: '' });
  const [loginCountdown, setLoginCountdown] = useState(0);
  const [registerCountdown, setRegisterCountdown] = useState(0);
  const [forgotCountdown, setForgotCountdown] = useState(0);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '登录注册 - 滋智通';
    return () => { document.title = originalTitle; };
  }, []);

  const startCountdown = (setCountdown: React.Dispatch<React.SetStateAction<number>>) => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGetCode = (phone: string, setCountdown: React.Dispatch<React.SetStateAction<number>>) => {
    if (!phone) {
      alert('请先输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号');
      return;
    }
    console.log('发送验证码到手机号：', phone);
    startCountdown(setCountdown);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.phone || !loginForm.code) {
      alert('请填写完整信息');
      return;
    }
    console.log('登录提交：', loginForm);
    alert('登录成功！');
    navigate('/home');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.phone || !registerForm.code) {
      alert('请填写完整信息');
      return;
    }
    console.log('注册提交：', registerForm);
    alert('注册成功！');
    navigate('/home');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotForm.phone || !forgotForm.code || !forgotForm.newPassword) {
      alert('请填写完整信息');
      return;
    }
    console.log('找回密码提交：', forgotForm);
    alert('密码重置成功！');
    setActiveTab('login');
    setLoginForm(prev => ({ ...prev, phone: forgotForm.phone }));
  };

  const handleWechatLogin = () => {
    console.log('需要调用第三方接口实现微信登录功能');
    alert('微信登录功能开发中...');
  };

  const handleFooterLink = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    console.log(`查看${type}`);
    alert(`${type}页面开发中...`);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <header className={`fixed top-0 left-0 right-0 h-16 ${styles.glassEffect} z-50`}>
        <div className="flex items-center justify-center h-full px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <i className="fas fa-leaf text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-text-primary">滋智通</h1>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="pt-16 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className={`${styles.glassCard} rounded-2xl p-8`}>
            {/* 标题 */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">欢迎来到滋智通</h2>
              <p className="text-sm text-text-secondary">开启您的智能滋补养生之旅</p>
            </div>

            {/* Tab切换 */}
            <div className="flex mb-6 bg-glass-bg rounded-lg p-1">
              <button 
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 px-4 text-center rounded-md font-medium transition-all ${
                  activeTab === 'login' ? styles.tabActive : styles.tabInactive
                }`}
              >
                登录
              </button>
              <button 
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-3 px-4 text-center rounded-md font-medium transition-all ${
                  activeTab === 'register' ? styles.tabActive : styles.tabInactive
                }`}
              >
                注册
              </button>
              <button 
                onClick={() => setActiveTab('forgot')}
                className={`flex-1 py-3 px-4 text-center rounded-md font-medium transition-all ${
                  activeTab === 'forgot' ? styles.tabActive : styles.tabInactive
                }`}
              >
                找回密码
              </button>
            </div>

            {/* 登录表单 */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="login-phone" className="block text-sm font-medium text-text-primary mb-2">手机号</label>
                  <input 
                    type="tel" 
                    id="login-phone" 
                    value={loginForm.phone}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-4 py-3 ${styles.glassEffect} rounded-lg text-text-primary placeholder-text-secondary ${styles.formInputFocus}`}
                    placeholder="请输入手机号" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="login-code" className="block text-sm font-medium text-text-primary mb-2">验证码</label>
                  <div className="flex space-x-3">
                    <input 
                      type="text" 
                      id="login-code" 
                      value={loginForm.code}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, code: e.target.value }))}
                      className={`flex-1 px-4 py-3 ${styles.glassEffect} rounded-lg text-text-primary placeholder-text-secondary ${styles.formInputFocus}`}
                      placeholder="请输入验证码" 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => handleGetCode(loginForm.phone, setLoginCountdown)}
                      disabled={loginCountdown > 0}
                      className={`px-4 py-3 ${styles.glassButton} rounded-lg text-accent font-medium whitespace-nowrap`}
                    >
                      {loginCountdown > 0 ? `${loginCountdown}秒后重发` : '获取验证码'}
                    </button>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all"
                >
                  登录
                </button>
              </form>
            )}

            {/* 注册表单 */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label htmlFor="register-phone" className="block text-sm font-medium text-text-primary mb-2">手机号</label>
                  <input 
                    type="tel" 
                    id="register-phone" 
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-4 py-3 ${styles.glassEffect} rounded-lg text-text-primary placeholder-text-secondary ${styles.formInputFocus}`}
                    placeholder="请输入手机号" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="register-code" className="block text-sm font-medium text-text-primary mb-2">验证码</label>
                  <div className="flex space-x-3">
                    <input 
                      type="text" 
                      id="register-code" 
                      value={registerForm.code}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, code: e.target.value }))}
                      className={`flex-1 px-4 py-3 ${styles.glassEffect} rounded-lg text-text-primary placeholder-text-secondary ${styles.formInputFocus}`}
                      placeholder="请输入验证码" 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => handleGetCode(registerForm.phone, setRegisterCountdown)}
                      disabled={registerCountdown > 0}
                      className={`px-4 py-3 ${styles.glassButton} rounded-lg text-accent font-medium whitespace-nowrap`}
                    >
                      {registerCountdown > 0 ? `${registerCountdown}秒后重发` : '获取验证码'}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="register-password" className="block text-sm font-medium text-text-primary mb-2">设置密码（可选）</label>
                  <input 
                    type="password" 
                    id="register-password" 
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                    className={`w-full px-4 py-3 ${styles.glassEffect} rounded-lg text-text-primary placeholder-text-secondary ${styles.formInputFocus}`}
                    placeholder="请设置登录密码" 
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all"
                >
                  注册
                </button>
              </form>
            )}

            {/* 找回密码表单 */}
            {activeTab === 'forgot' && (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label htmlFor="forgot-phone" className="block text-sm font-medium text-text-primary mb-2">手机号</label>
                  <input 
                    type="tel" 
                    id="forgot-phone" 
                    value={forgotForm.phone}
                    onChange={(e) => setForgotForm(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-4 py-3 ${styles.glassEffect} rounded-lg text-text-primary placeholder-text-secondary ${styles.formInputFocus}`}
                    placeholder="请输入手机号" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="forgot-code" className="block text-sm font-medium text-text-primary mb-2">验证码</label>
                  <div className="flex space-x-3">
                    <input 
                      type="text" 
                      id="forgot-code" 
                      value={forgotForm.code}
                      onChange={(e) => setForgotForm(prev => ({ ...prev, code: e.target.value }))}
                      className={`flex-1 px-4 py-3 ${styles.glassEffect} rounded-lg text-text-primary placeholder-text-secondary ${styles.formInputFocus}`}
                      placeholder="请输入验证码" 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => handleGetCode(forgotForm.phone, setForgotCountdown)}
                      disabled={forgotCountdown > 0}
                      className={`px-4 py-3 ${styles.glassButton} rounded-lg text-accent font-medium whitespace-nowrap`}
                    >
                      {forgotCountdown > 0 ? `${forgotCountdown}秒后重发` : '获取验证码'}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-text-primary mb-2">新密码</label>
                  <input 
                    type="password" 
                    id="new-password" 
                    value={forgotForm.newPassword}
                    onChange={(e) => setForgotForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className={`w-full px-4 py-3 ${styles.glassEffect} rounded-lg text-text-primary placeholder-text-secondary ${styles.formInputFocus}`}
                    placeholder="请输入新密码" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-accent text-white rounded-lg font-medium hover:bg-opacity-90 transition-all"
                >
                  重置密码
                </button>
              </form>
            )}

            {/* 微信登录 */}
            {activeTab !== 'forgot' && (
              <div className="mt-8 pt-6 border-t border-glass-border">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-glass-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-text-secondary">或使用微信登录</span>
                  </div>
                </div>
                <button 
                  onClick={handleWechatLogin}
                  className={`w-full py-3 ${styles.wechatButton} text-white rounded-lg font-medium flex items-center justify-center space-x-2`}
                >
                  <i className="fab fa-weixin text-xl"></i>
                  <span>微信登录</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 底部区域 */}
      <footer className={`${styles.glassEffect} py-6`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-text-secondary">© 2024 滋智通. 保留所有权利.</p>
              <p className="text-xs text-text-secondary mt-1">京ICP备12345678号-1</p>
            </div>
            <div className="flex space-x-6">
              <a 
                href="#" 
                onClick={(e) => handleFooterLink(e, '隐私政策')}
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                隐私政策
              </a>
              <a 
                href="#" 
                onClick={(e) => handleFooterLink(e, '服务条款')}
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                服务条款
              </a>
              <a 
                href="#" 
                onClick={(e) => handleFooterLink(e, '联系我们')}
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                联系我们
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginRegisterPage;

