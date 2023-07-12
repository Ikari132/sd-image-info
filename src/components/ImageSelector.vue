<script setup>
const props = defineProps({
  rImages: {
    type: Array,
  },
  rSelected: {
    type: Object,
  },
});
const emit = defineEmits(["select"]);
</script>

<template>
  <div
    class="flex items-center overflow-auto gap-2 bg-slate-200 dark:bg-slate-900 p-2 w-fit max-w-screen-md rounded-lg cursor-pointer"
  >
    <div
      v-for="rImage in props.rImages"
      :key="rImage.id"
      @click="emit('select', rImage)"
      class="hover:saturate-150 hover:drop-shadow-md w-16 h-16 rounded-lg overflow-hidden bg-center bg-no-repeat bg-cover"
      :style="{
        'max-width': '4rem',
        'min-width': '4rem',
        'background-image': `url(${rImage.imageURL})`,
      }"
      :class="{
        'saturate-150 ring ': rImage.id === props.rSelected.id,
      }"
    ></div>
  </div>
</template>
