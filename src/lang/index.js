import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'iview/dist/locale/en-US.js' // iview lang
import elementZhLocale from 'iview/dist/locale/en-US.js'// iview lang
import elementJaLocale from 'iview/dist/locale/ja-JP.js'// iview lang
import enLocale from './en'
import zhLocale from './zh'
import jaLocale from './ja'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    },
    ja: {
        ...jaLocale,
        ...elementJaLocale
    }
}
export function getLanguage() {
    // const chooseLanguage = Cookies.get('language')
    // if (chooseLanguage) return chooseLanguage

    // if has not choose language
    console.log(navigator)
    const language = (navigator.language || navigator.browserLanguage).toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }
    return 'zh'
}
const i18n = new VueI18n({
    // set locale
    // options: en | zh | es
    locale: getLanguage(),
    // set locale messages
    messages
})

export default i18n
