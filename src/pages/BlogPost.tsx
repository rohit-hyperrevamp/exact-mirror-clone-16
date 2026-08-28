import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { blogPosts } from "@/data/blogPosts";
import { scheduledBlogPosts } from "@/data/scheduledBlogPosts";
import usePublishedBlogPosts from "@/hooks/usePublishedBlogPosts";
import NewsletterSection from "@/components/NewsletterSection";

const allPosts = [...blogPosts, ...scheduledBlogPosts];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts: dbPosts, loading } = usePublishedBlogPosts();
  const post = allPosts.find((p) => p.slug === slug) || dbPosts.find((p) => p.slug === slug);


  useEffect(() => {
    if (!post) return;

    const metaTitle = post.metaTitle || post.title;
    const metaDesc = post.metaDescription || post.desc;
    const canonicalUrl = `https://www.aarvakdiagnostics.com/insights/${post.slug}`;
    const imageUrl = `https://www.aarvakdiagnostics.com${post.img}`;

    document.title = metaTitle;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", metaDesc);
    setMeta("robots", "index, follow");
    setMeta("og:title", metaTitle, "property");
    setMeta("og:description", metaDesc, "property");
    setMeta("og:type", "article", "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", imageUrl, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", metaTitle);
    setMeta("twitter:description", metaDesc);
    setMeta("twitter:image", imageUrl);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schemaId = "blog-post-schema";
    let schemaEl = document.getElementById(schemaId);
    if (!schemaEl) {
      schemaEl = document.createElement("script");
      schemaEl.id = schemaId;
      schemaEl.setAttribute("type", "application/ld+json");
      document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": metaDesc,
      "image": imageUrl,
      "datePublished": post.dateSort,
      "dateModified": post.dateSort,
      "author": {
        "@type": "Organization",
        "name": post.author,
        "url": "https://www.aarvakdiagnostics.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Aarvak Diagnostics",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.aarvakdiagnostics.com/images/aarvak-logo.webp"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "keywords": post.tags.join(", ")
    });

    return () => {
      document.title = "Aarvak Diagnostics – Trusted Diagnostic Centre in India";
      const schema = document.getElementById(schemaId);
      if (schema) schema.remove();
    };
  }, [post]);

  if (!post && loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading…</div>;
  }

  if (!post) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link to="/insights" className="text-blue-600 hover:underline">Back to Insights</Link>
        </div>
      </div>
    );
  }

  const formatInline = (text: string) => {
    let result = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-700 underline hover:text-cyan-900 transition">$1</a>');
    result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    result = result.replace(/_(.+?)_/g, "<em>$1</em>");
    return result;
  };

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${i}`} className="list-disc pl-6 space-y-2 my-4 text-gray-700">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3" dangerouslySetInnerHTML={{ __html: formatInline(line.slice(4)) }} />
        );
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4" dangerouslySetInnerHTML={{ __html: formatInline(line.slice(3)) }} />
        );
      } else if (line.startsWith("- ")) {
        listItems.push(line.slice(2));
      } else if (line.match(/^\d+\.\s/)) {
        flushList();
        listItems.push(line.replace(/^\d+\.\s/, ""));
      } else if (line.trim() === "") {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={i} className="text-gray-700 leading-relaxed my-3" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        );
      }
      i++;
    }
    flushList();
    return elements;
  };

  return (
    <div className="bg-white">
      <section className="relative w-full h-[350px] md:h-[480px] overflow-hidden">
        <img src={post.img} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-wrap gap-x-16 gap-y-2 text-white">
            <div><p className="text-xs opacity-70">Published Date</p><p className="text-sm font-semibold">{post.date}</p></div>
            <div><p className="text-xs opacity-70">Author</p><p className="text-sm font-semibold">{post.author}</p></div>
            <div><p className="text-xs opacity-70">Read Time</p><p className="text-sm font-semibold">{post.readTime}</p></div>
            <div><p className="text-xs opacity-70">Category</p><p className="text-sm font-semibold">{post.category}</p></div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        <div className="prose prose-gray max-w-none text-base">{renderContent(post.content)}</div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-block text-sm px-4 py-2 rounded-full border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 transition">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </section>
      <NewsletterSection />
    </div>
  );
};

export default BlogPost;
