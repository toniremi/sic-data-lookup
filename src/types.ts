/**
 * Interface representing a single entry from the SIC code CSV data.
 */
export interface SicEntry {
    sicCode: number;
    office: string;
    industry: string;
}

/**
 * Type defining the structure for the sector map.
 * Keys are sector names (strings), and values are arrays of SIC code prefixes (strings).
 * This allows indexing with a string and ensures the value is a string array.
 */
export type SectorMap = {
    [key: string]: string[];
};

/**
 * Type defining the structure of the pre-parsed SIC code table data.
 * It's an array of SicEntry objects.
 */
export type ParsedSICCodeTable = SicEntry[]; // New type for the array of SIC entries