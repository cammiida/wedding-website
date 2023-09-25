import Header from "~/components/header";

const Story = () => {
  return (
    <>
      <Header position="relative" />
      <div className="relative mx-auto flex w-full max-w-lg flex-col gap-10 px-5 pb-10 lg:px-0 lg:pt-20">
        <h1 className="pb-2 font-roboto text-4xl font-semibold group-hover:subpixel-antialiased	">
          C&T's Story
        </h1>
        <section className="flex flex-col">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            The Meeting
          </h2>
          <p className="text-grey">
            Camilla and Tyler met in 2017 when they were studying at university
            in Trondheim. They bonded over stories of Australia (where Tyler is
            from and Camilla spent a gap year), their well-curated meme
            collections, and a shared love of 80's synth-pop, including classics
            such as Take On Me by A-Ha (this will hopefully be played on the
            dancefloor at the wedding).
          </p>
        </section>
        <section className="flex flex-col">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            Getting to Know Each Other
          </h2>
          <p className="text-grey">
            Between classes in Trondheim, Camilla was working as a bartender
            while Tyler was working as a waiter at a sushi restaurant. They soon
            became regulars at the other's workplaces where they got to know
            eachother better while also benefiting from a steady flow of free
            sushi and alcohol; both valuable commodities as a student in Norway.
          </p>
        </section>
        <section className="flex flex-col">
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
        </section>
        <section className="flex flex-col">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            Favourite Adventures
          </h2>
          <p className="text-grey">
            Tyler got to know Camilla's family better during trips to the cabin
            in Skjeberg, where Kjell (Camilla's grandfather) would teach them
            about plants and history. In 2019, they travelled together with
            Merinda to Scotland where they went to Steve and Ruth's wedding in
            Huntly. Later that year, Camilla, Jan, Tine, and Kjell all travelled
            together to Australia for Christmas where they celebrated with Kim,
            David, and Merinda. In 2021, they also travelled to Basel and spent
            a weekend with Rob and Rolf. Some of their most memorable adventures
            together include: bikepacking from Bergen to Oslo, getting haircuts
            in Berlin, a canal cruise in Amsterdam, clubbing in Madrid, more
            bikepacking in Italy, sunburns in Gran Canaria, hiking in
            Hardangervidda, the Pacific Coast highway in USA, and celebrating
            Camilla's 25th birthday in Lithuania.
          </p>
        </section>
        <section className="flex flex-col">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            Moving to Oslo
          </h2>
          <p className="text-grey">
            In 2019, they moved to Oslo together and have been living and
            working there ever since. We're looking forward to celebrating our
            wedding together with you; to share more stories, and to make more
            wonderful memories.
          </p>
        </section>
      </div>
    </>
  );
};

export default Story;
