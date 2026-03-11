import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import NewsletterSection from "@/components/NewsletterSection";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

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

  // Simple markdown-like renderer
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${i}`} className="list-disc pl-6 space-y-2 my-4">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const formatInline = (text: string) => {
      return text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/_(.+?)_/g, "<em>$1</em>");
    };

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("### ")) {
        flushList();
        elements.push(<h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3" dangerouslySetInnerHTML={{ __html: formatInline(line.slice(4)) }} />);
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(<h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4" dangerouslySetInnerHTML={{ __html: formatInline(line.slice(3)) }} />);
      } else if (line.startsWith("- ")) {
        listItems.push(line.slice(2));
      } else if (line.match(/^\d+\.\s/)) {
        flushList();
        listItems.push(line.replace(/^\d+\.\s/, ""));
      } else if (line.trim() === "") {
        flushList();
      } else {
        flushList();
        elements.push(<p key={i} className="text-gray-700 leading-relaxed my-3" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
      }
      i++;
    }
    flushList();
    return elements;
  };

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <section className="relative w-full h-[350px] md:h-[480px] overflow-hidden">
        <img src={post.img} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-wrap gap-x-16 gap-y-2 text-white">
            <div>
              <p className="text-xs opacity-70">Published Date</p>
              <p className="text-sm font-semibold">{post.date.replace("February", "Feb").replace("January", "Jan")}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">Author</p>
              <p className="text-sm font-semibold">{post.author}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">Read Time</p>
              <p className="text-sm font-semibold">{post.readTime}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">Category</p>
              <p className="text-sm font-semibold">{post.category}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        <div className="prose prose-gray max-w-none text-base">
          {renderContent(post.content)}
        </div>
      </section>
    </div>
  );
};

export default BlogPost;