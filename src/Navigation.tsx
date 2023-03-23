import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/Common';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="login" element={<LoginPage />}></Route>
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        ></Route>
      </Route>

      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

export default Navigation;