<template>
  <div>
    {{ post }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import type { Posts, Post } from "@/types";

const posts = ref<Posts>(JSON.parse(sessionStorage.getItem("posts")!));

const post = ref<Post>();

const route = useRoute();

post.value = posts.value.find((post) => {
  return post.pageSlug === route.params.slug;
});
</script>
