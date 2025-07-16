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
    <section id="edapt" className="relative py-20 overflow-hidden">
      {/* Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_100%,rgba(139,92,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* POS Device Image with Glass Morphism */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/20 shadow-2xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.img
                src={posDeviceImage}
                alt="POS Device"
                className="w-full h-auto rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                whileHover={{ y: -5 }}
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-full opacity-20 blur-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl" />
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
          <div className="bg-gradient-to-r from-paycode-blue/90 to-paycode-blue-light/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-white border border-white/10 shadow-2xl overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_70%)]" />
            
            <div className="relative">
              <motion.h3 
                variants={fadeInUp}
                className="text-2xl md:text-3xl font-bold text-center mb-8"
              >
                {t("edapt.benefitsTitle")}
              </motion.h3>
              
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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