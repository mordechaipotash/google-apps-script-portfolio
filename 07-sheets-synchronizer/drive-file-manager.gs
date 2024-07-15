/**
 * "Effortless File Management: Automate Google Drive File Listing in Google Sheets"
 * Date: July 15, 2024
 * Tags: Google Apps Script, Google Drive API, Google Sheets API, JavaScript
 * Description: Effortlessly Organize Your Google Drive Files into a Google Sheet with One Click!
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
 * - File Retrieval: The script accesses a specified Google Drive folder using its unique folder ID to retrieve all files contained within
 * - 2
 * - Data Organization: It organizes the retrieved file data, including file names, IDs, and viewable URLs, into a structured format within a Google Sheet
 * - 3
 * - Automation: The listFilesInFolder function automates the process of listing files, allowing users to execute the function with a single click via a custom menu in Google Sheets
 * - 4
 * - Content Management: Before appending new data, the script clears existing content in the active sheet to provide a clean slate for the updated file list
 * - 5
 * - User Interface: The script enhances user experience by integrating a custom menu in Google Sheets that allows easy access to the file listing functionality
 */

function listFilesInFolder()  {
  var folderId = PropertiesService.getScriptProperties().getProperty("DRIVE_FOLDER_ID") || "YOUR_DRIVE_FOLDER_ID_HERE";
// Replace with your actual folder ID  var folder = DriveApp.getFolderById(folderId);
var files = folder.getFiles();
var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
// Clear existing content  sheet.clear();
// Set headers  sheet.appendRow(['File Name', 'File ID', 'Image URL']);
// Iterate through files and append to sheet  while (files.hasNext())  {
  var file = files.next();
var fileName = file.getName();
var fileId = file.getId();
var fileUrl = 'https://drive.google.com/uc?export=view&id=' + fileId;
sheet.appendRow([fileName, fileId, fileUrl]);

}

}
function onOpen()  {
  var ui = SpreadsheetApp.getUi();
ui.createMenu('Custom Scripts')    .addItem('List Files in Folder', 'listFilesInFolder')    .addToUi();

}
