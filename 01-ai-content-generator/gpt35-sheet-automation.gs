/**
 * "SmartSheet GPT-3.5: Automating Intelligent Responses for Enhanced Data Processing in Google Sheets"
 * Date: May 23, 2024
 * Tags: Asynchronous Programming, Google Sheets API, Intelligent Response Generation, JSON, JavaScript, OpenAI API, RESTful API, Workflow Optimization
 * Description: "Transform Your Google Sheets into an AI-Powered Assistant for Smart Data Responses"
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
 * - Integration with OpenAI API: The script connects Google Sheets to the OpenAI GPT-3
 * - 5 API, allowing for advanced AI text generation based on user inputs and cell data
 * - 2
 * - Custom Functionality: It features a custom function, SPARKS_GPT35Ta, designed for seamless use within Google Sheets, enabling users to dynamically generate contextual responses
 * - 3
 * - Dynamic Content Generation: The script combines user-defined prompts with the contents of spreadsheet cells, facilitating intelligent data processing and enhancing the analytical capabilities of users
 * - 4
 * - Error Handling: It includes robust error handling and logging mechanisms to manage API request failures and ensure stable performance during interactions with the OpenAI API
 * - 5
 * - Use Case Versatility: This project supports various applications, including automated data analysis, intelligent content generation, and enhanced decision-making processes, making it a powerful tool for users of Google Sheets
 */

function SPARKS_GPT35Ta(promptText, cellValue)  {
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
