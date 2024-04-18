/**
 * "Empowering Data Insights: Harnessing OpenAI's GPT-3.5 for Intelligent Text Generation in Google Sheets"
 * Date: April 18, 2024
 * Tags: API Intergration, Document Automation, Google Apps Script, Google Sheets API, Intelligent Document Processing, JavaScript, Spreadsheet Automation
 * Description: Unlock the Power of AI: Effortlessly Enhance Your Google Sheets with Smart Text Generation
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
 * - API Integration: The script connects Google Sheets with OpenAI's GPT-3
 * - 5 API, enabling seamless access to AI-powered text generation directly from spreadsheets
 * - 2
 * - Custom Functionality: It includes a custom function, SPARKS_GPT35T, that allows users to input prompts and combine them with cell values to generate contextual AI responses
 * - 3
 * - Error Handling: The implementation includes robust error handling and logging to manage API request failures and exceptions, ensuring reliable performance
 * - 4
 * - Dynamic Response Generation: The script dynamically processes user inputs and returns AI-generated content, enhancing data processing and analysis capabilities within Google Sheets
 * - 5
 * - Future Scalability: Potential enhancements may include caching for optimized API usage, user interface improvements for prompt customization, and expanded functionality for broader application across Google Workspace
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
],    "temperature": 0.8,    "max_tokens": 1500  
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
