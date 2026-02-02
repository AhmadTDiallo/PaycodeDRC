import { pgTable, text, serial, timestamp, boolean, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribed: boolean("subscribed").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// News articles table
export const newsArticles = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  author: text("author").notNull(),
  imageUrl: text("image_url"),
  imageUrls: text("image_urls").array(),
  publishedDate: timestamp("published_date"),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Admin users table for authentication
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).default("admin").notNull(), // 'superadmin' or 'admin'
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDemoRequestSchema = createInsertSchema(demoRequests).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  createdAt: true,
  subscribed: true,
}).extend({
  email: z.string().email("Invalid email address"),
});

// News article schemas
export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author is required"),
  imageUrl: z.string().optional().or(z.literal("")),
  imageUrls: z.array(z.string()).optional(),
  publishedDate: z.date().optional(),
  isPublished: z.boolean().default(false),
});

export const updateNewsArticleSchema = insertNewsArticleSchema.partial().extend({
  id: z.number(),
});

// Admin user schemas
export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  passwordHash: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["admin", "superadmin"]).default("admin"),
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type DemoRequest = typeof demoRequests.$inferSelect;

export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;

export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type UpdateNewsArticle = z.infer<typeof updateNewsArticleSchema>;

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;

// ==================== MFI ONBOARDING SYSTEM ====================

// Questionnaire modules (configurable sections like Core Banking, POS, etc.)
export const questionnaireModules = pgTable("questionnaire_modules", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameFr: text("name_fr").notNull(),
  description: text("description"),
  descriptionFr: text("description_fr"),
  icon: text("icon"), // Lucide icon name
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Questions within modules
export const questionnaireQuestions = pgTable("questionnaire_questions", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull().references(() => questionnaireModules.id, { onDelete: 'cascade' }),
  questionText: text("question_text").notNull(),
  questionTextFr: text("question_text_fr").notNull(),
  questionType: varchar("question_type", { length: 50 }).notNull(), // 'select', 'multiselect', 'text', 'number', 'boolean'
  options: jsonb("options").$type<string[]>(), // For select/multiselect questions
  optionsFr: jsonb("options_fr").$type<string[]>(), // French versions
  isRequired: boolean("is_required").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  helpText: text("help_text"),
  helpTextFr: text("help_text_fr"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// MFI Registrations (institution identification)
export const mfiRegistrations = pgTable("mfi_registrations", {
  id: serial("id").primaryKey(),
  institutionName: text("institution_name").notNull(),
  country: text("country").notNull(),
  institutionalEmail: text("institutional_email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  contactPersonName: text("contact_person_name"),
  contactPersonTitle: text("contact_person_title"),
  selectedModules: jsonb("selected_modules").$type<number[]>(), // Array of module IDs selected
  status: varchar("status", { length: 50 }).default("pending").notNull(), // 'pending', 'in_review', 'approved', 'rejected', 'contacted'
  internalNotes: text("internal_notes"),
  questionnaireVersion: integer("questionnaire_version").default(1).notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// MFI Questionnaire Responses
export const mfiResponses = pgTable("mfi_responses", {
  id: serial("id").primaryKey(),
  mfiRegistrationId: integer("mfi_registration_id").notNull().references(() => mfiRegistrations.id, { onDelete: 'cascade' }),
  questionId: integer("question_id").notNull().references(() => questionnaireQuestions.id),
  responseValue: jsonb("response_value"), // Can be string, array, number, boolean
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const questionnaireModulesRelations = relations(questionnaireModules, ({ many }) => ({
  questions: many(questionnaireQuestions),
}));

export const questionnaireQuestionsRelations = relations(questionnaireQuestions, ({ one }) => ({
  module: one(questionnaireModules, {
    fields: [questionnaireQuestions.moduleId],
    references: [questionnaireModules.id],
  }),
}));

export const mfiRegistrationsRelations = relations(mfiRegistrations, ({ many }) => ({
  responses: many(mfiResponses),
}));

export const mfiResponsesRelations = relations(mfiResponses, ({ one }) => ({
  registration: one(mfiRegistrations, {
    fields: [mfiResponses.mfiRegistrationId],
    references: [mfiRegistrations.id],
  }),
  question: one(questionnaireQuestions, {
    fields: [mfiResponses.questionId],
    references: [questionnaireQuestions.id],
  }),
}));

// Insert schemas for MFI Onboarding
export const insertQuestionnaireModuleSchema = createInsertSchema(questionnaireModules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Module name is required"),
  nameFr: z.string().min(1, "French module name is required"),
});

export const insertQuestionnaireQuestionSchema = createInsertSchema(questionnaireQuestions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  moduleId: z.number().int().positive(),
  questionText: z.string().min(1, "Question text is required"),
  questionTextFr: z.string().min(1, "French question text is required"),
  questionType: z.enum(["select", "multiselect", "text", "number", "boolean"]),
  options: z.array(z.string()).optional(),
  optionsFr: z.array(z.string()).optional(),
});

export const insertMfiRegistrationSchema = createInsertSchema(mfiRegistrations).omit({
  id: true,
  status: true,
  internalNotes: true,
  submittedAt: true,
  updatedAt: true,
}).extend({
  institutionName: z.string().min(2, "Institution name must be at least 2 characters"),
  country: z.string().min(2, "Country is required"),
  institutionalEmail: z.string().email("Invalid email address").refine(
    (email) => !email.match(/@(gmail|yahoo|hotmail|outlook|aol|icloud)\./i),
    "Please use an institutional email address (not personal email)"
  ),
  phoneNumber: z.string().min(6, "Phone number is required"),
  contactPersonName: z.string().optional(),
  contactPersonTitle: z.string().optional(),
  selectedModules: z.array(z.number()).min(1, "Please select at least one module"),
  questionnaireVersion: z.number().default(1),
});

export const insertMfiResponseSchema = createInsertSchema(mfiResponses).omit({
  id: true,
  createdAt: true,
}).extend({
  mfiRegistrationId: z.number().int().positive(),
  questionId: z.number().int().positive(),
  responseValue: z.any(),
});

export const updateMfiRegistrationSchema = z.object({
  status: z.enum(["pending", "in_review", "approved", "rejected", "contacted"]).optional(),
  internalNotes: z.string().optional(),
});

// Types for MFI Onboarding
export type QuestionnaireModule = typeof questionnaireModules.$inferSelect;
export type InsertQuestionnaireModule = z.infer<typeof insertQuestionnaireModuleSchema>;

export type QuestionnaireQuestion = typeof questionnaireQuestions.$inferSelect;
export type InsertQuestionnaireQuestion = z.infer<typeof insertQuestionnaireQuestionSchema>;

export type MfiRegistration = typeof mfiRegistrations.$inferSelect;
export type InsertMfiRegistration = z.infer<typeof insertMfiRegistrationSchema>;

export type MfiResponse = typeof mfiResponses.$inferSelect;
export type InsertMfiResponse = z.infer<typeof insertMfiResponseSchema>;

export type UpdateMfiRegistration = z.infer<typeof updateMfiRegistrationSchema>;
