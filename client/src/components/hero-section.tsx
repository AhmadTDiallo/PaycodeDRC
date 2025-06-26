import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
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
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            variants={fadeInUp}
          >
            
            <motion.span 
              className="block text-3xl md:text-5xl font-poppins font-semibold tracking-wide text-[#334b7d] mt-[2px] mb-[2px] pl-[-12px] pr-[-12px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >PAYCODE FINTECH CONGO</motion.span>
            <span className="font-poppins text-4xl md:text-6xl font-semibold">
              Biometric Digital Identity for{" "}
              <span className="text-gradient-blue">
                Financial Inclusion
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto leading-relaxed font-inter"
            variants={fadeInUp}
          >
            Licensed payment aggregator providing shared, interoperable payment platforms 
            for Financial Institutions across the Democratic Republic of Congo. Connecting 
            banks, MFIs, and mobile money operators through unified technology.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-paycode-blue to-paycode-blue-light hover:from-paycode-blue-light hover:to-paycode-blue text-white px-8 py-4 text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              <Play className="mr-2 h-5 w-5" />
              Book a Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-paycode-blue transition-all duration-300"
              onClick={() => scrollToSection("about")}
            >
              Learn More
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
