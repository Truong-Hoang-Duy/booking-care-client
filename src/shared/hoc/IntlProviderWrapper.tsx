import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/vi';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/vi';

import { LanguageUtils } from '../../utils';
import { IntlProvider } from 'react-intl';
import { useAppSelector } from '@/utils/useGetData';

const IntlProviderWrapper = ({ children }: any) => {
  const messages = LanguageUtils.getFlattenedMessages();
  const { language } = useAppSelector((state) => state.lang);
  return (
    <IntlProvider locale={language} messages={messages[language]} defaultLocale="vi">
      {children}
    </IntlProvider>
  );
};

export default IntlProviderWrapper;
