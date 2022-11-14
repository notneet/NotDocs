import { NextPage } from "next";
import { useRouter } from "next/router";
import { PostType } from "../../libs/props";
import Head from "next/head";
import { useEffect, useState } from "react";
import PostBody from "../../components/post-body";
import { getAllPosts, getPostBySlug } from "../../libs/api";
import markdownToHtml from "../../libs/markdownToHtml";
import PostTitle from "../../components/post-title";
import DateFormatter from "../../components/date-formatter";
import Navbar from "../../components/navbar";

type Props = {
  post: PostType;
  allPosts: PostType[];
};

const ShowDoc: NextPage<Props> = ({ post, allPosts }) => {
  const router = useRouter();
  const [icon, setIcon] = useState(
    "https://avatars.githubusercontent.com/u/109448261?s=200&v=4"
  );
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/notneet`)
      .then((res) => res.json())
      .then((data) => {
        setIcon(data.avatar_url);
        setDescription(data.bio);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>NotNeet</title>
        <meta name="description" content="Have an idea? just put it here" />
        <link rel="icon" href={icon} />
      </Head>

      <main className="bg-white grid dark:bg-slate-800 grid-cols-7 min-h-screen text-slate-50 h-screen">
        <Navbar allPosts={allPosts} />
        <article className="mb-6 col-span-6 pt-4 px-6 overflow-y-scroll items-center">
          <PostTitle>{post.title}</PostTitle>
          <PostBody content={post.content} />

          <footer className="grid grid-cols-1 justify-start mt-10 text-sm">
            <div className="flex">
              <p className="mr-1">Created by</p>
              <a
                className="text-blue-300 hover:text-blue-400 transition"
                href={`${post.author.github}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {post.author.name}
              </a>
              <p className="ml-1">
                at <DateFormatter dateString={post.date} />
              </p>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
};

export default ShowDoc;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
      allPosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
