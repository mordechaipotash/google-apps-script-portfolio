/**
 * Automate Google Sheets Updates: Sync New Sheets from Drive
 * Date: January 1, 2024
 * Description: Automatically syncs new Google Sheets from a Drive folder to a master spreadsheet
 */

// Configuration
const CONFIG = {
  FOLDER_ID: "YOUR_DRIVE_FOLDER_ID_HERE", // Replace with your Google Drive folder ID
  TARGET_SPREADSHEET_ID: "YOUR_SPREADSHEET_ID_HERE", // Replace with target spreadsheet ID
  PROCESSED_SHEET_NAME: 'ProcessedFiles' // Sheet to track processed files
};


/**
 * SETUP FUNCTION - RUN THIS FIRST!
 * Configure all required API keys and private variables
 * 
 * Instructions:
 * 1. Replace placeholder values with your actual credentials
 * 2. Run this function once before using the script
 * 3. Your credentials will be securely stored in Script Properties
 */
function setupConfiguration() {
  // Configure API Keys and Private Variables
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', 'YOUR_SPREADSHEET_ID_HERE');
  PropertiesService.getScriptProperties().setProperty('FOLDER_ID', 'YOUR_DRIVE_FOLDER_ID_HERE');
  
  // Verify configuration
  const props = PropertiesService.getScriptProperties().getProperties();
  console.log('Configuration complete. Properties set:', Object.keys(props).length);
  
  // Show success message
  SpreadsheetApp.getActiveSpreadsheet().toast(
    'Configuration saved successfully! You can now use the script.',
    'Setup Complete',
    5
  );
}

/**
 * Creates custom menu on spreadsheet open
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Sheet Actions')
    .addItem('Update from New Sheets', 'monitorAndCopyNewSheets')
    .addItem('Setup Automatic Sync', 'setupAutomaticSync')
    .addItem('View Sync History', 'viewSyncHistory')
    .addSeparator()
    .addItem('Clear Processed History', 'clearProcessedHistory')
    .addToUi();
}

/**
 * Main function to monitor and copy new sheets from Drive folder
 */
function monitorAndCopyNewSheets() {
  try {
    // Get folder and target spreadsheet
    const folder = DriveApp.getFolderById(CONFIG.FOLDER_ID);
    const targetSpreadsheet = SpreadsheetApp.openById(CONFIG.TARGET_SPREADSHEET_ID);
    
    // Get files from folder
    const files = folder.getFilesByType(MimeType.GOOGLE_SHEETS);
    
    // Get or create processed files tracking sheet
    let processedSheet = targetSpreadsheet.getSheetByName(CONFIG.PROCESSED_SHEET_NAME);
    if (!processedSheet) {
      processedSheet = createProcessedSheet(targetSpreadsheet);
    }
    
    // Get list of already processed files
    const processedFiles = getProcessedFiles(processedSheet);
    
    let filesProcessed = 0;
    const results = [];
    
    // Process each file
    while (files.hasNext()) {
      const file = files.next();
      const fileId = file.getId();
      const fileName = file.getName();
      const lastUpdated = file.getLastUpdated();
      
      // Check if file needs processing
      if (!isFileProcessed(processedFiles, fileId, lastUpdated)) {
        try {
          // Create new sheet with timestamp name
          const newSheetName = generateSheetName(fileName);
          const newSheet = targetSpreadsheet.insertSheet(newSheetName);
          
          Logger.log(`Created new sheet: ${newSheetName}`);
          
          // Copy data from source file
          const sourceSpreadsheet = SpreadsheetApp.openById(fileId);
          const sourceSheet = sourceSpreadsheet.getSheets()[0]; // Get first sheet
          const sourceData = sourceSheet.getDataRange().getValues();
          
          // Write data to new sheet
          if (sourceData.length > 0 && sourceData[0].length > 0) {
            newSheet.getRange(1, 1, sourceData.length, sourceData[0].length)
              .setValues(sourceData);
            
            // Copy formatting (optional)
            copyFormatting(sourceSheet, newSheet, sourceData.length, sourceData[0].length);
          }
          
          // Record processed file
          recordProcessedFile(processedSheet, fileId, fileName, lastUpdated, newSheetName);
          
          filesProcessed++;
          results.push({
            fileName: fileName,
            sheetName: newSheetName,
            status: 'Success'
          });
          
        } catch (error) {
          Logger.log(`Error processing file ${fileName}: ${error}`);
          results.push({
            fileName: fileName,
            status: `Error: ${error.message}`
          });
        }
      }
    }
    
    // Show summary
    showSyncSummary(filesProcessed, results);
    
  } catch (error) {
    SpreadsheetApp.getUi().alert(`Error: ${error.message}`);
    Logger.log(`Error in monitorAndCopyNewSheets: ${error}`);
  }
}

/**
 * Check if sheet has already been processed
 */
function isFileProcessed(processedFiles, fileId, lastUpdated) {
  const processedFile = processedFiles[fileId];
  if (!processedFile) return false;
  
  // Check if file has been updated since last processing
  return new Date(processedFile.lastUpdated) >= new Date(lastUpdated);
}

/**
 * Generate unique sheet name with timestamp
 */
