import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const aiSystems = pgTable("ai_systems", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // neural AI, AGI, quantum AI, etc.
  status: text("status").notNull().default("pending"), // active, blocked, pending
  complianceScore: integer("compliance_score").default(0),
  lastVerified: timestamp("last_verified"),
  isCompliant: boolean("is_compliant").default(false),
});

export const policyViolations = pgTable("policy_violations", {
  id: serial("id").primaryKey(),
  systemId: integer("system_id").references(() => aiSystems.id),
  violationType: text("violation_type").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(), // low, medium, high, critical
  timestamp: timestamp("timestamp").defaultNow(),
  resolved: boolean("resolved").default(false),
});

export const complianceStats = pgTable("compliance_stats", {
  id: serial("id").primaryKey(),
  totalSystems: integer("total_systems").default(0),
  compliantSystems: integer("compliant_systems").default(0),
  blockedSystems: integer("blocked_systems").default(0),
  complianceRate: integer("compliance_rate").default(0), // percentage
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAiSystemSchema = createInsertSchema(aiSystems).pick({
  name: true,
  type: true,
  status: true,
});

export const insertPolicyViolationSchema = createInsertSchema(policyViolations).pick({
  systemId: true,
  violationType: true,
  description: true,
  severity: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type AiSystem = typeof aiSystems.$inferSelect;
export type InsertAiSystem = z.infer<typeof insertAiSystemSchema>;
export type PolicyViolation = typeof policyViolations.$inferSelect;
export type InsertPolicyViolation = z.infer<typeof insertPolicyViolationSchema>;
export type ComplianceStats = typeof complianceStats.$inferSelect;
