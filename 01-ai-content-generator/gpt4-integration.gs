/**
 * # Smart Integration: Dynamic GPT-4 API Script for Intelligent Response Generation
 * Date: May 9, 2024
 * Tags: API Intergration, API Rate Limiting, Conversatonal AI Development, Data Validation, Google Apps Script, Google Doc API, Google Sheets API, Intelligent Response Generation, JSON, JavaScript, Testing, Version Control
 * Description: "Transform Your Ideas into Engaging Conversations with Our Dynamic GPT-4 Integration Script"
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
 * - Functionality: The script leverages the OpenAI GPT-4 API to generate intelligent responses based on user prompts combined with cell values in Google Sheets
 * - 2
 * - Custom Function: It defines a custom function, SPARKS_GPT4T, which can be invoked within Google Sheets to facilitate dynamic interactions with the AI model
 * - 3
 * - Error Handling: The script includes robust error handling mechanisms to manage API request failures and log errors effectively
 * - 4
 * - API Integration: It establishes a secure connection to the GPT-4 API using necessary authentication headers and formats requests in JSON
 * - 5
 * - Use Cases: The script is designed for automated content generation, dynamic data analysis, and personalized user experiences within the Google Sheets environment
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
  "model": "gpt-4-turbo-2024-04-09", // Ensure this is the model you intend to use    "messages": [ {
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
