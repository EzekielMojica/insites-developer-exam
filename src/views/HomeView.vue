<script setup lang="ts">
import CTextArea from '@/components/CTextArea.vue';
import CTextField from '@/components/CTextField.vue';
import CCard from '@/components/CCard.vue';

import type { Users, Posts } from "../types"

import axios from "axios"
import { ref, computed } from "vue"

const users = ref<Users>([])

axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
  if (res.statusText === "OK") {
    users.value = res.data
  }
})

const posts = ref<Posts>([])

axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
  if (res.statusText === "OK") {
    posts.value = res.data
  }
})

const postsWithUser = computed(() => {
  return posts.value.map((post) => {
    const postUser = users.value.find((user) => {
      return user.id === post.userId
    })
    if (postUser) {
      return {
        ...post,
        posterName: postUser.name
      }
    }
  })
})

</script>

<template>
  <div>
    <!-- Create new post -->
    <CCard>
      <h1 class="text-2xl pb-3">Create new post</h1>
      <div>
        <CTextField label="Title"></CTextField>
        <CTextArea label="Content"></CTextArea>
      </div>
    </CCard>
    <!-- Posts -->
    <CCard v-for="post of postsWithUser" :key="post?.id">
      <h3 class="pb-3 font-semibold">{{ post?.posterName }}</h3>
      <h2 class="pb-1 text-xl capitalize"> {{ post?.title }}</h2>
      <p> {{ post?.body }}</p>
    </CCard>
  </div>
</template>