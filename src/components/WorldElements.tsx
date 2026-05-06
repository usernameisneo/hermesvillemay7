import React from 'react';

const VXS = 0.25;

export const VBox = ({ x, y, z, w, d, h, color, emissive, opacity, metallic = 0.1, roughness = 0.8 }: any) => {
  return (
  <mesh position={[(x + w / 2) * VXS, (y + h / 2) * VXS, (z + d / 2) * VXS]} receiveShadow castShadow>
    <boxGeometry args={[w * VXS, h * VXS, d * VXS]} />
    <meshStandardMaterial
      color={color}
      emissive={emissive || color}
      emissiveIntensity={emissive ? 0.5 : 0}
      transparent={opacity !== undefined && opacity < 1}
      opacity={opacity !== undefined ? opacity : 1}
      roughness={roughness}
      metalness={metallic}
    />
  </mesh>
  );
};

export const vc = {
  stone_white: '#FDE68A',
  stone_grey: '#A78BFA',
  ground_dark: '#34D399',
  iron_dark: '#F472B6',
  roof_red: '#EF4444',
  light_warm: '#FBBF24',
  leaf_dark: '#10B981',
  leaf_mid: '#34D399',
  moss_deep: '#059669',
  earth_brown: '#F59E0B',
  water_deep: '#3B82F6',
  wall_black: '#6366F1',
  metal_silver: '#93C5FD',
  accent_red: '#F43F5E',
  screen_blue: '#2DD4BF',
  stone_light: '#C4B5FD',
  wood_rotten: '#B45309',
  gold_faded: '#FCD34D',
  ghost: '#F3F4F6',
};

export const vc2 = {
  stone_white: '#FEF08A',
  stone_grey: '#C084FC',
  ground_dark: '#10B981',
  iron_dark: '#FB7185',
  roof_red: '#F87171',
  light_warm: '#FCD34D',
  leaf_dark: '#059669',
  leaf_mid: '#10B981',
  moss_deep: '#047857',
  earth_brown: '#D97706',
  water_deep: '#60A5FA',
  wall_black: '#818CF8',
  metal_silver: '#BFDBFE',
  accent_red: '#FB923C',
  screen_blue: '#5EEAD4',
  stone_light: '#DDD6FE',
  wood_rotten: '#D97706',
  gold_faded: '#FDE047',
  ghost: '#F9FAFB',
};

export const University = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={0} y={0} w={384} d={384} h={4} color={vc.stone_grey} />
      <VBox x={0} z={0} y={4} w={96} d={96} h={1} color={vc.ground_dark} />
      <VBox x={18} z={38} y={5} w={60} d={20} h={32} color={vc.stone_white} />
      <VBox x={18} z={18} y={5} w={16} d={16} h={40} color={vc.stone_white} />
      <VBox x={62} z={18} y={5} w={16} d={16} h={40} color={vc.stone_white} />
      <VBox x={18} z={38} y={37} w={60} d={20} h={8} color={vc.roof_red} />
      <VBox x={18} z={18} y={45} w={16} d={16} h={6} color={vc.roof_red} />
      <VBox x={62} z={18} y={45} w={16} d={16} h={6} color={vc.roof_red} />
      <VBox x={24.5} z={24.5} y={51} w={3} d={3} h={12} color={vc.iron_dark} />
      <VBox x={68.5} z={24.5} y={51} w={3} d={3} h={12} color={vc.iron_dark} />
      <VBox x={38} z={68} y={37} w={20} d={20} h={10} color={vc.light_warm} emissive={vc.light_warm} opacity={0.6} />
      <VBox x={45} z={38} y={5} w={6} d={2} h={8} color={vc.iron_dark} />
    </group>
  );
};

