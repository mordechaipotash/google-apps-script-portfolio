/**
 * "Empowering User Engagement: A Comprehensive GPT-3.5 Integration Script for Dynamic Interactions and Intelligent Responses"
 * Date: May 12, 2024
 * Tags: Conversatonal AI Development, Google Apps Script, Google Sheets API, Intelligent Response Generation, JavaScript, RESTful API
 * Description: ### Effortlessly Enhance Your Google Sheets with AI-Powered Responses
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
 * - Integration: Connects Google Sheets with OpenAI's GPT-3
 * - 5 API to enable intelligent chatbot functionality
 * - 2
 * - Custom Functionality: Implements a custom Google Apps Script function, SPARKS_GPT35T, that allows users to generate AI responses based on prompts combined with cell values
 * - 3
 * - Dynamic Responses: Generates contextually relevant AI content by merging user inputs with spreadsheet data, enhancing interaction through personalized responses
 * - 4
 * - Error Handling: Features robust error handling and logging mechanisms to ensure reliable performance and easier debugging during API interactions
 * - 5
 * - Customization: Allows users to customize response generation parameters such as temperature and maximum tokens for tailored output
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
],    "temperature": 0.6,    "max_tokens": 1000  
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
