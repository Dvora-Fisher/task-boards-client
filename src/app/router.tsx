import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { AuthPage } from '../pages/AuthPage';
import { BoardPage } from '../pages/BoardPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AboutPage } from '../pages/AboutPage';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute';
export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        path: "/",
                        element: <DashboardPage />
                    },

                    {
                        path: '/boards/:boardId',
                        element: <BoardPage />
                    },
                    {
                        path: '/about',
                        element: <AboutPage />
                    }
                ]
            },
        ]
    },
    {
        path: '/login',
        element: <AuthPage />
    },
    {
        path: '/register',
        element: <AuthPage />
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]);