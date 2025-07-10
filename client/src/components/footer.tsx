import { motion } from "framer-motion";
import { Fingerprint, Linkedin, Twitter } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const solutions = [
    { name: t("solutions.solution1Title"), href: "#solutions" },
    { name: t("solutions.solution2Title"), href: "#solutions" },
    { name: t("solutions.solution3Title"), href: "#solutions" },
    { name: t("solutions.solution4Title"), href: "#solutions" },
  ];

  const company = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.caseStudies"), href: "#case-studies" },
    { name: t("nav.news"), href: "#news" },
    { name: t("nav.contact"), href: "#contact" },
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
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/groups/13176593/"
                target="_blank"
                rel="noopener noreferrer"
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
            <h4 className="text-lg font-semibold mb-4">{t("nav.solutions")}</h4>
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
            <h4 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h4>
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
