import * as migration_20250314_041032 from './20250314_041032';

export const migrations = [
  {
    up: migration_20250314_041032.up,
    down: migration_20250314_041032.down,
    name: '20250314_041032'
  },
];
