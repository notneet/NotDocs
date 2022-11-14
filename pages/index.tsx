import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "../components/Cards";
import styles from "../styles/Home.module.css";

export default function Home() {
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

          <main className="bg-white dark:bg-slate-800 grid py-16 justify-center align-center min-h-screen text-slate-50">
            <h1 className="text-center text-6xl">
              We are{" "}
              <Link
                href="https://github.com/notneet"
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                NotNeet!
              </Link>
            </h1>

            <p className={styles.description}>{description}</p>

            <div className="grid grid-rows-4 grid-flow-col gap-4 justify-center">
              <Card
                url="https://notneet.my.id"
                title="Homepage"
                description="Go to front page"
              />
              <Card
                url="docs"
                title="Documentation"
                description="Read the docs"
              />
              <Card
                url="https://api.notneet.my.id"
                title="Status"
                description="See api status"
              />
              <Card
                url="https://github.com/notneet/.github/blob/main/profile/README.md"
                title="About Us"
                description="Come get to know us closer!"
              />
            </div>
          </main>
        </>
      )}

      <footer className="bg-white dark:bg-slate-800 grid jutify-center align-center text-center pb-2 text-slate-50">
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Powered by NextJS
        </a>
      </footer>
    </div>
  );
}
