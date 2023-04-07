import { authActions } from '@/modules/Auth/authSlice';
import { langActions } from '@/modules/Lang/langSlice';
import { useAppDispatch, useAppSelector } from '@/utils/useGetData';
import { FormattedMessage } from 'react-intl';
import './AdminHeaderStyle.scss';
import { AdminNavigatorProps, adminMenu, doctorMenu } from './AdminNavigator/AdminMenu';
import AdminNavigator from './AdminNavigator/AdminNavigator';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { USER_ROLE } from '@/utils/constants';

export const AdminHeader = () => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.lang);
  const response = useAppSelector((state) => state.auth);

  const [menuApp, setMenuApp] = useState<AdminNavigatorProps[]>([]);

  useEffect(() => {
    if (response.data && !_.isEmpty(response.data)) {
      const { roleId } = response.data;
      if (roleId === USER_ROLE.ADMIN) {
        setMenuApp(adminMenu);
      }
      if (roleId === USER_ROLE.DOCTOR) {
        setMenuApp(doctorMenu);
      }
    }
  }, []);

  const handleChangeLanguage = (lang: string) => {
    dispatch(langActions.switchLanguage(lang));
  };

  return (
    <nav className="navbar navbar-admin navbar-expand-lg navbar-primary text-white p-0">
      <div className="container navbar-admin-container d-flex justify-content-between">
        <a className="navbar-brand text-white p-0" href="/system">
          <AdminNavigator menus={menuApp} />
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
