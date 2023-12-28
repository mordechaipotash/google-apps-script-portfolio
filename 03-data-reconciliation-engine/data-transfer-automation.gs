/**
 * Seamless Data Integration: Automating the Transfer of Latest Banquest Entries to Your Master Sheet
 * Date: December 28, 2023
 * Tags: Asynchronous Programming, Automation, Data Intergration, Data Manipulation, Google Apps Script, Google Sheets API, JavaScript, Spreadsheet Automation, Workflow Optimization
 * Description: Effortlessly Sync Your Latest Data: Automate Data Transfers from Raw Banquest to Your Master Sheet
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Automated Data Transfer: The script efficiently transfers new entries from the "Raw_Banquest" sheet in a source spreadsheet to the "All" sheet in a target spreadsheet without manual intervention
 * - 2
 * - Transaction ID Filtering: It uses a transaction ID-based filtering mechanism to ensure that only new data entries, which have a transaction ID greater than the last imported entry, are transferred
 * - 3
 * - Data Structure Modification: The script modifies the data structure by appending the source sheet name and status to the rows being imported, facilitating better data management
 * - 4
 * - Dynamic Spreadsheet Access: It dynamically accesses the source and target spreadsheets using their unique IDs, ensuring flexibility and ease of use for different datasets
 * - 5
 * - Efficient Data Handling: The script is designed to handle large datasets efficiently, allowing for quick updates and maintaining an up-to-date target sheet with minimal performance overhead
 */

function importDataFromRawBanquest()  {
  // IDs of the source and target spreadsheets  var sourceSpreadsheetID = 'YOUR_GOOGLE_SHEETS_ID';
var targetSpreadsheetID = 'YOUR_GOOGLE_SHEETS_ID';
// Names of the source and target sheets  var sourceSheetName = 'Raw_Banquest';
var targetSheetName = 'All';
// Open the source and target spreadsheets  var sourceSpreadsheet = SpreadsheetApp.openById(sourceSpreadsheetID);
var targetSpreadsheet = SpreadsheetApp.openById(targetSpreadsheetID);
// Access the specific sheets  var sourceSheet = sourceSpreadsheet.getSheetByName(sourceSheetName);
var targetSheet = targetSpreadsheet.getSheetByName(targetSheetName);
// Get the data from the source sheet  var sourceData = sourceSheet.getDataRange().getValues();
var transactionIDIndex = 2;
// Correctly defining the transactionIDIndex here  var lastRow = targetSheet.getLastRow();
var lastTransactionID = lastRow > 0 ? targetSheet.getRange(lastRow, 3).getValue() : '';
var statusColumnIndex = 9;
// Index of the Status column in the Raw_Banquest sheet  var newData = sourceData.filter(function(row)  {
  return row[transactionIDIndex] > lastTransactionID;

}
);
var modifiedData = newData.map(function(row)  {
  var statusColumn = row[statusColumnIndex];
// Status from the Raw_Banquest sheet    return ['Raw_Banquest', statusColumn].concat(row.slice(0, statusColumnIndex), row.slice(statusColumnIndex + 1));

}
);
// Append the new data to the target sheet  if (modifiedData.length > 0)  {
  targetSheet.getRange(lastRow + 1, 1, modifiedData.length, modifiedData[0].length).setValues(modifiedData);

}

}
