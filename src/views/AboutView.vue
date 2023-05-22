<script setup lang="ts">
import { defineComponent } from "vue";
import ColorPicker from "@/components/color_picker/ColorPicker.vue";

defineComponent({
  name: "AboutView",
  components: {
    ColorPicker,
  },
});
</script>

<template>
  <div class="about">
    <!-- <ColorPicker :min="1" :max="10" :default-value="5" /> -->
    <ColorPicker
      @onChanged="
        (code) => {
          // console.log(code);
        }
      "
    />
    <ColorPicker />
    <ColorPicker />
    <ColorPicker />
    <ColorPicker />
    <ColorPicker />
    <ColorPicker />
    <ColorPicker />
    <h1>This is an about page</h1>
  </div>
</template>
