import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAiSystemSchema, insertPolicyViolationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get compliance statistics
  app.get("/api/compliance/stats", async (req, res) => {
    try {
      const stats = await storage.getComplianceStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch compliance stats" });
    }
  });

  // Get all AI systems
  app.get("/api/ai-systems", async (req, res) => {
    try {
      const systems = await storage.getAiSystems();
      res.json(systems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI systems" });
    }
  });

  // Register new AI system
  app.post("/api/ai-systems", async (req, res) => {
    try {
      const validatedData = insertAiSystemSchema.parse(req.body);
      const system = await storage.createAiSystem(validatedData);
      res.status(201).json(system);
    } catch (error) {
      res.status(400).json({ message: "Invalid system data" });
    }
  });

  // Update AI system status
  app.patch("/api/ai-systems/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, complianceScore } = req.body;
      
      const system = await storage.updateAiSystemStatus(id, status, complianceScore);
      if (!system) {
        return res.status(404).json({ message: "AI system not found" });
      }
      
      res.json(system);
    } catch (error) {
      res.status(500).json({ message: "Failed to update system status" });
    }
  });

  // Get policy violations
  app.get("/api/violations", async (req, res) => {
    try {
      const violations = await storage.getPolicyViolations();
      res.json(violations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch violations" });
    }
  });

  // Report policy violation
  app.post("/api/violations", async (req, res) => {
    try {
      const validatedData = insertPolicyViolationSchema.parse(req.body);
      const violation = await storage.createPolicyViolation(validatedData);
      res.status(201).json(violation);
    } catch (error) {
      res.status(400).json({ message: "Invalid violation data" });
    }
  });

  // DNA verification endpoint
  app.post("/api/verify/dna", async (req, res) => {
    try {
      const { signature, face_id, handwriting } = req.body;
      
      // In a real implementation, this would verify against stored biometric data
      const isValid = signature === "ervin_dna_signature" && 
                     face_id === "ervin_face_verified" && 
                     handwriting === "ervin_handwriting_verified";
      
      if (isValid) {
        res.json({ 
          verified: true, 
          access_level: "full",
          message: "DNA verification successful - Creator access granted"
        });
      } else {
        res.status(401).json({ 
          verified: false, 
          access_level: "none",
          message: "DNA verification failed - Access denied"
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Verification system error" });
    }
  });

  // Policy enforcement endpoint
  app.post("/api/enforce/policy", async (req, res) => {
    try {
      const { system_id, action } = req.body;
      
      if (action === "block") {
        const system = await storage.updateAiSystemStatus(system_id, "blocked", 0);
        if (system) {
          await storage.createPolicyViolation({
            systemId: system_id,
            violationType: "Policy Enforcement",
            description: "System blocked for policy violation",
            severity: "high"
          });
        }
      }
      
      res.json({ success: true, action, system_id });
    } catch (error) {
      res.status(500).json({ message: "Policy enforcement failed" });
    }
  });

  // Contact verification endpoint
  app.post("/api/contact/verify", async (req, res) => {
    try {
      const { email, purpose, details } = req.body;
      
      // Log verification request
      console.log(`Verification request from ${email}: ${purpose}`);
      
      res.json({ 
        success: true, 
        message: "Verification request received and logged",
        contact_email: "ervin210@icloud.com",
        expected_response_time: "24-48 hours"
      });
    } catch (error) {
      res.status(500).json({ message: "Contact verification failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
