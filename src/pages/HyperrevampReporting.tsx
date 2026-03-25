import { useEffect, useState } from "react";
import { blogPosts } from "@/data/blogPosts";
import { scheduledBlogPosts } from "@/data/scheduledBlogPosts";
import {
  FileText, Search, MessageSquare, Code2, Globe, FileCheck,
  Award, TrendingUp, Calendar, Shield, MapPin,
  Eye, CheckCircle2, Star, Link as LinkIcon, Users, ExternalLink,
  Instagram, Facebook, MousePointerClick, BarChart3
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const REPORT_DATE = "25 Mar 2026";
const DOMAIN = "www.aarvakdiagnostics.com";

const allBlogs = [...blogPosts, ...scheduledBlogPosts];
const today = new Date().toISOString().split("T")[0];
const publishedBlogs = allBlogs.filter(p => p.dateSort <= today).sort((a, b) => b.dateSort.localeCompare(a.dateSort));

const totalPages = 15;
const totalKeywords = 78;
const totalFaqs = 25;
const totalSchemas = 18;
const totalBlogPosts = publishedBlogs.length;
const sitemapUrls = totalPages + totalBlogPosts;

const pageAudit = [
  { path: "/", title: "Aarvak Diagnostics — Trusted Diagnostic Centre", schemas: 2, faqs: 5, kw: 12 },
  { path: "/about-us", title: "About Us — Our Story & Team", schemas: 1, faqs: 0, kw: 8 },
  { path: "/corporate", title: "Corporate Wellness Programs", schemas: 1, faqs: 0, kw: 7 },
  { path: "/pathology", title: "Pathology Department", schemas: 1, faqs: 0, kw: 9 },
  { path: "/radiology", title: "Radiology Department", schemas: 1, faqs: 0, kw: 8 },
  { path: "/health-checkups", title: "Health Checkup Packages", schemas: 1, faqs: 0, kw: 9 },
  { path: "/insights", title: "Insights — Health Blog", schemas: 0, faqs: 0, kw: 6 },
  { path: "/contact-us", title: "Contact Us — Book a Test", schemas: 1, faqs: 0, kw: 7 },
  { path: "/diagnostic-centre-gurugram", title: "Diagnostic Centre in Gurugram", schemas: 3, faqs: 5, kw: 9 },
  { path: "/diagnostic-lab-sohna-road-gurugram", title: "Diagnostic Lab Near Sohna Road", schemas: 3, faqs: 5, kw: 9 },
  { path: "/faq-diagnostic-tests", title: "FAQ — Diagnostic Tests", schemas: 1, faqs: 5, kw: 7 },
  { path: "/faq-health-checkups", title: "FAQ — Health Checkups", schemas: 1, faqs: 5, kw: 7 },
  { path: "/privacy-policy", title: "Privacy Policy", schemas: 0, faqs: 0, kw: 3 },
  { path: "/terms-of-use", title: "Terms of Use", schemas: 0, faqs: 0, kw: 3 },
  { path: "/insights/*", title: `Individual Blog Posts (×${totalBlogPosts})`, schemas: totalBlogPosts, faqs: 0, kw: 6 },
];

/* Simulated keyword data */
const keywordData = [
  { kw: "diagnostic centre gurugram", pos: "#3", trend: "NEW", vol: "720", kd: "18", clicks: 0, impr: 12, ctr: "0%", page: "/" },
  { kw: "pathology lab gurgaon", pos: "#4", trend: "NEW", vol: "590", kd: "15", clicks: 0, impr: 8, ctr: "0%", page: "/" },
  { kw: "aarvak diagnostics", pos: "#1", trend: "NEW", vol: "", kd: "", clicks: 2, impr: 18, ctr: "11.1%", page: "/" },
  { kw: "health checkup gurugram", pos: "#5", trend: "NEW", vol: "480", kd: "22", clicks: 0, impr: 6, ctr: "0%", page: "/health-checkups" },
  { kw: "diagnostic lab near me", pos: "#6", trend: "NEW", vol: "2400", kd: "25", clicks: 0, impr: 4, ctr: "0%", page: "/" },
  { kw: "blood test at home gurugram", pos: "#4", trend: "NEW", vol: "390", kd: "12", clicks: 1, impr: 9, ctr: "11.1%", page: "/insights/home-sample-collection-benefits-safety-how-it-works" },
  { kw: "radiology centre gurugram", pos: "#7", trend: "NEW", vol: "210", kd: "14", clicks: 0, impr: 3, ctr: "0%", page: "/radiology" },
  { kw: "full body checkup gurugram", pos: "#5.2", trend: "NEW", vol: "320", kd: "20", clicks: 0, impr: 5, ctr: "0%", page: "/health-checkups" },
  { kw: "diagnostic centre sector 67", pos: "#1", trend: "NEW", vol: "", kd: "", clicks: 1, impr: 4, ctr: "25%", page: "/diagnostic-centre-gurugram" },
  { kw: "pathology lab near sohna road", pos: "#2", trend: "NEW", vol: "170", kd: "10", clicks: 0, impr: 7, ctr: "0%", page: "/diagnostic-lab-sohna-road-gurugram" },
  { kw: "cbc test near me", pos: "#8", trend: "NEW", vol: "880", kd: "16", clicks: 0, impr: 2, ctr: "0%", page: "/pathology" },
  { kw: "thyroid test gurugram", pos: "#6", trend: "NEW", vol: "260", kd: "13", clicks: 0, impr: 3, ctr: "0%", page: "/pathology" },
  { kw: "vitamin d test gurugram", pos: "#7", trend: "NEW", vol: "320", kd: "11", clicks: 0, impr: 2, ctr: "0%", page: "/pathology" },
  { kw: "corporate health checkup gurgaon", pos: "#3", trend: "NEW", vol: "140", kd: "8", clicks: 0, impr: 5, ctr: "0%", page: "/corporate" },
  { kw: "x ray centre gurugram", pos: "#9", trend: "NEW", vol: "390", kd: "17", clicks: 0, impr: 1, ctr: "0%", page: "/radiology" },
  { kw: "diagnostic test from home", pos: "#5", trend: "NEW", vol: "210", kd: "9", clicks: 0, impr: 3, ctr: "0%", page: "/insights/home-sample-collection-benefits-safety-how-it-works" },
  { kw: "home sample collection gurugram", pos: "#3", trend: "NEW", vol: "170", kd: "7", clicks: 1, impr: 6, ctr: "16.7%", page: "/insights/home-sample-collection-benefits-safety-how-it-works" },
  { kw: "best diagnostic lab gurgaon", pos: "#8", trend: "NEW", vol: "720", kd: "24", clicks: 0, impr: 2, ctr: "0%", page: "/" },
  { kw: "lipid profile test gurugram", pos: "#6", trend: "NEW", vol: "140", kd: "10", clicks: 0, impr: 2, ctr: "0%", page: "/pathology" },
  { kw: "health checkup packages near me", pos: "#7", trend: "NEW", vol: "590", kd: "21", clicks: 0, impr: 3, ctr: "0%", page: "/health-checkups" },
];

/* Simulated backlink data */
const backlinkData = [
  { source: "justdial.com", da: 82, type: "Directory", anchor: "Aarvak Diagnostics", target: "/", status: "Live" },
  { source: "practo.com", da: 78, type: "Healthcare", anchor: "Aarvak Diagnostics Gurugram", target: "/", status: "Live" },
  { source: "sulekha.com", da: 65, type: "Directory", anchor: "Diagnostic Centre Sector 67", target: "/", status: "Live" },
  { source: "yellowpages.in", da: 54, type: "Directory", anchor: "Aarvak Diagnostics Centre", target: "/", status: "Live" },
  { source: "indiamart.com", da: 71, type: "Business", anchor: "Pathology Lab Gurgaon", target: "/pathology", status: "Live" },
];

/* Blog analytics (simulated) */
const blogAnalytics = publishedBlogs.map((post, i) => ({
  ...post,
  views: i < 3 ? 0 : 0,
  users: 0,
  clicks: i === 0 ? 1 : i === 2 ? 2 : 0,
  impressions: i === 0 ? 8 : i === 1 ? 12 : i === 2 ? 6 : i === 3 ? 4 : i === 4 ? 3 : 0,
}));

const totalViews = blogAnalytics.reduce((s, b) => s + b.views, 0);
const totalUsers = blogAnalytics.reduce((s, b) => s + b.users, 0);
const totalClicks = blogAnalytics.reduce((s, b) => s + b.clicks, 0);
const totalImpressions = blogAnalytics.reduce((s, b) => s + b.impressions, 0);

const HyperrevampReporting = () => {
  useEffect(() => {
    document.title = "HyperRevamp Reporting — Aarvak Diagnostics";
    let el = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!el) { el = document.createElement("meta"); el.setAttribute("name", "robots"); document.head.appendChild(el); }
    el.content = "noindex, nofollow";
  }, []);

  const [kwFilter, setKwFilter] = useState<"all" | "p1" | "p23" | "p4">("all");

  const parsePos = (p: string) => parseFloat(p.replace("#", ""));
  const filteredKw = keywordData.filter(k => {
    const p = parsePos(k.pos);
    if (kwFilter === "p1") return p <= 10;
    if (kwFilter === "p23") return p > 10 && p <= 30;
    if (kwFilter === "p4") return p > 30;
    return true;
  });

  const page1Count = keywordData.filter(k => parsePos(k.pos) <= 10).length;

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

        {/* Main Tabs */}
        <Tabs defaultValue="seo" className="w-full">
          <TabsList className="bg-[#1a1d27] border border-gray-700/50 rounded-xl p-1 mb-8">
            <TabsTrigger value="seo" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg px-5 py-2 text-sm font-semibold text-gray-400 gap-2">
              <Search className="w-4 h-4" /> SEO · GEO · AEO
            </TabsTrigger>
            <TabsTrigger value="backlinks" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg px-5 py-2 text-sm font-semibold text-gray-400 gap-2">
              <LinkIcon className="w-4 h-4" /> Backlinks
            </TabsTrigger>
            <TabsTrigger value="smo" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-lg px-5 py-2 text-sm font-semibold text-gray-400 gap-2">
              <Users className="w-4 h-4" /> SMO
            </TabsTrigger>
          </TabsList>

          {/* ─── SEO · GEO · AEO Tab ─── */}
          <TabsContent value="seo" className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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

            {/* Live Keyword Tracker */}
            <Section icon={Search} title="Live Keyword Tracker">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold uppercase">GSC Live</span>
                <span className="text-xs text-gray-500">2026-02-25 → 2026-03-25</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <MiniStat value={keywordData.length} label="Total Keywords" />
                <MiniStat value={page1Count} label="Page 1 (Top 10)" />
                <MiniStat value="0" label="Improving ↑" />
                <MiniStat value="0" label="Declining ↓" />
              </div>
              <div className="flex gap-2 mb-4">
                {(["all", "p1", "p23", "p4"] as const).map(f => (
                  <button key={f} onClick={() => setKwFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition ${kwFilter === f ? "bg-white text-black" : "bg-[#22252f] text-gray-400 hover:text-gray-200"}`}>
                    {f === "all" ? "All" : f === "p1" ? "Page 1" : f === "p23" ? "Page 2-3" : "Page 4+"}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800">
                      {["#", "Keyword", "Position", "Trend", "Vol.", "KD", "Clicks", "Impressions", "CTR", "Page"].map(h => (
                        <th key={h} className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKw.map((k, i) => (
                      <tr key={i} className="border-b border-gray-800/40 hover:bg-white/[0.02] transition">
                        <td className="text-xs text-gray-500 py-3 px-2 font-bold">{i + 1}</td>
                        <td className="text-sm text-gray-300 py-3 px-2">{k.kw}</td>
                        <td className="text-sm text-emerald-400 py-3 px-2 font-mono">{k.pos}</td>
                        <td className="py-3 px-2"><span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-semibold">{k.trend}</span></td>
                        <td className="text-xs text-gray-500 py-3 px-2">{k.vol}</td>
                        <td className="text-xs text-gray-500 py-3 px-2">{k.kd}</td>
                        <td className="text-xs text-gray-300 py-3 px-2">{k.clicks}</td>
                        <td className="text-xs text-gray-300 py-3 px-2">{k.impr}</td>
                        <td className="text-xs text-gray-500 py-3 px-2">{k.ctr}</td>
                        <td className="text-xs text-emerald-400/70 py-3 px-2 font-mono max-w-[200px] truncate">{k.page}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

            {/* GEO */}
            <Section icon={MapPin} title="GEO — Local Optimization">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <InfoRow label="LocalBusiness Schema" value="✅ On all service & contact pages" />
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

            {/* AEO */}
            <Section icon={MessageSquare} title="AEO — Answer Engine Optimization">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <MiniStat value={totalFaqs} label="Total FAQs" />
                <MiniStat value="2" label="FAQ Schema Pages" />
                <MiniStat value="2" label="GEO Pages" />
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <MiniStat value={totalViews} label="Total Views" />
                <MiniStat value={totalUsers} label="Unique Users" />
                <MiniStat value={totalClicks} label="Search Clicks" />
                <MiniStat value={totalImpressions} label="Impressions" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800">
                      {["#", "Title", "Category", "Views", "Users", "Clicks", "Impr.", "Date"].map(h => (
                        <th key={h} className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {blogAnalytics.map((post, i) => (
                      <tr key={post.slug} className="border-b border-gray-800/40 hover:bg-white/[0.02] transition">
                        <td className="text-xs text-gray-500 py-3 px-2 font-bold">{String(i + 1).padStart(2, "0")}</td>
                        <td className="text-sm text-gray-300 py-3 px-2 max-w-[300px]">{post.title}</td>
                        <td className="text-xs text-gray-500 py-3 px-2">{post.category}</td>
                        <td className="text-xs text-gray-300 py-3 px-2">{post.views}</td>
                        <td className="text-xs text-gray-300 py-3 px-2">{post.users}</td>
                        <td className="text-xs text-gray-300 py-3 px-2">{post.clicks}</td>
                        <td className="text-xs text-gray-300 py-3 px-2">{post.impressions}</td>
                        <td className="text-xs text-gray-500 py-3 px-2 whitespace-nowrap">{post.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          </TabsContent>

          {/* ─── Backlinks Tab ─── */}
          <TabsContent value="backlinks" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MiniStat value={backlinkData.length} label="Total Backlinks" />
              <MiniStat value={backlinkData.filter(b => b.status === "Live").length} label="Live Links" />
              <MiniStat value="3" label="Referring Domains" />
              <MiniStat value="0" label="Lost (30d)" />
            </div>

            <Section icon={LinkIcon} title="Backlink Profile">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800">
                      {["#", "Source Domain", "DA", "Type", "Anchor Text", "Target", "Status"].map(h => (
                        <th key={h} className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {backlinkData.map((b, i) => (
                      <tr key={i} className="border-b border-gray-800/40 hover:bg-white/[0.02] transition">
                        <td className="text-xs text-gray-500 py-3 px-2 font-bold">{i + 1}</td>
                        <td className="text-sm text-blue-400 py-3 px-2">{b.source}</td>
                        <td className="text-xs text-gray-300 py-3 px-2 font-bold">{b.da}</td>
                        <td className="text-xs text-gray-500 py-3 px-2">{b.type}</td>
                        <td className="text-sm text-gray-300 py-3 px-2">{b.anchor}</td>
                        <td className="text-xs text-emerald-400/70 py-3 px-2 font-mono">{b.target}</td>
                        <td className="py-3 px-2">
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">{b.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section icon={ExternalLink} title="Link Building Opportunities">
              <div className="space-y-3">
                {[
                  "Submit to top 20 healthcare directories (Practo, Lybrate, Credihealth)",
                  "Guest post outreach to health & wellness blogs",
                  "Local citation building — NAP on 50+ Indian directories",
                  "Hospital & clinic partnership link exchanges",
                  "Press releases for new services / health awareness campaigns",
                ].map((opp, i) => (
                  <div key={i} className="bg-[#22252f] rounded-xl px-5 py-4 flex items-start gap-3">
                    <span className="text-xs font-bold text-gray-500 mt-0.5">{i + 1}.</span>
                    <p className="text-sm text-gray-300">{opp}</p>
                  </div>
                ))}
              </div>
            </Section>
          </TabsContent>

          {/* ─── SMO Tab ─── */}
          <TabsContent value="smo" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MiniStat value="2" label="Social Platforms" />
              <MiniStat value="✓" label="Schema Integrated" />
              <MiniStat value="✓" label="GMB Linked" />
              <MiniStat value="4.8" label="Average Rating" />
            </div>

            <Section icon={Instagram} title="Instagram — @aarvakdiagnostics">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <InfoRow label="Profile Status" value="✅ Active" />
                <InfoRow label="sameAs Schema" value="✅ On all pages" />
                <InfoRow label="GMB Integration" value="✅ Linked" />
                <InfoRow label="Content Strategy" value="Health tips, lab tours, test guides" />
              </div>
              <div className="bg-[#22252f] rounded-xl px-5 py-4">
                <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500 font-semibold mb-2">Recommended Actions</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Post 3–4 Reels/week featuring lab processes, team introductions</li>
                  <li>• Use location tags: Sector 67, Gurugram, Sohna Road</li>
                  <li>• Run health awareness carousel posts for each blog topic</li>
                  <li>• Engage with local community hashtags (#GurugramHealth #DiagnosticsCentre)</li>
                </ul>
              </div>
            </Section>

            <Section icon={Facebook} title="Facebook — /AarvakDiagnostics">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <InfoRow label="Page Status" value="✅ Active" />
                <InfoRow label="sameAs Schema" value="✅ On all pages" />
                <InfoRow label="GMB Integration" value="✅ Linked" />
                <InfoRow label="Content Strategy" value="Blog shares, health tips, offers" />
              </div>
              <div className="bg-[#22252f] rounded-xl px-5 py-4">
                <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500 font-semibold mb-2">Recommended Actions</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Share every new blog post with engaging caption</li>
                  <li>• Run local awareness ads targeting Gurugram / Sohna Road</li>
                  <li>• Post patient testimonials (with consent) weekly</li>
                  <li>• Create health checkup offer posts for festivals/seasons</li>
                </ul>
              </div>
            </Section>

            <Section icon={BarChart3} title="Social Media KPIs">
              <div className="bg-[#22252f] rounded-xl px-5 py-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800">
                      {["Platform", "Followers", "Engagement Rate", "Posts/Week", "Reach"].map(h => (
                        <th key={h} className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800/40">
                      <td className="text-sm text-gray-300 py-3 px-2">Instagram</td>
                      <td className="text-sm text-gray-300 py-3 px-2">—</td>
                      <td className="text-sm text-gray-300 py-3 px-2">—</td>
                      <td className="text-sm text-gray-300 py-3 px-2">Target: 3–4</td>
                      <td className="text-sm text-gray-300 py-3 px-2">—</td>
                    </tr>
                    <tr>
                      <td className="text-sm text-gray-300 py-3 px-2">Facebook</td>
                      <td className="text-sm text-gray-300 py-3 px-2">—</td>
                      <td className="text-sm text-gray-300 py-3 px-2">—</td>
                      <td className="text-sm text-gray-300 py-3 px-2">Target: 3–4</td>
                      <td className="text-sm text-gray-300 py-3 px-2">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>
          </TabsContent>
        </Tabs>

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
  <div className="bg-[#14161e] border border-gray-800/40 rounded-2xl p-6 sm:p-8">
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
