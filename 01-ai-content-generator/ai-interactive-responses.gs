/**
 * # AI-Powered Interactive Response Generation Script for Google Sheets
 * Date: March 10, 2024
 * Tags: API Intergration, Conversatonal AI Development, Google Apps Script, Google Sheets API, Intelligent Response Generation, JSON, JavaScript, OpenAI API, RESTful API
 * Description: Empower Your Spreadsheets with Smart AI Responses for Enhanced User Engagement
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
 * - API Integration: The script connects Google Sheets with the OpenAI API, enabling AI-driven text generation using the GPT-4 model
 * - 2
 * - Custom Functionality: It includes a custom function named SPARKS_GPT4T, which allows users to generate intelligent responses based on prompts and spreadsheet data
 * - 3
 * - Dynamic User Interaction: The function dynamically combines user input with cell values to provide contextually relevant responses
 * - 4
 * - Error Handling: The script incorporates robust error handling and logging mechanisms to manage API request failures and exceptions effectively
 * - 5
 * - Configurability: Users can customize AI response parameters such as temperature and max tokens to fine-tune the output according to their needs
 */

function SPARKS_GPT4T(promptText, cellValue)  {
  const GPT_API = "YOUR_OPENAI_API_KEY_HERE";
// Replace with your actual API key  const BASE_URL: "https://your-domain.com";
const headers =  {
  "Authorization": "Bearer " + GPT_API,    "Content-Type": "application/json"  
}
;
// Combining both promptText and the content of the cell (cellValue) for the message  const messageContent = promptText + " " + cellValue;
const data =  {
  "model": "gpt-4-0125-preview", // Ensure this is the model you intend to use    "messages": [ {
  "role": "user",      "content": messageContent    
}
],    "temperature": 0.5,    "max_tokens": 150  
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
  console.error("Error fetching data from OpenAI:", error);
return "An error occurred during the API request.";

}

}
