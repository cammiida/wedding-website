import Header from "~/components/header";
import { buildImageUrl } from "~/utils/image";

const Travel = () => {
  return (
    <>
      <Header position="relative"></Header>
      <div className="relative mx-auto flex w-full max-w-lg flex-col gap-14 px-5 pb-10 md:pt-20 lg:px-0">
        <section className="flex flex-col">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            Travel
          </h2>
          <p className="text-grey">
            The wedding will be taking place at the Bygdin Mountain Hotel, in
            the southern part of the majestic Jotunheimen mountain range, which
            is located about a four and a half hour drive from Oslo, which is
            the closest major city with an airport.
          </p>
        </section>
        <img
          alt="Stylised map of Oslo, Gardermoen, Torp and Bygdin"
          src={buildImageUrl({
            imageName: "map.png",
            customTransformation: "q_auto,w_600",
          })}
          className="w-full"
        />
        <small className="text-right text-brown">Map: Ingvild Høgseth</small>
        <section className="flex flex-col">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            Getting to Oslo
          </h2>
          <p className="text-grey">
            Oslo has two airports: Oslo Airport (Gardermoen) and Sandefjord
            Airport (Torp). Oslo Airport is the largest of the two and is the
            main international airport. There are a range of transport options
            connecting Oslo Airport to central Oslo, including bus, train, and
            car. You can read more about these options here. If you're feeling
            particularly adventurous, or you'd rather not fly, you can also get
            to Oslo via train, bus, car, and even boat.
          </p>
        </section>
        <section className="flex flex-col">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            Getting to Bygdin
          </h2>
          <p className="text-grey">
            The drive from Oslo to Bygdin is beautiful! There is a bus that goes
            from central Oslo all the way to Bygdin called the{" "}
            <b>Valdresekspress</b> (line 161). It takes about 4 hours 15 mins
            and costs NOK 400-600 one-way, depending on the departure time.
            During the summer, there are between one and four buses running the
            route daily. You can book here:{" "}
            <a
              href="https://www.nor-way.no/en"
              className="text-blue hover:underline"
            >
              https://www.nor-way.no/en
            </a>{" "}
            Select departure from Oslo bussterminal and destination Bygdin,
            Vang, Innlandet. You can also drive your own car if you'd prefer and
            this takes about 3 hours 30 mins.
          </p>
        </section>
        <section className="flex flex-col">
          <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
            Travelling together
          </h2>
          <p className="text-grey">
            We've started a group chat on Signal if you'd like to speak with
            other folks who are coming to the wedding. Post a message here if
            you'd like to rent a car together with some friends and make the
            trip together!
          </p>
        </section>
      </div>
    </>
  );
};

export default Travel;
