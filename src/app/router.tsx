import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { AuthPage } from '../pages/AuthPage';
import { BoardPage } from '../pages/BoardPage';
import { BoardSettingsPage } from '../pages/BoardSettingsPage';
import { JoinBoardPage } from '../pages/JoinBoardPage';
import { NotFoundPage } from '../pages/NotFoundPage';
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
                        path: '/boards/:boardId/settings',
                        element: <BoardSettingsPage />
                    },
                    {
                        path: '/join/:shareToken',
                        element: <JoinBoardPage />
                    },
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