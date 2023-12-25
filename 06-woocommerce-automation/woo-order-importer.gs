/**
 * Effortless WooCommerce Order Management: Automate Your Order Imports to Google Sheets
 * Date: December 25, 2023
 * Tags: API Intergration, Data Intergration, Google Apps Script, Google Sheets API, JSON, JavaScript, Spreadsheet Automation, WooCommerce API
 * Description: Effortlessly Streamline Your WooCommerce Order Management with Automated Google Sheets Integration
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
  PropertiesService.getScriptProperties().setProperty('WOO_API_KEY', 'YOUR_WOOCOMMERCE_API_KEY_HERE');
  PropertiesService.getScriptProperties().setProperty('WOO_API_SECRET', 'YOUR_WOOCOMMERCE_SECRET_HERE');
  PropertiesService.getScriptProperties().setProperty('STORE_URL', 'https://your-store-domain.com');
  
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
 * - API Integration: The script connects to the WooCommerce REST API using consumer key and secret for secure data retrieval of orders
 * - 2
 * - Data Parsing: It fetches order data in JSON format, which is then parsed to extract relevant details such as order ID, total, customer information, and line items
 * - 3
 * - Date and Time Formatting: The script includes a function to format the order creation date and time into a user-friendly MM/DD/YYYY and HH:MM:SS format before populating the Google Sheet
 * - 4
 * - Automated Updates: A time-based trigger is set up to automatically run the order import function every hour, ensuring that the Google Sheet is regularly updated with the latest order information
 * - 5
 * - Data Organization: The script clears existing data in the specified Google Sheet and appends a new header row followed by the latest order records for structured and organized data presentation
 */

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
// Replace 'Orders' with your actual sheet namevar apiEndpoint = "https://levhatorah.org/wp-json/wc/v3/orders";
// Replace with your store URLvar consumerKey = "ck_62adfa2df0a343c089a086d4a403d0ab94b2c1a1";
// Your API consumer keyvar consumerSecret = "cs_cbd2c06d43612b7d424c874c7502f8e8790d54c1";
// Your API consumer secretfunction formatDateAndTime(dateTimeString)  {
  var date = new Date(dateTimeString);
return [Utilities.formatDate(date, Session.getScriptTimeZone(), "MM/dd/yyyy"), Utilities.formatDate(date, Session.getScriptTimeZone(), "HH:mm:ss")];

}
function importWooCommerceOrders()  {
  var url = apiEndpoint + "?consumer_key=" + consumerKey + "&consumer_secret=" + consumerSecret;
var options =  {
  "method": "get",    "muteHttpExceptions": true  
}
;
var response = UrlFetchApp.fetch(url, options);
var orders = JSON.parse(response.getContentText());
// Clear existing data  sheet.clearContents();
// Define headers based on the fields you want to include  var headers = ["Order ID", "Date (MM/DD/YYYY)", "Time (HH:MM:SS)", "Total", "Customer ID", "Status", "Payment Method", "Billing First Name", "Billing Last Name", "Billing Company", "Billing Country", "Billing Street Address", "Billing Apartment", "Billing City", "Billing State", "Billing ZIP Code", "Billing Phone", "Billing Email", "Items"];
sheet.appendRow(headers);
// Loop through orders and add to the sheet  orders.forEach(function(order)  {
  var [orderDate, orderTime] = formatDateAndTime(order.date_created);
var billing = order.billing;
var items = order.line_items.map(function(item)  {
  return item.name + ' (x' + item.quantity + ')';

}
).join(', ');
var row = [      order.id,      orderDate,      orderTime,      order.total,      order.customer_id,      order.status,      order.payment_method_title,      billing.first_name,      billing.last_name,      billing.company,      billing.country,      billing.address_1,      billing.address_2,      billing.city,      billing.state,      billing.postcode,      billing.phone,      billing.email,      items    ];
sheet.appendRow(row);

}
);

}
function setupTrigger()  {
  // Trigger every hour  ScriptApp.newTrigger('importWooCommerceOrders')    .timeBased()    .everyHours(1)    .create();

}
