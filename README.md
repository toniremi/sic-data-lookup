# sic-data-lookup
A small JavaScript/TypeScript utility for mapping Standard Industrial Classification (SIC) codes to various business data points like sectors, office, and industry titles. This library provides fast, pre-processed data lookups for both forward (SIC to Sector/Industry) and reverse (Sector to SIC Prefixes) searches.

## Features
* SIC to Sector Lookup: Easily determine the broad business sector (e.g., Technology, Healthcare) for any given SIC code.

* SIC to Office & Industry Title Lookup: Get detailed office and industry titles associated with specific 4-digit SIC codes.

* Sector to SIC Prefixes Lookup: Find all SIC code prefixes that belong to a particular business sector (reverse lookup).

* Type-Safe: Built with TypeScript for robust development and predictable data structures.

* Optimized Performance: Raw data is pre-processed into efficient JSON format during the build step, ensuring minimal runtime overhead.

# Installation
Install the package via npm or yarn:

`npm install sic-data-lookup`

 or
 
`yarn add sic-data-lookup`

# Usage

## Importing
You can import specific functions or types:

`import { getSectorFromSic, getSicFromSector, getOfficeAndIndustryFromSic, SicEntry, SectorMap } from 'sic-data-lookup';`

### Examples

1. Get Sector from SIC Code

```
import { getSectorFromSic } from 'sic-data-lookup';

const sicCode1 = 3571; // Example: Technology
console.log(`SIC Code: ${sicCode1} => Sector: ${getSectorFromSic(sicCode1)}`);
// Expected Output: SIC Code: 3571 => Sector: Technology

const sicCode2 = '2834'; // Example: Healthcare (as a string)
console.log(`SIC Code: '${sicCode2}' => Sector: ${getSectorFromSic(sicCode2)}`);
// Expected Output: SIC Code: '2834' => Sector: Healthcare

const unknownSic = 9999;
console.log(`SIC Code: ${unknownSic} => Sector: ${getSectorFromSic(unknownSic)}`);
// Expected Output: SIC Code: 9999 => Sector: null 

```

2. Get SIC Code Prefixes from Sector Name

```
import { getSicFromSector } from 'sic-data-lookup';

const techSector = 'Technology';
const techSics = getSicFromSector(techSector);
console.log(`Sector: '${techSector}' => SIC Prefixes: [${techSics.join(', ')}]`);
// Expected Output: Sector: 'Technology' => SIC Prefixes: [357, 367, 381, 382, 48, 737]

const financialSector = 'Financials';
const financialSics = getSicFromSector(financialSector);
console.log(`Sector: '${financialSector}' => SIC Prefixes: [${financialSics.join(', ')}]`);
// Expected Output: Sector: 'Financials' => SIC Prefixes: [60, 61, 62, 63, 64, 67]

const nonExistentSector = 'ImaginarySector';
const imaginarySics = getSicFromSector(nonExistentSector);
console.log(`Sector: '${nonExistentSector}' => SIC Prefixes: [${imaginarySics.join(', ')}]`);
// Expected Output: Sector: 'ImaginarySector' => SIC Prefixes: []
```

3. Get Office and Industry Title from SIC Code

```
import { getOfficeAndIndustryFromSic, SicEntry } from 'sic-data-lookup';

const sicCode = 100;
const result: SicEntry[] = getOfficeAndIndustryFromSic(sicCode);
console.log(`SIC Code: ${sicCode}`);
if (result.length > 0) {
    result.forEach(entry =>
        console.log(`  Office: "${entry.office}", Industry: "${entry.industry}"`)
    );
} else {
    console.log("  No match found.");
}
// Expected Output:
// SIC Code: 100
//   Office: "Industrial Applications and Services", Industry: "AGRICULTURAL PRODUCTION-CROPS"

const unknownCode = 99999;
const unknownResult: SicEntry[] = getOfficeAndIndustryFromSic(unknownCode);
console.log(`\nSIC Code: ${unknownCode}`);
if (unknownResult.length === 0) {
    console.log("  No match found.");
}
// Expected Output:
// SIC Code: 99999
//   No match found.
```


# Data Sources

The data used in this library is derived from publicly available sources:

Sector Mapping (sectorMap): Based on the Fintel industry overview page: [https://fintel.io/industry](https://fintel.io/industry)

SIC Code to Office and Industry Table (parsedSICCodeTableData): Extracted from the SEC Government Standard Industrial Classification (SIC) Code List: [https://www.sec.gov/search-filings/standard-industrial-classification-sic-code-list](https://www.sec.gov/search-filings/standard-industrial-classification-sic-code-list)

This raw CSV data is pre-processed into an optimized JSON format during the package's build step.

# Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to contribute to the code, please feel free to open an issue or submit a pull request on the GitHub repository.

To set up the development environment:

## Clone the repository:

`git clone https://github.com/YOUR_USERNAME/sic-data-lookup.git
cd sic-data-lookup`

## Install dependencies:

`npm install`

## Build the project (generates data and compiles TypeScript):

`npm run build`

## Run tests:

`npm run test`

# License

This project is licensed under the MIT License. See the LICENSE file for details.