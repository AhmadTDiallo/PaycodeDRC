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
import LanguageSelector from "@/components/LanguageSelector";
import fingerprintImage from "@assets/fingerregister_1752658741575.avif";

export default function EdaptPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Fingerprint,
      titleKey: "edaptPage.feature1Title",
      descKey: "edaptPage.feature1Desc"
    },
    {
      icon: Shield,
      titleKey: "edaptPage.feature2Title", 
      descKey: "edaptPage.feature2Desc"
    },
    {
      icon: Zap,
      titleKey: "edaptPage.feature3Title",
      descKey: "edaptPage.feature3Desc"
    },
    {
      icon: Globe,
      titleKey: "edaptPage.feature4Title",
      descKey: "edaptPage.feature4Desc"
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
    }
  ];

  const deploymentStats = [
    {
      number: "4M+",
      labelKey: "edaptPage.stat1Label",
      descKey: "edaptPage.stat1Desc"
    },
    {
      number: "99.9%",
      labelKey: "edaptPage.stat2Label", 
      descKey: "edaptPage.stat2Desc"
    },
    {
      number: "15+",
      labelKey: "edaptPage.stat3Label",
      descKey: "edaptPage.stat3Desc"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Fixed Parallax Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${fingerprintImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          filter: 'blur(2px) brightness(0.2) contrast(1.2)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95 z-5" />

      {/* Professional Navigation */}
      <nav className="relative z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="w-10 h-10 rounded-full bg-blue-500/30 backdrop-blur-md border border-blue-400/50 flex items-center justify-center">
              <Fingerprint className="w-6 h-6 text-blue-200" />
            </div>
            
            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </nav>
      
      {/* Back Button */}
      <div className="fixed top-20 left-4 md:top-24 md:left-6 z-50">
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-1 md:gap-2 text-sm md:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">{t("edaptPage.backButton") || "Retour"}</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-24 md:py-32">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${fingerprintImage})`,
            filter: 'brightness(0.4) contrast(1.4) saturate(1.2)',
          }}
        />
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/75 to-slate-900/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-transparent to-slate-900/60" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="mb-6 md:mb-8">
              <Badge className="bg-blue-600/30 backdrop-blur-md border border-blue-400/40 text-blue-100 px-4 py-2 md:px-8 md:py-4 text-sm md:text-xl font-medium rounded-full shadow-2xl">
                {t("edaptPage.heroTag")}
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 md:mb-8 leading-tight px-4"
              style={{
                textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
              }}
            >
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                EDAPT
              </span>
            </motion.h1>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-white font-light mb-6 md:mb-8 max-w-5xl mx-auto px-4"
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)'
              }}
            >
              {t("edaptPage.heroSubtitle")}
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 max-w-5xl mx-auto leading-relaxed mb-12 md:mb-16 px-4"
              style={{
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
              }}
            >
              {t("edaptPage.heroDescription")}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center"
            >
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 border border-white/20 shadow-2xl mx-4 sm:mx-0"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-blue-500/40 backdrop-blur-md border border-blue-300/60 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      "0 0 25px rgba(59, 130, 246, 0.4)",
                      "0 0 50px rgba(59, 130, 246, 0.8)",
                      "0 0 25px rgba(59, 130, 246, 0.4)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Fingerprint className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-100" />
                </motion.div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    {t("edaptPage.heroImageTitle") || "Technologie Biométrique"}
                  </h3>
                  <p className="text-sm sm:text-base text-blue-200">
                    {t("edaptPage.heroImageSubtitle") || "Sécurité Avancée"}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-sm" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4"
            >
              {t("edaptPage.featuresTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto px-4"
            >
              {t("edaptPage.featuresSubtitle")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                    <motion.div 
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center mx-auto mb-4 md:mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-400" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 md:mb-4">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
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
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4"
            >
              {t("edaptPage.uniqueTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto px-4"
            >
              {t("edaptPage.uniqueSubtitle")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {uniqueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <motion.div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center mb-4 md:mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 md:mb-4">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
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
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-sm" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4"
            >
              {t("edaptPage.deploymentTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 md:mb-16 px-4"
            >
              {t("edaptPage.deploymentSubtitle")}
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
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
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
                  <motion.div 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-3 md:mb-4"
                    whileInView={{ scale: [0.5, 1.1, 1] }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                    {t(stat.labelKey)}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <motion.div variants={slideInLeft} className="space-y-6 md:space-y-8 px-4 lg:px-0">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                  {t("edaptPage.mastercardTitle")}
                </h3>
                <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                  {t("edaptPage.mastercardDesc")}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                  {t("edaptPage.ghanaTitle")}
                </h3>
                <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                  {t("edaptPage.ghanaDesc")}
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={slideInRight}
              className="relative px-4 lg:px-0"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 md:mb-3" />
                    <div className="text-lg sm:text-xl font-bold text-white">Ghana</div>
                    <div className="text-xs sm:text-sm text-slate-400">e-Zwich Platform</div>
                  </div>
                  <div className="text-center">
                    <Globe className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 md:mb-3" />
                    <div className="text-lg sm:text-xl font-bold text-white">Africa</div>
                    <div className="text-xs sm:text-sm text-slate-400">Mastercard Integration</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 md:mb-3" />
                    <div className="text-lg sm:text-xl font-bold text-white">4M+</div>
                    <div className="text-xs sm:text-sm text-slate-400">Active Users</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 md:mb-3" />
                    <div className="text-lg sm:text-xl font-bold text-white">Patented</div>
                    <div className="text-xs sm:text-sm text-slate-400">Exclusive Technology</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm" />
        
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4"
            >
              {t("edaptPage.ctaTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 md:mb-8 leading-relaxed px-4"
            >
              {t("edaptPage.ctaSubtitle")}
            </motion.p>
            <motion.button
              variants={fadeInUp}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg shadow-xl transition-all duration-300 inline-flex items-center gap-2"
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
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}