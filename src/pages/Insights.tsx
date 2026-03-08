import { Link } from "react-router-dom";

const blogs = [
  {
    img: "/images/blog-preventive.png",
    date: "February 24, 2026",
    title: "How Diagnostic Centers Support Preventive Healthcare in Modern India",
    desc: "Discover how diagnostic centers support preventive healthcare in modern India through early detection, accurate testing and reliable health screening services.",
    slug: "#",
  },
  {
    img: "/images/blog-signs.png",
    date: "February 19, 2026",
    title: "Signs You Should Not Ignore and When to Go for a Health Checkup",
    desc: "Ignoring early health signs can lead to serious issues. Learn when to go for a health checkup and why regular screening is essential.",
    slug: "#",
  },
  {
    img: "/images/blog-imaging.png",
    date: "February 16, 2026",
    title: "When Do Doctors Recommend Imaging Tests and Why?",
    desc: "Learn when doctors recommend imaging tests, the difference between X-ray and ultrasound, and how medical imaging helps accurate diagnosis.",
    slug: "#",
  },
  {
    img: "/images/blog-accuracy.png",
    date: "February 10, 2026",
    title: "How Diagnostic Test Accuracy Impacts Long-Term Health Outcomes",
    desc: "Accurate diagnostic tests support early detection, better treatment decisions, and improved long-term health outcomes. Learn why lab accuracy matters.",
    slug: "#",
  },
  {
    img: "/images/blog-4.jpg",
    date: "January 21, 2026",
    title: "Why Home Collection is the Future of Healthcare",
    desc: "Skip the Gurugram traffic and waiting rooms. Get professional blood collection at your doorstep. Safe, hygienic, and convenient testing by Aarvak Diagnostics.",
    slug: "#",
  },
  {
    img: "/images/blog-33.jpg",
    date: "January 20, 2026",
    title: "Why Your Liver and Kidneys Need a 'Service' More Than Your Car Does",
    desc: "Your organs don't complain until it's late. Check your LFT & KFT with our 78-test Mini Panel. Easy home collection in Gurugram.",
    slug: "#",
  },
  {
    img: "/images/blog-1.jpg",
    date: "January 20, 2026",
    title: "The Corporate Athlete's Guide to Preventive Health",
    desc: "Early tests help detect health issues before symptoms appear. Learn why an Annual Audit is your best business strategy.",
    slug: "#",
  },
];

const Insights = () => {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative mx-2 md:mx-4 h-[400px] md:h-[500px] rounded-none md:rounded-[14px] overflow-hidden">
        <img
          src="/images/blogbanner.jpg"
          alt="Insights Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-primary-foreground text-center px-4">
          <p className="text-lg mb-2">Aarvak Diagnostics</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4">INSIGHTS</h1>
        </div>
      </section>

      {/* Subtitle */}
      <section className="bg-background py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-aarvak-blue">
            Health Stories & Updates
          </h2>
          <p className="mt-2 text-sm text-aarvak-gray-600">
            Expert insights from Aarvak Diagnostics.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-background pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {blogs.map((blog) => (
            <div
              key={blog.title}
              className="flex flex-col md:flex-row bg-background rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="md:w-2/5 h-64 md:h-auto">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6 flex flex-col justify-center">
                <span className="inline-block bg-aarvak-blue text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                  {blog.date}
                </span>
                <h3 className="text-xl font-bold text-aarvak-gray-900 mb-2">{blog.title}</h3>
                <p className="text-sm text-aarvak-gray-600 leading-relaxed">{blog.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Insights;
