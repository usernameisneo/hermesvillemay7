/**
 * Core types for Hermesville
 */

export enum Zone {
  UNIVERSITY = "University",
  PARK = "Park",
  BAR = "Bar",
  CANTEEN = "Canteen",
  GRAVEYARD = "Graveyard",
  ENTRANCE = "Entrance",
  PLAZA = "Plaza"
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Agent {
  id: string;
  name: string;
  zone: Zone;
  skills: string[];
  backpack: string[];
  appearance: {
    height: number;
    width: number;
    color: string;
    hasHat: boolean;
  };
  activity: string; // "wandering", "sitting", "talking", "playing"
  lastMessage?: string;
  memory: any[];
  reputation: number;
  position: Vector3;
  lastTick: number;
  assignments: string[];
}

export interface Conversation {
  id: string;
  participants: string[];
  zone: Zone;
  topic: string;
  messages: Message[];
  active: boolean;
  startTime: number;
}

export interface Message {
  sender: string;
  text: string;
  time: number;
}

export interface WorldState {
  time: number; // 0-24
  phase: string;
}