export const UniversityV2 = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={0} y={0} w={768} d={768} h={8} color={vc2.stone_grey} />
      <VBox x={0} z={0} y={8} w={192} d={192} h={2} color={vc2.ground_dark} />
      <VBox x={36} z={76} y={10} w={120} d={40} h={64} color={vc2.stone_white} />
      <VBox x={36} z={36} y={10} w={32} d={32} h={80} color={vc2.stone_white} />
      <VBox x={124} z={36} y={10} w={32} d={32} h={80} color={vc2.stone_white} />
      <VBox x={36} z={76} y={74} w={120} d={40} h={16} color={vc2.roof_red} />
      <VBox x={36} z={36} y={90} w={32} d={32} h={12} color={vc2.roof_red} />
      <VBox x={124} z={36} y={90} w={32} d={32} h={12} color={vc2.roof_red} />
      <VBox x={49} z={49} y={102} w={6} d={6} h={24} color={vc2.iron_dark} />
      <VBox x={137} z={49} y={102} w={6} d={6} h={24} color={vc2.iron_dark} />
      <VBox x={76} z={136} y={74} w={40} d={40} h={20} color={vc2.light_warm} emissive={vc2.light_warm} opacity={0.6} />
      <VBox x={90} z={76} y={10} w={12} d={4} h={16} color={vc2.iron_dark} />
    </group>
  );
};

export const Park = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={0} y={0} w={320} d={320} h={6} color={vc.earth_brown} />
      <VBox x={20} z={10} y={2} w={40} d={30} h={4} color={vc.water_deep} opacity={0.8} />
      <VBox x={38} z={40} y={6} w={8} d={4} h={20} color={vc.stone_white} emissive={vc.wall_black} />
      <VBox x={0} z={37} y={6} w={80} d={6} h={1} color={vc.stone_grey} />
      <VBox x={10} z={10} y={6} w={6} d={6} h={18} color={vc.leaf_dark} />
      <VBox x={50} z={50} y={6} w={6} d={6} h={18} color={vc.leaf_dark} />
      <VBox x={70} z={20} y={6} w={6} d={6} h={18} color={vc.leaf_dark} />
      <VBox x={10} z={60} y={6} w={12} d={8} h={6} color={vc.stone_grey} />
      <VBox x={4} z={4} y={6} w={3} d={3} h={3} color={vc.moss_deep} />
    </group>
  );
};

export const ParkV2 = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={0} y={0} w={640} d={640} h={12} color={vc2.earth_brown} />
      <VBox x={40} z={20} y={4} w={80} d={60} h={8} color={vc2.water_deep} opacity={0.8} />
      <VBox x={76} z={80} y={12} w={16} d={8} h={40} color={vc2.stone_white} emissive={vc2.wall_black} />
      <VBox x={0} z={74} y={12} w={160} d={12} h={2} color={vc2.stone_grey} />
      <VBox x={20} z={20} y={12} w={12} d={12} h={36} color={vc2.leaf_dark} />
      <VBox x={100} z={100} y={12} w={12} d={12} h={36} color={vc2.leaf_dark} />
      <VBox x={140} z={40} y={12} w={12} d={12} h={36} color={vc2.leaf_dark} />
      <VBox x={20} z={120} y={12} w={24} d={16} h={12} color={vc2.stone_grey} />
      <VBox x={8} z={8} y={12} w={6} d={6} h={6} color={vc2.moss_deep} />
    </group>
  );
};

