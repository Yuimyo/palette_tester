<script setup lang="ts">
import { ref, watch } from "vue";
import { Color } from "@/lib/Color";

const emit = defineEmits<{
  (e: "ValueChanged", value: number): void;
}>();

const numberMin = 1;
const numberMax = 8;
const number = ref(1);
const value = ref(new Color(0, 0, 0));
const textColorCode = ref("#f2f2f2");

const SetColor = (color: Color) => {
  value.value = color;
  resetTextColorCode(color);
};

function resetTextColorCode(color: Color) {
  if (color.GetLuminance() > 0.5) {
    textColorCode.value = "#0d0d0d";
  } else {
    textColorCode.value = "#f2f2f2";
  }
}

watch(number, (value) => {
  emit("ValueChanged", value);
});

const onChange = () => {
  throw new Error("NotImple");
};

const clickPlus = () => {
  if (number.value >= numberMax) return;
  number.value++;
};

const clickMinus = () => {
  if (number.value <= numberMin) return;
  number.value--;
};

defineExpose({
  SetColor,
});
</script>

<template>
  <div class="m-1">
    <div
      id="filledcolor"
      class="w-10 h-10 overflow-hidden rounded-full shadow-md shadow-neutral-300"
    >
      <div class="flex justify-center items-center w-full h-full">
        <div class="relative w-full h-full">
          <div
            class="flex pointer-events-none z-20 justify-center items-center absolute w-full h-full"
          >
            <p id="textcolor">{{ number }}</p>
          </div>
          <div
            id="filledcolor"
            class="absolute pointer-events-none z-10 w-4/6 h-4/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          ></div>
          <button
            id="textcolor"
            class="absolute z-0 w-full h-1/2 left-0 right-0 top-0 opacity-50 hover:bg-neutral-500 active:bg-neutral-400"
            type="button"
            @click="clickMinus"
          ></button>
          <button
            id="textcolor"
            class="absolute z-0 w-full h-1/2 left-0 right-0 bottom-0 opacity-50 hover:bg-neutral-500 active:bg-neutral-400"
            type="button"
            @click="clickPlus"
            title="このカテゴリーのトップへジャンプします"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#filledcolor {
  background-color: v-bind(value.ToCode());
}
#textcolor {
  color: v-bind(textColorCode);
}
</style>
