import { 
  demoRequests, 
  newsletterSubscriptions,
  newsArticles,
  adminUsers,
  questionnaireModules,
  questionnaireQuestions,
  mfiRegistrations,
  mfiResponses,
  type DemoRequest, 
  type InsertDemoRequest,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type NewsArticle,
  type InsertNewsArticle,
  type UpdateNewsArticle,
  type AdminUser,
  type InsertAdminUser,
  type QuestionnaireModule,
  type InsertQuestionnaireModule,
  type QuestionnaireQuestion,
  type InsertQuestionnaireQuestion,
  type MfiRegistration,
  type InsertMfiRegistration,
  type MfiResponse,
  type InsertMfiResponse,
  type UpdateMfiRegistration,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, asc, inArray } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  // Demo requests
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest>;
  getDemoRequests(): Promise<DemoRequest[]>;
  
  // Newsletter subscriptions
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  checkEmailExists(email: string): Promise<boolean>;
  
  // News articles
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  getNewsArticles(publishedOnly?: boolean): Promise<NewsArticle[]>;
  getNewsArticleById(id: number): Promise<NewsArticle | undefined>;
  updateNewsArticle(id: number, updates: Partial<UpdateNewsArticle>): Promise<NewsArticle>;
  deleteNewsArticle(id: number): Promise<boolean>;
  togglePublishStatus(id: number): Promise<NewsArticle>;
  
  // Admin users
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminUserById(id: number): Promise<AdminUser | undefined>;
  validateAdminPassword(username: string, password: string): Promise<AdminUser | null>;
  getAllAdminUsers(): Promise<AdminUser[]>;
  updateAdminUser(id: number, updates: Partial<AdminUser>): Promise<AdminUser>;
  deleteAdminUser(id: number): Promise<boolean>;
  
  // Questionnaire Modules
  createQuestionnaireModule(module: InsertQuestionnaireModule): Promise<QuestionnaireModule>;
  getQuestionnaireModules(activeOnly?: boolean): Promise<QuestionnaireModule[]>;
  getQuestionnaireModuleById(id: number): Promise<QuestionnaireModule | undefined>;
  updateQuestionnaireModule(id: number, updates: Partial<InsertQuestionnaireModule>): Promise<QuestionnaireModule>;
  deleteQuestionnaireModule(id: number): Promise<boolean>;
  
  // Questionnaire Questions
  createQuestionnaireQuestion(question: InsertQuestionnaireQuestion): Promise<QuestionnaireQuestion>;
  getQuestionnaireQuestions(moduleId?: number, activeOnly?: boolean): Promise<QuestionnaireQuestion[]>;
  getQuestionnaireQuestionById(id: number): Promise<QuestionnaireQuestion | undefined>;
  updateQuestionnaireQuestion(id: number, updates: Partial<InsertQuestionnaireQuestion>): Promise<QuestionnaireQuestion>;
  deleteQuestionnaireQuestion(id: number): Promise<boolean>;
  
  // MFI Registrations
  createMfiRegistration(registration: InsertMfiRegistration): Promise<MfiRegistration>;
  getMfiRegistrations(filters?: { status?: string; country?: string }): Promise<MfiRegistration[]>;
  getMfiRegistrationById(id: number): Promise<MfiRegistration | undefined>;
  updateMfiRegistration(id: number, updates: UpdateMfiRegistration): Promise<MfiRegistration>;
  deleteMfiRegistration(id: number): Promise<boolean>;
  
  // MFI Responses
  createMfiResponses(responses: InsertMfiResponse[]): Promise<MfiResponse[]>;
  getMfiResponsesByRegistrationId(registrationId: number): Promise<MfiResponse[]>;
}

