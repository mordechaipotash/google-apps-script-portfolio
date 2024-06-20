/**
 * "Seamless PDF Extraction and Management: Automating Data Flow from Gmail to Google Sheets"
 * Date: June 20, 2024
 * Tags: Auth 2.0, Document Automation, Gmail API, Google Apps Script, Google Cloud Vision API, Google Drive API, Google Sheets API, Image-Based Data Extraction, Intelligent Document Processing, JSON, JavaScript
 * Description: Effortlessly Transform PDF Attachments from Gmail into Organized Data in Google Sheets
 * 
 * Auto-parsed from CSV on 2025-09-14
 */

/**
 * OAUTH SETUP - CONFIGURE GOOGLE OAUTH CREDENTIALS
 * 
 * Instructions:
 * 1. Go to Google Cloud Console: https://console.cloud.google.com
 * 2. Create or select a project
 * 3. Enable required APIs (Drive API, Cloud Vision API, etc.)
 * 4. Create OAuth 2.0 credentials
 * 5. Run this function and enter your credentials
 * 
 * SECURITY WARNING: Never hardcode OAuth credentials!
 */
function setupOAuthConfiguration() {
  const ui = SpreadsheetApp.getUi();
  
  // Check if already configured
  const existingClientId = PropertiesService.getScriptProperties().getProperty('OAUTH_CLIENT_ID');
  if (existingClientId && existingClientId !== 'YOUR_OAUTH_CLIENT_ID_HERE') {
    const response = ui.alert(
      'OAuth Already Configured',
      'OAuth credentials exist. Do you want to update them?',
      ui.ButtonSet.YES_NO
    );
    if (response !== ui.Button.YES) {
      return;
    }
  }
  
  // Prompt for Client ID
  const clientIdResult = ui.prompt(
    'OAuth Configuration - Step 1/3',
    'Enter your OAuth Client ID:\n(Format: xxxxx.apps.googleusercontent.com)',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (clientIdResult.getSelectedButton() !== ui.Button.OK) {
    return;
  }
  
  // Prompt for Client Secret
  const clientSecretResult = ui.prompt(
    'OAuth Configuration - Step 2/3',
    'Enter your OAuth Client Secret:\n(Format: GOCSPX-xxxxx)',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (clientSecretResult.getSelectedButton() !== ui.Button.OK) {
    return;
  }
  
  // Prompt for Redirect URI
  const redirectUriResult = ui.prompt(
    'OAuth Configuration - Step 3/3',
    'Enter your OAuth Redirect URI:\n(Default: urn:ietf:wg:oauth:2.0:oob)',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (redirectUriResult.getSelectedButton() !== ui.Button.OK) {
    return;
  }
  
  // Store credentials
  const props = PropertiesService.getScriptProperties();
  props.setProperty('OAUTH_CLIENT_ID', clientIdResult.getResponseText().trim());
  props.setProperty('OAUTH_CLIENT_SECRET', clientSecretResult.getResponseText().trim());
  props.setProperty('OAUTH_REDIRECT_URI', redirectUriResult.getResponseText().trim() || 'urn:ietf:wg:oauth:2.0:oob');
  
  ui.alert(
    'Success!',
    'OAuth credentials have been securely configured.',
    ui.ButtonSet.OK
  );
}

/**
 * Clear OAuth configuration
 */
function clearOAuthConfiguration() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Clear OAuth Configuration',
    'Are you sure you want to remove stored OAuth credentials?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    const props = PropertiesService.getScriptProperties();
    props.deleteProperty('OAUTH_CLIENT_ID');
    props.deleteProperty('OAUTH_CLIENT_SECRET');
    props.deleteProperty('OAUTH_REDIRECT_URI');
    ui.alert('OAuth Configuration Cleared', 'Credentials have been removed.', ui.ButtonSet.OK);
  }
}


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
 * Technical Details:
 * - 1
 * - PDF Download Automation: The script automatically downloads PDF attachments from Gmail, filtering them by the previous day to ensure only recent documents are retrieved
 * - 2
 * - Image Conversion: It converts downloaded PDFs into images using the Google Cloud Vision API, enabling easier data extraction from visual formats
 * - 3
 * - Data Extraction: The script employs an external API to extract structured text data from the converted images, facilitating the transformation of visual information into usable data
 * - 4
 * - Data Formatting: Extracted data is organized into structured JSON objects, allowing for systematic representation and easy manipulation of information
 * - 5
 * - Google Sheets Integration: Finally, the script populates a designated Google Sheet with the organized data, streamlining data management and access for further analysis or reporting
 */

function downloadPdfsFromGmail()  {
  var now = new Date();
var yesterday = new Date(now.getTime() - 24*60*60*1000);
var threads = GmailApp.search('has:attachment filename:pdf after:' + Utilities.formatDate(yesterday, Session.getScriptTimeZone(), 'yyyy/MM/dd'));
var messages = GmailApp.getMessagesForThreads(threads);
var folder = DriveApp.createFolder('PDFs');
messages.forEach(function(thread)  {
  thread.getMessages().forEach(function(message)  {
  var attachments = message.getAttachments();
attachments.forEach(function(attachment)  {
  if (attachment.getContentType() === 'application/pdf')  {
  folder.createFile(attachment);

}

}
);

}
);

}
);

}
var CLIENT_ID = PropertiesService.getScriptProperties().getProperty('OAUTH_CLIENT_ID') || 'YOUR_OAUTH_CLIENT_ID_HERE';
var CLIENT_SECRET = PropertiesService.getScriptProperties().getProperty('OAUTH_CLIENT_SECRET') || 'YOUR_OAUTH_CLIENT_SECRET_HERE';
var REDIRECT_URI = PropertiesService.getScriptProperties().getProperty('OAUTH_REDIRECT_URI') || 'YOUR_OAUTH_REDIRECT_URI_HERE';
function getOAuthToken()  {
  var userProperties = PropertiesService.getUserProperties();
var token = userProperties.getProperty('OAUTH_TOKEN');
if (!token)  {
  var authorizationUrl = 'https://accounts.google.com/o/oauth2/auth' +            '?response_type=code' +            '&client_id=' + CLIENT_ID +            '&redirect_uri=' + REDIRECT_URI +            '&scope=' + encodeURIComponent('https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/cloud-platform');
Logger.log('Open the following URL and then paste the code from the authorization page: %s', authorizationUrl);
var code = Browser.inputBox('Enter the code from the authorization page:');
var tokenResponse = UrlFetchApp.fetch('https://oauth2.googleapis.com/token',  {
  method: 'post',            payload:  {
  code: code,                client_id: CLIENT_ID,                client_secret: CLIENT_SECRET,                redirect_uri: REDIRECT_URI,                grant_type: 'authorization_code'            
}
,            muteHttpExceptions: true        
}
);
var token = JSON.parse(tokenResponse.getContentText()).access_token;
userProperties.setProperty('OAUTH_TOKEN', token);

}
return token;

}
function convertPdfToImages(pdfFile)  {
  var vision = new VisionApi();
var pdfData = pdfFile.getBlob().getBytes();
var images = vision.pdfToImages(pdfData);
return images;

}
class VisionApi  {
  constructor()  {
  this.apiKey = getOAuthToken();
// Use the OAuth token    
}
pdfToImages(pdfData)  {
  var url = 'https://vision.googleapis.com/v1/files:asyncBatchAnnotate';
var payload =  {
  requests: [                 {
  inputConfig:  {
  mimeType: 'application/pdf',                        content: Utilities.base64Encode(pdfData)                    
}
,                    features: [ {
  type: 'DOCUMENT_TEXT_DETECTION' 
}
],                    outputConfig:  {
  gcsDestination:  {
  uri: 'gs://my-pdf-output-bucket/output/'  // Updated bucket name                        
}
,                        batchSize: 2                    
}

}
]        
}
;
var options =  {
  method: 'post',            contentType: 'application/json',            payload: JSON.stringify(payload),            headers:  {
  Authorization: 'Bearer ' + this.apiKey            
}

}
;
var response = UrlFetchApp.fetch(url, options);
var result = JSON.parse(response.getContentText());
return result.responses[0].outputConfig.gcsDestination.uri;

}

}
function extractTextFromImages(imageUrls)  {
  var apiKey = 'YOUR_ANTHROPIC_API_KEY_HERE';
var results = [];
imageUrls.forEach(function(imageUrl)  {
  var imageBase64 = getImageBase64(imageUrl);
var response = callClaudeHaiku(imageBase64, apiKey);
results.push(mapExtractedData(response));

}
);
return results;

}
function getImageBase64(imageUrl)  {
  var response = UrlFetchApp.fetch(imageUrl);
var imageBlob = response.getBlob();
return Utilities.base64Encode(imageBlob.getBytes());

}
function callClaudeHaiku(imageBase64, apiKey)  {
  var url = 'https://api.anthropic.com/claude';
var prompt = `    <instruction>    Extract structured text from the provided image and format it as JSON.    </instruction>    <image>$ {
  imageBase64
}
</image>    `;
var options =  {
  method: 'post',        contentType: 'application/json',        payload: JSON.stringify( {
  prompt: prompt,            model: 'claude-3-haiku-20240307-v1:0'        
}
),        headers:  {
  Authorization: 'Bearer ' + apiKey        
}

}
;
var response = UrlFetchApp.fetch(url, options);
return JSON.parse(response.getContentText());

}
function mapExtractedData(extractedData)  {
  return  {
  status: "Active",  // Example status, could be based on some criteria        clientName: `$ {
  extractedData.firstName
}
$ {
  extractedData.lastName
}
`,        companyName: "Example Company",  // Set manually if not available in form        dateReceived: extractedData.dateReceived,  // Extracted from the email metadata        linkOfEmail: extractedData.linkOfEmail,  // Extracted from the email metadata        sentBy: extractedData.sentBy,  // Extracted from the email metadata        ssn: extractedData.ssn,        lastName: extractedData.lastName,        firstName: extractedData.firstName,        mi: extractedData.mi || ",  // Middle Initial if available        dateOfBirth: extractedData.dateOfBirth,        missingCrucialInfo: checkMissingInfo(extractedData),  // Check for missing or crucial information        ez: determineEZ(extractedData),  // Eligibility criteria        wotcEligible: determineWOTCEligibility(extractedData),        nysYouthEligible: determineNYSYouthEligibility(extractedData),        notes: extractedData.notes || ",        firstWorkDate: extractedData.firstWorkDate || ",        stAddress: extractedData.stAddress,        address2: extractedData.address2 || ",        city: extractedData.city,        state: extractedData.state,        zip: extractedData.zip,        signed: extractedData.signed || "No",        dateSigned: extractedData.dateSigned,        hourlyWage: extractedData.hourlyWage || ",        q1: extractedData.q1 || ",        q2a: extractedData.q2a || ",        q2b: extractedData.q2b || ",        q2Recipient: extractedData.q2Recipient || ",        q2CityState: extractedData.q2CityState || ",        q3a: extractedData.q3a || ",        q3b: extractedData.q3b || ",        q3c: extractedData.q3c || ",        q3d: extractedData.q3d || ",        q3Recipient: extractedData.q3Recipient || ",        q3CityState: extractedData.q3CityState || ",        q4: extractedData.q4 || ",        q5: extractedData.q5 || ",        q5State: extractedData.q5State || ",        q6a: extractedData.q6a || ",        q6b: extractedData.q6b || ",        q6c: extractedData.q6c || ",        q7: extractedData.q7 || ",        q7Conviction: extractedData.q7Conviction || ",        q7Release: extractedData.q7Release || ",        q7FederalState: extractedData.q7FederalState || ",        qSigned: extractedData.qSigned || ",        q8a: extractedData.q8a || ",        q8b: extractedData.q8b || ",        q8bRecipient: extractedData.q8bRecipient || ",        q8bCityState: extractedData.q8bCityState || ",        q8c: extractedData.q8c || ",        uyEmail: extractedData.uyEmail || ",        uy12a: extractedData.uy12a || ",        uy12b: extractedData.uy12b || ",        uy13: extractedData.uy13 || ",        uy14: extractedData.uy14 || ",        uy14a: extractedData.uy14a || ",        uy14b: extractedData.uy14b || ",        uy14c: extractedData.uy14c || ",        uy16b: extractedData.uy16b || ",        naField: "N/A",  // Placeholder        signedHandWritten: extractedData.signedHandWritten || "No",        dateSigned: extractedData.dateSigned,        completed: "No"  // Default value, set based on criteria    
}
;

}
function checkMissingInfo(data)  {
  // Check for missing or crucial information    return data.signed && data.firstName && data.lastName && data.ssn ? "No" : "Yes";

}
function determineEZ(data)  {
  // Determine EZ based on form criteria    return "Yes";
// Placeholder logic
}
function determineWOTCEligibility(data)  {
  // Determine WOTC eligibility    return "Yes";
// Placeholder logic
}
function determineNYSYouthEligibility(data)  {
  // Determine NYS Youth eligibility    return "Yes";
//    // Placeholder logic    return "Yes";
// Placeholder logic
}
function populateGoogleSheet(data)  {
  var sheet = SpreadsheetApp.openById('1SXcFh7-35mbJ5jqwxIS1dPM_wgGg_50OlihUzzwOhKA').getActiveSheet();
data.forEach(function(row)  {
  sheet.appendRow([            row.status,            row.clientName,            row.companyName,            row.dateReceived,            row.linkOfEmail,            row.sentBy,            row.ssn,            row.lastName,            row.firstName,            row.mi,            row.dateOfBirth,            row.missingCrucialInfo,            row.ez,            row.wotcEligible,            row.nysYouthEligible,            row.notes,            row.firstWorkDate,            row.stAddress,            row.address2,            row.city,            row.state,            row.zip,            row.signed,            row.dateSigned,            row.hourlyWage,            row.q1,            row.q2a,            row.q2b,            row.q2Recipient,            row.q2CityState,            row.q3a,            row.q3b,            row.q3c,            row.q3d,            row.q3Recipient,            row.q3CityState,            row.q4,            row.q5,            row.q5State,            row.q6a,            row.q6b,            row.q6c,            row.q7,            row.q7Conviction,            row.q7Release,            row.q7FederalState,            row.qSigned,            row.q8a,            row.q8b,            row.q8bRecipient,            row.q8bCityState,            row.q8c,            row.uyEmail,            row.uy12a,            row.uy12b,            row.uy13,            row.uy14,            row.uy14a,            row.uy14b,            row.uy14c,            row.uy16b,            row.naField,            row.signedHandWritten,            row.dateSigned,            row.completed        ]);

}
);

}
function processPdfsAndPopulateSheet()  {
  // Step 2: Download PDFs from Gmail    downloadPdfsFromGmail();
// Step 3: Convert PDFs to images and store URLs    var folder = DriveApp.getFoldersByName('PDFs').next();
var files = folder.getFiles();
var imageUrls = [];
while (files.hasNext())  {
  var file = files.next();
var images = convertPdfToImages(file);
imageUrls = imageUrls.concat(images);

}
// Step 4: Extract text from images    var extractedData = extractTextFromImages(imageUrls);
// Step 5: Populate Google Sheet    populateGoogleSheet(extractedData);

}
