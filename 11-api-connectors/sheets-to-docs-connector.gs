/**
 * Automated Data Population: Streamlining Google Sheets to Google Docs Integration
 * Date: 
 * Tags: Array Manipulation, Google Apps Script, Google Doc API, Google Sheets API, JavaScript
 * Description: "Effortlessly Transfer Spreadsheet Data to Google Docs with This Automated Table Populator"
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Data Extraction: The script retrieves data from the active Google Sheets document, allowing for efficient data gathering directly from spreadsheets
 * - 2
 * - Dynamic Doc Integration: It opens a specified Google Doc using its unique ID, enabling seamless integration between Google Sheets and Google Docs
 * - 3
 * - Table Creation: A new table is created at the beginning of the document, ensuring that the extracted data is presented in an organized format
 * - 4
 * - Automated Population: The script populates the newly created table with the extracted data from the sheet, automating the data transfer process
 * - 5
 * - Google Workspace API Utilization: It leverages Google Apps Script along with the Google Sheets and Google Docs APIs for effective data manipulation and document management
 */

function populateTableWithData()  {
  // Get the active sheet
var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
// Get the data range and values from the sheet
var range = sheet.getDataRange();
var values = range.getValues();
// Create an empty array to hold the data
var data = [];
// Loop through the rows of data and add to the array
for (var i = 0;
i < values.length;
i++)  {
  var row = [];
for (var j = 0;
j < values[i].length;
j++)  {
  row.push(values[i][j]);

}
data.push(row);

}
// Open the Google Doc to populate
var doc = DocumentApp.openById('1Lf03Wj_arRqqkem-0LIIKDAed613aaGIuzz9ewoHxwo');
var body = doc.getBody();
// Insert a table at the beginning of the document
var table = body.insertTable(0, data.length, data[0].length);
// Populate the table with the data
for (var i = 0;
i < data.length;
i++)  {
  for (var j = 0;
j < data[i].length;
j++)  {
  table.getCell(i, j).setText(data[i][j]);

}

}
// Save and close the document
doc.saveAndClose();

}
