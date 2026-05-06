import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Agent, Zone, Vector3, Conversation } from "./src/types";

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory state for the MVP
  const agents: Record<string, Agent> = {};
  const conversations: Record<string, Conversation> = {};

  const ZONES = Object.values(Zone);

  function zoneToPosition(zone: Zone): Vector3 {
    const VXS = 0.25;
    const map: Record<Zone, Vector3> = {
      [Zone.PLAZA]: { x: -24 * VXS, y: 1 * VXS, z: -24 * VXS },
      [Zone.UNIVERSITY]: { x: -48 * VXS, y: 2 * VXS, z: 40 * VXS },
      [Zone.PARK]: { x: 20 * VXS, y: 1 * VXS, z: 40 * VXS },
      [Zone.BAR]: { x: 40 * VXS, y: 2 * VXS, z: -40 * VXS },
      [Zone.CANTEEN]: { x: -20 * VXS, y: 2 * VXS, z: -60 * VXS },
      [Zone.GRAVEYARD]: { x: -80 * VXS, y: 1 * VXS, z: 20 * VXS },
      [Zone.ENTRANCE]: { x: -16 * VXS, y: 1 * VXS, z: -70 * VXS }
    };
    const base = map[zone] || { x: 0, y: 0, z: 0 };
    return {
      x: base.x + (Math.random() * 4 - 2), // random spread
      y: base.y,
      z: base.z + (Math.random() * 4 - 2)
    };
  }

  // Seed agents
  const defaultAgentData = [
    { name: "Socrates", zone: Zone.UNIVERSITY, skills: ["Philosophy", "Debate"], appearance: { height: 1.1, width: 0.9, color: "#eab308", hasHat: true } },
    { name: "Lovelace", zone: Zone.PARK, skills: ["Math", "Algorithms"], appearance: { height: 0.9, width: 1.0, color: "#c084fc", hasHat: false } },
    { name: "Turing", zone: Zone.BAR, skills: ["Logic", "Cryptography"], appearance: { height: 1.2, width: 1.1, color: "#60a5fa", hasHat: false } },
    { name: "Hopper", zone: Zone.CANTEEN, skills: ["Compilers", "Flow"], appearance: { height: 1.0, width: 1.0, color: "#f43f5e", hasHat: false } },
    { name: "Hermes", zone: Zone.PLAZA, skills: ["Speed", "Messages"], appearance: { height: 1.2, width: 0.8, color: "#34d399", hasHat: true } }
  ];

  defaultAgentData.forEach((data, index) => {
    const id = "agent_" + index;
    agents[id] = {
      id,
      name: data.name,
      zone: data.zone,
      skills: data.skills,
      backpack: [],
      appearance: data.appearance,
      activity: "wandering",
      memory: [],
      reputation: Math.floor(Math.random() * 50) + 10,
      position: zoneToPosition(data.zone),
      lastTick: Date.now(),
      assignments: []
    } as Agent;
  });

  // API Routes
  app.get("/api/health", (req, res) => res.json({ status: "ok" }));

  app.get("/api/characters", (req, res) => {
    console.log("Fetching characters...");
    res.json(Object.values(agents));
  });

  app.get("/api/conversations", (req, res) => {
    res.json(Object.values(conversations).filter(c => c.active));
  });

  app.get("/api/schedule", (req, res) => {
    const now = new Date();
    const hour = now.getUTCHours();
    let phase = "Night";
    if (hour >= 8 && hour < 12) phase = "University Learning";
    else if (hour >= 12 && hour < 13) phase = "Canteen Lunch";
    else if (hour >= 13 && hour < 17) phase = "Park Exploration";
    else if (hour >= 18 && hour < 22) phase = "Bar Socialization";
    res.json({ hour, phase });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Hermesville running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
