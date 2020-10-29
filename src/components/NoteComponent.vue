<template>
  <div class="note-container">
    <div class="note-header">
      <img alt="Warning sign" src="../assets/images/warning.svg" />
      <div class="note-title">Note</div>
    </div>
    <div class="note-contents">
      Translations in LRC files separated by the ^ character is a non-standard feature and hence is supported in a few applications only. On Android, Huawei's stock music player supports this.
      <!-- If you know of other applications that support this, open an issue with a linked PR. It's recommended to add a screenshot of the application showing the support for this in the issue -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteComponent',
  data() {
    return {
    }
  }
}
</script>
