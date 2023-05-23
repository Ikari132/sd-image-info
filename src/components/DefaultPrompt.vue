<script setup>
import { ref, defineEmits } from "vue";
import IconCancel from "./icons/IconCancel.vue";
import IconCopy from "./icons/IconCopy.vue";
import IconDownload from "./icons/IconDownload.vue";

const props = defineProps({
  params: {
    type: String,
  },
});

const emit = defineEmits(["copy", "save"]);

function handleCopy() {
  navigator.clipboard.writeText(props.params);
  emit("copy");
}

function handleSave() {
  const file = new Blob([props.params], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);

  link.download = "prompt.txt";

  link.click();
  URL.revokeObjectURL(link.href);
}
</script>

<template>
  <div class="py-2 flex justify-end w-full max-w-xl flex-col sm:flex-row">
    <button
      @click="$emit('clear')"
      class="inline-flex items-center py-2.5 px-5 sm:mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      <IconCancel />
      Clear
    </button>
    <button
      @click="handleSave"
      class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <IconDownload />

      Save to txt
    </button>
    <button
      @click="handleCopy"
      class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <IconCopy />
      Copy prompt
    </button>
  </div>

  <div
    class="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <p class="font-normal text-gray-700 dark:text-gray-400">
      {{ params }}
    </p>
  </div>
</template>
