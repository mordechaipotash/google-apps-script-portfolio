/**
 * Dynamic Conditional Formatting in Google Sheets: Highlighting Criteria-Based Rows for Enhanced Data Clarity
 * Date: July 29, 2024
 * Tags: Data Validation, Error Handling, Google Apps Script, Google Doc API, Google Sheets API, JSON, JavaScript, Version Control
 * Description: Effortlessly Highlight Important Data Gaps in Google Sheets with Custom Conditional Formatting
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Functionality: The script applies custom conditional formatting to cells in Google Sheets based on criteria from two columns, specifically highlighting cells in column B when column A is empty and column B contains the values 1, 2, or 3
 * - 2
 * - Dynamic Range Handling: It dynamically selects and processes the specified ranges in columns A and B, allowing for scalability to accommodate varying amounts of data
 * - 3
 * - Data Processing: The script retrieves values from both columns and uses a loop to evaluate each cell pair, applying formatting conditions and adjusting cell backgrounds accordingly
 * - 4
 * - Color Coding: When the specified conditions are met, the background color of the corresponding cell in column B is set to yellow, enhancing visual identification of important data points
 * - 5
 * - Resetting Formatting: If the conditions are not met, the script resets the background color of the cells to their default state, ensuring that only relevant data is visually emphasized
 */

function applyCustomFormatting()  {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var rangeA = sheet.getRange("A1:A41000");
// Adjust the range as needed  var rangeB = sheet.getRange("B1:B41000");
// Adjust the range as needed  // Get the values of the range in column A and B  var valuesA = rangeA.getValues();
var valuesB = rangeB.getValues();
// Loop through the range and apply formatting based on the condition  for (var i = 0;
i < valuesB.length;
i++)  {
  var cellA = valuesA[i][0];
var cellB = valuesB[i][0];
if ((cellB == 1 || cellB == 2 || cellB == 3) && cellA === ")  {
  sheet.getRange("B" + (i + 1)).setBackground('#FFFF00');
// Set the background color to yellow    
}
else  {
  sheet.getRange("B" + (i + 1)).setBackground(null);
// Reset the background color if condition is not met    
}

}

}
