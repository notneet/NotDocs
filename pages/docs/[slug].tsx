import { NextPage } from "next";
import { useRouter } from "next/router";
import { PostType } from "../../libs/props";
import ErrorPage from "next/error";
import Head from "next/head";
import { useEffect, useState } from "react";
import PostHeader from "../../components/post-header";
import PostBody from "../../components/post-body";
import { getAllPosts, getPostBySlug } from "../../libs/api";
import markdownToHtml from "../../libs/markdownToHtml";
import Link from "next/link";

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
        <nav className="h-screen text-blue-900 bg-slate-500 pt-4">
          <Link
            href="/"
            className="text-3xl text-center block hover:text-blue-700 transition"
          >
            NotNeet
          </Link>
          <ul className="pt-4">
            {allPosts.map((post, i) => (
              <li
                key={i}
                className="hover:bg-slate-600 transition text-center py-1"
              >
                {" "}
                <Link as={`/docs/${post.slug}`} href="/docs/[slug]">
                  /{post.slug}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className="mb-6 col-span-6 pt-4 px-6 overflow-y-scroll items-center">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={post.content} />
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

  console.log({
    ...post,
    content,
  });

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
