<script setup lang="ts">
// import { computed, ref } from "vue";
// import NumericPicker from "@/components/NumericPicker.vue"; // @ is an alias to /src
// import { RgbToHsv, HsvToRgb, RgbToCode } from "@/lib/ColorHelper";
// // const props = defineProps({
// //   min: {
// //     type: Number,
// //     required: true,
// //   },
// //   max: {
// //     type: Number,
// //     required: true,
// //   },
// //   defaultValue: Number,
// // });

// // const value = ref(props.min!);
// // if (props.defaultValue != null) {
// //   value.value = props.defaultValue!;
// // }

// const hogege = ref(0);

// const red = ref(0);
// const green = ref(0);
// const blue = ref(0);
// const hue = ref(0);
// const saturation = ref(0);
// const brightness = ref(0);

// const onRgbChanged = () => {
//   let hsv = RgbToHsv(red.value / 255, green.value / 255, blue.value / 255);
//   hue.value = Math.round(hsv[0]);
//   saturation.value = Math.round(hsv[1] * 100.0);
//   brightness.value = Math.round(hsv[2] * 100.0);
// };

// const onHsbChanged = () => {
//   let rgb = HsvToRgb(hue.value, saturation.value / 100, brightness.value / 100);
//   red.value = Math.round(rgb[0] * 255.0);
//   green.value = Math.round(rgb[1] * 255.0);
//   blue.value = Math.round(rgb[2] * 255.0);
// };
</script>

<template>
  <!-- <NumericPicker
    :min="0"
    :max="100"
    :hogere="red"
    @change="(x) => (hogege = x)"
  />
  {{ hogege }}
  <div class="grid grid-rows-2 grid-flow-col gap-4">
    <div class="row-span-2" id="dcolview">
      <div id="dcoltex" class="pcs_cp_c">#EADAA6</div>
    </div>
    <div class="border-2 max-w-xs border-amber-300">
      <input
        type="number"
        min="0"
        max="255"
        v-model="red"
        @input="onRgbChanged"
      />
      <input
        type="range"
        min="0"
        max="255"
        v-model="red"
        @input="onRgbChanged"
      />
      <input
        type="number"
        min="0"
        max="100"
        v-model="green"
        @input="onRgbChanged"
      />
      <input
        type="range"
        min="0"
        max="255"
        v-model="green"
        @input="onRgbChanged"
      />
      <input
        type="number"
        min="0"
        max="255"
        v-model="blue"
        @input="onRgbChanged"
      />
      <input
        type="range"
        min="0"
        max="255"
        v-model="blue"
        @input="onRgbChanged"
      />
    </div>
    <div class="border-2 max-w-xs border-cyan-300">
      <div class="grid grid-cols-4">
        <input
          class="border border-gray-300 w-14 text-sm rounded-lg block p-1"
          type="number"
          min="0"
          max="360"
          v-model="hue"
          @input="onHsbChanged"
        />
        <input
          class="col-span-3"
          type="range"
          min="0"
          max="360"
          v-model="hue"
          @input="onHsbChanged"
        />
        <input
          class="border border-gray-300 w-14 text-sm rounded-lg block p-1"
          type="number"
          min="0"
          max="100"
          v-model="saturation"
          @input="onHsbChanged"
        />
        <input
          class="col-span-3"
          type="range"
          min="0"
          max="100"
          v-model="saturation"
          @input="onHsbChanged"
        />
        <input
          class="border border-gray-300 w-14 text-sm rounded-lg block p-1"
          type="number"
          min="0"
          max="100"
          v-model="brightness"
          @input="onHsbChanged"
        />
        <input
          class="col-span-3"
          type="range"
          min="0"
          max="100"
          v-model="brightness"
          @input="onHsbChanged"
        />
      </div>
    </div>
  </div> -->
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
/*
#dcolview {
  background-color: rgb(v-bind(red), v-bind(green), v-bind(blue));
}*/
</style>
