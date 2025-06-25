// sicCodeToSector.ts
// import our sector mapping from a separate file
import {sectorMap} from './mappings.js';

/**
 * Converts a given SIC code into its corresponding business sector.
 *
 * @param {number|string} sicCode - The SIC code to classify.
 * @returns {string | null} The name of the sector, or null if no mapping is found.
 */
export function getSectorFromSic(sicCode: number | string): string | null {
  const codeAsString = String(sicCode);

  const allPrefixes = Object.entries(sectorMap)
    .flatMap(([sector, prefixes]) =>
      prefixes.map((prefix) => ({
        prefix,
        sector,
      }))
    )
    // TypeScript infers types well here, but you could explicitly type `mapping` if needed
    .sort((a, b) => b.prefix.length - a.prefix.length);

  for (const mapping of allPrefixes) {
    if (codeAsString.startsWith(mapping.prefix)) {
      return mapping.sector;
    }
  }

  return null;
}

/**
 * Retrieves an array of SIC code prefixes that belong to a given business sector.
 *
 * @param {string} sectorName - The name of the sector to look up (e.g., 'Technology', 'Healthcare').
 * @returns {string[]} An array of SIC code prefixes (as strings) associated with the sector.
 * Returns an empty array if the sector is not found or has no associated prefixes.
 */
export function getSicFromSector(sectorName: string): string[] {
  // Look up the sector in the sectorMap.
  // Ensure case-insensitivity if desired, but for now, it's case-sensitive based on sectorMap keys.
  const prefixes = sectorMap[sectorName];

  // If the sector exists and has prefixes, return them. Otherwise, return an empty array.
  return prefixes ? [...prefixes] : []; // Use spread to return a new array copy
}
