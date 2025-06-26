import { 
  demoRequests, 
  newsletterSubscriptions,
  type DemoRequest, 
  type InsertDemoRequest,
  type NewsletterSubscription,
  type InsertNewsletterSubscription
} from "@shared/schema";

export interface IStorage {
  // Demo requests
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest>;
  getDemoRequests(): Promise<DemoRequest[]>;
  
  // Newsletter subscriptions
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  checkEmailExists(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private demoRequests: Map<number, DemoRequest>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private currentDemoId: number;
  private currentNewsletterId: number;

  constructor() {
    this.demoRequests = new Map();
    this.newsletterSubscriptions = new Map();
    this.currentDemoId = 1;
    this.currentNewsletterId = 1;
  }

  async createDemoRequest(insertRequest: InsertDemoRequest): Promise<DemoRequest> {
    const id = this.currentDemoId++;
    const request: DemoRequest = { 
      ...insertRequest, 
      id,
      createdAt: new Date()
    };
    this.demoRequests.set(id, request);
    return request;
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return Array.from(this.demoRequests.values());
  }

  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = this.currentNewsletterId++;
    const subscription: NewsletterSubscription = { 
      ...insertSubscription, 
      id,
      subscribed: true,
      createdAt: new Date()
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }

  async checkEmailExists(email: string): Promise<boolean> {
    return Array.from(this.newsletterSubscriptions.values()).some(
      (subscription) => subscription.email === email
    );
  }
}

export const storage = new MemStorage();
