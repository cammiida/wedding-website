import { Link } from "@remix-run/react";

const MountainContent = () => {
  return (
    <div className="flex flex-col gap-16 md:grid md:grid-rows-3 md:gap-12">
      <Element
        title="HOW C&T MET"
        content="Prepare yourself for an exciting weekend."
        link="/story"
        img="/login-bg.jpg"
      />
      <Element
        title="HOW TO GET THERE"
        content="The wedding will take place at the Bygdin Mountain Hotel in the
            majestic Hardangervidda, Norway. It is a four-hour bus ride from
            Oslo, where Norway's main airport (Gardemoen) is located."
        link="/travel"
        img="/top-of-fjord.jpg"
        reverse
      />
      <Element
        title="WHERE WE CAN SLEEP"
        content=" Prepare yourself for an exciting weekend."
        link="/sleep"
        img="/login-bg.jpg"
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
  img: `/${string}.jpg` | `/${string}.png`;
  reverse?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col items-center gap-6 md:justify-center lg:items-start lg:gap-8 ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <Link to={link} className="group w-2/3 lg:w-1/4">
        <h3 className="font-roboto text-2xl font-semibold text-orange group-hover:subpixel-antialiased	">
          {title.toLocaleUpperCase()}
        </h3>
        <p className="pt-4 font-thin text-grey">{content}</p>
      </Link>
      <img src={img} className="w-2/3 rounded-md lg:w-1/4" alt="" />
    </div>
  );
};

export default MountainContent;
