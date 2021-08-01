<template>
  <div class="step-container">
    <div class="rounded-step-title">STEP {{ stepIndex + 1 }}</div>
    <div class="step-container-contents">
      <a v-if="isTextBox" :href="dataStore.link" ref="linkTitle">{{ step.title }}</a>
      <span v-else>{{ step.title }}</span>

      <label v-if="isFileUploadButton" class="step-file-upload">
        <input type="file" accept=".lrc" ref="fileUploadButton" @change="updateSelectedFile">
        <button @click="clickUploadButton">{{ step.placeholderText }}</button>
      </label>

      <select v-if="isSelectBox" v-model="dataStore.selectedLang">
        <option disabled value="">{{ step.placeholderText }}</option>
        <option v-for="(name, value) in dataStore.languages" :key="value" :value="value">{{ name }} ({{ value }})</option>
      </select>

      <textarea v-if="isTextBox" :placeholder="step.placeholderText" v-model="dataStore.translatedLyrics"></textarea>

      <button v-if="isButton" @click="translateLyrics">{{ step.placeholderText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepContainer',
  props: {
    stepIndex: {
      type: Number,
      required: true
    },
    step: {
      type: Object,
      required: true
    },
    dataStore: Object
  },
  data() {
    return {
    }
  },
  computed: {
    isButton: function() {
      return this.step.type == 'Button'
    },
    isSelectBox: function() {
      return this.step.type == 'SelectBox'
    },
    isFileUploadButton: function() {
      return this.step.type == 'File'
    },
    isTextBox: function() {
      return this.step.type == 'TextBox'
    }
  },
  methods: {
    clickUploadButton() {
      this.$refs.fileUploadButton.click();
    },
    updateSelectedFile(event) {
      if (event.target.files[0] == undefined) { // File selection dialog was closed
        return;
      }

      this.step.placeholderText = event.target.files[0].name;
      this.dataStore.file = event.target.files[0];
    },
    translateLyrics() {
      this.$emit('translateLyrics');
    }
  },
  watch: {
    'dataStore.link'() {
      if (this.$refs.linkTitle != undefined) {
        this.$refs.linkTitle.target = '_blank';
      }
    }
  }
}
</script>
