import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/data/blogPosts";

/**
 * Fetches blog posts that the backend has already published.
 * RLS only exposes rows with status = 'published' and published_at <= now(),
 * so scheduled/future posts can never leak to the public site.
 */
export function usePublishedBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await (supabase as any)
        .from("blog_posts")
        .select(
          "slug,title,h1,meta_title,meta_description,excerpt,category,content,featured_image,tags,author,read_minutes,published_at,scheduled_date"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!active) return;
      const rows = (data ?? []) as Record<string, any>[];
      setPosts(
        rows.map((r) => {
          // The editorial calendar is defined in IST. A midnight IST publish is
          // stored as the previous UTC date, so prefer the scheduled calendar
          // date for the public label while published_at remains the access gate.
          const dateSort = String(r.scheduled_date ?? r.published_at).slice(0, 10);
          return {
            slug: r.slug,
            img: r.featured_image || "/images/blog-1.jpg",
            date: new Date(`${dateSort}T00:00:00`).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            dateSort,
            title: r.h1 || r.title,
            desc: r.excerpt || r.meta_description || "",
            author: r.author || "Aarvak Diagnostics",
            readTime: (r.read_minutes ? `${r.read_minutes} min` : "6 min"),
            category: r.category || "Health",
            content: r.content || "",
            tags: Array.isArray(r.tags) ? r.tags : [],
            metaTitle: r.meta_title || undefined,
            metaDescription: r.meta_description || undefined,
          } as BlogPost;
        })
      );
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  return { posts, loading };
}

export default usePublishedBlogPosts;
