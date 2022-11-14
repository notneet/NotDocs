import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPosts } from "../libs/api";
import { PostType } from "../libs/props";

type Props = {
  allPosts: PostType[];
};

const Docs: NextPage<Props> = ({ allPosts }) => {
  const [icon, setIcon] = useState(
    "https://avatars.githubusercontent.com/u/109448261?s=200&v=4"
  );
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const morePosts = allPosts?.slice(1);

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
    <div>
      {isLoading ? (
        <>
          <Head>
            <title>NotNeet</title>
            <meta name="description" content="Have an idea? just put it here" />
            <link rel="icon" href={icon} />
          </Head>
          <main className="bg-white dark:bg-slate-800 min-h-screen"></main>
        </>
      ) : (
        <>
          <Head>
            <title>NotNeet</title>
            <meta name="description" content="Have an idea? just put it here" />
            <link rel="icon" href={icon} />
          </Head>

          <main className="bg-white grid dark:bg-slate-800 grid-cols-7 min-h-screen text-slate-50">
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
            <div className="pt-4">QWE</div>
          </main>
        </>
      )}
    </div>
  );
};

export default Docs;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
