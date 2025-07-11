import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoRequestSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";
import { sendDemoRequestNotification } from "./sendgrid";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}
