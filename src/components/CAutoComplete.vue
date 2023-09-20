<template>
  <div>
    <label :for="id" class="block text-gray-600 font-medium mb-2">
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring bg-white focus:ring-gray-500"
      @change="updateModelValue(($event.target as HTMLSelectElement).value)"
    >
      <slot></slot>
    </select>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";
defineProps({
  label: String,
  modelValue: String,
});

const id = nanoid();

const emit = defineEmits(["update:modelValue"]);

function updateModelValue(value: string) {
  emit("update:modelValue", value);
}
</script>
