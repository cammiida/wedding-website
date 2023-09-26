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
            majestic Jotunheimen mountain range, Norway. Read more the hotel and how to get there here."
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
    <div
      className={`flex flex-col items-center gap-6 lg:items-start lg:justify-center lg:gap-8 ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <Link to={link} className="group w-2/3 lg:w-1/4">
        <h3 className="font-roboto text-2xl font-semibold text-light-green group-hover:subpixel-antialiased	">
          {title.toLocaleUpperCase()}
        </h3>
        <p className="pt-4 font-thin text-beige">{content}</p>
      </Link>
      <img
        src={buildImageUrl({ imageName: img, mode: "landscape" })}
        className="w-2/3 rounded-md lg:w-1/4"
        alt=""
      />
    </div>
  );
};

export default MountainContent;
