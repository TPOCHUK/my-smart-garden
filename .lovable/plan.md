
# Smart Greenhouse — Virtual Greenhouse Simulator

## Overview
An interactive, game-style web app where users manage a virtual greenhouse. Users place plants on a 2D top-down grid, control environmental sensors, and watch plants grow in real-time. All state is saved in local storage.

---

## 1. Greenhouse Grid View (Main Screen)
- A **2D top-down grid** representing the greenhouse floor (e.g., 8×6 cells)
- Visual greenhouse frame/border with glass-panel styling to look like a real greenhouse
- Each cell can hold a plant or be empty soil
- Plants are shown as icons/illustrations that **visually grow** over time (small seedling → mature plant)
- Plant health is indicated by color (green = healthy, yellow = stressed, brown = dying)
- Clicking an empty cell opens a plant placement dialog
- Clicking an occupied cell shows plant details (health, growth stage, age)

## 2. Plant Selection & Placement
- **6-8 plant types**: Tomato, Lettuce, Cucumber, Pepper, Basil, Sunflower, Strawberry, Carrot
- Each plant has unique optimal conditions (preferred temperature, moisture, light needs)
- User can set **distance/spacing** between plants (affects growth — overcrowding reduces health)
- Drag-and-drop or click-to-place interaction

## 3. Soil Selection
- **6 soil types**: Sandy, Clay, Loam, Peat, Chalky, Silty
- Each soil type has properties: water retention, nutrient level, drainage
- Soil can be set per-cell or for the entire greenhouse
- Soil is visually differentiated by color/texture on the grid

## 4. Environmental Control Panel
A sidebar or bottom panel with interactive controls for:
- **Temperature** — slider (10°C to 45°C) with a thermometer visualization
- **Soil Moisture** — slider (0-100%) with a moisture gauge
- **Lighting** — slider (low/medium/high/full) with visual brightness change on the grid
- **Irrigation** — toggle on/off + intensity level; affects soil moisture over time
- **Ventilation** — toggle on/off + fan speed; affects temperature and humidity

Each control shows its current value and ideal range for the planted species.

## 5. Real-Time Growth Simulation
- Plants grow in real-time with a **speed control** (1x, 2x, 5x, 10x, pause)
- Growth is affected by how close conditions are to the plant's ideal:
  - Good conditions → healthy growth
  - Poor conditions → slowed growth, yellowing, wilting
  - Extreme conditions → plant dies
- A simulation clock shows elapsed time (days/hours)

## 6. Plant Status Dashboard
- A small info panel showing stats for selected plant or overall greenhouse health
- Metrics: average health %, number of plants, growth stage distribution
- Warnings when conditions are poor for certain plants

## 7. Visual Design
- Greenhouse-themed UI: green accents, earthy tones, glass/wood textures
- The grid area visually brightens/dims based on lighting settings
- Temperature affects a subtle color overlay (warm = slight orange tint, cool = blue tint)
- Water/irrigation shows subtle animation on soil cells
- Clean, playful game-like aesthetic

## 8. Local Storage Persistence
- Greenhouse layout, plant states, sensor settings, and simulation time saved automatically
- "Reset Greenhouse" button to start fresh
