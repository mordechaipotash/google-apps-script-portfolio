/**
 * Real-Time Currency Conversion for Donations: Effortlessly Transforming Global Contributions into Israeli Shekels with Live Exchange Rates
 * Date: July 29, 2024
 * Tags: API Intergration, Data Intergration, Google Apps Script, Google Sheets API, JavaScript, Spreadsheet Automation
 * Description: Effortlessly Convert Global Donations to Israeli Shekels with Real-Time Exchange Rates
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Data Retrieval: The script accesses donation data from an active Google Sheet, identifying relevant columns for sum, currency, and transaction date
 * - 2
 * - Real-Time Exchange Rate Fetching: It utilizes an external API to obtain live exchange rates based on the specific transaction dates, ensuring accurate conversions
 * - 3
 * - Amount Conversion: The script calculates the equivalent donation amounts in Israeli Shekels (NIS) by multiplying the original sum by the retrieved exchange rate
 * - 4
 * - Spreadsheet Update: Converted amounts are written back into the Google Sheet, creating a new column for easy reference
 * - 5
 * - Error Handling: The script includes error logging to capture any issues encountered while fetching exchange rates, enhancing troubleshooting capabilities
 */

function convertDonationsToNIS()  {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const data = sheet.getDataRange().getValues();
const header = data[0];
// Assuming 'sum' is in column 1, 'currency_short_name_en' is in column 2, and 'transaction_date' is in column 3  const sumIndex = header.indexOf('sum');
const currencyIndex = header.indexOf('currency_short_name_en');
const dateIndex = header.indexOf('transaction_date');
// Adding a new column header for the converted amount  if (header.indexOf('amount_nis') === -1)  {
  sheet.getRange(1, header.length + 1).setValue('amount_nis');

}
for (let i = 1;
i < data.length;
i++)  {
  const amount = data[i][sumIndex];
const currency = data[i][currencyIndex];
const date = new Date(data[i][dateIndex]);
const formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
const exchangeRate = getExchangeRate(formattedDate, currency, 'ILS');
if (exchangeRate !== null)  {
  const amountNIS = amount * exchangeRate;
// Writing the converted amount to the new column      sheet.getRange(i + 1, header.length + 1).setValue(amountNIS);

}
else  {
  // Log error for this row      console.error(`Error fetching exchange rate for date $ {
  formattedDate
}
, currency $ {
  currency
}
`);

}

}

}
function getExchangeRate(date, baseCurrency, targetCurrency)  {
  const url = `https://api.exchangerate.host/$ {
  date
}
?base=$ {
  baseCurrency
}
&symbols=$ {
  targetCurrency
}
`;
const response = UrlFetchApp.fetch(url);
const data = JSON.parse(response.getContentText());
// Log the API response  console.log(`API Response for $ {
  date
}
, $ {
  baseCurrency
}
to $ {
  targetCurrency
}
: $ {
  JSON.stringify(data)
}
`);
// Check if the target currency is present in the response  if (data && data.rates && data.rates[targetCurrency])  {
  return data.rates[targetCurrency];

}
else  {
  return null;

}

}
