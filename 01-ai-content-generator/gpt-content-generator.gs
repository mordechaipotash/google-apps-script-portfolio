/**
 * Automated ChatGPT Integration for Dynamic Content Generation
 * Date: July 15, 2024
 * Description: Connects Google Sheets with OpenAI's GPT models for AI text generation
 */

// Configuration - Store API key in Script Properties for security
const GPT_CONFIG = {
  API_KEY: PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY') || 'YOUR_OPENAI_API_KEY_HERE',
  BASE_URL: "https://your-domain.com",
  DEFAULT_MODEL: 'gpt-4o-2024-05-13',
  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_MAX_TOKENS: 700
};


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
 * Custom function for Google Sheets to generate AI responses
 * @param {string} promptText - The prompt or instruction for the AI
 * @param {string} cellValue - The content from a cell to include in the prompt
 * @param {string} model - Optional: Specify a different GPT model
 * @param {number} temperature - Optional: Control randomness (0-1)
 * @param {number} maxTokens - Optional: Maximum response length
 * @return {string} The AI-generated response or error message
 * @customfunction
 */
function SP(promptText, cellValue, model = null, temperature = null, maxTokens = null) {
  // Validate inputs
  if (!promptText && !cellValue) {
    return "Error: Please provide either a prompt or cell value";
  }
  
  // Get API key
  const apiKey = GPT_CONFIG.API_KEY;
  if (!apiKey) {
    return "Error: API key not configured. Run setupOpenAI() first.";
  }
  
  // Combine prompt and cell value
  const messageContent = [promptText, cellValue].filter(Boolean).join(" ");
  
  // Prepare API payload
  const payload = {
    model: model || GPT_CONFIG.DEFAULT_MODEL,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that generates accurate, relevant content based on the provided context."
      },
      {
        role: "user",
        content: messageContent
      }
    ],
    temperature: temperature || GPT_CONFIG.DEFAULT_TEMPERATURE,
    max_tokens: maxTokens || GPT_CONFIG.DEFAULT_MAX_TOKENS
  };
  
  // Configure request options
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(payload)
  };
  
  try {
    // Make API request
    const response = UrlFetchApp.fetch(GPT_CONFIG.BASE_URL, options);
    const responseCode = response.getResponseCode();
    const responseBody = JSON.parse(response.getContentText());
    
    if (responseCode === 200) {
      // Extract and return the generated content
      if (responseBody.choices && responseBody.choices[0] && responseBody.choices[0].message) {
        return responseBody.choices[0].message.content.trim();
      } else {
        console.error("Unexpected response structure:", responseBody);
        return "Error: Unexpected response format";
      }
    } else {
      // Handle API errors
      console.error("API request failed:", responseBody);
      if (responseBody.error) {
        return `API Error: ${responseBody.error.message}`;
      }
      return `API request failed with response code: ${responseCode}`;
    }
    
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    return `An error occurred: ${error.toString()}`;
  }
}

/**
 * Batch process multiple cells with GPT
 * @param {string} promptColumn - Column letter containing prompts
 * @param {string} dataColumn - Column letter containing data
 * @param {string} outputColumn - Column letter for outputs
 * @param {number} startRow - Starting row number
 * @param {number} endRow - Ending row number
 */
function batchProcessGPT(promptColumn, dataColumn, outputColumn, startRow, endRow) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const ui = SpreadsheetApp.getUi();
  
  // Validate inputs
  if (!promptColumn || !dataColumn || !outputColumn || !startRow || !endRow) {
    ui.alert('Error', 'Please provide all required parameters', ui.ButtonSet.OK);
    return;
  }
  
  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  
  // Process each row
  for (let row = startRow; row <= endRow; row++) {
    try {
      // Get prompt and data
      const promptCell = `${promptColumn}${row}`;
      const dataCell = `${dataColumn}${row}`;
      const outputCell = `${outputColumn}${row}`;
      
      const prompt = sheet.getRange(promptCell).getValue();
      const data = sheet.getRange(dataCell).getValue();
      
      if (prompt || data) {
        // Generate response
        const response = SP(prompt, data);
        
        // Write to output cell
        sheet.getRange(outputCell).setValue(response);
        
        if (response.startsWith("Error:") || response.startsWith("API Error:")) {
          errorCount++;
          errors.push(`Row ${row}: ${response}`);
        } else {
          successCount++;
        }
        
        // Add delay to avoid rate limiting
        Utilities.sleep(1000); // 1 second delay between requests
      }
      
    } catch (error) {
      errorCount++;
      errors.push(`Row ${row}: ${error.toString()}`);
      console.error(`Error processing row ${row}:`, error);
    }
  }
  
  // Show summary
  let message = `Processing complete!\n\nSuccessful: ${successCount}\nErrors: ${errorCount}`;
  if (errors.length > 0) {
    message += `\n\nErrors:\n${errors.join('\n')}`;
  }
  
  ui.alert('Batch Processing Results', message, ui.ButtonSet.OK);
}

/**
 * Custom menu for Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🤖 AI Assistant')
    .addItem('Setup OpenAI API', 'setupOpenAI')
    .addItem('Process Selected Range', 'processSelectedRange')
    .addItem('Batch Process', 'showBatchDialog')
    .addSeparator()
    .addItem('Test Connection', 'testConnection')
    .addItem('View Usage', 'viewUsage')
    .addItem('Help', 'showHelp')
    .addToUi();
}

/**
 * Setup OpenAI API key
 */
