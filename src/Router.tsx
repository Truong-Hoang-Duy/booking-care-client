import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { PrivateRoute } from './components/Common';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'admin',
        element: (
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

const Router = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
