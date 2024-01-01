/**
 * Automated Data Matching and Logging Script for Banquest and Admire Sheets
 * Date: January 1, 2024
 * Description: Matches and reconciles data between Raw_Banquest and Raw_Admire sheets
 */

// Configuration
const MATCH_CONFIG = {
  BANQUEST_SHEET: 'Raw_Banquest',
  ADMIRE_SHEET: 'Raw_Admire',
  
  // Column indices for matching (0-based)
  BANQUEST_COLUMNS: {
    ADMIRE_REC: 0,      // Column A - Where RecNumber will be written
    LASTNAME: 10,        // Column K
    AMOUNT: 4,          // Column E
    EMAIL: 6            // Column G
  },
  
  ADMIRE_COLUMNS: {
    LASTNAME: 14,        // Column O
    AMOUNT: 6,          // Column G
    EMAIL: 3,           // Column D
    RECNUMBER: 27       // Column AB
  }
};

/**
 * Main function to match and populate data with detailed logging
 */
function matchAndPopulateWithLogs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const banquestSheet = ss.getSheetByName(MATCH_CONFIG.BANQUEST_SHEET);
  const admireSheet = ss.getSheetByName(MATCH_CONFIG.ADMIRE_SHEET);
  
  if (!banquestSheet || !admireSheet) {
    throw new Error('Required sheets not found');
  }
  
  // Get all data from both sheets
  const banquestData = banquestSheet.getDataRange().getValues();
  const admireData = admireSheet.getDataRange().getValues();
  
  // Statistics tracking
  let matchCount = 0;
  let noMatchCount = 0;
  const matchLog = [];
  const noMatchLog = [];
  
  // Process each row in Banquest sheet (skip header)
  for (let i = 1; i < banquestData.length; i++) {
    let matchFound = false;
    
    // Extract Banquest row data
    const banquestRow = {
      rowNum: i + 1,
      lastName: banquestData[i][MATCH_CONFIG.BANQUEST_COLUMNS.LASTNAME],
      amount: banquestData[i][MATCH_CONFIG.BANQUEST_COLUMNS.AMOUNT],
      email: banquestData[i][MATCH_CONFIG.BANQUEST_COLUMNS.EMAIL]
    };
    
    // Search for match in Admire sheet
    for (let j = 1; j < admireData.length; j++) {
      const admireRow = {
        lastName: admireData[j][MATCH_CONFIG.ADMIRE_COLUMNS.LASTNAME],
        amount: admireData[j][MATCH_CONFIG.ADMIRE_COLUMNS.AMOUNT],
        email: admireData[j][MATCH_CONFIG.ADMIRE_COLUMNS.EMAIL],
        recNumber: admireData[j][MATCH_CONFIG.ADMIRE_COLUMNS.RECNUMBER]
      };
      
      // Check if all fields match
      if (isMatch(banquestRow, admireRow)) {
        // Log the match
        console.log(`Match found for row ${banquestRow.rowNum}: LastName = ${banquestRow.lastName}, Amount = ${banquestRow.amount}, Email = ${banquestRow.email}`);
        
        matchLog.push({
          banquestRow: banquestRow.rowNum,
          admireRow: j + 1,
          lastName: banquestRow.lastName,
          amount: banquestRow.amount,
          email: banquestRow.email,
          recNumber: admireRow.recNumber
        });
        
        // Write RecNumber to Banquest sheet
        banquestSheet.getRange(i + 1, MATCH_CONFIG.BANQUEST_COLUMNS.ADMIRE_REC + 1)
          .setValue(admireRow.recNumber);
        
        matchFound = true;
        matchCount++;
        break;
      }
    }
    
    if (!matchFound) {
      // Log no match found
      console.log(`No match found for row ${banquestRow.rowNum}: LastName = ${banquestRow.lastName}, Amount = ${banquestRow.amount}, Email = ${banquestRow.email}`);
      
      noMatchLog.push({
        banquestRow: banquestRow.rowNum,
        lastName: banquestRow.lastName,
        amount: banquestRow.amount,
        email: banquestRow.email
      });
      
      noMatchCount++;
    }
  }
  
  // Generate and show summary report
  showMatchingSummary(matchCount, noMatchCount, matchLog, noMatchLog);
  
  // Optional: Write detailed log to a sheet
  writeDetailedLog(matchLog, noMatchLog);
}

