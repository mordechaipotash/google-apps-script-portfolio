/**
 * Automated Sonnet Generation: Integrating Anthropic API with Google Sheets for Creative Writing
 * Date: August 4, 2024
 * Tags: API Intergration, Error Handling, Google Apps Script, Google Sheets API, JavaScript, Spreadsheet Automation
 * Description: "Effortlessly Generate Creative Content with this Google Sheets Automation Tool"
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
  PropertiesService.getScriptProperties().setProperty('ANTHROPIC_API_KEY', 'YOUR_ANTHROPIC_API_KEY_HERE');
  
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
 * - Purpose: The script is designed to interact with the Anthropic API to generate text based on a user-provided prompt and a cell value from a Google Sheet
 * - 2
 * - API Key and Configuration: It utilizes an API key for authentication and sets up the necessary headers and payload, which includes the model type and the message content
 * - 3
 * - Error Handling: The script includes error handling to manage failed API requests and exceptions, logging errors to the console and returning appropriate messages
 * - 4
 * - Response Processing: Upon a successful request (HTTP status code 200), it extracts the generated text from the API response and writes it to the adjacent cell in the active Google Sheet
 * - 5
 * - Integration with Google Apps Script: The script leverages Google Apps Script functionality, specifically UrlFetchApp for making HTTP requests and SpreadsheetApp for manipulating Google Sheets
 */

function SPARKS_SONNET(promptText, cellValue)  {
  const ANTHROPIC_API_KEY: "YOUR_ANTHROPIC_API_KEY_HERE";
const BASE_URL: "https://your-domain.com";
const headers =  {
  "x-api-key": ANTHROPIC_API_KEY, // Note the lowercase "x"  "anthropic-version": "2023-06-01",  "Content-Type": "application/json"
}
;
const messageContent = promptText + " " + cellValue;
const data =  {
  "model": "claude-3-sonnet-20240229",    "max_tokens": 1000,    "messages": [       {
  "role": "user", "content": messageContent 
}
]  
}
;
const options =  {
  "method": "post",    "headers": headers,    "muteHttpExceptions": true,    "payload": JSON.stringify(data)  
}
;
try  {
  const response = UrlFetchApp.fetch(BASE_URL, options);
const responseCode = response.getResponseCode();
const responseBody = JSON.parse(response.getContentText());
if (responseCode === 200)  {
  const generatedText = responseBody.content[0].text;
// Write the generated text to the Google Sheet      const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getActiveSheet();
const cell = sheet.getActiveCell();
cell.offset(0, 1).setValue(generatedText);
return generatedText;

}
else  {
  console.error("API request failed", responseBody);
return "API request failed with response code: " + responseCode;

}

}
catch (error)  {
  console.error("Error fetching data from Anthropic:", error);
return "An error occurred during the API request.";

}

}
