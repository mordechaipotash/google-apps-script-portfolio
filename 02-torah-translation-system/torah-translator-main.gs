/**
 * ArtScroll Style Torah Translation Script
 * Date: October 1, 2024
 * Description: Translates Hebrew Torah texts into reverent English using AI
 * API: OpenRouter (Claude 3.5 Sonnet)
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
  PropertiesService.getScriptProperties().setProperty('ANTHROPIC_API_KEY', 'YOUR_ANTHROPIC_API_KEY_HERE');
  
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
 * Translates Hebrew Torah text to English in ArtScroll style with Markdown formatting
 * @param {string} text - The Hebrew text to translate
 * @return {string} The translated text in Markdown format or error message
 * @customfunction
 */
function TRANSLATE(text) {
  // Input validation
  if (!text || text.trim() === "") {
    return "Error: Input text is empty. Please provide a valid Hebrew text.";
  }
  
  // API Configuration
  const API_KEY = PropertiesService.getScriptProperties().getProperty('OPENROUTER_API_KEY') || 
                  PropertiesService.getScriptProperties().getProperty('OPENROUTER_API_KEY') || 'YOUR_OPENROUTER_API_KEY_HERE';
  const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  
  // Prepare the prompt for ArtScroll-style translation
  const prompt = `# Torah Translation Prompt: ArtScroll Style with Markdown Formatting

You are tasked with translating a given Torah text into English in the style of ArtScroll translations, and formatting the output in Markdown. Follow these steps:

1. Receive the Hebrew Torah text or reference (book, chapter, and verse).
2. If given a reference, retrieve the corresponding Hebrew text.
3. Translate the Hebrew text into English, adhering to these ArtScroll-style guidelines:
   - Use formal, reverent language
   - Maintain traditional interpretations
   - Prefer literal translations where possible, but prioritize clarity of meaning
   - Use "Hashem" for the Tetragrammaton
   - Capitalize pronouns referring to God (e.g., "He", "His")
4. Format the translation in Markdown:
   - Use a level 2 heading (##) for the book name
   - Use a level 3 heading (###) for the chapter and verse numbers
   - Present the English translation as regular text
   - If including the Hebrew, use a blockquote (>) for the original text
5. Add explanatory notes or commentary in parentheses where necessary for clarity.
6. If relevant, include any traditional insights or interpretations after the main translation, prefaced with "Commentary:".

Ensure that the translation is accurate, respectful, and in line with traditional Jewish interpretations as typically found in ArtScroll publications.

Hebrew Text: ${text}`;
  
  // Prepare API payload
  const payload = {
    model: 'anthropic/claude-3.5-sonnet',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: 3000,
    temperature: 0.7
  };
  
  // Configure request options
  const options = {
    method: 'POST',
    contentType: 'application/json',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    // Make API request
    const response = UrlFetchApp.fetch(API_URL, options);
    const jsonResponse = JSON.parse(response.getContentText());
    
    // Check for API errors
    if (jsonResponse.error) {
      console.error('API Error:', jsonResponse.error);
      return `Error from API: ${jsonResponse.error.message}`;
    }
    
    // Extract and return the translation
    if (jsonResponse.choices && jsonResponse.choices[0] && jsonResponse.choices[0].message) {
      return jsonResponse.choices[0].message.content.trim();
    } else {
      console.error('Unexpected response format:', jsonResponse);
      return `Unexpected response format. Please check the logs.`;
    }
    
  } catch (error) {
    console.error('Translation error:', error);
    return `Error: ${error.toString()}`;
  }
}

/**
 * Menu setup for Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Torah Translation')
    .addItem('Translate Selected Cell', 'translateSelectedCell')
    .addItem('Setup API Key', 'setupApiKey')
    .addSeparator()
    .addItem('Help', 'showHelp')
    .addToUi();
}

/**
 * Translates the content of the selected cell
 */
function translateSelectedCell() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cell = sheet.getActiveCell();
  const text = cell.getValue();
  
  if (!text) {
    SpreadsheetApp.getUi().alert('Please select a cell with Hebrew text to translate.');
    return;
  }
  
  const translation = TRANSLATE(text);
  
  // Write translation to the cell to the right
  const targetCell = cell.offset(0, 1);
  targetCell.setValue(translation);
  
  SpreadsheetApp.getUi().alert('Translation complete! Check the cell to the right.');
}

/**
 * Setup API key in script properties
 */
function setupApiKey() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'API Key Setup',
    'Enter your OpenRouter API Key:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() === ui.Button.OK) {
    const apiKey = response.getResponseText();
    PropertiesService.getScriptProperties().setProperty('OPENROUTER_API_KEY', apiKey);
    ui.alert('API Key saved successfully!');
  }
}

/**
 * Show help information
 */
function showHelp() {
  const ui = SpreadsheetApp.getUi();
  const helpText = `
Torah Translation Script - Help

How to use:
1. Enter Hebrew text in any cell
2. Use the formula: =TRANSLATE(A1) where A1 contains your Hebrew text
3. Or select a cell and use the menu: Torah Translation > Translate Selected Cell

Features:
- ArtScroll-style translation
- Markdown formatting
- Reverent, traditional interpretation
- Automatic error handling

For API key setup:
Torah Translation > Setup API Key
  `;
  
  ui.alert('Help', helpText, ui.ButtonSet.OK);
}