<script setup>
const props = defineProps({
  url: {
    type: String,
  },
});
</script>
<template>
  <div
    class="hover:saturate-150 hover:drop-shadow-md max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <img class="rounded-lg" :src="props.url" alt="" />
    </a>
  </div>
</template>