/**
 * Check if Banquest and Admire rows match
 */
function isMatch(banquestRow, admireRow) {
  return banquestRow.lastName == admireRow.lastName &&
         banquestRow.amount == admireRow.amount &&
         banquestRow.email == admireRow.email;
}

/**
 * Show matching summary in UI
 */
function showMatchingSummary(matchCount, noMatchCount, matchLog, noMatchLog) {
  const ui = SpreadsheetApp.getUi();
  const total = matchCount + noMatchCount;
  
  let message = `Matching Complete!\n\n`;
  message += `Total Records Processed: ${total}\n`;
  message += `✓ Matches Found: ${matchCount} (${(matchCount/total*100).toFixed(1)}%)\n`;
  message += `✗ No Match: ${noMatchCount} (${(noMatchCount/total*100).toFixed(1)}%)\n\n`;
  
  // Show first few unmatched records for review
  if (noMatchLog.length > 0) {
    message += `First 5 Unmatched Records:\n`;
    const showCount = Math.min(5, noMatchLog.length);
    for (let i = 0; i < showCount; i++) {
      const record = noMatchLog[i];
      message += `Row ${record.banquestRow}: ${record.lastName}, $${record.amount}\n`;
    }
  }
  
  ui.alert('Matching Results', message, ui.ButtonSet.OK);
}

/**
 * Write detailed log to a new sheet
 */
function writeDetailedLog(matchLog, noMatchLog) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create or clear log sheet
  let logSheet = ss.getSheetByName('Matching_Log');
  if (!logSheet) {
    logSheet = ss.insertSheet('Matching_Log');
  } else {
    logSheet.clear();
  }
  
  // Add timestamp
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  logSheet.getRange(1, 1).setValue(`Matching Log - ${timestamp}`);
  
  // Add matched records section
  let row = 3;
  logSheet.getRange(row, 1).setValue('MATCHED RECORDS').setFontWeight('bold');
  row++;
  
  if (matchLog.length > 0) {
    // Headers for matched records
    const matchHeaders = ['Banquest Row', 'Admire Row', 'Last Name', 'Amount', 'Email', 'Rec Number'];
    logSheet.getRange(row, 1, 1, matchHeaders.length).setValues([matchHeaders]).setFontWeight('bold');
    row++;
    
    // Data for matched records
    const matchData = matchLog.map(record => [
      record.banquestRow,
      record.admireRow,
      record.lastName,
      record.amount,
      record.email,
      record.recNumber
    ]);
    
    logSheet.getRange(row, 1, matchData.length, matchData[0].length).setValues(matchData);
    row += matchData.length + 2;
  }
  
  // Add unmatched records section
  logSheet.getRange(row, 1).setValue('UNMATCHED RECORDS').setFontWeight('bold');
  row++;
  
  if (noMatchLog.length > 0) {
    // Headers for unmatched records
    const unmatchHeaders = ['Banquest Row', 'Last Name', 'Amount', 'Email'];
    logSheet.getRange(row, 1, 1, unmatchHeaders.length).setValues([unmatchHeaders]).setFontWeight('bold');
    row++;
    
    // Data for unmatched records
    const unmatchData = noMatchLog.map(record => [
      record.banquestRow,
      record.lastName,
      record.amount,
      record.email
    ]);
    
    logSheet.getRange(row, 1, unmatchData.length, unmatchData[0].length).setValues(unmatchData);
  }
  
  // Format the sheet
  logSheet.autoResizeColumns(1, 6);
}

/**
 * Advanced matching with fuzzy logic
 */
