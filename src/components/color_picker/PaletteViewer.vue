<script setup lang="ts">
import {
  defineComponent,
  computed,
  ComputedRef,
  ref,
  toRef,
  onMounted,
} from "vue";
import { Color } from "@/lib/Color";
import { Palette } from "@/lib/Palette";
import ColorCircle from "@/components/color_picker/ColorCircle.vue";

defineComponent({
  name: "PaletteViewer",
  components: {
    ColorCircle,
  },
});

const props = defineProps({
  palette: {
    type: Palette,
    required: true,
  },
  defaultText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "ColorClicked", index: number, clickType: string): void;
  (e: "RequestedAdd"): void;
  (e: "RequestedRemove"): void;
}>();

type colorDetailType = {
  id: number;
  color: Color;
};
const colorElements = ref<colorDetailType[]>([]);

const palette = toRef(props.palette);
onMounted(() => {
  // reset
  palette.value.onChanged.addEventListener((e) => {
    const colors = e.detail.values;

    let res: colorDetailType[] = [];
    for (let i = 0; i < colors.length; i++) {
      res.push({ id: i, color: colors[i] });
    }
    colorElements.value = res;

    resetAllColor();
  });
});

function resetAllColor() {
  for (let i = 0; i < colorElements.value.length; i++) {
    const color = colorElements.value[i].color;
    setColor(i, color);
  }
}

const setColor = (index: number, value: Color) => {
  colorCircleRefs.value[index]?.ResetColor(value);
};

const setColorNumber = (index: number, value: number) => {
  colorCircleRefs.value[index]?.ResetText(`${value}`);
};

const clickPlus = () => {
  emit(`RequestedAdd`);
};

const clickMinus = () => {
  emit(`RequestedRemove`);
};

let colorCircleRefs: ComputedRef<(InstanceType<typeof ColorCircle> | null)[]> =
  computed(() => skipUnwrap.colorCircleRef.value);

// https://github.com/vuejs/core/issues/5525#issuecomment-1062336844
const skipUnwrap = {
  colorCircleRef: ref([]),
};

defineExpose({
  setColor,
  setColorNumber,
});
</script>

<template>
  <div class="inline-block border-0 border-emerald-600">
    <div
      class="inline-block m-2 p-2 bg-neutral-50 shadow-lg shadow-stone-400 rounded-lg"
    >
      <div class="flex">
        <div v-for="colorElement in colorElements" :key="colorElement.id">
          <ColorCircle
            :ref="skipUnwrap.colorCircleRef"
            :defaultColor="colorElement.color"
            :default-text="props.defaultText"
            @clicked-up="
              () => {
                emit(`ColorClicked`, colorElement.id, `up`);
              }
            "
            @clicked-down="
              () => {
                emit(`ColorClicked`, colorElement.id, `down`);
              }
            "
          />
          <!--  :on-value-changed="" -->
        </div>
      </div>
      <div>
        <div class="inline-block">
          <button
            class="w-4 h-4 align-middle hover:bg-neutral-100 active:bg-neutral-200 focus:outline-dotted focus:outline-1 focus:outline-violet-300"
            type="button"
            @click="clickPlus"
          >
            <div class="-mt-1">+</div>
          </button>
          <button
            class="w-4 h-4 align-middle hover:bg-neutral-100 active:bg-neutral-200 focus:outline-dotted focus:outline-1 focus:outline-violet-300"
            type="button"
            @click="clickMinus"
          >
            <div class="-mt-1">-</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
