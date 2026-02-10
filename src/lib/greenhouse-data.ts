import type { PlantInfo, SoilInfo, PlantType, SoilType } from './greenhouse-types';

export const PLANTS: Record<PlantType, PlantInfo> = {
  tomato: {
    type: 'tomato', name: 'Tomato', emoji: '🍅',
    stages: ['🌱', '🌿', '🪴', '🍅'],
    optimalTemp: [20, 30], optimalMoisture: [50, 75], optimalLight: [60, 90],
    growthRate: 0.8, maxGrowth: 100,
  },
  lettuce: {
    type: 'lettuce', name: 'Lettuce', emoji: '🥬',
    stages: ['🌱', '🌿', '🥬', '🥬'],
    optimalTemp: [15, 22], optimalMoisture: [60, 80], optimalLight: [40, 70],
    growthRate: 1.2, maxGrowth: 100,
  },
  cucumber: {
    type: 'cucumber', name: 'Cucumber', emoji: '🥒',
    stages: ['🌱', '🌿', '🪴', '🥒'],
    optimalTemp: [22, 32], optimalMoisture: [55, 80], optimalLight: [55, 85],
    growthRate: 0.9, maxGrowth: 100,
  },
  pepper: {
    type: 'pepper', name: 'Pepper', emoji: '🌶️',
    stages: ['🌱', '🌿', '🪴', '🌶️'],
    optimalTemp: [20, 35], optimalMoisture: [40, 70], optimalLight: [60, 95],
    growthRate: 0.7, maxGrowth: 100,
  },
  basil: {
    type: 'basil', name: 'Basil', emoji: '🌿',
    stages: ['🌱', '🌿', '🌿', '🌿'],
    optimalTemp: [20, 30], optimalMoisture: [40, 65], optimalLight: [50, 80],
    growthRate: 1.5, maxGrowth: 100,
  },
  sunflower: {
    type: 'sunflower', name: 'Sunflower', emoji: '🌻',
    stages: ['🌱', '🌿', '🌾', '🌻'],
    optimalTemp: [18, 30], optimalMoisture: [35, 60], optimalLight: [70, 100],
    growthRate: 0.6, maxGrowth: 100,
  },
  strawberry: {
    type: 'strawberry', name: 'Strawberry', emoji: '🍓',
    stages: ['🌱', '🌿', '🌸', '🍓'],
    optimalTemp: [15, 26], optimalMoisture: [55, 75], optimalLight: [50, 80],
    growthRate: 1.0, maxGrowth: 100,
  },
  carrot: {
    type: 'carrot', name: 'Carrot', emoji: '🥕',
    stages: ['🌱', '🌿', '🌿', '🥕'],
    optimalTemp: [15, 24], optimalMoisture: [50, 70], optimalLight: [45, 75],
    growthRate: 0.85, maxGrowth: 100,
  },
};

export const SOILS: Record<SoilType, SoilInfo> = {
  sandy:  { type: 'sandy',  name: 'Sandy',  color: 'hsl(40 55% 70%)',  waterRetention: 0.2, nutrientLevel: 0.3, drainage: 0.9 },
  clay:   { type: 'clay',   name: 'Clay',   color: 'hsl(20 40% 45%)',  waterRetention: 0.9, nutrientLevel: 0.7, drainage: 0.2 },
  loam:   { type: 'loam',   name: 'Loam',   color: 'hsl(30 45% 40%)',  waterRetention: 0.6, nutrientLevel: 0.8, drainage: 0.5 },
  peat:   { type: 'peat',   name: 'Peat',   color: 'hsl(25 35% 30%)',  waterRetention: 0.85, nutrientLevel: 0.5, drainage: 0.3 },
  chalky: { type: 'chalky', name: 'Chalky', color: 'hsl(45 20% 75%)',  waterRetention: 0.3, nutrientLevel: 0.4, drainage: 0.8 },
  silty:  { type: 'silty',  name: 'Silty',  color: 'hsl(35 30% 55%)',  waterRetention: 0.7, nutrientLevel: 0.65, drainage: 0.4 },
};

export const GRID_ROWS = 6;
export const GRID_COLS = 8;
