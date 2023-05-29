<script setup lang="ts">
import { ref } from "vue";
import { Color } from "@/lib/Color";

// TODO: 初期色値は？
const props = defineProps({
  defaultColor: {
    type: Color,
    required: true,
  },
  defaultText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "ClickedUp"): void;
  (e: "ClickedDown"): void;
}>();

const backgroundColor = ref(props.defaultColor);
const text = ref(props.defaultText);

function calcTextColorCode(color: Color): string {
  if (color.GetLuminance() > 0.5) {
    return "#0d0d0d";
  } else {
    return "#f2f2f2";
  }
}

const clickPlus = () => {
  emit("ClickedDown");
};

const clickMinus = () => {
  emit("ClickedUp");
};

const ResetColor = (color: Color) => {
  backgroundColor.value = color;
};

const ResetText = (input: string) => {
  text.value = input;
};

defineExpose({
  ResetColor,
  ResetText,
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
            <p id="textcolor">{{ text }}</p>
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
  background-color: v-bind(backgroundColor.ToCode());
  /* background-color: v-bind(value.ToCode()); */
}
#textcolor {
  color: v-bind(calcTextColorCode(backgroundColor));
}
</style>
