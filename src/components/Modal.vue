<script setup>
import { ref, computed } from "vue";

import IconCancel from "./icons/IconCancel.vue";
import IconDownload from "./icons/IconDownload.vue";

defineProps({
  show: {
    type: Boolean,
  },
});

const emit = defineEmits(["close", "save"]);

const modalEl = ref(null);

const modalStyles = computed(() => ({
  width: "300px",
  height: "auto",
  left: "calc(50% - 150px)",
  top: `calc(50% - ${modalEl.value?.offsetHeight / 2 || 0}px)`,
}));
</script>

<template>
  <div
    v-if="show"
    class="backdrop-blur fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div
      ref="modalEl"
      :style="modalStyles"
      class="rounded-lg p-3 fixed z-10 flex flex-col gap-3 items-center justify-center bg-slate-50 shadow dark:bg-slate-900"
    >
      <slot />

      <div class="w-full flex justify-end gap-3">
        <button
          @click="emit('close')"
          class="inline-flex items-center py-2.5 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          title="close"
        >
          <IconCancel style="margin: 0" />
        </button>
        <button
          @click="emit('save')"
          class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IconDownload />

          Save
        </button>
      </div>
    </div>
  </div>
</template>
