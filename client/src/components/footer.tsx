import { motion } from "framer-motion";
import { Fingerprint, Linkedin, Twitter } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const solutions = [
    { name: "Identité Numérique", href: "#solutions" },
    { name: "Systèmes de Paiement", href: "#solutions" },
    { name: "Transactions Hors Ligne", href: "#solutions" },
    { name: "Cartes Biométriques", href: "#solutions" },
  ];

  const company = [
    { name: "À Propos", href: "#about" },
    { name: "Études de Cas", href: "#case-studies" },
    { name: "Actualités", href: "#news" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-lg flex items-center justify-center">
                <Fingerprint className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">PAYCODE DRC</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4 max-w-md">
              Agrégateur de paiements agréé fournissant des services financiers interopérables à travers la République démocratique du Congo. Connecter les banques, les IMF et les opérateurs de mobile money.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-paycode-blue-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-paycode-blue-accent transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-gray-400">
              {solutions.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href.replace("#", ""))}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-gray-400">
              {company.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href.replace("#", ""))}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p>
            &copy; 2025 Paycode Fintech Congo. Tous droits réservés. Favoriser l’inclusion financière grâce à des solutions de paiement interopérables.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
