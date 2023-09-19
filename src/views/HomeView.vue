<script setup lang="ts">
import CTextArea from '@/components/CTextArea.vue';
import CTextField from '@/components/CTextField.vue';
import CCard from '@/components/CCard.vue';
import CButton from '@/components/CButton.vue';
import PencilIcon from "@/components/icons/PencilIcon.vue"
import TrashIcon from "@/components/icons/TrashIcon.vue"

import type { Users, Posts } from "../types"

import axios from "axios"
import { ref, computed } from "vue"

const users = ref<Users>([])

axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
  if (res.statusText === "OK") {
    users.value = res.data
    sessionStorage.setItem("users", JSON.stringify(users.value))
  }
})


const posts = ref<Posts>([])
if (!sessionStorage.getItem("posts")) {
  axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
    if (res.statusText === "OK") {
      posts.value = res.data
      sessionStorage.setItem("posts", JSON.stringify(posts.value))
    }
  })
} else {
  posts.value = JSON.parse(sessionStorage.getItem("posts")!)
}

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

const defaultPost = {
  userId: 1,
  title: "",
  body: ""
}

const editedPost = ref(defaultPost)

function savePost() {
  if (editedPost.value.title && editedPost.value.body) {
    if (editedIndex.value > -1) {
      //edit function
      posts.value.splice(editedIndex.value, 1, { ...editedPost.value, id: posts.value[editedIndex.value].id })
      sessionStorage.setItem("posts", JSON.stringify(posts.value))
      editedPost.value = defaultPost
      editedIndex.value = -1
      alert("Post updated!")
    }
    else {
      // add function
      axios.post("https://jsonplaceholder.typicode.com/posts", editedPost.value).then(res => {
        if (res.statusText === "Created") {
          posts.value.unshift(res.data)
          sessionStorage.setItem("posts", JSON.stringify(posts.value))
          editedPost.value = defaultPost
          editedIndex.value = -1
          alert("Post created!")
        }
      })
    }
  } else {
    alert("Please add title and content")
  }
}

const editedIndex = ref(-1)

function editPost(id: number | undefined) {
  if (id) {
    editedIndex.value = posts.value.findIndex((post) => {
      return post.id === id
    })
    editedPost.value = { ...posts.value[editedIndex.value] }
  }
}

</script>

<template>
  <div>
    <!-- Create new post -->
    <CCard>
      <h1 class="text-2xl pb-3">{{ editedIndex > -1 ? "Edit" : "Create new" }} post</h1>
      <div>
        <div class="pb-2">
          <CTextField label="Title" v-model="editedPost.title"></CTextField>
          <CTextArea label="Content" v-model="editedPost.body"></CTextArea>
        </div>
        <div class="flex justify-end">
          <CButton @click="savePost()"> Post </CButton>
        </div>
      </div>

    </CCard>
    <!-- Posts -->
    <CCard v-for="post of postsWithUser" :key="post?.id">
      <div class="flex items-start">
        <h3 class="pb-3 font-semibold">{{ post?.posterName }}</h3>
        <div class="flex-1"></div>
        <div>
          <button class="hover:bg-gray-100 active:bg-gray-300 p-1 rounded-lg">
            <PencilIcon @click="editPost(post?.id)" class="w-6"></PencilIcon>
          </button>
          <button class="hover:bg-gray-100 active:bg-gray-300 p-1 rounded-lg">
            <TrashIcon class="w-6"></TrashIcon>
          </button>
        </div>
      </div>
      <h2 class="pb-1 text-xl capitalize"> {{ post?.title }}</h2>
      <pre class="font-sans">{{ post?.body }}</pre>
    </CCard>
  </div>
</template>