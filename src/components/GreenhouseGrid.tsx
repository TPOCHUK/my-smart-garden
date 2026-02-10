import React from 'react';
import type { GridCell } from '@/lib/greenhouse-types';
import { PLANTS, SOILS } from '@/lib/greenhouse-data';

interface Props {
  grid: GridCell[][];
  lightLevel: number;
  temperature: number;
  onCellClick: (row: number, col: number) => void;
}

function getPlantEmoji(cell: GridCell): string {
  if (!cell.plant) return '';
  const info = PLANTS[cell.plant.type];
  const stageIndex = Math.min(
    Math.floor((cell.plant.growth / 100) * info.stages.length),
    info.stages.length - 1
  );
  return info.stages[stageIndex];
}

function getHealthColor(health: number): string {
  if (health > 70) return 'hsl(120 60% 40%)';
  if (health > 40) return 'hsl(45 80% 50%)';
  return 'hsl(20 70% 40%)';
}

export const GreenhouseGrid: React.FC<Props> = ({ grid, lightLevel, temperature, onCellClick }) => {
  // Compute overlays
  const brightness = 0.4 + (lightLevel / 100) * 0.6;
  const tempTint = temperature > 30
    ? `hsla(20, 80%, 50%, ${(temperature - 30) * 0.015})`
    : temperature < 18
      ? `hsla(210, 70%, 50%, ${(18 - temperature) * 0.02})`
      : 'transparent';

  return (
    <div className="relative rounded-xl border-4 border-emerald-800/40 bg-emerald-900/10 p-3 shadow-xl backdrop-blur-sm">
      {/* Glass panel effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      {/* Temperature overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: tempTint }}
      />
      {/* Greenhouse label */}
      <div className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-emerald-700/70">
        🏡 Greenhouse Floor
      </div>
      <div
        className="grid gap-1 transition-all duration-500"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          filter: `brightness(${brightness})`,
        }}
      >
        {grid.map((row, ri) =>
          row.map((cell, ci) => {
            const soil = SOILS[cell.soil];
            const plant = cell.plant;
            return (
              <button
                key={`${ri}-${ci}`}
                onClick={() => onCellClick(ri, ci)}
                className="relative aspect-square rounded-md border border-emerald-800/20 transition-all hover:scale-105 hover:ring-2 hover:ring-emerald-400/50 active:scale-95 flex items-center justify-center text-2xl cursor-pointer"
                style={{ backgroundColor: soil.color }}
                title={plant ? `${PLANTS[plant.type].name} — Health: ${Math.round(plant.health)}%` : `Empty (${soil.name} soil)`}
              >
                {plant && (
                  <>
                    <span className="drop-shadow-md">{getPlantEmoji(cell)}</span>
                    {/* Health indicator dot */}
                    <span
                      className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full"
                      style={{ backgroundColor: getHealthColor(plant.health) }}
                    />
                  </>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
