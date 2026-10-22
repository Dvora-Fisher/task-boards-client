import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { AuthPage } from '../pages/AuthPage';
import { BoardPage } from '../pages/BoardPage';
import { BoardSettingsPage } from '../pages/BoardSettingsPage';
import { JoinBoardPage } from '../pages/JoinBoardPage';
import { NotFoundPage } from '../pages/NotFoundPage';
export const router = createBrowserRouter([
{
    path : "/",
    element : <DashboardPage/>
},
{
    path : '/login',
    element : <AuthPage/>
},
{
    path : '/register',
    element : <AuthPage/>
},
{
    path : '/boards/:boardId',
    element : <BoardPage/>
},
{
    path : '/boards/:boardId/settings',
    element : <BoardSettingsPage/>
},
{
    path : '/join/:shareToken',
    element : <JoinBoardPage/>
},
{
    path : '*',
    element : <NotFoundPage/>
}
]);