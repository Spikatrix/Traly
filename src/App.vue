<template>
	<GitHubLink />
	<TralyHeader />
	<NoteComponent />
	<StepContainer
		v-for="(step, index) in steps"
    :key="index"
		:stepIndex="index"
		:step="step"
		:dataStore="dataStore"
		@translateLyrics="translateLyrics"
	/>
	<LRCEditorLink />
	<TralyFooter />
</template>

<script>
import store from "./js/DataStore.js";

import GitHubLink from "./components/GitHubLink.vue";
import StepContainer from "./components/StepContainer.vue";
import TralyHeader from "./components/TralyHeader.vue";
import NoteComponent from "./components/NoteComponent.vue";
import LRCEditorLink from "./components/LRCEditorLink.vue";
import TralyFooter from "./components/TralyFooter.vue";

import getFileContents from "./js/FileReader.js";
import LyricManager from "./js/LyricManager.js";

export default {
	name: "App",
	components: {
		GitHubLink,
		TralyHeader,
		StepContainer,
		NoteComponent,
		LRCEditorLink,
		TralyFooter,
	},
	data() {
		return {
			dataStore: store,
			steps: [
				{
					title: "Upload your LRC file",
					type: "File",
					placeholderText: "Upload",
				},
				{
					title: "Select the language to translate to",
					type: "SelectBox",
					placeholderText: "Select a language",
				},
				{
					title: "Copy the translations and paste it below",
					type: "TextBox",
					placeholderText: "Paste the translated lines here",
				},
				{
					title: "Download the LRC file with the translations",
					type: "Button",
					placeholderText: "Download",
				},
			],
			fileContents: undefined,
			lyrics: undefined,
		};
	},
	methods: {
		updateLink() {
			this.dataStore.link = "https://translate.google.com/?sl=auto&tl=" + this.dataStore.selectedLang +
				                    "&text=" + encodeURIComponent(this.lyrics) + "&op=translate";
		},
		translateLyrics() {
			if (this.fileContents == undefined || this.dataStore.translatedLyrics.length == 0) {
				alert("Please complete all previous steps");
				return;
			}

			const finalContents = LyricManager.generateTranslatedContents(this.fileContents, this.dataStore.translatedLyrics);
			const fileName = this.dataStore.file.name.replace(/\.[^/.]+$/, "") + "_" + this.dataStore.selectedLang + ".lrc";
			this.prepareDownload(fileName, finalContents);
		},
		prepareDownload(fileName, fileContents) {
			var element = document.createElement("a");
			// Chrome Android annoyingly adds a .txt extension if I use 'text/plain' instead of 'text/lrc'
			element.setAttribute("href", "data:text/lrc;charset=utf-8," + encodeURIComponent(fileContents));
			element.setAttribute("download", fileName);
			element.click();
		},
	},
	watch: {
		"dataStore.file"(newFile) {
			getFileContents(newFile)
				.then((result) => {
					// Apparently, files with DOS line endings (CRLF) causes issues which is why replace is used
					this.fileContents = result.replace(/\r\n?/g, "\n");
					this.lyrics = LyricManager.extractLyrics(this.fileContents);
					this.updateLink();
				})
				.catch((error) => {
					console.error(error);
					alert("An error occured while reading the selected file: " + error);
					this.fileContents = undefined;
				});
		},
		"dataStore.selectedLang": function () {
			if (this.lyrics != undefined) {
				this.updateLink();
			}
		},
	},
};
</script>
