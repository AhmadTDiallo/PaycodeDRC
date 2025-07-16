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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative">
      {/* Parallax Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${fingerprintImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          filter: 'blur(2px) brightness(0.3) contrast(1.2)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/85 via-indigo-800/80 to-purple-900/85 z-5" />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10 z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='17' cy='27' r='2'/%3E%3Ccircle cx='37' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 bg-indigo-400/25 rounded-full blur-lg"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-400/30 rotate-45 blur-md"
          animate={{
            rotate: [45, 135, 45],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Navigation */}
      <div className="relative z-30">
        <Navigation />
      </div>
      
      {/* Back Button */}
      <div className="fixed top-20 left-4 md:top-24 md:left-6 z-50">
        <motion.button
          className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-2 md:px-4 md:py-2 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/30"
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 inline-block mr-1 md:mr-2" />
          <span className="text-sm md:text-base">{t("edaptPage.backButton") || "Retour"}</span>
        </motion.button>
      </div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-indigo-600/20 to-purple-700/30 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.15),transparent_70%)]" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Paycode Logo */}
            <motion.div 
              variants={fadeInUp}
              className="flex justify-center mb-6 md:mb-8"
            >
              <div className="bg-white/20 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/30 shadow-2xl">
                <div className="text-2xl md:text-4xl font-bold text-white">
                  PAYCODE
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-4 md:mb-6">
              <Badge className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 md:px-8 py-2 md:py-3 text-sm md:text-lg font-semibold rounded-full shadow-xl">
                {t("edaptPage.heroTag")}
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-4 drop-shadow-lg"
            >
              <span className="text-cyan-300">
                EDAPT
              </span>
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl text-blue-100 font-medium">
                {t("edaptPage.heroSubtitle")}
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base md:text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 px-4 drop-shadow-sm"
            >
              {t("edaptPage.heroDescription")}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center px-4"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl max-w-sm md:max-w-md">
                <motion.img
                  src={fingerprintImage}
                  alt="EDAPT Technology"
                  className="w-full h-auto object-contain mx-auto"
                  style={{
                    filter: "contrast(1.2) brightness(1.1) saturate(1.3) drop-shadow(0 0 20px rgba(255,255,255,0.3))"
                  }}
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.02, 1],
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
      <section className="py-16 md:py-20 relative">
        {/* Background with glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/40 via-indigo-700/30 to-blue-900/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-4xl font-bold text-white mb-4 px-4 drop-shadow-lg"
            >
              {t("edaptPage.featuresTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto px-4"
            >
              {t("edaptPage.featuresSubtitle")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border border-white/20 bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-6 md:p-8 text-center">
                    <motion.div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl"
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-blue-100 leading-relaxed text-sm md:text-base">
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
      <section className="py-16 md:py-20 relative">
        {/* Deep blue glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-blue-800/50 to-purple-900/60 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2),transparent_60%)]" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-4xl font-bold text-white mb-4 px-4 drop-shadow-lg"
            >
              {t("edaptPage.uniqueTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base md:text-lg text-cyan-100 max-w-3xl mx-auto px-4"
            >
              {t("edaptPage.uniqueSubtitle")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {uniqueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <Card className="h-full border border-white/30 bg-white/5 backdrop-blur-xl hover:bg-white/15 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/20">
                  <CardContent className="p-4 md:p-6">
                    <motion.div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-cyan-400/30 to-blue-500/40 backdrop-blur-md border border-white/40 flex items-center justify-center mb-3 md:mb-4 shadow-xl"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </motion.div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-cyan-100 text-sm leading-relaxed">
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
      <section className="py-16 md:py-20 relative">
        {/* Light blue glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/30 via-cyan-600/20 to-indigo-800/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.1),transparent_70%)]" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-4xl font-bold text-white mb-4 px-4 drop-shadow-lg"
            >
              {t("edaptPage.deploymentTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto mb-8 md:mb-12 px-4"
            >
              {t("edaptPage.deploymentSubtitle")}
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
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
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15">
                  <motion.div 
                    className="text-3xl md:text-5xl font-bold text-cyan-300 mb-2 drop-shadow-lg"
                    whileInView={{ scale: [0.5, 1.1, 1] }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                    {t(stat.labelKey)}
                  </h3>
                  <p className="text-blue-100 text-sm">
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
            <motion.div variants={slideInLeft} className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
                  {t("edaptPage.mastercardTitle")}
                </h3>
                <p className="text-blue-100 leading-relaxed text-sm md:text-base">
                  {t("edaptPage.mastercardDesc")}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
                  {t("edaptPage.ghanaTitle")}
                </h3>
                <p className="text-blue-100 leading-relaxed text-sm md:text-base">
                  {t("edaptPage.ghanaDesc")}
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={slideInRight}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 md:w-12 md:h-12 text-cyan-300 mx-auto mb-2 md:mb-3" />
                    <div className="text-base md:text-xl font-bold text-white">Ghana</div>
                    <div className="text-xs md:text-sm text-blue-200">e-Zwich Platform</div>
                  </div>
                  <div className="text-center">
                    <Globe className="w-8 h-8 md:w-12 md:h-12 text-cyan-300 mx-auto mb-2 md:mb-3" />
                    <div className="text-base md:text-xl font-bold text-white">Africa</div>
                    <div className="text-xs md:text-sm text-blue-200">Mastercard Integration</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 md:w-12 md:h-12 text-cyan-300 mx-auto mb-2 md:mb-3" />
                    <div className="text-base md:text-xl font-bold text-white">4M+</div>
                    <div className="text-xs md:text-sm text-blue-200">Active Users</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 md:w-12 md:h-12 text-cyan-300 mx-auto mb-2 md:mb-3" />
                    <div className="text-base md:text-xl font-bold text-white">Patented</div>
                    <div className="text-xs md:text-sm text-blue-200">Exclusive Technology</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 relative">
        {/* Final CTA with deep blue glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-blue-900/60 to-purple-900/70 backdrop-blur-md" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_60%)]" />
        
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 px-4 drop-shadow-lg"
            >
              {t("edaptPage.ctaTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-base md:text-xl text-cyan-100 mb-6 md:mb-8 leading-relaxed px-4"
            >
              {t("edaptPage.ctaSubtitle")}
            </motion.p>
            <motion.button
              variants={fadeInUp}
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:bg-white/30"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)" }}
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
              <ArrowRight className="inline-block ml-2 w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}