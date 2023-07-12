<script setup>
const props = defineProps({
  url: {
    type: String,
  },
});
</script>
<template>
  <div
    class="hover:saturate-150 hover:drop-shadow-md max-w-xs rounded-lg shadow"
  >
    <a href="#">
      <img class="rounded-lg" :src="props.url" alt="" />
    </a>
  </div>
</template>
