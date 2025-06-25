// scripts/generate-data.js
// This script runs during the build process to parse the raw CSV data
// from an external file into a JSON file, optimizing runtime performance.
// It is written in plain JavaScript and does not require TypeScript compilation.

const fs = require('fs');
const path = require('path');

// In CommonJS modules (which a plain .js script typically is, or will be interpreted as
// when run directly by Node without 'type: module' in its nearest package.json),
// __dirname is directly available.
const outputRoot = process.cwd(); // Get the current working directory (project root)

// Define the structure of a single SIC entry (for internal clarity, not strict typing)
// This is effectively our 'SicEntry' interface from types.ts, recreated here for the script.
// It's not strictly necessary to define it here since JS is dynamic, but good for understanding.
// interface SicEntryOutput {
//     sicCode: number;
//     office: string;
//     industry: string;
// }

// Define the path to the raw CSV file relative to the project root
const rawCsvFilePath = path.join(outputRoot, 'data', 'sic_codes.csv');

let rawSICCodeTableCsvData;

try {
    // Read the raw CSV data from the file
    rawSICCodeTableCsvData = fs.readFileSync(rawCsvFilePath, 'utf8');
    console.log(`[INFO: generate-data.js] Successfully read data from ${rawCsvFilePath}`);
} catch(error) {
    console.error(`[ERROR: generate-data.js] Failed to read CSV file at ${rawCsvFilePath}:`, error);
    process.exit(1); // Exit with an error code if the file can't be read
}

/**
 * Parses the raw CSV data into an array of objects.
 * @param {string} csvString - The raw CSV data as a string.
 * @returns {Array<Object>} An array of parsed SIC entries.
 */
function parseSicCsv(csvString) { // No type annotations in plain JS
    const lines = csvString.trim().split('\n');
    const result = []; // No type annotation

    // Skip the header row
    for(let i = 1; i < lines.length; i++) {
        const line = lines[i];
        // Handle commas within quoted fields (simple approach for this specific CSV)
        // This regex splits by comma, but not if the comma is inside double quotes.
        const parts = line.match(/(?:[^,"]+|"[^"]*")+/g);

        if(parts && parts.length === 3) {
            const sicCodeStr = parts[0].trim();
            const office = parts[1].trim().replace(/^"|"$/g, '');
            const industry = parts[2].trim().replace(/^"|"$/g, '');

            const sicCodeNum = parseInt(sicCodeStr, 10);

            // Validate sicCode is a valid number
            if(!isNaN(sicCodeNum)) {
                result.push({
                    sicCode: sicCodeNum,
                    office: office,
                    industry: industry
                });
            } else {
                console.warn(`[WARNING: generate-data.js] Skipping invalid SIC code entry: "${sicCodeStr}" in line: "${line}"`);
            }
        } else {
            console.warn(`[WARNING: generate-data.js] Skipping malformed CSV line: "${line}"`);
        }
    }
    return result;
}

const parsedData = parseSicCsv(rawSICCodeTableCsvData);

// Define the output path for the JSON file to be directly in the dist folder
const outputPath = path.join(outputRoot, 'src', 'generated-sic-data.json');
const outputDir = path.dirname(outputPath);

// Ensure the output directory exists
if(!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {recursive: true});
}

// Write the parsed JSON data to the file
fs.writeFileSync(outputPath, JSON.stringify(parsedData, null, 2), 'utf8');

console.log(`[SUCCESS: generate-data.js] Parsed SIC data saved to ${outputPath}`);

