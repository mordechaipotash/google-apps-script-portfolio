/**
 * Hebrew to English Translation Tool: Accurate, Contextual, and User-Friendly Documentation Script
 * Date: April 24, 2024
 * Tags: API Intergration, Document Automation, Google Apps Script, Google Doc API, JavaScript, NLP, UX/UI
 * Description: Effortlessly Translate Hebrew Text to English with Automatic Logging for Easy Reference
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
 * - Translation Functionality: The script allows users to select Hebrew text in a Google Document and translate it into English using the GPT-3 API, ensuring accurate conveyance of the original meaning
 * - 2
 * - Automatic Logging: Translations are automatically logged within the document, recording both the selected Hebrew text and its English translation for future reference
 * - 3
 * - Custom Google Docs Menu: A user-friendly custom menu named 'GPT-3 Translate' is created in Google Docs, providing easy access to the translation feature
 * - 4
 * - Error Handling: The script includes error handling mechanisms to manage API request failures and notify users if no text is selected for translation
 * - 5
 * - API Integration: Utilizes the OpenAI GPT-3 API for advanced language translation capabilities, incorporating JSON data handling and HTTP request methods to facilitate seamless communication with the API
 */

function onOpen(e)  {
  DocumentApp.getUi().createMenu('GPT-3 Translate')    .addItem('Translate Selected Text', 'translateSelectedText')    .addToUi();

}
function translateSelectedText()  {
  const doc = DocumentApp.getActiveDocument();
const selection = doc.getSelection();
if (selection)  {
  const selectedText = selection.getRangeElements().map(rangeElement => rangeElement.getElement().asText().getText()).join('');
console.log('Selected text: ' + selectedText);
const promptText = "Function as a seasoned Torah Scholar with deep knowledge of Torah study and extensive experience translating the works of the Hebrew Rishonim. Provide a clear, reliable English translation of the Hebrew text that accurately conveys the author's intended meaning. Focus on translating the overall sense of each sentence rather than individual words. Ensure the English version faithfully represents the original in a way the author would approve, without adding personal interpretations. Please provide only the translation, without any additional explanations or commentary.\n\nBelow is the original Hebrew text:\n" + selectedText;
const translatedText = gpt3T(promptText);
console.log('Translated text: ' + translatedText);
const body = doc.getBody();
const translationLogHeading = body.findText('Translation Log');
if (!translationLogHeading)  {
  body.appendParagraph('Translation Log').setHeading(DocumentApp.ParagraphHeading.HEADING1);

}
const selectedElements = selection.getRangeElements();
const lastElement = selectedElements[selectedElements.length - 1];
const page = doc.getBody().getChildIndex(lastElement.getElement().getParent()) + 1;
const translationEntry = `Page $ {
  page
}
:\nSelected Text: $ {
  selectedText
}
\nTranslation: $ {
  translatedText
}
\n`;
body.appendParagraph(translationEntry);

}
else  {
  DocumentApp.getUi().alert('Please select the Hebrew text you want to translate.');

}

}
function gpt3T(promptText)  {
  const GPT_API = "OPENAI_API_KEY";
// Replace with your actual API key  const BASE_URL: "https://your-domain.com";
const headers =  {
  "Authorization": "Bearer " + GPT_API,    "Content-Type": "application/json"  
}
;
const data =  {
  "model": "gpt-3.5-turbo",    "messages": [ {
  "role": "user", "content": promptText 
}
],    "temperature": 0.5,    "max_tokens": 1000  
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
console.log('API response code: ' + responseCode);
console.log('API response body: ' + JSON.stringify(responseBody));
if (responseCode === 200)  {
  return responseBody.choices[0].message.content;

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
