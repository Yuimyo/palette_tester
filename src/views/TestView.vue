<script setup lang="ts">
import { defineComponent, ref, computed, ComputedRef } from "vue";
import NumericAdjester from "@/components/NumericAdjester.vue";
import { Parameter } from "@/lib/Parameter";

defineComponent({
  name: "TestView",
  components: {
    NumericAdjester,
  },
});

let mapu: Parameter[] = [
  new Parameter("red", 0),
  new Parameter("green", 0),
  new Parameter("blue", 0),
];
</script>

<template>
  <NumericAdjester :values="mapu"></NumericAdjester>
</template>
