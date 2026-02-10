// ── Plant & Soil Types ──────────────────────────────────────────

export type PlantType = 'tomato' | 'lettuce' | 'cucumber' | 'pepper' | 'basil' | 'sunflower' | 'strawberry' | 'carrot';

export interface PlantInfo {
  type: PlantType;
  name: string;
  emoji: string;
  stages: string[]; // emoji per growth stage
  optimalTemp: [number, number]; // min, max °C
  optimalMoisture: [number, number]; // min, max %
  optimalLight: [number, number]; // 0-100
  growthRate: number; // base growth per tick (0-1)
  maxGrowth: number; // 100 = fully mature
}

export type SoilType = 'sandy' | 'clay' | 'loam' | 'peat' | 'chalky' | 'silty';

export interface SoilInfo {
  type: SoilType;
  name: string;
  color: string; // tailwind-compatible hsl
  waterRetention: number; // 0-1
  nutrientLevel: number; // 0-1
  drainage: number; // 0-1
}

// ── Grid Cell ───────────────────────────────────────────────────

export interface PlantState {
  type: PlantType;
  growth: number; // 0-100
  health: number; // 0-100
  age: number; // ticks alive
  plantedAt: number; // simulation tick
}

export interface GridCell {
  soil: SoilType;
  plant: PlantState | null;
}

// ── Environment ─────────────────────────────────────────────────

export interface Environment {
  temperature: number; // 10-45 °C
  moisture: number; // 0-100 %
  light: number; // 0-100
  irrigationOn: boolean;
  irrigationIntensity: number; // 0-100
  ventilationOn: boolean;
  ventilationSpeed: number; // 0-100
}

// ── Game State ──────────────────────────────────────────────────

export type SimSpeed = 0 | 1 | 2 | 5 | 10;

export interface GreenhouseState {
  grid: GridCell[][];
  environment: Environment;
  simSpeed: SimSpeed;
  tick: number; // total simulation ticks elapsed
  rows: number;
  cols: number;
}
