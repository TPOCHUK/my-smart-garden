import React from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PLANTS, SOILS } from '@/lib/greenhouse-data';
import type { PlantType, SoilType } from '@/lib/greenhouse-types';

interface Props {
  open: boolean;
  onClose: () => void;
  currentSoil: SoilType;
  onPlacePlant: (type: PlantType) => void;
  onChangeSoil: (soil: SoilType) => void;
}

export const PlantPlacementDialog: React.FC<Props> = ({
  open, onClose, currentSoil, onPlacePlant, onChangeSoil,
}) => {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Place a Plant</DialogTitle>
          <DialogDescription>Choose a plant and soil type for this cell.</DialogDescription>
        </DialogHeader>

        {/* Soil selection */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-muted-foreground">Soil Type</h4>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(SOILS).map(soil => (
              <button
                key={soil.type}
                onClick={() => onChangeSoil(soil.type)}
                className={`rounded-lg border-2 p-2 text-xs font-medium transition-all ${
                  currentSoil === soil.type
                    ? 'border-emerald-500 ring-2 ring-emerald-300'
                    : 'border-transparent hover:border-muted-foreground/30'
                }`}
                style={{ backgroundColor: soil.color }}
              >
                <span className="drop-shadow-sm text-white font-bold">{soil.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Plant selection */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-muted-foreground">Plant</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(PLANTS).map(plant => (
              <Button
                key={plant.type}
                variant="outline"
                className="h-auto flex-col gap-1 py-3"
                onClick={() => { onPlacePlant(plant.type); onClose(); }}
              >
                <span className="text-2xl">{plant.emoji}</span>
                <span className="text-xs">{plant.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  {plant.optimalTemp[0]}-{plant.optimalTemp[1]}°C
                </span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