export const Bar = ({ position, rotation, scale = [1, 1, 1] }: any) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <VBox x={0} z={0} y={0} w={192} d={192} h={2} color={vc.wall_black} />
      <VBox x={0} z={0} y={2} w={48} d={48} h={1} color={vc.iron_dark} />
      <VBox x={0} z={46} y={3} w={48} d={2} h={20} color={vc.wall_black} />
      <VBox x={46} z={0} y={3} w={2} d={48} h={20} color={vc.wall_black} />
      <VBox x={0} z={0} y={3} w={2} d={48} h={20} color={vc.wall_black} />
      <VBox x={0} z={0} y={23} w={48} d={48} h={2} color={vc.iron_dark} />
      <VBox x={14} z={20} y={3} w={20} d={4} h={4} color={vc.wall_black} />
      <VBox x={14} z={20} y={7} w={20} d={4} h={1} color={vc.accent_red} />
      <VBox x={4} z={4} y={3} w={6} d={6} h={6} color={vc.wall_black} />
      <VBox x={38} z={4} y={3} w={6} d={6} h={6} color={vc.wall_black} />
      <VBox x={4} z={38} y={3} w={6} d={6} h={6} color={vc.wall_black} />
      <VBox x={18} z={4} y={3} w={12} d={8} h={2} color={vc.iron_dark} />
      <VBox x={16} z={4} y={5} w={16} d={1} h={9} color={vc.screen_blue} emissive={vc.screen_blue} />
      <VBox x={5} z={5} y={22} w={1} d={1} h={1} color={vc.light_warm} emissive={vc.light_warm} />
      <VBox x={42} z={5} y={22} w={1} d={1} h={1} color={vc.light_warm} emissive={vc.light_warm} />
      <VBox x={22} z={0} y={3} w={4} d={2} h={8} color={vc.iron_dark} />
    </group>
  );
};

export const BarV2 = ({ position, rotation, scale = [1, 1, 1] }: any) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <VBox x={0} z={0} y={0} w={384} d={384} h={4} color={vc2.wall_black} />
      <VBox x={0} z={0} y={4} w={96} d={96} h={2} color={vc2.iron_dark} />
      <VBox x={0} z={92} y={6} w={96} d={4} h={40} color={vc2.wall_black} />
      <VBox x={92} z={0} y={6} w={4} d={96} h={40} color={vc2.wall_black} />
      <VBox x={0} z={0} y={6} w={4} d={96} h={40} color={vc2.wall_black} />
      <VBox x={0} z={0} y={46} w={96} d={96} h={4} color={vc2.iron_dark} />
      <VBox x={28} z={40} y={6} w={40} d={8} h={8} color={vc2.wall_black} />
      <VBox x={28} z={40} y={14} w={40} d={8} h={2} color={vc2.accent_red} />
      <VBox x={8} z={8} y={6} w={12} d={12} h={12} color={vc2.wall_black} />
      <VBox x={76} z={8} y={6} w={12} d={12} h={12} color={vc2.wall_black} />
      <VBox x={8} z={76} y={6} w={12} d={12} h={12} color={vc2.wall_black} />
      <VBox x={36} z={8} y={6} w={24} d={16} h={4} color={vc2.iron_dark} />
      <VBox x={32} z={8} y={10} w={32} d={2} h={18} color={vc2.screen_blue} emissive={vc2.screen_blue} />
      <VBox x={10} z={10} y={44} w={2} d={2} h={2} color={vc2.light_warm} emissive={vc2.light_warm} />
      <VBox x={84} z={10} y={44} w={2} d={2} h={2} color={vc2.light_warm} emissive={vc2.light_warm} />
      <VBox x={44} z={0} y={6} w={8} d={4} h={16} color={vc2.iron_dark} />
    </group>
  );
};

export const Canteen = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={0} y={0} w={160} d={160} h={2} color={vc.stone_grey} />
      <VBox x={0} z={0} y={2} w={40} d={40} h={1} color={vc.stone_white} />
      <VBox x={0} z={0} y={3} w={2} d={40} h={16} color={vc.stone_white} />
      <VBox x={38} z={0} y={3} w={2} d={40} h={16} color={vc.stone_white} />
      <VBox x={0} z={38} y={3} w={40} d={2} h={16} color={vc.stone_white} />
      <VBox x={5} z={0} y={6} w={30} d={1} h={10} color={vc.screen_blue} opacity={0.3} />
      <VBox x={0} z={0} y={19} w={40} d={40} h={2} color={vc.stone_white} />
      <VBox x={17} z={0} y={3} w={6} d={1} h={8} color={vc.iron_dark} />
      <VBox x={5} z={20} y={3} w={30} d={4} h={4} color={vc.metal_silver} />
      <VBox x={8} z={21} y={7} w={2} d={2} h={1} color={vc.accent_red} />
      <VBox x={14} z={21} y={7} w={2} d={2} h={1} color={vc.moss_deep} />
      <VBox x={0} z={28} y={3} w={40} d={2} h={12} color={vc.stone_white} />
      <VBox x={1} z={1} y={18} w={38} d={38} h={1} color={vc.light_warm} emissive={vc.light_warm} opacity={0.4} />
    </group>
  );
};

