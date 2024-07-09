/**
 * "Automated Donor Insights: Streamlining Donation Tracking and Engagement through Data Analysis"
 * Date: July 9, 2024
 * Tags: Data Handling, Data Intergration, Data Manipulation, Document Automation, Google Apps Script, JavaScript, Spreadsheet Automation
 * Description: Streamline Your Donor Management: Effortlessly Track Donations and Enhance Engagement with Automated Insights
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Data Retrieval: The script retrieves transaction and donor data from Google Sheets, allowing for automated analysis without manual input
 * - 2
 * - Statistical Calculation: It calculates key donor metrics, including total donations, donation frequency, and time since the last donation, providing valuable insights into donor behavior
 * - 3
 * - Real-Time Updates: The script updates donor statistics in real time, ensuring that the donor database reflects the most current information
 * - 4
 * - Efficiency Automation: By automating the entire process of data collection and updating, the script enhances operational efficiency for organizations managing donor data
 * - 5
 * - Integration Capability: The results of the analysis are seamlessly integrated back into the donor spreadsheet, facilitating easy access to updated insights for decision-making
 */

function updateDonorsData()  {
  const transactionsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('transactions');
const donorsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('donors');
// Get all data from transactions sheet  const transactionsData = transactionsSheet.getDataRange().getValues();
const transactionsHeaders = transactionsData[0];
const transactionsRows = transactionsData.slice(1);
// Get all data from donors sheet  const donorsData = donorsSheet.getDataRange().getValues();
const donorsHeaders = donorsData[0];
const donorsRows = donorsData.slice(1);
// Create a map to hold donor statistics  let donorStats =  {
  
}
;
transactionsRows.forEach(row =>  {
  const donarId = row[transactionsHeaders.indexOf('Donar ID')];
const amount = row[transactionsHeaders.indexOf('Amount')];
const pmtDate = new Date(row[transactionsHeaders.indexOf('PMT_Date')]);
const lapseScore = row[transactionsHeaders.indexOf('LapseScore')];
if (!donorStats[donarId])  {
  donorStats[donarId] =  {
  TimeSinceLastDonation: 0,        TotalDonations: 0,        DonationFrequency: 0,        MostRecentLapseScore: 0,        LastDonationDate: new Date(0)      
}
;

}
donorStats[donarId].TotalDonations += amount;
donorStats[donarId].DonationFrequency += 1;
donorStats[donarId].MostRecentLapseScore = lapseScore;
if (pmtDate > donorStats[donarId].LastDonationDate)  {
  donorStats[donarId].LastDonationDate = pmtDate;

}

}
);
const now = new Date();
// Calculate TimeSinceLastDonation for each donor  for (let donorId in donorStats)  {
  donorStats[donorId].TimeSinceLastDonation = (now - donorStats[donorId].LastDonationDate) / (1000 * 60 * 60 * 24);

}
// Update donors sheet with calculated values  const updatedDonorsData = [donorsHeaders];
donorsRows.forEach(row =>  {
  const donarId = row[donorsHeaders.indexOf('Donar ID')];
if (donorStats[donarId])  {
  row[donorsHeaders.indexOf('TimeSinceLastDonation')] = donorStats[donarId].TimeSinceLastDonation;
row[donorsHeaders.indexOf('TotalDonations')] = donorStats[donarId].TotalDonations;
row[donorsHeaders.indexOf('DonationFrequency')] = donorStats[donarId].DonationFrequency;
row[donorsHeaders.indexOf('Most Recent Lapse Score')] = donorStats[donarId].MostRecentLapseScore;

}
updatedDonorsData.push(row);

}
);
// Clear and update the donors sheet with new data  donorsSheet.clear();
donorsSheet.getRange(1, 1, updatedDonorsData.length, updatedDonorsData[0].length).setValues(updatedDonorsData);

}
