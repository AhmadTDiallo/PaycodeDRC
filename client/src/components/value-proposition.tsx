import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function ValueProposition() {
  return (
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
            <span className="text-paycode-green">proof of life</span> and enable{" "}
            <span className="text-paycode-green">low cost last mile delivery</span>{" "}
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
  );
}
