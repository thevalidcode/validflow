import {
  Eye,
  Folder,
  FolderCheck,
  FolderSearch,
  MoveRight,
  RotateCcw,
  ShieldCheck,
  Shredder,
  SlidersHorizontal,
  Rocket,
  Files,
  Settings2,
  HelpCircle,
  Zap,
} from "lucide-react";
import { startBackend, stopBackend, backendProcess } from "../backend";
import RuleBuilder from "../components/RuleBuilder";
import { useState } from "react";
import ErrorLogs from "@/components/ErrorLogs";

const LandingPage = () => {
  const [showRules, setShowRules] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const startBackendAsync = async () => {
    if (backendProcess) {
      await stopBackend();
    } else {
      await startBackend();
    }
  };

  return (
    <div className="w-full min-h-screen bg-yellow-50 text-yellow-900 font-sans">
      {/* Logo */}
      <img
        src="/validflow-removedbg.png"
        alt="ValidFlow Logo"
        className="w-48 h-48 absolute left-[50%] -translate-x-[50%] z-10 mt-10"
      />

      {/* Hero Section */}
      <section className="w-full pt-40 pb-20 flex flex-col items-center text-center gap-6 px-6">
        <h1 className="text-5xl font-extrabold">
          Automate Smarter with{" "}
          <span className="text-yellow-400">ValidFlow</span>
        </h1>
        <p className="max-w-xl text-lg">
          ValidFlow runs silently in the background, detecting, organizing, and
          managing your documents intelligently — all while respecting your
          privacy.
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={startBackendAsync}
            className={`relative px-6 py-3 font-bold rounded-xl text-white shadow-[8px_8px_16px_#d6b54c,-8px_-8px_16px_#ffffd4] 
      bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
      transform transition-all duration-300 
      hover:scale-105 hover:shadow-[4px_4px_8px_#d6b54c,-4px_-4px_8px_#ffffd4] 
      active:translate-y-1 active:shadow-[2px_2px_4px_#d6b54c,-2px_-2px_4px_#ffffd4]`}
          >
            {backendProcess ? "Stop ValidFlow" : "Launch ValidFlow"}
          </button>

          <button
            type="button"
            onClick={() => setShowRules(true)}
            className={`relative px-6 py-3 font-semibold rounded-xl text-yellow-900 border-2 border-yellow-300
      bg-white bg-gradient-to-tr from-white via-yellow-50 to-white
      transform transition-all duration-300 
      hover:scale-105 hover:shadow-[4px_4px_12px_rgba(0,0,0,0.1)] 
      active:translate-y-1 active:shadow-[2px_2px_6px_rgba(0,0,0,0.1)]`}
          >
            Build Rules
          </button>

          <button
            type="button"
            onClick={() => setShowLogs(true)}
            className={`relative px-6 py-3 font-semibold rounded-xl text-yellow-900 border-2 border-yellow-300
      bg-white bg-gradient-to-tr from-white via-yellow-50 to-white
      transform transition-all duration-300 
      hover:scale-105 hover:shadow-[4px_4px_12px_rgba(0,0,0,0.1)] 
      active:translate-y-1 active:shadow-[2px_2px_6px_rgba(0,0,0,0.1)]`}
          >
            View Error Logs
          </button>
        </div>

        <div className="mt-6 text-green-600 font-semibold text-sm">
          {backendProcess &&
            "✅ ValidFlow is now working silently in the background."}
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-20 bg-yellow-100 px-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="flex gap-6 flex-wrap justify-center">
          {[
            {
              icon: <Folder size={30} />,
              text: "Watches Folder (Downloads)",
            },
            {
              icon: <FolderSearch size={30} />,
              text: "Detect File Type",
            },
            {
              icon: <Shredder size={30} />,
              text: "Apply Rules",
            },
            {
              icon: <FolderCheck size={30} />,
              text: "Rename & Save Files",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-yellow-50 p-4 rounded-lg shadow-[inset_0_4px_8px_rgba(255,193,7,0.2),0_6px_12px_rgba(255,193,7,0.2)]"
            >
              {item.icon}
              <p className="text-sm font-medium">{item.text}</p>
              {idx < 3 && <MoveRight size={20} className="mx-2" />}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-24 px-6 flex flex-col items-center gap-10 bg-yellow-50">
        <h2 className="text-3xl font-bold">Feature Highlights</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Eye size={30} />,
              text: "Real-Time Monitoring",
            },
            {
              icon: <SlidersHorizontal size={30} />,
              text: "Custom Sorting Rules",
            },
            {
              icon: <RotateCcw size={30} />,
              text: "One Click Undo",
            },
            {
              icon: <ShieldCheck size={30} />,
              text: "Offline Privacy",
            },
            {
              icon: <Rocket size={30} />,
              text: "Fast & Lightweight",
            },
            {
              icon: <Zap size={30} />,
              text: "Automation Triggers",
            },
            {
              icon: <Files size={30} />,
              text: "Bulk File Handling",
            },
            {
              icon: <Settings2 size={30} />,
              text: "Advanced Config",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-yellow-100 flex flex-col items-center p-6 rounded-lg shadow-[inset_0_4px_8px_rgba(255,193,7,0.2),0_6px_12px_rgba(255,193,7,0.2)] hover:scale-105 transition-transform text-center"
            >
              {item.icon}
              <p className="text-sm font-semibold mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-24 px-6 bg-yellow-100 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
        <div className="max-w-2xl space-y-6">
          {[
            {
              q: "Does ValidFlow work offline?",
              a: "Yes. It runs 100% locally and doesn’t send files anywhere.",
            },
            {
              q: "Can I undo actions?",
              a: "Yes, you can reverse file moves with the One Click Undo feature.",
            },
            {
              q: "How do I customize rules?",
              a: "Go to the settings and define your own smart rules by file type, keywords, or size.",
            },
            {
              q: "Is ValidFlow fast enough for large folders?",
              a: "Yes. It is optimized for performance and can process thousands of files quickly.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-yellow-50 p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                <HelpCircle size={18} /> {item.q}
              </h3>
              <p className="text-sm text-yellow-800">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 bg-yellow-300 text-yellow-900 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Start Organizing with Confidence
        </h2>
        <p className="max-w-xl mx-auto mb-6">
          ValidFlow helps you take back control of your digital files with
          automation and ease.
        </p>
        <button
          type="button"
          onClick={startBackendAsync}
          className="bg-yellow-400 rounded-xl px-8 py-3 text-yellow-900 font-bold shadow-[6px_6px_14px_#bfa400,-6px_-6px_14px_#fffca6] hover:scale-105 transition-transform"
        >
          Start Now
        </button>
      </section>

      {showRules && <RuleBuilder onClose={() => setShowRules(false)} />}
      {showLogs && <ErrorLogs onClose={() => setShowLogs(false)} />}
    </div>
  );
};

export default LandingPage;
