<script setup>
import { ref } from "vue";
import exifr from "exifr";

import ComfyPrompt from "../components/ComfyPrompt.vue";
import DefaultPrompt from "../components/DefaultPrompt.vue";
import IconCheck from "../components/icons/IconCheck.vue";
import IconExclamation from "../components/icons/IconExclamation.vue";
import FileUploader from "../components/FileUploader.vue";

let rParams = ref(null);
let rPromptType = ref(null);
let rShowMessage = ref(null);

function getStringFromBytes(uint8Array) {
  const decoder = new TextDecoder("utf-8");
  const filteredUint8Array = Uint8Array.from(
    uint8Array.filter((byte) => byte !== 0)
  );

  return decoder.decode(filteredUint8Array);
}
function handleFile(fileList) {
  let files = Array.from(fileList);

  exifr.parse(files[0], true).then((res) => {
    let params;
    if (res.userComment) {
      params = getStringFromBytes(res.userComment).replace("UNICODE", "");
      rPromptType.value = "default";
    } else if (res.parameters) {
      params = res.parameters;
      rPromptType.value = "default";
    } else if (res.workflow) {
      // comfyui
      params = res;
      rPromptType.value = "comfyui";
    } else {
      rPromptType.value = "notFound";
    }
    console.log(rPromptType.value, params, files);

    rParams.value = params;
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
    class="fixed flex z-50 items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
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
  <div
    v-else-if="rPromptType === 'notFound'"
    class="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 rounded-lg bg-slate-50 dark:bg-slate-700 dark:border-slate-600"
  >
    <IconExclamation class="w-10 h-10 text-slate-500 dark:text-slate-400" />
    <span class="font-bold p-4 text-slate-500 dark:text-slate-400">
      Prompt not found
    </span>
    <button
      @click="() => (rPromptType = null)"
      class="inline-flex items-center py-2.5 px-5 sm:mr-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-slate-200 hover:bg-slate-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600 dark:hover:text-white dark:hover:bg-slate-700"
    >
      Return
    </button>
  </div>
  <div v-else class="w-full">
    <FileUploader @files-change="handleFile" />
  </div>
</template>
