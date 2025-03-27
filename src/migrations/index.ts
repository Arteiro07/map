import * as migration_20250314_041032 from './20250314_041032';
import * as migration_20250327_004351 from './20250327_004351';

export const migrations = [
  {
    up: migration_20250314_041032.up,
    down: migration_20250314_041032.down,
    name: '20250314_041032',
  },
  {
    up: migration_20250327_004351.up,
    down: migration_20250327_004351.down,
    name: '20250327_004351'
  },
];
