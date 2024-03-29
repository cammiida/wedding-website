import { buildImageUrl } from "~/utils/image";

const Program = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-lg flex-col gap-10 px-5 pb-10 lg:px-0">
      <section className="flex flex-col">
        <h1 className="pb-2 font-roboto text-4xl font-semibold group-hover:subpixel-antialiased	">
          Program
        </h1>
        <p className="text-grey">
          The wedding will be taking place at Bygdin Mountain Hotel, in the
          southern part of the majestic Jotunheimen mountain range, Norway. The
          wedding service itself will be held at the cabin on Saturday
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
          possible to make your visit shorter (or longer!) if you prefer. <br />
          <br />
          We kindly ask that you do not bring presents. Folks are travelling a
          long way to be at the wedding and your attendance is more than enough.
        </p>
      </section>
      <table className="table-auto border-collapse border-spacing-x-1 border-spacing-y-5">
        <thead>
          <tr>
            <th className="w-1/3 border border-grey-transparent p-2 text-left">
              Day
            </th>
            <th className="w-2/3 border border-grey-transparent p-2 text-left">
              Activity
            </th>
          </tr>
        </thead>
        <tbody className="text-grey">
          <tr>
            <td className="border border-grey-transparent p-2">
              Friday evening
            </td>
            <td className="border border-grey-transparent p-2">
              Check-in from 15:00. <br />
              Dinner at the hotel, followed by low-key activities, including
              quiz and other games.
            </td>
          </tr>
          <tr>
            <td className="border border-grey-transparent p-2">
              Saturday morning
            </td>
            <td className="border border-grey-transparent p-2">
              Breakfast at the hotel.
              <br />
              Possibly some outdoor activities for those who are interested,
              including hiking and relaxing.
            </td>
          </tr>
          <tr>
            <td className="border border-grey-transparent p-2">
              Saturday afternoon
            </td>
            <td className="border border-grey-transparent p-2">
              🎉 <b>Outdoor wedding ceremony</b> 🎉 <br />
              (weather permitting)
            </td>
          </tr>
          <tr>
            <td className="border border-grey-transparent p-2">
              Saturday evening
            </td>
            <td className="border border-grey-transparent p-2">
              Celebration dinner at the hotel. <br />
              Drinks and dancing till late. 💃 🪩
            </td>
          </tr>
          <tr>
            <td className="border border-grey-transparent p-2">
              Sunday morning
            </td>
            <td className="border border-grey-transparent p-2">
              Breakfast at the hotel.
              <br />
              Check-out by 11:00.
            </td>
          </tr>
        </tbody>
      </table>
      <section>
        <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased">
          Dress code
        </h2>
        <p className="text-grey">
          Outside, the most important thing is to wear warm clothes! It can be
          cold, with the average temperature in June being around 10°C. Warm
          clothes include a base layer such as wool, mid-layers to insulate
          (wool, down, fleece), and an outer layer for rain and wind. A woollen
          hat and gloves will also be handy! Sturdy hiking shoes are a good idea
          if you want to do some hiking. Weather permitting, the service on
          Saturday will be just outside the cabin. Dress to impress, but staying
          warm is most important, so feel free to wear your down jacket over the
          top. If you have a{" "}
          <a
            href="https://en.wikipedia.org/wiki/Bunad"
            target="_blank"
            rel="noreferrer"
            className="text-blue hover:underline"
          >
            bunad
          </a>
          , we would love to see you in it! Camilla will be changing out of her
          bunad after the ceremony for the dinner and dancing.
        </p>
      </section>
      <section className="flex flex-col">
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
          ) is family owned and is run by Tor Oxhovd Svalesen together with his
          mother, Bente Oxhovd. Named after the lake on which it is built, it is
          located 1,065 metres above sea level. It was built in 1897 and still
          maintains a lot of the charm and character from these early days,
          although it has undergone many renovations to make it more comfortable
          by modern standards.
          <img
            alt="Jotunheimen hotell i 1910"
            src={buildImageUrl({
              imgUri: "jotunheimen-hotel-i-1910.jpg",
              mode: "landscape_small",
              customTransformation: "g_south",
            })}
            className="my-8 w-full rounded-md"
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
          restaurant after a long day in nature! There's also a{" "}
          <a
            target="_blank"
            href="https://www.synshorn.no/"
            rel="noreferrer"
            className="text-blue hover:underline"
          >
            via ferrata
          </a>{" "}
          nearby the cabin.
        </p>
      </section>
      <section>
        <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased">
          The Weather
        </h2>
        <p className="text-grey">
          Even in June, which is the Norwegian summer, it can be a little cold,
          so pack some warm clothes. Also, the days are long and the sun doesn't
          set before 10pm, so we will make sure there's plenty of coffee to
          enjoy.
        </p>
      </section>
    </div>
  );
};

export default Program;