export const CanteenV2 = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={0} y={0} w={320} d={320} h={4} color={vc2.stone_grey} />
      <VBox x={0} z={0} y={4} w={80} d={80} h={2} color={vc2.stone_white} />
      <VBox x={0} z={0} y={6} w={4} d={80} h={32} color={vc2.stone_white} />
      <VBox x={76} z={0} y={6} w={4} d={80} h={32} color={vc2.stone_white} />
      <VBox x={0} z={76} y={6} w={80} d={4} h={32} color={vc2.stone_white} />
      <VBox x={10} z={0} y={12} w={60} d={2} h={20} color={vc2.screen_blue} opacity={0.3} />
      <VBox x={0} z={0} y={38} w={80} d={80} h={4} color={vc2.stone_white} />
      <VBox x={34} z={0} y={6} w={12} d={2} h={16} color={vc2.iron_dark} />
      <VBox x={10} z={40} y={6} w={60} d={8} h={8} color={vc2.metal_silver} />
      <VBox x={16} z={42} y={14} w={4} d={4} h={2} color={vc2.accent_red} />
      <VBox x={28} z={42} y={14} w={4} d={4} h={2} color={vc2.moss_deep} />
      <VBox x={0} z={56} y={6} w={80} d={4} h={24} color={vc2.stone_white} />
      <VBox x={2} z={2} y={36} w={76} d={76} h={2} color={vc2.light_warm} emissive={vc2.light_warm} opacity={0.4} />
    </group>
  );
};

export const Graveyard = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={0} y={0} w={256} d={256} h={4} color={vc.earth_brown} />
      <VBox x={2} z={2} y={4} w={60} d={2} h={8} color={vc.stone_grey} />
      <VBox x={2} z={60} y={4} w={60} d={2} h={8} color={vc.stone_grey} />
      <VBox x={2} z={2} y={4} w={2} d={60} h={8} color={vc.stone_grey} />
      <VBox x={60} z={2} y={4} w={2} d={60} h={8} color={vc.stone_grey} />
      <VBox x={10} z={15} y={4} w={16} d={12} h={6} color={vc.stone_grey} />
      <VBox x={35} z={40} y={4} w={20} d={8} h={7} color={vc.stone_grey} />
      <VBox x={26} z={26} y={4} w={12} d={12} h={12} color={vc.ground_dark} />
      <VBox x={30} z={30} y={16} w={4} d={4} h={8} color={vc.stone_grey} />
      <VBox x={12} z={12} y={4} w={4} d={4} h={14} color={vc.wood_rotten} />
      <VBox x={50} z={15} y={4} w={5} d={5} h={12} color={vc.wood_rotten} />
      <VBox x={15} z={45} y={3} w={8} d={6} h={2} color={vc.water_deep} />
    </group>
  );
};

