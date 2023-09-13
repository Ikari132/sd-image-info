<script setup>
import { ref, onMounted, defineEmits, onUnmounted, watch } from "vue";
import { LiteGraph } from "litegraph.js";
import { nanoid } from "nanoid";
import IconCancel from "./icons/IconCancel.vue";
import IconCopy from "./icons/IconCopy.vue";
import IconDownload from "./icons/IconDownload.vue";

const props = defineProps({
  params: {
    type: Object,
  },
  filename: {
    type: String,
  },
});
const emit = defineEmits(["copy", "save", "clear", "update:filename"]);

let rPrompts = ref(null);
const showSaveModal = ref(false);

const graph = new LiteGraph.LGraph();
onMounted(() => {
  mountGraph();
  parseParams();
});

watch(props, () => {
  parseParams();
});

onUnmounted(() => {
  graph.stop();
  graph.clear();
  graph.detachCanvas();
});

function mountGraph() {
  const canvasEl = document.getElementById("myCanvas");
  let canvas = new LiteGraph.LGraphCanvas("#myCanvas", graph);

  function resizeCanvas() {
    canvasEl.width = canvasEl.offsetWidth;
    canvasEl.height = canvasEl.offsetHeight;
    canvas.draw(true, true);
  }
  canvas.setZoom(0.1);
  resizeCanvas();
  graph.start();
}

function parseParams() {
  const prompt = JSON.parse(props.params.prompt);

  const prompts = Object.values(prompt)
    .filter((item) => {
      return item.class_type === "CLIPTextEncode";
    })
    .map((item) => {
      return {
        text: item.inputs.text,
        id: nanoid(),
      };
    });

  rPrompts.value = prompts;

  mountGraph();
  const workflow = JSON.parse(props.params.workflow);

  const prop = {};
  const types = Array.from(
    new Set(
      workflow.nodes.map((node) => {
        prop[node.type] = node;
        return node.type;
      })
    ).values()
  );

  types.forEach((type) => {
    function MyNode() {}

    //name to show
    MyNode.title = type;
    LiteGraph.registerNodeType(type, MyNode);
  });
  graph.configure(workflow);

  workflow.nodes.map((item) => {
    const node = graph.getNodeById(item.id);
    if (item.widgets_values) {
      item.widgets_values.forEach((val) => {
        node.addWidget("text", "", val);
      });
    }
  });
}

function handleSave() {
  emit("save");
  showSaveModal.value = false;
}
function handleCopy() {
  navigator.clipboard.writeText(
    rPrompts.value.reduce((acc, item) => {
      return acc + item.text + "\n\n";
    }, "")
  );
  emit("copy");
}
function handleCopyGroup(prompt) {
  navigator.clipboard.writeText(prompt.text);
  emit("copy");
}
</script>

<template>
  <div v-if="rPrompts" class="flex flex-col items-center justify-center">
    <div class="py-2 flex justify-end w-full max-w-xl flex-col sm:flex-row">
      <button
        @click="$emit('clear')"
        class="inline-flex items-center py-2.5 px-3 sm:mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        title="clear"
      >
        <IconCancel style="margin: 0" />
      </button>
      <button
        @click="showSaveModal = true"
        class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <IconDownload />

        Save as ComfyUI workflow
      </button>
      <div
        v-if="showSaveModal"
        style="width: 300px; height: auto; left: calc(50% - 150px)"
        class="p-3 fixed z-10 flex flex-col gap-3 items-center justify-center bg-slate-50 shadow dark:bg-slate-900"
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
        <div class="w-full flex justify-end gap-3">
          <button
            @click="showSaveModal = false"
            class="inline-flex items-center py-2.5 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            title="close"
          >
            <IconCancel style="margin: 0" />
          </button>
          <button
            @click="handleSave"
            class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <IconDownload />

            Save
          </button>
        </div>
      </div>
      <button
        @click="handleCopy"
        class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <IconCopy />

        Save as ComfyUI workflow
      </button>
    </div>
    <div class="flex flex-col items-start w-full max-w-xl">
      <div
        v-for="prompt in rPrompts"
        :key="prompt.id"
        class="block w-full mb-3 p-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div
          class="flex justify-between items-center bg-slate-50 dark:bg-slate-900 border-gray-200 dark:border-bray-700 m-2 p-2 rounded-lg"
        >
          <div class="font-semibold text-slate-500">Text node</div>
          <div>
            <button
              @click="handleCopyGroup(prompt)"
              class="px-2.5 py-2.5 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <IconCopy style="margin: 0" />
            </button>
          </div>
        </div>
        <div class="w-full p-4">
          {{ prompt.text }}
        </div>
      </div>
    </div>
  </div>
  <h2 class="pt-8 pb-4 text-xl font-bold">Workflow preview</h2>
  <canvas class="w-full rounded-lg" height="500" id="myCanvas" />
</template>

<style>
.litesearchbox,
.litecontextmenu {
  display: none;
}
</style>
