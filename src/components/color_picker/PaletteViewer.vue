<script setup lang="ts">
import { defineComponent, computed, ComputedRef, ref } from "vue";
import ColorCircle from "@/components/color_picker/ColorCircle.vue";
import { Color } from "@/lib/Color";

defineComponent({
  name: "PaletteViewer",
  components: {
    ColorCircle,
  },
});

let minColorId = 0;
let maxColorId = 8;
let colorId = 0;
const colors = ref([
  { id: colorId++, code: "#ffffff" },
  { id: colorId++, code: "#00ffff" },
  { id: colorId++, code: "#00ffff" },
]);

const addColor = () => {
  if (colorId >= maxColorId) return;
  colors.value.push({ id: colorId++, code: "#00ffff" });
};

const removeColor = () => {
  if (colorId <= minColorId) return;
  colors.value.pop();
  colorId--;
};

let colorCircleRefs: ComputedRef<(InstanceType<typeof ColorCircle> | null)[]> =
  computed(() => skipUnwrap.colorCircleRef.value);

const ReloadPalettes = (codes: string[]) => {
  colorId = 0;
  colors.value = [];
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    colors.value.push({ id: colorId++, code: code });
  }
  for (let i = 0; i < colors.value.length; i++) {
    colorCircleRefs.value[i]?.SetColor(Color.FromCode(colors.value[i].code));
  }
};

const clickPlus = () => {
  addColor();
};

const clickMinus = () => {
  removeColor();
};

// https://github.com/vuejs/core/issues/5525#issuecomment-1062336844
const skipUnwrap = {
  colorCircleRef: ref([]),
};

defineExpose({
  ReloadPalettes,
});
</script>

<template>
  <div class="inline-block border-0 border-emerald-600">
    <div
      class="inline-block m-2 p-2 bg-neutral-50 shadow-lg shadow-stone-300 rounded-lg border-0 border-emerald-600"
    >
      <div class="flex">
        <div v-for="color in colors" :key="color.id">
          <ColorCircle :code="color.code" :ref="skipUnwrap.colorCircleRef" />
        </div>
        <button
          class="w-4 hover:bg-neutral-100 active:bg-neutral-200 focus:outline-dotted focus:outline-1 focus:outline-violet-300"
          type="button"
          @click="clickPlus"
        >
          +
        </button>
        <button
          class="w-4 hover:bg-neutral-100 active:bg-neutral-200 focus:outline-dotted focus:outline-1 focus:outline-violet-300"
          type="button"
          @click="clickMinus"
        >
          -
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
