import React from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PLANTS, SOILS } from '@/lib/greenhouse-data';
import type { GridCell } from '@/lib/greenhouse-types';

interface Props {
  open: boolean;
  onClose: () => void;
  cell: GridCell | null;
  onRemove: () => void;
}

function getGrowthStage(growth: number): string {
  if (growth < 25) return 'Seedling';
  if (growth < 50) return 'Young';
  if (growth < 75) return 'Maturing';
  return 'Mature';
}

export const PlantDetailsDialog: React.FC<Props> = ({ open, onClose, cell, onRemove }) => {
  if (!cell?.plant) return null;
  const plant = cell.plant;
  const info = PLANTS[plant.type];
  const soil = SOILS[cell.soil];

  const stageIndex = Math.min(
    Math.floor((plant.growth / 100) * info.stages.length),
    info.stages.length - 1
  );

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-3xl">{info.stages[stageIndex]}</span>
            {info.name}
          </DialogTitle>
          <DialogDescription>Plant details and status</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg bg-muted p-2">
              <div className="text-[10px] uppercase text-muted-foreground">Growth</div>
              <div className="font-bold">{plant.growth.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">{getGrowthStage(plant.growth)}</div>
            </div>
            <div className="rounded-lg bg-muted p-2">
              <div className="text-[10px] uppercase text-muted-foreground">Health</div>
              <div className="font-bold" style={{
                color: plant.health > 70 ? 'hsl(120 60% 35%)' : plant.health > 40 ? 'hsl(45 80% 45%)' : 'hsl(0 70% 45%)',
              }}>{Math.round(plant.health)}%</div>
            </div>
            <div className="rounded-lg bg-muted p-2">
              <div className="text-[10px] uppercase text-muted-foreground">Age</div>
              <div className="font-bold">{plant.age} ticks</div>
            </div>
            <div className="rounded-lg bg-muted p-2">
              <div className="text-[10px] uppercase text-muted-foreground">Soil</div>
              <div className="font-bold">{soil.name}</div>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-2 text-xs">
            <div className="text-[10px] uppercase text-muted-foreground mb-1">Optimal Conditions</div>
            <div>🌡️ {info.optimalTemp[0]}-{info.optimalTemp[1]}°C</div>
            <div>💧 {info.optimalMoisture[0]}-{info.optimalMoisture[1]}%</div>
            <div>☀️ {info.optimalLight[0]}-{info.optimalLight[1]}%</div>
          </div>

          <Button variant="destructive" size="sm" className="w-full" onClick={() => { onRemove(); onClose(); }}>
            Remove Plant
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
