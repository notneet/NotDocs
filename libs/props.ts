export interface ICard {
  url: string;
  title: string;
  description: string;
}

export type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
};

export type Author = {
  name: string;
  picture: string;
  github: string;
};
