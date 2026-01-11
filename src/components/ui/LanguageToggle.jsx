import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@nanostores/react";
import { $language, $appState } from "../../stores/language";

export default function LanguageToggle() {
  const language = useStore($language);
  const [isHovered, setIsHovered] = useState(false);

  const handleSwitch = () => {
    // Set loading state
    $appState.set("loading");
    
    // After delay: switch language, scroll to top, reset state
    setTimeout(() => {
      // Switch language
      const newLang = language === "en" ? "id" : "en";
      $language.set(newLang);
      
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Small delay before hiding loader
      setTimeout(() => {
        $appState.set("idle");
      }, 300);
    }, 1200);
  };

  return (
    <motion.button
      onClick={handleSwitch}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 hover:border-white/40 transition-colors overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background indicator */}
      <motion.div
        className="absolute inset-0 bg-white/10"
        initial={false}
        animate={{
          x: language === "en" ? "0%" : "50%",
          width: "50%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      
      {/* EN */}
      <span
        className={`relative z-10 text-[10px] font-medium uppercase tracking-wider transition-colors ${
          language === "en" ? "text-white" : "text-white/40"
        }`}
      >
        EN
      </span>
      
      {/* Divider */}
      <span className="relative z-10 text-white/20 text-[10px]">/</span>
      
      {/* ID */}
      <span
        className={`relative z-10 text-[10px] font-medium uppercase tracking-wider transition-colors ${
          language === "id" ? "text-white" : "text-white/40"
        }`}
      >
        ID
      </span>
    </motion.button>
  );
}
