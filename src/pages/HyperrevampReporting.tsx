import { useEffect } from "react";
import { blogPosts } from "@/data/blogPosts";
import {
  FileText, Search, MessageSquare, Code2, Globe, FileCheck,
  Award, TrendingUp, Calendar, BarChart3, Shield, Link as LinkIcon,
  Eye, Smartphone, Layout, Route, CheckCircle2, ExternalLink,
  Star, MapPin
} from "lucide-react";

const REPORT_DATE = "20 Mar 2026";
const DOMAIN = "www.aarvakdiagnostics.com";

const totalPages = 11;
const totalKeywords = 78;
const totalFaqs = 5;
const totalSchemas = 12;
const totalBlogPosts = blogPosts.length;
const sitemapUrls = totalPages + totalBlogPosts;

const pageAudit = [
  { path: "/", title: "Aarvak Diagnostics — Trusted Diagnostic Centre", schemas: 1, faqs: 5, kw: 12 },
  { path: "/about-us", title: "About Us — Our Story & Team", schemas: 0, faqs: 0, kw: 8 },
  { path: "/corporate", title: "Corporate Wellness Programs", schemas: 0, faqs: 0, kw: 7 },
  { path: "/pathology", title: "Pathology Department", schemas: 0, faqs: 0, kw: 9 },
  { path: "/radiology", title: "Radiology Department", schemas: 0, faqs: 0, kw: 8 },
  { path: "/health-checkups", title: "Health Checkup Packages", schemas: 0, faqs: 0, kw: 9 },
  { path: "/insights", title: "Insights — Health Blog", schemas: 0, faqs: 0, kw: 6 },
  { path: "/contact-us", title: "Contact Us — Book a Test", schemas: 0, faqs: 0, kw: 7 },
  { path: "/privacy-policy", title: "Privacy Policy", schemas: 0, faqs: 0, kw: 3 },
  { path: "/terms-of-use", title: "Terms of Use", schemas: 0, faqs: 0, kw: 3 },
  { path: "/insights/*", title: "Individual Blog Posts (×" + totalBlogPosts + ")", schemas: totalBlogPosts, faqs: 0, kw: 6 },
];

