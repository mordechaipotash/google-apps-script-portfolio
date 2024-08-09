/**
 * "Seamless AI Integration: Enhancing User Interaction with OpenRouter API in Google Sheets"
 * Date: August 9, 2024
 * Tags: Asynchronous Programming, Conversatonal AI Development, Data Automation, Error Handling, Google Apps Script, Intelligent Response Generation, JSON, JavaScript, OpenAI API, User Experience (UX) Design, Web Development
 * Description: "Transform Your Google Sheets with AI: Smart Responses Made Easy"
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
  PropertiesService.getScriptProperties().setProperty('OPENAI_API_KEY', 'YOUR_OPENAI_API_KEY_HERE');
  
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
 * - Integration with OpenRouter API: The script connects Google Sheets with the OpenRouter API to enable AI-driven responses based on user inputs
 * - 2
 * - Custom Functionality: It introduces a custom function, MINI, designed for seamless use within Google Sheets, allowing users to generate contextual AI responses by combining prompts with cell values
 * - 3
 * - Error Handling: The script includes robust error handling and logging mechanisms to manage API request failures and exceptions, ensuring reliable performance
 * - 4
 * - Asynchronous Operations: It employs asynchronous programming techniques to handle API requests without blocking the execution of other tasks in Google Sheets
 * - 5
 * - Dynamic User Interaction: The implementation supports various use cases such as customer support automation and personalized user experiences, enhancing user interaction within spreadsheet environments
 */

function MINI(promptText, cellValue)  {
  const OPENROUTER_API_KEY = "' + PropertiesService.getScriptProperties().getProperty('OPENROUTER_API_KEY') || 'YOUR_OPENROUTER_API_KEY_HERE' + '";
// Replace with your actual OpenRouter API key  const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";
const YOUR_SITE_URL = "https://your-site-url.com";
// Replace with your actual site URL  const YOUR_APP_NAME = "Your App Name";
// Replace with your actual app name  const headers =  {
  "Authorization": "Bearer " + OPENROUTER_API_KEY,    "Content-Type": "application/json",    "HTTP-Referer": YOUR_SITE_URL,    "X-Title": YOUR_APP_NAME  
}
;
// Combining both promptText and the content of the cell (cellValue) for the message  const messageContent = promptText + " " + cellValue;
const data =  {
  "model": "openai/gpt-4o-mini",    "messages": [ {
  "role": "user",      "content": messageContent    
}
],    "max_tokens": 150  
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
  // Adjust the access path as necessary based on the actual response structure      return responseBody.choices[0].message.content;

}
else  {
  console.error("API request failed", responseBody);
return "API request failed with response code: " + responseCode;

}

}
catch (error)  {
  console.error("Error fetching data from OpenRouter:", error);
return "An error occurred during the API request.";

}

}
