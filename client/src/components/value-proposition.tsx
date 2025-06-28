import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Building2, Users, Shield, Zap } from "lucide-react";

export default function ValueProposition() {
  return (
    <>
      {/* Main Value Proposition */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-paycode-blue to-paycode-blue-light"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Nous sommes un Agrégateur de Paiements agréé {" "}
              <span className="text-paycode-blue-accent">fournissant des plateformes de paiement interopérables</span> pour les institutions financières.{" "}
              <span className="text-paycode-blue-accent">Nous connectons les banques,les IMF et les opérateurs de mobile money grâce à </span>{" "}
              une technologie unifiée.
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Our technology supports multiple data types including biometrics, KYC
              data, location data, health data and more. Any financial institution,
              central bank, government or company can utilise our technology to
              enhance their systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Paycode DRC Platform Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
              variants={fadeInUp}
            >
              Paycode RDC : Agrégateur de Paiements Agréé
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Paycode RDC fournit une plateforme de paiement partagée et interopérable pour les institutions financières à travers la République démocratique du Congo. Notre mission est de permettre aux banques, IMF, opérateurs de mobile money et autres acteurs financiers de se connecter et de réaliser des transactions de manière fluide via un système unifié.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            <motion.div 
              className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Agrégateur agréé</h3>
              <p className="text-muted-foreground">Agrégateur de paiements pleinement agréé et régulé en RDC</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Multi-Institution</h3>
              <p className="text-muted-foreground">Au service des banques, IMF, opérateurs de mobile money, et plus encore</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Interopérable</h3>
              <p className="text-muted-foreground">Système unifié permettant des transactions fluides et transparentes entre différentes plateformes</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Économique</h3>
              <p className="text-muted-foreground">Réduire les coûts tout en améliorant l’accessibilité et l’efficacité</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seamless Glassmorphism Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paycode-blue/60 via-paycode-blue-light/40 to-paycode-blue/60" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>

        {/* Floating Glass Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-3xl backdrop-blur-lg border border-white/10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-16 w-48 h-48 bg-paycode-blue-light/10 rounded-full backdrop-blur-lg border border-white/10"
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-white/10 to-paycode-blue/10 rounded-2xl backdrop-blur-md border border-white/20"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center"
          >
            {/* Glass Card Container */}
            <motion.div
              variants={fadeInUp}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 md:p-16 shadow-2xl"
            >
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-white mb-8"
                variants={fadeInUp}
              >
                Transformer
                <span className="block bg-gradient-to-r from-black to-paycode-blue-accent bg-clip-text text-transparent">
                  la finance numérique
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12"
                variants={fadeInUp}
              >
                Connecter chaque institution financière à travers la République démocratique du Congo grâce à une technologie sécurisée et interopérable, permettant des transactions fluides et stimulant la croissance économique.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="grid md:grid-cols-3 gap-8"
              >
                <motion.div 
                  variants={fadeInUp}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-white mb-2">110+</div>
                  <div className="text-white/80">Institutions financières</div>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-white mb-2">+ de 2 millions</div>
                  <div className="text-white/80">Utilisateurs actifs</div>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-white/80">Temps de disponibilité du système</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Seamless Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />
      </section>

      {/* Final Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="bg-gradient-to-r from-paycode-blue/10 to-paycode-blue-light/10 rounded-2xl p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Favoriser l’inclusion financière en RDC
            </h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            En tant qu’agrégateur agréé, Paycode RDC propose des solutions de paiement sécurisées, fiables et évolutives qui favorisent l’inclusion financière et l’efficacité. Nous aidons les institutions à réduire leurs coûts, améliorer l’accessibilité et promouvoir l’interopérabilité au sein de l’écosystème croissant de la finance numérique du pays.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
