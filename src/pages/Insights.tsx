import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { scheduledBlogPosts } from "@/data/scheduledBlogPosts";
import useSEO from "@/hooks/useSEO";

const Insights = () => {
  useSEO({
    title: "Health Insights & Blog – Aarvak Diagnostics",
    description: "Read expert health articles, diagnostic tips and wellness guides from Aarvak Diagnostics. Stay informed about preventive healthcare and lab testing.",
    canonical: "/insights",
  });

  // Combine all posts and filter by date (only show posts with dateSort <= today)
  const today = new Date().toISOString().split("T")[0];
  const allPosts = [...blogPosts, ...scheduledBlogPosts]
    .filter((post) => post.dateSort <= today)
    .sort((a, b) => b.dateSort.localeCompare(a.dateSort));

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
        <div className="max-w-6xl mx-auto space-y-10">
          {allPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/insights/${post.slug}`}
              className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition group"
            >
              <div className="md:w-[400px] h-64 md:h-[280px] flex-shrink-0">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
                <span
                  className="inline-block text-xs font-semibold text-white px-4 py-1.5 rounded-full mb-4 w-fit"
                  style={{ backgroundColor: '#0891b2' }}
                >
                  {post.date}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition">
                  {post.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{post.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Insights;
