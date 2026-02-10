import type { GridCell, Environment, PlantState } from './greenhouse-types';
import { PLANTS, SOILS } from './greenhouse-data';

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/** Returns 0-1 score of how well a value fits within an optimal range */
function fitScore(value: number, [min, max]: [number, number]): number {
  if (value >= min && value <= max) return 1;
  const dist = value < min ? min - value : value - max;
  const range = max - min || 1;
  return clamp(1 - dist / range, 0, 1);
}

/** Count neighboring plants within radius 1 */
export function countNeighbors(grid: GridCell[][], row: number, col: number): number {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr, c = col + dc;
      if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length && grid[r][c].plant) {
        count++;
      }
    }
  }
  return count;
}

/** Simulate one tick for a single plant, returns updated plant state */
export function simulatePlant(
  plant: PlantState,
  cell: GridCell,
  env: Environment,
  neighbors: number,
): PlantState {
  const info = PLANTS[plant.type];
  const soil = SOILS[cell.soil];

  // Compute condition fitness (0-1)
  const tempFit = fitScore(env.temperature, info.optimalTemp);
  const moistFit = fitScore(env.moisture, info.optimalMoisture);
  const lightFit = fitScore(env.light, info.optimalLight);

  // Soil bonus
  const soilBonus = soil.nutrientLevel * 0.3 + soil.waterRetention * 0.2;

  // Overcrowding penalty
  const crowdPenalty = neighbors > 3 ? 0.5 : neighbors > 1 ? 0.8 : 1;

  // Overall condition score
  const condition = ((tempFit + moistFit + lightFit) / 3) * crowdPenalty + soilBonus * 0.2;
  const condClamped = clamp(condition, 0, 1);

  // Health change
  let newHealth = plant.health;
  if (condClamped > 0.6) {
    newHealth = clamp(newHealth + (condClamped - 0.6) * 5, 0, 100);
  } else {
    newHealth = clamp(newHealth - (0.6 - condClamped) * 8, 0, 100);
  }

  // Growth (only if health > 20)
  let newGrowth = plant.growth;
  if (newHealth > 20) {
    newGrowth = clamp(
      newGrowth + info.growthRate * condClamped * (newHealth / 100),
      0,
      info.maxGrowth,
    );
  }

  return {
    ...plant,
    growth: newGrowth,
    health: newHealth,
    age: plant.age + 1,
  };
}

/** Apply environmental effects of irrigation/ventilation */
export function applyEnvironmentEffects(env: Environment): Environment {
  let { moisture, temperature } = env;

  if (env.irrigationOn) {
    moisture = clamp(moisture + env.irrigationIntensity * 0.05, 0, 100);
  } else {
    moisture = clamp(moisture - 0.5, 0, 100); // natural drying
  }

  if (env.ventilationOn) {
    // Ventilation pulls temperature toward 22°C
    const diff = temperature - 22;
    temperature = temperature - diff * env.ventilationSpeed * 0.003;
  }

  return { ...env, moisture, temperature };
}
