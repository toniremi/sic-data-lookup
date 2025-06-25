// Imports the pre-parsed SIC code table data and the SicEntry interface.
import {parsedSICCodeTableData} from "./mappings.js";
import {SicEntry} from "./types.js";

/**
 * Retrieves the office and industry title(s) for a given SIC code.
 * The data is pre-parsed during the build process for efficiency.
 *
 * @param {number | string} sicCode - The SIC code to look up.
 * @returns {SicEntry[]} An array of objects containing 'office' and 'industry' for all matching entries.
 * Returns an an empty array if no matches are found or if the input is invalid.
 */
export function getOfficeAndIndustryFromSic(sicCode: number | string): SicEntry[] {
  // Convert the input sicCode to a number for comparison with parsed data
  const lookupCode = parseInt(String(sicCode), 10);

  if (isNaN(lookupCode)) {
    // For a library, generally avoid console.warn for invalid input that simply results in no data.
    // Returning an empty array is the expected graceful failure.
    return [];
  }

  // Filter the pre-parsed data to find all exact matches
  const matches = parsedSICCodeTableData.filter((entry: SicEntry) => entry.sicCode === lookupCode);

  return matches;
}