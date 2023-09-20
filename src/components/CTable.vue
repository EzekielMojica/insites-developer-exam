<template>
    <div>
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
                    <tr v-for="(item, i) of displayedItems" :key="i">
                        <td v-for="(header, j) in headers" :key="j" class="px-6 py-4">
                            <slot :name="`item-${header.value}`" :item="item">
                                {{ item?.[header.value] }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Pagination controls -->
        <div class="mt-4 flex items-center justify-center space-x-2">

            <button class="hover:bg-gray-100 active:bg-gray-300 p-1 rounded-lg">
                <ArrowLeftIcon @click="previousPage()" class="w-6"></ArrowLeftIcon>
            </button>
            <button v-for="pageNumber in pages" :key="pageNumber" @click="gotoPage(pageNumber)" :class="[
                'hover:bg-gray-100 active:bg-gray-300 p-1 rounded-lg px-3',
                currentPage === pageNumber ? 'border-black border-2 hover:bg-gray-300' : 'bg-white text-gray-600',
            ]">
                {{ pageNumber }}
            </button>
            <button class="hover:bg-gray-100 active:bg-gray-300 p-1 rounded-lg">
                <ArrowRightIcon @click="nextPage()" class="w-6"></ArrowRightIcon>
            </button>
        </div>
    </div>
</template> 

<script setup lang="ts">
import { ref, computed } from 'vue';

import ArrowLeftIcon from './icons/ArrowLeftIcon.vue';
import ArrowRightIcon from './icons/ArrowRightIcon.vue';

type Header = {
    text: string;
    value: string
}

const props = defineProps<{
    headers: Header[]
    items: { [key: string]: any }
}>()


const currentPage = ref(1);
const perPage = 10; // Number of items per page

const totalPages = computed(() => Math.ceil(props.items.length / perPage));

const displayedItems = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    const end = start + perPage;
    return props.items.slice(start, end);
});

// Pagination
const pages = computed(() => {
    const maxPages = 5; // Maximum number of page buttons to display
    const halfMaxPages = Math.floor(maxPages / 2);
    const startPage = Math.max(1, currentPage.value - halfMaxPages);
    const endPage = Math.min(totalPages.value, startPage + maxPages - 1);

    const result = [];
    for (let i = startPage; i <= endPage; i++) {
        result.push(i);
    }

    return result;
});

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function gotoPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        currentPage.value = pageNumber;
    }
}
</script>