function generateSheetName(fileName) {
  const timestamp = Utilities.formatDate(
    new Date(), 
    Session.getScriptTimeZone(), 
    'MM/dd/yyyy HH:mm'
  );
  
  // Truncate filename if too long
  const maxFileNameLength = 30;
  const truncatedName = fileName.length > maxFileNameLength 
    ? fileName.substring(0, maxFileNameLength) + '...' 
    : fileName;
  
  return `${truncatedName} - ${timestamp}`;
}

/**
 * Create sheet for tracking processed files
 */
function createProcessedSheet(spreadsheet) {
  const sheet = spreadsheet.insertSheet(CONFIG.PROCESSED_SHEET_NAME);
  
  // Add headers
  const headers = ['File ID', 'File Name', 'Last Updated', 'Processed Date', 'Sheet Name'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#f0f0f0');
  
  // Set column widths
  sheet.setColumnWidth(1, 150); // File ID
  sheet.setColumnWidth(2, 250); // File Name
  sheet.setColumnWidth(3, 150); // Last Updated
  sheet.setColumnWidth(4, 150); // Processed Date
  sheet.setColumnWidth(5, 250); // Sheet Name
  
  return sheet;
}

/**
 * Get list of already processed files
 */
function getProcessedFiles(sheet) {
  const data = sheet.getDataRange().getValues();
  const processedFiles = {};
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[0]) { // If File ID exists
      processedFiles[row[0]] = {
        fileName: row[1],
        lastUpdated: row[2],
        processedDate: row[3],
        sheetName: row[4]
      };
    }
  }
  
  return processedFiles;
}

/**
 * Record processed file in tracking sheet
 */
function recordProcessedFile(sheet, fileId, fileName, lastUpdated, sheetName) {
  const processedDate = new Date();
  sheet.appendRow([fileId, fileName, lastUpdated, processedDate, sheetName]);
}

/**
 * Copy basic formatting from source to destination sheet
 */
function copyFormatting(sourceSheet, destSheet, numRows, numCols) {
  try {
    // Copy column widths
    for (let col = 1; col <= numCols; col++) {
      const width = sourceSheet.getColumnWidth(col);
      destSheet.setColumnWidth(col, width);
    }
    
    // Copy row heights (for first 100 rows or actual rows, whichever is less)
    const rowsToFormat = Math.min(numRows, 100);
    for (let row = 1; row <= rowsToFormat; row++) {
      const height = sourceSheet.getRowHeight(row);
      destSheet.setRowHeight(row, height);
    }
    
    // Copy header formatting if exists
    if (numRows > 0) {
      const headerRange = sourceSheet.getRange(1, 1, 1, numCols);
      const destHeaderRange = destSheet.getRange(1, 1, 1, numCols);
      
      // Copy font styles
      destHeaderRange.setFontWeights(headerRange.getFontWeights());
      destHeaderRange.setFontColors(headerRange.getFontColors());
      destHeaderRange.setBackgrounds(headerRange.getBackgrounds());
    }
    
  } catch (error) {
    Logger.log(`Error copying formatting: ${error}`);
    // Continue execution even if formatting fails
  }
}

/**
 * Show summary of sync operation
 */
function showSyncSummary(filesProcessed, results) {
  const ui = SpreadsheetApp.getUi();
  
  if (filesProcessed === 0) {
    ui.alert('Sync Complete', 'No new files to process.', ui.ButtonSet.OK);
  } else {
    let message = `Processed ${filesProcessed} file(s):\n\n`;
    
    results.forEach(result => {
      if (result.status === 'Success') {
        message += `✓ ${result.fileName} → ${result.sheetName}\n`;
      } else {
        message += `✗ ${result.fileName}: ${result.status}\n`;
      }
    });
    
    ui.alert('Sync Complete', message, ui.ButtonSet.OK);
  }
}

/**
 * Setup automatic sync with time-based trigger
 */
function setupAutomaticSync() {
  const ui = SpreadsheetApp.getUi();
  
  // Remove existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'monitorAndCopyNewSheets') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new trigger
  ScriptApp.newTrigger('monitorAndCopyNewSheets')
    .timeBased()
    .everyHours(1) // Run every hour
    .create();
  
  ui.alert(
    'Automatic Sync Enabled', 
    'The sync will run automatically every hour.', 
    ui.ButtonSet.OK
  );
}

/**
 * View sync history
 */
function viewSyncHistory() {
  const targetSpreadsheet = SpreadsheetApp.openById(CONFIG.TARGET_SPREADSHEET_ID);
  const processedSheet = targetSpreadsheet.getSheetByName(CONFIG.PROCESSED_SHEET_NAME);
  
  if (!processedSheet) {
    SpreadsheetApp.getUi().alert('No sync history found.');
    return;
  }
  
  // Activate the processed files sheet
  targetSpreadsheet.setActiveSheet(processedSheet);
}

/**
 * Clear processed files history (use with caution)
 */
function clearProcessedHistory() {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.alert(
    'Clear History',
    'This will clear all processed file records. Files may be re-imported on next sync. Continue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    const targetSpreadsheet = SpreadsheetApp.openById(CONFIG.TARGET_SPREADSHEET_ID);
    const processedSheet = targetSpreadsheet.getSheetByName(CONFIG.PROCESSED_SHEET_NAME);
    
    if (processedSheet) {
      // Keep headers, clear data
      const lastRow = processedSheet.getLastRow();
      if (lastRow > 1) {
        processedSheet.deleteRows(2, lastRow - 1);
      }
      ui.alert('History cleared successfully.');
    }
  }
}