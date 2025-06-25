// tests/testOfficeAndIndustry.ts

import {getOfficeAndIndustryFromSic, SicEntry} from '../src/index.js';

console.log("--- Testing getOfficeAndIndustryFromSic ---");

// Test Case 1: Exact match - Single result
const sic100 = 100;
const result100: SicEntry[] = getOfficeAndIndustryFromSic(sic100);
console.log(`\nSIC Code: ${sic100}`);
if (result100.length > 0) {
  result100.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: Office: "Industrial Applications and Services", Industry: "AGRICULTURAL PRODUCTION-CROPS"

// Test Case 2: Exact match - Another example
const sic1311 = 1311;
const result1311: SicEntry[] = getOfficeAndIndustryFromSic(sic1311);
console.log(`\nSIC Code: ${sic1311}`);
if (result1311.length > 0) {
  result1311.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: Office: "Office of Energy & Transportation", Industry: "CRUDE PETROLEUM & NATURAL GAS"

// Test Case 3: SIC code that might have multiple entries (e.g., 6199 has "Office of Finance or Office of Crypto Assets")
// The parsing keeps the full string, so this should return one entry with that full string.
const sic6199 = 6199;
const result6199: SicEntry[] = getOfficeAndIndustryFromSic(sic6199);
console.log(`\nSIC Code: ${sic6199}`);
if (result6199.length > 0) {
  result6199.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: Office: "Office of Finance or Office of Crypto Assets", Industry: "FINANCE SERVICES"

// Test Case 4: No match found for a valid number outside the range
const sicInvalid = 99999;
const resultInvalid: SicEntry[] = getOfficeAndIndustryFromSic(sicInvalid);
console.log(`\nSIC Code: ${sicInvalid}`);
if (resultInvalid.length > 0) {
  resultInvalid.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: No match found.

// Test Case 5: SIC code as a string
const sicString = '7371';
const resultString: SicEntry[] = getOfficeAndIndustryFromSic(sicString);
console.log(`\nSIC Code: '${sicString}'`);
if (resultString.length > 0) {
  resultString.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: Office: "Office of Technology", Industry: "SERVICES-COMPUTER PROGRAMMING SERVICES"

// Test Case 6: SIC code with leading zeros (as a string) that matches a numeric SIC
const sicLeadingZero = '0100'; // Should map to 100
const resultLeadingZero: SicEntry[] = getOfficeAndIndustryFromSic(sicLeadingZero);
console.log(`\nSIC Code: '${sicLeadingZero}'`);
if (resultLeadingZero.length > 0) {
  resultLeadingZero.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: Office: "Industrial Applications and Services", Industry: "AGRICULTURAL PRODUCTION-CROPS"

// Test Case 7: Invalid non-numeric string input (should return empty array)
const sicNonNumeric = 'abc';
const resultNonNumeric: SicEntry[] = getOfficeAndIndustryFromSic(sicNonNumeric);
console.log(`\nSIC Code: '${sicNonNumeric}'`);
if (resultNonNumeric.length > 0) {
  resultNonNumeric.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: "No match found." (due to parseInt returning NaN)

// Test Case 8: Empty string input (should return empty array)
const sicEmpty = '';
const resultEmpty: SicEntry[] = getOfficeAndIndustryFromSic(sicEmpty);
console.log(`\nSIC Code: '${sicEmpty}'`);
if (resultEmpty.length > 0) {
  resultEmpty.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: "No match found." (due to parseInt returning NaN)

// Test Case 9: SIC code with quotes in the industry title (already handled by parsing)
const sicQuotedIndustry = 900;
const resultQuotedIndustry: SicEntry[] = getOfficeAndIndustryFromSic(sicQuotedIndustry);
console.log(`\nSIC Code: ${sicQuotedIndustry}`);
if (resultQuotedIndustry.length > 0) {
  resultQuotedIndustry.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: Office: "Industrial Applications and Services", Industry: "FISHING, HUNTING AND TRAPPING"

// Test Case 10: SIC code with spaces (leading/trailing should be trimmed by String() implicitly, then parseInt)
const sicWithSpaces = ' 100 ';
const resultWithSpaces: SicEntry[] = getOfficeAndIndustryFromSic(sicWithSpaces);
console.log(`\nSIC Code: '${sicWithSpaces}' => Sector: `);
if (resultWithSpaces.length > 0) {
  resultWithSpaces.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: Office: "Industrial Applications and Services", Industry: "AGRICULTURAL PRODUCTION-CROPS"

// Test Case 11: Negative number input (should return empty array)
const sicNegative = -100;
const resultNegative: SicEntry[] = getOfficeAndIndustryFromSic(sicNegative);
console.log(`\nSIC Code: ${sicNegative}`);
if (resultNegative.length > 0) {
  resultNegative.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: "No match found."

// Test Case 12: Float number input (parseInt handles this by truncating, ensure it still works for exact match)
const sicFloat = 100.5;
const resultFloat: SicEntry[] = getOfficeAndIndustryFromSic(sicFloat);
console.log(`\nSIC Code: ${sicFloat}`);
if (resultFloat.length > 0) {
  resultFloat.forEach(entry =>
    console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
  );
} else {
  console.log("  No match found.");
}
// Expected: Office: "Industrial Applications and Services", Industry: "AGRICULTURAL PRODUCTION-CROPS"

// Test Case 13: Confirm immutability of returned array
const originalMatches = getOfficeAndIndustryFromSic(100);
if (originalMatches.length > 0) {
  const mutableMatches = getOfficeAndIndustryFromSic(100);
  mutableMatches[0].office = 'Modified Office'; // Modify the returned array object
  console.log(`\nSIC Code: 100 (Original Object Office): "${originalMatches[0].office}"`);
  console.log(`SIC Code: 100 (Modified Object Office): "${mutableMatches[0].office}"`);
  // Expected: Original should NOT be 'Modified Office'. This confirms new object references are returned.
  // NOTE: The current implementation returns a new array, but the *objects within* that array
  // are still references to the internal parsed data objects. If deep immutability is desired,
  // you would need to deep clone the SicEntry objects, which adds performance overhead.
  // For now, this test highlights that the array itself is a copy.
}