function matchWithFuzzyLogic() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const banquestSheet = ss.getSheetByName(MATCH_CONFIG.BANQUEST_SHEET);
  const admireSheet = ss.getSheetByName(MATCH_CONFIG.ADMIRE_SHEET);
  
  const banquestData = banquestSheet.getDataRange().getValues();
  const admireData = admireSheet.getDataRange().getValues();
  
  const fuzzyMatches = [];
  
  // Process with fuzzy matching
  for (let i = 1; i < banquestData.length; i++) {
    const banquestRow = {
      rowNum: i + 1,
      lastName: String(banquestData[i][MATCH_CONFIG.BANQUEST_COLUMNS.LASTNAME]).toLowerCase().trim(),
      amount: parseFloat(banquestData[i][MATCH_CONFIG.BANQUEST_COLUMNS.AMOUNT]),
      email: String(banquestData[i][MATCH_CONFIG.BANQUEST_COLUMNS.EMAIL]).toLowerCase().trim()
    };
    
    // Find best match with scoring
    let bestMatch = null;
    let bestScore = 0;
    
    for (let j = 1; j < admireData.length; j++) {
      const admireRow = {
        rowNum: j + 1,
        lastName: String(admireData[j][MATCH_CONFIG.ADMIRE_COLUMNS.LASTNAME]).toLowerCase().trim(),
        amount: parseFloat(admireData[j][MATCH_CONFIG.ADMIRE_COLUMNS.AMOUNT]),
        email: String(admireData[j][MATCH_CONFIG.ADMIRE_COLUMNS.EMAIL]).toLowerCase().trim(),
        recNumber: admireData[j][MATCH_CONFIG.ADMIRE_COLUMNS.RECNUMBER]
      };
      
      const score = calculateMatchScore(banquestRow, admireRow);
      
      if (score > bestScore && score >= 0.8) { // 80% threshold
        bestScore = score;
        bestMatch = admireRow;
      }
    }
    
    if (bestMatch) {
      fuzzyMatches.push({
        banquestRow: banquestRow.rowNum,
        admireRow: bestMatch.rowNum,
        score: bestScore,
        recNumber: bestMatch.recNumber
      });
      
      // Update sheet with match
      banquestSheet.getRange(i + 1, MATCH_CONFIG.BANQUEST_COLUMNS.ADMIRE_REC + 1)
        .setValue(bestMatch.recNumber)
        .setBackground(bestScore === 1 ? '#90EE90' : '#FFFFE0'); // Green for perfect, yellow for fuzzy
    }
  }
  
  // Show results
  const ui = SpreadsheetApp.getUi();
  ui.alert('Fuzzy Matching Complete', `Found ${fuzzyMatches.length} matches using fuzzy logic`, ui.ButtonSet.OK);
}

/**
 * Calculate match score between two rows
 */
function calculateMatchScore(banquestRow, admireRow) {
  let score = 0;
  let weights = { lastName: 0.4, amount: 0.4, email: 0.2 };
  
  // Last name similarity
  if (banquestRow.lastName === admireRow.lastName) {
    score += weights.lastName;
  } else if (levenshteinDistance(banquestRow.lastName, admireRow.lastName) <= 2) {
    score += weights.lastName * 0.5; // Partial credit for close matches
  }
  
  // Amount match (with tolerance for rounding)
  if (Math.abs(banquestRow.amount - admireRow.amount) < 0.01) {
    score += weights.amount;
  }
  
  // Email match
  if (banquestRow.email === admireRow.email) {
    score += weights.email;
  }
  
  return score;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Menu setup
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Data Matching')
    .addItem('Match Banquest & Admire', 'matchAndPopulateWithLogs')
    .addItem('Fuzzy Match (Advanced)', 'matchWithFuzzyLogic')
    .addItem('View Last Log', 'viewLastLog')
    .addSeparator()
    .addItem('Clear Matches', 'clearMatches')
    .addToUi();
}

/**
 * View the last matching log
 */
function viewLastLog() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logSheet = ss.getSheetByName('Matching_Log');
  
  if (logSheet) {
    ss.setActiveSheet(logSheet);
  } else {
    SpreadsheetApp.getUi().alert('No matching log found. Run matching first.');
  }
}

/**
 * Clear all matches from Banquest sheet
 */
function clearMatches() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Clear Matches',
    'This will clear all RecNumbers from the Banquest sheet. Continue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const banquestSheet = ss.getSheetByName(MATCH_CONFIG.BANQUEST_SHEET);
    const lastRow = banquestSheet.getLastRow();
    
    if (lastRow > 1) {
      banquestSheet.getRange(2, MATCH_CONFIG.BANQUEST_COLUMNS.ADMIRE_REC + 1, lastRow - 1, 1)
        .clearContent()
        .setBackground(null);
    }
    
    ui.alert('Matches cleared successfully.');
  }
}