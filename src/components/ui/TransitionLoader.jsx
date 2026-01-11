import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@nanostores/react";
import { $appState, $language, translations } from "../../stores/language";

export default function TransitionLoader() {
  const appState = useStore($appState);
  const language = useStore($language);
  
  const t = translations[language];

  return (
    <AnimatePresence>
      {appState === "loading" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9998] bg-[#050505] flex items-center justify-center"
        >
          {/* Loading indicator */}
          <div className="flex flex-col items-center gap-6">
            {/* Animated dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/60"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            
            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs text-white/30 uppercase tracking-[0.3em] font-display"
            >
              {t.transition.loading}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
