export default function ({ app }) {
    app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, context) => {
      context.$vuetify.rtl = newLocale === 'fa'
      context.$vuetify.lang.current = newLocale
    }
  }