export const GraveyardV2 = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={0} y={0} w={512} d={512} h={8} color={vc2.earth_brown} />
      <VBox x={4} z={4} y={8} w={120} d={4} h={16} color={vc2.stone_grey} />
      <VBox x={4} z={120} y={8} w={120} d={4} h={16} color={vc2.stone_grey} />
      <VBox x={4} z={4} y={8} w={4} d={120} h={16} color={vc2.stone_grey} />
      <VBox x={120} z={4} y={8} w={4} d={120} h={16} color={vc2.stone_grey} />
      <VBox x={20} z={30} y={8} w={32} d={24} h={12} color={vc2.stone_grey} />
      <VBox x={70} z={80} y={8} w={40} d={16} h={14} color={vc2.stone_grey} />
      <VBox x={52} z={52} y={8} w={24} d={24} h={24} color={vc2.ground_dark} />
      <VBox x={60} z={60} y={32} w={8} d={8} h={16} color={vc2.stone_grey} />
      <VBox x={24} z={24} y={8} w={8} d={8} h={28} color={vc2.wood_rotten} />
      <VBox x={100} z={30} y={8} w={10} d={10} h={24} color={vc2.wood_rotten} />
      <VBox x={30} z={90} y={6} w={16} d={12} h={4} color={vc2.water_deep} />
    </group>
  );
};

export const ClockTower = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={-16} z={-16} y={0} w={96} d={96} h={2} color={vc.ground_dark} />
      <VBox x={0} z={0} y={2} w={16} d={16} h={6} color={vc.stone_grey} />
      <VBox x={2} z={2} y={8} w={12} d={12} h={40} color={vc.stone_white} />
      <VBox x={0} z={0} y={8} w={2} d={2} h={40} color={vc.stone_grey} />
      <VBox x={14} z={0} y={8} w={2} d={2} h={40} color={vc.stone_grey} />
      <VBox x={0} z={14} y={8} w={2} d={2} h={40} color={vc.stone_grey} />
      <VBox x={14} z={14} y={8} w={2} d={2} h={40} color={vc.stone_grey} />
      <VBox x={2} z={-1} y={44} w={8} d={1} h={8} color={vc.wall_black} />
      <VBox x={2} z={16} y={44} w={8} d={1} h={8} color={vc.wall_black} />
      <VBox x={-1} z={2} y={44} w={1} d={8} h={8} color={vc.wall_black} />
      <VBox x={16} z={2} y={44} w={1} d={8} h={8} color={vc.wall_black} />
      <VBox x={3} z={3} y={52} w={10} d={10} h={8} color={vc.stone_grey} />
      <VBox x={6} z={6} y={54} w={4} d={4} h={5} color={vc.gold_faded} />
      <VBox x={1} z={1} y={60} w={14} d={14} h={6} color={vc.roof_red} />
      <VBox x={7} z={7} y={66} w={2} d={2} h={8} color={vc.gold_faded} emissive={vc.light_warm} />
      <VBox x={6} z={2} y={2} w={4} d={2} h={8} color={vc.iron_dark} />
    </group>
  );
};

export const ClockTowerV2 = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={-32} z={-32} y={0} w={192} d={192} h={4} color={vc2.ground_dark} />
      <VBox x={0} z={0} y={4} w={32} d={32} h={12} color={vc2.stone_grey} />
      <VBox x={4} z={4} y={16} w={24} d={24} h={80} color={vc2.stone_white} />
      <VBox x={0} z={0} y={16} w={4} d={4} h={80} color={vc2.stone_grey} />
      <VBox x={28} z={0} y={16} w={4} d={4} h={80} color={vc2.stone_grey} />
      <VBox x={0} z={28} y={16} w={4} d={4} h={80} color={vc2.stone_grey} />
      <VBox x={28} z={28} y={16} w={4} d={4} h={80} color={vc2.stone_grey} />
      <VBox x={4} z={-2} y={88} w={16} d={2} h={16} color={vc2.wall_black} />
      <VBox x={4} z={32} y={88} w={16} d={2} h={16} color={vc2.wall_black} />
      <VBox x={-2} z={4} y={88} w={2} d={16} h={16} color={vc2.wall_black} />
      <VBox x={32} z={4} y={88} w={2} d={16} h={16} color={vc2.wall_black} />
      <VBox x={6} z={6} y={104} w={20} d={20} h={16} color={vc2.stone_grey} />
      <VBox x={12} z={12} y={108} w={8} d={8} h={10} color={vc2.gold_faded} />
      <VBox x={2} z={2} y={120} w={28} d={28} h={12} color={vc2.roof_red} />
      <VBox x={14} z={14} y={132} w={4} d={4} h={16} color={vc2.gold_faded} emissive={vc2.light_warm} />
      <VBox x={12} z={4} y={4} w={8} d={4} h={16} color={vc2.iron_dark} />
    </group>
  );
};

