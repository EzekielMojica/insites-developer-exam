<template>
    <div>
        <label :for="id" class="block text-gray-600 font-medium mb-2">
            {{ label }}
        </label>
        <textarea :id="id" :value="modelValue" :placeholder="placeholder" rows="4"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            @input="updateModelValue($event.target as HTMLTextAreaElement)">
        </textarea>
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

function updateModelValue(target: HTMLTextAreaElement) {
    emit("update:modelValue", (target.value))
}
</script>
