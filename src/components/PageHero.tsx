import { Link } from "react-router-dom";

interface PageHeroProps {
  label: string;
  title: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const PageHero = ({ label, title, heading, description, ctaText, ctaLink }: PageHeroProps) => {
  return (
    <section className="relative mx-2 md:mx-4 h-[520px] md:h-[600px] rounded-none md:rounded-[14px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/arvkbg.png')" }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full md:px-18 px-4 text-primary-foreground">
        <div className="w-full md:w-1/2 text-center md:text-right pr-6">
          <p className="text-base font-semibold md:text-3xl mb-1">{label}</p>
          <h1 className="md:text-5xl text-2xl font-extrabold leading-tight">{title}</h1>
        </div>
        <div className="hidden md:block w-[1px] h-[220px] bg-white/70 mx-6" />
        <div className="w-full md:w-1/3 text-center md:text-left mt-2 md:mt-0">
          <h2 className="text-2xl md:text-4xl font-semibold mb-3 whitespace-pre-line">{heading}</h2>
          <p className="text-sm md:text-base opacity-90 mb-6">{description}</p>
          <Link
            to={ctaLink}
            className="inline-block bg-aarvak-blue text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-aarvak-blue-hover transition"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
