/**
 * "Effortless YouTube Transcript Retrieval: Automate Your Video Data Collection with Google Sheets"
 * Date: May 2, 2024
 * Tags: API Intergration, Data Parsing, Document Automation, Google Apps Script, Google Sheets API, JavaScript, Spreadsheet Automation, User Experience (UX) Design
 * Description: Fetch YouTube Transcripts Effortlessly: Automate Your Data Collection with Google Sheets
 * 
 * Auto-parsed from CSV on 2025-09-14
 */

/**
 * SETUP ALL CREDENTIALS - Configure all API keys and IDs
 * 
 * This function configures:
 * - YouTube API keys
 * - Google Sheets IDs
 * - Google Drive Folder IDs
 * 
 * Run this once before using the script.
 */
function setupAllCredentials() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getScriptProperties();
  
  ui.alert(
    'Credential Setup',
    'This will guide you through setting up all required credentials.\nLeave blank to skip optional items.',
    ui.ButtonSet.OK
  );

  // YouTube API Key
  const youtubeKey = ui.prompt(
    'YouTube API Configuration',
    'Enter your YouTube Data API v3 key:\n(Get one at https://console.cloud.google.com)',
    ui.ButtonSet.OK_CANCEL
  );
  if (youtubeKey.getSelectedButton() === ui.Button.OK && youtubeKey.getResponseText()) {
    props.setProperty('YOUTUBE_API_KEY', youtubeKey.getResponseText().trim());
  }
  
  // Show summary
  const configured = Object.keys(props.getProperties()).length;
  ui.alert(
    'Setup Complete',
    `Configured ${configured} credential(s).\nYou can run this again to update credentials.`,
    ui.ButtonSet.OK
  );
}

/**
 * Clear all stored credentials
 */
function clearAllCredentials() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Clear All Credentials',
    'This will remove ALL stored credentials. Continue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    const props = PropertiesService.getScriptProperties();
    props.deleteAllProperties();
    ui.alert('All credentials cleared', 'All stored credentials have been removed.', ui.ButtonSet.OK);
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
  PropertiesService.getScriptProperties().setProperty('YOUTUBE_API_KEY', 'YOUR_YOUTUBE_API_KEY_HERE');
  
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
 * - Functionality: The script automates the retrieval of YouTube video transcripts by fetching data based on provided video URLs, integrating directly with Google Sheets for seamless data management
 * - 2
 * - Video ID Extraction: It includes a function, extractVideoId(), which parses YouTube URLs to extract the unique video IDs required for transcript retrieval
 * - 3
 * - API Integration: The script utilizes an external API to fetch transcripts, with the fetchTranscript() function handling API requests and processing the response to return the transcript data
 * - 4
 * - Batch Processing: It supports batch processing of multiple video URLs, allowing users to collect transcripts for several videos in one go, enhancing efficiency in data collection
 * - 5
 * - Direct Data Population: Retrieved transcripts are automatically populated into a designated column in Google Sheets, facilitating easy access and organization of transcript data for further analysis or use
 */

function getTranscripts()  {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var range = sheet.getRange('B2:B' + sheet.getLastRow());
var urls = range.getValues();
var transcripts = [];
urls.forEach(function(row)  {
  var videoId = extractVideoId(row[0]);
var transcript = fetchTranscript(videoId);
transcripts.push([transcript]);

}
);
// Writing transcripts to Column I  sheet.getRange(2, 9, transcripts.length, 1).setValues(transcripts);

}
function extractVideoId(url)  {
  var match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
if (match)  {
  return match[1];

}
else  {
  return null;

}

}
function fetchTranscript(videoId)  {
  if (videoId === null)  {
  return "Invalid URL";

}
var apiKey = PropertiesService.getScriptProperties().getProperty('YOUTUBE_API_KEY') || 'YOUR_YOUTUBE_API_KEY_HERE';
var response = UrlFetchApp.fetch('https://api.example.com/getTranscript?videoId=' + videoId + '&key=' + apiKey);
if (response.getResponseCode() === 200)  {
  var json = JSON.parse(response.getContentText());
return json.transcript;

}
return "Failed to fetch transcript";

}
