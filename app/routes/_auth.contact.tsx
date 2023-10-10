const Contact = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-lg flex-col gap-10 px-5 pb-10 lg:px-0">
      <h1 className="pb-2 font-roboto text-4xl font-semibold group-hover:subpixel-antialiased	">
        Contact
      </h1>
      <section>
        <h2 className="pb-2 font-roboto text-2xl font-semibold group-hover:subpixel-antialiased	">
          Need to contact us regarding the wedding?
        </h2>
        <p className="text-grey">
          Send an email to{" "}
          <a
            href="mailto:hello@camillaplustyler.com"
            target="_blank"
            className="text-blue hover:underline"
            rel="noreferrer"
          >
            hello@camillaplustyler.com
          </a>{" "}
          and we'll respond as soon as we can!
        </p>
        <br />
        <p>
          You can also reach us and other wedding attendees on the Whatsapp
          group for the wedding{" "}
          <a
            className="text-blue underline"
            target="_blank"
            rel="noreferrer"
            href="https://chat.whatsapp.com/LNlad0LBVLLDKjpU1EgxY6"
          >
            here
          </a>{" "}
          or by scanning the QR code below with your phone.
        </p>
        <img
          alt="QR code for Wedding WhatsApp group"
          src="/images/qr-code.png"
          className="mx-auto mt-10 block w-full rounded-md"
        />
      </section>
    </div>
  );
};

export default Contact;
