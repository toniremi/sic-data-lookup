// src/mappings.ts
// import types from './types.js';
import {SectorMap, ParsedSICCodeTable} from "./types.js";

// Import the pre-processed JSON data directly using a relative path.
// When mappings.ts (compiled to dist/src/mappings.js) loads,
// '../generated-sic-data.json' will correctly point to dist/generated-sic-data.json.
import rawSICCodeTableData from './generated-sic-data.json' with {type: 'json'};


/**
 * An object that maps business sectors to an array of their associated SIC code prefixes.
 * A SIC code belongs to a sector if it starts with one of the prefixes in the array.
 * Data is structured based on the Fintel industry overview page (https://fintel.io/industry).
 */
export const sectorMap: SectorMap = {
    'Energy': ['12', '13', '29'],
    'Basic Materials': ['08', '10', '14', '24', '26', '28', '30', '32', '33'],
    'Industrials': ['07', '15', '16', '17', '34', '35', '37', '40', '42', '44', '45', '47', '50', '73', '75', '76', '87'],
    'Consumer Cyclical': ['22', '23', '25', '27', '31', '36', '37', '39', '52', '53', '55', '56', '57', '58', '59', '70', '72', '78', '79'],
    'Consumer Defensive': ['01', '02', '09', '20', '21', '51', '54'],
    'Healthcare': ['283', '384', '385', '512', '591', '80'],
    'Financials': ['60', '61', '62', '63', '64', '67'],
    'Technology': ['357', '367', '381', '382', '48', '737'],
    'Communication Services': ['27', '48', '78'],
    'Real Estate': ['15', '65'],
    'Utilities': ['49']
};

/**
 * Raw CSV data containing SIC codes, Office, and Industry Titles.
 * This data is used for detailed lookup of SIC codes.
 * This has been extracted from the SEC Government page (https://www.sec.gov/search-filings/standard-industrial-classification-sic-code-list).
 */
export const parsedSICCodeTableData: ParsedSICCodeTable = rawSICCodeTableData;