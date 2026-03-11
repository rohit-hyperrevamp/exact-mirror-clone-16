import { Facebook, Instagram, MessageCircle } from "lucide-react";

const SocialSidebar = () => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-0 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(120,120,120,0.7)' }}>
      <a
        href="https://www.facebook.com/AarvakDiagnostics"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-11 flex items-center justify-center hover:bg-white/10 transition"
      >
        <Facebook className="w-5 h-5 text-white" />
      </a>
      <a
        href="https://www.instagram.com/aarvakdiagnostics?igsh=ZjByNWJwNmhnZWx1"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-14 flex items-center justify-center hover:bg-white/10 transition"
      >
        <Instagram className="w-5 h-5 text-white" />
      </a>
      <a
        href="https://wa.me/919810063340"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-14 flex items-center justify-center hover:bg-white/10 transition"
      >
        <MessageCircle className="w-5 h-5 text-white" />
      </a>
    </div>
  );
};

export default SocialSidebar;
