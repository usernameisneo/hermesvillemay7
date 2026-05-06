/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Float, ContactShadows, Environment, Sky, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Users, BookOpen, Beer, Ghost, Coffee, Info, ChevronRight, Activity, Crosshair, X } from 'lucide-react';
import { Zone, Agent, Vector3 } from './types';
import { University, Park, Bar, Canteen, Graveyard, ClockTower, EntranceGate, CentralPlaza, UniversityV2, ParkV2, BarV2, CanteenV2, GraveyardV2, ClockTowerV2, EntranceGateV2, CentralPlazaV2, VBox, vc } from './components/WorldElements';

const VXS = 0.25;

// --- Components ---

function Box({ position, size = [1, 1, 1], color = "#ffffff", opacity = 1, transparent = false }: any) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} opacity={opacity} transparent={transparent} />
    </mesh>
  );
}

function ZoneModule({ zone, position, color, label }: { zone: Zone, position: [number, number, number], color: string, label: string }) {
  // Generate random voxel clutter for "detailed" look
  const clutter = useRef(Array.from({ length: 15 }, () => ({
    pos: [Math.random() * 8 - 4, Math.random() * 4, Math.random() * 8 - 4],
    size: [0.2 + Math.random() * 0.4, 0.2 + Math.random() * 0.4, 0.2 + Math.random() * 0.4],
    color: Math.random() > 0.5 ? color : "#cbd5e1"
  })));

  return (
    <group position={position}>
      {/* Foundation */}
      <Box position={[0, -0.4, 0]} size={[10.5, 0.2, 10.5]} color="#334155" />
      
      <group>
        {/* Exterior Walls with "Voxel" variation */}
        <Box receiveShadow castShadow position={[-4, 2, 0]} size={[0.4, 4, 8]} color={color} />
        <Box receiveShadow castShadow position={[4, 2, 0]} size={[0.4, 4, 8]} color={color} />
        <Box receiveShadow castShadow position={[0, 2, 4]} size={[8, 4, 0.4]} color={color} />
        
        {/* Column details */}
        <Box receiveShadow castShadow position={[-4, 2, -4]} size={[0.8, 4.5, 0.8]} color="#475569" />
        <Box receiveShadow castShadow position={[4, 2, -4]} size={[0.8, 4.5, 0.8]} color="#475569" />

        {/* Windows (Cutouts) */}
        <Box position={[4, 2.5, 1]} size={[0.5, 1.2, 1.5]} color="#4fc3f7" opacity={0.6} transparent={true} />
        <Box position={[4, 2.5, -2]} size={[0.5, 1.2, 1.5]} color="#4fc3f7" opacity={0.6} transparent={true} />

        {/* Roof Structure */}
        <Box receiveShadow castShadow position={[0, 4.2, 0]} size={[9, 0.5, 9]} color="#1e293b" />
        <Box receiveShadow castShadow position={[0, 4.8, 0]} size={[4, 0.8, 4]} color={color} />

        {/* Interior Elements */}
        {zone === Zone.UNIVERSITY && (
          <group>
            {[...Array(4)].map((_, i) => (
              <Box key={i} position={[-2 + (i % 2) * 4, 0.5, 1 + Math.floor(i / 2) * 2]} size={[1.2, 0.4, 0.8]} color="#5d4037" />
            ))}
            <Box position={[0, 1.5, 3.8]} size={[5, 2.5, 0.1]} color="#1b5e20" /> {/* Large Chalkboard */}
          </group>
        )}

        {zone === Zone.CANTEEN && (
          <group>
            <Box position={[-2, 0.8, -2]} size={[3, 0.1, 1]} color="#fff" /> {/* Counter Top */}
            <Box position={[2, 0.4, 2]} size={[2, 0.1, 2]} color="#444" /> {/* Table */}
          </group>
        )}

        {/* Voxel Clutter/Details */}
        {clutter.current.map((c, i) => (
          <Box key={i} position={c.pos} size={c.size} color={c.color} />
        ))}
      </group>
      
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <Text
          position={[0, 7, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
        >
          {label}
        </Text>
      </Float>
    </group>
  );
}

function AgentNPC({ agent, isFollowing, onSelect }: { agent: Agent, isFollowing: boolean, onSelect: () => void }) {
  const meshRef = useRef<THREE.Group>(null);
  const targetPos = useRef(new THREE.Vector3(agent.position.x, 0.5, agent.position.z));
  const appearance = agent.appearance || { height: 1, width: 1, color: "#4FC3F7", hasHat: false };

  useEffect(() => {
    targetPos.current.set(agent.position.x, 0.5 * appearance.height, agent.position.z);
  }, [agent.position.x, agent.position.z, appearance.height]);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerp(targetPos.current, 0.1);
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={[agent.position.x, 0.5 * appearance.height, agent.position.z]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <mesh castShadow>
        <capsuleGeometry args={[0.3 * appearance.width, 0.7 * appearance.height, 4, 8]} />
        <meshStandardMaterial 
          color={appearance.color} 
          emissive={appearance.color} 
          emissiveIntensity={isFollowing ? 0.8 : 0.2} 
        />
      </mesh>
      
      {/* Visual Accessories: Hat proxy */}
      {appearance.hasHat && (
        <mesh position={[0, 0.5 * appearance.height, 0]}>
          <cylinderGeometry args={[0.35 * appearance.width, 0.35 * appearance.width, 0.1, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      )}

      {/* Chat Bubble */}
      {agent.lastMessage && (
        <Html position={[0, 1.5 * appearance.height, 0]} center>
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/95 backdrop-blur-md text-black px-3 py-1.5 rounded-2xl rounded-bl-none shadow-xl border-2 border-red-600 whitespace-nowrap min-w-[120px]"
          >
            <p className="text-[10px] font-bold text-cyan-600 mb-0.5">{agent.name}</p>
            <p className="text-[12px] font-medium leading-tight">{agent.lastMessage}</p>
          </motion.div>
        </Html>
      )}
      
      {/* Target Marker */}
      {isFollowing && (
        <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1, 32]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
}

function FollowCamera({ agent, controls }: { agent: Agent, controls: any }) {
  useFrame(() => {
    if (!agent) return;
    const target = new THREE.Vector3(agent.position.x, 1, agent.position.z);
    
    if (controls) {
      controls.target.lerp(target, 0.1);
      controls.update();
    }
  });
  return null;
}

const UIOverlay = ({ agents, schedule, followingId, onResetCamera, onSelectAgent, showAreas, setShowAreas }: { agents: Agent[], schedule: any, followingId: string | null, onResetCamera: () => void, onSelectAgent: (id: string | null) => void, showAreas: boolean, setShowAreas: (v: boolean) => void }) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showRegistry, setShowRegistry] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 overflow-hidden">
      {/* Top Header */}
      <div className="flex justify-between items-start pointer-events-auto">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-blue-500/90 backdrop-blur-md border border-red-500 p-4 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
        >
          <h1 className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
            <Activity className="text-red-400" /> HERMESVILLE
          </h1>
          <p className="text-[10px] text-white/70 font-mono uppercase tracking-widest mt-1">
            Status: Simulation Active • {schedule?.phase || "Loading..."}
          </p>
        </motion.div>

        <div className="flex gap-4 items-start">
          <button
            onClick={() => setShowAreas(!showAreas)}
            className="bg-green-500/90 text-white border border-green-300 px-4 py-2 font-bold text-[9px] shadow-lg pointer-events-auto uppercase mr-2"
          >
            {showAreas ? 'HIDE AREAS' : 'SHOW AREAS'}
          </button>
          <button
            onClick={() => setShowRegistry(!showRegistry)}
            className="bg-blue-500/90 text-white border border-red-500 px-4 py-2 font-bold text-[9px] shadow-lg pointer-events-auto uppercase"
          >
            {showRegistry ? 'HIDE REGISTRY' : 'SHOW REGISTRY'}
          </button>
          
          {followingId && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={onResetCamera}
              className="bg-red-500 text-white border border-red-300 px-4 py-2 flex items-center gap-2 font-bold text-[9px] shadow-lg hover:bg-red-400 transition-colors pointer-events-auto uppercase"
            >
              <Crosshair size={14} /> FREE CAMERA
            </motion.button>
          )}
          <div className="bg-blue-500/80 backdrop-blur-sm p-3 border border-red-500 text-right shadow-lg">
            <span className="text-[9px] text-white/60 block uppercase tracking-tighter font-bold">Agents Online</span>
            <span className="text-xl font-mono text-white">{agents.length}</span>
          </div>
        </div>
      </div>

      {/* Side Content */}
      <div className="flex flex-1 justify-end items-center py-12">
        <motion.div 
          layout
          className={`pointer-events-auto space-y-3 w-72 ${showRegistry ? '' : 'hidden'}`}
        >
          <h3 className="text-[9px] font-black text-white px-2 flex items-center gap-2 tracking-widest uppercase">
            <Users size={14} className="text-red-500" /> ACTIVE_REGISTRY
          </h3>
          <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-2 custom-scrollbar pointer-events-auto">
            {Array.isArray(agents) && agents.map((agent) => (
              <motion.button
                key={agent.id}
                whileHover={{ backgroundColor: "rgba(239,68,68,0.1)" }}
                onClick={() => {
                  setSelectedAgent(agent);
                  onSelectAgent(agent.id);
                }}
                className={`w-full bg-blue-500/60 backdrop-blur-sm border border-red-500/60 p-3 text-left transition-colors flex items-center justify-between ${followingId === agent.id ? 'bg-red-600/40 border-red-400' : ''}`}
              >
                <div>
                  <div className="text-[9px] font-bold text-white uppercase">{agent.name}</div>
                  <div className="text-[9px] text-white/60 font-mono italic flex items-center gap-1 uppercase">
                    <span className={`w-1.5 h-1.5 ${agent.activity === 'wandering' ? 'bg-white/40' : 'bg-red-400'}`} />
                    {agent.activity} • {agent.zone}</div>
                </div>
                <ChevronRight size={14} className={followingId === agent.id ? "text-white" : "text-white/20"} />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Display */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="pointer-events-auto bg-blue-600/95 backdrop-blur-2xl border-t border-red-500 p-8 rounded-t-[3rem] -mx-6 -mb-6 shadow-[0_-20px_50px_rgba(239,68,68,0.2)]"
          >
            <div className="max-w-4xl mx-auto flex gap-8">
              <div 
                className="w-32 h-32 rounded-3xl flex items-center justify-center border border-red-500/30 bg-blue-400/20 shadow-inner"
              >
                <Users size={64} style={{ color: selectedAgent.appearance.color }} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{selectedAgent.name}</h2>
                    <p className="text-red-400 font-mono text-xs mt-1 uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                       <MapPin size={12} strokeWidth={3} /> {selectedAgent.zone} • {selectedAgent.activity}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedAgent(null);
                      if (followingId === selectedAgent.id) onResetCamera();
                    }}
                    className="p-2 bg-red-600/20 hover:bg-red-600/40 text-white rounded-full transition-all border border-red-500/40"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-blue-400/20 p-4 rounded-2xl border border-red-500/30">
                    <span className="text-white/60 text-[10px] block mb-3 uppercase tracking-widest font-black">Memory Context</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAgent.skills.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-red-600/40 text-white rounded-lg text-[10px] border border-red-400/40">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-400/20 p-4 rounded-2xl border border-red-500/30">
                    <span className="text-white/60 text-[10px] block mb-3 uppercase tracking-widest font-black">Simulation Data</span>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-mono font-black text-white">{selectedAgent.reputation}</span>
                      <span className="text-[10px] text-red-400 font-mono mb-2 decoration-white underline decoration-2 font-bold">HXP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [schedule, setSchedule] = useState<any>(null);
  const [followingId, setFollowingId] = useState<string | null>(null);
  const [showAreas, setShowAreas] = useState<boolean>(false);
  const controlsRef = useRef<any>(null);

  const followingAgent = agents.find(a => a.id === followingId);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const [agentsRes, scheduleRes] = await Promise.all([
          fetch('/api/characters'),
          fetch('/api/schedule')
        ]);
        if (!mounted) return;
        
        if (!agentsRes.ok || !scheduleRes.ok) {
          throw new Error(`Server returned error: ${agentsRes.status} ${scheduleRes.status}`);
        }
        
        const agentsData = await agentsRes.json();
        const scheduleData = await scheduleRes.json();
        
        if (Array.isArray(agentsData)) {
          setAgents(agentsData);
        }
        setSchedule(scheduleData);
      } catch (err) {
        console.error("Failed to fetch world state", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); // Faster polling for chat
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-300 via-blue-500 to-indigo-600 overflow-hidden text-white">
      <div className="absolute inset-0">
        <Canvas shadows gl={{ antialias: true }}>
          <Suspense fallback={
            <Html center>
              <div className="text-white font-mono text-xs tracking-widest bg-blue-500 p-2 rounded">
                HERMESVILLE_CONNECTING...
              </div>
            </Html>
          }>
            <PerspectiveCamera makeDefault position={[30, 30, 30]} fov={50} />
            <OrbitControls 
              ref={controlsRef}
              enablePan={!followingId} 
              maxPolarAngle={Math.PI / 2.1} 
              minDistance={1} 
              maxDistance={1000} 
              makeDefault
            />
            
            {followingAgent && <FollowCamera agent={followingAgent} controls={controlsRef.current} />}
            
            <color attach="background" args={["#3b82f6"]} />
            
            <ambientLight intensity={0.6} />
            <pointLight position={[100, 100, 100]} intensity={0.8} />
            <directionalLight 
              position={[-50, 80, 50]} 
              intensity={1.0} 
              castShadow 
              shadow-mapSize={[1024, 1024]}
            />

            <group>
               {/* Darker ground for visibility without blowout */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <planeGeometry args={[320, 320]} />
                <meshStandardMaterial color="#1e3a5f" roughness={0.9} />
              </mesh>

              {/* Walkways base ground to tie it all together */}
              <mesh position={[0, (-2 + 1/2) * VXS, 0]} receiveShadow>
                <boxGeometry args={[200 * VXS, 1 * VXS, 200 * VXS]} />
                <meshStandardMaterial color={vc.ground_dark} roughness={0.9} />
              </mesh>

              <University position={[-48 * VXS, 0, 80 * VXS]} />
              <Park position={[-80 * VXS, 0, 0]} />
              <Bar position={[64 * VXS, 0, -40 * VXS]} rotation={[0, Math.PI, 0]} />
              <Canteen position={[0 * VXS, 0, -80 * VXS]} />
              <Graveyard position={[-112 * VXS, 0, 0]} />
              <ClockTower position={[0 * VXS, 0, 0 * VXS]} />
              <EntranceGate position={[0 * VXS, 0, -52 * VXS]} />
              <CentralPlaza position={[-24 * VXS, 0, -24 * VXS]} />
              
              {showAreas && (
                <group>
                  <Text position={[-48 * VXS, 5, 80 * VXS]} fontSize={4} color="white" outlineColor="black" outlineWidth={0.2}>University</Text>
                  <Text position={[-80 * VXS, 5, 0]} fontSize={4} color="white" outlineColor="black" outlineWidth={0.2}>Park</Text>
                  <Text position={[64 * VXS, 5, -40 * VXS]} fontSize={4} color="white" outlineColor="black" outlineWidth={0.2}>Bar</Text>
                  <Text position={[0, 5, -80 * VXS]} fontSize={4} color="white" outlineColor="black" outlineWidth={0.2}>Canteen</Text>
                  <Text position={[-112 * VXS, 5, 0]} fontSize={4} color="white" outlineColor="black" outlineWidth={0.2}>Graveyard</Text>
                  <Text position={[0, 5, 0]} fontSize={4} color="white" outlineColor="black" outlineWidth={0.2}>ClockTower</Text>
                  <Text position={[0, 5, -52 * VXS]} fontSize={4} color="white" outlineColor="black" outlineWidth={0.2}>Entrance</Text>
                  <Text position={[-24 * VXS, 5, -24 * VXS]} fontSize={4} color="white" outlineColor="black" outlineWidth={0.2}>Plaza</Text>
                </group>
              )}
            </group>

            {Array.isArray(agents) && agents.map(agent => (
              <AgentNPC 
                key={agent.id} 
                agent={agent} 
                isFollowing={followingId === agent.id}
                onSelect={() => setFollowingId(agent.id)}
              />
            ))}

            <gridHelper args={[400, 80, "#3b82f6", "#93c5fd"]} position={[0, -0.4, 0]} />
          </Suspense>
        </Canvas>
      </div>

      <UIOverlay 
        agents={agents} 
        schedule={schedule} 
        followingId={followingId} 
        onResetCamera={() => setFollowingId(null)}
        onSelectAgent={setFollowingId}
        showAreas={showAreas}
        setShowAreas={setShowAreas}
      />


      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
}
