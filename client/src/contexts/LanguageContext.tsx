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
    'hero.title': 'PAYCODE FINTECH CONGO',
    'hero.subtitle': 'Agrégateur de Paiements de Confiance pour des Écosystèmes Interopérables',
    'hero.contactUs': 'Contactez Nous',
    'hero.learnMore': 'En Savoir Plus',

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

    // Financial Switch Popup (French)
    'solutions.popup.title': 'Switch Financier - Aperçu Détaillé',
    'solutions.popup.architecture': 'Architecture de Routage des Paiements',
    'solutions.popup.overview': 'Aperçu',
    'solutions.popup.description': 'Le switch financier de Paycode agit comme un hub de transaction centralisé, routant et autorisant intelligemment les paiements à travers diverses institutions financières et canaux de paiement. Conçu pour l\'évolutivité, la vitesse et la conformité, il assure un traitement de transaction sécurisé et en temps réel à travers l\'écosystème. Le switch est entièrement conforme PCI-DSS, supportant les cartes hybrides EMV/Edapt, terminaux POS, portefeuilles mobiles, DAB et systèmes bancaires centraux avec facilité.',
    'solutions.popup.keyFeatures': 'Caractéristiques Clés',
    'solutions.popup.feature1': 'Conforme PCI-DSS – Assure des standards de sécurité élevés pour la protection des données de cartes.',
    'solutions.popup.feature2': 'Intégration EMV/Edapt – Fonctionnement transparent avec cartes à puce et cartes intelligentes biométriques.',
    'solutions.popup.feature3': 'Support Multi-Canal – Connecte les paiements à travers POS, mobile, DAB et plateformes web.',
    'solutions.popup.feature4': 'Autorisation Temps Réel – Vérification et traitement instantané des transactions.',
    'solutions.popup.feature5': 'Support ISO 8583 & ISO 20022 – Compatible avec les protocoles de messagerie financière standards.',
    'solutions.popup.feature6': 'Architecture Haute Disponibilité – Construite pour la redondance, basculement et disponibilité 24/7.',
    'solutions.popup.feature7': 'Moteur de Routage Dynamique – Routage intelligent basé sur le coût, statut réseau ou préférence émetteur.',
    'solutions.popup.feature8': 'Détection Fraude & Gestion Risque – Détection d\'anomalies temps réel et notation de risque basée sur règles.',
    'solutions.popup.feature9': 'Design Évolutif & Modulaire – S\'intègre facilement avec nouveaux partenaires ou services selon croissance écosystème.',
    'solutions.popup.feature10': 'Audit & Journalisation – Journaux de transaction détaillés et pistes d\'audit pour conformité et dépannage.',

    // TMS Popup (French)
    'solutions.tms.popup.title': 'TMS - Système de Gestion de Terminaux',
    'solutions.tms.popup.overview': 'Aperçu',
    'solutions.tms.popup.description': 'Le Système de Gestion de Terminaux (TMS) de Paycode fournit un contrôle centralisé, sécurisé et évolutif sur tous les terminaux POS déployés dans des environnements divers et distants. Le système permet l\'approvisionnement distant, la surveillance en temps réel, l\'inscription biométrique et les mises à jour automatiques de logiciels/micrologiciels, garantissant que les terminaux sont toujours conformes, opérationnels et sécurisés. Conçu pour supporter les déploiements à grande échelle, le TMS de Paycode peut gérer des millions d\'appareils avec une intervention humaine minimale.',
    'solutions.tms.popup.keyFeatures': 'Caractéristiques Clés',
    'solutions.tms.popup.feature1': 'Gestion d\'Appareils Distants – Configurer, mettre à jour et dépanner les terminaux sans accès physique.',
    'solutions.tms.popup.feature2': 'Surveillance Temps Réel – Suivre l\'état des terminaux, disponibilité, santé batterie, connectivité réseau et métriques d\'usage.',
    'solutions.tms.popup.feature3': 'Inscription & Sync Biométrique – Inscrire les utilisateurs sur site et synchroniser les données biométriques avec les systèmes backend de manière sécurisée.',
    'solutions.tms.popup.feature4': 'Mises à Jour OTA (Over-the-Air) – Pousser efficacement les micrologiciels, correctifs logiciels et mises à jour de sécurité.',
    'solutions.tms.popup.feature5': 'Distribution Sécurisée de Paramètres – Gérer et déployer des données sensibles comme clés de chiffrement, paramètres EMV et certificats.',
    'solutions.tms.popup.feature6': 'Support Multi-Vendeur – Compatible avec diverses marques de terminaux et systèmes d\'exploitation (Android, basé Linux, etc.).',
    'solutions.tms.popup.feature7': 'Suivi Géolocalisation – Voir l\'emplacement temps réel des terminaux pour logistique et prévention fraude.',
    'solutions.tms.popup.feature8': 'Détection Sabotage & Alertes – Recevoir alertes instantanées sur tout sabotage ou tentatives d\'accès non autorisées.',
    'solutions.tms.popup.feature9': 'Infrastructure Évolutive – Construite pour supporter déploiements urbains et ruraux avec optimisation bande passante faible.',

    // CBS Popup (French)
    'solutions.cbs.popup.title': 'CBS - Systèmes Bancaires Centraux',
    'solutions.cbs.popup.overview': 'Aperçu',
    'solutions.cbs.popup.description': 'Intégré avec des plateformes leaders comme Temenos, le Système Bancaire Central (CBS) de Paycode supporte les opérations bancaires de bout en bout incluant la création de comptes, gestion du grand livre, origination de prêts, dépôts et retraits. Conçu pour les institutions de microfinance (IMF), coopératives et banques entièrement numériques, le système est modulaire, prêt pour le cloud et évolutif—capable de servir des millions d\'utilisateurs avec haute performance et fiabilité.',
    'solutions.cbs.popup.keyFeatures': 'Caractéristiques Clés',
    'solutions.cbs.popup.feature1': 'Intégration Temenos – Interopère parfaitement avec les plateformes bancaires centrales leaders de l\'industrie.',
    'solutions.cbs.popup.feature2': 'Opérations Bancaires Complètes – Supporte l\'embarquement clients, épargne, crédit, prêts et gestion grand livre.',
    'solutions.cbs.popup.feature3': 'Prêt pour le Cloud – Facilement déployable sur infrastructures cloud publiques ou privées pour mise à l\'échelle rentable.',
    'solutions.cbs.popup.feature4': 'Architecture Évolutive – Supporte volumes de transactions croissants et bases clients sans perte de performance.',
    'solutions.cbs.popup.feature5': 'Support Multi-Devise & Multi-Langue – Idéal pour environnements bancaires transfrontaliers et multilingues.',
    'solutions.cbs.popup.feature6': 'Traitement Transaction Temps Réel – Comptabilisation instantanée des transactions et mises à jour comptes.',
    'solutions.cbs.popup.feature7': 'Design API-First – Permet intégration rapide avec apps mobiles, plateformes fintech et services tiers.',
    'solutions.cbs.popup.feature8': 'Workflows Prêts Automatisés – Rationalise demande prêt, approbation, décaissement et suivi remboursement.',
    'solutions.cbs.popup.feature9': 'Connectivité Interbancaire & Switch – Se connecte avec switches nationaux, passerelles paiement et schémas cartes.',
    'solutions.cbs.popup.feature10': 'Sécurisé & Conforme – Aligné avec standards réglementaires internationaux pour finance numérique.',

    // ERP Popup (French)
    'solutions.erp.popup.title': 'Intégration ERP',
    'solutions.erp.popup.overview': 'Aperçu',
    'solutions.erp.popup.description': 'Paycode permet une supervision financière et opérationnelle robuste en intégrant ses plateformes centrales avec des systèmes ERP de niveau entreprise tels que Priority Software. Cette connexion rationalise la conformité, assure des pistes d\'audit traçables et permet des fonctions transparentes de RH, paie et planification des ressources. Conçue pour répondre aux exigences des gouvernements, ONG et grandes institutions, cette intégration assure un flux de données en temps réel entre les opérations de terrain et les systèmes centralisés.',
    'solutions.erp.popup.keyFeatures': 'Caractéristiques Clés',
    'solutions.erp.popup.feature1': 'Intégration Priority Software – Se connecte avec l\'une des plateformes ERP leaders pour le contrôle financier et opérationnel.',
    'solutions.erp.popup.feature2': 'Conformité & Audit – Supporte transactions traçables et vérifiables pour rapports réglementaires et bailleurs.',
    'solutions.erp.popup.feature3': 'Intégration RH & Paie – Lie données d\'inscription biométrique et présence avec traitement paie.',
    'solutions.erp.popup.feature4': 'Planification Ressources – Permet prévision, budgétisation et allocation des ressources financières et humaines.',
    'solutions.erp.popup.feature5': 'Synchronisation Temps Réel – Assure données cohérentes entre systèmes terrain et tableaux de bord ERP.',
    'solutions.erp.popup.feature6': 'Workflows Personnalisables – Adaptés aux structures organisationnelles et besoins sectoriels spécifiques.',
    'solutions.erp.popup.feature7': 'Support Multi-Départements – Facilite opérations à travers finance, RH, approvisionnement et logistique.',
    'solutions.erp.popup.feature8': 'Déploiement Cloud ou Sur Site – Modèles de déploiement flexibles pour s\'adapter à l\'infrastructure d\'entreprise.',
    'solutions.erp.popup.feature9': 'Sécurité Données & Chiffrement – Assure protection bout en bout des données financières et personnelles sensibles.',

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
    'hero.title': 'PAYCODE FINTECH CONGO',
    'hero.subtitle': 'Trusted Payment Aggregator for Interoperable Ecosystems',
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

    // Financial Switch Popup (English)
    'solutions.popup.title': 'Financial Switch - Detailed Overview',
    'solutions.popup.architecture': 'Payment Routing Architecture',
    'solutions.popup.overview': 'Overview',
    'solutions.popup.description': 'Paycode\'s financial switch acts as a centralized transaction hub, intelligently routing and authorizing payments across diverse financial institutions and payment channels. Designed for scalability, speed, and compliance, it ensures secure, real-time transaction processing across the ecosystem. The switch is fully PCI-DSS compliant, supporting EMV/Edapt hybrid cards, POS terminals, mobile wallets, ATMs, and core banking systems with ease.',
    'solutions.popup.keyFeatures': 'Key Features',
    'solutions.popup.feature1': 'PCI-DSS Compliant – Ensures high-level security standards for cardholder data protection.',
    'solutions.popup.feature2': 'EMV/Edapt Integration – Seamless operation with chip-enabled and biometric-enabled smart cards.',
    'solutions.popup.feature3': 'Multi-Channel Support – Connects payments across POS, mobile, ATM, and web-based platforms.',
    'solutions.popup.feature4': 'Real-Time Authorization – Instant verification and processing of transactions.',
    'solutions.popup.feature5': 'ISO 8583 & ISO 20022 Support – Compatible with standard financial messaging protocols.',
    'solutions.popup.feature6': 'High Availability Architecture – Built for redundancy, failover, and 24/7 uptime.',
    'solutions.popup.feature7': 'Dynamic Routing Engine – Intelligent routing based on cost, network status, or issuer preference.',
    'solutions.popup.feature8': 'Fraud Detection & Risk Management – Real-time anomaly detection and rules-based risk scoring.',
    'solutions.popup.feature9': 'Scalable & Modular Design – Easily integrates with new partners or services as the ecosystem grows.',
    'solutions.popup.feature10': 'Audit & Logging – Detailed transaction logs and audit trails to support compliance and troubleshooting.',

    // TMS Popup (English)
    'solutions.tms.popup.title': 'TMS - Terminal Management System',
    'solutions.tms.popup.overview': 'Overview',
    'solutions.tms.popup.description': 'Paycode\'s Terminal Management System (TMS) provides centralized, secure, and scalable control over all POS terminals deployed across diverse and remote environments. The system enables remote provisioning, real-time monitoring, biometric enrollment, and automated software/firmware updates, ensuring terminals are always compliant, operational, and secure. Designed to support large-scale deployments, Paycode\'s TMS can manage millions of devices with minimal human intervention.',
    'solutions.tms.popup.keyFeatures': 'Key Features',
    'solutions.tms.popup.feature1': 'Remote Device Management – Configure, update, and troubleshoot terminals without physical access.',
    'solutions.tms.popup.feature2': 'Real-Time Monitoring – Track terminal status, uptime, battery health, network connectivity, and usage metrics.',
    'solutions.tms.popup.feature3': 'Biometric Enrollment & Sync – Enroll users on-site and sync biometric data with backend systems securely.',
    'solutions.tms.popup.feature4': 'Over-the-Air (OTA) Updates – Push firmware, software patches, and security updates efficiently.',
    'solutions.tms.popup.feature5': 'Secure Parameter Distribution – Manage and deploy sensitive data such as encryption keys, EMV parameters, and certificates.',
    'solutions.tms.popup.feature6': 'Multi-Vendor Support – Compatible with various terminal brands and operating systems (Android, Linux-based, etc.).',
    'solutions.tms.popup.feature7': 'Geolocation Tracking – View real-time location of terminals for logistics and fraud prevention.',
    'solutions.tms.popup.feature8': 'Tamper Detection & Alerts – Receive instant alerts on any tampering or unauthorized access attempts.',
    'solutions.tms.popup.feature9': 'Scalable Infrastructure – Built to support both urban and rural deployments with low-bandwidth optimization.',

    // CBS Popup (English)
    'solutions.cbs.popup.title': 'CBS - Core Banking System',
    'solutions.cbs.popup.overview': 'Overview',
    'solutions.cbs.popup.description': 'Integrated with leading platforms like Temenos, Paycode\'s Core Banking System (CBS) supports end-to-end banking operations including account creation, ledger management, loan origination, deposits, and withdrawals. Designed for microfinance institutions (MFIs), cooperatives, and digital-only banks, the system is modular, cloud-ready, and scalable—capable of serving millions of users with high performance and reliability.',
    'solutions.cbs.popup.keyFeatures': 'Key Features',
    'solutions.cbs.popup.feature1': 'Temenos Integration – Seamlessly interoperates with industry-leading core banking platforms.',
    'solutions.cbs.popup.feature2': 'Full Banking Operations – Supports customer onboarding, savings, credit, loans, and general ledger management.',
    'solutions.cbs.popup.feature3': 'Cloud Ready – Easily deployable on public or private cloud infrastructures for cost-effective scaling.',
    'solutions.cbs.popup.feature4': 'Scalable Architecture – Supports growing transaction volumes and customer bases without performance loss.',
    'solutions.cbs.popup.feature5': 'Multi-Currency & Multi-Language Support – Ideal for cross-border and multilingual banking environments.',
    'solutions.cbs.popup.feature6': 'Real-Time Transaction Processing – Instant posting of transactions and account updates.',
    'solutions.cbs.popup.feature7': 'API-First Design – Enables rapid integration with mobile apps, fintech platforms, and third-party services.',
    'solutions.cbs.popup.feature8': 'Automated Loan Workflows – Streamlines loan application, approval, disbursement, and repayment tracking.',
    'solutions.cbs.popup.feature9': 'Interbank & Switch Connectivity – Connects with national switches, payment gateways, and card schemes.',
    'solutions.cbs.popup.feature10': 'Secure & Compliant – Aligned with international regulatory standards for digital finance.',

    // ERP Popup (English)
    'solutions.erp.popup.title': 'ERP Integration',
    'solutions.erp.popup.overview': 'Overview',
    'solutions.erp.popup.description': 'Paycode enables robust financial and operational oversight by integrating its core platforms with enterprise-grade ERP systems such as Priority Software. This connection streamlines compliance, ensures traceable audit trails, and enables seamless HR, payroll, and resource planning functions. Designed to meet the demands of governments, NGOs, and large institutions, this integration ensures real-time data flow between field operations and centralized systems.',
    'solutions.erp.popup.keyFeatures': 'Key Features',
    'solutions.erp.popup.feature1': 'Priority Software Integration – Connects with one of the leading ERP platforms for financial and operational control.',
    'solutions.erp.popup.feature2': 'Compliance & Audit – Supports traceable, verifiable transactions for regulatory and donor reporting.',
    'solutions.erp.popup.feature3': 'HR & Payroll Integration – Links biometric enrollment and attendance data with payroll processing.',
    'solutions.erp.popup.feature4': 'Resource Planning – Enables forecasting, budgeting, and allocation of financial and human resources.',
    'solutions.erp.popup.feature5': 'Real-Time Sync – Ensures consistent data across field systems and ERP dashboards.',
    'solutions.erp.popup.feature6': 'Customizable Workflows – Tailored to meet organizational structures and sector-specific needs.',
    'solutions.erp.popup.feature7': 'Multi-Department Support – Facilitates operations across finance, HR, procurement, and logistics.',
    'solutions.erp.popup.feature8': 'Cloud or On-Prem Deployment – Flexible deployment models to fit enterprise infrastructure.',
    'solutions.erp.popup.feature9': 'Data Security & Encryption – Ensures sensitive financial and personnel data is protected end-to-end.',

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
    'team.dominiquePosition': 'Chief Operating Officer',
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