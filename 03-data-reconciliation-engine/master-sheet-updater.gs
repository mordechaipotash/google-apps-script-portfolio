/**
 * Seamless Data Automation: Effortlessly Updating the Master Spreadsheet with New Raw_Banquest Records for Enhanced Workflow Efficiency
 * Date: December 31, 2023
 * Tags: Data Intergration, Data Manipulation, Google Apps Script, Google Sheets API, JavaScript, Performance Optimization, Spreadsheet Automation, Version Control, Workflow Optimization
 * Description: Streamline Your Data Management: Effortlessly Transfer and Organize Records with Our Automated Spreadsheet Solution
 * 
 * Auto-parsed from CSV on 2025-09-14
 */

/**
 * SETUP ALL CREDENTIALS - Configure all API keys and IDs
 * 
 * This function configures:
 * - YouTube API keys
 * - Google Sheets IDs
 * - Google Drive Folder IDs
 * 
 * Run this once before using the script.
 */
function setupAllCredentials() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getScriptProperties();
  
  ui.alert(
    'Credential Setup',
    'This will guide you through setting up all required credentials.\nLeave blank to skip optional items.',
    ui.ButtonSet.OK
  );

  // Spreadsheet IDs
  const sourceSheet = ui.prompt(
    'Source Spreadsheet',
    'Enter the Source Spreadsheet ID (optional):\n(Found in the URL: docs.google.com/spreadsheets/d/[ID]/edit)',
    ui.ButtonSet.OK_CANCEL
  );
  if (sourceSheet.getSelectedButton() === ui.Button.OK && sourceSheet.getResponseText()) {
    props.setProperty('SOURCE_SPREADSHEET_ID', sourceSheet.getResponseText().trim());
  }
  
  const targetSheet = ui.prompt(
    'Target Spreadsheet',
    'Enter the Target Spreadsheet ID (optional):\n(Found in the URL: docs.google.com/spreadsheets/d/[ID]/edit)',
    ui.ButtonSet.OK_CANCEL
  );
  if (targetSheet.getSelectedButton() === ui.Button.OK && targetSheet.getResponseText()) {
    props.setProperty('TARGET_SPREADSHEET_ID', targetSheet.getResponseText().trim());
  }
  
  // Show summary
  const configured = Object.keys(props.getProperties()).length;
  ui.alert(
    'Setup Complete',
    `Configured ${configured} credential(s).\nYou can run this again to update credentials.`,
    ui.ButtonSet.OK
  );
}

/**
 * Clear all stored credentials
 */
function clearAllCredentials() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Clear All Credentials',
    'This will remove ALL stored credentials. Continue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    const props = PropertiesService.getScriptProperties();
    props.deleteAllProperties();
    ui.alert('All credentials cleared', 'All stored credentials have been removed.', ui.ButtonSet.OK);
  }
}



/**
 * Technical Details:
 * - 1
 * - Data Source and Target: The script connects to two Google Sheets documents—'Raw_Banquest' as the source and 'Master' as the target—using their unique spreadsheet IDs
 * - 2
 * - Column Mapping: A mapping of columns from the 'Raw_Banquest' sheet to the 'Master' sheet is defined to ensure data consistency during the transfer process
 * - 3
 * - Data Retrieval and Filtering: It retrieves data from the 'Raw_Banquest' sheet, filtering for records dated December 2023, while checking for duplicates based on invoice numbers to avoid redundant entries
 * - 4
 * - Transformation and Appending: The filtered data is transformed according to the defined column mappings and appended to the 'Master' sheet if there are any new entries
 * - 5
 * - Automation and Efficiency: This script automates the data transfer process, reducing the need for manual data entry and improving overall workflow efficiency in data management
 */

function updateMasterSheet()  {
  var sourceSpreadsheetId = PropertiesService.getScriptProperties().getProperty('SOURCE_SPREADSHEET_ID') || 'YOUR_SOURCE_SPREADSHEET_ID_HERE';
// ID of the Raw_Banquest spreadsheet  var targetSpreadsheetId = PropertiesService.getScriptProperties().getProperty('TARGET_SPREADSHEET_ID') || 'YOUR_TARGET_SPREADSHEET_ID_HERE';
// ID of the Master spreadsheet  var sourceSpreadsheet = SpreadsheetApp.openById(sourceSpreadsheetId);
var targetSpreadsheet = SpreadsheetApp.openById(targetSpreadsheetId);
var rawBanquestSheet = sourceSpreadsheet.getSheetByName('Raw_Banquest');
var masterSheet = targetSpreadsheet.getSheetByName('Master');
// Define the mappings from Raw_Banquest columns to Master columns  var columnMappings =  {
  'Merchant Company': 'Source',    'Date': 'Date',    'Status': 'Status',    'Total Amount': 'Amount',    'Invoice': 'Invoice',    'Email': 'Email',    'Billing First Name': 'FirstName',    'Billing Last Name': 'LastName',    'Billing Street': 'Street Number',    'Billing City': 'City',    'Billing State': 'State',    'Billing ZIP Code': 'Zip',    'Billing Country': 'Country',    'Billing Phone': 'Phone',    // ... Add other mappings as necessary  
}
;
// Get data from both sheets  var rawBanquestData = rawBanquestSheet.getDataRange().getValues();
var masterData = masterSheet.getDataRange().getValues();
// Convert master data to a set for easy lookup  var masterInvoices = new Set(masterData.slice(1).map(row => row[masterData[0].indexOf('Invoice')]));
// Filter and transform Raw_Banquest data  var transformedData = rawBanquestData.slice(1)    .filter(function (row)  {
  var dateCell = row[rawBanquestData[0].indexOf('Date')];
var invoice = row[rawBanquestData[0].indexOf('Invoice')];
var date = new Date(dateCell);
return date.getFullYear() === 2023 && date.getMonth() === 11 && !masterInvoices.has(invoice);

}
).map(function (row)  {
  return Object.keys(columnMappings).map(function (key)  {
  return row[rawBanquestData[0].indexOf(key)];

}
);

}
);
// Append non-duplicate data to Master sheet  if (transformedData.length > 0)  {
  masterSheet.getRange(masterSheet.getLastRow() + 1, 1, transformedData.length, transformedData[0].length).setValues(transformedData);

}

}
