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
    class="flex items-center overflow-auto gap-2 bg-slate-200 dark:bg-slate-900 p-2 w-fit max-w-screen-md rounded-lg"
  >
    <div
      v-for="rImage in props.rImages"
      :key="rImage.id"
      class="hover:saturate-150 hover:drop-shadow-md w-16 min-w-max h-16 rounded-lg"
      :class="{
        'saturate-150 ring ': rImage.id === props.rSelected.id,
      }"
    >
      <img
        class="w-16 min-w-max h-16 object-cover rounded-lg"
        :src="rImage.imageURL"
        @click="emit('select', rImage)"
      />
    </div>
  </div>
</template>
