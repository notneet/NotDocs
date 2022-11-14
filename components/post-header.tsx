import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import { Author } from "../libs/props";
import Avatar from "./avatar";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <div className="hidden md:block md:mb-3">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mx-auto">
        <div className="mb-8 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
      <PostTitle>{title}</PostTitle>
    </>
  );
};

export default PostHeader;
