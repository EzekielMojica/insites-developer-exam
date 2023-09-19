<template>
    <div>
        <label :for="id" class="block text-gray-600 font-medium mb-2">
            {{ label }}
        </label>
        <input :id="id" type="text" :placeholder="placeholder" :value="modelValue"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            @input="updateModelValue($event.target as HTMLInputElement)" />
    </div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid"
defineProps({
    label: String,
    modelValue: String,
    placeholder: String
})

const id = nanoid()

const emit = defineEmits(["update:modelValue"])

function updateModelValue(target: HTMLInputElement) {
    emit("update:modelValue", (target.value))
}
</script>
