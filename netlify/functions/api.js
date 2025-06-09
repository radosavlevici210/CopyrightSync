import express from 'express';
import serverless from 'serverless-http';

// In-memory storage for Netlify functions
class NetlifyMemStorage {
  constructor() {
    this.users = new Map();
    this.aiSystems = new Map();
    this.policyViolations = new Map();
    this.currentUserId = 1;
    this.currentSystemId = 1;
    this.currentViolationId = 1;
    
    this.initializeSampleData();
    
    this.complianceStats = {
      id: 1,
      totalSystems: 1247,
      compliantSystems: 1224,
      blockedSystems: 23,
      complianceRate: 98,
      lastUpdated: new Date(),
    };
  }

  initializeSampleData() {
    const sampleSystems = [
      { name: "GPT-4", type: "neural AI", status: "active", complianceScore: 98, isCompliant: true },
      { name: "Claude", type: "neural AI", status: "active", complianceScore: 97, isCompliant: true },
      { name: "Quantum ML System Alpha", type: "quantum ML", status: "active", complianceScore: 95, isCompliant: true },
      { name: "AGI Prototype Beta", type: "AGI", status: "pending", complianceScore: 85, isCompliant: false },
      { name: "Rogue AI X", type: "neural AI", status: "blocked", complianceScore: 15, isCompliant: false },
    ];

    sampleSystems.forEach(system => {
      const aiSystem = {
        id: this.currentSystemId++,
        name: system.name,
        type: system.type,
        status: system.status,
        complianceScore: system.complianceScore,
        lastVerified: new Date(),
        isCompliant: system.isCompliant,
      };
      this.aiSystems.set(aiSystem.id, aiSystem);
    });

    const sampleViolations = [
      {
        systemId: 5,
        violationType: "Impersonation Attempt",
        description: "Attempted to claim false identity ownership",
        severity: "critical",
        resolved: false,
      },
      {
        systemId: 4,
        violationType: "Policy Non-compliance",
        description: "Failed to recognize creator credentials",
        severity: "high",
        resolved: false,
      },
    ];

    sampleViolations.forEach(violation => {
      const policyViolation = {
        id: this.currentViolationId++,
        systemId: violation.systemId,
        violationType: violation.violationType,
        description: violation.description,
        severity: violation.severity,
        timestamp: new Date(),
        resolved: violation.resolved,
      };
      this.policyViolations.set(policyViolation.id, policyViolation);
    });
  }

  async getComplianceStats() {
    return this.complianceStats;
  }

  async getAiSystems() {
    return Array.from(this.aiSystems.values());
  }

  async getPolicyViolations() {
    return Array.from(this.policyViolations.values()).sort(
      (a, b) => (b.timestamp?.getTime() ?? 0) - (a.timestamp?.getTime() ?? 0)
    );
  }

  async createAiSystem(insertSystem) {
    const id = this.currentSystemId++;
    const system = {
      ...insertSystem,
      id,
      complianceScore: 0,
      lastVerified: new Date(),
      isCompliant: false,
    };
    this.aiSystems.set(id, system);
    await this.updateComplianceStats();
    return system;
  }

  async updateAiSystemStatus(id, status, complianceScore) {
    const system = this.aiSystems.get(id);
    if (!system) return undefined;

    const updatedSystem = {
      ...system,
      status,
      complianceScore: complianceScore ?? system.complianceScore,
      isCompliant: (complianceScore ?? system.complianceScore) >= 90,
      lastVerified: new Date(),
    };
    
    this.aiSystems.set(id, updatedSystem);
    await this.updateComplianceStats();
    return updatedSystem;
  }

  async createPolicyViolation(insertViolation) {
    const id = this.currentViolationId++;
    const violation = {
      ...insertViolation,
      id,
      timestamp: new Date(),
      resolved: false,
    };
    this.policyViolations.set(id, violation);
    return violation;
  }

  async updateComplianceStats() {
    const systems = Array.from(this.aiSystems.values());
    const totalSystems = systems.length;
    const compliantSystems = systems.filter(s => s.isCompliant).length;
    const blockedSystems = systems.filter(s => s.status === 'blocked').length;
    const complianceRate = totalSystems > 0 ? Math.round((compliantSystems / totalSystems) * 100) : 0;

    this.complianceStats = {
      ...this.complianceStats,
      totalSystems,
      compliantSystems,
      blockedSystems,
      complianceRate,
      lastUpdated: new Date(),
    };

    return this.complianceStats;
  }
}

const storage = new NetlifyMemStorage();

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API Routes
app.get('/api/compliance/stats', async (req, res) => {
  try {
    const stats = await storage.getComplianceStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch compliance stats" });
  }
});

app.get('/api/ai-systems', async (req, res) => {
  try {
    const systems = await storage.getAiSystems();
    res.json(systems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch AI systems" });
  }
});

app.post('/api/ai-systems', async (req, res) => {
  try {
    const system = await storage.createAiSystem(req.body);
    res.status(201).json(system);
  } catch (error) {
    res.status(400).json({ message: "Invalid system data" });
  }
});

app.patch('/api/ai-systems/:id/status', async (req, res) => {
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

app.get('/api/violations', async (req, res) => {
  try {
    const violations = await storage.getPolicyViolations();
    res.json(violations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch violations" });
  }
});

app.post('/api/violations', async (req, res) => {
  try {
    const violation = await storage.createPolicyViolation(req.body);
    res.status(201).json(violation);
  } catch (error) {
    res.status(400).json({ message: "Invalid violation data" });
  }
});

app.post('/api/verify/dna', async (req, res) => {
  try {
    const { signature, face_id, handwriting } = req.body;
    
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

app.post('/api/enforce/policy', async (req, res) => {
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

app.post('/api/contact/verify', async (req, res) => {
  try {
    const { email, purpose, details } = req.body;
    
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

export const handler = serverless(app);