// tests/testSector.ts

// Import from the package's intended entry point
import {getSectorFromSic, getSicFromSector} from '../src/index.js';
// Import sectorMap directly from mappings for testing purposes
import {sectorMap} from '../src/mappings.js';

console.log("--- Standard Cases (getSectorFromSic) ---");
// Example from your prompt: 3571 should be Technology
const sic1: number = 3571;
console.log(`SIC Code: ${sic1} => Sector: ${getSectorFromSic(sic1)}`);

// Example for Healthcare: 2834 is for Pharmaceutical Preparations
const sic2: number = 2834;
console.log(`SIC Code: ${sic2} => Sector: ${getSectorFromSic(sic2)}`);

// Example for Financial Services: 6021 is for National Commercial Banks
const sic3: string = '6021'; // Testing with a string input
console.log(`SIC Code: '${sic3}' => Sector: ${getSectorFromSic(sic3)}`);

// Example for Energy: 1311 is for Crude Petroleum & Natural Gas
const sic4: number = 1311;
console.log(`SIC Code: ${sic4} => Sector: ${getSectorFromSic(sic4)}`);

// Example for Consumer Defensive: 0111 is for Wheat
const sic5: string = '0111';
console.log(`SIC Code: '${sic5}' => Sector: ${getSectorFromSic(sic5)}`);

// Example of a code that does not map to a known sector
const sic6: number = 9999;
// The ternary operator is good for displaying 'null' as a string in the console
console.log(`SIC Code: ${sic6} => Sector: ${getSectorFromSic(sic6) === null ? 'null' : getSectorFromSic(sic6)}`);


console.log("\n--- Edge Cases and Specific Scenarios (getSectorFromSic) ---");

// 1. Two-digit prefix that is also a three-digit prefix start
// '28' is Basic Materials (if 28xx exists), '283' is Healthcare. '283' should win due to sort order.
const sic7: number = 2830; // Starts with '283' but also '28'
console.log(`SIC Code: ${sic7} => Sector: ${getSectorFromSic(sic7)}`); // Expected: Healthcare

// 2. Another specific prefix taking precedence over a shorter one
// '38' might be Basic Materials/Industrials, '384' is Healthcare
const sic8: number = 3845; // Starts with '384'
console.log(`SIC Code: ${sic8} => Sector: ${getSectorFromSic(sic8)}`); // Expected: Healthcare

// 3. SIC code exactly matching a prefix (two-digit)
const sic9: number = 12; // Energy
console.log(`SIC Code: ${sic9} => Sector: ${getSectorFromSic(sic9)}`); // Expected: Energy

// 4. SIC code exactly matching a prefix (three-digit)
const sic10: number = 357; // Technology
console.log(`SIC Code: ${sic10} => Sector: ${getSectorFromSic(sic10)}`); // Expected: Technology

// 5. Short SIC code (e.g., 1-digit or 2-digits only)
const sic11: number = 7; // Industrials (from '07')
console.log(`SIC Code: ${sic11} => Sector: ${getSectorFromSic(sic11)}`); // Expected: Industrials (should be '07' internally)

const sic12: string = '65'; // Real Estate (string input, two-digit)
console.log(`SIC Code: '${sic12}' => Sector: ${getSectorFromSic(sic12)}`); // Expected: Real Estate

// 6. SIC code with leading zeros (as a string)
const sic13: string = '0700'; // Industrials
console.log(`SIC Code: '${sic13}' => Sector: ${getSectorFromSic(sic13)}`); // Expected: Industrials

// 7. SIC code not matching any prefix (single digit)
const sic14: number = 4;
console.log(`SIC Code: ${sic14} => Sector: ${getSectorFromSic(sic14) === null ? 'null' : getSectorFromSic(sic14)}`); // Expected: null

// 8. SIC code not matching any prefix (longer, but no match)
const sic15: number = 9000;
console.log(`SIC Code: ${sic15} => Sector: ${getSectorFromSic(sic15) === null ? 'null' : getSectorFromSic(sic15)}`); // Expected: null

// 9. Input that is not a typical SIC code format (e.g., negative, non-numeric string)
const sic16: number = -1234;
console.log(`SIC Code: ${sic16} => Sector: ${getSectorFromSic(sic16) === null ? 'null' : getSectorFromSic(sic16)}`); // Expected: null (String('-1234') won't match)

const sic17: string = 'abc';
console.log(`SIC Code: '${sic17}' => Sector: ${getSectorFromSic(sic17) === null ? 'null' : getSectorFromSic(sic17)}`); // Expected: null

