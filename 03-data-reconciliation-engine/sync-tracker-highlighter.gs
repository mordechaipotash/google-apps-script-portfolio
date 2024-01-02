/**
 * "Seamless Synchronization: Highlighting and Tracking Matching Rows Between Banquest and Admire Sheets using Google Apps Script"
 * Date: January 2, 2024
 * Tags: Data Intergration, Data Manipulation, Google Apps Script, Google Sheets API, JavaScript, Spreadsheet Automation, Workflow Optimization
 * Description: Effortlessly Sync and Highlight Matching Data Across Your Google Sheets for Streamlined Workflow
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Automated Data Comparison: The script compares rows between two Google Sheets ("Banquest" and "Admire") based on multiple criteria, ensuring that only unprocessed rows are considered for matching
 * - 2
 * - Dynamic Column Identification: It dynamically identifies relevant columns in both sheets by using header names, allowing for flexibility in the implementation without hardcoding column indices
 * - 3
 * - Row Highlighting: Upon finding matching rows, the script highlights them in light green in both sheets, enhancing visual tracking and ensuring users can easily identify synchronized entries
 * - 4
 * - Control Column for Tracking: A control column is implemented in both sheets to mark processed entries with the current date, preventing duplicate processing and maintaining data integrity
 * - 5
 * - Efficient Iteration and Search: The script iterates through the data efficiently, concatenating row values into a single string for simple string searches, which streamlines the matching process across potentially large datasets
 */

function highlightMatchingRows()  {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
var banquestSheet = ss.getSheetByName("Banquest");
// Replace with your actual sheet name  var admireSheet = ss.getSheetByName("Admire");
// Replace with your actual sheet name  var currentDate = new Date();
// Current date for marking processed rows  var banquestData = banquestSheet.getDataRange().getValues();
var admireData = admireSheet.getDataRange().getValues();
// Find column indices based on header names in Banquest and Admire  var banquestHeaders = banquestData[0];
var admireHeaders = admireData[0];
var banquestControlCol = banquestHeaders.indexOf("Control Col") + 1;
// Adjust for 1-based index  var admireControlCol = admireHeaders.indexOf("Control Col") + 1;
// Adjust for 1-based index  var banquest =  {
  originalAmount: banquestHeaders.indexOf("Original Amount") + 1,    email: banquestHeaders.indexOf("Email") + 1,    billingLastName: banquestHeaders.indexOf("Billing Last Name") + 1,    date: banquestHeaders.indexOf("Date") + 1  
}
;
// Loop through data in Banquest  for (var i = 1;
i < banquestData.length;
i++)  {
  if (banquestData[i][banquestControlCol - 1]) continue;
// Skip if Control Col is already set    var rowFound = false;
// Check each row in Admire    for (var j = 1;
j < admireData.length && !rowFound;
j++)  {
  if (admireData[j][admireControlCol - 1]) continue;
// Skip if Control Col is already set      var rowInAdmire = admireData[j].join("|");
// Concatenate all cells for a simple string search      // Check if all values from Banquest are in the Admire row      if (rowInAdmire.includes(banquestData[i][banquest.originalAmount - 1]) &&          rowInAdmire.includes(banquestData[i][banquest.email - 1]) &&          rowInAdmire.includes(banquestData[i][banquest.billingLastName - 1]) &&          rowInAdmire.includes(banquestData[i][banquest.date - 1]))  {
  // Highlight rows in both sheets in light green        banquestSheet.getRange(i + 1, 1, 1, banquestHeaders.length).setBackground("#90EE90");
admireSheet.getRange(j + 1, 1, 1, admireHeaders.length).setBackground("#90EE90");
// Set current date in Control Column        banquestSheet.getRange(i + 1, banquestControlCol).setValue(currentDate);
admireSheet.getRange(j + 1, admireControlCol).setValue(currentDate);
rowFound = true;
// Mark as found to avoid duplicate highlights in Admire for the same Banquest row      
}

}

}

}
