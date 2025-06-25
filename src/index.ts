// src/index.ts

// Re-export functions from sicCodeToSector.ts
export {getSectorFromSic, getSicFromSector} from './sicCodeToSector.js';

// Re-export functions and interfaces from sicCodeToOfficeAndIndustry.ts
export {getOfficeAndIndustryFromSic} from './sicCodeToOfficeAndIndustry.js';

// Re-export types/interfaces from types.ts
export type {SicEntry, SectorMap} from './types.js'; // Use 'type' keyword for type-only exports
