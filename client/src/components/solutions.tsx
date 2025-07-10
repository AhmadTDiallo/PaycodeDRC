import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Network, Monitor, Database, Settings, CheckCircle, Shield, Zap, ArrowRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function Solutions() {
  const { t } = useLanguage();
  
  const solutions = [
    {
      icon: Network,
      number: "01",
      title: t("solutions.switchTitle"),
      description: t("solutions.switchDesc"),
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      iconBg: "bg-gradient-to-br from-paycode-blue to-paycode-blue-light",
      features: ["PCI-DSS Compliant", "EMV/Edapt Integration", "Multi-Channel Support", "Real-time Authorization"],
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      delay: 0.1
    },
    {
      icon: Monitor,
      number: "02", 
      title: t("solutions.tmsTitle"),
      description: t("solutions.tmsDesc"),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      iconBg: "bg-gradient-to-br from-paycode-blue-accent to-purple-500",
      features: ["Remote Management", "Software Updates", "Device Monitoring", "Biometric Enrollment"],
      gradient: "from-purple-500 via-purple-600 to-pink-500",
      delay: 0.2
    },
    {
      icon: Database,
      number: "03",
      title: t("solutions.cbsTitle"), 
      description: t("solutions.cbsDesc"),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      features: ["Temenos Integration", "Full Banking Operations", "Cloud Ready", "Scalable Architecture"],
      gradient: "from-green-500 via-green-600 to-teal-500",
      delay: 0.3
    },
    {
      icon: Settings,
      number: "04",
      title: t("solutions.erpTitle"), 
      description: t("solutions.erpDesc"),
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
      features: ["Priority Software", "Compliance & Audit", "HR Payroll Integration", "Resource Planning"],
      gradient: "from-orange-500 via-orange-600 to-red-500",
      delay: 0.4
    },
  ];

  // Payment routing diagram as SVG
  const PaymentRoutingDiagram = () => (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
      <svg viewBox="0 0 400 300" className="w-full h-64">
        <defs>
          <linearGradient id="routingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        
        {/* Central Switch */}
        <rect x="175" y="125" width="50" height="50" fill="url(#routingGradient)" rx="5" />
        <text x="200" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Switch</text>
        
        {/* Banks */}
        <rect x="50" y="50" width="60" height="30" fill="#10b981" rx="3" />
        <text x="80" y="70" textAnchor="middle" fill="white" fontSize="10">Bank A</text>
        
        <rect x="50" y="220" width="60" height="30" fill="#10b981" rx="3" />
        <text x="80" y="240" textAnchor="middle" fill="white" fontSize="10">Bank B</text>
        
        {/* Mobile Money */}
        <rect x="290" y="50" width="60" height="30" fill="#f59e0b" rx="3" />
        <text x="320" y="70" textAnchor="middle" fill="white" fontSize="10">Mobile Money</text>
        
        {/* MFI */}
        <rect x="290" y="220" width="60" height="30" fill="#8b5cf6" rx="3" />
        <text x="320" y="240" textAnchor="middle" fill="white" fontSize="10">MFI</text>
        
        {/* Connection lines */}
        <line x1="110" y1="65" x2="175" y2="140" stroke="#3b82f6" strokeWidth="2" />
        <line x1="110" y1="235" x2="175" y2="160" stroke="#3b82f6" strokeWidth="2" />
        <line x1="225" y1="140" x2="290" y2="65" stroke="#3b82f6" strokeWidth="2" />
        <line x1="225" y1="160" x2="290" y2="235" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Data flow indicators */}
        <circle cx="140" cy="100" r="3" fill="#3b82f6">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="260" cy="200" r="3" fill="#3b82f6">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
        </circle>
      </svg>
    </div>
  );

  // TMS architecture diagram as SVG
  const TMSDiagram = () => (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
      <svg viewBox="0 0 400 300" className="w-full h-64">
        <defs>
          <linearGradient id="tmsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        
        {/* Central TMS Server */}
        <rect x="175" y="120" width="50" height="40" fill="url(#tmsGradient)" rx="5" />
        <text x="200" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">TMS</text>
        
        {/* POS Terminals */}
        <rect x="60" y="60" width="40" height="25" fill="#10b981" rx="3" />
        <text x="80" y="77" textAnchor="middle" fill="white" fontSize="9">POS 1</text>
        
        <rect x="60" y="130" width="40" height="25" fill="#10b981" rx="3" />
        <text x="80" y="147" textAnchor="middle" fill="white" fontSize="9">POS 2</text>
        
        <rect x="60" y="200" width="40" height="25" fill="#10b981" rx="3" />
        <text x="80" y="217" textAnchor="middle" fill="white" fontSize="9">POS 3</text>
        
        <rect x="300" y="60" width="40" height="25" fill="#10b981" rx="3" />
        <text x="320" y="77" textAnchor="middle" fill="white" fontSize="9">POS 4</text>
        
        <rect x="300" y="130" width="40" height="25" fill="#10b981" rx="3" />
        <text x="320" y="147" textAnchor="middle" fill="white" fontSize="9">POS 5</text>
        
        <rect x="300" y="200" width="40" height="25" fill="#10b981" rx="3" />
        <text x="320" y="217" textAnchor="middle" fill="white" fontSize="9">POS 6</text>
        
        {/* Connection lines from TMS to terminals */}
        <line x1="175" y1="140" x2="100" y2="72" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="175" y1="140" x2="100" y2="142" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="175" y1="140" x2="100" y2="212" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="225" y1="140" x2="300" y2="72" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="225" y1="140" x2="300" y2="142" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="225" y1="140" x2="300" y2="212" stroke="#8b5cf6" strokeWidth="2" />
        
        {/* Wireless indicators */}
        <circle cx="140" cy="100" r="2" fill="#8b5cf6">
          <animate attributeName="r" values="2;6;2" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="260" cy="180" r="2" fill="#8b5cf6">
          <animate attributeName="r" values="2;6;2" dur="2s" repeatCount="indefinite" begin="0.5s" />
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        
        {/* Status indicators on terminals */}
        <circle cx="90" cy="65" r="3" fill="#22c55e">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="90" cy="135" r="3" fill="#22c55e">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="0.3s" />
        </circle>
        <circle cx="90" cy="205" r="3" fill="#f59e0b">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="0.6s" />
        </circle>
        <circle cx="330" cy="65" r="3" fill="#22c55e">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="0.9s" />
        </circle>
        <circle cx="330" cy="135" r="3" fill="#22c55e">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="1.2s" />
        </circle>
        <circle cx="330" cy="205" r="3" fill="#22c55e">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="1.5s" />
        </circle>
        
        {/* Data labels */}
        <text x="200" y="50" textAnchor="middle" fill="#6b7280" fontSize="10">Remote Management</text>
        <text x="200" y="270" textAnchor="middle" fill="#6b7280" fontSize="10">Real-time Monitoring</text>
      </svg>
    </div>
  );

  // CBS architecture diagram as SVG
  const CBSDiagram = () => (
    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
      <svg viewBox="0 0 400 300" className="w-full h-64">
        <defs>
          <linearGradient id="cbsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        
        {/* Central CBS Core */}
        <rect x="160" y="120" width="80" height="60" fill="url(#cbsGradient)" rx="8" />
        <text x="200" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CBS Core</text>
        <text x="200" y="165" textAnchor="middle" fill="white" fontSize="9">Temenos</text>
        
        {/* Banking Services */}
        <rect x="50" y="40" width="70" height="35" fill="#22c55e" rx="4" />
        <text x="85" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Account</text>
        <text x="85" y="72" textAnchor="middle" fill="white" fontSize="8">Management</text>
        
        <rect x="280" y="40" width="70" height="35" fill="#22c55e" rx="4" />
        <text x="315" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Loan</text>
        <text x="315" y="72" textAnchor="middle" fill="white" fontSize="8">Origination</text>
        
        <rect x="50" y="230" width="70" height="35" fill="#22c55e" rx="4" />
        <text x="85" y="250" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Deposits &</text>
        <text x="85" y="262" textAnchor="middle" fill="white" fontSize="8">Withdrawals</text>
        
        <rect x="280" y="230" width="70" height="35" fill="#22c55e" rx="4" />
        <text x="315" y="250" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">General</text>
        <text x="315" y="262" textAnchor="middle" fill="white" fontSize="8">Ledger</text>
        
        {/* API Gateway */}
        <rect x="175" y="50" width="50" height="25" fill="#f59e0b" rx="3" />
        <text x="200" y="67" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">API Gateway</text>
        
        {/* Mobile & Web Apps */}
        <rect x="340" y="120" width="45" height="20" fill="#6366f1" rx="3" />
        <text x="362" y="133" textAnchor="middle" fill="white" fontSize="8">Mobile App</text>
        
        <rect x="340" y="150" width="45" height="20" fill="#6366f1" rx="3" />
        <text x="362" y="163" textAnchor="middle" fill="white" fontSize="8">Web Portal</text>
        
        {/* Connection lines */}
        <line x1="120" y1="57" x2="175" y2="62" stroke="#10b981" strokeWidth="2" />
        <line x1="280" y1="57" x2="225" y2="62" stroke="#10b981" strokeWidth="2" />
        <line x1="120" y1="247" x2="175" y2="170" stroke="#10b981" strokeWidth="2" />
        <line x1="280" y1="247" x2="225" y2="170" stroke="#10b981" strokeWidth="2" />
        
        <line x1="200" y1="75" x2="200" y2="120" stroke="#f59e0b" strokeWidth="3" />
        <line x1="240" y1="140" x2="340" y2="130" stroke="#6366f1" strokeWidth="2" />
        <line x1="240" y1="160" x2="340" y2="160" stroke="#6366f1" strokeWidth="2" />
        
        {/* Transaction flow indicators */}
        <circle cx="150" cy="90" r="3" fill="#10b981">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="90" r="3" fill="#10b981">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="290" cy="140" r="3" fill="#6366f1">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
        </circle>
        
        {/* Cloud infrastructure indicator */}
        <ellipse cx="200" cy="200" rx="15" ry="8" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,2">
          <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
        </ellipse>
        <text x="200" y="205" textAnchor="middle" fill="#059669" fontSize="8">Cloud Ready</text>
        
        {/* Data labels */}
        <text x="200" y="25" textAnchor="middle" fill="#6b7280" fontSize="10">End-to-End Banking Operations</text>
        <text x="200" y="295" textAnchor="middle" fill="#6b7280" fontSize="10">Scalable & Modular Architecture</text>
      </svg>
    </div>
  );

  // ERP integration diagram as SVG
  const ERPDiagram = () => (
    <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-lg">
      <svg viewBox="0 0 400 300" className="w-full h-64">
        <defs>
          <linearGradient id="erpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        
        {/* Central ERP System */}
        <rect x="150" y="130" width="100" height="60" fill="url(#erpGradient)" rx="8" />
        <text x="200" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Priority ERP</text>
        <text x="200" y="175" textAnchor="middle" fill="white" fontSize="9">Enterprise System</text>
        
        {/* Paycode Systems */}
        <rect x="50" y="60" width="80" height="40" fill="#3b82f6" rx="4" />
        <text x="90" y="78" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Paycode CBS</text>
        <text x="90" y="92" textAnchor="middle" fill="white" fontSize="8">Core Banking</text>
        
        <rect x="270" y="60" width="80" height="40" fill="#8b5cf6" rx="4" />
        <text x="310" y="78" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Paycode TMS</text>
        <text x="310" y="92" textAnchor="middle" fill="white" fontSize="8">Terminal Mgmt</text>
        
        <rect x="50" y="230" width="80" height="40" fill="#10b981" rx="4" />
        <text x="90" y="248" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Biometric</text>
        <text x="90" y="262" textAnchor="middle" fill="white" fontSize="8">Enrollment</text>
        
        <rect x="270" y="230" width="80" height="40" fill="#f59e0b" rx="4" />
        <text x="310" y="248" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Field</text>
        <text x="310" y="262" textAnchor="middle" fill="white" fontSize="8">Operations</text>
        
        {/* ERP Modules */}
        <rect x="160" y="40" width="35" height="25" fill="#ef4444" rx="3" />
        <text x="177" y="55" textAnchor="middle" fill="white" fontSize="8">Finance</text>
        
        <rect x="200" y="40" width="35" height="25" fill="#ef4444" rx="3" />
        <text x="217" y="55" textAnchor="middle" fill="white" fontSize="8">HR</text>
        
        <rect x="160" y="235" width="35" height="25" fill="#ef4444" rx="3" />
        <text x="177" y="250" textAnchor="middle" fill="white" fontSize="8">Audit</text>
        
        <rect x="200" y="235" width="35" height="25" fill="#ef4444" rx="3" />
        <text x="217" y="250" textAnchor="middle" fill="white" fontSize="8">Reports</text>
        
        {/* Connection lines */}
        <line x1="130" y1="80" x2="150" y2="140" stroke="#f97316" strokeWidth="2" />
        <line x1="270" y1="80" x2="250" y2="140" stroke="#f97316" strokeWidth="2" />
        <line x1="130" y1="250" x2="150" y2="180" stroke="#f97316" strokeWidth="2" />
        <line x1="270" y1="250" x2="250" y2="180" stroke="#f97316" strokeWidth="2" />
        
        <line x1="177" y1="65" x2="177" y2="130" stroke="#ef4444" strokeWidth="2" />
        <line x1="217" y1="65" x2="217" y2="130" stroke="#ef4444" strokeWidth="2" />
        <line x1="177" y1="190" x2="177" y2="235" stroke="#ef4444" strokeWidth="2" />
        <line x1="217" y1="190" x2="217" y2="235" stroke="#ef4444" strokeWidth="2" />
        
        {/* Data flow indicators */}
        <circle cx="140" cy="110" r="3" fill="#f97316">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="260" cy="110" r="3" fill="#f97316">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="140" cy="215" r="3" fill="#f97316">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="260" cy="215" r="3" fill="#f97316">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
        </circle>
        
        {/* Real-time sync indicators */}
        <circle cx="200" cy="100" r="2" fill="#22c55e">
          <animate attributeName="r" values="2;8;2" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
        </circle>
        <text x="200" y="120" textAnchor="middle" fill="#059669" fontSize="8">Real-time Sync</text>
        
        {/* Compliance badge */}
        <rect x="320" y="10" width="70" height="20" fill="#22c55e" rx="10" />
        <text x="355" y="23" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Audit Ready</text>
        
        {/* Data labels */}
        <text x="200" y="15" textAnchor="middle" fill="#6b7280" fontSize="10">Enterprise Integration</text>
        <text x="200" y="295" textAnchor="middle" fill="#6b7280" fontSize="10">Compliance & Resource Planning</text>
      </svg>
    </div>
  );

  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-secondary via-background to-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("solutions.title")}
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("solutions.subtitle")}
          </motion.p>
        </motion.div>

        {/* 2x2 Grid Layout - Mobile Optimized */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {solutions.map((solution, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: solution.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              {index === 0 ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <SolutionCard solution={solution} index={index} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-blue-600 mb-4">
                        {t("solutions.popup.title")}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Payment Routing Diagram */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t("solutions.popup.architecture")}</h3>
                        <PaymentRoutingDiagram />
                      </div>
                      
                      {/* Detailed Description */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t("solutions.popup.overview")}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {t("solutions.popup.description")}
                        </p>
                      </div>
                      
                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">{t("solutions.popup.keyFeatures")}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{t(`solutions.popup.feature${i}`)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : index === 1 ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <SolutionCard solution={solution} index={index} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-purple-600 mb-4">
                        {t("solutions.tms.popup.title")}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* TMS Architecture Diagram */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">TMS Architecture</h3>
                        <TMSDiagram />
                      </div>
                      
                      {/* Detailed Description */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t("solutions.tms.popup.overview")}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {t("solutions.tms.popup.description")}
                        </p>
                      </div>
                      
                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">{t("solutions.tms.popup.keyFeatures")}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{t(`solutions.tms.popup.feature${i}`)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : index === 2 ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <SolutionCard solution={solution} index={index} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-green-600 mb-4">
                        {t("solutions.cbs.popup.title")}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* CBS Architecture Diagram */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">CBS Architecture</h3>
                        <CBSDiagram />
                      </div>
                      
                      {/* Detailed Description */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t("solutions.cbs.popup.overview")}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {t("solutions.cbs.popup.description")}
                        </p>
                      </div>
                      
                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">{t("solutions.cbs.popup.keyFeatures")}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{t(`solutions.cbs.popup.feature${i}`)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : index === 3 ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <SolutionCard solution={solution} index={index} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-orange-600 mb-4">
                        {t("solutions.erp.popup.title")}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* ERP Integration Diagram */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">ERP Integration Architecture</h3>
                        <ERPDiagram />
                      </div>
                      
                      {/* Detailed Description */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t("solutions.erp.popup.overview")}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {t("solutions.erp.popup.description")}
                        </p>
                      </div>
                      
                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">{t("solutions.erp.popup.keyFeatures")}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{t(`solutions.erp.popup.feature${i}`)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <SolutionCard solution={solution} index={index} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Separate component for the solution card to avoid duplication
function SolutionCard({ solution, index }: { solution: any; index: number }) {
  return (
    <Card className="relative h-full bg-card border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden backdrop-blur-sm">
      {/* Tech Grid Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
          <defs>
            <linearGradient id={`circuit-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>
          
          {/* Animated circuit paths */}
          <path
            d="M0,50 L100,50 L100,100 L200,100 L200,150 L300,150"
            stroke={`url(#circuit-gradient-${index})`}
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M400,200 L300,200 L300,120 L200,120 L200,80 L100,80"
            stroke={`url(#circuit-gradient-${index})`}
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
          <path
            d="M0,250 L80,250 L80,180 L160,180 L160,130 L240,130 L240,80 L400,80"
            stroke={`url(#circuit-gradient-${index})`}
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          
          {/* Circuit nodes */}
          <circle cx="100" cy="50" r="3" fill="rgba(255,255,255,0.6)" className="animate-pulse" />
          <circle cx="200" cy="100" r="2" fill="rgba(255,255,255,0.5)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
          <circle cx="300" cy="150" r="2.5" fill="rgba(255,255,255,0.4)" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
          <circle cx="160" cy="180" r="2" fill="rgba(255,255,255,0.6)" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
        </svg>
        
        {/* Tech Corner Elements */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/40"></div>
          <div className="absolute top-2 left-8 w-6 h-0.5 bg-white/40"></div>
          <div className="absolute top-8 left-2 w-0.5 h-6 bg-white/40"></div>
        </div>
        
        <div className="absolute top-0 right-0 w-16 h-16">
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/40"></div>
          <div className="absolute top-2 right-8 w-6 h-0.5 bg-white/40"></div>
          <div className="absolute top-8 right-2 w-0.5 h-6 bg-white/40"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-16 h-16">
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/40"></div>
          <div className="absolute bottom-2 left-8 w-6 h-0.5 bg-white/40"></div>
          <div className="absolute bottom-8 left-2 w-0.5 h-6 bg-white/40"></div>
        </div>
        
        <div className="absolute bottom-0 right-0 w-16 h-16">
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/40"></div>
          <div className="absolute bottom-2 right-8 w-6 h-0.5 bg-white/40"></div>
          <div className="absolute bottom-8 right-2 w-0.5 h-6 bg-white/40"></div>
        </div>
      </div>

      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${solution.image})` }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-85 group-hover:opacity-90 transition-opacity duration-500`} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <motion.div 
            className={`relative w-14 h-14 ${solution.iconBg} rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tech corners on icon */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white/60 rounded-tl"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white/60 rounded-tr"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white/60 rounded-bl"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white/60 rounded-br"></div>
            
            <solution.icon className="text-white w-7 h-7" />
          </motion.div>
          
          <div className="relative">
            <motion.span 
              className="text-white/70 text-4xl lg:text-5xl font-bold font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: solution.delay + 0.3 }}
            >
              {solution.number}
            </motion.span>
            
            {/* Tech lines around number */}
            <div className="absolute -top-2 -right-2 w-8 h-0.5 bg-white/40"></div>
            <div className="absolute -top-2 -right-2 w-0.5 h-8 bg-white/40"></div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex-grow">
          <motion.h3 
            className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: solution.delay + 0.2 }}
          >
            {solution.title}
          </motion.h3>
          
          <motion.p 
            className="text-white/90 text-sm lg:text-base leading-relaxed mb-6 line-clamp-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: solution.delay + 0.4 }}
          >
            {solution.description}
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: solution.delay + 0.5 }}
        >
          {solution.features.map((feature, featureIndex) => (
            <motion.div
              key={featureIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: solution.delay + 0.6 + featureIndex * 0.1 }}
              className="relative flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20"
            >
              {/* Tech accent line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              
              <div className="relative">
                <CheckCircle className="w-3 h-3 text-white/80 flex-shrink-0" />
                <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
              </div>
              <span className="text-white/90 text-xs font-medium truncate font-mono">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Hover Arrow */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: solution.delay + 0.8 }}
        >
          <div className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            {/* Tech corners on arrow */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/60"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/60"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/60"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/60"></div>
            
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Animated Tech Border */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        whileHover={{
          boxShadow: "0 0 30px rgba(255,255,255,0.3)"
        }}
      >
        {/* Animated border lines */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-pulse" style={{ animationDelay: '0.25s' }}></div>
        <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-pulse" style={{ animationDelay: '0.75s' }}></div>
      </motion.div>
    </Card>
  );
}