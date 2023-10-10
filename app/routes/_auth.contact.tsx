const Contact = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-lg flex-col gap-10 px-5 pb-10 lg:px-0">
        <h1 className="pb-2 font-roboto text-4xl font-semibold group-hover:subpixel-antialiased	">
          Contact
        </h1>
      <section className="flex flex-col gap-10">
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
        </section>
      </div>
  );
};

export default Contact;
