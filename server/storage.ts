import { 
  demoRequests, 
  newsletterSubscriptions,
  newsArticles,
  adminUsers,
  type DemoRequest, 
  type InsertDemoRequest,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type NewsArticle,
  type InsertNewsArticle,
  type UpdateNewsArticle,
  type AdminUser,
  type InsertAdminUser,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

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
    const [newUser] = await db
      .insert(adminUsers)
      .values(user)
      .returning();
    return newUser;
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
}

export const storage = new DatabaseStorage();
