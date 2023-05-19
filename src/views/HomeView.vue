<script setup>
import { ref } from "vue";
import exifr from "exifr";

import ComfyPrompt from "../components/ComfyPrompt.vue";
import DefaultPrompt from "../components/DefaultPrompt.vue";
import IconCheck from "../components/icons/IconCheck.vue";
let rParams = ref(null);
let rPromptType = ref(null);
let rShowMessage = ref(null);

function handleFile(e) {
  const fileList = e.target.files;
  let files = Array.from(fileList);
  console.log("files", files);

  exifr.parse(files[0], true).then((res) => {
    let params;

    if (res.userComment) {
      params = new TextDecoder().decode(res.userComment).replace("UNICODE", "");
      rPromptType.value = "default";
    } else if (res.parameters) {
      params = res.params;
      rPromptType.value = "default";
    } else if (res.workflow) {
      // comfyui
      params = res;
      rPromptType.value = "comfyui";
    }

    rParams.value = params;
    console.log(params);
  });
}
function showCopyMessage() {
  rShowMessage.value = "Copied to clipboard!";
  setTimeout(() => {
    rShowMessage.value = null;
  }, 1000);
}
function handleCopy() {
  showCopyMessage();
}
</script>

<template>
  <main class="my-10">
    <div
      v-if="rShowMessage"
      class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
    >
      <IconCheck />
      {{ rShowMessage }}
    </div>

    <div v-if="rParams" class="flex flex-col items-center justify-center">
      <ComfyPrompt
        v-if="rPromptType === 'comfyui'"
        :params="rParams"
        @copy="handleCopy"
        @clear="rParams = null"
      />
      <DefaultPrompt
        v-if="rPromptType === 'default'"
        :params="rParams"
        @copy="handleCopy"
        @clear="rParams = null"
      />
    </div>
    <div v-else>
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <IconDownload />
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">PNG of JPG</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            @change="handleFile"
          />
        </label>
      </div>
    </div>
  </main>
</template>