export const EntranceGate = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={-64} y={0} w={128} d={64} h={1} color={vc.ground_dark} />
      <VBox x={0} z={0} y={0} w={128} d={64} h={1} color={vc.ground_dark} />
      <VBox x={0} z={0} y={1} w={32} d={8} h={4} color={vc.stone_grey} />
      <VBox x={0} z={0} y={5} w={6} d={8} h={20} color={vc.stone_white} />
      <VBox x={26} z={0} y={5} w={6} d={8} h={20} color={vc.stone_white} />
      <VBox x={0} z={0} y={25} w={32} d={8} h={4} color={vc.stone_white} />
      <VBox x={0} z={0} y={26} w={32} d={8} h={1} color={vc.accent_red} />
      <VBox x={7} z={4} y={5} w={9} d={1} h={14} color={vc.wall_black} />
      <VBox x={16} z={4} y={5} w={9} d={1} h={14} color={vc.wall_black} />
      <VBox x={12} z={0} y={18} w={8} d={1} h={4} color={vc.stone_grey} />
    </group>
  );
};

export const EntranceGateV2 = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={-128} y={0} w={256} d={128} h={2} color={vc2.ground_dark} />
      <VBox x={0} z={0} y={0} w={256} d={128} h={2} color={vc2.ground_dark} />
      <VBox x={0} z={0} y={2} w={64} d={16} h={8} color={vc2.stone_grey} />
      <VBox x={0} z={0} y={10} w={12} d={16} h={40} color={vc2.stone_white} />
      <VBox x={52} z={0} y={10} w={12} d={16} h={40} color={vc2.stone_white} />
      <VBox x={0} z={0} y={50} w={64} d={16} h={8} color={vc2.stone_white} />
      <VBox x={0} z={0} y={52} w={64} d={16} h={2} color={vc2.accent_red} />
      <VBox x={14} z={8} y={10} w={18} d={2} h={28} color={vc2.wall_black} />
      <VBox x={32} z={8} y={10} w={18} d={2} h={28} color={vc2.wall_black} />
      <VBox x={24} z={0} y={36} w={16} d={2} h={8} color={vc2.stone_grey} />
    </group>
  );
};

export const CentralPlaza = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={0} y={0} w={192} d={192} h={2} color={vc.ground_dark} />
      <VBox x={0} z={0} y={2} w={48} d={48} h={1} color={vc.stone_light} />
      <VBox x={6} z={6} y={2} w={36} d={36} h={1} color={vc.stone_white} />
      <VBox x={12} z={12} y={2} w={24} d={24} h={1} color={vc.stone_grey} />
      <VBox x={18} z={18} y={2} w={12} d={12} h={1} color={vc.stone_light} />
      <VBox x={21} z={21} y={2} w={6} d={6} h={1} color={vc.ground_dark} />
    </group>
  );
};

export const CentralPlazaV2 = ({ position, rotation }: any) => {
  return (
    <group position={position} rotation={rotation}>
      <VBox x={0} z={0} y={0} w={384} d={384} h={4} color={vc2.ground_dark} />
      <VBox x={0} z={0} y={4} w={96} d={96} h={2} color={vc2.stone_light} />
      <VBox x={12} z={12} y={4} w={72} d={72} h={2} color={vc2.stone_white} />
      <VBox x={24} z={24} y={4} w={48} d={48} h={2} color={vc2.stone_grey} />
      <VBox x={36} z={36} y={4} w={24} d={24} h={2} color={vc2.stone_light} />
      <VBox x={42} z={42} y={4} w={12} d={12} h={2} color={vc2.ground_dark} />
    </group>
  );
};
