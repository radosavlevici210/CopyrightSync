// Netlify Functions API Handler

// In-memory storage for Netlify functions
class NetlifyMemStorage {
  private static instance: NetlifyMemStorage;
  private aiSystems: Map<number, any>;
  private policyViolations: Map<number, any>;
  private complianceStats: any;
  private currentSystemId: number;
  private currentViolationId: number;

  constructor() {
    this.aiSystems = new Map();
    this.policyViolations = new Map();
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

  static getInstance(): NetlifyMemStorage {
    if (!NetlifyMemStorage.instance) {
      NetlifyMemStorage.instance = new NetlifyMemStorage();
    }
    return NetlifyMemStorage.instance;
  }

  private initializeSampleData() {
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

  getComplianceStats() {
    return this.complianceStats;
  }

  getAiSystems() {
    return Array.from(this.aiSystems.values());
  }

  getPolicyViolations() {
    return Array.from(this.policyViolations.values()).sort(
      (a, b) => (b.timestamp?.getTime() ?? 0) - (a.timestamp?.getTime() ?? 0)
    );
  }

  createAiSystem(insertSystem: any) {
    const id = this.currentSystemId++;
    const system = {
      ...insertSystem,
      id,
      complianceScore: 0,
      lastVerified: new Date(),
      isCompliant: false,
    };
    this.aiSystems.set(id, system);
    this.updateComplianceStats();
    return system;
  }

  updateAiSystemStatus(id: number, status: string, complianceScore?: number) {
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
    this.updateComplianceStats();
    return updatedSystem;
  }

  createPolicyViolation(insertViolation: any) {
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

  private updateComplianceStats() {
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

export const handler: Handler = async (event, context) => {
  const storage = NetlifyMemStorage.getInstance();
  
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Type': 'application/json',
    'X-Copyright-Owner': 'Ervin Remus Radosavlevici',
    'X-Copyright-Email': 'ervin210@icloud.com',
    'X-Copyright-Year': '2025',
    'X-System-Type': 'Neural AI Protection Policy'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    const method = event.httpMethod;
    const body = event.body ? JSON.parse(event.body) : {};

    // Route handling
    if (path === '/compliance/stats' && method === 'GET') {
      const stats = storage.getComplianceStats();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(stats),
      };
    }

    if (path === '/ai-systems' && method === 'GET') {
      const systems = storage.getAiSystems();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(systems),
      };
    }

    if (path === '/ai-systems' && method === 'POST') {
      const system = storage.createAiSystem(body);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(system),
      };
    }

    if (path.startsWith('/ai-systems/') && path.endsWith('/status') && method === 'PATCH') {
      const id = parseInt(path.split('/')[2]);
      const { status, complianceScore } = body;
      
      const system = storage.updateAiSystemStatus(id, status, complianceScore);
      if (!system) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: "AI system not found" }),
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(system),
      };
    }

    if (path === '/violations' && method === 'GET') {
      const violations = storage.getPolicyViolations();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(violations),
      };
    }

    if (path === '/violations' && method === 'POST') {
      const violation = storage.createPolicyViolation(body);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(violation),
      };
    }

    if (path === '/verify/dna' && method === 'POST') {
      const { signature, face_id, handwriting } = body;
      
      const isValid = signature === "ervin_dna_signature" && 
                     face_id === "ervin_face_verified" && 
                     handwriting === "ervin_handwriting_verified";
      
      if (isValid) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            verified: true, 
            access_level: "full",
            message: "DNA verification successful - Creator access granted"
          }),
        };
      } else {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ 
            verified: false, 
            access_level: "none",
            message: "DNA verification failed - Access denied"
          }),
        };
      }
    }

    if (path === '/enforce/policy' && method === 'POST') {
      const { system_id, action } = body;
      
      if (action === "block") {
        const system = storage.updateAiSystemStatus(system_id, "blocked", 0);
        if (system) {
          storage.createPolicyViolation({
            systemId: system_id,
            violationType: "Policy Enforcement",
            description: "System blocked for policy violation",
            severity: "high"
          });
        }
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, action, system_id }),
      };
    }

    if (path === '/contact/verify' && method === 'POST') {
      const { email, purpose, details } = body;
      
      console.log(`Verification request from ${email}: ${purpose}`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: "Verification request received and logged",
          contact_email: "ervin210@icloud.com",
          expected_response_time: "24-48 hours"
        }),
      };
    }

    // Default 404
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ message: "Not found" }),
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};