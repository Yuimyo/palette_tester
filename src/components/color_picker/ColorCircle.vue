<script setup lang="ts">
import { ref } from "vue";
import { Color } from "@/lib/Color";

const value = ref(Color.DEFAULT);

const SetColor = (color: Color) => {
  value.value = color;
};

defineExpose({
  SetColor,
});
</script>

<template>
  <div class="m-1">
    <div
      id="filledcolor"
      class="w-10 h-10 rounded-full shadow-md shadow-neutral-300"
    ></div>
  </div>
</template>

<style scoped>
#filledcolor {
  background-color: v-bind(value.ToCode());
}
</style>
