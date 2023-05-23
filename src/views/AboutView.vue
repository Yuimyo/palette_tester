<script setup lang="ts">
import { defineComponent, ref, computed, ComputedRef, onMounted } from "vue";
import ColorPicker from "@/components/color_picker/ColorPicker.vue";
import PaletteViewer from "@/components/color_picker/PaletteViewer.vue";

defineComponent({
  name: "AboutView",
  components: {
    ColorPicker,
    PaletteViewer,
  },
});

let colorId = 0;
const colors = ref([
  { id: colorId++, code: "#000000" },
  { id: colorId++, code: "#000000" },
  { id: colorId++, code: "#000000" },
  { id: colorId++, code: "#000000" },
  { id: colorId++, code: "#000000" },
  { id: colorId++, code: "#000000" },
  { id: colorId++, code: "#000000" },
  { id: colorId++, code: "#000000" },
]);

let paletteId = 0;
const palettes = ref([
  { id: paletteId++, colors: [0, 1, 2] },
  { id: paletteId++, colors: [1, 2, 3] },
  { id: paletteId++, colors: [2, 3, 4] },
  { id: paletteId++, colors: [3, 4, 5] },
  // { id: paletteId++, colors: [4, 5, 6] },
  // { id: paletteId++, colors: [5, 6, 7] },
  // { id: paletteId++, colors: [6, 7, 0] },
  // { id: paletteId++, colors: [7, 0, 1] },
  // { id: paletteId++, colors: [6, 0, 2] },
  // { id: paletteId++, colors: [7, 1, 3] },
  // { id: paletteId++, colors: [0, 2, 4] },
  // { id: paletteId++, colors: [1, 3, 5] },
  // { id: paletteId++, colors: [2, 4, 6] },
  // { id: paletteId++, colors: [3, 5, 7] },
  // { id: paletteId++, colors: [4, 6, 0] },
  // { id: paletteId++, colors: [5, 7, 1] },

  // { id: paletteId++, colors: [0, 4] },
  // { id: paletteId++, colors: [1, 5] },
  // { id: paletteId++, colors: [2, 6] },
  // { id: paletteId++, colors: [3, 7] },
  // { id: paletteId++, colors: [4, 0] },
  // { id: paletteId++, colors: [5, 1] },
  // { id: paletteId++, colors: [6, 2] },
  // { id: paletteId++, colors: [7, 3] },
]);

function colorIdsToCodes(colorIds: number[]): string[] {
  let ret: string[] = [];
  for (let i = 0; i < colorIds.length; i++) {
    const id = colorIds[i];
    let exist = false;
    let code = "#000000";
    for (let j = 0; j < colors.value.length; j++) {
      if (colors.value[j].id == id) {
        exist = true;
        code = colors.value[j].code;
        break;
      }
    }
    if (exist) {
      ret.push(code);
    } else {
      throw new Error(`that colorIds contain id("${id}") that doesn't exist.`);
    }
  }
  return ret;
}

let paletteRefs: ComputedRef<(InstanceType<typeof PaletteViewer> | null)[]> =
  computed(() => skipUnwrap.paletteRef.value);

function reloadPalettes() {
  if (paletteRefs.value == undefined) return;
  for (let i = 0; i < palettes.value.length; i++) {
    paletteRefs.value[i]?.ReloadPalettes(
      colorIdsToCodes(palettes.value[i].colors)
    );
  }
}

// https://github.com/vuejs/core/issues/5525#issuecomment-1062336844
const skipUnwrap = {
  paletteRef: ref([]),
};

onMounted(() => {
  reloadPalettes();
});
</script>

<template>
  <div class="flex">
    <div class="m-4">
      <div v-for="palette in palettes" :key="palette.id">
        <PaletteViewer :ref="skipUnwrap.paletteRef" />
      </div>
    </div>
    <div>
      <div v-for="color in colors" :key="color.id">
        <ColorPicker
          @onChanged="
            (code) => {
              colors[color.id].code = code;
              reloadPalettes();
            }
          "
        />
      </div>
    </div>
  </div>
</template>
