import { Facebook, Instagram, MessageCircle } from "lucide-react";

const SocialSidebar = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-0">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-gray-400 hover:bg-gray-500 flex items-center justify-center transition rounded-l-md"
      >
        <Facebook className="w-5 h-5 text-primary-foreground" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-gray-400 hover:bg-gray-500 flex items-center justify-center transition"
      >
        <Instagram className="w-5 h-5 text-primary-foreground" />
      </a>
      <a
        href="https://wa.me/919810063340"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-gray-400 hover:bg-gray-500 flex items-center justify-center transition rounded-l-md"
      >
        <MessageCircle className="w-5 h-5 text-primary-foreground" />
      </a>
    </div>
  );
};

export default SocialSidebar;
