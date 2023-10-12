import { Link } from "@remix-run/react";
import { buildImageUrl } from "~/utils/image";

const MountainContent = () => {
  return (
    <div className="flex flex-col gap-16 lg:grid lg:grid-rows-3 lg:gap-20">
      <Element
        title="HOW C&T MET"
        content="Wondering how Camilla and Tyler actually met? Read our story here."
        link="/story"
        img="antibes.jpg"
      />
      <Element
        title="HOW TO GET THERE"
        content="The wedding will take place at the Bygdin Mountain Hotel in the
            majestic Jotunheimen mountain range, Norway. Read more about the hotel and how to get there here."
        link="/travel"
        img="top-of-fjord.jpg"
        reverse
      />
      <Element
        title="PROGRAM"
        content="Wondering what the plan for the weekend looks like? Read more about the program here."
        link="/program"
        img="tyler-outside-bygdin.jpg"
      />
    </div>
  );
};

const Element = ({
  title,
  content,
  link,
  img,
  reverse = false,
}: {
  title: string;
  content: string;
  link: `/${string}`;
  img: `${string}.jpg` | `${string}.png`;
  reverse?: boolean;
}) => {
  return (
    <Link
      to={link}
      className={`group flex flex-col items-center gap-6 lg:items-start lg:gap-8 ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="w-2/3 lg:w-1/2">
        <h3 className="font-roboto text-2xl font-semibold text-light-green group-hover:subpixel-antialiased	">
          {title.toLocaleUpperCase()}
        </h3>
        <p className="pt-4 font-thin text-beige">{content}</p>
      </div>
      <img
        srcSet={`${buildImageUrl({
          imgUri: img,
          customTransformation: "w_600,f_auto,q_auto",
        })} 600w, ${buildImageUrl({
          imgUri: img,
          customTransformation: "w_1000,f_auto,q_auto",
        })} 1000w`}
        className="w-2/3 rounded-md lg:w-1/2"
        alt=""
      />
    </Link>
  );
};

export default MountainContent;
