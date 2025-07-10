import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0"
    >
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed">
        <div
          className="absolute inset-0 bg-gradient-to-r from-paycode-blue/70 to-paycode-blue-light/60"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2742&q=80')`,
            backgroundBlendMode: "overlay",
          }}
        />
      </div>
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-paycode-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-paycode-blue-light/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp}>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight px-2"
            variants={fadeInUp}
          >
            
            <motion.span 
              className="block text-lg sm:text-xl md:text-2xl lg:text-4xl font-poppins font-semibold tracking-wide text-[#334b7d] mt-[2px] mb-[2px] pl-[-12px] pr-[-12px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >{t("hero.title")}</motion.span>
            <span className="font-poppins text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold">
            {t("hero.subtitle")}
            </span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed font-inter px-4"
            variants={fadeInUp}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4"
            variants={fadeInUp}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-paycode-blue to-paycode-blue-light hover:from-paycode-blue-light hover:to-paycode-blue text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              {t("hero.contactUs")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold hover:bg-white hover:text-paycode-blue transition-all duration-300"
              onClick={() => scrollToSection("about")}
            >
              {t("hero.learnMore")}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center cursor-pointer"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection("about")}
          >
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
