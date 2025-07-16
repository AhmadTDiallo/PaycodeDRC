import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Fingerprint, 
  Wifi, 
  CreditCard, 
  Network, 
  Globe,
  Shield,
  Users,
  MapPin,
  CheckCircle2,
  Award,
  Zap,
  Eye,
  Hand,
  Phone,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import fingerprintImage from "@assets/fingerregister_1752658741575.avif";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function EdaptPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Fingerprint,
      titleKey: "edaptPage.feature1Title",
      descKey: "edaptPage.feature1Desc",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: CreditCard,
      titleKey: "edaptPage.feature2Title", 
      descKey: "edaptPage.feature2Desc",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: Wifi,
      titleKey: "edaptPage.feature3Title",
      descKey: "edaptPage.feature3Desc", 
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Network,
      titleKey: "edaptPage.feature4Title",
      descKey: "edaptPage.feature4Desc",
      color: "from-pink-500 to-red-600"
    }
  ];

  const uniqueFeatures = [
    {
      icon: Award,
      titleKey: "edaptPage.unique1Title",
      descKey: "edaptPage.unique1Desc"
    },
    {
      icon: Eye,
      titleKey: "edaptPage.unique2Title", 
      descKey: "edaptPage.unique2Desc"
    },
    {
      icon: Hand,
      titleKey: "edaptPage.unique3Title",
      descKey: "edaptPage.unique3Desc"
    },
    {
      icon: Zap,
      titleKey: "edaptPage.unique4Title",
      descKey: "edaptPage.unique4Desc"
    },
    {
      icon: Globe,
      titleKey: "edaptPage.unique5Title",
      descKey: "edaptPage.unique5Desc"
    }
  ];

  const deploymentStats = [
    {
      number: "4M+",
      labelKey: "edaptPage.stat1Label",
      descKey: "edaptPage.stat1Desc"
    },
    {
      number: "8",
      labelKey: "edaptPage.stat2Label", 
      descKey: "edaptPage.stat2Desc"
    },
    {
      number: "1",
      labelKey: "edaptPage.stat3Label",
      descKey: "edaptPage.stat3Desc"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      {/* Navigation */}
      <Navigation />
      
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-50">
        <motion.button
          className="bg-white/80 backdrop-blur-md text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="w-5 h-5 inline-block mr-2" />
          {t("edaptPage.backButton") || "Retour"}
        </motion.button>
      </div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-500/15 to-purple-600/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.12),transparent_60%)]" />
          <div className="absolute inset-0 backdrop-blur-[1px] bg-white/5" />
        </div>
        
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-400/15 rounded-full blur-lg animate-ping" style={{ animationDuration: "4s" }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300/20 rotate-45 blur-md animate-bounce" style={{ animationDuration: "5s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Paycode Logo */}
            <motion.div 
              variants={fadeInUp}
              className="flex justify-center mb-8"
            >
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PAYCODE
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-6">
              <Badge className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-md text-white px-8 py-3 text-lg font-semibold rounded-full shadow-xl border border-white/20">
                {t("edaptPage.heroTag")}
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                EDAPT
              </span>
              <br />
              <span className="text-2xl md:text-3xl text-gray-700">
                {t("edaptPage.heroSubtitle")}
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              {t("edaptPage.heroDescription")}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center"
            >
              <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                <motion.img
                  src={fingerprintImage}
                  alt="EDAPT Technology"
                  className="w-64 h-auto object-contain mx-auto"
                  style={{
                    filter: "contrast(1.1) brightness(1.05) saturate(1.2) drop-shadow(0 0 30px rgba(59, 130, 246, 0.4))"
                  }}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              {t("edaptPage.featuresTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              {t("edaptPage.featuresSubtitle")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-0 bg-white/60 backdrop-blur-lg hover:bg-white/80 transition-all duration-500 border border-white/20 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why EDAPT is Unique Section */}
      <section className="py-20 relative bg-gradient-to-r from-blue-900/80 via-indigo-900/70 to-purple-900/80 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.12),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg"
            >
              {t("edaptPage.uniqueTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-blue-100 max-w-3xl mx-auto"
            >
              {t("edaptPage.uniqueSubtitle")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full border-0 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-500 border border-white/20 shadow-xl">
                  <CardContent className="p-6">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Deployment Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              {t("edaptPage.deploymentTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
            >
              {t("edaptPage.deploymentSubtitle")}
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {deploymentStats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
                    whileInView={{ scale: [0.5, 1.1, 1] }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t(stat.labelKey)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t(stat.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Deployment Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={slideInLeft}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t("edaptPage.mastercardTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t("edaptPage.mastercardDesc")}
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t("edaptPage.ghanaTitle")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("edaptPage.ghanaDesc")}
              </p>
            </motion.div>

            <motion.div 
              variants={slideInRight}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <div className="text-xl font-bold text-gray-900">Ghana</div>
                    <div className="text-sm text-gray-600">e-Zwich Platform</div>
                  </div>
                  <div className="text-center">
                    <Globe className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                    <div className="text-xl font-bold text-gray-900">Africa</div>
                    <div className="text-sm text-gray-600">Mastercard Integration</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <div className="text-xl font-bold text-gray-900">4M+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-pink-600 mx-auto mb-3" />
                    <div className="text-xl font-bold text-gray-900">Patented</div>
                    <div className="text-sm text-gray-600">Exclusive Technology</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_70%)]" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              {t("edaptPage.ctaTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-blue-100 mb-8 leading-relaxed"
            >
              {t("edaptPage.ctaSubtitle")}
            </motion.p>
            <motion.button
              variants={fadeInUp}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#contact';
                }
              }}
            >
              {t("edaptPage.ctaButton")}
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}