import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Awards() {
  const partners = [
    "Citi",
    "IBM",
    "Mastercard",
    "Microsoft",
    "PWC",
    "IMF",
    "Gemalto",
    "Thales",
    "KPMG",
    "SARB",
    "Mondato",
    "Ecobank",
  ];

  return (
    <section className="py-20 bg-paycode-blue">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Une entreprise fintech primée
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto">
            Notre technologie innovante a été reconnue par les principaux acteurs 
            mondiaux de l'industrie, notamment Citi, IBM, Mastercard, Microsoft, PWC, 
            le Fonds monétaire international et bien d'autres.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              variants={fadeInUp}
              className="glass rounded-lg p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-white font-bold text-lg">{partner}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
