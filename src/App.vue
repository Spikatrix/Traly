<template>
  <GitHubLink />
  <TralyHeader />
  <NoteComponent />
  <StepContainer v-for="(step, index) in steps"
     :stepIndex="index"
     :step="step"
     v-bind:dataStore="dataStore"
     v-on:translateLyrics="translateLyrics" />
  <TralyFooter />
</template>

<script>
import store from './js/DataStore.js'

import GitHubLink from './components/GitHubLink.vue'
import StepContainer from './components/StepContainer.vue'
import TralyHeader from './components/TralyHeader.vue'
import NoteComponent from './components/NoteComponent.vue'
import TralyFooter from './components/TralyFooter.vue'

import getFileContents from './js/FileReader.js'
import LyricManager from './js/LyricManager.js'

export default {
  name: 'App',
  components: {
    GitHubLink,
    TralyHeader,
    StepContainer,
    NoteComponent,
    TralyFooter
  },
  data() {
    return {
      dataStore: store,
      steps: [
              {
                title: 'Upload your LRC file',
                type: 'File',
                placeholderText: 'Upload'
              },
              {
                title: 'Select the language to translate to',
                type: 'SelectBox',
                placeholderText: 'Select a language'
              },
              {
                title: 'Copy the translations and paste it below',
                type: 'TextBox',
                placeholderText: 'Paste the translated lines here'
              },
              {
                title: 'Download the LRC file with the translations',
                type: 'Button',
                placeholderText: 'Download'
              }
             ],
      fileContents: undefined,
      lyrics: undefined
    }
  },
  methods: {
    updateLink() {
      this.dataStore.link = 'https://translate.google.com/?sl=auto&tl=' + this.dataStore.selectedLang +
                            '&text=' + this.lyrics.replace(/\n/g, '%0A') + '&op=translate';
    },
    translateLyrics() {
      if (this.fileContents == undefined || this.dataStore.translatedLyrics.length == 0) {
        alert("Please complete all previous steps");
        return;
      }

      const finalContents = LyricManager.generateTranslatedContents(this.fileContents, this.dataStore.translatedLyrics);
      const fileName = this.dataStore.file.name.replace(/\.[^/.]+$/, "") + '_' + this.dataStore.selectedLang + '.lrc';
      this.prepareDownload(fileName, finalContents);
    },
    prepareDownload(fileName, fileContents) {
      var element = document.createElement('a');
      // Chrome Android annoyingly adds a .txt extension if I use 'text/plain' instead of 'text/lrc'
      element.setAttribute('href', 'data:text/lrc;charset=utf-8,' + encodeURIComponent(fileContents));
      element.setAttribute('download', fileName);
      element.click();
    }
  },
  watch: {
    'dataStore.file': async function(newFile) {
      this.fileContents = (await getFileContents(newFile)).replace(/\r\n?/g, '\n'); // Apparently, files with dos line endings (CRLF) causes issues
      this.lyrics = LyricManager.extractLyrics(this.fileContents);
      this.updateLink();
    },
    'dataStore.selectedLang': function(newLang) {
      if (this.lyrics != undefined) {
        this.updateLink();
      }
    }
  }
}
</script>
