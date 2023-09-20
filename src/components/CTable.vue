<template>
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 border">
            <thead>
                <tr>
                    <!-- Table header -->
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                        v-for="header of headers" :key="header.value">
                        {{ header.text }}
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <!-- Table rows  -->
                <tr v-for="(item, i) of items" :key="i">
                    <td v-for="(header, j) in headers" :key="j" class="px-6 py-4">
                        <slot :name="`item-${header.value}`" :item="item">
                            {{ item?.[header.value] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template> 

<script setup lang="ts">

type Header = {
    text: string;
    value: string
}

defineProps<{
    headers: Header[]
    items: { [key: string]: any }
}>()
</script>