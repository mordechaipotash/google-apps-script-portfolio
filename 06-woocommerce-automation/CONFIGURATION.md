# Configuration Template for 06 Woocommerce Automation

## Required API Keys and Credentials

This project requires the following configuration:

### API Keys
- WooCommerce API Key and Secret

### URLs and Endpoints
- WooCommerce Store URL

### Google Resources
- None required

## Setup Instructions

1. **Open Google Apps Script Editor**
   - Open your Google Sheet
   - Go to Extensions → Apps Script

2. **Configure Script Properties**
   - In the Apps Script editor, go to Project Settings (gear icon)
   - Scroll down to "Script Properties"
   - Add the following properties:
   - WooCommerce API Key and Secret: YOUR_VALUE_HERE
   - WooCommerce Store URL: YOUR_VALUE_HERE

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

### WooCommerce Credentials
- Go to WooCommerce → Settings → Advanced → REST API
- Add new key with Read/Write permissions

---
*Remember to keep your credentials secure and never commit them to version control*
