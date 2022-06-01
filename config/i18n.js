// @ts-check

const defaultLocale = 'ko';

/**
 * @type {['ko', 'en']}
 */
const locales = ['ko', 'en'];

/**
 * @type {{[key in 'ko' | 'en']: import('@docusaurus/types').I18nLocaleConfig}}
 */
const localeConfigs = {
  ko: {
    label: 'Korean',
    direction: 'ltr',
    htmlLang: 'ko-kr',
    calendar: 'gregory',
  },
  en: {
    label: 'English',
    direction: 'ltr',
    htmlLang: 'en-US',
    calendar: 'gregory',
  },
};

module.exports = Object.assign(
  {},
  {
    defaultLocale,
    locales,
    localeConfigs,
  },
);
