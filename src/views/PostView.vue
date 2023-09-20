<template>
  <div>
    <img
      v-if="post?.bannerImg"
      class="h-auto mx-auto pb-8"
      :src="post?.bannerImg"
      :alt="post?.title + ' banner'"
    />

    <div>
      <h1 class="text-3xl capitalize pb-8">{{ post?.title }}</h1>

      <p class="whitespace-pre text-justify">
        {{ post?.body }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { Posts, Post } from "@/types";

const posts = ref<Posts>(JSON.parse(sessionStorage.getItem("posts")!));

const post = ref<Post>();

const route = useRoute();
const router = useRouter();

post.value = posts.value.find((post) => {
  return post.pageSlug === route.params.slug;
});

if (post.value?.status === "Unpublished") {
  router.push("/");
}
</script>
