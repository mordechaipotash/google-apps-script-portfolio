/**
 * "Smart Match: Highlighting SSNs and Last Names for Enhanced Data Integrity in Google Sheets"
 * Date: July 23, 2024
 * Tags: Data Intergration, Data Manipulation, Google Apps Script, Google Sheets API, JavaScript, Spreadsheet Automation, Workflow Optimization
 * Description: "Effortlessly Match and Highlight Archived Data: A Google Script for Enhanced Data Organization and Accuracy"
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Data Access: The script utilizes Google Sheets API to access both the active spreadsheet and an archived spreadsheet containing historical data
 * - 2
 * - Column Identification: It dynamically identifies the columns for Social Security Numbers (SSNs) and last names in both the active and archived datasets, ensuring flexibility with varying spreadsheet structures
 * - 3
 * - Data Comparison: The script iterates through the active sheet's data, comparing each SSN and last name against the archived data to identify matches and discrepancies
 * - 4
 * - Visual Feedback: Matches are highlighted in light green, while mismatches are marked in light red, providing clear visual cues for data validation
 * - 5
 * - Error Handling: Comprehensive error handling is implemented to log and manage issues that may arise during execution, enhancing the script's reliability and usability
 */

function highlightMatchingSSNsAndLastNames()  {
  try  {
  // Get the active spreadsheet and sheet    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var activeSheet = activeSpreadsheet.getActiveSheet();
// Get the spreadsheet containing the ARCHIVED sheet    var historicSpreadsheet = SpreadsheetApp.openById("1MXWsI1j-rWoWIxv2FsEPHZVwqQoERW-FtXwbpw0v-Ek");
if (!historicSpreadsheet)  {
  throw new Error("Could not open the Historic spreadsheet.");

}
// Get the ARCHIVED sheet    var archivedSheet = historicSpreadsheet.getSheetByName("ARCHIVED");
if (!archivedSheet)  {
  throw new Error("Could not find the 'ARCHIVED' sheet.");

}
// Find the SSN# and Last Name columns in active sheet    var activeHeaders = activeSheet.getRange(1, 1, 1, activeSheet.getLastColumn()).getValues()[0];
var activeSSNColIndex = activeHeaders.indexOf("SSN#") + 1;
var activeLastNameColIndex = activeHeaders.indexOf("Last Name") + 1;
if (activeSSNColIndex === 0 || activeLastNameColIndex === 0)  {
  throw new Error("Could not find 'SSN#' or 'Last Name' column in the active sheet.");

}
// Find the SSN# and Last Name columns in ARCHIVED sheet    var archivedHeaders = archivedSheet.getRange(1, 1, 1, archivedSheet.getLastColumn()).getValues()[0];
var archivedSSNColIndex = archivedHeaders.indexOf("SSN#") + 1;
var archivedLastNameColIndex = archivedHeaders.indexOf("Last Name") + 1;
if (archivedSSNColIndex === 0 || archivedLastNameColIndex === 0)  {
  throw new Error("Could not find 'SSN#' or 'Last Name' column in 'ARCHIVED' sheet.");

}
// Get all SSNs and Last Names from ARCHIVED sheet    var archivedData = archivedSheet.getRange(2, 1, archivedSheet.getLastRow() - 1, archivedSheet.getLastColumn()).getValues();
var archivedSSNs = archivedData.map(row => row[archivedSSNColIndex - 1]);
var archivedLastNames = archivedData.map(row => row[archivedLastNameColIndex - 1]);
// Get SSNs and Last Names from active sheet and check for matches    var activeData = activeSheet.getRange(2, 1, activeSheet.getLastRow() - 1, activeSheet.getLastColumn()).getValues();
for (var i = 0;
i < activeData.length;
i++)  {
  var activeSSN = activeData[i][activeSSNColIndex - 1];
var activeLastName = activeData[i][activeLastNameColIndex - 1];
var archivedIndex = archivedSSNs.indexOf(activeSSN);
if (archivedIndex !== -1)  {
  // Highlight the SSN in light green if it is found in ARCHIVED        activeSheet.getRange(i + 2, activeSSNColIndex).setBackground("#90EE90");
// Check if the last names match        if (activeLastName === archivedLastNames[archivedIndex])  {
  // Highlight the Last Name in green if it matches          activeSheet.getRange(i + 2, activeLastNameColIndex).setBackground("#90EE90");

}
else  {
  // Highlight the Last Name in light red if it does not match          activeSheet.getRange(i + 2, activeLastNameColIndex).setBackground("#FFB6C1");

}

}
else  {
  // Clear the background color if SSN is not found in ARCHIVED        activeSheet.getRange(i + 2, activeSSNColIndex).setBackground(null);
activeSheet.getRange(i + 2, activeLastNameColIndex).setBackground(null);

}

}
Logger.log("Successfully completed highlighting SSNs and last names.");

}
catch (error)  {
  Logger.log("An error occurred: " + error.message);
throw error;
// Re-throw the error to see it in the execution log  
}

}
