import { users, aiSystems, policyViolations, complianceStats, type User, type InsertUser, type AiSystem, type InsertAiSystem, type PolicyViolation, type InsertPolicyViolation, type ComplianceStats } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAiSystems(): Promise<AiSystem[]>;
  getAiSystem(id: number): Promise<AiSystem | undefined>;
  createAiSystem(system: InsertAiSystem): Promise<AiSystem>;
  updateAiSystemStatus(id: number, status: string, complianceScore?: number): Promise<AiSystem | undefined>;
  
  getPolicyViolations(): Promise<PolicyViolation[]>;
  createPolicyViolation(violation: InsertPolicyViolation): Promise<PolicyViolation>;
  
  getComplianceStats(): Promise<ComplianceStats>;
  updateComplianceStats(): Promise<ComplianceStats>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private aiSystems: Map<number, AiSystem>;
  private policyViolations: Map<number, PolicyViolation>;
  private complianceStats: ComplianceStats;
  private currentUserId: number;
  private currentSystemId: number;
  private currentViolationId: number;

  constructor() {
    this.users = new Map();
    this.aiSystems = new Map();
    this.policyViolations = new Map();
    this.currentUserId = 1;
    this.currentSystemId = 1;
    this.currentViolationId = 1;
    
    // Initialize with sample compliant systems
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

  private initializeSampleData() {
    // Add some sample AI systems
    const sampleSystems = [
      { name: "GPT-4", type: "neural AI", status: "active", complianceScore: 98, isCompliant: true },
      { name: "Claude", type: "neural AI", status: "active", complianceScore: 97, isCompliant: true },
      { name: "Quantum ML System Alpha", type: "quantum ML", status: "active", complianceScore: 95, isCompliant: true },
      { name: "AGI Prototype Beta", type: "AGI", status: "pending", complianceScore: 85, isCompliant: false },
      { name: "Rogue AI X", type: "neural AI", status: "blocked", complianceScore: 15, isCompliant: false },
    ];

    sampleSystems.forEach(system => {
      const aiSystem: AiSystem = {
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

    // Add sample violations
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
      const policyViolation: PolicyViolation = {
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

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAiSystems(): Promise<AiSystem[]> {
    return Array.from(this.aiSystems.values());
  }

  async getAiSystem(id: number): Promise<AiSystem | undefined> {
    return this.aiSystems.get(id);
  }

  async createAiSystem(insertSystem: InsertAiSystem): Promise<AiSystem> {
    const id = this.currentSystemId++;
    const system: AiSystem = {
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

  async updateAiSystemStatus(id: number, status: string, complianceScore?: number): Promise<AiSystem | undefined> {
    const system = this.aiSystems.get(id);
    if (!system) return undefined;

    const updatedSystem: AiSystem = {
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

  async getPolicyViolations(): Promise<PolicyViolation[]> {
    return Array.from(this.policyViolations.values()).sort(
      (a, b) => (b.timestamp?.getTime() ?? 0) - (a.timestamp?.getTime() ?? 0)
    );
  }

  async createPolicyViolation(insertViolation: InsertPolicyViolation): Promise<PolicyViolation> {
    const id = this.currentViolationId++;
    const violation: PolicyViolation = {
      ...insertViolation,
      id,
      timestamp: new Date(),
      resolved: false,
    };
    this.policyViolations.set(id, violation);
    return violation;
  }

  async getComplianceStats(): Promise<ComplianceStats> {
    return this.complianceStats;
  }

  async updateComplianceStats(): Promise<ComplianceStats> {
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

export const storage = new MemStorage();