export class DatabaseStorage implements IStorage {
  async createDemoRequest(insertRequest: InsertDemoRequest): Promise<DemoRequest> {
    const [request] = await db
      .insert(demoRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return await db.select().from(demoRequests);
  }

  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [subscription] = await db
      .insert(newsletterSubscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return await db.select().from(newsletterSubscriptions);
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const [subscription] = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email));
    return !!subscription;
  }

  // News articles implementation
  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    const [newArticle] = await db
      .insert(newsArticles)
      .values({
        ...article,
        publishedDate: article.isPublished ? new Date() : null,
      })
      .returning();
    return newArticle;
  }

  async getNewsArticles(publishedOnly: boolean = false): Promise<NewsArticle[]> {
    const query = db.select().from(newsArticles);
    
    if (publishedOnly) {
      return await query
        .where(eq(newsArticles.isPublished, true))
        .orderBy(desc(newsArticles.publishedDate));
    }
    
    return await query.orderBy(desc(newsArticles.createdAt));
  }

  async getNewsArticleById(id: number): Promise<NewsArticle | undefined> {
    const [article] = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.id, id))
      .limit(1);
    return article;
  }

  async updateNewsArticle(id: number, updates: Partial<UpdateNewsArticle>): Promise<NewsArticle> {
    const updateData = {
      ...updates,
      updatedAt: new Date(),
    };

    // If setting to published and no publishedDate, set it now
    if (updates.isPublished && !updates.publishedDate) {
      updateData.publishedDate = new Date();
    }

    const [updatedArticle] = await db
      .update(newsArticles)
      .set(updateData)
      .where(eq(newsArticles.id, id))
      .returning();
    return updatedArticle;
  }

  async deleteNewsArticle(id: number): Promise<boolean> {
    const result = await db
      .delete(newsArticles)
      .where(eq(newsArticles.id, id));
    return result.rowCount > 0;
  }

  async togglePublishStatus(id: number): Promise<NewsArticle> {
    const article = await this.getNewsArticleById(id);
    if (!article) {
      throw new Error("Article not found");
    }

    const newStatus = !article.isPublished;
    return await this.updateNewsArticle(id, {
      isPublished: newStatus,
      publishedDate: newStatus ? new Date() : null,
    });
  }

  // Admin users implementation
  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    
    const [adminUser] = await db
      .insert(adminUsers)
      .values({
        username: user.username,
        email: user.email,
        passwordHash: hashedPassword,
        role: user.role || "admin",
        isActive: user.isActive !== undefined ? user.isActive : true,
      })
      .returning();
    return adminUser;
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    return await db.select().from(adminUsers).orderBy(adminUsers.createdAt);
  }

  async updateAdminUser(id: number, updates: Partial<AdminUser>): Promise<AdminUser> {
    const [updatedUser] = await db
      .update(adminUsers)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.id, id))
      .returning();
    return updatedUser;
  }

  async deleteAdminUser(id: number): Promise<boolean> {
    const result = await db
      .delete(adminUsers)
      .where(eq(adminUsers.id, id));
    return result.rowCount > 0;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const [user] = await db
      .select()
      .from(adminUsers)
      .where(and(
        eq(adminUsers.username, username),
        eq(adminUsers.isActive, true)
      ))
      .limit(1);
    return user;
  }

  async getAdminUserById(id: number): Promise<AdminUser | undefined> {
    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, id))
      .limit(1);
    return user;
  }

  async validateAdminPassword(username: string, password: string): Promise<AdminUser | null> {
    const bcrypt = await import("bcryptjs");
    const user = await this.getAdminUserByUsername(username);
    
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    return isValid ? user : null;
  }

  // ==================== QUESTIONNAIRE MODULES ====================
  async createQuestionnaireModule(module: InsertQuestionnaireModule): Promise<QuestionnaireModule> {
    const [newModule] = await db
      .insert(questionnaireModules)
      .values(module)
      .returning();
    return newModule;
  }

  async getQuestionnaireModules(activeOnly: boolean = false): Promise<QuestionnaireModule[]> {
    if (activeOnly) {
      return await db
        .select()
        .from(questionnaireModules)
        .where(eq(questionnaireModules.isActive, true))
        .orderBy(asc(questionnaireModules.sortOrder));
    }
    return await db
      .select()
      .from(questionnaireModules)
      .orderBy(asc(questionnaireModules.sortOrder));
  }

  async getQuestionnaireModuleById(id: number): Promise<QuestionnaireModule | undefined> {
    const [module] = await db
      .select()
      .from(questionnaireModules)
      .where(eq(questionnaireModules.id, id))
      .limit(1);
    return module;
  }

  async updateQuestionnaireModule(id: number, updates: Partial<InsertQuestionnaireModule>): Promise<QuestionnaireModule> {
    const [updatedModule] = await db
      .update(questionnaireModules)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(questionnaireModules.id, id))
      .returning();
    return updatedModule;
  }

  async deleteQuestionnaireModule(id: number): Promise<boolean> {
    const result = await db
      .delete(questionnaireModules)
      .where(eq(questionnaireModules.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // ==================== QUESTIONNAIRE QUESTIONS ====================
  async createQuestionnaireQuestion(question: InsertQuestionnaireQuestion): Promise<QuestionnaireQuestion> {
    const [newQuestion] = await db
      .insert(questionnaireQuestions)
      .values(question)
      .returning();
    return newQuestion;
  }

  async getQuestionnaireQuestions(moduleId?: number, activeOnly: boolean = false): Promise<QuestionnaireQuestion[]> {
    let query = db.select().from(questionnaireQuestions);
    
    const conditions: any[] = [];
    if (moduleId) {
      conditions.push(eq(questionnaireQuestions.moduleId, moduleId));
    }
    if (activeOnly) {
      conditions.push(eq(questionnaireQuestions.isActive, true));
    }
    
    if (conditions.length > 0) {
      return await query
        .where(and(...conditions))
        .orderBy(asc(questionnaireQuestions.sortOrder));
    }
    
    return await query.orderBy(asc(questionnaireQuestions.sortOrder));
  }

  async getQuestionnaireQuestionById(id: number): Promise<QuestionnaireQuestion | undefined> {
    const [question] = await db
      .select()
      .from(questionnaireQuestions)
      .where(eq(questionnaireQuestions.id, id))
      .limit(1);
    return question;
  }

  async updateQuestionnaireQuestion(id: number, updates: Partial<InsertQuestionnaireQuestion>): Promise<QuestionnaireQuestion> {
    const [updatedQuestion] = await db
      .update(questionnaireQuestions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(questionnaireQuestions.id, id))
      .returning();
    return updatedQuestion;
  }

  async deleteQuestionnaireQuestion(id: number): Promise<boolean> {
    const result = await db
      .delete(questionnaireQuestions)
      .where(eq(questionnaireQuestions.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // ==================== MFI REGISTRATIONS ====================
  async createMfiRegistration(registration: InsertMfiRegistration): Promise<MfiRegistration> {
    const [newRegistration] = await db
      .insert(mfiRegistrations)
      .values(registration)
      .returning();
    return newRegistration;
  }

  async getMfiRegistrations(filters?: { status?: string; country?: string }): Promise<MfiRegistration[]> {
    let query = db.select().from(mfiRegistrations);
    
    const conditions: any[] = [];
    if (filters?.status) {
      conditions.push(eq(mfiRegistrations.status, filters.status));
    }
    if (filters?.country) {
      conditions.push(eq(mfiRegistrations.country, filters.country));
    }
    
    if (conditions.length > 0) {
      return await query
        .where(and(...conditions))
        .orderBy(desc(mfiRegistrations.submittedAt));
    }
    
    return await query.orderBy(desc(mfiRegistrations.submittedAt));
  }

  async getMfiRegistrationById(id: number): Promise<MfiRegistration | undefined> {
    const [registration] = await db
      .select()
      .from(mfiRegistrations)
      .where(eq(mfiRegistrations.id, id))
      .limit(1);
    return registration;
  }

  async updateMfiRegistration(id: number, updates: UpdateMfiRegistration): Promise<MfiRegistration> {
    const [updatedRegistration] = await db
      .update(mfiRegistrations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(mfiRegistrations.id, id))
      .returning();
    return updatedRegistration;
  }

  async deleteMfiRegistration(id: number): Promise<boolean> {
    const result = await db
      .delete(mfiRegistrations)
      .where(eq(mfiRegistrations.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // ==================== MFI RESPONSES ====================
  async createMfiResponses(responses: InsertMfiResponse[]): Promise<MfiResponse[]> {
    if (responses.length === 0) return [];
    const newResponses = await db
      .insert(mfiResponses)
      .values(responses)
      .returning();
    return newResponses;
  }

  async getMfiResponsesByRegistrationId(registrationId: number): Promise<MfiResponse[]> {
    return await db
      .select()
      .from(mfiResponses)
      .where(eq(mfiResponses.mfiRegistrationId, registrationId));
  }
}

export const storage = new DatabaseStorage();
