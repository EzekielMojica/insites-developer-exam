type User = {
  id: number;
  name: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Users = User[];

type Posts = Post[];

export type { User, Post, Users, Posts };
