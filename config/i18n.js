// @ts-check

const defaultLocale = 'ko';

/**
 * @type {['ko']}
 */
const locales = ['ko'];

/**
 * @type {{['ko']: import('@docusaurus/types').I18nLocaleConfig}}
 */
const localeConfigs = {
  ko: {
    label: '한국어',
    direction: 'ltr',
    htmlLang: 'ko-kr',
    calendar: 'gregory',
  },
};

module.exports = Object.assign({}, { defaultLocale, locales, localeConfigs });
