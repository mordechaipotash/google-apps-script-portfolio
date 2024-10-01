/**
 * Reverent AI Translation: Bridging Hebrew Torah Texts with ArtScroll Precision in Markdown
 * Date: October 1, 2024
 * Tags: API Intergration, Conversatonal AI Development, Google Apps Script, Intelligent Response Generation, JSON, JavaScript, Markdown Formating, NLP
 * Description: Transforming Hebrew Torah Texts into Reverent English: An Innovative Google Script for Accurate and Accessible Translation
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
 * Technical Details:
 * - 1
 * - Integration with OpenRouter API: The script utilizes the OpenRouter API to perform AI-powered translations of Hebrew Torah texts, ensuring both accuracy and reverence in the translations
 * - 2
 * - ArtScroll-style Translation: The translation adheres to traditional Jewish interpretations and employs formal, respectful language, prioritizing clarity while maintaining literal translations where feasible
 * - 3
 * - Markdown Formatting: The output is formatted in Markdown, enhancing readability and structure, with specific formatting rules for book names, chapter and verse numbers, and the inclusion of Hebrew text
 * - 4
 * - Input Validation and Error Handling: The TRANSLATE function includes robust input validation to ensure the Hebrew text is not empty and implements comprehensive error handling for API interactions and unexpected responses
 * - 5
 * - Use Case Versatility: The script is designed for a variety of applications, including Torah study and education, use by religious institutions, and support for developers creating Torah-related applications or websites
 */

function TRANSLATE(text)  {
  // Ensure the input text is not empty  if (!text || text.trim() === ")  {
  return "Error: Input text is empty. Please provide a valid Hebrew text.";

}
const apiKey = PropertiesService.getScriptProperties().getProperty('OPENROUTER_API_KEY') || 'YOUR_OPENROUTER_API_KEY_HERE';
// API endpoint for OpenAI  const url = 'https://openrouter.ai/api/v1/chat/completions';
// Payload for the API request  const payload =  {
  model: 'anthropic/claude-3.5-sonnet',  // Specify the model name (e.g., gpt-4)    messages: [       {
  role: 'user',        content: `# Torah Translation Prompt: ArtScroll Style with Markdown FormattingYou are tasked with translating a given Torah text into English in the style of ArtScroll translations, and formatting the output in Markdown. Follow these steps:1. Receive the Hebrew Torah text or reference (book, chapter, and verse).2. If given a reference, retrieve the corresponding Hebrew text.3. Translate the Hebrew text into English, adhering to these ArtScroll-style guidelines:   - Use formal, reverent language   - Maintain traditional interpretations   - Prefer literal translations where possible, but prioritize clarity of meaning   - Use "Hashem" for the Tetragrammaton   - Capitalize pronouns referring to God (e.g., "He", "His")4. Format the translation in Markdown:   - Use a level 2 heading (##) for the book name   - Use a level 3 heading (###) for the chapter and verse numbers   - Present the English translation as regular text   - If including the Hebrew, use a blockquote (\`) for the original text5. Add explanatory notes or commentary in parentheses where necessary for clarity.6. If relevant, include any traditional insights or interpretations after the main translation, prefaced with "Commentary:".Ensure that the translation is accurate, respectful, and in line with traditional Jewish interpretations as typically found in ArtScroll publications.Hebrew Text: $ {
  text
}
`      
}
],    max_tokens: 3000  
}
;
// Options for UrlFetchApp  const options =  {
  method: 'POST',    contentType: 'application/json',    headers:  {
  Authorization: `Bearer $ {
  apiKey
}
`,    
}
,    payload: JSON.stringify(payload),    muteHttpExceptions: true  
}
;
try  {
  const response = UrlFetchApp.fetch(url, options);
const jsonResponse = JSON.parse(response.getContentText());
// Check if the response contains an error    if (jsonResponse.error)  {
  return `Error from API: $ {
  jsonResponse.error.message
}
`;

}
// Extract the translation content    if (jsonResponse.choices && jsonResponse.choices[0] && jsonResponse.choices[0].message)  {
  return jsonResponse.choices[0].message.content.trim();

}
else  {
  return `Unexpected response format: $ {
  response.getContentText()
}
`;

}

}
catch (error)  {
  return `Error: $ {
  error
}
`;

}

}
