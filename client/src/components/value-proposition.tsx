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
              We provide biometric digital identity to guarantee{" "}
              <span className="text-paycode-blue-accent">proof of life</span> and enable{" "}
              <span className="text-paycode-blue-accent">low cost last mile delivery</span>{" "}
              of basic financial services.
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
              Paycode DRC: Licensed Payment Aggregator
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Paycode DRC provides a shared, interoperable payment platform for Financial Institutions across the Democratic Republic of Congo. Our mission is to enable banks, MFIs, mobile money operators, and other financial players to seamlessly connect and transact through a unified system.
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
              <h3 className="text-xl font-semibold text-foreground mb-2">Licensed Aggregator</h3>
              <p className="text-muted-foreground">Fully licensed and regulated payment aggregator in DRC</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Multi-Institution</h3>
              <p className="text-muted-foreground">Serving banks, MFIs, mobile money operators, and more</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Interoperable</h3>
              <p className="text-muted-foreground">Unified system enabling seamless cross-platform transactions</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Cost Efficient</h3>
              <p className="text-muted-foreground">Reducing costs while improving accessibility and efficiency</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="bg-gradient-to-r from-paycode-blue/10 to-paycode-blue-light/10 rounded-2xl p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Driving Financial Inclusion in DRC
            </h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              As a licensed aggregator, Paycode DRC offers secure, reliable, and scalable payment solutions that drive financial inclusion and efficiency. We help institutions reduce costs, improve accessibility, and promote interoperability within the country's growing digital finance ecosystem.
            </p>
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
              backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80')`
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
                Transforming
                <span className="block bg-gradient-to-r from-white to-paycode-blue-accent bg-clip-text text-transparent">
                  Digital Finance
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12"
                variants={fadeInUp}
              >
                Connecting every financial institution across the Democratic Republic of Congo through secure, interoperable technology that enables seamless transactions and drives economic growth.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="grid md:grid-cols-3 gap-8"
              >
                <motion.div 
                  variants={fadeInUp}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-white/80">Financial Institutions</div>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-white mb-2">1M+</div>
                  <div className="text-white/80">Active Users</div>
                </motion.div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-white/80">System Uptime</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Seamless Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />
      </section>
    </>
  );
}
