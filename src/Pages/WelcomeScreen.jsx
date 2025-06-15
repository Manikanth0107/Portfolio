import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, User } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-purple-400">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto text-center space-y-8">
              {/* Icons */}
              <motion.div
                className="flex justify-center gap-6"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div
                    key={index}
                    data-aos="fade-down"
                    data-aos-delay={index * 200}
                  >
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={childVariants}
                className="text-4xl md:text-5xl font-bold leading-snug"
              >
                <span
                  data-aos="fade-right"
                  className="block bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text"
                >
                  Hello, I'm <span className="text-purple-400">Manikanth</span>
                </span>
                <span
                  data-aos="fade-left"
                  className="block bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text mt-2"
                >
                  Full Stack & AI Developer
                </span>
              </motion.h1>

              {/* Domain Button */}
              <motion.div
                className="text-center"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <a
                  href="https://www.linkedin.com/in/bairagoni-manikanth-6a41ab248/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur border border-white/10 hover:scale-105 transition duration-300"
                >
                  <Globe className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium text-lg">
                    <TypewriterEffect text="manikanth.dev" />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
