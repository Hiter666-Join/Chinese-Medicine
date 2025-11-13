import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import P_home from '../pages/p-home';
import P_login_register from '../pages/p-login_register';
import P_personal_center from '../pages/p-personal_center';
import P_physical_test from '../pages/p-physical_test';
import P_lifestyle_questionnaire from '../pages/p-lifestyle_questionnaire';
import P_plan from '../pages/p-plan';
import P_knowledge_base from '../pages/p-knowledge_base';
import P_ai_consult from '../pages/p-ai_consult';
import P_content from '../pages/p-content';
import P_product_recommend from '../pages/p-product_recommend'; //修改为默认导入
import P_search_result from '../pages/p-search_result';
import NotFoundPage from './NotFoundPage';
import ErrorPage from './ErrorPage';

function Listener() {
  const location = useLocation();
  useEffect(() => {
    const pageId = 'P-' + location.pathname.replace('/', '').toUpperCase();
    console.log('当前pageId:', pageId, ', pathname:', location.pathname, ', search:', location.search);
    if (typeof window === 'object' && window.parent && window.parent.postMessage) {
      window.parent.postMessage({
        type: 'chux-path-change',
        pageId: pageId,
        pathname: location.pathname,
        search: location.search,
      }, '*');
    }
  }, [location]);

  return <Outlet />;
}

// createBrowserRouter 创建路由
const router = createBrowserRouter([
  {
    path: '/',
    element: <Listener />,
    children: [
      {
        path: '/',
        element: <Navigate to='/login-register' replace={true} />,
      },
      {
        path: '/home',
        element: (
          <ErrorBoundary>
            <P_home />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/login-register',
        element: (
          <ErrorBoundary>
            <P_login_register />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/personal-center',
        element: (
          <ErrorBoundary>
            <P_personal_center />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/physical-test',
        element: (
          <ErrorBoundary>
            <P_physical_test />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/lifestyle-questionnaire',
        element: (
          <ErrorBoundary>
            <P_lifestyle_questionnaire />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/plan',
        element: (
          <ErrorBoundary>
            <P_plan />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/knowledge-base',
        element: (
          <ErrorBoundary>
            <P_knowledge_base />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/ai-consult',
        element: (
          <ErrorBoundary>
            <P_ai_consult />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/content',
        element: (
          <ErrorBoundary>
            <P_content />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/product-recommend',
        element: (
          <ErrorBoundary>
            <P_product_recommend />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/search-result',
        element: (
          <ErrorBoundary>
            <P_search_result />
          </ErrorBoundary>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  }
]);

export default router;
