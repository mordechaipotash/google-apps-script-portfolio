/**
 * # "Cognitive Response Enhancer: Dynamic Interaction Through API-Driven Intelligence"
 * Date: March 10, 2024
 * Tags: API Intergration, Asynchronous Programming, Data Parsing, Google Apps Script, Intelligent Response Generation, JSON, JavaScript, RESTful API, User Expereince Optimization, Version Control
 * Description: Transform User Queries into Engaging Conversations with Dynamic Response Generation
 * 
 * Auto-parsed from CSV on 2025-09-14
 */

/**
 * SECURITY SETUP - RUN THIS FIRST!
 * This script requires API configuration for security
 * 
 * Instructions:
 * 1. Get your OpenRouter API key from https://openrouter.ai/keys
 * 2. Run this function once
 * 3. Enter your API key when prompted
 * 4. Key will be securely stored in Script Properties
 * 
 * Never hardcode API keys directly in the script!
 */
function setupConfiguration() {
  const ui = SpreadsheetApp.getUi();
  
  // Check if already configured
  const existingKey = PropertiesService.getScriptProperties().getProperty('OPENROUTER_API_KEY');
  if (existingKey && existingKey !== 'YOUR_OPENROUTER_API_KEY_HERE') {
    const response = ui.alert(
      'Configuration Exists',
      'API key is already configured. Do you want to update it?',
      ui.ButtonSet.YES_NO
    );
    if (response !== ui.Button.YES) {
      return;
    }
  }
  
  // Prompt for API key
  const result = ui.prompt(
    'API Configuration',
    'Enter your OpenRouter API Key:\n(Get one at https://openrouter.ai/keys)',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (result.getSelectedButton() === ui.Button.OK) {
    const apiKey = result.getResponseText().trim();
    
    if (apiKey && apiKey.startsWith('sk-or-v1-')) {
      // Store the API key securely
      PropertiesService.getScriptProperties().setProperty('OPENROUTER_API_KEY', apiKey);
      
      // Verify storage
      const stored = PropertiesService.getScriptProperties().getProperty('OPENROUTER_API_KEY');
      if (stored === apiKey) {
        ui.alert(
          'Success!',
          'API key has been securely configured. You can now use the script.',
          ui.ButtonSet.OK
        );
      } else {
        ui.alert(
          'Error',
          'Failed to save API key. Please try again.',
          ui.ButtonSet.OK
        );
      }
    } else {
      ui.alert(
        'Invalid Key',
        'Please enter a valid OpenRouter API key (should start with sk-or-v1-)',
        ui.ButtonSet.OK
      );
    }
  }
}

/**
 * Remove stored API configuration
 */
function removeConfiguration() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Remove Configuration',
    'Are you sure you want to remove the stored API key?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    PropertiesService.getScriptProperties().deleteProperty('OPENROUTER_API_KEY');
    ui.alert('Configuration Removed', 'API key has been removed.', ui.ButtonSet.OK);
  }
}



/**
 * Technical Details:
 * - 1
 * - API Integration: The script integrates with the OpenRouter API to leverage AI-powered response generation, allowing for dynamic interactions based on user input
 * - 2
 * - Functionality: The core function, SPARKS_DOLPHIN, handles API requests, manages authentication, and processes JSON responses to return intelligent outputs
 * - 3
 * - Error Handling: Robust error handling is implemented to address issues during API calls, ensuring that unexpected responses or failures are managed gracefully
 * - 4
 * - Asynchronous Processing: The script employs asynchronous operations to optimize performance, enabling efficient handling of API requests without blocking other processes
 * - 5
 * - Use Cases: It is designed for various applications, including enhancing user interactions in Google Workspace, generating dynamic content, and providing intelligent responses for chatbots and virtual assistants
 */

function SPARKS_DOLPHIN(prompt)  {
  var OPENROUTER_API_KEY = "' + PropertiesService.getScriptProperties().getProperty('OPENROUTER_API_KEY') || 'YOUR_OPENROUTER_API_KEY_HERE' + '";
var YOUR_SITE_URL = ";
// Optional, for including your app on http://openrouter.ai/ rankings.
var YOUR_SITE_NAME = ";
// Optional. Shows in rankings on http://openrouter.ai/.

var url = "https://openrouter.ai/api/v1/chat/completions";
var headers =  {
  "Authorization": "Bearer " + OPENROUTER_API_KEY,
"HTTP-Referer": YOUR_SITE_URL,
"X-Title": YOUR_SITE_NAME,
"Content-Type": "application/json"

}
;
var payload =  {
  "model": "cognitivecomputations/dolphin-mixtral-8x7b",
"messages": [
 {
  "role": "user",
"content": prompt

}
]

}
;
var options =  {
  "method": "post",
"headers": headers,
"payload": JSON.stringify(payload),
"muteHttpExceptions": true

}
;
var response = UrlFetchApp.fetch(url, options);
if (response.getResponseCode() === 200)  {
  var responseJson = JSON.parse(response.getContentText());
if (responseJson["choices"] && responseJson["choices"][0] && responseJson["choices"][0]["message"])  {
  var responseText = responseJson["choices"][0]["message"]["content"];
return responseText;

}
else  {
  throw new Error("Unexpected API response format");

}

}
else  {
  var errorMessage = response.getContentText();
throw new Error("API request failed with status code " + response.getResponseCode() + ". Error message: " + errorMessage);

}

}
