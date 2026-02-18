/* eslint-disable */
/**
 * Generated API.
 * This is a mock/stub file for local development without Convex backend.
 */

import { makeFunctionReference } from "convex/server";

// Type definitions for the API
type EmptyObject = Record<string, never>;

// Mock API object that mirrors the Convex schema
export const api = {
  activities: {
    list: "activities:list" as any,
    create: "activities:create" as any,
  },
  calendarEvents: {
    list: "calendarEvents:list" as any,
    create: "calendarEvents:create" as any,
    update: "calendarEvents:update" as any,
    remove: "calendarEvents:remove" as any,
  },
  tasks: {
    list: "tasks:list" as any,
    create: "tasks:create" as any,
    update: "tasks:update" as any,
    remove: "tasks:remove" as any,
  },
  contentDrafts: {
    list: "contentDrafts:list" as any,
    create: "contentDrafts:create" as any,
    update: "contentDrafts:update" as any,
    remove: "contentDrafts:remove" as any,
  },
  ecosystemProducts: {
    list: "ecosystemProducts:list" as any,
    getBySlug: "ecosystemProducts:getBySlug" as any,
    create: "ecosystemProducts:create" as any,
    update: "ecosystemProducts:update" as any,
  },
  chat: {
    listSessions: "chat:listSessions" as any,
    getMessages: "chat:getMessages" as any,
    createSession: "chat:createSession" as any,
    sendMessage: "chat:sendMessage" as any,
  },
  contacts: {
    list: "contacts:list" as any,
    create: "contacts:create" as any,
    update: "contacts:update" as any,
  },
  seed: {
    seedAll: "seed:seedAll" as any,
  },
} as const;

export const internal = {} as const;
