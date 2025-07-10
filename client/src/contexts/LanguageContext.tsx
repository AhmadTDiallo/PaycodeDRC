import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.about': 'À propos',
    'nav.solutions': 'Solutions',
    'nav.team': 'Équipe',
    'nav.caseStudies': 'Cas d\'usage',
    'nav.news': 'Actualités',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'Favoriser l\'inclusion financière en RDC',
    'hero.subtitle': 'Solutions de paiement sécurisées',
    'hero.description': 'En tant qu\'agrégateur agréé, Paycode RDC propose des solutions de paiement sécurisées, fiables et évolutives qui favorisent l\'inclusion financière et l\'efficacité. Nous aidons les institutions à réduire leurs coûts, améliorer l\'accessibilité et promouvoir l\'interopérabilité au sein de l\'écosystème croissant de la finance numérique du pays.',
    'hero.contactUs': 'Nous contacter',
    'hero.learnMore': 'En savoir plus',

    // Value Proposition
    'value.mainTitle': 'Nous sommes un Agrégateur de Paiements agréé fournissant des plateformes de paiement interopérables pour les institutions financières. Nous connectons les banques,les IMF et les opérateurs de mobile money grâce à une technologie unifiée.',
    'value.mainDescription': 'Notre technologie prend en charge plusieurs types de données, notamment la biométrie, les données KYC, les données de localisation, les données de santé et bien plus encore. Toute institution financière, banque centrale, gouvernement ou entreprise peut utiliser notre technologie pour améliorer ses systèmes.',
    'value.platformTitle': 'Paycode RDC : Agrégateur de Paiements Agréé',
    'value.platformDescription': 'Paycode RDC fournit une plateforme de paiement partagée et interopérable pour les institutions financières à travers la République démocratique du Congo. Notre mission est de permettre aux banques, IMF, opérateurs de mobile money et autres acteurs financiers de se connecter et de réaliser des transactions de manière fluide via un système unifié.',
    'value.feature1Title': 'Agrégateur agréé',
    'value.feature1Desc': 'Agrégateur de paiements pleinement agréé et régulé en RDC',
    'value.feature2Title': 'Multi-Institution',
    'value.feature2Desc': 'Au service des banques, IMF, opérateurs de mobile money, et plus encore',
    'value.feature3Title': 'Interopérable',
    'value.feature3Desc': 'Système unifié permettant des transactions fluides et transparentes entre différentes plateformes',
    'value.feature4Title': 'Économique',
    'value.feature4Desc': 'Réduire les coûts tout en améliorant l\'accessibilité et l\'efficacité',
    'value.transformTitle': 'Transformer',
    'value.transformSubtitle': 'la finance numérique',
    'value.transformDescription': 'Connecter chaque institution financière à travers la République démocratique du Congo grâce à une technologie sécurisée et interopérable, permettant des transactions fluides et stimulant la croissance économique.',
    'value.stat1': '110+',
    'value.stat1Label': 'Institutions financières',
    'value.stat2': '+ de 2 millions',
    'value.stat2Label': 'Utilisateurs actifs',
    'value.stat3': '99.9%',
    'value.stat3Label': 'Temps de disponibilité du système',
    'value.inclusionTitle': 'Favoriser l\'inclusion financière en RDC',
    'value.inclusionDescription': 'En tant qu\'agrégateur agréé, Paycode RDC propose des solutions de paiement sécurisées, fiables et évolutives qui favorisent l\'inclusion financière et l\'efficacité. Nous aidons les institutions à réduire leurs coûts, améliorer l\'accessibilité et promouvoir l\'interopérabilité au sein de l\'écosystème croissant de la finance numérique du pays.',

    // Solutions
    'solutions.title': 'Nos Solutions',
    'solutions.subtitle': 'Technologies avancées pour l\'infrastructure financière moderne',
    'solutions.switchTitle': 'Switch Financier',
    'solutions.switchDesc': 'Le switch financier de Paycode agit comme le hub transactionnel qui route et autorise les paiements à travers plusieurs institutions financières et canaux. Il est conforme PCI-DSS et s\'intègre parfaitement avec les cartes hybrides EMV/Edapt, les terminaux POS, les portefeuilles mobiles, les GAB et les systèmes bancaires centraux.',
    'solutions.tmsTitle': 'TMS (Système de Gestion de Terminaux)',
    'solutions.tmsDesc': 'Le TMS de Paycode gère à distance tous les terminaux POS à travers les réseaux, gérant les mises à jour logicielles, la surveillance de l\'état des appareils, les configurations de paramètres et l\'inscription biométrique. Il assure la sécurité, la disponibilité et le contrôle efficace de millions d\'appareils sur le terrain.',
    'solutions.cbsTitle': 'CBS (Systèmes Bancaires Centraux)',
    'solutions.cbsDesc': 'Intégré avec des solutions leaders comme Temenos, le CBS de Paycode prend en charge les opérations bancaires complètes incluant la création de comptes, la gestion du grand livre, l\'origination de prêts, les dépôts, les retraits. Le système est modulaire, prêt pour le cloud et évolutif pour les IMF, coopératives et banques entièrement numériques.',
    'solutions.erpTitle': 'Intégration ERP',
    'solutions.erpDesc': 'Paycode permet des rapports financiers et opérationnels robustes en reliant ses systèmes centraux aux ERP de niveau entreprise comme Priority Software. Cela prend en charge la conformité, les pistes d\'audit, l\'intégration de la paie RH et la planification des ressources, particulièrement pour les clients gouvernementaux et institutionnels.',

    // Team
    'team.title': 'Notre équipe de direction',
    'team.subtitle': 'Des dirigeants expérimentés qui favorisent l\'inclusion financière dans le monde entier',
    'team.lwangoPosition': 'Président-Directeur Général',
    'team.lwangoDesc': 'Fort de plus de dix ans d\'expérience dans les affaires et le leadership, il possède une solide expertise en stratégie, en opérations et en croissance. En tant que Président Directeur Général de Paycode Fintech Congo, il dirige les efforts visant à étendre les solutions de paiement numérique et à promouvoir l\'inclusion financière dans la région. Reconnu pour sa capacité à faire évoluer les entreprises et à établir des partenariats solides, il allie innovation et exécution pour générer un impact durable. Son leadership continue de positionner Paycode comme un acteur clé du paysage fintech en Afrique.',
    'team.sadioPosition': 'Directeur Général',
    'team.sadioDesc': 'Directeur Général de Paycode Fintech Congo, spécialisée dans les technologies financières pour l\'inclusion en RDC. Avec plus de 10 ans d\'expérience en digitalisation des services financiers, il dirige le déploiement de solutions de core banking, de paiements et de dispositifs biométriques pour les IMF et COOPEC. À travers Paycode, il œuvre à élargir l\'accès aux services financiers pour les populations mal desservies.',
    'team.dominiquePosition': 'Directeur des Opérations',
    'team.dominiqueDesc': 'Expert en intégration technologique, il dirige actuellement le projet Transforme, consacré à la digitalisation des IMF et des COOPEC en République Démocratique du Congo. Ancien cadre du secteur bancaire, il possède plus de 10 ans d\'expérience dans la gestion des institutions financières et plus de 7 ans dans le domaine des systèmes de paiement et des plateformes de switch. Grâce à cette double expertise, il œuvre à moderniser l\'écosystème financier et à promouvoir l\'inclusion numérique et financière.',

    // Case Studies
    'caseStudies.title': 'Histoires de succès',
    'caseStudies.subtitle': 'Impact réel à travers l\'Afrique et au-delà',
    'caseStudies.ghana.title': 'Système de paiement national',
    'caseStudies.ghana.desc': 'La Banque du Ghana a sélectionné la technologie EDAPT de Paycode pour fournir une solution clé en main pour un système national de commutation et de règlement des paiements.',
    'caseStudies.afghanistan.title': 'Transactions financières numériques',
    'caseStudies.afghanistan.desc': 'Afghanistan International Bank a mis en œuvre la technologie d\'identité numérique biométrique et de paiements de Paycode pour numériser les transactions financières pour les donateurs, ONG et entreprises.',
    'caseStudies.drc.title': 'Collecte de taxes pour motocyclistes',
    'caseStudies.drc.desc': 'Émission de cartes d\'identité biométriques et collecte de taxes pour 20 000 motocyclistes-taxis de l\'ANMC dans 8 villes à travers la RDC pour le ministère des Transports.',
    'caseStudies.viewCase': 'Voir l\'étude de cas',

    // News
    'news.title': 'Actualités et événements',
    'news.subtitle': 'Restez informé de nos dernières nouvelles et développements',
    'news.readMore': 'Lire la suite',

    // Statistics
    'stats.title': 'L\'impact de Paycode RDC en chiffres',
    'stats.subtitle': 'Des résultats mesurables qui favorisent l\'inclusion financière',
    'stats.institutions': 'Institutions financières connectées',
    'stats.transactions': 'Transactions traitées par mois',
    'stats.uptime': 'Temps de disponibilité du système',
    'stats.countries': 'Pays desservis',
    'stats.globalTitle': 'Impact mondial',
    'stats.globalSubtitle': 'Faire tomber les obstacles à l\'inclusion financière dans le monde entier',
    'stats.unidentified': '1.0B+',
    'stats.unidentifiedLabel': 'Personnes sans identité formelle',
    'stats.noConnectivity': '3.7B+',
    'stats.noConnectivityLabel': 'Personnes sans connectivité',
    'stats.unbanked': '1.7B+',
    'stats.unbankedLabel': 'Les gens ne sont toujours pas bancarisés',

    // Awards
    'awards.title': 'Reconnaissance et récompenses',
    'awards.subtitle': 'Récompensé pour notre excellence dans la technologie financière',
    'awards.fintechTitle': 'Une entreprise fintech primée',
    'awards.fintechDesc': 'Reconnu par les leaders de l\'industrie',

    // Contact
    'contact.title': 'Prêt à transformer l\'inclusion financière ?',
    'contact.subtitle': 'Partenaire avec Paycode RDC pour accéder à notre plateforme de paiement interopérable et connecter votre institution financière à l\'écosystème plus large de la RDC.',
    'contact.demoTitle': 'Réserver une démo',
    'contact.demoSubtitle': 'Voir notre technologie en action',
    'contact.newsletterTitle': 'Restez informé',
    'contact.newsletterSubtitle': 'Recevez nos dernières nouvelles et mises à jour',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email',
    'contact.form.company': 'Entreprise',
    'contact.form.phone': 'Téléphone',
    'contact.form.message': 'Message',
    'contact.form.requestDemo': 'Demander une démo',
    'contact.form.subscribe': 'S\'abonner',
    'contact.success.demo': 'Demande de démo soumise avec succès!',
    'contact.success.newsletter': 'Abonnement réussi à la newsletter!',
    'contact.error.demo': 'Erreur lors de la soumission de la demande de démo',
    'contact.error.newsletter': 'Erreur lors de l\'abonnement à la newsletter',

    // Footer
    'footer.description': 'Agrégateur de paiements agréé fournissant des plateformes de paiement interopérables pour les institutions financières en République démocratique du Congo.',
    'footer.quickLinks': 'Liens rapides',
    'footer.contact': 'Contact',
    'footer.followUs': 'Suivez-nous',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.solutions': 'Solutions',
    'nav.team': 'Team',
    'nav.caseStudies': 'Case Studies',
    'nav.news': 'News',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title': 'Promoting financial inclusion in DRC',
    'hero.subtitle': 'Secure payment solutions',
    'hero.description': 'As a licensed aggregator, Paycode DRC provides secure, reliable and scalable payment solutions that promote financial inclusion and efficiency. We help institutions reduce their costs, improve accessibility and promote interoperability within the country\'s growing digital finance ecosystem.',
    'hero.contactUs': 'Contact Us',
    'hero.learnMore': 'Learn More',

    // Value Proposition
    'value.mainTitle': 'We are a Licensed Payment Aggregator providing interoperable payment platforms for financial institutions. We connect banks, MFIs, and mobile money operators through unified technology.',
    'value.mainDescription': 'Our technology supports multiple data types including biometrics, KYC data, location data, health data, and much more. Any financial institution, central bank, government, or enterprise can use our technology to enhance their systems.',
    'value.platformTitle': 'Paycode DRC: Licensed Payment Aggregator',
    'value.platformDescription': 'Paycode DRC provides a shared and interoperable payment platform for financial institutions across the Democratic Republic of Congo. Our mission is to enable banks, MFIs, mobile money operators, and other financial actors to connect and transact seamlessly through a unified system.',
    'value.feature1Title': 'Licensed Aggregator',
    'value.feature1Desc': 'Fully licensed and regulated payment aggregator in DRC',
    'value.feature2Title': 'Multi-Institution',
    'value.feature2Desc': 'Serving banks, MFIs, mobile money operators, and more',
    'value.feature3Title': 'Interoperable',
    'value.feature3Desc': 'Unified system enabling seamless and transparent transactions across different platforms',
    'value.feature4Title': 'Cost-Effective',
    'value.feature4Desc': 'Reducing costs while improving accessibility and efficiency',
    'value.transformTitle': 'Transform',
    'value.transformSubtitle': 'digital finance',
    'value.transformDescription': 'Connecting every financial institution across the Democratic Republic of Congo through secure and interoperable technology, enabling seamless transactions and driving economic growth.',
    'value.stat1': '110+',
    'value.stat1Label': 'Financial institutions',
    'value.stat2': '2+ million',
    'value.stat2Label': 'Active users',
    'value.stat3': '99.9%',
    'value.stat3Label': 'System uptime',
    'value.inclusionTitle': 'Fostering financial inclusion in DRC',
    'value.inclusionDescription': 'As a licensed aggregator, Paycode DRC offers secure, reliable, and scalable payment solutions that promote financial inclusion and efficiency. We help institutions reduce costs, improve accessibility, and promote interoperability within the country\'s growing digital finance ecosystem.',



    // Solutions
    'solutions.title': 'Our Solutions',
    'solutions.subtitle': 'Advanced technology for modern financial infrastructure',
    'solutions.switchTitle': 'Financial Switch',
    'solutions.switchDesc': 'Paycode\'s financial switch acts as the transaction hub that routes and authorizes payments across multiple financial institutions and channels. It is PCI-DSS compliant and integrates seamlessly with EMV/Edapt hybrid cards, POS terminals, mobile wallets, ATMs, and core banking systems.',
    'solutions.tmsTitle': 'TMS (Terminal Management System)',
    'solutions.tmsDesc': 'Paycode\'s TMS remotely manages all POS terminals across networks, handling software updates, device health monitoring, parameter configurations and biometric enrollment. It ensures security, uptime, and efficient control over millions of devices in the field.',
    'solutions.cbsTitle': 'CBS (Core Banking Systems)',
    'solutions.cbsDesc': 'Integrated with leading solutions like Temenos, Paycode\'s CBS supports full banking operations including account creation, ledger management, loan origination, deposits, withdrawals. The system is modular, cloud ready, and scalable for MFIs, cooperatives and digital-only banks.',
    'solutions.erpTitle': 'ERP Integration',
    'solutions.erpDesc': 'Paycode enables robust financial and operational reporting by linking its core systems to enterprise-grade ERPs like Priority Software. This supports compliance, audit trails, HR payroll integration, and resource planning, particularly for government and institutional clients.',

    // Team
    'team.title': 'Our Leadership Team',
    'team.subtitle': 'Experienced leaders driving financial inclusion worldwide',
    'team.lwango.name': 'Lwango Wavo',
    'team.lwango.title': 'Chief Executive Officer',
    'team.lwango.bio': 'With over ten years of experience in business and leadership, he possesses solid expertise in strategy, operations, and growth. As Chief Executive Officer of Paycode Fintech Congo, he leads efforts to expand digital payment solutions and promote financial inclusion in the region. Recognized for his ability to scale businesses and establish strong partnerships, he combines innovation and execution to generate lasting impact. His leadership continues to position Paycode as a key player in Africa\'s fintech landscape.',
    
    'team.sadio.name': 'Sadio Diallo',
    'team.sadio.title': 'General Manager',
    'team.sadio.bio': 'General Manager of Paycode Fintech Congo, specialized in financial technologies for inclusion in DRC. With over 10 years of experience in digitalizing financial services, he leads the deployment of core banking, payment, and biometric device solutions for MFIs and COOPECs. Through Paycode, he works to expand access to financial services for underserved populations.',
    
    'team.dominique.name': 'Dominique Kaba',
    'team.dominique.title': 'Operations Director',
    'team.dominique.bio': 'Expert in technological integration, he currently leads the Transform project, dedicated to the digitalization of MFIs and COOPECs in the Democratic Republic of Congo. Former banking sector executive, he has over 10 years of experience in financial institution management and over 7 years in payment systems and switch platforms. Through this dual expertise, he works to modernize the financial ecosystem and promote digital and financial inclusion.',
    'team.lwangoPosition': 'Chief Executive Officer',
    'team.lwangoDesc': 'With over ten years of experience in business and leadership, he possesses solid expertise in strategy, operations, and growth. As Chief Executive Officer of Paycode Fintech Congo, he leads efforts to expand digital payment solutions and promote financial inclusion in the region. Recognized for his ability to scale businesses and establish strong partnerships, he combines innovation and execution to generate lasting impact. His leadership continues to position Paycode as a key player in Africa\'s fintech landscape.',
    'team.sadioPosition': 'General Manager',
    'team.sadioDesc': 'General Manager of Paycode Fintech Congo, specialized in financial technologies for inclusion in DRC. With over 10 years of experience in digitalizing financial services, he leads the deployment of core banking, payment, and biometric device solutions for MFIs and COOPECs. Through Paycode, he works to expand access to financial services for underserved populations.',
    'team.dominiquePosition': 'Operations Director',
    'team.dominiqueDesc': 'Expert in technological integration, he currently leads the Transform project, dedicated to the digitalization of MFIs and COOPECs in the Democratic Republic of Congo. Former banking sector executive, he has over 10 years of experience in financial institution management and over 7 years in payment systems and switch platforms. Through this dual expertise, he works to modernize the financial ecosystem and promote digital and financial inclusion.',

    // Case Studies
    'caseStudies.title': 'Success Stories',
    'caseStudies.subtitle': 'Real impact across Africa and beyond',
    'caseStudies.ghana.title': 'National Payment System',
    'caseStudies.ghana.desc': 'Bank of Ghana selected Paycode\'s EDAPT technology to provide a turnkey solution for a national payment switching and settlement system.',
    'caseStudies.afghanistan.title': 'Digital Financial Transactions',
    'caseStudies.afghanistan.desc': 'Afghanistan International Bank implemented Paycode\'s biometric digital identity and payment technology to digitize financial transactions for donors, NGOs, and businesses.',
    'caseStudies.drc.title': 'Motorcycle Tax Collection',
    'caseStudies.drc.desc': 'Issuance of biometric identity cards and tax collection for 20,000 ANMC motorcycle taxi drivers in 8 cities across DRC for the Ministry of Transport.',
    'caseStudies.viewCase': 'View case study',

    // News
    'news.title': 'Latest News',
    'news.subtitle': 'Stay informed about the latest news from Paycode and Paycode Fintech Congo',
    'news.readMore': 'Read more',

    // Statistics
    'stats.title': 'Paycode DRC\'s Impact in Numbers',
    'stats.subtitle': 'Measurable results driving financial inclusion',
    'stats.institutions': 'Connected financial institutions',
    'stats.transactions': 'Transactions processed monthly',
    'stats.uptime': 'System uptime',
    'stats.countries': 'Countries served',
    'stats.globalTitle': 'Global Impact',
    'stats.globalSubtitle': 'Breaking down barriers to financial inclusion worldwide',
    'stats.unidentified': '1.0B+',
    'stats.unidentifiedLabel': 'People without formal identity',
    'stats.noConnectivity': '3.7B+',
    'stats.noConnectivityLabel': 'People without connectivity',
    'stats.unbanked': '1.7B+',
    'stats.unbankedLabel': 'People still unbanked',

    // Awards
    'awards.title': 'Recognition and Awards',
    'awards.subtitle': 'Awarded for our excellence in financial technology',
    'awards.fintechTitle': 'An Award-Winning Fintech Company',
    'awards.fintechDesc': 'Recognized by industry leaders',

    // Contact
    'contact.title': 'Ready to transform financial inclusion?',
    'contact.subtitle': 'Partner with Paycode DRC to access our interoperable payment platform and connect your financial institution to DRC\'s broader ecosystem.',
    'contact.demoTitle': 'Book a Demo',
    'contact.demoSubtitle': 'See our technology in action',
    'contact.newsletterTitle': 'Stay Informed',
    'contact.newsletterSubtitle': 'Receive our latest news and updates',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company',
    'contact.form.phone': 'Phone',
    'contact.form.message': 'Message',
    'contact.form.requestDemo': 'Request Demo',
    'contact.form.subscribe': 'Subscribe',
    'contact.success.demo': 'Demo request submitted successfully!',
    'contact.success.newsletter': 'Successfully subscribed to newsletter!',
    'contact.error.demo': 'Error submitting demo request',
    'contact.error.newsletter': 'Error subscribing to newsletter',

    // Footer
    'footer.description': 'Licensed payment aggregator providing interoperable payment platforms for financial institutions in the Democratic Republic of Congo.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};