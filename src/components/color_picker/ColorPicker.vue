<script setup lang="ts">
import { ref } from "vue";
import { RgbToHsv, HsvToRgb, RgbToCode, CodeToRgb } from "@/lib/ColorHelper";

const emit = defineEmits<{
  (e: "onChanged", code: string): void;
}>();

const red = ref(0);
const green = ref(0);
const blue = ref(0);
const hue = ref(0);
const saturation = ref(0);
const brightness = ref(0);
const colorCode = ref("#0d0d0d");
const textColorCode = ref("#f2f2f2");

const onRgbChanged = () => {
  let hsv = RgbToHsv(red.value / 255, green.value / 255, blue.value / 255);
  hue.value = Math.round(hsv[0]);
  saturation.value = Math.round(hsv[1] * 100.0);
  brightness.value = Math.round(hsv[2] * 100.0);
  changeColorCode();
};

const onHsvChanged = () => {
  let rgb = HsvToRgb(hue.value, saturation.value / 100, brightness.value / 100);
  red.value = Math.round(rgb[0] * 255.0);
  green.value = Math.round(rgb[1] * 255.0);
  blue.value = Math.round(rgb[2] * 255.0);
  changeColorCode();
};

const onColorCodeChanged = () => {
  let rgb: [r: number, g: number, b: number] = [0, 0, 0];
  let currentCode = RgbToCode(
    red.value / 255,
    green.value / 255,
    blue.value / 255
  );
  try {
    rgb = CodeToRgb(colorCode.value);
  } catch (err) {
    rgb = CodeToRgb(currentCode);
    colorCode.value = currentCode;
  }
  red.value = rgb[0];
  green.value = rgb[1];
  blue.value = rgb[2];
  onRgbChanged();
  changeColorCode();
};

function changeColorCode() {
  colorCode.value = RgbToCode(
    red.value / 255.0,
    green.value / 255.0,
    blue.value / 255.0
  );
  reloadTextColorCode();
  emit("onChanged", colorCode.value);
}

function reloadTextColorCode() {
  let r = red.value / 255.0;
  let g = green.value / 255.0;
  let b = blue.value / 255.0;
  let luminance = 0.298912 * r + 0.586611 * g + 0.114478 * b;
  if (luminance > 0.5) {
    textColorCode.value = "#0d0d0d";
  } else {
    textColorCode.value = "#f2f2f2";
  }
}
</script>

<template>
  <div class="inline-block border-0 border-emerald-600 mt-1 mb-1 ml-6 mr-6">
    <div class="flex items-center gap-4">
      <div>
        <div
          id="colorview"
          class="flex justify-center items-center w-28 h-28 rounded-2xl shadow-xl shadow-stone-300"
        >
          <input
            type="text"
            id="textcolor"
            class="bg-transparent font-bold text-center w-16"
            v-model="colorCode"
            @input="onColorCodeChanged"
          />
        </div>
      </div>
      <div class="flex items-center gap-4 border-0 border-emerald-600 m-1">
        <div>
          <div class="grid grid-rows-3 gap-1">
            <div class="inline-block">
              <div class="flex items-center flex-row gap-1">
                R
                <input
                  class="border border-gray-300 w-12 text-sm rounded-lg block p-0.5"
                  type="number"
                  min="0"
                  max="255"
                  v-model="red"
                  @input="onRgbChanged"
                />
                <input
                  class="w-48"
                  type="range"
                  min="0"
                  max="255"
                  v-model="red"
                  @input="onRgbChanged"
                />
              </div>
            </div>
            <div class="inline-block">
              <div class="flex items-center flex-row gap-1">
                G
                <input
                  class="border border-gray-300 w-12 text-sm rounded-lg block p-0.5"
                  type="number"
                  min="0"
                  max="255"
                  v-model="green"
                  @input="onRgbChanged"
                />
                <input
                  class="w-48"
                  type="range"
                  min="0"
                  max="255"
                  v-model="green"
                  @input="onRgbChanged"
                />
              </div>
            </div>
            <div class="inline-block">
              <div class="flex items-center flex-row gap-1">
                B
                <input
                  class="border border-gray-300 w-12 text-sm rounded-lg block p-0.5"
                  type="number"
                  min="0"
                  max="255"
                  v-model="blue"
                  @input="onRgbChanged"
                />
                <input
                  class="w-48"
                  type="range"
                  min="0"
                  max="255"
                  v-model="blue"
                  @input="onRgbChanged"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="grid grid-rows-3 gap-1">
            <div class="inline-block">
              <div class="flex items-center flex-row gap-1">
                H
                <input
                  class="border border-gray-300 w-12 text-sm rounded-lg block p-0.5"
                  type="number"
                  min="0"
                  max="360"
                  v-model="hue"
                  @input="onHsvChanged"
                />
                <input
                  class="w-48"
                  type="range"
                  min="0"
                  max="360"
                  v-model="hue"
                  @input="onHsvChanged"
                />
              </div>
            </div>
            <div class="inline-block">
              <div class="flex items-center flex-row gap-1">
                S
                <input
                  class="border border-gray-300 w-12 text-sm rounded-lg block p-0.5"
                  type="number"
                  min="0"
                  max="100"
                  v-model="saturation"
                  @input="onHsvChanged"
                />
                <input
                  class="w-48"
                  type="range"
                  min="0"
                  max="100"
                  v-model="saturation"
                  @input="onHsvChanged"
                />
              </div>
            </div>
            <div class="inline-block">
              <div class="flex items-center flex-row gap-1">
                V
                <input
                  class="border border-gray-300 w-12 text-sm rounded-lg block p-0.5"
                  type="number"
                  min="0"
                  max="100"
                  v-model="brightness"
                  @input="onHsvChanged"
                />
                <input
                  class="w-48"
                  type="range"
                  min="0"
                  max="100"
                  v-model="brightness"
                  @input="onHsvChanged"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- display: flex;
align-items: center;
justify-content: center; -->

<style scoped>
#colorview {
  background-color: rgb(v-bind(red), v-bind(green), v-bind(blue));
}
#textcolor {
  color: v-bind(textColorCode);
}
</style>
