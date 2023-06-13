<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { LiteGraph } from "litegraph.js";
import { nanoid } from "nanoid";
import IconCancel from "./icons/IconCancel.vue";
import IconCopy from "./icons/IconCopy.vue";
import IconDownload from "./icons/IconDownload.vue";

const props = defineProps({
  params: {
    type: Object,
  },
});
const emit = defineEmits(["copy", "save"]);

let rPrompts = ref(null);

const graph = new LiteGraph.LGraph();
onMounted(() => {
  mountGraph();
  parseParams();
});

function mountGraph() {
  const canvasEl = document.getElementById("myCanvas");
  var canvas = new LiteGraph.LGraphCanvas("#myCanvas", graph);

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
  const file = new Blob([props.params.workflow], { type: "text/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);

  link.download = "workflow.json";

  link.click();
  URL.revokeObjectURL(link.href);
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

        Save as ComfyUI workflow
      </button>
      <button
        @click="handleCopy"
        class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <IconCopy />

        Copy prompt
      </button>
    </div>
    <div class="flex flex-col items-start max-w-xl">
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
              <IconCopy class="mr-0" />
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
