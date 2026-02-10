import React, { useState } from 'react';
import { useGreenhouse } from '@/hooks/use-greenhouse';
import { GreenhouseGrid } from '@/components/GreenhouseGrid';
import { ControlPanel } from '@/components/ControlPanel';
import { PlantPlacementDialog } from '@/components/PlantPlacementDialog';
import { PlantDetailsDialog } from '@/components/PlantDetailsDialog';
import { Dashboard } from '@/components/Dashboard';
import type { PlantType, SoilType } from '@/lib/greenhouse-types';

const Index = () => {
  const {
    state, placePlant, removePlant, setSoil, updateEnvironment, setSimSpeed, resetGreenhouse,
  } = useGreenhouse();

  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [dialogType, setDialogType] = useState<'place' | 'details' | null>(null);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    const cell = state.grid[row][col];
    setDialogType(cell.plant ? 'details' : 'place');
  };

  const handlePlacePlant = (type: PlantType) => {
    if (selectedCell) placePlant(selectedCell.row, selectedCell.col, type);
  };

  const handleChangeSoil = (soil: SoilType) => {
    if (selectedCell) setSoil(selectedCell.row, selectedCell.col, soil);
  };

  const handleRemove = () => {
    if (selectedCell) removePlant(selectedCell.row, selectedCell.col);
  };

  const closeDialog = () => {
    setDialogType(null);
    setSelectedCell(null);
  };

  const selectedGridCell = selectedCell ? state.grid[selectedCell.row][selectedCell.col] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-foreground">
      {/* Header */}
      <header className="border-b border-emerald-700/30 bg-emerald-950/60 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="flex items-center gap-2 text-xl font-bold text-emerald-100">
            🌿 Smart Greenhouse
          </h1>
          <div className="text-xs text-emerald-300/70">
            Virtual Greenhouse Simulator
          </div>
        </div>
      </header>

      <main className="container mx-auto flex flex-col gap-4 p-4 lg:flex-row">
        {/* Grid area */}
        <div className="flex-1 space-y-4">
          <GreenhouseGrid
            grid={state.grid}
            lightLevel={state.environment.light}
            temperature={state.environment.temperature}
            onCellClick={handleCellClick}
          />
          <Dashboard grid={state.grid} />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <ControlPanel
            environment={state.environment}
            simSpeed={state.simSpeed}
            tick={state.tick}
            onEnvChange={updateEnvironment}
            onSpeedChange={setSimSpeed}
            onReset={resetGreenhouse}
          />
        </div>
      </main>

      {/* Dialogs */}
      <PlantPlacementDialog
        open={dialogType === 'place'}
        onClose={closeDialog}
        currentSoil={selectedGridCell?.soil ?? 'loam'}
        onPlacePlant={handlePlacePlant}
        onChangeSoil={handleChangeSoil}
      />
      <PlantDetailsDialog
        open={dialogType === 'details'}
        onClose={closeDialog}
        cell={selectedGridCell}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default Index;
