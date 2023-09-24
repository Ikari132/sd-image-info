<script setup>
import { computed, ref } from "vue";
import IconCancel from "./icons/IconCancel.vue";
import IconCopy from "./icons/IconCopy.vue";
import IconDownload from "./icons/IconDownload.vue";
import Modal from "./Modal.vue";
import { parseFullMeta, parseTextMeta } from "sd-prompt-parser";
import { parameterToKey } from "./constants";

const props = defineProps({
  params: {
    type: String,
  },
  filename: {
    type: String,
  },
});

const groupNames = {
  pos: "Prompt",
  neg: "Negative Prompt",
  meta: "Parameters",
};
const promptParts = computed(() => {
  return parseTextMeta(props.params);
});

const emit = defineEmits([
  "copy",
  "save",
  "save-picture",
  "clear",
  "update:filename",
]);

const showSaveModal = ref(false);

function handleCopy() {
  navigator.clipboard.writeText(props.params);
  emit("copy");
}
function handleCopyGroup(key) {
  navigator.clipboard.writeText(promptParts.value[key]);
  emit("copy");
}

function handleSave() {
  emit("save");
  showSaveModal.value = false;
}

function handleCopyForTextbox() {
  const fullMeta = parseFullMeta(props.params);
  const result = [];
  result.push(`--prompt "${promptParts.value.pos.trim()}"`);
  if (fullMeta.neg) {
    result.push(`--negative_prompt "${promptParts.value.neg.trim()}"`);
  }

  if (fullMeta.meta) {
    const size = fullMeta.meta["Size"];
    if (size) {
      const [width, height] = size.split("x");
      if (width && height) {
        result.push(`--width "${width}"`, `--height "${height}"`);
      }
    }

    Object.keys(fullMeta.meta).forEach((key) => {
      if (parameterToKey[key]) {
        result.push(`--${parameterToKey[key]} "${fullMeta.meta[key].trim()}"`);
      }
    });
  }

  navigator.clipboard.writeText(result.join(" "));
  emit("copy");
}
</script>

<template>
  <div class="flex justify-between w-full max-w-xl flex-col sm:flex-row">
    <button
      @click="$emit('clear')"
      class="inline-flex items-center py-2.5 px-3 sm:mb-0 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      title="clear"
    >
      <IconCancel style="margin: 0" />
    </button>
    <button
      @click="emit('save-picture')"
      class="h-10 inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <IconDownload />

      Remove prompt & save
    </button>
  </div>
  <div class="py-2 flex justify-end w-full max-w-xl flex-col sm:flex-row">
    <button
      @click="showSaveModal = true"
      class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <IconDownload />

      Save txt
    </button>

    <Modal
      :show="showSaveModal"
      @close="showSaveModal = false"
      @save="handleSave"
    >
      <label
        for="prompt"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >Filename</label
      >
      <textarea
        class="w-full p-3 dark:bg-black dark:text-gray-400"
        :value="filename"
        @input="$emit('update:filename', $event.target.value)"
      >
      </textarea>
    </Modal>

    <button
      @click="handleCopyForTextbox"
      class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <IconCopy />

      Copy for textbox
    </button>
    <button
      @click="handleCopy"
      class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <IconCopy />

      Copy all
    </button>
  </div>
  <div class="flex flex-col items-start w-full max-w-xl">
    <div
      v-for="(item, key) in promptParts"
      :key="item"
      class="block w-full mb-3 p-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        class="flex justify-between items-center bg-slate-50 dark:bg-slate-900 border-gray-200 dark:border-bray-700 m-2 p-2 rounded-lg"
      >
        <div class="font-semibold text-slate-500">
          {{ groupNames[key] }}
        </div>
        <div>
          <button
            @click="handleCopyGroup(key)"
            class="px-2.5 py-2.5 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <IconCopy style="margin: 0" title="copy to clipboard" />
          </button>
        </div>
      </div>
      <div class="w-full p-4">
        {{ item }}
      </div>
    </div>
  </div>
</template>
