/**
 * "AI-Powered Hebrew Translation Tool: Enhance Your Torah Study with Accurate Translations"
 * Date: April 24, 2024
 * Tags: API Intergration, Document Automation, Google Apps Script, Google Doc API, JSON, JavaScript, NLP, RESTful API
 * Description: Transform Your Hebrew Text into Accurate English Translations Effortlessly with Our GPT-3 Powered Tool for Torah Scholars
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
 * - Menu Integration: The script adds a custom "GPT-3 Translate" menu in Google Docs, enabling users to select Hebrew text for translation
 * - 2
 * - Selection-Based Translation: It captures the user's selected Hebrew text and prepares a tailored prompt for the OpenAI GPT-3 API to obtain accurate English translations
 * - 3
 * - API Interaction: The script utilizes the OpenAI GPT-3 API for advanced language processing, sending requests and handling responses to extract translated text
 * - 4
 * - Translation Logging: Translations are automatically logged within the document, capturing both the original Hebrew text and its corresponding English translation for future reference
 * - 5
 * - Error Handling: The implementation includes user-friendly alerts and error handling to manage issues with text selection and API requests effectively
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
if (selectedText.trim() === '')  {
  DocumentApp.getUi().alert('Please select some text to translate.');
return;

}
const promptText = "Function as a seasoned Torah Scholar with deep knowledge of Torah study and extensive experience translating the works of the Hebrew Rishonim. Provide a clear, reliable English translation of the Hebrew text that accurately conveys the author's intended meaning. Focus on translating the overall sense of each sentence rather than individual words. Ensure the English version faithfully represents the original in a way the author would approve, without adding personal interpretations. Please provide only the translation, without any additional explanations or commentary.\n\nBelow is the original Hebrew text:\n" + selectedText;
const translatedText = gpt3T(promptText);
console.log('Translated text: ' + translatedText);
const body = doc.getBody();
const translationLogHeading = body.findText('Translation Log');
if (!translationLogHeading)  {
  body.appendParagraph('Translation Log').setHeading(DocumentApp.ParagraphHeading.HEADING1);

}
const translationEntry = `Selected Text: $ {
  selectedText
}
\nTranslation: $ {
  translatedText
}
\n`;
body.appendParagraph(translationEntry);

}
else  {
  DocumentApp.getUi().alert('Please select some text to translate.');

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
