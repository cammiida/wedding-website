import Header from "~/components/header";

const Sleep = () => {
  return (
    <>
      <Header position="relative" />
      <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-10 px-5 pb-10 md:pt-20 lg:px-0">
        <section className="flex flex-col items-center">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            The Cabin
          </h2>
          <p className="text-grey">
            <a
              href="https://www.bygdin.com/"
              target="_blank"
              className="text-blue hover:underline"
              rel="noreferrer"
            >
              Bygdin Mountain Hotel
            </a>{" "}
            (site translated to English{" "}
            <a
              href="https://www-bygdin-com.translate.goog/?_x_tr_sl=no&_x_tr_tl=en"
              target="_blank"
              className="text-blue hover:underline"
              rel="noreferrer"
            >
              here
            </a>
            ) is family owned and is run by Tor Oxhovd Svalesen together with
            his mother, Bente Oxhovd. Named after the lake on which it is built,
            it is located 1,065 metres above sea level. It was built in 1897 and
            still maintains a lot of the charm and character from these early
            days, although it has undergone many renovations to make it more
            comfortable by modern standards.
            <img
              alt="Jotunheimen hotell i 1910"
              src="/jotunheimen-hotel-i-1910.jpg"
              className="mx-auto my-8 rounded-md"
            />
            It is located in the southern part of the majestic{" "}
            <a
              href="https://en.wikipedia.org/wiki/Jotunheimen"
              target="_blank"
              className="text-blue hover:underline"
              rel="noreferrer"
            >
              Jotunheimen National Park
            </a>
            . Jotunheimen means “the home of the giants” and, covering roughly
            3,500 square kilometres, it's here you'll find some of the most{" "}
            <a
              href="https://ut.no/utforsker/omrade/1231/jotunheimen/turforslag"
              target="_blank"
              className="text-blue hover:underline"
              rel="noreferrer"
            >
              famous hiking trails
            </a>{" "}
            in Norway, including{" "}
            <a
              href="https://www.visitnorway.com/places-to-go/eastern-norway/the-jotunheimen-mountains/hiking-the-besseggen-ridge/"
              target="_blank"
              className="text-blue hover:underline"
              rel="noreferrer"
            >
              Besseggen
            </a>
            ,{" "}
            <a
              href="https://jotunheimen.com/activities/svartdalen-the-black-valley/en4/"
              target="_blank"
              className="text-blue hover:underline"
              rel="noreferrer"
            >
              Svartdalen
            </a>{" "}
            and{" "}
            <a
              href="https://jotunheimen.com/activities/galdhopiggen/en140/"
              target="_blank"
              className="text-blue hover:underline"
              rel="noreferrer"
            >
              Galdhøpiggen
            </a>
            . If you have the time to extend your stay a little, we highly
            recommend exploring some of the surrounding mountains, lakes, and
            glaciers! There are many cabins run by the{" "}
            <a
              href="https://www.dntoslo.no/dnt-hytter-i-jotunheimen/"
              target="_blank"
              className="text-blue hover:underline"
              rel="noreferrer"
            >
              Norwegian Hiking Association
            </a>{" "}
            that you can visit or stay at while you wander. They have basic
            accommodation in dormitories, or private rooms. Many also serve
            delicious three-course dinners which taste like a Michelin-star
            restaurant after a long day in nature! Even in June, which is the
            Norwegian summer, it can be a little cold, so pack some warm
            clothes. Also, the days are long and the sun doesn't set before
            10pm, so we will make sure there's plenty of coffee to enjoy.
          </p>
        </section>
        <section className="flex flex-col items-center">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            Program
          </h2>
          <p className="text-grey">
            The wedding service itself will be held at the cabin on Saturday
            afternoon. If you have a{" "}
            <a
              href="https://en.wikipedia.org/wiki/Bunad"
              target="_blank"
              className="text-blue hover:underline"
              rel="noreferrer"
            >
              bunad
            </a>
            , we would love to see you in it! This will be followed by a dinner
            party and dancing late into the night. We have the whole cabin from
            Friday to Sunday and there will be optional activities on the Friday
            night and Saturday morning, including dinner, drinks, quiz, hiking,
            fishing, and just relaxing with a beautiful view. We'd love to have
            you join from Friday to Sunday if you can, but of course it's also
            possible to make your visit shorter (or longer!) if you prefer.
          </p>
        </section>
        <section className="flex flex-col items-center">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            Rooms
          </h2>
          <p className="text-grey">
            Rooms There are a number of different rooms you can pick from at the
            hotel. They are all comfortable, but vary slightly in size and
            price.
          </p>
        </section>
      </div>
    </>
  );
};

export default Sleep;
