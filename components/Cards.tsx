import { NextPage } from "next";
import Link from "next/link";
import { ICard } from "../libs/props";

const Card: NextPage<ICard> = ({ url, title, description }) => {
  return (
    <div className="p-2 w-56 h-32 grid content-center justify-center text-center border-2 hover:bg-blue-900 border-blue-500 hover:text-blue-300 transition-all hover:rounded-xl duration-300 ease-in-out">
      <Link href={url} className="hover:text-blue-500 transition text-lg">
        {title}
      </Link>
      <p className="text-slate-50 w-32 pt-1">{description}</p>
    </div>
  );
};

export default Card;
