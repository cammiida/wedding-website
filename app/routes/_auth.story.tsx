import { useRef, type PropsWithChildren, useEffect, useState } from "react";
import Header from "~/components/header";
import { buildImageUrl } from "~/utils/image";

const Story = () => {
  return (
    <>
      <Header />
      <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-10 px-5 pb-10 lg:px-0 lg:pt-20">
        <h1 className="pb-2 font-roboto text-4xl font-semibold group-hover:subpixel-antialiased	">
          C&T's Story
        </h1>
        <div className="flex flex-col gap-32">
          <StorySection imgs={[{ uri: "images/story/cc-skiing.jpg", alt: "" }]}>
            <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
              The Meeting
            </h2>
            <p className="text-grey">
              Camilla and Tyler met in 2017 when they were studying at
              university in Trondheim. They bonded over stories of Australia
              (where Tyler is from and Camilla spent a gap year), their
              well-curated meme collections, and a shared love of 80's
              synth-pop, including classics such as Take On Me by A-Ha (this
              will hopefully be played on the dancefloor at the wedding).
            </p>
          </StorySection>
          <StorySection imgs={[{ uri: "images/story/sushi.jpg", alt: "" }]}>
            <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
              Getting to Know Each Other
            </h2>
            <p className="text-grey">
              Between classes in Trondheim, Camilla was working as a bartender
              while Tyler was working as a waiter at a sushi restaurant. They
              soon became regulars at the other's workplaces where they got to
              know eachother better while also benefiting from a steady flow of
              free sushi and alcohol; both valuable commodities as a student in
              Norway.
            </p>
          </StorySection>
          <StorySection
            imgs={[
              { uri: "images/story/darts.jpg", alt: "" },
              {
                uri: "images/story/winnah-winnah-chicken-dinnah.jpg",
                alt: "",
              },
              { uri: "images/story/kvikk-lunsj.jpg", alt: "" },
            ]}
          >
            <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
              Early Dates
            </h2>
            <p className="text-grey">Their early dates included:</p>
            <br />
            <ul className="list-disc text-grey">
              <li>Darts (Camilla was three hours late)</li>
              <li>
                A roast chicken prepared by Tyler (extensive consultation with
                Merinda via phone)
              </li>
              <li>
                Hiking in the woods (“You must learn the ways of my people” said
                Camilla)
              </li>
            </ul>
          </StorySection>
          <StorySection
            imgs={[
              {
                uri: "images/story/skjeberg-cabin.jpg",
                alt: "",
              },
              { uri: "images/story/basel.jpg", alt: "" },
              { uri: "images/story/haircuts-berlin.jpg", alt: "" },
              { uri: "images/story/museum-amsterdam.jpg", alt: "" },
              { uri: "images/story/melbourne-family.jpg", alt: "" },
              { uri: "images/story/redwoods.jpg", alt: "" },
              { uri: "images/story/tuscany-trail-finish.jpg", alt: "" },
              { uri: "images/story/tyler-san-fran.jpg", alt: "" },
              { uri: "images/story/tyler-ny-city.jpg", alt: "" },
              { uri: "images/story/tyler-cc-skiing.jpg", alt: "" },
              { uri: "images/story/hardangervidda-bridge.jpg", alt: "" },
            ]}
          >
            <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
              Favourite Adventures
            </h2>
            <p className="text-grey">
              Tyler got to know Camilla's family better during trips to the
              cabin in Skjeberg, where Kjell (Camilla's grandfather) would teach
              them about plants and history. In 2019, they travelled together
              with Merinda to Scotland where they went to Steve and Ruth's
              wedding in Huntly. Later that year, Camilla, Jan, Tine, and Kjell
              all travelled together to Australia for Christmas where they
              celebrated with Kim, David, and Merinda. In 2021, they also
              travelled to Basel and spent a weekend with Rob and Rolf.
              <br />
              <br />
              Some of their most memorable adventures together include:
              bikepacking from Bergen to Oslo, getting haircuts in Berlin, a
              canal cruise in Amsterdam, clubbing in Madrid, more cycling in
              Italy, sunburns in Gran Canaria, the Pacific Coast Highway in the
              USA, cross country skiing in Norway, pizza slices in New York,
              getting lost in San Francisco, and celebrating Camilla's 25th
              birthday in Lithuania.
            </p>
          </StorySection>
          <StorySection
            imgs={[
              {
                uri: "images/story/moving-van.jpg",
                alt: "",
              },
              { uri: "images/story/golden-gate-bridge.jpg", alt: "" },
              { uri: "images/story/tuscany-trail-fall.jpg", alt: "" },
            ]}
          >
            <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
              Moving to Oslo
            </h2>
            <p className="text-grey">
              In 2019, they moved to Oslo together and have been living and
              working there ever since. We're looking forward to celebrating our
              wedding together with you; to share more stories, and to make more
              wonderful memories.
            </p>
          </StorySection>
        </div>
      </div>
    </>
  );
};

export default Story;

type Image = { uri: string; alt: string };
type StorySectionProps = PropsWithChildren<{
  imgs: Image[];
}>;

const StorySection = ({ imgs, children }: StorySectionProps) => {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollToSeeMore, setShowScrollToSeeMore] = useState(false);

  useEffect(() => {
    setShowScrollToSeeMore(
      (imgContainerRef.current?.scrollWidth ?? 0) >
        (outerContainerRef.current?.scrollWidth ?? 0)
    );
  }, []);

  return (
    <div
      ref={outerContainerRef}
      className={`flex flex-col justify-center gap-8`}
    >
      <section className="flex flex-1 flex-col">{children}</section>
      {showScrollToSeeMore && (
        <p className="underline">Scroll to see more &gt;&gt;</p>
      )}
      <div
        ref={imgContainerRef}
        className="mx-auto flex max-w-full overflow-x-auto rounded-md"
      >
        {imgs.length > 0 &&
          imgs.map(({ uri, alt }) => (
            <img
              key={uri}
              alt={alt}
              src={buildImageUrl({
                imgUri: uri,
                customTransformation: "q_auto",
              })}
              className="max-h-64"
            />
          ))}
      </div>
    </div>
  );
};
