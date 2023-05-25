<script setup lang="ts">
import { ref } from "vue";
import { Color } from "@/lib/Color";

const emit = defineEmits<{
  (e: "onChanged", color: Color): void;
}>();

const SetColor = (color: Color) => {
  reflesh(color, true, true);
};

const red = ref(0);
const green = ref(0);
const blue = ref(0);
const hue = ref(0);
const saturation = ref(0);
const brightness = ref(0);
const colorCode = ref("");
const textColorCode = ref("");

// initialize.
reflesh(new Color(0, 0, 0), true, true);

function fromRgb(): Color {
  return new Color(red.value / 255.0, green.value / 255.0, blue.value / 255.0);
}

function fromHsv(): Color {
  return Color.FromHsv(
    hue.value,
    saturation.value / 100,
    brightness.value / 100
  );
}

function reflesh(color: Color, resetRgb: boolean, resetHsv: boolean) {
  resetColor(color, resetRgb, resetHsv);
  resetColorCode(color);
  resetTextColorCode(color);
  emit("onChanged", color);
}

function resetColor(color: Color, resetRgb: boolean, resetHsv: boolean) {
  if (resetRgb) {
    red.value = Math.round(color.R * 255.0);
    green.value = Math.round(color.G * 255.0);
    blue.value = Math.round(color.B * 255.0);
  }
  if (resetHsv) {
    let hsv = color.ToHsv();
    hue.value = Math.round(hsv[0]);
    saturation.value = Math.round(hsv[1] * 100.0);
    brightness.value = Math.round(hsv[2] * 100.0);
  }
}

function resetColorCode(color: Color) {
  colorCode.value = color.ToCode();
}

function resetTextColorCode(color: Color) {
  if (color.GetLuminance() > 0.5) {
    textColorCode.value = "#0d0d0d";
  } else {
    textColorCode.value = "#f2f2f2";
  }
}

const onRgbChanged = () => {
  reflesh(fromRgb(), false, true);
};

const onHsvChanged = () => {
  reflesh(fromHsv(), true, false);
};

const onColorCodeChanged = () => {
  let nextColor: Color = new Color(0, 0, 0);
  let currentCode = fromRgb().ToCode();
  try {
    nextColor = Color.FromCode(colorCode.value);
  } catch (err) {
    nextColor = Color.FromCode(currentCode);
  }
  reflesh(nextColor, true, true);
};

defineExpose({
  SetColor,
});
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
