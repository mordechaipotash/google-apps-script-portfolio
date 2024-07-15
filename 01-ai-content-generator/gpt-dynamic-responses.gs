/**
 * "Dynamic Content Generation: Automating Responses with OpenAI API Integration"
 * Date: July 15, 2024
 * Tags: API Intergration, Conversatonal AI Development, Google Apps Script, Google Doc API, Google Sheets API, Intelligent Response Generation, JSON, JavaScript, RESTful API
 * Description: "Effortlessly Generate Dynamic Responses with Automated ChatGPT Integration"
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
 * - Integration with OpenAI API: The script connects Google Sheets with OpenAI's GPT models to facilitate advanced AI text generation based on user inputs and cell values
 * - 2
 * - Custom Function (SP): A user-defined function named SP is created for Google Sheets, enabling users to generate contextual AI responses by combining prompts with cell data
 * - 3
 * - Error Handling: The script incorporates robust error handling and logging mechanisms to manage API call failures and exceptions, ensuring reliable performance
 * - 4
 * - Dynamic Content Generation: By leveraging the GPT model, the script allows for automated content creation, enabling personalized and intelligent responses tailored to specific data in Google Sheets
 * - 5
 * - Technical Stack: The implementation utilizes JavaScript, Google Apps Script, and RESTful API integration, with JSON for data handling and API interactions
 */

function SP(promptText, cellValue)  {
  const GPT_API = "YOUR_OPENAI_API_KEY_HERE";
// Replace with your actual API key  const BASE_URL: "https://your-domain.com";
const headers =  {
  "Authorization": "Bearer " + GPT_API,    "Content-Type": "application/json"  
}
;
// Combining both promptText and the content of the cell (cellValue) for the message  const messageContent = promptText + " " + cellValue;
const data =  {
  "model": "gpt-4o-2024-05-13", // Ensure this is the model you intend to use    "messages": [ {
  "role": "user",      "content": messageContent    
}
],    "temperature": 0.7,    "max_tokens": 700  
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
