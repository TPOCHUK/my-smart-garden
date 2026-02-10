import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { GridCell } from '@/lib/greenhouse-types';
import { PLANTS } from '@/lib/greenhouse-data';
import { Leaf, Heart, AlertTriangle } from 'lucide-react';

interface Props {
  grid: GridCell[][];
}

export const Dashboard: React.FC<Props> = ({ grid }) => {
  const plants = grid.flat().filter(c => c.plant).map(c => c.plant!);
  const total = plants.length;

  if (total === 0) {
    return (
      <Card className="border-emerald-700/30 bg-card/90 backdrop-blur">
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          <Leaf className="mx-auto mb-2 h-8 w-8 text-emerald-400/50" />
          No plants yet. Click an empty cell to start planting!
        </CardContent>
      </Card>
    );
  }

  const avgHealth = plants.reduce((s, p) => s + p.health, 0) / total;
  const avgGrowth = plants.reduce((s, p) => s + p.growth, 0) / total;
  const stressed = plants.filter(p => p.health < 50).length;

  // Count by type
  const typeCounts: Record<string, number> = {};
  plants.forEach(p => { typeCounts[p.type] = (typeCounts[p.type] || 0) + 1; });

  return (
    <Card className="border-emerald-700/30 bg-card/90 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Leaf className="h-5 w-5 text-emerald-600" />
          Greenhouse Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-muted p-2">
            <div className="text-lg font-bold">{total}</div>
            <div className="text-[10px] uppercase text-muted-foreground">Plants</div>
          </div>
          <div className="rounded-lg bg-muted p-2">
            <div className="text-lg font-bold" style={{
              color: avgHealth > 70 ? 'hsl(120 60% 35%)' : avgHealth > 40 ? 'hsl(45 80% 45%)' : 'hsl(0 70% 45%)',
            }}>{Math.round(avgHealth)}%</div>
            <div className="text-[10px] uppercase text-muted-foreground">Avg Health</div>
          </div>
          <div className="rounded-lg bg-muted p-2">
            <div className="text-lg font-bold">{Math.round(avgGrowth)}%</div>
            <div className="text-[10px] uppercase text-muted-foreground">Avg Growth</div>
          </div>
        </div>

        {stressed > 0 && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-2 text-xs text-destructive">
            <AlertTriangle className="h-4 w-4" />
            {stressed} plant{stressed > 1 ? 's' : ''} stressed! Adjust conditions.
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {Object.entries(typeCounts).map(([type, count]) => (
            <span key={type} className="rounded-full bg-muted px-2 py-0.5 text-xs">
              {PLANTS[type as keyof typeof PLANTS].emoji} {count}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
