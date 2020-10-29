import langs from './Languages.js'

export default {
  file: undefined,
  languages: langs,
  selectedLang: Object.keys(langs)[0],
  link: "javascript:alert(\'Please complete all previous steps\');",
  translatedLyrics: ''
}
