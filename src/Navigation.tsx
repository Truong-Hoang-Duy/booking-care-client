import { Outlet, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/Common';
import { UserManage } from './components/Layout/Admin';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index={true} element={<HomePage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        >
          <Route path="user-manage" element={<UserManage />}></Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

export default Navigation;
