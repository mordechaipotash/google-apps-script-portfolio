/**
 * "Smart API Response Generator: Effortless Interaction with OpenAI for Dynamic Content Creation"
 * Date: April 22, 2024
 * Tags: API Intergration, Asynchronous Programming, Conversatonal AI Development, Google Apps Script, Google Doc API, Google Sheets API, HTTP API, Intelligent Response Generation, JSON, JavaScript
 * Description: "Effortlessly Generate Smart Responses with Our Google Script: Harnessing AI to Enhance Your API Interactions"
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
 * - Integration with OpenAI API: The script utilizes OpenAI's GPT-3
 * - 5-turbo model to generate dynamic text responses based on user input and spreadsheet data
 * - 2
 * - Custom Functionality: It includes a custom Google Sheets function, SPARKS_GPT35T, designed to combine user prompts with cell values for generating contextual AI responses
 * - 3
 * - Error Handling: The implementation features robust error handling and logging to manage API request failures and ensure smooth operation during interactions
 * - 4
 * - Dynamic Content Generation: The script allows for intelligent content generation directly within Google Sheets, making it suitable for various applications that require real-time data analysis and response generation
 * - 5
 * - JavaScript and Google Apps Script: Written in JavaScript and utilizing Google Apps Script, it facilitates seamless interaction between Google Sheets and external APIs, leveraging JSON for data handling
 */

function SPARKS_GPT35T(promptText, cellValue)  {
  const GPT_API = "OPENAI_API_KEY";
// Replace with your actual API key  const BASE_URL: "https://your-domain.com";
const headers =  {
  "Authorization": "Bearer " + GPT_API,    "Content-Type": "application/json"  
}
;
// Combining both promptText and the content of the cell (cellValue) for the message  const messageContent = promptText + " " + cellValue;
const data =  {
  "model": "gpt-3.5-turbo-0125", // Ensure this is the model you intend to use    "messages": [ {
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
