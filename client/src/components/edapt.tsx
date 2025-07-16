import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, Wifi, CreditCard, Network, CheckCircle2, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import fingerprintImage from "@assets/fingerregister_1752658741575.avif";

export default function Edapt() {
  const { t } = useLanguage();

  const edaptFeatures = [
    {
      icon: Fingerprint,
      titleKey: "edapt.feature1Title",
      descKey: "edapt.feature1Desc",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: CreditCard,
      titleKey: "edapt.feature2Title", 
      descKey: "edapt.feature2Desc",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Wifi,
      titleKey: "edapt.feature3Title",
      descKey: "edapt.feature3Desc", 
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Network,
      titleKey: "edapt.feature4Title",
      descKey: "edapt.feature4Desc",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="edapt" className="relative py-12 overflow-hidden">
      {/* Modern blue glass morphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-500/15 to-indigo-600/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,197,253,0.08),transparent_70%)]" />
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />
      </div>
      
      {/* Floating geometric shapes for visual interest */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-indigo-400/15 rounded-full blur-lg animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rotate-45 blur-md animate-bounce" style={{ animationDuration: "4s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            variants={fadeInUp} 
            className="flex justify-center mb-6"
            whileInView={{ scale: [0.8, 1.05, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-md text-white px-6 py-2 text-base font-semibold rounded-full shadow-xl border border-white/20">
              {t("nav.edapt")}
            </Badge>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg"
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("edapt.title")}
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-sm"
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("edapt.subtitle")}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-8">
          {/* 3D Floating POS Device with Glass Container */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative group perspective-1000"
            whileInView={{ 
              scale: [0.9, 1],
              rotateY: [15, 0],
              opacity: [0, 1]
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Glass morphism container */}
            <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 transition-all duration-500" />
              
              {/* 3D Shadow beneath device */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent rounded-full blur-xl" />
              
              {/* Floating Fingerprint Registration Device */}
              <motion.div
                className="relative z-10"
                whileHover={{ 
                  y: -15,
                  rotateX: 8,
                  rotateY: 8,
                  scale: 1.05
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15 
                }}
                style={{
                  transformStyle: "preserve-3d",
                  filter: "drop-shadow(0 25px 50px rgba(37, 99, 235, 0.3))"
                }}
              >
                <motion.div
                  className="relative max-w-sm mx-auto"
                  animate={{
                    y: [0, -8, 0],
                    rotateY: [0, 2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src={fingerprintImage}
                    alt="Fingerprint Registration Device"
                    className="w-full h-auto object-contain"
                    style={{
                      background: "transparent",
                      filter: "contrast(1.1) brightness(1.05) saturate(1.2) drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))"
                    }}
                  />
                </motion.div>
              </motion.div>
              
              {/* Enhanced floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" />
                <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50 animate-ping" />
                <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-45 animate-bounce" style={{ animationDelay: "2s" }} />
              </div>
            </div>
          </motion.div>

          {/* Features Grid with Glass Cards */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-6"
          >
            {edaptFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                className="group"
                whileHover={{ y: -8, scale: 1.02 }}
                whileInView={{ 
                  y: [20, 0],
                  opacity: [0, 1],
                  scale: [0.9, 1]
                }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <Card className="h-full border-0 bg-white/15 backdrop-blur-md hover:bg-white/25 transition-all duration-500 border border-white/20 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-base font-bold text-white mb-3 group-hover:text-blue-200 transition-colors drop-shadow-sm">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm text-blue-100 leading-relaxed drop-shadow-sm">
                      {t(feature.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Learn More Section */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Navigate to EDAPT page
              window.location.href = '/edapt';
            }}
          >
            {t("edapt.learnMore") || "En savoir plus"}
            <ArrowRight className="inline-block ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}