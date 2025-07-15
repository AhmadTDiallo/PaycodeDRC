import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDemoRequestSchema, 
  insertNewsletterSchema,
  insertNewsArticleSchema,
  updateNewsArticleSchema,
  adminLoginSchema,
  insertAdminUserSchema,
} from "@shared/schema";
import { z } from "zod";
import { sendDemoRequestNotification } from "./sendgrid";
import session from "express-session";

// Admin authentication middleware
const requireAdmin = (req: any, res: any, next: any) => {
  if (!req.session?.adminUser) {
    return res.status(401).json({ success: false, message: "Admin authentication required" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration for admin
  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));
  // Demo request endpoint
  app.post("/api/demo-requests", async (req, res) => {
    try {
      const validatedData = insertDemoRequestSchema.parse(req.body);
      const demoRequest = await storage.createDemoRequest(validatedData);
      
      // Send email notification to Ahmad.Diallo@paycode.com
      try {
        await sendDemoRequestNotification({
          name: validatedData.name,
          email: validatedData.email,
          company: validatedData.company,
          phone: validatedData.phone,
          message: validatedData.message
        });
        console.log(`Email notification sent for demo request from ${validatedData.name}`);
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request if email fails, just log the error
      }
      
      res.json({ success: true, data: demoRequest });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create demo request" 
        });
      }
    }
  });

  // Get all demo requests
  app.get("/api/demo-requests", async (req, res) => {
    try {
      const requests = await storage.getDemoRequests();
      res.json({ success: true, data: requests });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch demo requests" 
      });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const emailExists = await storage.checkEmailExists(validatedData.email);
      if (emailExists) {
        return res.status(409).json({ 
          success: false, 
          message: "Email already subscribed" 
        });
      }

      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.json({ success: true, data: subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to subscribe to newsletter" 
        });
      }
    }
  });

  // Get newsletter subscriptions
  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json({ success: true, data: subscriptions });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch newsletter subscriptions" 
      });
    }
  });

  // Admin authentication routes
  app.post("/api/admin/login", async (req: any, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      
      const adminUser = await storage.validateAdminPassword(username, password);
      if (!adminUser) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      req.session.adminUser = {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email
      };

      res.json({ 
        success: true, 
        user: { 
          id: adminUser.id, 
          username: adminUser.username, 
          email: adminUser.email 
        } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid input", errors: error.errors });
      } else {
        console.error("Admin login error:", error);
        res.status(500).json({ success: false, message: "Login failed" });
      }
    }
  });

  app.post("/api/admin/logout", (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
      res.json({ success: true, message: "Logged out successfully" });
    });
  });

  app.get("/api/admin/me", requireAdmin, (req: any, res) => {
    res.json({ success: true, user: req.session.adminUser });
  });

  // Admin user management routes
  app.get('/api/admin/users', requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllAdminUsers();
      res.json({ success: true, data: users });
    } catch (error) {
      console.error("Error fetching admin users:", error);
      res.status(500).json({ success: false, message: "Failed to fetch admin users" });
    }
  });

  app.post('/api/admin/users', requireAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminUserSchema.parse(req.body);
      const newUser = await storage.createAdminUser(validatedData);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      }
      console.error("Error creating admin user:", error);
      res.status(500).json({ success: false, message: "Failed to create admin user" });
    }
  });

  app.put('/api/admin/users/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const updatedUser = await storage.updateAdminUser(id, updates);
      res.json({ success: true, data: updatedUser });
    } catch (error) {
      console.error("Error updating admin user:", error);
      res.status(500).json({ success: false, message: "Failed to update admin user" });
    }
  });

  app.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAdminUser(id);
      if (success) {
        res.json({ success: true, message: "Admin user deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Admin user not found" });
      }
    } catch (error) {
      console.error("Error deleting admin user:", error);
      res.status(500).json({ success: false, message: "Failed to delete admin user" });
    }
  });

  // Public news endpoint
  app.get("/api/news", async (req, res) => {
    try {
      const articles = await storage.getNewsArticles(true); // Only published
      res.json({ success: true, data: articles });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ success: false, message: "Failed to fetch news" });
    }
  });

  // Admin news endpoints
  app.get("/api/admin/news", requireAdmin, async (req, res) => {
    try {
      const articles = await storage.getNewsArticles(false); // All articles
      res.json({ success: true, data: articles });
    } catch (error) {
      console.error("Error fetching admin news:", error);
      res.status(500).json({ success: false, message: "Failed to fetch articles" });
    }
  });

  app.post("/api/admin/news", requireAdmin, async (req, res) => {
    try {
      // Convert publishedDate string to Date object before validation
      const requestData = {
        ...req.body,
        publishedDate: req.body.publishedDate ? new Date(req.body.publishedDate) : new Date()
      };
      
      const validatedData = insertNewsArticleSchema.parse(requestData);
      const article = await storage.createNewsArticle(validatedData);
      res.json({ success: true, data: article });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation failed", errors: error.errors });
      } else {
        console.error("Error creating article:", error);
        res.status(500).json({ success: false, message: "Failed to create article" });
      }
    }
  });

  app.get("/api/admin/news/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid article ID" });
      }

      const article = await storage.getNewsArticleById(id);
      if (!article) {
        return res.status(404).json({ success: false, message: "Article not found" });
      }

      res.json({ success: true, data: article });
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ success: false, message: "Failed to fetch article" });
    }
  });

  app.put("/api/admin/news/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid article ID" });
      }

      // Convert publishedDate string to Date object before validation
      const requestData = {
        ...req.body,
        id,
        publishedDate: req.body.publishedDate ? new Date(req.body.publishedDate) : undefined
      };

      const validatedData = updateNewsArticleSchema.parse(requestData);
      const { id: _, ...updateData } = validatedData;
      
      const article = await storage.updateNewsArticle(id, updateData);
      res.json({ success: true, data: article });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation failed", errors: error.errors });
      } else {
        console.error("Error updating article:", error);
        res.status(500).json({ success: false, message: "Failed to update article" });
      }
    }
  });

  app.delete("/api/admin/news/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid article ID" });
      }

      const success = await storage.deleteNewsArticle(id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Article not found" });
      }

      res.json({ success: true, message: "Article deleted successfully" });
    } catch (error) {
      console.error("Error deleting article:", error);
      res.status(500).json({ success: false, message: "Failed to delete article" });
    }
  });

  app.patch("/api/admin/news/:id/publish", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid article ID" });
      }

      const article = await storage.togglePublishStatus(id);
      res.json({ success: true, data: article });
    } catch (error) {
      console.error("Error toggling publish status:", error);
      res.status(500).json({ success: false, message: "Failed to toggle publish status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
