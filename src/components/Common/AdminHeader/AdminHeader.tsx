import { history } from '@/App';
import { authActions } from '@/modules/Auth/authSlice';
import { useAppDispatch } from '@/utils/useGetData';
import './AdminHeaderStyle.scss';

export const AdminHeader = () => {
  const dispatch = useAppDispatch();

  const handle = () => {
    dispatch(authActions.logout());
    // history.push('/');
  };
  return (
    <nav className="navbar navbar-admin navbar-expand-lg navbar-primary bg-primary text-white ">
      <div className="container navbar-admin-container d-flex justify-content-between">
        <a className="navbar-brand text-white" href="/admin">
          Hệ thống
        </a>
        <div className="logout-social" onClick={handle}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
      </div>
    </nav>
  );
};
