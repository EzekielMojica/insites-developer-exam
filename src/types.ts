type User = {
  id: number;
  name: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  pageSlug: string;
  bannerImg: string;
  status: "Published" | "Unpublished";
};

type Users = User[];

type Posts = Post[];

export type { User, Post, Users, Posts };
