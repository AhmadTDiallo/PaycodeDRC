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
    <section id="edapt" className="relative py-12 overflow-hidden">
      {/* Background matching website theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(55,65,81,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_100%,rgba(55,65,81,0.02),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <Badge className="bg-gradient-to-r from-paycode-blue to-paycode-blue-light text-white px-4 py-1 text-sm font-semibold rounded-full shadow-md">
              {t("nav.edapt")}
            </Badge>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
          >
            {t("edapt.title")}
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            {t("edapt.subtitle")}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
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
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3/5 h-6 bg-gradient-to-r from-transparent via-gray-400/20 to-transparent rounded-full blur-lg" />
              
              {/* Floating POS Device */}
              <motion.div
                className="relative z-10"
                whileHover={{ 
                  y: -10,
                  rotateX: 3,
                  rotateY: 3,
                  scale: 1.03
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                style={{
                  transformStyle: "preserve-3d",
                  filter: "drop-shadow(0 15px 30px rgba(75, 85, 99, 0.2))"
                }}
              >
                <motion.div
                  className="relative max-w-xs mx-auto"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src={posDeviceImage}
                    alt="POS Device"
                    className="w-full h-auto object-contain pos-device-float"
                    style={{
                      background: "transparent",
                      mixBlendMode: "multiply",
                      filter: "contrast(1.2) brightness(0.95) saturate(1.1)"
                    }}
                  />
                </motion.div>
              </motion.div>
              
              {/* Floating particles around device */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-paycode-blue rounded-full opacity-40 animate-pulse" />
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-paycode-blue-light rounded-full opacity-30 animate-ping" />
                <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-paycode-blue rounded-full opacity-35 animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {edaptFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                className="group"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-0 bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <CardContent className="p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-paycode-blue transition-colors">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            
            <div className="relative">
              <motion.h3 
                variants={fadeInUp}
                className="text-xl font-bold text-center mb-4"
              >
                {t("edapt.benefitsTitle")}
              </motion.h3>
              
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <motion.div
                    key={num}
                    variants={fadeInUp}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white mt-0.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">
                        {t(`edapt.benefit${num}Title`)}
                      </h4>
                      <p className="text-gray-300 text-xs leading-relaxed">
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