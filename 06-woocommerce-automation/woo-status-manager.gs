/**
 * Automated Workflow Enhancer: Streamlining WooCommerce Data Management with Google Sheets
 * Date: December 27, 2023
 * Tags: Data Automation, Google Apps Script, Google Sheets API, JavaScript, Spreadsheet Automation, Spreadsheet Functions, User Experience (UX) Design, Version Control, Workflow Optimization
 * Description: "Streamline Your WooCommerce Data Management: Effortlessly Automate Status Updates with Google Sheets"
 * 
 * Auto-parsed from CSV on 2025-09-14
 */

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
  PropertiesService.getScriptProperties().setProperty('WOO_API_KEY', 'YOUR_WOOCOMMERCE_API_KEY_HERE');
  PropertiesService.getScriptProperties().setProperty('WOO_API_SECRET', 'YOUR_WOOCOMMERCE_SECRET_HERE');
  PropertiesService.getScriptProperties().setProperty('STORE_URL', 'https://your-store-domain.com');
  
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
 * Technical Details:
 * - 1
 * - Event-Driven Functionality: The script utilizes the onEdit function to trigger actions automatically whenever a user edits the specified Google Sheet, particularly focusing on changes made in Column E
 * - 2
 * - Data Validation: It checks if the dropdown value in Column E is either 'Exception' or 'Entered in db' and ensures that appropriate notes are provided in Column D, enhancing data integrity
 * - 3
 * - Dynamic Updates: The script updates Columns A, B, and C with relevant status messages, user information, and timestamps based on the dropdown selection, ensuring real-time data reflection
 * - 4
 * - User Alerts: It provides immediate feedback to users through alerts if they attempt to mark an entry as 'Exception' without accompanying notes, ensuring that all necessary information is recorded
 * - 5
 * - Visual Feedback: The script incorporates color-coding in Column A to visually indicate the status of entries, facilitating quick identification of the current state of the data
 */

function onEdit(e)  {
  var sheet = e.source.getSheetByName('woocom slice');
var range = e.range;
var editedRow = range.getRow();
var editedCol = range.getColumn();
// Check if the edit is in Column E  if (editedCol === 5)  {
  var dropdownValue = sheet.getRange(editedRow, 5).getValue();
var note = sheet.getRange(editedRow, 4).getValue();
// Get the value in Column D    var user = Session.getActiveUser().getEmail();
var date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");
if (dropdownValue === 'Exception')  {
  if (!note)  {
  // Alert if no note is present and revert the dropdown value        SpreadsheetApp.getUi().alert('⚠️Please enter a note in Column D for the exception.');
sheet.getRange(editedRow, 5).setValue('-');
// Reverting the dropdown to default value '-'      
}
else  {
  // Update Columns A, B, and C when there is a note for the exception        sheet.getRange(editedRow, 1).setValue('Ready for db').setFontColor('red');
// Column A        sheet.getRange(editedRow, 2).setValue(user);
// Column B        sheet.getRange(editedRow, 3).setValue(date);
// Column C      
}

}
else if (dropdownValue === 'Entered in db')  {
  // Update Columns A, B, and C for 'Entered in db'      sheet.getRange(editedRow, 1).setValue('In db').setFontColor(null);
// Reset color and update text      sheet.getRange(editedRow, 2).setValue(user);
// Column B      sheet.getRange(editedRow, 3).setValue(date);
// Column C    
}
else  {
  // Reset font color and text in Column A if neither 'Exception' nor 'Entered in db' is selected      sheet.getRange(editedRow, 1).setValue('Ready for db').setFontColor(null);

}

}

}
