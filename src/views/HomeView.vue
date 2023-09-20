<script setup lang="ts">
import CTextArea from "@/components/CTextArea.vue";
import CTextField from "@/components/CTextField.vue";
import CAutoComplete from "@/components/CAutoComplete.vue";
import CCard from "@/components/CCard.vue";
import CButton from "@/components/CButton.vue";
import CTable from "@/components/CTable.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import PublishIcon from "@/components/icons/PublishIcon.vue";
import PublishOffIcon from "@/components/icons/PublishOffIcon.vue";

import type { Users, Posts, Post } from "../types";

import axios from "axios";
import { ref, computed } from "vue";
import PreviewIcon from "@/components/icons/PreviewIcon.vue";
import { useRouter } from "vue-router";

const users = ref<Users>([]);

axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
  if (res.statusText === "OK") {
    users.value = res.data;
    sessionStorage.setItem("users", JSON.stringify(users.value));
  }
});

const posts = ref<Posts>([]);
if (!sessionStorage.getItem("posts")) {
  axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
    if (res.statusText === "OK") {
      posts.value = res.data.map((item: Post) => {
        item.pageSlug = toKebabCase(item.title);
        item.bannerImg = "";
        item.status = "Published";
        return item;
      });
      sessionStorage.setItem("posts", JSON.stringify(posts.value));
    }
  });
} else {
  posts.value = JSON.parse(sessionStorage.getItem("posts")!);
}

function toKebabCase(string: string) {
  return string.toLocaleLowerCase().replace(/\s/g, "-");
}

const postsWithUser = computed(() => {
  return posts.value.map((post) => {
    const postUser = users.value.find((user) => {
      return user.id === post.userId;
    });
    if (postUser) {
      return {
        ...post,
        posterName: postUser.name,
      };
    }
  });
});

const defaultPost: {
  userId: number;
  title: string;
  body: string;
  pageSlug: string;
  bannerImg: string;
  status: "Published" | "Unpublished";
} = {
  userId: 1,
  title: "",
  body: "",
  pageSlug: "",
  bannerImg: "",
  status: "Published",
};

const editedPost = ref({ ...defaultPost });

function savePost() {
  const titleIsUnique =
    posts.value.findIndex(
      (post) =>
        post.title.toLowerCase() === editedPost.value.title.toLowerCase()
    ) === editedIndex.value;

  if (editedPost.value.title && editedPost.value.body && titleIsUnique) {
    if (editedIndex.value > -1) {
      //edit function
      editedPost.value.pageSlug = toKebabCase(editedPost.value.title);
      posts.value.splice(editedIndex.value, 1, {
        ...editedPost.value,
        id: posts.value[editedIndex.value].id,
      });
      sessionStorage.setItem("posts", JSON.stringify(posts.value));
      editedPost.value = defaultPost;
      editedIndex.value = -1;
      alert("Post updated!");
    } else {
      // add function
      editedPost.value.pageSlug = toKebabCase(editedPost.value.title);
      posts.value.unshift({ ...editedPost.value, id: posts.value.length + 1 });
      sessionStorage.setItem("posts", JSON.stringify(posts.value));
      editedPost.value = defaultPost;
      editedIndex.value = -1;
      alert("Post created!");
    }
  } else {
    if (!titleIsUnique) {
      alert("Title must be unique");
    } else {
      alert("Please check the title and content!");
    }
  }
}

const editedIndex = ref(-1);

function editPost(id: number | undefined) {
  if (id) {
    editedIndex.value = posts.value.findIndex((post) => {
      return post.id === id;
    });
    editedPost.value = { ...posts.value[editedIndex.value] };
  }
}

function deletePost(id: number | undefined) {
  if (id) {
    if (confirm("Are you sure you want to delete this post?")) {
      const index = posts.value.findIndex((post) => {
        return post.id === id;
      });
      posts.value.splice(index, 1);
      sessionStorage.setItem("posts", JSON.stringify(posts.value));
      editedPost.value = defaultPost;
      editedIndex.value = -1;
      alert("Post deleted!");
    }
  }
}

const postsHeaders = [
  { text: "ID", value: "id" },
  { text: "User ID", value: "userId" },
  { text: "User Name", value: "posterName" },
  { text: "Title", value: "title" },
  { text: "Content", value: "body" },
  { text: "Page Slug", value: "pageSlug" },
  { text: "Banner Image", value: "bannerImg" },
  { text: "Status", value: "status" },
  { text: "Actions", value: "actions" },
];

function toogleStatus(id: number | null) {
  if (id) {
    const index = posts.value.findIndex((post) => {
      return post.id === id;
    });

    let status: "Published" | "Unpublished" = "Published";
    if (posts.value[index].status === "Published") {
      status = "Unpublished";
    } else {
      status = "Published";
    }

    posts.value.splice(index, 1, {
      ...posts.value[index],
      status: status,
    });
    sessionStorage.setItem("posts", JSON.stringify(posts.value));
  }
}

const router = useRouter();

function preview(slug: string | null) {
  if (slug) {
    const routeData = router.resolve("/post/" + slug);
    window.open(routeData.href, "_blank");
  }
}
</script>

<template>
  <div>
    <!-- Create new post -->
    <CCard>
      <h1 class="text-2xl pb-3">
        {{ editedIndex > -1 ? "Edit" : "Create new" }} post
      </h1>
      <div>
        <div class="pb-2">
          <CTextField label="Title" v-model="editedPost.title"></CTextField>
          <CTextArea label="Content" v-model="editedPost.body"></CTextArea>
          <CAutoComplete label="Status" v-model="editedPost.status">
            <option value="Published">Published</option>
            <option value="Unpublished">Unpublished</option>
          </CAutoComplete>
          <CTextField
            label="Banner Image Link"
            v-model="editedPost.bannerImg"
          ></CTextField>
        </div>
        <div class="flex justify-end">
          <CButton @click="savePost()"> Post </CButton>
        </div>
      </div>
    </CCard>
    <!-- Posts -->
    <div class="pb-3">
      <CCard>
        <CTable :items="postsWithUser" :headers="postsHeaders">
          <template #item-bannerImg="{ item }">
            <div>
              <img
                v-if="item?.bannerImg"
                :src="item?.bannerImg"
                :alt="item?.title + ' banner'"
              />
            </div>
          </template>
          <template #item-actions="{ item }">
            <div>
              <button
                class="hover:bg-gray-100 active:bg-gray-300 p-1 rounded-lg"
              >
                <PencilIcon
                  @click="editPost(item?.id)"
                  class="w-6"
                ></PencilIcon>
              </button>

              <button
                class="hover:bg-gray-100 active:bg-gray-300 p-1 rounded-lg"
              >
                <TrashIcon
                  @click="deletePost(item?.id)"
                  class="w-6"
                ></TrashIcon>
              </button>

              <button
                class="hover:bg-gray-100 active:bg-gray-300 p-1 rounded-lg"
              >
                <PublishIcon
                  v-if="item?.status === 'Unpublished'"
                  @click="toogleStatus(item?.id)"
                  class="w-6"
                ></PublishIcon>
                <PublishOffIcon
                  v-else
                  @click="toogleStatus(item?.id)"
                  class="w-6"
                ></PublishOffIcon>
              </button>

              <button
                v-if="item?.status === 'Published'"
                @click="preview(item?.pageSlug)"
                class="hover:bg-gray-100 active:bg-gray-300 p-1 rounded-lg"
              >
                <PreviewIcon class="w-6"></PreviewIcon>
              </button>
            </div>
          </template>
        </CTable>
      </CCard>
    </div>
  </div>
</template>
