/**
 * "Efficient Data Reconciliation: Automated Matching and Logging Script for Banquest and Admire Sheets"
 * Date: January 1, 2024
 * Tags: Data Intergration, Data Matching Techniques, Data Validation, Google Apps Script, Google Sheets API, JavaScript, Performance Optimization, Spreadsheet Automation, Version Control, Workflow Optimization
 * Description: "Seamlessly Match and Log Data Between Banquest and Admire Sheets for Enhanced Accuracy and Efficiency"
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Data Retrieval: The script retrieves data from two Google Sheets named "Raw_Banquest" and "Raw_Admire" using the Google Sheets API
 * - 2
 * - Nested Loop Comparison: It employs a nested loop to compare entries from the two sheets based on specific criteria: last name, amount, and email
 * - 3
 * - Logging Mechanism: A logging system is integrated to record both successful matches and instances where no match is found, enhancing transparency and debugging capabilities
 * - 4
 * - Data Update: Upon finding a match, the script updates the "Raw_Banquest" sheet by inserting the corresponding reference number from the "Raw_Admire" sheet
 * - 5
 * - Efficiency: The script is designed to handle large datasets efficiently, automating the reconciliation process and reducing manual data entry errors
 */

function matchAndPopulateWithLogs()  {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
var banquestSheet = ss.getSheetByName("Raw_Banquest");
var admireSheet = ss.getSheetByName("Raw_Admire");
var banquestData = banquestSheet.getDataRange().getValues();
var admireData = admireSheet.getDataRange().getValues();
// Assuming the first row is headers  for (var i = 1;
i < banquestData.length;
i++)  {
  var matchFound = false;
for (var j = 1;
j < admireData.length;
j++)  {
  if (banquestData[i][10] == admireData[j][14] && // LastName          banquestData[i][4] == admireData[j][6] && // Amount          banquestData[i][6] == admireData[j][3])  {
  // Email        // Log the match        console.log('Match found for row ' + (i+1) + ' in Raw_Banquest: LastName = ' + banquestData[i][7] + ', Amount = ' + banquestData[i][4] + ', Email = ' + banquestData[i][6]);
// Set the value from Raw_Admire's RecNumber to Raw_Banquest's Admire column        banquestSheet.getRange(i + 1, 1).setValue(admireData[j][27]);
// Assuming RecNumber is in the 28th column (Index: 27)        matchFound = true;
break;

}

}
if (!matchFound)  {
  // Log no match found      console.log('No match found for row ' + (i+1) + ' in Raw_Banquest: LastName = ' + banquestData[i][7] + ', Amount = ' + banquestData[i][4] + ', Email = ' + banquestData[i][6]);

}

}

}
