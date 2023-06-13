<template>
  <div class="flex items-center justify-center w-full max-w-screen-lg">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10 mb-3 text-slate-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
          />
        </svg>

        <p class="mb-2 text-sm text-slate-500 dark:text-slate-400">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-slate-500 dark:text-slate-400">PNG or JPG</p>
        <p class="text-xs py-2 text-center text-slate-500 dark:text-slate-400">
          *It runs directly in your browser, no image is sent to the server
        </p>
      </div>
      <input
        id="dropzone-file"
        type="file"
        class="w-full h-full absolute opacity-0 cursor-pointer"
        @change="$emit('files-change', $event.target.files)"
      />
    </label>
  </div>
</template>
