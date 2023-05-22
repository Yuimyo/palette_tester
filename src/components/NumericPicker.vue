<script setup lang="ts">
import { ref, computed } from "vue";
const props = defineProps({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  defaultValue: Number,
  hogere: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{
  change: [value: number];
}>();

const onValueChanged = () => {
  normalizeValue();
  emit("change", value.value);
};

const normalizeValue = () => {
  if (value.value > props.max) {
    value.value = props.max!;
  }
  if (value.value < props.min) {
    value.value = props.min;
  }
};

const normalizedSize = computed(() => {
  console.log(props.hogere);
  return props.hogere;
});
const value = ref(0);
if (props.defaultValue != null) {
  value.value = props.defaultValue!;
}

onValueChanged();
</script>

<template>
  <div class="inline-block">
    <div class="flex flex-row gap-1">
      <input
        class="border border-gray-300 w-14 text-sm rounded-lg block p-1"
        type="number"
        min="0"
        max="{{ max }}"
        v-model="value"
        @input="onValueChanged"
      />
      <input
        class="w-64"
        type="range"
        min="0"
        max="{{ max }}"
        v-model="value"
        @input="onValueChanged"
      />
    </div>
  </div>
</template>
