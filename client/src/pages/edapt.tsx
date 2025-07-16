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
            <div className="text-2xl font-bold text-white">
              PAYCODE
            </div>
            
            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </nav>
      
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-50">
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("edaptPage.backButton") || "Retour"}</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Badge className="bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 px-6 py-3 text-lg font-medium rounded-full">
                {t("edaptPage.heroTag")}
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                EDAPT
              </span>
            </motion.h1>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-3xl text-slate-300 font-light mb-8 max-w-4xl mx-auto"
            >
              {t("edaptPage.heroSubtitle")}
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-12"
            >
              {t("edaptPage.heroDescription")}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl max-w-lg">
                <motion.div
                  className="relative w-full h-80 flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Modern Tech Illustration */}
                  <svg 
                    width="400" 
                    height="320" 
                    viewBox="0 0 400 320" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    {/* Background Circles */}
                    <motion.circle 
                      cx="200" 
                      cy="160" 
                      r="120" 
                      stroke="rgba(59, 130, 246, 0.3)" 
                      strokeWidth="2" 
                      fill="none"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle 
                      cx="200" 
                      cy="160" 
                      r="80" 
                      stroke="rgba(99, 102, 241, 0.4)" 
                      strokeWidth="1" 
                      fill="none"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Central Device */}
                    <rect x="160" y="120" width="80" height="80" rx="12" fill="rgba(30, 58, 138, 0.8)" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2"/>
                    
                    {/* Fingerprint Icon */}
                    <motion.g
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="M200 140c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 32c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z" fill="rgba(56, 189, 248, 0.9)"/>
                      <path d="M200 135c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 42c-9.4 0-17-7.6-17-17s7.6-17 17-17 17 7.6 17 17-7.6 17-17 17z" fill="rgba(56, 189, 248, 0.7)"/>
                      <path d="M200 130c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30zm0 52c-12.1 0-22-9.9-22-22s9.9-22 22-22 22 9.9 22 22-9.9 22-22 22z" fill="rgba(56, 189, 248, 0.5)"/>
                    </motion.g>
                    
                    {/* Connection Lines */}
                    <motion.line 
                      x1="200" y1="50" x2="200" y2="120" 
                      stroke="rgba(59, 130, 246, 0.6)" 
                      strokeWidth="2"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.line 
                      x1="200" y1="200" x2="200" y2="270" 
                      stroke="rgba(59, 130, 246, 0.6)" 
                      strokeWidth="2"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.line 
                      x1="80" y1="160" x2="160" y2="160" 
                      stroke="rgba(59, 130, 246, 0.6)" 
                      strokeWidth="2"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <motion.line 
                      x1="240" y1="160" x2="320" y2="160" 
                      stroke="rgba(59, 130, 246, 0.6)" 
                      strokeWidth="2"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    />
                    
                    {/* Network Nodes */}
                    <motion.circle 
                      cx="200" cy="40" r="8" 
                      fill="rgba(34, 197, 94, 0.8)"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.circle 
                      cx="200" cy="280" r="8" 
                      fill="rgba(34, 197, 94, 0.8)"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.circle 
                      cx="70" cy="160" r="8" 
                      fill="rgba(34, 197, 94, 0.8)"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <motion.circle 
                      cx="330" cy="160" r="8" 
                      fill="rgba(34, 197, 94, 0.8)"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    />
                    
                    {/* Data Flow Particles */}
                    <motion.circle 
                      cx="0" cy="0" r="3" 
                      fill="rgba(59, 130, 246, 0.8)"
                      animate={{
                        cx: [200, 70],
                        cy: [120, 160],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.circle 
                      cx="0" cy="0" r="3" 
                      fill="rgba(59, 130, 246, 0.8)"
                      animate={{
                        cx: [200, 330],
                        cy: [200, 160],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    
                    {/* Security Shield */}
                    <motion.g
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="M200 85l-15-8v-12l15-8 15 8v12l-15 8z" fill="rgba(239, 68, 68, 0.6)" stroke="rgba(239, 68, 68, 0.8)" strokeWidth="1"/>
                      <path d="M200 75l-8-4v-6l8-4 8 4v6l-8 4z" fill="rgba(239, 68, 68, 0.8)"/>
                    </motion.g>
                    
                    {/* Payment Symbol */}
                    <motion.g
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                      <rect x="285" y="140" width="20" height="12" rx="2" fill="rgba(59, 130, 246, 0.7)" stroke="rgba(59, 130, 246, 0.9)" strokeWidth="1"/>
                      <circle cx="295" cy="146" r="3" fill="rgba(255, 255, 255, 0.9)"/>
                    </motion.g>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-sm" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t("edaptPage.featuresTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-400 max-w-3xl mx-auto"
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
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className="w-16 h-16 rounded-xl bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="w-8 h-8 text-blue-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
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
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t("edaptPage.uniqueTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-400 max-w-3xl mx-auto"
            >
              {t("edaptPage.uniqueSubtitle")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <CardContent className="p-8">
                    <motion.div 
                      className="w-14 h-14 rounded-lg bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="w-7 h-7 text-blue-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
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
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-sm" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t("edaptPage.deploymentTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-400 max-w-3xl mx-auto mb-16"
            >
              {t("edaptPage.deploymentSubtitle")}
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                  <motion.div 
                    className="text-5xl font-bold text-blue-400 mb-4"
                    whileInView={{ scale: [0.5, 1.1, 1] }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t(stat.labelKey)}
                  </h3>
                  <p className="text-slate-400 text-sm">
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
            <motion.div variants={slideInLeft} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t("edaptPage.mastercardTitle")}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {t("edaptPage.mastercardDesc")}
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t("edaptPage.ghanaTitle")}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {t("edaptPage.ghanaDesc")}
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={slideInRight}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-xl font-bold text-white">Ghana</div>
                    <div className="text-sm text-slate-400">e-Zwich Platform</div>
                  </div>
                  <div className="text-center">
                    <Globe className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-xl font-bold text-white">Africa</div>
                    <div className="text-sm text-slate-400">Mastercard Integration</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-xl font-bold text-white">4M+</div>
                    <div className="text-sm text-slate-400">Active Users</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-xl font-bold text-white">Patented</div>
                    <div className="text-sm text-slate-400">Exclusive Technology</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative">
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
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t("edaptPage.ctaTitle")}
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-400 mb-8 leading-relaxed"
            >
              {t("edaptPage.ctaSubtitle")}
            </motion.p>
            <motion.button
              variants={fadeInUp}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition-all duration-300 inline-flex items-center gap-2"
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
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}