import { db } from "./db";
import { questionnaireModules, questionnaireQuestions } from "@shared/schema";

const modules = [
  {
    name: "Core Banking Systems",
    nameFr: "Systèmes Bancaires Centraux",
    description: "Core banking platform requirements and integration needs",
    descriptionFr: "Exigences de plateforme bancaire centrale et besoins d'intégration",
    icon: "Building",
    isActive: true,
    sortOrder: 1,
  },
  {
    name: "POS and Agent Banking",
    nameFr: "POS et Banque d'Agents",
    description: "Point of sale terminals and agent network requirements",
    descriptionFr: "Terminaux de point de vente et exigences du réseau d'agents",
    icon: "CreditCard",
    isActive: true,
    sortOrder: 2,
  },
  {
    name: "Treasury and Transaction Management",
    nameFr: "Gestion de Trésorerie et des Transactions",
    description: "Cash management, reconciliation and transaction processing",
    descriptionFr: "Gestion de trésorerie, rapprochement et traitement des transactions",
    icon: "Wallet",
    isActive: true,
    sortOrder: 3,
  },
  {
    name: "Payments and Integrations",
    nameFr: "Paiements et Intégrations",
    description: "Payment gateway integrations and mobile money connectivity",
    descriptionFr: "Intégrations de passerelle de paiement et connectivité mobile money",
    icon: "Settings",
    isActive: true,
    sortOrder: 4,
  },
  {
    name: "Compliance, Risk and Regulatory Reporting",
    nameFr: "Conformité, Risque et Reporting Réglementaire",
    description: "KYC, AML, regulatory reporting and risk management",
    descriptionFr: "KYC, AML, reporting réglementaire et gestion des risques",
    icon: "Shield",
    isActive: true,
    sortOrder: 5,
  },
];

