/**
 * "Streamline Your Workflow: Automated Google Sheets Inventory Tracker for Efficient File Management"
 * Date: July 29, 2024
 * Tags: Data Automation, Data Intergration, Google Apps Script, Google Drive API, Google Sheets API, JavaScript, Spreadsheet Functions
 * Description: Effortlessly Track and Organize Your Google Sheets with Automated Inventory Management
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Functionality: The inventoryGoogleSheetsFiles function automates the creation and updating of an inventory spreadsheet that catalogs Google Sheets files in the user's Google Drive
 * - 2
 * - File Retrieval: The script retrieves all Google Sheets files from Google Drive using the DriveApp service, specifically filtering for files updated in the year 2007
 * - 3
 * - Metadata Collection: For each qualifying file, the script collects comprehensive metadata, including file name, file ID, URL, creation date, last updated date, owner information, file size, and the number of sheets within the spreadsheet
 * - 4
 * - Dynamic Inventory Management: The script dynamically appends the collected metadata to the "Inventory of Sheets" spreadsheet, ensuring that the inventory is continuously updated with new or modified files
 * - 5
 * - Error Handling: The script includes basic error handling to manage situations where owner information may not be accessible, ensuring robustness in its execution
 */

function inventoryGoogleSheetsFiles()  {
  var inventorySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Inventory of Sheets");
if (!inventorySheet)  {
  inventorySheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Inventory of Sheets");
inventorySheet.appendRow([      "File Name", "File ID", "File URL", "Created Date", "Last Updated Date",       "Owner", "File Size", "Number of Sheets"    ]);

}
var lastRow = inventorySheet.getLastRow();
var files = DriveApp.getFilesByType(MimeType.GOOGLE_SHEETS);
var currentDate = new Date();
while (files.hasNext())  {
  var file = files.next();
var lastUpdated = file.getLastUpdated();
// Check if the file was updated in 2023    if (lastUpdated.getFullYear() === 2007)  {
  var fileId = file.getId();
var fileUrl = file.getUrl();
var createdDate = file.getDateCreated();
var owner = "Unknown";
try  {
  owner = file.getOwner().getEmail();

}
catch (e)  {
  // Owner information might not be accessible      
}
var fileSize = file.getSize();
// Open the spreadsheet to count the number of sheets      var ss = SpreadsheetApp.openById(fileId);
var numberOfSheets = ss.getSheets().length;
inventorySheet.appendRow([        file.getName(), fileId, fileUrl, createdDate, lastUpdated, owner, fileSize, numberOfSheets      ]);

}

}

}
