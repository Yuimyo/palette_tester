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

const emit = defineEmits<{
  (e: "onColorIdChanged", value: number): void;
}>();

let minColorId = 0;
let maxColorId = 8;
let colorId = 0;

const colorDetails = ref<{ id: number; color: Color }[]>([]);

const addColor = (color: Color) => {
  if (colorId >= maxColorId) return;
  colorDetails.value.push({ id: colorId, color: color });
  colorId++;
};

const removeColor = () => {
  if (colorId <= minColorId) return;
  colorDetails.value.pop();
  colorId--;
};

let colorCircleRefs: ComputedRef<(InstanceType<typeof ColorCircle> | null)[]> =
  computed(() => skipUnwrap.colorCircleRef.value);

const ReloadPalettes = (codes: string[]) => {
  colorId = 0;
  colorDetails.value = [];
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    addColor(Color.FromCode(code));
  }
  for (let i = 0; i < colorDetails.value.length; i++) {
    colorCircleRefs.value[i]?.SetColor(colorDetails.value[i].color);
  }
};

const clickPlus = () => {
  addColor(new Color(0, 0, 0));
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
        <div v-for="colorDetail in colorDetails" :key="colorDetail.id">
          <ColorCircle :ref="skipUnwrap.colorCircleRef" />
          <!--  :on-value-changed="" -->
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
