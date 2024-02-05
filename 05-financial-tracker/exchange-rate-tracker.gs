/**
 * Automated Currency Exchange Rate Tracker: Real-Time Updates for Your Financial Insights
 * Date: February 5, 2024
 * Tags: API Intergration, Data Intergration, Error Handling, Google Apps Script, Google Sheets API, JavaScript, Spreadsheet Automation, User Experience (UX) Design, Version Control
 * Description: "Effortlessly Track Real-Time Currency Exchange Rates in Your Google Sheets"
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - API Integration: The script utilizes the ExchangeRate-API to fetch real-time currency exchange rates for specified currency pairs against the Israeli Shekel (ILS)
 * - 2
 * - Data Logging: It automatically logs the retrieved exchange rates into a Google Sheet, appending a new row with the current date for accurate historical tracking
 * - 3
 * - Error Handling: The script implements robust error handling to manage potential failures during API requests and data processing, ensuring reliable operation
 * - 4
 * - Dynamic Currency Support: It supports multiple currency pairs, including USD, CAD, and GBP, allowing users to customize which currencies they want to track
 * - 5
 * - Google Apps Script Functionality: The core functionality is encapsulated within the updateExchangeRates function, leveraging Google Apps Script features such as HTTP requests (UrlFetchApp) and Google Sheets API for seamless integration
 */

function updateExchangeRates()  {
  // Replace with your API key  var apiKey = "aa2ee31f0eba4a93e6282f4f";
// Define the currency pairs you want to fetch  var currencyPairs = ["USD", "CAD", "GBP"];
// Build the API request URL  var apiUrl = "https://v6.exchangerate-api.com/v6/" + apiKey + "/latest/ILS";
try  {
  // Send a GET request to the API    var response = UrlFetchApp.fetch(apiUrl);
// Check if the request was successful    if (response.getResponseCode() == 200)  {
  var data = JSON.parse(response.getContentText());
var rates = data.conversion_rates;
// Get the active spreadsheet and sheet      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
// Find the last row with data      var lastRow = sheet.getLastRow();
// Add a new row with the current date      var currentDate = new Date();
sheet.getRange(lastRow + 1, 1).setValue(currentDate);
// Write exchange rates to the new row      for (var i = 0;
i < currencyPairs.length;
i++)  {
  var pair = currencyPairs[i];
if (pair in rates)  {
  var exchangeRate = rates[pair];
sheet.getRange(lastRow + 1, i + 2).setValue(exchangeRate);

}
else  {
  sheet.getRange(lastRow + 1, i + 2).setValue("N/A");

}

}

}
else  {
  Logger.log("Failed to fetch exchange rates. Status code: " + response.getResponseCode());

}

}
catch (e)  {
  Logger.log("An error occurred during the request: " + e.toString());

}

}