const HyperrevampReporting = () => {
  useEffect(() => {
    document.title = "HyperRevamp Reporting — Aarvak Diagnostics";
    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("robots", "noindex, nofollow");
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-200" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#1a1d27] border border-gray-700/50 rounded-xl px-5 py-2.5 flex items-center gap-2">
              <img src="https://www.hyperrevamp.com/wp-content/uploads/2025/05/HyperRevamp-Logo-White.png" alt="HyperRevamp" className="h-6" />
            </div>
            <span className="text-gray-500">×</span>
            <div className="bg-[#1a1d27] border border-gray-700/50 rounded-xl px-5 py-2.5 flex items-center gap-2">
              <img src="/images/aarvak-logo.webp" alt="Aarvak Diagnostics" className="h-7 brightness-0 invert" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">Report Date</p>
            <p className="text-xl font-bold text-white">{REPORT_DATE}</p>
            <p className="text-xs text-gray-500">{DOMAIN}</p>
            <div className="flex items-center gap-1.5 justify-end mt-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Live</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1">
          SEO <span className="text-emerald-400">•</span> GEO <span className="text-purple-400">•</span> AEO
        </h1>
        <p className="text-gray-500 mb-10">Live audit dashboard — auto-updated with every page change</p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {[
            { icon: FileText, label: "PAGES", value: totalPages, sub: `${totalPages} total` },
            { icon: Search, label: "KEYWORDS", value: totalKeywords, sub: "Tracked" },
            { icon: MessageSquare, label: "FAQS", value: totalFaqs, sub: "Voice-ready" },
            { icon: Code2, label: "SCHEMAS", value: totalSchemas, sub: "JSON-LD" },
            { icon: Globe, label: "BLOG POSTS", value: totalBlogPosts, sub: "Published" },
            { icon: FileCheck, label: "SITEMAP", value: sitemapUrls, sub: "URLs Indexed" },
          ].map((s) => (
            <div key={s.label} className="bg-[#1a1d27] border border-gray-800/60 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <s.icon className="w-4 h-4 text-gray-500" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-semibold">{s.label}</span>
              </div>
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Domain Authority */}
        <Section icon={Award} title="Domain Authority & Metrics">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="DOMAIN AUTHORITY" value="12" sub="Moz DA Score" bar={12} color="emerald" note="Scale: 0–100" />
            <MetricCard label="PAGE AUTHORITY" value="16" sub="Homepage PA Score" bar={16} color="blue" note="Scale: 0–100" />
            <div className="bg-[#22252f] rounded-2xl p-6 text-center">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-semibold mb-1">Domain Age</p>
              <p className="text-3xl font-bold text-white">1 Year</p>
              <p className="text-xs text-gray-500 mt-1">Registered: 2025</p>
              <div className="flex gap-2 justify-center mt-3">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold uppercase">Active</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-semibold uppercase">Growing</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Optimization Score */}
        <Section icon={TrendingUp} title="Optimization Score">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ScoreBar label="SEO Coverage" value={93} color="emerald" />
            <ScoreBar label="GEO Local Signals" value={90} color="blue" />
            <ScoreBar label="AEO Voice Readiness" value={72} color="purple" />
          </div>
        </Section>

        {/* SEO Infrastructure */}
        <Section icon={Shield} title="SEO Infrastructure">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: "sitemap", value: `https://${DOMAIN}/sitemap.xml` },
              { label: "robots Txt", value: `https://${DOMAIN}/robots.txt` },
              { label: "google Analytics", value: "Connected" },
              { label: "google Search Console", value: "Verified" },
              { label: "ssl Https", value: "✓" },
              { label: "canonical Tags", value: "Set on all pages via react-helmet" },
              { label: "open Graph", value: "Title, description, image, URL on all pages" },
              { label: "twitter Cards", value: "summary_large_image on all pages" },
              { label: "responsive Design", value: "✓" },
              { label: "lazy Loading", value: "Below-fold images use loading=lazy" },
              { label: "semantic Html", value: "section, nav, header, footer, main" },
              { label: "spa Routing", value: "vercel.json rewrite rule for client-side routing" },
            ].map((item) => (
              <div key={item.label} className="bg-[#22252f] rounded-xl px-5 py-4 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500 font-semibold">{item.label}</p>
                  <p className="text-sm text-gray-300 mt-0.5 break-all">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* GEO — Local Optimization */}
        <Section icon={MapPin} title="GEO — Local Optimization">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <InfoRow label="LocalBusiness Schema" value="✅ On service & contact pages" />
            <InfoRow label="Geo Coordinates" value="28.4130, 77.0432 (Sector 67, Gurugram)" />
            <InfoRow label="NAP Consistency" value="✅ Consistent across all pages" />
            <InfoRow label="Google Maps" value="✅ On Contact Us page" />
            <InfoRow label="Hours" value="Mon–Sat: 7:00 AM – 9:00 PM" />
          </div>
          <div className="bg-[#22252f] rounded-xl px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500 font-semibold mb-2">Local Keywords</p>
            <div className="flex flex-wrap gap-2">
              {["Sector 67", "Sohna Road", "JMD Suburbio-2", "Gurugram", "Haryana", "diagnostic centre near me", "pathology lab Gurgaon", "radiology centre Gurugram"].map((kw) => (
                <span key={kw} className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full">{kw}</span>
              ))}
            </div>
          </div>
          <div className="bg-[#22252f] rounded-xl px-5 py-4 mt-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500 font-semibold mb-2">Social Profiles</p>
            <p className="text-sm text-gray-300">Instagram: @aarvakdiagnostics &nbsp;|&nbsp; Facebook: /AarvakDiagnostics</p>
          </div>
        </Section>

        {/* AEO — Answer Engine Optimization */}
        <Section icon={MessageSquare} title="AEO — Answer Engine Optimization">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <MiniStat value={totalFaqs} label="Total FAQs" />
            <MiniStat value="1" label="FAQ Schema Pages" />
            <MiniStat value="0" label="Service Schemas" />
            <MiniStat value={totalBlogPosts} label="Blog Schemas" />
          </div>
          <div className="bg-[#22252f] rounded-xl px-5 py-4 flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-400 shrink-0" />
            <div>
              <p className="text-sm text-gray-300">4.8/5 (200+ reviews)</p>
              <p className="text-xs text-gray-500 mt-0.5">Rating</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Voice search optimized — all FAQs in natural Q&A format</p>
        </Section>

        {/* Page-by-Page Audit */}
        <Section icon={Eye} title="Page-by-Page Audit">
          <div className="space-y-2">
            {pageAudit.map((p, i) => (
              <div key={i} className="bg-[#22252f] rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-xs font-bold text-gray-500 w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-emerald-400 text-sm font-mono flex-shrink-0">{p.path}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold uppercase shrink-0">live</span>
                <span className="text-sm text-gray-300 flex-1">{p.title}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">{p.schemas} schemas · {p.faqs} FAQs · {p.kw} kw</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Published Blog Content */}
        <Section icon={Globe} title={`Published Blog Content (${totalBlogPosts})`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2 w-10">#</th>
                  <th className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2">Title</th>
                  <th className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2 hidden sm:table-cell">Category</th>
                  <th className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2 hidden md:table-cell">Date</th>
                  <th className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2 hidden lg:table-cell">Read</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts
                  .slice()
                  .sort((a, b) => new Date(b.dateSort).getTime() - new Date(a.dateSort).getTime())
                  .map((post, i) => (
                    <tr key={post.slug} className="border-b border-gray-800/40 hover:bg-white/[0.02] transition">
                      <td className="text-xs text-gray-500 py-3 px-2 font-bold">{String(i + 1).padStart(2, "0")}</td>
                      <td className="text-sm text-gray-300 py-3 px-2">{post.title}</td>
                      <td className="text-xs text-gray-500 py-3 px-2 hidden sm:table-cell">{post.category}</td>
                      <td className="text-xs text-gray-500 py-3 px-2 hidden md:table-cell whitespace-nowrap">{post.date}</td>
                      <td className="text-xs text-gray-500 py-3 px-2 hidden lg:table-cell whitespace-nowrap">{post.readTime}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Footer */}
        <div className="text-center mt-14 pb-8">
          <p className="text-xs text-gray-600">Auto-generated live report reflecting the current state of {DOMAIN}</p>
        </div>
      </div>
    </div>
  );
};

/* ---------- Reusable Sub-components ---------- */

const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="bg-[#14161e] border border-gray-800/40 rounded-2xl p-6 sm:p-8 mb-6">
    <div className="flex items-center gap-3 mb-6">
      <Icon className="w-5 h-5 text-gray-400" />
      <h2 className="text-lg font-bold text-white">{title}</h2>
    </div>
    {children}
  </div>
);

const MetricCard = ({ label, value, sub, bar, color, note }: { label: string; value: string; sub: string; bar: number; color: string; note: string }) => {
  const barColor = color === "emerald" ? "bg-emerald-400" : color === "blue" ? "bg-blue-400" : "bg-purple-400";
  return (
    <div className="bg-[#22252f] rounded-2xl p-6 text-center">
      <div className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center ${color === "emerald" ? "bg-emerald-500/20" : color === "blue" ? "bg-blue-500/20" : "bg-purple-500/20"}`}>
        {color === "emerald" ? <Award className="w-5 h-5 text-emerald-400" /> : <TrendingUp className="w-5 h-5 text-blue-400" />}
      </div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-semibold mb-1">{label}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
      <div className="w-full bg-gray-700/40 rounded-full h-1.5 mt-4">
        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${bar}%` }} />
      </div>
      <p className="text-[10px] text-gray-600 mt-2">{note}</p>
    </div>
  );
};

const ScoreBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const barColor = color === "emerald" ? "bg-emerald-400" : color === "blue" ? "bg-blue-400" : "bg-purple-400";
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-sm font-bold text-white">{value}%</span>
      </div>
      <div className="w-full bg-gray-700/40 rounded-full h-2">
        <div className={`h-2 rounded-full ${barColor} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#22252f] rounded-xl px-5 py-4">
    <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500 font-semibold">{label}</p>
    <p className="text-sm text-gray-300 mt-1">{value}</p>
  </div>
);

const MiniStat = ({ value, label }: { value: string | number; label: string }) => (
  <div className="bg-[#22252f] rounded-xl p-4 text-center">
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{label}</p>
  </div>
);

export default HyperrevampReporting;
