/**
 * "Smart Search: Unlocking Data Insights in Google Sheets with Custom Search Functionality"
 * Date: December 17, 2023
 * Tags: API Intergration, Data Validation, Google Apps Script, Google Doc API, JSON, JavaScript, Spreadsheet Automation, Version Control, Workflow Optimization
 * Description: Quickly Find Any Data in Your Google Sheets with a Simple Search Tool!
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Custom Menu Creation: The script enhances the Google Sheets interface by adding a custom menu titled 'Custom Search' for user access
 * - 2
 * - User Input Prompt: It prompts users to enter a search keyword, making the search process interactive and user-friendly
 * - 3
 * - Data Retrieval: The script retrieves all data from the active sheet and processes it for keyword matching
 * - 4
 * - Case-Insensitive Search: It performs a case-insensitive search across all rows in the sheet, ensuring that results are found regardless of the text case
 * - 5
 * - Result Display: Search results are displayed in an alert dialog, providing immediate feedback to users, or a message indicating 'no results found' if applicable
 */

// This function adds a custom menu to the spreadsheet.function onOpen()  {
  const ui = SpreadsheetApp.getUi();
ui.createMenu('Custom Search')    .addItem('Search Data', 'searchSheet')    .addToUi();

}
// This function prompts the user for a search term, searches the active sheet,// and displays the results.function searchSheet()  {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const ui = SpreadsheetApp.getUi();
const response = ui.prompt('Enter search keyword');
if (response.getSelectedButton() === ui.Button.OK)  {
  const keyword = response.getResponseText().toLowerCase();
const data = sheet.getDataRange().getValues();
let found = [];
data.forEach((row, index) =>  {
  // This concatenates all the values in the row and checks if it includes the keyword.      if (row.join('|').toLowerCase().includes(keyword))  {
  // If a match is found, add the row information to the 'found' array.        found.push(`Row $ {
  index + 1
}
: $ {
  row.join(', ')
}
`);

}

}
);
// Displaying the results or a 'no results' message.    if (found.length > 0)  {
  ui.alert('Results:\n' + found.join('\n'));

}
else  {
  ui.alert('No results found.');

}

}

}
