import { useState, useEffect, useCallback, useRef } from 'react';
import type { GreenhouseState, GridCell, Environment, SimSpeed, PlantState } from '@/lib/greenhouse-types';
import type { PlantType, SoilType } from '@/lib/greenhouse-types';
import { GRID_ROWS, GRID_COLS, PLANTS } from '@/lib/greenhouse-data';
import { simulatePlant, countNeighbors, applyEnvironmentEffects } from '@/lib/greenhouse-simulation';

const STORAGE_KEY = 'smart-greenhouse-state';

function createInitialGrid(): GridCell[][] {
  return Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLS }, (): GridCell => ({ soil: 'loam', plant: null }))
  );
}

function createInitialEnvironment(): Environment {
  return {
    temperature: 24,
    moisture: 60,
    light: 70,
    irrigationOn: false,
    irrigationIntensity: 50,
    ventilationOn: false,
    ventilationSpeed: 50,
  };
}

function createInitialState(): GreenhouseState {
  return {
    grid: createInitialGrid(),
    environment: createInitialEnvironment(),
    simSpeed: 1,
    tick: 0,
    rows: GRID_ROWS,
    cols: GRID_COLS,
  };
}

function loadState(): GreenhouseState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return createInitialState();
}

export function useGreenhouse() {
  const [state, setState] = useState<GreenhouseState>(loadState);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Simulation loop
  useEffect(() => {
    if (state.simSpeed === 0) return;
    const interval = setInterval(() => {
      setState(prev => {
        const newEnv = applyEnvironmentEffects(prev.environment);
        const newGrid = prev.grid.map((row, ri) =>
          row.map((cell, ci) => {
            if (!cell.plant) return cell;
            const neighbors = countNeighbors(prev.grid, ri, ci);
            const newPlant = simulatePlant(cell.plant, cell, newEnv, neighbors);
            // Dead plant removal
            if (newPlant.health <= 0) return { ...cell, plant: null };
            return { ...cell, plant: newPlant };
          })
        );
        return { ...prev, grid: newGrid, environment: newEnv, tick: prev.tick + 1 };
      });
    }, 1000 / state.simSpeed);
    return () => clearInterval(interval);
  }, [state.simSpeed]);

  const placePlant = useCallback((row: number, col: number, type: PlantType) => {
    setState(prev => {
      const newGrid = prev.grid.map(r => r.map(c => ({ ...c })));
      newGrid[row][col].plant = {
        type,
        growth: 0,
        health: 80,
        age: 0,
        plantedAt: prev.tick,
      };
      return { ...prev, grid: newGrid };
    });
  }, []);

  const removePlant = useCallback((row: number, col: number) => {
    setState(prev => {
      const newGrid = prev.grid.map(r => r.map(c => ({ ...c })));
      newGrid[row][col].plant = null;
      return { ...prev, grid: newGrid };
    });
  }, []);

  const setSoil = useCallback((row: number, col: number, soil: SoilType) => {
    setState(prev => {
      const newGrid = prev.grid.map(r => r.map(c => ({ ...c })));
      newGrid[row][col].soil = soil;
      return { ...prev, grid: newGrid };
    });
  }, []);

  const setAllSoil = useCallback((soil: SoilType) => {
    setState(prev => ({
      ...prev,
      grid: prev.grid.map(row => row.map(cell => ({ ...cell, soil }))),
    }));
  }, []);

  const updateEnvironment = useCallback((updates: Partial<Environment>) => {
    setState(prev => ({
      ...prev,
      environment: { ...prev.environment, ...updates },
    }));
  }, []);

  const setSimSpeed = useCallback((speed: SimSpeed) => {
    setState(prev => ({ ...prev, simSpeed: speed }));
  }, []);

  const resetGreenhouse = useCallback(() => {
    const fresh = createInitialState();
    setState(fresh);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    state,
    placePlant,
    removePlant,
    setSoil,
    setAllSoil,
    updateEnvironment,
    setSimSpeed,
    resetGreenhouse,
  };
}
