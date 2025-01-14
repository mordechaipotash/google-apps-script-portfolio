# Configuration Template for 07 Sheets Synchronizer

## Required API Keys and Credentials

This project requires the following configuration:

### API Keys
- None required

### URLs and Endpoints
- None required

### Google Resources
- Google Drive Folder ID
- Google Sheets Spreadsheet ID

## Setup Instructions

1. **Open Google Apps Script Editor**
   - Open your Google Sheet
   - Go to Extensions → Apps Script

2. **Configure Script Properties**
   - In the Apps Script editor, go to Project Settings (gear icon)
   - Scroll down to "Script Properties"
   - Add the following properties:
   - Google Drive Folder ID: YOUR_VALUE_HERE
   - Google Sheets Spreadsheet ID: YOUR_VALUE_HERE

3. **Alternative: Run Setup Function**
   - Open any script file in this project
   - Find and run the `setupConfiguration()` function
   - Replace placeholder values with your actual credentials

4. **Test the Configuration**
   - Run a simple test function to verify setup
   - Check the logs for any configuration errors

## Security Notes

- **Never hardcode credentials** directly in the script
- **Use Script Properties** to store sensitive information
- **Don't share** your configured script with credentials
- **Rotate keys** regularly for better security

## Obtaining Credentials

No external API credentials required for this project.

---
*Remember to keep your credentials secure and never commit them to version control*
