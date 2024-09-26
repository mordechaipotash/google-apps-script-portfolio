/**
 * "Seamless AI Integration: Empowering User Engagement with OpenRouter in Google Apps Script"
 * Date: September 26, 2024
 * Tags: API Intergration, Asynchronous Programming, Conversatonal AI Development, Google Apps Script, Intelligent Response Generation, JSON, JavaScript
 * Description: "Transform Your Google Workspace with an AI-Powered Chatbot: Effortless User Interaction at Your Fingertips"
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
 * - API Integration: The script connects Google Apps Script with OpenRouter API, enabling advanced AI text generation for dynamic user interactions
 * - 2
 * - Custom Functionality: It includes a custom function named FOURo that handles API requests, input validation, and response processing to streamline implementation
 * - 3
 * - Error Handling: Comprehensive error handling and logging mechanisms are built into the script to ensure reliability and facilitate debugging
 * - 4
 * - Flexible Configuration: The script allows for optional configuration settings, such as site URL and name, enhancing the adaptability of AI responses based on user context
 * - 5
 * - Use Cases and Applications: It is designed for enhancing Google Workspace applications, enabling intelligent chatbots, automating content creation, and developing interactive tools within the Google ecosystem
 */

function FOURo(prompt)  {
  var OPENROUTER_API_KEY = "' + PropertiesService.getScriptProperties().getProperty('OPENROUTER_API_KEY') || 'YOUR_OPENROUTER_API_KEY_HERE' + '";
var YOUR_SITE_URL = ";
// Optional, for including your app on openrouter.ai rankings.  var YOUR_SITE_NAME = ";
// Optional. Shows in rankings on openrouter.ai.  // Log the prompt value  Logger.log("Prompt received: '" + prompt + "'");
// Trim the prompt and check if it is empty  if (!prompt || prompt.trim().length === 0)  {
  throw new Error("Prompt cannot be empty. Please provide a valid input.");

}
var url = "https://openrouter.ai/api/v1/chat/completions";
var headers =  {
  "Authorization": "Bearer " + OPENROUTER_API_KEY,    "Referer": YOUR_SITE_URL, // Use "Referer" if "HTTP-Referer" is incorrect.    "X-Title": YOUR_SITE_NAME,    "Content-Type": "application/json"  
}
;
var payload =  {
  "model": "openai/gpt-4o-2024-08-06",    "messages": [       {
  "role": "system",        "content": "You are a helpful and friendly assistant. Your goal is to assist the user by providing clear, accurate, and concise information. Always aim to be supportive, understanding, and prompt in your responses."      
}
,       {
  "role": "user",        "content": prompt      
}
]  
}
;
var options =  {
  "method": "post",    "headers": headers,    "payload": JSON.stringify(payload),    "muteHttpExceptions": true  
}
;
try  {
  var response = UrlFetchApp.fetch(url, options);
if (response.getResponseCode() === 200)  {
  var responseJson = JSON.parse(response.getContentText());
if (responseJson.choices && responseJson.choices[0] && responseJson.choices[0].message)  {
  var responseText = responseJson.choices[0].message.content;
return responseText;

}
else  {
  Logger.log("Unexpected API response format: " + JSON.stringify(responseJson));
throw new Error("Unexpected API response format. Check logs for details.");

}

}
else  {
  var errorMessage = response.getContentText();
throw new Error("API request failed with status code " + response.getResponseCode() + ". Error message: " + errorMessage);

}

}
catch (error)  {
  Logger.log("Error: " + error.message);
throw error;

}

}