const questionsData: { moduleName: string; questions: any[] }[] = [
  {
    moduleName: "Core Banking Systems",
    questions: [
      {
        questionText: "What is your current core banking system?",
        questionTextFr: "Quel est votre système bancaire central actuel?",
        questionType: "text",
        isRequired: true,
        sortOrder: 1,
      },
      {
        questionText: "How many branches do you currently operate?",
        questionTextFr: "Combien de succursales exploitez-vous actuellement?",
        questionType: "select",
        options: ["1-5", "6-20", "21-50", "51-100", "100+"],
        optionsFr: ["1-5", "6-20", "21-50", "51-100", "100+"],
        isRequired: true,
        sortOrder: 2,
      },
      {
        questionText: "What is your approximate number of active clients?",
        questionTextFr: "Quel est votre nombre approximatif de clients actifs?",
        questionType: "select",
        options: ["Under 10,000", "10,000-50,000", "50,000-100,000", "100,000-500,000", "Over 500,000"],
        optionsFr: ["Moins de 10 000", "10 000-50 000", "50 000-100 000", "100 000-500 000", "Plus de 500 000"],
        isRequired: true,
        sortOrder: 3,
      },
      {
        questionText: "Are you looking to migrate from an existing system or implement new?",
        questionTextFr: "Cherchez-vous à migrer d'un système existant ou à en implémenter un nouveau?",
        questionType: "select",
        options: ["Migrate from existing", "New implementation", "Hybrid approach"],
        optionsFr: ["Migrer depuis un existant", "Nouvelle implémentation", "Approche hybride"],
        isRequired: true,
        sortOrder: 4,
      },
    ],
  },
  {
    moduleName: "POS and Agent Banking",
    questions: [
      {
        questionText: "Do you currently have POS terminals deployed?",
        questionTextFr: "Avez-vous actuellement des terminaux POS déployés?",
        questionType: "boolean",
        isRequired: true,
        sortOrder: 1,
      },
      {
        questionText: "How many POS devices do you need or currently have?",
        questionTextFr: "Combien d'appareils POS avez-vous besoin ou possédez actuellement?",
        questionType: "select",
        options: ["1-50", "51-200", "201-500", "501-1000", "1000+"],
        optionsFr: ["1-50", "51-200", "201-500", "501-1000", "1000+"],
        isRequired: false,
        sortOrder: 2,
      },
      {
        questionText: "Do you need biometric authentication on POS devices?",
        questionTextFr: "Avez-vous besoin d'authentification biométrique sur les appareils POS?",
        questionType: "boolean",
        isRequired: true,
        sortOrder: 3,
      },
      {
        questionText: "What agent banking services are you interested in?",
        questionTextFr: "Quels services de banque d'agents vous intéressent?",
        questionType: "multiselect",
        options: ["Cash deposits", "Cash withdrawals", "Bill payments", "Account opening", "Money transfers"],
        optionsFr: ["Dépôts en espèces", "Retraits en espèces", "Paiement de factures", "Ouverture de compte", "Transferts d'argent"],
        isRequired: true,
        sortOrder: 4,
      },
    ],
  },
  {
    moduleName: "Treasury and Transaction Management",
    questions: [
      {
        questionText: "What is your average daily transaction volume?",
        questionTextFr: "Quel est votre volume moyen de transactions quotidiennes?",
        questionType: "select",
        options: ["Under 1,000", "1,000-10,000", "10,000-50,000", "50,000-100,000", "Over 100,000"],
        optionsFr: ["Moins de 1 000", "1 000-10 000", "10 000-50 000", "50 000-100 000", "Plus de 100 000"],
        isRequired: true,
        sortOrder: 1,
      },
      {
        questionText: "Do you require multi-currency support?",
        questionTextFr: "Avez-vous besoin d'un support multi-devises?",
        questionType: "boolean",
        isRequired: true,
        sortOrder: 2,
      },
      {
        questionText: "What currencies do you primarily work with?",
        questionTextFr: "Avec quelles devises travaillez-vous principalement?",
        questionType: "multiselect",
        options: ["USD", "EUR", "CDF (Congolese Franc)", "XAF (Central African CFA)", "Other"],
        optionsFr: ["USD", "EUR", "CDF (Franc Congolais)", "XAF (CFA Afrique Centrale)", "Autre"],
        isRequired: false,
        sortOrder: 3,
      },
    ],
  },
  {
    moduleName: "Payments and Integrations",
    questions: [
      {
        questionText: "Which mobile money operators do you need to integrate with?",
        questionTextFr: "Avec quels opérateurs de mobile money devez-vous vous intégrer?",
        questionType: "multiselect",
        options: ["M-Pesa", "Orange Money", "Airtel Money", "Africell Money", "Other"],
        optionsFr: ["M-Pesa", "Orange Money", "Airtel Money", "Africell Money", "Autre"],
        isRequired: true,
        sortOrder: 1,
      },
      {
        questionText: "Do you need card payment processing (Visa/Mastercard)?",
        questionTextFr: "Avez-vous besoin du traitement des paiements par carte (Visa/Mastercard)?",
        questionType: "boolean",
        isRequired: true,
        sortOrder: 2,
      },
      {
        questionText: "Do you require API integrations with third-party systems?",
        questionTextFr: "Avez-vous besoin d'intégrations API avec des systèmes tiers?",
        questionType: "boolean",
        isRequired: true,
        sortOrder: 3,
      },
      {
        questionText: "What third-party systems need integration?",
        questionTextFr: "Quels systèmes tiers nécessitent une intégration?",
        questionType: "text",
        helpText: "List any ERP, accounting, or other systems you use",
        helpTextFr: "Listez tout ERP, comptabilité ou autres systèmes que vous utilisez",
        isRequired: false,
        sortOrder: 4,
      },
    ],
  },
  {
    moduleName: "Compliance, Risk and Regulatory Reporting",
    questions: [
      {
        questionText: "Which regulatory body are you supervised by?",
        questionTextFr: "Par quel organisme de régulation êtes-vous supervisé?",
        questionType: "select",
        options: ["Banque Centrale du Congo (BCC)", "Other Central Bank", "Multiple regulators", "Not yet regulated"],
        optionsFr: ["Banque Centrale du Congo (BCC)", "Autre Banque Centrale", "Plusieurs régulateurs", "Pas encore régulé"],
        isRequired: true,
        sortOrder: 1,
      },
      {
        questionText: "Do you need KYC/AML compliance tools?",
        questionTextFr: "Avez-vous besoin d'outils de conformité KYC/AML?",
        questionType: "boolean",
        isRequired: true,
        sortOrder: 2,
      },
      {
        questionText: "What compliance reporting do you currently perform?",
        questionTextFr: "Quel reporting de conformité effectuez-vous actuellement?",
        questionType: "multiselect",
        options: ["Suspicious transaction reports", "Large transaction reports", "Daily/monthly regulatory reports", "Tax reporting", "None currently"],
        optionsFr: ["Rapports de transactions suspectes", "Rapports de grandes transactions", "Rapports réglementaires quotidiens/mensuels", "Reporting fiscal", "Aucun actuellement"],
        isRequired: true,
        sortOrder: 3,
      },
      {
        questionText: "What is your current risk management approach?",
        questionTextFr: "Quelle est votre approche actuelle de gestion des risques?",
        questionType: "text",
        helpText: "Describe your current risk assessment and monitoring practices",
        helpTextFr: "Décrivez vos pratiques actuelles d'évaluation et de surveillance des risques",
        isRequired: false,
        sortOrder: 4,
      },
    ],
  },
];

export async function seedMfiQuestionnaire() {
  console.log("Seeding MFI questionnaire modules and questions...");

  try {
    const existingModules = await db.select().from(questionnaireModules);
    if (existingModules.length > 0) {
      console.log("Questionnaire already has data. Skipping seed.");
      return;
    }

    const insertedModules = await db.insert(questionnaireModules).values(modules).returning();
    console.log(`Inserted ${insertedModules.length} modules`);

    for (const moduleData of questionsData) {
      const module = insertedModules.find(m => m.name === moduleData.moduleName);
      if (!module) continue;

      const questionsToInsert = moduleData.questions.map(q => ({
        ...q,
        moduleId: module.id,
        isActive: true,
      }));

      await db.insert(questionnaireQuestions).values(questionsToInsert);
      console.log(`Inserted ${questionsToInsert.length} questions for module: ${moduleData.moduleName}`);
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding questionnaire:", error);
    throw error;
  }
}

seedMfiQuestionnaire()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
