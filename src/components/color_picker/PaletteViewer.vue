<script setup lang="ts">
import {
  defineComponent,
  computed,
  ComputedRef,
  ref,
  toRef,
  PropType,
  onMounted,
} from "vue";
import ColorCircle from "@/components/color_picker/ColorCircle.vue";
import { Color } from "@/lib/Color";
import { Palette, IColorSource } from "@/lib/Palette";

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
});

const emit = defineEmits<{
  (e: "ColorClicked", index: number, clickType: string): void;
  (e: "RequestedAdd"): void;
  (e: "RequestedRemove"): void;
}>();

let minColorId = 0;
let maxColorId = 8;
let colorId = 0;

type colorDetailType = {
  id: number;
  color: Color;
};
const colorDetails = ref<colorDetailType[]>([]);

const palette = toRef(props.palette);
onMounted(() => {
  palette.value.onChanged.addEventListener((e) => {
    let res: colorDetailType[] = [];
    const colors = e.detail.values;
    colorId = 0;
    for (let i = 0; i < colors.length; i++) {
      res.push({ id: i, color: colors[i] });
    }
    colorDetails.value = res;
    colorId = colors.length;
    for (let i = 0; i < colors.length; i++) {
      colorCircleRefs.value[i]?.ResetColor(colorDetails.value[i].color);
    }
  });
});

const setColorNumber = (index: number, value: number) => {
  colorCircleRefs.value[index]?.ResetText(`${value}`);
};
// const palette = toRef(props.palette);
// palette.value.addEventOnChanged((e) => {
//   for (let i = 0; i < palette.value.length; i++) {
//     let hoge = e.detail.value.get(i);
//     console.log(hoge.rand);
//     colorCircleRefs.value[i]?.ResetColorSource(hoge);
//   }
// });

let colorCircleRefs: ComputedRef<(InstanceType<typeof ColorCircle> | null)[]> =
  computed(() => skipUnwrap.colorCircleRef.value);

// const ReloadPalettes = (codes: string[]) => {
//   colorId = 0;
//   colorDetails.value = [];
//   for (let i = 0; i < codes.length; i++) {
//     const code = codes[i];
//     addColor(Color.FromCode(code));
//   }
//   for (let i = 0; i < colorDetails.value.length; i++) {
//     colorCircleRefs.value[i]?.SetColor(colorDetails.value[i].color);
//   }
// };

// const reloadPalette = () => {
//   for (let i = 0; i < codes.length; i++) {
//     const code = codes[i];
//     addColor(Color.FromCode(code));
//   }
//   for (let i = 0; i < colorDetails.value.length; i++) {
//     // colorCircleRefs.value[i]?.SetColor(colorDetails.value[i].color);
//     colorCircleRefs.value[i]?.ResetColorSource(palette.value.get(i));
//   }
// };

const clickPlus = () => {
  emit(`RequestedAdd`);
};

const clickMinus = () => {
  emit(`RequestedRemove`);
};

// https://github.com/vuejs/core/issues/5525#issuecomment-1062336844
const skipUnwrap = {
  colorCircleRef: ref([]),
};

defineExpose({
  setColorNumber,
});
</script>

<!-- @on-clicked-up="{
  // colorCircleRefs[colorDetail.id]?.ResetText("a");
  // colorCircleRefs[colorDetail.id]?.ResetColorSource(palette.value.get(colorDetail.colorSourceIndex));
  
}"
@on-clicked-down="" -->

<!-- @on-clicked-up="onTest"
@on-clicked-down="
  () => {
    // emit(`ColorClicked`, colorDetail.id, `Down`);
    console.log(`nmni`);
  }
" -->

<template>
  <div class="inline-block border-0 border-emerald-600">
    <div
      class="inline-block m-2 p-2 bg-neutral-50 shadow-lg shadow-stone-300 rounded-lg border-0 border-emerald-600"
    >
      <div class="flex">
        <div v-for="colorDetail in colorDetails" :key="colorDetail.id">
          <ColorCircle
            :ref="skipUnwrap.colorCircleRef"
            @clicked-up="
              () => {
                emit(`ColorClicked`, colorDetail.id, `up`);
              }
            "
            @clicked-down="
              () => {
                emit(`ColorClicked`, colorDetail.id, `down`);
              }
            "
          />
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
