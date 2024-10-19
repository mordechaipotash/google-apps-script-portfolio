/**
 * "SmartDoc: Automated Image-Based Form Classification Using OpenRouter API"
 * Date: October 19, 2024
 * Tags: API Intergration, Asynchronous Programming, Data Validation, Form Classification, Google Apps Script, Image Processing, Image-Based Data Extraction, Intelligent Document Processing, JSON, JavaScript, RESTful API, User Experience (UX) Design
 * Description: "Effortlessly Automate Document Classification with AI-Powered Image Recognition"
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
 * - API Integration: The script integrates with the OpenRouter API to leverage AI-powered capabilities for analyzing and classifying documents based on image inputs
 * - 2
 * - Custom Functionality: It features a custom FormType function that prepares and sends requests to the OpenRouter API, specifically designed for Google Apps Script environments
 * - 3
 * - Document Classification: The script can classify multiple document types by applying specific identification criteria, enhancing the accuracy of document categorization
 * - 4
 * - Error Handling: Robust error handling mechanisms are implemented to manage API response errors and unexpected formats, ensuring reliable script performance
 * - 5
 * - Scalability: The design of the script allows for future enhancements and scalability, making it adaptable for various document management needs across different industries
 */

function FormType(modelName, imageURL)  {
  const apiKey =PropertiesService.getScriptProperties().getProperty('OPENROUTER_API_KEY') || 'YOUR_OPENROUTER_API_KEY_HERE';
// API endpoint for OpenAI  const url = 'https://openrouter.ai/api/v1/chat/completions';
// Payload for the API request  const payload =  {
  model: modelName,  // Using the model name passed in as a parameter    messages: [       {
  role: 'user',        content: `You are an expert in extracting structured data from documents.     Identify the form type based on specific rules and extract the required information accordingly.     Respond only with the form type, without any additional characters.    Form types and their identification criteria:    1. 8850 Form:       - Contains the title 'Pre-Screening Notice and Certification Request for the Work Opportunity Credit'       - Has the form number '8850' prominently displayed       - Includes sections such as 'Job Applicant Information' with fields for name, social security number, address, and date of birth       - Contains a series of checkboxes or statements related to eligibility conditions       - Includes a signature line for the job applicant       - Often contains references to the Internal Revenue Service (IRS) or Department of the Treasury    2. 8 Question Form:       - Contains approximately 8 numbered questions or sections       - Typically starts with personal information fields like name, SSN, and date of birth       - Often includes the phrase 'Please Fill In to the Best of Your Ability!' at the top       - Questions cover topics such as previous employment, receipt of benefits, unemployment status, felony convictions, and veteran status       - Most questions have 'Yes' and 'No' checkboxes or options       - Often includes a signature line and date at the bottom    3. NYYF_1:       - Keywords: 'New York Youth Jobs Program', 'Youth Certification', 'WE ARE YOUR DOL'       - Sections: 'Youth Certification', 'Applicant Information'       - Fields: last name, first name, birth date, social security number, home address, city, state, zip, educational status    4. NYYF_2:       - Keywords: 'Youth Certification Qualifications', 'New York Youth Jobs Program'       - Sections: 'Qualifications', 'Agreement'       - Fields: age, unemployment status, educational background, benefits received, personal circumstances    5. POU_1:       - Keywords: 'Participant Statement of Understanding', 'subsidized employment', 'paid on-the-job training'       - Sections: 'Participant Information', 'Statement of Understanding'       - Fields: participant's name, social security number, address, city, state, zip, employment and program participation details    6. POU_2:       - Keywords: 'CA and SNAP benefits', 'supplemental grant', 'Fair Hearing aid-to-continue', 'Business Link'       - Sections: 'Income Reporting', 'Employment Conditions', 'Termination and Reduction of Benefits'       - Fields: income reporting requirements, conditions for supplemental grants, notification requirements, guidelines for maintaining benefits    7. Identity Document:       - Contains personal identification information (name, date of birth, SSN)       - May include official headers or footers from government agencies       - Often includes document-specific identifiers (e.g., 'DRIVER LICENSE', 'SOCIAL SECURITY CARD')       - May contain security features or statements       - Often includes a unique identification number       - May have fields for physical characteristics       - Often includes issue date and/or expiration date       - May contain a photograph or space for a photograph       - May include a barcode or machine-readable zone    8. Blank Form:       - Identify if the extracted text is empty or contains only minimal information    9. Other/Undefined:       - Use this classification if the document contains significant text or information but doesn't match any specific form type    Analyze the provided image and determine the form type based on these criteria. Return only the form type as a string.`      
}
,       {
  role: 'user',        content: [           {
  type: 'image_url',            image_url:  {
  url: imageURL  // Using the image URL passed in as a parameter            
}

}
]      
}
],    max_tokens: 300  
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
// Check for the SSN in the response    if (jsonResponse.choices && jsonResponse.choices[0] && jsonResponse.choices[0].message)  {
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
