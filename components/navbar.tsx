import { NextPage } from "next";
import Link from "next/link";
import { PostType } from "../libs/props";

type AllPosts = {
  allPosts: PostType[];
};

const Navbar: NextPage<AllPosts> = ({ allPosts }) => {
  return (
    <nav className="h-screen text-blue-500 bg-slate-700">
      <div className="w-full h-12 bg-slate-800 grid justify-center content-center">
        <Link
          href="/"
          className="text-3xl text-center block hover:text-blue-700 transition font-medium rounded-br"
        >
          NotNeet
        </Link>
      </div>
      <ul className="">
        {allPosts.map((post, i) => (
          <li
            key={i}
            className="hover:bg-slate-600 transition text-center py-1"
          >
            {" "}
            <Link
              as={`/docs/${post.slug}`}
              href="/docs/[slug]"
              className="hover:text-blue-600 transition"
            >
              {post.slug}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
