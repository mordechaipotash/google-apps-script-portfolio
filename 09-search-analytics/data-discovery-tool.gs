/**
 * "Effortless Data Discovery: A Custom Search Tool for Google Sheets"
 * Date: December 17, 2023
 * Tags: Data Manipulation, Google Apps Script, Google Sheets API, JavaScript, RESTful API, Search Algorithims, Spreadsheet Automation, UX/UI, User Expereince Optimization, Workflow Optimization
 * Description: Effortlessly Find What You Need in Google Sheets with Custom Search Functionality
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Custom Menu Creation: The onOpen() function adds a custom menu titled "Custom Search" to the Google Sheets UI, facilitating easy access to the search feature
 * - 2
 * - User Prompt for Search: The searchSheet() function prompts users to input a search keyword, ensuring a user-friendly experience for data retrieval
 * - 3
 * - Case-Insensitive Search: The script searches all columns in the active sheet without regard to case sensitivity, enhancing usability by accommodating various input formats
 * - 4
 * - Dynamic Result Compilation: The script compiles results by concatenating row data and displays the found entries along with their respective row numbers, allowing users to quickly locate relevant information
 * - 5
 * - Feedback on Search Results: After executing the search, the script alerts users with either the found results or a message indicating that no results were found, providing clear feedback on the search process
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
