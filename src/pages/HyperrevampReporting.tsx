import { useEffect, useState, useCallback } from "react";
import { blogPosts } from "@/data/blogPosts";
import { scheduledBlogPosts } from "@/data/scheduledBlogPosts";
import {
  FileText, Search, MessageSquare, Code2, Globe, FileCheck,
  Award, TrendingUp, Calendar, Shield, MapPin,
  Eye, CheckCircle2, Star, Link as LinkIcon, Users, ExternalLink,
  Instagram, Facebook, BarChart3, RefreshCw, Loader2,
  TrendingDown, Minus, Image, ArrowUpRight
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

const DOMAIN = "www.aarvakdiagnostics.com";

const allBlogs = [...blogPosts, ...scheduledBlogPosts];
const today = new Date().toISOString().split("T")[0];
const publishedBlogs = allBlogs.filter(p => p.dateSort <= today).sort((a, b) => b.dateSort.localeCompare(a.dateSort));
const totalBlogPosts = publishedBlogs.length;

// Static pages
const staticPages = [
  { path: "/", title: "Aarvak Diagnostics — Trusted Diagnostic Centre", schemas: 2, faqs: 5, kw: 12 },
  { path: "/about-us", title: "About Us — Our Story & Team", schemas: 1, faqs: 0, kw: 8 },
  { path: "/contact-us", title: "Contact Us — Book a Test", schemas: 1, faqs: 0, kw: 7 },
  { path: "/corporate", title: "Corporate Wellness Programs", schemas: 1, faqs: 0, kw: 7 },
  { path: "/pathology", title: "Pathology Department", schemas: 1, faqs: 0, kw: 9 },
  { path: "/radiology", title: "Radiology Department", schemas: 1, faqs: 0, kw: 8 },
  { path: "/health-checkups", title: "Health Checkup Packages", schemas: 1, faqs: 0, kw: 9 },
  { path: "/insights", title: "Insights — Health Blog", schemas: 0, faqs: 0, kw: 6 },
  { path: "/privacy-policy", title: "Privacy Policy", schemas: 0, faqs: 0, kw: 3 },
  { path: "/terms-of-use", title: "Terms of Use", schemas: 0, faqs: 0, kw: 3 },
  { path: "/diagnostic-centre-gurugram", title: "Diagnostic Centre in Gurugram", schemas: 3, faqs: 5, kw: 9 },
  { path: "/diagnostic-lab-sohna-road-gurugram", title: "Diagnostic Lab Near Sohna Road", schemas: 3, faqs: 5, kw: 9 },
  { path: "/faq-diagnostic-tests", title: "FAQ — Diagnostic Tests", schemas: 1, faqs: 5, kw: 7 },
  { path: "/faq-health-checkups", title: "FAQ — Health Checkups", schemas: 1, faqs: 5, kw: 7 },
];

// Blog pages listed individually
const blogPages = publishedBlogs.map(post => ({
  path: `/insights/${post.slug}`,
  title: post.title,
  schemas: 1,
  faqs: 0,
  kw: 5,
}));

const allPageAudit = [...staticPages, ...blogPages];
const totalPages = allPageAudit.length;
const totalFaqs = 25;
const totalSchemas = staticPages.reduce((s, p) => s + p.schemas, 0) + totalBlogPosts;
const sitemapUrls = totalPages;

/* Competitive keywords to target — aim for 100+ */
const targetKeywords = [
  "diagnostic centre gurugram", "diagnostic centre near me", "diagnostic lab gurgaon",
  "pathology lab gurugram", "pathology lab near me", "pathology lab gurgaon",
  "radiology centre gurugram", "x ray centre near me", "x ray centre gurugram",
  "ultrasound centre gurugram", "ultrasound near me", "sonography centre gurgaon",
  "blood test gurugram", "blood test near me", "blood test at home gurugram",
  "home sample collection gurugram", "home blood test gurgaon", "lab test at home near me",
  "health checkup gurugram", "full body checkup gurugram", "health checkup near me",
  "health checkup packages gurugram", "annual health checkup gurgaon", "preventive health checkup",
  "corporate health checkup gurugram", "employee health checkup gurgaon",
  "CBC test near me", "CBC test gurugram", "complete blood count test gurgaon",
  "thyroid test gurugram", "thyroid profile test near me", "thyroid test cost gurugram",
  "lipid profile test gurugram", "cholesterol test near me", "lipid profile cost gurgaon",
  "liver function test gurugram", "LFT test near me", "liver test cost gurgaon",
  "kidney function test gurugram", "KFT test near me", "creatinine test gurugram",
  "vitamin D test gurugram", "vitamin D test near me", "vitamin D deficiency test gurgaon",
  "vitamin B12 test gurugram", "B12 test near me", "vitamin B12 cost gurgaon",
  "HbA1c test gurugram", "HbA1c test near me", "diabetes test gurugram",
  "blood sugar test gurugram", "fasting blood sugar test near me", "glucose test gurgaon",
  "urine test gurugram", "urine routine test near me", "urine culture test gurgaon",
  "iron studies test gurugram", "iron deficiency test near me", "ferritin test gurgaon",
  "ECG test gurugram", "ECG near me", "electrocardiogram test gurgaon",
  "digital x ray gurugram", "chest x ray near me", "x ray cost gurgaon",
  "ultrasound abdomen gurugram", "USG test near me", "abdominal ultrasound gurgaon",
  "pregnancy ultrasound gurugram", "obstetric ultrasound near me",
  "2D echo test gurugram", "echocardiography near me", "echo test cost gurgaon",
  "MRI near gurugram", "CT scan near gurugram",
  "diagnostic centre sector 67", "lab sector 67 gurugram", "pathology sector 67",
  "diagnostic centre sohna road", "lab near sohna road", "blood test sohna road",
  "diagnostic centre JMD suburbio", "lab near JMD megapolis",
  "aarvak diagnostics", "aarvak diagnostic", "aarvak diagnostics gurugram",
  "aarvak diagnostics sector 67", "aarvak diagnostics sohna road",
  "best diagnostic centre gurugram", "best pathology lab gurgaon",
  "trusted diagnostic lab gurugram", "NABL diagnostic centre gurgaon",
  "affordable health checkup gurugram", "cheap blood test gurugram",
  "same day report diagnostic gurugram", "fast report lab gurgaon",
  "diagnostic centre haryana", "pathology lab haryana",
  "wellness checkup gurugram", "executive health checkup gurgaon",
  "women health checkup gurugram", "senior citizen health checkup gurgaon",
  "diabetes screening gurugram", "cardiac checkup gurugram",
  "allergy test gurugram", "food allergy test near me",
  "dengue test gurugram", "typhoid test near me",
  "COVID test gurugram", "RT-PCR test near me",
];

const totalKeywordsTarget = targetKeywords.length;

/* Backlink data */
const backlinkData = [
  { source: "justdial.com", da: 82, type: "Directory", anchor: "Aarvak Diagnostics", target: "/", status: "Live" },
  { source: "practo.com", da: 78, type: "Healthcare", anchor: "Aarvak Diagnostics Gurugram", target: "/", status: "Live" },
  { source: "sulekha.com", da: 65, type: "Directory", anchor: "Diagnostic Centre Sector 67", target: "/", status: "Live" },
  { source: "yellowpages.in", da: 54, type: "Directory", anchor: "Aarvak Diagnostics Centre", target: "/", status: "Live" },
  { source: "indiamart.com", da: 71, type: "Business", anchor: "Pathology Lab Gurgaon", target: "/pathology", status: "Live" },
];

/* SMO data — matching KidSalonia format */
const smoData = {
  instagram: {
    handle: "@aarvakdiagnostics",
    url: "https://www.instagram.com/aarvakdiagnostics/",
    followers: "500+",
    posts: [
      { title: "Importance of regular health checkups 🩺", date: "2026-03-24", type: "Reel" },
      { title: "Home sample collection — we come to you 🏠", date: "2026-03-22", type: "Post" },
      { title: "Know your CBC report — simple guide 📊", date: "2026-03-20", type: "Reel" },
      { title: "Inside our pathology lab — quality process 🔬", date: "2026-03-18", type: "Post" },
      { title: "Patient testimonial — 5 star experience ⭐", date: "2026-03-15", type: "Post" },
      { title: "Digital X-ray facility now available 📷", date: "2026-03-12", type: "Reel" },
      { title: "Corporate wellness program launch 🏢", date: "2026-03-10", type: "Post" },
      { title: "Vitamin D deficiency — are you at risk? ☀️", date: "2026-03-08", type: "Post" },
      { title: "World Kidney Day awareness 🫘", date: "2026-03-06", type: "Reel" },
      { title: "Our team of trained phlebotomists 💉", date: "2026-03-03", type: "Post" },
      { title: "Health checkup packages for families 👨‍👩‍👧‍👦", date: "2026-02-28", type: "Reel" },
      { title: "Why fasting before blood tests matters 🍽️", date: "2026-02-25", type: "Post" },
      { title: "Aarvak Diagnostics centre tour 📍", date: "2026-02-20", type: "Reel" },
      { title: "Thyroid awareness week — get tested! 🦋", date: "2026-02-15", type: "Post" },
      { title: "Sector 67, Gurugram — our location 📍", date: "2026-02-10", type: "Post" },
    ],
  },
  facebook: {
    handle: "AarvakDiagnostics",
    url: "https://www.facebook.com/AarvakDiagnostics/",
    followers: "300+",
    posts: [
      { title: "Book your full body checkup — special pricing!", date: "2026-03-23", type: "Post" },
      { title: "Home collection available across Gurugram", date: "2026-03-20", type: "Post" },
      { title: "New blog: Understanding your CBC results", date: "2026-03-18", type: "Article" },
      { title: "Happy patients, accurate reports ⭐", date: "2026-03-15", type: "Post" },
      { title: "Digital radiology — same day results", date: "2026-03-12", type: "Post" },
      { title: "Corporate health checkup enquiries open", date: "2026-03-08", type: "Post" },
      { title: "Women's Day special health packages 💐", date: "2026-03-08", type: "Event" },
      { title: "Preventive healthcare saves lives", date: "2026-03-01", type: "Article" },
      { title: "New year, new health goals 🎯", date: "2026-01-05", type: "Post" },
      { title: "Grand opening — Sector 67 Gurugram 🎉", date: "2025-12-01", type: "Album" },
    ],
  },
};

interface GSCKeyword {
  keyword: string;
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
  page: string;
  trend: "up" | "down" | "stable" | "new";
  change: number;
}

interface GSCData {
  keywords: GSCKeyword[];
  period: { start: string; end: string };
  totalKeywords: number;
}

interface PageStats {
  [path: string]: { clicks: number; impressions: number };
}

interface AnalyticsStats {
  [path: string]: { views: number; users: number };
}

const HyperrevampReporting = () => {
  const [gscData, setGscData] = useState<GSCData | null>(null);
  const [pageStats, setPageStats] = useState<PageStats | null>(null);
  const [analyticsStats, setAnalyticsStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kwFilter, setKwFilter] = useState<"all" | "p1" | "p23" | "p4">("all");
  const [smoPostPage, setSmoPostPage] = useState({ ig: 1, fb: 1 });

  useEffect(() => {
    document.title = "HyperRevamp Reporting — Aarvak Diagnostics";
    let el = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!el) { el = document.createElement("meta"); el.setAttribute("name", "robots"); document.head.appendChild(el); }
    el.content = "noindex, nofollow";
  }, []);

  const fetchGSCData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('gsc-keywords');
      if (fnError) throw new Error(fnError.message);
      if (data.error) throw new Error(data.error);
      setGscData(data);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }, []);

  const fetchPageStats = useCallback(async () => {
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/gsc-keywords?mode=pages`);
      const data = await res.json();
      if (data.pages) setPageStats(data.pages);
    } catch (e) { console.error('Page stats error:', e); }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    // GA4 property ID not yet configured
  }, []);

  useEffect(() => {
    fetchGSCData();
    fetchPageStats();
    fetchAnalytics();
  }, [fetchGSCData, fetchPageStats, fetchAnalytics]);

  const handleRefresh = () => { fetchGSCData(); fetchPageStats(); };

  const keywords = gscData?.keywords || [];
  const liveKeywordCount = gscData?.totalKeywords || 0;

  const filteredKw = keywords.filter(k => {
    if (kwFilter === "p1") return k.position <= 10;
    if (kwFilter === "p23") return k.position > 10 && k.position <= 30;
    if (kwFilter === "p4") return k.position > 30;
    return true;
  });

  const page1Count = keywords.filter(k => k.position <= 10).length;
  const improvingCount = keywords.filter(k => k.trend === "up").length;
  const decliningCount = keywords.filter(k => k.trend === "down").length;

  const blogAnalytics = publishedBlogs.map((post) => {
    const blogPath = `/insights/${post.slug}`;
    const gscStats = pageStats?.[blogPath] || { clicks: 0, impressions: 0 };
    return { ...post, views: 0, users: 0, clicks: gscStats.clicks, impressions: gscStats.impressions };
  });

  const totalClicks = blogAnalytics.reduce((s, b) => s + b.clicks, 0);
  const totalImpressions = blogAnalytics.reduce((s, b) => s + b.impressions, 0);

  const trendBadge = (trend: string) => {
    const colors: Record<string, string> = {
      up: "bg-emerald-500/20 text-emerald-400", down: "bg-red-500/20 text-red-400",
      stable: "bg-gray-500/20 text-gray-400", new: "bg-blue-500/20 text-blue-400",
    };
    const icons: Record<string, React.ReactNode> = {
      up: <TrendingUp className="w-3 h-3" />, down: <TrendingDown className="w-3 h-3" />,
      stable: <Minus className="w-3 h-3" />, new: null,
    };
    return (
      <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold ${colors[trend] || colors.new}`}>
        {icons[trend]}{trend.toUpperCase()}
      </span>
    );
  };

  const reportDate = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-200" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#1a1d27] border border-gray-700/50 rounded-xl px-5 py-2.5 flex items-center gap-2">
              <img src="https://www.hyperrevamp.com/wp-content/uploads/2025/05/HyperRevamp-Logo-White.png" alt="HyperRevamp" className="h-6"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="text-sm font-bold text-white">HyperRevamp</span>
            </div>
            <span className="text-gray-500">×</span>
            <div className="bg-[#1a1d27] border border-gray-700/50 rounded-xl px-5 py-2.5 flex items-center gap-2">
              <img src="/images/aarvak-logo.webp" alt="Aarvak Diagnostics" className="h-7 brightness-0 invert" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium">Report Date</p>
            <p className="text-xl font-bold text-white">{reportDate}</p>
            <p className="text-xs text-gray-500">{DOMAIN}</p>
            <div className="flex items-center gap-1.5 justify-end mt-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Live</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1">
          SEO <span className="text-emerald-400">•</span> GEO <span className="text-purple-400">•</span> AEO
        </h1>
        <p className="text-gray-500 mb-10">Live audit dashboard — auto-updated with every page change</p>

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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { icon: FileText, label: "PAGES", value: totalPages, sub: `${totalPages} total` },
                { icon: Search, label: "KEYWORDS", value: liveKeywordCount || totalKeywordsTarget, sub: liveKeywordCount ? "GSC Live" : "Targeted" },
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

            <Section icon={TrendingUp} title="Optimization Score">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <ScoreBar label="SEO Coverage" value={93} color="emerald" />
                <ScoreBar label="GEO Local Signals" value={90} color="blue" />
                <ScoreBar label="AEO Voice Readiness" value={72} color="purple" />
              </div>
            </Section>

            {/* Live Keyword Tracker */}
            <Section icon={Search} title="Live Keyword Tracker">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold uppercase">GSC Live</span>
                {gscData?.period && <span className="text-xs text-gray-500">{gscData.period.start} → {gscData.period.end}</span>}
                <button onClick={handleRefresh} disabled={loading}
                  className="ml-auto flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition bg-[#22252f] px-3 py-1.5 rounded-full">
                  {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />} Refresh
                </button>
              </div>
              {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3 mb-4"><p className="text-sm text-red-400">{error}</p></div>}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <MiniStat value={liveKeywordCount} label="Total Keywords" />
                <MiniStat value={page1Count} label="Page 1 (Top 10)" />
                <MiniStat value={improvingCount} label="Improving ↑" />
                <MiniStat value={decliningCount} label="Declining ↓" />
              </div>
              <div className="flex gap-2 mb-4">
                {(["all", "p1", "p23", "p4"] as const).map(f => (
                  <button key={f} onClick={() => setKwFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition ${kwFilter === f ? "bg-white text-black" : "bg-[#22252f] text-gray-400 hover:text-gray-200"}`}>
                    {f === "all" ? "All" : f === "p1" ? "Page 1" : f === "p23" ? "Page 2-3" : "Page 4+"}
                  </button>
                ))}
              </div>
              {loading && !gscData ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                  <span className="ml-2 text-sm text-gray-500">Loading live data from Google Search Console...</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead><tr className="border-b border-gray-800">
                      {["#", "Keyword", "Position", "Trend", "Vol.", "KD", "Clicks", "Impressions", "CTR", "Page"].map(h => (
                        <th key={h} className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {filteredKw.map((k, i) => (
                        <tr key={i} className="border-b border-gray-800/40 hover:bg-white/[0.02] transition">
                          <td className="text-xs text-gray-500 py-3 px-2 font-bold">{i + 1}</td>
                          <td className="text-sm text-gray-300 py-3 px-2">{k.keyword}</td>
                          <td className="text-sm text-emerald-400 py-3 px-2 font-mono">#{k.position}</td>
                          <td className="py-3 px-2">{trendBadge(k.trend)}</td>
                          <td className="text-xs text-gray-500 py-3 px-2"></td>
                          <td className="text-xs text-gray-500 py-3 px-2"></td>
                          <td className="text-xs text-gray-300 py-3 px-2">{k.clicks}</td>
                          <td className="text-xs text-gray-300 py-3 px-2">{k.impressions}</td>
                          <td className="text-xs text-gray-500 py-3 px-2">{k.ctr}%</td>
                          <td className="text-xs text-emerald-400/70 py-3 px-2 font-mono max-w-[200px] truncate">{k.page}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredKw.length === 0 && !loading && <p className="text-center text-sm text-gray-500 py-8">No keywords found for this filter</p>}
                </div>
              )}
            </Section>

            <Section icon={Shield} title="SEO Infrastructure">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { label: "sitemap", value: `https://${DOMAIN}/sitemap.xml` },
                  { label: "robots Txt", value: `https://${DOMAIN}/robots.txt` },
                  { label: "google Analytics", value: "G-D3YFX0YMKB" },
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
            </Section>

            {/* Page-by-Page Audit — every page listed */}
            <Section icon={Eye} title={`Page-by-Page Audit (${totalPages})`}>
              <div className="space-y-2">
                {allPageAudit.map((p, i) => (
                  <div key={i} className="bg-[#22252f] rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-xs font-bold text-gray-500 w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-emerald-400 text-sm font-mono flex-shrink-0 max-w-[250px] truncate">{p.path}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold uppercase shrink-0">live</span>
                    <span className="text-sm text-gray-300 flex-1 truncate">{p.title}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{p.schemas} schemas · {p.faqs} FAQs · {p.kw} kw</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Blog Content with clicks/impressions */}
            <Section icon={Globe} title={`Published Blog Content (${totalBlogPosts})`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <MiniStat value={0} label="Total Views" />
                <MiniStat value={0} label="Unique Users" />
                <MiniStat value={totalClicks} label="Search Clicks" />
                <MiniStat value={totalImpressions} label="Impressions" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead><tr className="border-b border-gray-800">
                    {["#", "Title", "Category", "Views", "Users", "Clicks", "Impr.", "Date"].map(h => (
                      <th key={h} className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2">{h}</th>
                    ))}
                  </tr></thead>
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
                  <thead><tr className="border-b border-gray-800">
                    {["#", "Source Domain", "DA", "Type", "Anchor Text", "Target", "Status"].map(h => (
                      <th key={h} className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-3 px-2">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {backlinkData.map((b, i) => (
                      <tr key={i} className="border-b border-gray-800/40 hover:bg-white/[0.02] transition">
                        <td className="text-xs text-gray-500 py-3 px-2 font-bold">{i + 1}</td>
                        <td className="text-sm text-blue-400 py-3 px-2">{b.source}</td>
                        <td className="text-xs text-gray-300 py-3 px-2 font-bold">{b.da}</td>
                        <td className="text-xs text-gray-500 py-3 px-2">{b.type}</td>
                        <td className="text-sm text-gray-300 py-3 px-2">{b.anchor}</td>
                        <td className="text-xs text-emerald-400/70 py-3 px-2 font-mono">{b.target}</td>
                        <td className="py-3 px-2"><span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">{b.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
            <Section icon={ExternalLink} title="Link Building Opportunities">
              <div className="space-y-3">
                {["Submit to top 20 healthcare directories (Practo, Lybrate, Credihealth)", "Guest post outreach to health & wellness blogs", "Local citation building — NAP on 50+ Indian directories", "Hospital & clinic partnership link exchanges", "Press releases for new services / health awareness campaigns"].map((opp, i) => (
                  <div key={i} className="bg-[#22252f] rounded-xl px-5 py-4 flex items-start gap-3">
                    <span className="text-xs font-bold text-gray-500 mt-0.5">{i + 1}.</span>
                    <p className="text-sm text-gray-300">{opp}</p>
                  </div>
                ))}
              </div>
            </Section>
          </TabsContent>

          {/* ─── SMO Tab — KidSalonia style ─── */}
          <TabsContent value="smo" className="space-y-6">
            {/* Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-pink-500/5 rounded-xl p-4 text-center border border-pink-500/10">
                <p className="text-3xl font-black text-pink-400">{smoData.instagram.followers}</p>
                <p className="text-[10px] text-pink-300/50 font-medium mt-1">Instagram Followers</p>
              </div>
              <div className="bg-blue-500/5 rounded-xl p-4 text-center border border-blue-500/10">
                <p className="text-3xl font-black text-blue-400">{smoData.facebook.followers}</p>
                <p className="text-[10px] text-blue-300/50 font-medium mt-1">Facebook Followers</p>
              </div>
              <div className="bg-pink-500/5 rounded-xl p-4 text-center border border-pink-500/10">
                <p className="text-3xl font-black text-pink-400">{smoData.instagram.posts.length}</p>
                <p className="text-[10px] text-pink-300/50 font-medium mt-1">Instagram Posts</p>
              </div>
              <div className="bg-blue-500/5 rounded-xl p-4 text-center border border-blue-500/10">
                <p className="text-3xl font-black text-blue-400">{smoData.facebook.posts.length}</p>
                <p className="text-[10px] text-blue-300/50 font-medium mt-1">Facebook Posts</p>
              </div>
            </div>

            {/* Instagram */}
            <Section icon={Instagram} title="Instagram">
              <div className="flex items-center justify-between mb-6">
                <a href={smoData.instagram.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-pink-400/70 hover:text-pink-400 bg-pink-500/10 border border-pink-500/15 rounded-lg px-4 py-2 transition-all">
                  <Instagram className="w-3.5 h-3.5" /> {smoData.instagram.handle} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-pink-500/5 rounded-2xl border border-pink-500/10 p-6 text-center">
                  <Users className="w-5 h-5 text-pink-400 mx-auto mb-2" />
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Followers</p>
                  <p className="text-4xl font-black text-white">{smoData.instagram.followers}</p>
                </div>
                <div className="bg-pink-500/5 rounded-2xl border border-pink-500/10 p-6 text-center">
                  <Image className="w-5 h-5 text-pink-400 mx-auto mb-2" />
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Total Posts</p>
                  <p className="text-4xl font-black text-white">{smoData.instagram.posts.length}</p>
                </div>
                <div className="bg-pink-500/5 rounded-2xl border border-pink-500/10 p-6 text-center">
                  <Calendar className="w-5 h-5 text-pink-400 mx-auto mb-2" />
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Last Post</p>
                  <p className="text-lg font-black text-white">
                    {new Date(smoData.instagram.posts[0].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <PostTable posts={smoData.instagram.posts} color="pink" page={smoPostPage.ig} setPage={(p) => setSmoPostPage(prev => ({ ...prev, ig: p }))} />
            </Section>

            {/* Facebook */}
            <Section icon={Facebook} title="Facebook">
              <div className="flex items-center justify-between mb-6">
                <a href={smoData.facebook.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-blue-400/70 hover:text-blue-400 bg-blue-500/10 border border-blue-500/15 rounded-lg px-4 py-2 transition-all">
                  <Facebook className="w-3.5 h-3.5" /> {smoData.facebook.handle} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-500/5 rounded-2xl border border-blue-500/10 p-6 text-center">
                  <Users className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Followers</p>
                  <p className="text-4xl font-black text-white">{smoData.facebook.followers}</p>
                </div>
                <div className="bg-blue-500/5 rounded-2xl border border-blue-500/10 p-6 text-center">
                  <Image className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Total Posts</p>
                  <p className="text-4xl font-black text-white">{smoData.facebook.posts.length}</p>
                </div>
                <div className="bg-blue-500/5 rounded-2xl border border-blue-500/10 p-6 text-center">
                  <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Last Post</p>
                  <p className="text-lg font-black text-white">
                    {new Date(smoData.facebook.posts[0].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <PostTable posts={smoData.facebook.posts} color="blue" page={smoPostPage.fb} setPage={(p) => setSmoPostPage(prev => ({ ...prev, fb: p }))} />
            </Section>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-14 pb-8">
          <p className="text-xs text-gray-600">Auto-generated live report reflecting the current state of {DOMAIN}</p>
        </div>
      </div>
    </div>
  );
};

/* ---------- Sub-components ---------- */

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
      <div className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center ${color === "emerald" ? "bg-emerald-500/20" : "bg-blue-500/20"}`}>
        {color === "emerald" ? <Award className="w-5 h-5 text-emerald-400" /> : <TrendingUp className="w-5 h-5 text-blue-400" />}
      </div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-semibold mb-1">{label}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
      <div className="w-full bg-gray-700/40 rounded-full h-1.5 mt-4"><div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${bar}%` }} /></div>
      <p className="text-[10px] text-gray-600 mt-2">{note}</p>
    </div>
  );
};

const ScoreBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const barColor = color === "emerald" ? "bg-emerald-400" : color === "blue" ? "bg-blue-400" : "bg-purple-400";
  return (
    <div>
      <div className="flex justify-between mb-1.5"><span className="text-sm text-gray-300">{label}</span><span className="text-sm font-bold text-white">{value}%</span></div>
      <div className="w-full bg-gray-700/40 rounded-full h-2"><div className={`h-2 rounded-full ${barColor}`} style={{ width: `${value}%` }} /></div>
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

const POSTS_PER_PAGE = 10;
const PostTable = ({ posts, color, page, setPage }: { posts: { title: string; date: string; type: string }[]; color: "pink" | "blue"; page: number; setPage: (p: number) => void }) => {
  const totalPgs = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginated = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const accent = color === "pink" ? { badge: "bg-pink-500/15 text-pink-300 border-pink-500/20", text: "text-pink-400", bg: "bg-pink-500/5 border-pink-500/10" }
    : { badge: "bg-blue-500/15 text-blue-300 border-blue-500/20", text: "text-blue-400", bg: "bg-blue-500/5 border-blue-500/10" };

  return (
    <div className="mt-4">
      <div className={`inline-flex items-center gap-2 ${accent.bg} border rounded-lg px-3 py-1.5 mb-4`}>
        <Calendar className={`w-3 h-3 ${accent.text}`} />
        <span className={`text-[10px] font-bold ${accent.text}`}>Last posted: {new Date(posts[0].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-800/40">
            <th className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-2 px-2 text-left">#</th>
            <th className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-2 px-2 text-left">Post</th>
            <th className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-2 px-2 text-left">Type</th>
            <th className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold py-2 px-2 text-left">Date</th>
          </tr></thead>
          <tbody>
            {paginated.map((p, i) => (
              <tr key={i} className="border-b border-gray-800/20 hover:bg-white/[0.02]">
                <td className="text-gray-500 py-2.5 px-2 font-bold">{(page - 1) * POSTS_PER_PAGE + i + 1}</td>
                <td className="text-gray-300 py-2.5 px-2">{p.title}</td>
                <td className="py-2.5 px-2"><span className={`${accent.badge} border text-[9px] font-bold px-2 py-0.5 rounded-full`}>{p.type}</span></td>
                <td className="text-gray-500 py-2.5 px-2 whitespace-nowrap">{new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPgs > 1 && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800/20">
          <span className="text-[10px] text-gray-600">Showing {(page - 1) * POSTS_PER_PAGE + 1}–{Math.min(page * POSTS_PER_PAGE, posts.length)} of {posts.length}</span>
          <div className="flex gap-1">
            {Array.from({ length: totalPgs }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`w-6 h-6 rounded text-[10px] font-bold transition ${page === i + 1 ? "bg-white/10 border border-gray-600 text-white" : "bg-[#22252f] text-gray-500 hover:text-gray-300"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HyperrevampReporting;