function setupOpenAI() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'OpenAI API Setup',
    'Enter your OpenAI API Key:\n(Get one at https://platform.openai.com/api-keys)',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() === ui.Button.OK) {
    const apiKey = response.getResponseText().trim();
    
    if (apiKey) {
      PropertiesService.getScriptProperties().setProperty('OPENAI_API_KEY', apiKey);
      ui.alert('Success', 'API Key saved successfully!', ui.ButtonSet.OK);
    } else {
      ui.alert('Error', 'API Key cannot be empty', ui.ButtonSet.OK);
    }
  }
}

/**
 * Process selected range with GPT
 */
function processSelectedRange() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  const ui = SpreadsheetApp.getUi();
  
  if (!range) {
    ui.alert('Error', 'Please select a range first', ui.ButtonSet.OK);
    return;
  }
  
  const response = ui.prompt(
    'Process Range',
    'Enter the prompt to apply to each cell:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() === ui.Button.OK) {
    const prompt = response.getResponseText();
    const values = range.getValues();
    const results = [];
    
    // Process each cell
    for (let i = 0; i < values.length; i++) {
      const row = [];
      for (let j = 0; j < values[i].length; j++) {
        const cellValue = values[i][j];
        if (cellValue) {
          const result = SP(prompt, cellValue.toString());
          row.push(result);
          Utilities.sleep(500); // Avoid rate limiting
        } else {
          row.push('');
        }
      }
      results.push(row);
    }
    
    // Write results to the right of selection
    const outputRange = range.offset(0, range.getNumColumns());
    outputRange.setValues(results);
    
    ui.alert('Success', 'Processing complete! Results added to the right of your selection.', ui.ButtonSet.OK);
  }
}

/**
 * Show batch processing dialog
 */
function showBatchDialog() {
  const html = HtmlService.createHtmlOutputFromFile('batch-dialog')
    .setWidth(400)
    .setHeight(300);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Batch Process with GPT');
}

/**
 * Test API connection
 */
function testConnection() {
  const ui = SpreadsheetApp.getUi();
  
  const result = SP("Say 'Connection successful!' in 5 words or less", "");
  
  if (result.startsWith("Error:") || result.startsWith("API Error:")) {
    ui.alert('Connection Test Failed', result, ui.ButtonSet.OK);
  } else {
    ui.alert('Connection Test', `Success! Response: ${result}`, ui.ButtonSet.OK);
  }
}

/**
 * View API usage (placeholder - implement based on your needs)
 */
function viewUsage() {
  const ui = SpreadsheetApp.getUi();
  
  // This would typically fetch usage data from OpenAI API
  // For now, showing a placeholder
  const message = `
API Usage Information:
- Model: ${GPT_CONFIG.DEFAULT_MODEL}
- Temperature: ${GPT_CONFIG.DEFAULT_TEMPERATURE}
- Max Tokens: ${GPT_CONFIG.DEFAULT_MAX_TOKENS}

Note: Check your OpenAI dashboard for detailed usage statistics.
  `;
  
  ui.alert('API Usage', message, ui.ButtonSet.OK);
}

/**
 * Show help information
 */
function showHelp() {
  const ui = SpreadsheetApp.getUi();
  
  const helpText = `
🤖 AI Assistant Help

Formula Usage:
=SP(prompt, cellValue, [model], [temperature], [maxTokens])

Examples:
=SP("Summarize:", A1)
=SP("Translate to Spanish:", B2, "gpt-4", 0.3)
=SP("Expand this idea:", C3, , , 1000)

Menu Functions:
• Setup OpenAI API: Configure your API key
• Process Selected Range: Apply a prompt to selected cells
• Batch Process: Process multiple rows at once
• Test Connection: Verify API connectivity
• View Usage: Check configuration and usage

Tips:
1. Store sensitive prompts in cells and reference them
2. Use lower temperature (0.1-0.3) for consistent outputs
3. Use higher temperature (0.7-0.9) for creative responses
4. Adjust max_tokens based on expected response length

For more help, visit: https://platform.openai.com/docs
  `;
  
  ui.alert('Help', helpText, ui.ButtonSet.OK);
}

/**
 * Advanced: Generate content with specific parameters
 * @param {Object} config - Configuration object
 */
function generateAdvanced(config) {
  const defaultConfig = {
    prompt: "",
    model: GPT_CONFIG.DEFAULT_MODEL,
    temperature: GPT_CONFIG.DEFAULT_TEMPERATURE,
    maxTokens: GPT_CONFIG.DEFAULT_MAX_TOKENS,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    systemMessage: "You are a helpful assistant."
  };
  
  const finalConfig = { ...defaultConfig, ...config };
  
  const apiKey = GPT_CONFIG.API_KEY;
  if (!apiKey) {
    return "Error: API key not configured";
  }
  
  const payload = {
    model: finalConfig.model,
    messages: [
      { role: "system", content: finalConfig.systemMessage },
      { role: "user", content: finalConfig.prompt }
    ],
    temperature: finalConfig.temperature,
    max_tokens: finalConfig.maxTokens,
    top_p: finalConfig.topP,
    frequency_penalty: finalConfig.frequencyPenalty,
    presence_penalty: finalConfig.presencePenalty
  };
  
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(payload)
  };
  
  try {
    const response = UrlFetchApp.fetch(GPT_CONFIG.BASE_URL, options);
    const responseBody = JSON.parse(response.getContentText());
    
    if (response.getResponseCode() === 200) {
      return responseBody.choices[0].message.content.trim();
    } else {
      return `Error: ${responseBody.error?.message || 'Unknown error'}`;
    }
  } catch (error) {
    return `Error: ${error.toString()}`;
  }
}