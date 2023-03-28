import { history } from '@/App';
import { authActions } from '@/modules/Auth/authSlice';
import { langActions } from '@/modules/Lang/langSlice';
import { useAppDispatch, useAppSelector } from '@/utils/useGetData';
import { FormattedMessage } from 'react-intl';
import './AdminHeaderStyle.scss';

export const AdminHeader = () => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.lang);

  const handleChangeLanguage = (lang: string) => {
    dispatch(langActions.switchLanguage(lang));
  };

  return (
    <nav className="navbar navbar-admin navbar-expand-lg navbar-primary text-white ">
      <div className="container navbar-admin-container d-flex justify-content-between">
        <a className="navbar-brand text-white" href="/admin">
          <FormattedMessage id="menu.system.header" />
        </a>

        <div className="languages">
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
