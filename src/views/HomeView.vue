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
      params = res.parameters;
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
  <div v-else class="w-full">
    <div class="flex items-center justify-center w-full max-w-screen-lg">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10 mb-3 text-gray-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
            />
          </svg>

          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
          <p class="text-xs py-2 text-gray-500 dark:text-gray-400">
            *It runs directly in your browser, no image is sent to the server
          </p>
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
</template>
