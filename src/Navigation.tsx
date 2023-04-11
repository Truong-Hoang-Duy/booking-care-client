import { Outlet, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/Common';
import { DoctorScheduleManage, UserManage } from './components/Layout/Admin';
import DoctorManage from './components/Layout/Admin/DoctorManage/DoctorManage';
import { DetailDoctor } from './components/Layout/Doctor/DetailDoctor';
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
          path="system"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        >
          <Route path="user-manage" element={<UserManage />}></Route>
          <Route path="doctor-manage" element={<DoctorManage />}></Route>
          <Route path="doctor/manage-schedule" element={<DoctorScheduleManage />}></Route>
        </Route>
        <Route path="detail-doctor/:id" element={<DetailDoctor />}></Route>
      </Route>

      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

export default Navigation;
