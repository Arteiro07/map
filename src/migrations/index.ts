import * as migration_20250303_154908 from './20250303_154908';
import * as migration_20250313_232859 from './20250313_232859';

export const migrations = [
  {
    up: migration_20250303_154908.up,
    down: migration_20250303_154908.down,
    name: '20250303_154908',
  },
  {
    up: migration_20250313_232859.up,
    down: migration_20250313_232859.down,
    name: '20250313_232859'
  },
];
