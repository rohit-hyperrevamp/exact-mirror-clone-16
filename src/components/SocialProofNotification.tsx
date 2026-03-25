import { useState, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

const notifications = [
  { name: "Rahul S.", location: "Sector 67", test: "ADC Essential Panel", time: "2 mins ago" },
  { name: "Priya M.", location: "Sohna Road", test: "Full Body Checkup", time: "4 mins ago" },
  { name: "Ankit K.", location: "Sector 56", test: "Thyroid Profile", time: "3 mins ago" },
  { name: "Sunita D.", location: "Golf Course Road", test: "ADC Supreme Panel", time: "5 mins ago" },
  { name: "Vikas R.", location: "Sector 49", test: "Complete Blood Count", time: "1 min ago" },
  { name: "Neha T.", location: "DLF Phase 3", test: "Vitamin D & B12 Panel", time: "6 mins ago" },
  { name: "Amit G.", location: "Sector 82", test: "Lipid Profile", time: "3 mins ago" },
  { name: "Meena P.", location: "Sector 67", test: "ADC Advanced Panel", time: "7 mins ago" },
  { name: "Deepak S.", location: "Huda City Centre", test: "Liver Function Test", time: "2 mins ago" },
  { name: "Kavita J.", location: "Sector 45", test: "Heart Health Package", time: "8 mins ago" },
  { name: "Rohit V.", location: "Sohna Road", test: "Diabetes Screening", time: "4 mins ago" },
  { name: "Anjali B.", location: "MG Road", test: "Kidney Function Test", time: "5 mins ago" },
  { name: "Sanjay M.", location: "Sector 57", test: "ADC Basic Panel", time: "1 min ago" },
  { name: "Pooja R.", location: "South City", test: "Home Sample Collection", time: "3 mins ago" },
  { name: "Ravi K.", location: "Sector 14", test: "Pollution Health Package", time: "6 mins ago" },
];

const SocialProofNotification = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const initialDelay = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(initialDelay);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;
    if (!visible) return;

    const showTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 2000);
    }, 5000);

    return () => clearTimeout(showTimer);
  }, [visible, current, dismissed]);

  if (dismissed) return null;

  const n = notifications[current];

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 px-5 py-4 max-w-xs flex items-start gap-3 relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        <div className="pr-4">
          <p className="text-sm text-gray-900 font-semibold leading-snug">
            {n.name} <span className="font-normal text-gray-500">from {n.location}</span>
          </p>
          <p className="text-sm text-gray-700 mt-0.5">
            just booked <span className="font-semibold text-cyan-700">{n.test}</span>
          </p>
          <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
        </div>
      </div>
    </div>
  );
};

export default SocialProofNotification;
