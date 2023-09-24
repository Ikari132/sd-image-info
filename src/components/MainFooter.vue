<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="flex items-center justify-center w-full">
    <div
      class="flex items-center justify-between w-full max-w-screen-lg flex-col sm:flex-row"
    >
      <nav class="m-4 sm:m-0">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <div class="links flex items-center">
        <a
          href="https://github.com/Ikari132/sd-prompt-reader"
          alt="Link to github"
          target="_blank"
        >
          <button
            type="button"
            class="hover:fill-white dark:fill-white px-3 py-2 mr-2 text-xs font-medium text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 512 512"
            >
              <path
                d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"
              />
            </svg>
          </button>
        </a>
        <a
          href="https:www.ayamaru.com/more"
          alt="Link to apps page"
          target="_blank"
        >
          <button
            type="button"
            class="px-3 py-2 mr-2 text-xs font-medium text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            More apps 🔗
          </button>
        </a>
        <a
          href="https://forms.gle/NLuhoMf6zxQd1Y9y5"
          alt="Link to suggest a feature form"
          target="_blank"
        >
          <button
            type="button"
            class="px-3 py-2 mr-2 text-xs font-medium text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Ideas / bugs 📋
          </button>
        </a>
        <a
          href="https://ko-fi.com/L3L4HYJ79"
          alt="Link to support the project page"
          target="_blank"
        >
          <button
            type="button"
            class="px-3 py-2 text-xs font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
          >
            Support ❤️
          </button>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  padding: 2rem;
  left: 0;
  background: var(--color-background);
}
nav {
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  @apply bg-slate-100 dark:bg-slate-700;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  @apply p-2 rounded font-medium text-blue-600 dark:text-blue-500 hover:underline;
}

nav a:first-of-type {
  border: 0;
}
</style>
