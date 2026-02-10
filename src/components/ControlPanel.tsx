import React from 'react';
import type { Environment, SimSpeed } from '@/lib/greenhouse-types';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, Sun, Wind, Waves, Play, Pause, RotateCcw, Gauge } from 'lucide-react';

interface Props {
  environment: Environment;
  simSpeed: SimSpeed;
  tick: number;
  onEnvChange: (updates: Partial<Environment>) => void;
  onSpeedChange: (speed: SimSpeed) => void;
  onReset: () => void;
}

const speeds: SimSpeed[] = [0, 1, 2, 5, 10];
const speedLabels: Record<SimSpeed, string> = { 0: '⏸', 1: '1×', 2: '2×', 5: '5×', 10: '10×' };

export const ControlPanel: React.FC<Props> = ({
  environment, simSpeed, tick, onEnvChange, onSpeedChange, onReset,
}) => {
  const days = Math.floor(tick / 24);
  const hours = tick % 24;

  return (
    <Card className="border-emerald-700/30 bg-card/90 backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gauge className="h-5 w-5 text-emerald-600" />
          Control Panel
        </CardTitle>
        <div className="text-xs text-muted-foreground">
          Day {days}, Hour {hours} · Tick {tick}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Speed */}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Simulation Speed
          </label>
          <div className="flex gap-1">
            {speeds.map(s => (
              <Button
                key={s}
                size="sm"
                variant={simSpeed === s ? 'default' : 'outline'}
                onClick={() => onSpeedChange(s)}
                className="flex-1 text-xs"
              >
                {speedLabels[s]}
              </Button>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div>
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Thermometer className="h-3.5 w-3.5 text-red-500" />
            Temperature: {environment.temperature.toFixed(1)}°C
          </label>
          <Slider
            value={[environment.temperature]}
            onValueChange={([v]) => onEnvChange({ temperature: v })}
            min={10} max={45} step={0.5}
          />
          <div className="mt-0.5 flex justify-between text-[10px] text-muted-foreground">
            <span>10°C</span><span>45°C</span>
          </div>
        </div>

        {/* Moisture */}
        <div>
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Droplets className="h-3.5 w-3.5 text-blue-500" />
            Soil Moisture: {environment.moisture.toFixed(0)}%
          </label>
          <Slider
            value={[environment.moisture]}
            onValueChange={([v]) => onEnvChange({ moisture: v })}
            min={0} max={100} step={1}
          />
        </div>

        {/* Light */}
        <div>
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Sun className="h-3.5 w-3.5 text-yellow-500" />
            Lighting: {environment.light}%
          </label>
          <Slider
            value={[environment.light]}
            onValueChange={([v]) => onEnvChange({ light: v })}
            min={0} max={100} step={1}
          />
        </div>

        {/* Irrigation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Waves className="h-3.5 w-3.5 text-cyan-500" />
              Irrigation
            </label>
            <Switch
              checked={environment.irrigationOn}
              onCheckedChange={v => onEnvChange({ irrigationOn: v })}
            />
          </div>
          {environment.irrigationOn && (
            <Slider
              value={[environment.irrigationIntensity]}
              onValueChange={([v]) => onEnvChange({ irrigationIntensity: v })}
              min={0} max={100} step={1}
            />
          )}
        </div>

        {/* Ventilation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Wind className="h-3.5 w-3.5 text-sky-500" />
              Ventilation
            </label>
            <Switch
              checked={environment.ventilationOn}
              onCheckedChange={v => onEnvChange({ ventilationOn: v })}
            />
          </div>
          {environment.ventilationOn && (
            <Slider
              value={[environment.ventilationSpeed]}
              onValueChange={([v]) => onEnvChange({ ventilationSpeed: v })}
              min={0} max={100} step={1}
            />
          )}
        </div>

        {/* Reset */}
        <Button variant="destructive" size="sm" className="w-full" onClick={onReset}>
          <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reset Greenhouse
        </Button>
      </CardContent>
    </Card>
  );
};
