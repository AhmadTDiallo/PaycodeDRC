import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, Wifi, CreditCard, Network, CheckCircle2, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import posDeviceImage from "@assets/POS device_1752596140378.jpg";

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
    <section id="edapt" className="relative py-16 overflow-hidden">
      {/* Background with blue gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-200/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_100%,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(29,78,216,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <Badge className="bg-gradient-to-r from-paycode-blue to-paycode-blue-light text-white px-6 py-2 text-lg font-semibold rounded-full backdrop-blur-sm border border-white/20 shadow-lg">
              {t("nav.edapt")}
            </Badge>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t("edapt.title")}
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t("edapt.subtitle")}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
          {/* 3D Floating POS Device */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group perspective-1000"
          >
            <div className="relative">
              {/* 3D Shadow beneath device */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent rounded-full blur-xl" />
              
              {/* Floating POS Device */}
              <motion.div
                className="relative z-10"
                whileHover={{ 
                  y: -15,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.05
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                style={{
                  transformStyle: "preserve-3d",
                  filter: "drop-shadow(0 25px 50px rgba(37, 99, 235, 0.25))"
                }}
              >
                <motion.img
                  src={posDeviceImage}
                  alt="POS Device"
                  className="w-full h-auto object-contain max-w-md mx-auto"
                  style={{
                    background: "transparent",
                    mixBlendMode: "normal"
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Floating particles around device */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" />
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full opacity-40 animate-ping" />
                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {edaptFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                className="group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-0 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-paycode-blue transition-colors">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Benefits Section with Glass Morphism */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-paycode-blue/90 to-paycode-blue-light/90 backdrop-blur-xl rounded-3xl p-6 md:p-10 text-white border border-white/10 shadow-2xl overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_70%)]" />
            
            <div className="relative">
              <motion.h3 
                variants={fadeInUp}
                className="text-2xl md:text-3xl font-bold text-center mb-6"
              >
                {t("edapt.benefitsTitle")}
              </motion.h3>
              
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <motion.div
                    key={num}
                    variants={fadeInUp}
                    className="flex items-start space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white mt-1" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-2">
                        {t(`edapt.benefit${num}Title`)}
                      </h4>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        {t(`edapt.benefit${num}Desc`)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}