const sic18: string = ''; // Empty string
console.log(`SIC Code: '${sic18}' => Sector: ${getSectorFromSic(sic18) === null ? 'null' : getSectorFromSic(sic18)}`); // Expected: null (empty string won't match anything)

// 10. SIC code with spaces (should be trimmed by String() implicitly)
const sicWithSpace = ' 1311 ';
console.log(`SIC Code: '${sicWithSpace}' => Sector: ${getSectorFromSic(sicWithSpace)}`); // Expected: Energy

// 11. SIC code as a very long number (should still match prefix)
const sicLongNum = 35712345;
console.log(`SIC Code: ${sicLongNum} => Sector: ${getSectorFromSic(sicLongNum)}`); // Expected: Technology


console.log("\n--- Comprehensive Sector Mapping Tests (getSectorFromSic) ---");

// Iterate through each sector in the sectorMap and test a representative SIC code
for (const sectorName in sectorMap) {
    if (Object.prototype.hasOwnProperty.call(sectorMap, sectorName)) {
        const prefixes = sectorMap[sectorName];
        if (prefixes.length > 0) {
            // Take the first prefix for simplicity
            const prefix = prefixes[0];
            // Construct a 4-digit SIC code for testing.
            // If prefix is 2-digit, append "00". If 3-digit, append "0". If 4-digit, use as is.
            let testSic = prefix;
            if (prefix.length === 2) {
                testSic += '00';
            } else if (prefix.length === 3) {
                testSic += '0';
            }
            // Ensure it's a number for some tests, though string input is handled.
            const sicCodeAsNumber = parseInt(testSic, 10);

            const detectedSector = getSectorFromSic(sicCodeAsNumber);
            const testStatus = detectedSector === sectorName ? 'PASS' : `FAIL (Expected: ${sectorName}, Got: ${detectedSector})`;
            console.log(`Testing Sector: '${sectorName}' with SIC: ${testSic} => Result: ${detectedSector} [${testStatus}]`);
        } else {
            console.log(`Sector: '${sectorName}' has no prefixes defined.`);
        }
    }
}


console.log("\n--- Testing getSicFromSector ---");

// Test Case 1: Existing sector with multiple prefixes
const techSector = 'Technology';
const techSics = getSicFromSector(techSector);
console.log(`\nSector: '${techSector}' => SIC Prefixes: [${techSics.join(', ')}]`);
// Expected: ['357', '367', '381', '382', '48', '737'] (Note: Technology prefixes were manually defined)

// Test Case 2: Existing sector with fewer prefixes
const energySector = 'Energy';
const energySics = getSicFromSector(energySector);
console.log(`\nSector: '${energySector}' => SIC Prefixes: [${energySics.join(', ')}]`);
// Expected: ['12', '122', '13', '131', '138', '29', '291', '299', '46', '461', '517']

// Test Case 3: Sector not found (case-sensitive)
const nonExistentSector = 'UnknownSector';
const unknownSics = getSicFromSector(nonExistentSector);
console.log(`\nSector: '${nonExistentSector}' => SIC Prefixes: [${unknownSics.join(', ')}]`);
// Expected: []

// Test Case 4: Another existing sector
const healthcareSector = 'Health Care'; // Using "Health Care" from updated map
const healthcareSics = getSicFromSector(healthcareSector);
console.log(`\nSector: '${healthcareSector}' => SIC Prefixes: [${healthcareSics.join(', ')}]`);
// Expected: ['283', '384', '385', '512', '80', '801', '805', '806', '807', '808', '809']

// Test Case 5: Empty string as sector name
const emptySector = '';
const emptySics = getSicFromSector(emptySector);
console.log(`\nSector: '${emptySector}' => SIC Prefixes: [${emptySics.join(', ')}]`);
// Expected: []

// Test Case 6: Sector name with different casing (should return empty array as per current case-sensitive implementation)
const lowerCaseTech = 'technology';
const lowerCaseTechSics = getSicFromSector(lowerCaseTech);
console.log(`\nSector: '${lowerCaseTech}' => SIC Prefixes: [${lowerCaseTechSics.join(', ')}]`);
// Expected: [] (as 'technology' is not a key in sectorMap, it's 'Technology' or 'Information Technology')

// Test Case 7: Confirm immutability of returned array
const originalPrefixes = getSicFromSector('Financials');
const modifiedPrefixes = getSicFromSector('Financials');
modifiedPrefixes.push('999'); // Modify the returned array
console.log(`\nSector: 'Financials' (Original): [${originalPrefixes.join(', ')}]`);
console.log(`Sector: 'Financials' (Modified): [${modifiedPrefixes.join(', ')}]`);
// Expected: Original should NOT contain '999'. This confirms the spread operator [...prefixes] works.
