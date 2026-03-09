const blogPosts = [
  {
    img: "/images/blog-preventive-india.png",
    date: "February 24, 2026",
    title: "How Diagnostic Centers Support Preventive Healthcare in Modern India",
    desc: "Discover how diagnostic centers support preventive healthcare in modern India through early detection, accurate testing and reliable health screening services.",
  },
  {
    img: "/images/blog-signs-checkup.png",
    date: "February 19, 2026",
    title: "Signs You Should Not Ignore and When to Go for a Health Checkup",
    desc: "Ignoring early health signs can lead to serious issues. Learn when to go for a health checkup and why regular screening is essential.",
  },
  {
    img: "/images/blog-imaging-tests.png",
    date: "February 16, 2026",
    title: "When Do Doctors Recommend Imaging Tests and Why?",
    desc: "Learn when doctors recommend imaging tests, the difference between X-ray and ultrasound, and how medical imaging helps accurate diagnosis.",
  },
  {
    img: "/images/blog-test-accuracy.png",
    date: "February 10, 2026",
    title: "How Diagnostic Test Accuracy Impacts Long-Term Health Outcomes",
    desc: "Accurate diagnostic tests support early detection, better treatment decisions, and improved long-term health outcomes. Learn why lab accuracy matters.",
  },
  {
    img: "/images/blog-home-collection.jpg",
    date: "January 21, 2026",
    title: "Why Home Collection is the Future of Healthcare",
    desc: "Skip the Gurugram traffic and waiting rooms. Get professional blood collection at your doorstep. Safe, hygienic, and convenient testing by Aarvak Diagnostics.",
  },
  {
    img: "/images/blog-liver-kidney.jpg",
    date: "January 20, 2026",
    title: "Why Your Liver and Kidneys Need a \"Service\" More Than Your Car Does",
    desc: "Your organs don't complain until it's late. Check your LFT & KFT with our 78-test Mini Panel. Easy home collection in Gurugram by Aarvak Diagnostics.",
  },
  {
    img: "/images/blog-hba1c.jpg",
    date: "January 20, 2026",
    title: "Why HbA1c is the Real Truth About Your Blood Sugar",
    desc: "One sugar test is just a snapshot. Get the \"full movie\" with an HbA1c test. Track your 90-day average and catch pre-diabetes early with Aarvak Diagnostics.",
  },
  {
    img: "/images/blog-corporate-health.jpg",
    date: "January 20, 2026",
    title: "The Corporate Athlete's Guide to Preventive Health",
    desc: "Why an \"Annual Audit\" is Your Best Business Strategy. Preventive health checkups for corporate professionals.",
  },
];

const Insights = () => {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[400px] md:h-[480px] overflow-hidden">
        <img
          src="/images/blogbanner.jpg"
          alt="Insights"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <div className="text-white">
            <p className="text-sm opacity-70 mb-2">Aarvak Diagnostics</p>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-[0.3em]">INSIGHTS</h1>
          </div>
        </div>
      </section>

      {/* Tagline overlay */}
      <section className="relative">
        <div className="bg-white rounded-t-3xl -mt-12 relative z-20 pt-10 pb-6 px-4 md:px-16 max-w-xl">
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#0891b2' }}>
            Health Stories & Updates
          </h2>
          <p className="text-sm text-gray-500 mt-2">Expert insights from Aarvak Diagnostics.</p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {blogPosts.map((post) => (
            <div
              key={post.title}
              className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="md:w-2/5 h-64 md:h-auto">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                <span className="inline-block text-xs font-semibold text-white px-3 py-1 rounded-full mb-3 w-fit" style={{ backgroundColor: '#0891b2' }}>
                  {post.date}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{post.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Insights;