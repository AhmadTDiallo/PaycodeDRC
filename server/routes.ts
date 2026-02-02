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
  insertQuestionnaireModuleSchema,
  insertQuestionnaireQuestionSchema,
  insertMfiRegistrationSchema,
  insertMfiResponseSchema,
  updateMfiRegistrationSchema,
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
  // Session configuration for admin - using default memory store for now
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
      console.log("Raw request body:", JSON.stringify(req.body, null, 2));
      
      // Convert publishedDate string to Date object before validation
      const requestData = {
        ...req.body,
        publishedDate: req.body.publishedDate ? new Date(req.body.publishedDate) : new Date(),
        // Ensure imageUrl is a string, even if empty
        imageUrl: req.body.imageUrl || ""
      };
      
      console.log("Processed request data:", JSON.stringify(requestData, null, 2));
      
      const validatedData = insertNewsArticleSchema.parse(requestData);
      const article = await storage.createNewsArticle(validatedData);
      res.json({ success: true, data: article });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
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

  // ==================== MFI ONBOARDING PUBLIC ROUTES ====================

  // Get active questionnaire modules (public)
  app.get("/api/mfi/modules", async (req, res) => {
    try {
      const modules = await storage.getQuestionnaireModules(true); // Only active modules
      res.json({ success: true, data: modules });
    } catch (error) {
      console.error("Error fetching questionnaire modules:", error);
      res.status(500).json({ success: false, message: "Failed to fetch modules" });
    }
  });

  // Get questions for selected modules (public)
  app.get("/api/mfi/questions", async (req, res) => {
    try {
      const moduleIds = req.query.moduleIds;
      let questions;
      
      if (moduleIds) {
        const ids = (moduleIds as string).split(',').map(Number).filter(n => !isNaN(n));
        const allQuestions = await Promise.all(
          ids.map(id => storage.getQuestionnaireQuestions(id, true))
        );
        questions = allQuestions.flat();
      } else {
        questions = await storage.getQuestionnaireQuestions(undefined, true);
      }
      
      res.json({ success: true, data: questions });
    } catch (error) {
      console.error("Error fetching questionnaire questions:", error);
      res.status(500).json({ success: false, message: "Failed to fetch questions" });
    }
  });

  // Submit MFI registration with responses (public)
  app.post("/api/mfi/register", async (req, res) => {
    try {
      const { registration, responses } = req.body;
      
      // Validate registration data
      const validatedRegistration = insertMfiRegistrationSchema.parse(registration);
      
      // Create registration
      const newRegistration = await storage.createMfiRegistration(validatedRegistration);
      
      // Create responses if provided
      if (responses && Array.isArray(responses)) {
        const validatedResponses = responses.map((r: any) => ({
          ...insertMfiResponseSchema.parse({
            mfiRegistrationId: newRegistration.id,
            questionId: r.questionId,
            responseValue: r.responseValue,
          }),
        }));
        await storage.createMfiResponses(validatedResponses);
      }
      
      res.json({ success: true, data: newRegistration });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
        res.status(400).json({ success: false, message: "Validation failed", errors: error.errors });
      } else {
        console.error("Error creating MFI registration:", error);
        res.status(500).json({ success: false, message: "Failed to submit registration" });
      }
    }
  });

  // ==================== MFI ONBOARDING ADMIN ROUTES ====================

  // Get all questionnaire modules (admin)
  app.get("/api/admin/mfi/modules", requireAdmin, async (req, res) => {
    try {
      const modules = await storage.getQuestionnaireModules(false);
      res.json({ success: true, data: modules });
    } catch (error) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ success: false, message: "Failed to fetch modules" });
    }
  });

  // Create questionnaire module (admin)
  app.post("/api/admin/mfi/modules", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertQuestionnaireModuleSchema.parse(req.body);
      const module = await storage.createQuestionnaireModule(validatedData);
      res.json({ success: true, data: module });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation failed", errors: error.errors });
      } else {
        console.error("Error creating module:", error);
        res.status(500).json({ success: false, message: "Failed to create module" });
      }
    }
  });

  // Update questionnaire module (admin)
  app.put("/api/admin/mfi/modules/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid module ID" });
      }
      const module = await storage.updateQuestionnaireModule(id, req.body);
      res.json({ success: true, data: module });
    } catch (error) {
      console.error("Error updating module:", error);
      res.status(500).json({ success: false, message: "Failed to update module" });
    }
  });

  // Delete questionnaire module (admin)
  app.delete("/api/admin/mfi/modules/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid module ID" });
      }
      const success = await storage.deleteQuestionnaireModule(id);
      if (success) {
        res.json({ success: true, message: "Module deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Module not found" });
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).json({ success: false, message: "Failed to delete module" });
    }
  });

  // Get all questions (admin)
  app.get("/api/admin/mfi/questions", requireAdmin, async (req, res) => {
    try {
      const moduleId = req.query.moduleId ? parseInt(req.query.moduleId as string) : undefined;
      const questions = await storage.getQuestionnaireQuestions(moduleId, false);
      res.json({ success: true, data: questions });
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ success: false, message: "Failed to fetch questions" });
    }
  });

  // Create question (admin)
  app.post("/api/admin/mfi/questions", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertQuestionnaireQuestionSchema.parse(req.body);
      const question = await storage.createQuestionnaireQuestion(validatedData);
      res.json({ success: true, data: question });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation failed", errors: error.errors });
      } else {
        console.error("Error creating question:", error);
        res.status(500).json({ success: false, message: "Failed to create question" });
      }
    }
  });

  // Update question (admin)
  app.put("/api/admin/mfi/questions/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid question ID" });
      }
      const question = await storage.updateQuestionnaireQuestion(id, req.body);
      res.json({ success: true, data: question });
    } catch (error) {
      console.error("Error updating question:", error);
      res.status(500).json({ success: false, message: "Failed to update question" });
    }
  });

  // Delete question (admin)
  app.delete("/api/admin/mfi/questions/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid question ID" });
      }
      const success = await storage.deleteQuestionnaireQuestion(id);
      if (success) {
        res.json({ success: true, message: "Question deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Question not found" });
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ success: false, message: "Failed to delete question" });
    }
  });

  // Get all MFI registrations (admin)
  app.get("/api/admin/mfi/registrations", requireAdmin, async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const country = req.query.country as string | undefined;
      const registrations = await storage.getMfiRegistrations({ status, country });
      res.json({ success: true, data: registrations });
    } catch (error) {
      console.error("Error fetching registrations:", error);
      res.status(500).json({ success: false, message: "Failed to fetch registrations" });
    }
  });

  // Get single MFI registration with responses (admin)
  app.get("/api/admin/mfi/registrations/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid registration ID" });
      }
      
      const registration = await storage.getMfiRegistrationById(id);
      if (!registration) {
        return res.status(404).json({ success: false, message: "Registration not found" });
      }
      
      const responses = await storage.getMfiResponsesByRegistrationId(id);
      res.json({ success: true, data: { registration, responses } });
    } catch (error) {
      console.error("Error fetching registration:", error);
      res.status(500).json({ success: false, message: "Failed to fetch registration" });
    }
  });

  // Update MFI registration status/notes (admin)
  app.put("/api/admin/mfi/registrations/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid registration ID" });
      }
      
      const validatedData = updateMfiRegistrationSchema.parse(req.body);
      const registration = await storage.updateMfiRegistration(id, validatedData);
      res.json({ success: true, data: registration });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation failed", errors: error.errors });
      } else {
        console.error("Error updating registration:", error);
        res.status(500).json({ success: false, message: "Failed to update registration" });
      }
    }
  });

  // Delete MFI registration (admin)
  app.delete("/api/admin/mfi/registrations/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid registration ID" });
      }
      
      const success = await storage.deleteMfiRegistration(id);
      if (success) {
        res.json({ success: true, message: "Registration deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Registration not found" });
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
      res.status(500).json({ success: false, message: "Failed to delete registration" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
