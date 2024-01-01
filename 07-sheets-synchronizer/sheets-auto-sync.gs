/**
 * Effortless Google Sheets Synchronization: Automate Data Updates from Drive to Your Spreadsheet
 * Date: January 1, 2024
 * Tags: Data Intergration, Data Manipulation, Google Apps Script, Google Drive API, Google Sheets API, JavaScript, Spreadsheet Automation, Workflow Optimization
 * Description: Effortlessly Sync and Organize Your Google Sheets with Automatic Updates
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
  // Drive Folder ID
  const folderId = ui.prompt(
    'Google Drive Folder',
    'Enter the Drive Folder ID (optional):\n(Found in the URL: drive.google.com/drive/folders/[ID])',
    ui.ButtonSet.OK_CANCEL
  );
  if (folderId.getSelectedButton() === ui.Button.OK && folderId.getResponseText()) {
    props.setProperty('DRIVE_FOLDER_ID', folderId.getResponseText().trim());
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
 * - Custom Menu Integration: The script adds a custom menu item in the Google Sheets UI that allows users to trigger the synchronization process manually
 * - 2
 * - Automatic File Detection: It scans a specified Google Drive folder for new Google Sheets files, enabling automatic detection and processing of newly added sheets
 * - 3
 * - Dynamic Sheet Creation: For each unprocessed file, the script creates a new sheet in the target spreadsheet, naming it based on the current date to maintain organization
 * - 4
 * - Duplicate Prevention: The script includes a mechanism to check if a sheet has already been processed, preventing duplication of data in the target spreadsheet
 * - 5
 * - Data Transfer Functionality: It efficiently copies data from the source sheets to the newly created sheets in the target spreadsheet, ensuring that all relevant information is consolidated
 */

function onOpen()  {
  var ui = SpreadsheetApp.getUi();
ui.createMenu('Sheet Actions')    .addItem('Update from New Sheets', 'monitorAndCopyNewSheets')    .addToUi();

}
function monitorAndCopyNewSheets()  {
  var folderId = PropertiesService.getScriptProperties().getProperty('DRIVE_FOLDER_ID') || 'YOUR_DRIVE_FOLDER_ID_HERE';
// Replace with your Google Drive folder ID  var targetSpreadsheetId = PropertiesService.getScriptProperties().getProperty('TARGET_SPREADSHEET_ID') || 'YOUR_TARGET_SPREADSHEET_ID_HERE';
// Replace with your target Google Spreadsheet ID  var folder = DriveApp.getFolderById(folderId);
var files = folder.getFilesByType(MimeType.GOOGLE_SHEETS);
var targetSpreadsheet = SpreadsheetApp.openById(targetSpreadsheetId);
while (files.hasNext())  {
  var file = files.next();
var fileId = file.getId();
var fileName = file.getName();
var lastUpdated = file.getLastUpdated();
if (!isSheetAlreadyProcessed(targetSpreadsheet, fileName, lastUpdated))  {
  var newSheetName = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MM/dd/yyyy');
var newSheet = targetSpreadsheet.insertSheet(newSheetName);
Logger.log('Created a new sheet: ' + newSheetName);
var sourceSpreadsheet = SpreadsheetApp.openById(fileId);
var sourceSheet = sourceSpreadsheet.getSheets()[0];
var sourceRange = sourceSheet.getDataRange();
var sourceValues = sourceRange.getValues();
newSheet.getRange(1, 1, sourceValues.length, sourceValues[0].length).setValues(sourceValues);

}

}

}
function isSheetAlreadyProcessed(spreadsheet, fileName, lastUpdated)  {
  var sheets = spreadsheet.getSheets();
var sheetProcessed = false;
for (var i = 0;
i < sheets.length;
i++)  {
  if (sheets[i].getName() === fileName && sheets[i].getLastUpdated() >= lastUpdated)  {
  sheetProcessed = true;
break;

}

}
return sheetProcessed;

}
