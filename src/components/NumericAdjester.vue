<script setup lang="ts">
import { ref, toRef, PropType } from "vue";
import { Parameter } from "@/lib/Parameter";

const props = defineProps({
  values: {
    type: Array as PropType<Parameter[]>,
    required: true,
  },
});

const values = toRef(props.values);

let parameterElementId = 0;
const parameterElements = ref<{ id: number; name: string; value: number }[]>(
  []
);
for (const x of values.value) {
  parameterElements.value.push({
    id: parameterElementId++,
    name: x.name,
    value: x.value,
  });
}
</script>

<template>
  <div>
    <div
      v-for="parameterElement in parameterElements"
      :key="parameterElement.id"
    >
      <label>{{ parameterElement.name }}</label>
    </div>
  </div>
  <div>
    <div
      v-for="parameterElement in parameterElements"
      :key="parameterElement.id"
    >
      <input type="range" min="0" max="100" />
    </div>
  </div>
</template>
