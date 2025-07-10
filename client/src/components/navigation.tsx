import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Fingerprint } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Account for fixed navbar
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: t("nav.solutions"), href: "solutions" },
    { label: t("nav.about"), href: "about" },
    { label: t("nav.team"), href: "team" },
    { label: t("nav.news"), href: "news" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-xl"
          : "bg-background/90 backdrop-blur-md border-b border-border/30"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection("hero")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
              whileHover={{ rotate: 5 }}
            >
              <Fingerprint className="text-white w-6 h-6" />
            </motion.div>
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-paycode-blue to-paycode-blue-light bg-clip-text text-transparent group-hover:from-paycode-blue-light group-hover:to-paycode-blue transition-all duration-300"
              whileHover={{ y: -1 }}
            >
              PAYCODE DRC
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="relative px-4 py-3 font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
                whileHover={{ y: -1 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <span className="relative z-10">{item.label}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-paycode-blue/10 to-paycode-blue-light/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId={`nav-bg-${item.href}`}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-paycode-blue to-paycode-blue-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                />
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="ml-4 flex items-center space-x-3"
            >
              <LanguageSelector />
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-paycode-blue to-paycode-blue-light hover:from-paycode-blue-light hover:to-paycode-blue text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                size="sm"
              >
                {t("nav.contact")}
              </Button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-paycode-blue/10 transition-colors duration-300"
                  >
                    <Menu className="h-6 w-6 text-muted-foreground" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-lg border-l border-border/50">
                <div className="flex flex-col space-y-2 mt-8">
                  <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-border/30">
                    <div className="w-10 h-10 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-lg flex items-center justify-center">
                      <Fingerprint className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-paycode-blue to-paycode-blue-light bg-clip-text text-transparent">
                      PAYCODE DRC
                    </span>
                  </div>
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left p-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-paycode-blue/10 transition-all duration-300 font-medium text-lg group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="flex items-center">
                        {item.label}
                        <motion.div
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          →
                        </motion.div>
                      </span>
                    </motion.button>
                  ))}
                  <motion.div
                    className="pt-4 space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <LanguageSelector />
                    <Button
                      onClick={() => scrollToSection("contact")}
                      className="w-full bg-gradient-to-r from-paycode-blue to-paycode-blue-light hover:from-paycode-blue-light hover:to-paycode-blue text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {t("nav.contact")}
                    </Button>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
