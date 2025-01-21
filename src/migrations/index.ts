import * as migration_20250121_223711 from './20250121_223711';

export const migrations = [
  {
    up: migration_20250121_223711.up,
    down: migration_20250121_223711.down,
    name: '20250121_223711'
  },
];
