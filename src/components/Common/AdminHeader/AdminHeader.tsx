import { authActions } from '@/modules/Auth/authSlice';
import { langActions } from '@/modules/Lang/langSlice';
import { LoginData } from '@/services';
import { useAppDispatch, useAppSelector } from '@/utils/useGetData';
import { FormattedMessage } from 'react-intl';
import './AdminHeaderStyle.scss';
import { adminMenu } from './AdminNavigator/AdminMenu';
import AdminNavigator from './AdminNavigator/AdminNavigator';

export const AdminHeader = () => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.lang);
  const response = useAppSelector((state) => state.auth);

  const handleChangeLanguage = (lang: string) => {
    dispatch(langActions.switchLanguage(lang));
  };

  return (
    <nav className="navbar navbar-admin navbar-expand-lg navbar-primary text-white p-0">
      <div className="container navbar-admin-container d-flex justify-content-between">
        <a className="navbar-brand text-white p-0" href="/system">
          <AdminNavigator menus={adminMenu} />
        </a>

        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="home.header.welcome" />, {response.data?.firstName}
          </span>
          <span
            className={language === 'vi' ? 'language-vi active' : 'language-vi'}
            onClick={() => handleChangeLanguage('vi')}
          >
            VN
          </span>
          <span
            className={language === 'en' ? 'language-en active' : 'language-en'}
            onClick={() => handleChangeLanguage('en')}
          >
            EN
          </span>
          <div
            className="logout-social"
            onClick={() => dispatch(authActions.logout())}
            title="Log out"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};
