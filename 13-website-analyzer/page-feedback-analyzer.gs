/**
 * "Website Page Evaluator: Streamlined User Feedback and Experience Assessment Tool"
 * Date: June 27, 2024
 * Tags: API Intergration, Document Automation, Form Classification, Google Apps Script, Google Forms API, Google Sheets API, JavaScript, Structured Data Extraction, User Experience (UX) Design
 * Description: "Effortlessly Gather User Feedback with Our Interactive Website Page Evaluator Form"
 * 
 * Auto-parsed from CSV on 2025-09-14
 */


/**
 * Technical Details:
 * - 1
 * - Dynamic Form Creation: The script automatically generates a Google Form for evaluating multiple web pages, allowing for an efficient collection of user feedback
 * - 2
 * - Email Validation: It includes a validated email input section to ensure respondents provide a legitimate email address for identification
 * - 3
 * - User Feedback Mechanism: The form employs an emoji-based rating system for users to evaluate design and content, along with grid items for assessing layout preferences
 * - 4
 * - Response Management: Collected responses are automatically linked to a new Google Sheets document, facilitating easy data organization and analysis
 * - 5
 * - Extensible Features: The script is designed for future enhancements, including customizable question sets, integration with image hosting for visual previews, and multi-language support for broader usability
 */

function createEvaluationForm()  {
  try  {
  // Create a new form    const form = FormApp.create('Website Page Evaluator Reel');
Logger.log('Form created');
// Add a section for email    form.addTextItem()        .setTitle('Email')        .setRequired(true)        .setValidation(FormApp.createTextValidation()                       .requireTextMatchesPattern('.*@.*\\..*')                       .setHelpText('Please enter a valid email address.')                       .build());
Logger.log('Email section added');
// List of files to evaluate with their direct links    const files = [       {
  name: 'pZwJi5DHgv81AeDNI.html', link: 'https://drive.google.com/uc?export=view&id=1fTJuDqu8QDJbF1-X2_8T1FpQnOUg0Pha'
}
,       {
  name: '8jeeRTMXVoxKoAs9P.html', link: 'https://drive.google.com/uc?export=view&id=1l4sOZV_G8KfT81sGSMZ7g48uKwU5OnxO'
}
,       {
  name: 'EkwwCJGr1BsNwdvLq.html', link: 'https://drive.google.com/uc?export=view&id=1-6EElbItIQ9b_pD1aD9E1DQVR1k11MKg'
}
,       {
  name: '4tjIgnbs1xc3SzpAc.html', link: 'https://drive.google.com/uc?export=view&id=1HXa-KBO2Db3xT4zNnUMvYtF_S_jpt03X'
}
,       {
  name: 'donor-pulse-calculator-enhanced.html', link: 'https://drive.google.com/uc?export=view&id=1vG_DW_HMYfyqdsCLSe8OMRt-I6aWpkzk'
}
,       {
  name: 'RrnzeN5T9txeG3jat.html', link: 'https://drive.google.com/uc?export=view&id=1XGzqizpI5QWvnF79SEl7sFiQTFgB1--o'
}
,       {
  name: '77IIKaeZS7T2FRikk.html', link: 'https://drive.google.com/uc?export=view&id=1P0cX_z7OOsPP4yutXnRQyX_WL3O7B7cO'
}
,       {
  name: '57FpcWLHEnyVv3o77.html', link: 'https://drive.google.com/uc?export=view&id=1aCKHjffBUP3F_zIOM9nt7R9A-6jOJaEC'
}
,       {
  name: '11ka3JetaF6Dwh72y.html', link: 'https://drive.google.com/uc?export=view&id=1L5y6_mA7aWYe7J2DnpX0YPjoz9OdEhNh'
}
,       {
  name: 'l60i9WULQZchOHwig.html', link: 'https://drive.google.com/uc?export=view&id=1vVd2-s7EMOpX4kz3XoKpEwZz-54DJ9_h'
}
,       {
  name: 'MPNHtdu1mSsk0TRMH.html', link: 'https://drive.google.com/uc?export=view&id=1Vp7LIR2Ihqxv4aX3Yit10fj6KR1tHkDp'
}
,       {
  name: 'ewEzaikU0gsg6cC9a.html', link: 'https://drive.google.com/uc?export=view&id=1wR2xU5nP4ZzZB5oEMe2AVlHKXZ30-ONc'
}
,       {
  name: 'ZfC3QH3E9Qb8UZ79P.html', link: 'https://drive.google.com/uc?export=view&id=1RrJ_e8c8WkF12VSCN7THNHX4U3kvLfAO'
}
,       {
  name: 'FnTG5MluJqWlo2DqS.html', link: 'https://drive.google.com/uc?export=view&id=1O8FqT8ib-B52-Ty0B5zAaVyoA0VDi0ae'
}
,       {
  name: 'DIiS834drmudntbXA.html', link: 'https://drive.google.com/uc?export=view&id=1VOcH_XtW4irMOGjUkOqfZ8_oy1l7c46o'
}
,       {
  name: 'ZdoALOE2i8jai8Wh3.html', link: 'https://drive.google.com/uc?export=view&id=1uy_FOnIvVf85kFNZlmDID0u_V4MdoHzd'
}
,       {
  name: 'uGMYeQw73RNryN3cb.html', link: 'https://drive.google.com/uc?export=view&id=1ICU_ysBQG50Rsd8dqKtOlNJH2m-xxMWe'
}
,       {
  name: 'dzKH340tUEBIRYFdU.html', link: 'https://drive.google.com/uc?export=view&id=1Mw0ykXH3Ky8HJqWcE3PDUwU7tftZTn8D'
}
,       {
  name: 'cEH4Z72km9GjzzlMT.html', link: 'https://drive.google.com/uc?export=view&id=1Dz5iI9Ok9Cj0OkVRVmnNKoRRwymYpRXJ'
}
,       {
  name: 'donor-pulse-calculator-high-value.html', link: 'https://drive.google.com/uc?export=view&id=1AaO2zbb9XlPjwq0gYP2vWfXb5rmbFbaX'
}
,       {
  name: '6TseRSgfrc47Bw99p.html', link: 'https://drive.google.com/uc?export=view&id=1OPWAvscqrktKMR_GtrcJ4X06CmzeS5GZ'
}
,       {
  name: '2IyrWgSZpE0PbvGjg.html', link: 'https://drive.google.com/uc?export=view&id=1CFi_b3KlP1Ws8rUFDhxlMlnXGklFgkq4'
}
,       {
  name: 'donor-pulse-calculator.html', link: 'https://drive.google.com/uc?export=view&id=1m9jhaO7pgNCgtt4a-wBbUPKHSIqTtV5K'
}
,       {
  name: 'BQH9U0rMhHIKD1FWd.html', link: 'https://drive.google.com/uc?export=view&id=1cQUoEuOviLeCB7OeZ5Q0PS1mKZZpy6Xf'
}
,       {
  name: 'tCsgUFJkZVqN7K4K5.html', link: 'https://drive.google.com/uc?export=view&id=1qOoTZ2H8a0kthKVD0-jJ03jqjlmY6EtG'
}
,       {
  name: '4pxr8mRlh8A4a4Byu.html', link: 'https://drive.google.com/uc?export=view&id=1guX_tjWZ41nEzx7-2BcZx7h0ObhX_XgJ'
}
,       {
  name: 'h3uVSS7W31P7AFYCb.html', link: 'https://drive.google.com/uc?export=view&id=1BP9M4R4CpNTzB-yDdBtBpG2Z7X6XXfdX'
}
,       {
  name: 'hZotaJZBTz4kOsyLj.html', link: 'https://drive.google.com/uc?export=view&id=1rotx9zHSUEsEjRtTd3BvChDTmnSso4NZ'
}
,       {
  name: 'nk8dUIvbsyhjlf1ul.html', link: 'https://drive.google.com/uc?export=view&id=1qI9eISU6s6D2FWU6z_m2l45W8nQlPDPV'
}
,       {
  name: 'PmCgj9VFiDDOlXNQV.html', link: 'https://drive.google.com/uc?export=view&id=1zgMSYm9aA1zzE9GzC9qMC9GMr9Y3B4Pp'
}
,       {
  name: '4jvnElwtBHLunrgdo.html', link: 'https://drive.google.com/uc?export=view&id=1xQchMTkTH8Adh4Hcxtt9_UjO3R-tNX2c'
}
,       {
  name: 'Opxn3bPJK8LkQ1H2I.html', link: 'https://drive.google.com/uc?export=view&id=1qaHLpY7M4pxXwn4zFa8DRF7DtqMW9E3R'
}
,       {
  name: 'qd5hZQUn0m3i6wxbq.html', link: 'https://drive.google.com/uc?export=view&id=1D-_cvRvHwoeiTb8OCHH7VQ5riQDNqEVa'
}
,       {
  name: 'NrA27wkTlWAJ83HUw.html', link: 'https://drive.google.com/uc?export=view&id=1vMS3MdaChFN6aS79t1XxKE3j0a_5QfHX'
}
,       {
  name: 'S0EhJsTZeEJ6wX0UI.html', link: 'https://drive.google.com/uc?export=view&id=1wZduUsZP56sE01cAG2l8L-DbHxrqX-Zp'
}
,       {
  name: 'csEyVjjrsfOyFCBX9.html', link: 'https://drive.google.com/uc?export=view&id=1AaO2zbb9XlPjwq0gYP2vWfXb5rmbFbaX'
}
,       {
  name: 'yd7BA2PE0Nep5HBlU.html', link: 'https://drive.google.com/uc?export=view&id=1NzHyN7pjeh4eGOSK2YOeSGiD7W-9IbBd'
}
,       {
  name: '9zxmH4iIpS4xbTVTB.html', link: 'https://drive.google.com/uc?export=view&id=1IQ9nnO1S_o9meWxlx6XXgA'
}
,       {
  name: 'tavq1Bp8wbN0cXpiz.html', link: 'https://drive.google.com/uc?export=view&id=1g6M7XkBP1Gs96vFH5dQ4yYThUO5fEgTH'
}
,       {
  name: 'bWaaEMXKkmKGW7N4F.html', link: 'https://drive.google.com/uc?export=view&id=1hAlPsI9PM_Y2pDbNbpv9GzNus'
}
,       {
  name: 'mnK1ijavrJnnkhDLo.html', link: 'https://drive.google.com/uc?export=view&id=1h4s8CcmXxBzxf3OJxvFZEX'
}
,       {
  name: 'Og6yTcv3nELdTQBH3.html', link: 'https://drive.google.com/uc?export=view&id=1S0FgSsxY1cXXTTfA-KS01TfUV4YW'
}
,       {
  name: 'L7r08WoJLkfdBjGrX.html', link: 'https://drive.google.com/uc?export=view&id=1PWhl00pC7M8gCwCjKRMyTkOR06Iv6RL'
}
,       {
  name: 'yIRFeQZXH3f50zKoq.html', link: 'https://drive.google.com/uc?export=view&id=1Q1GBZdRZTnCAsMIh2-K97x11cED8R'
}
,       {
  name: 'cIrdJCZjCH1KG07SV.html', link: 'https://drive.google.com/uc?export=view&id=1LC17m3HUWc4GRwW5zFI9zv78UDHZs'
}
,       {
  name: 'PujWjYt6mevgbqniI.html', link: 'https://drive.google.com/uc?export=view&id=1JkIUhdToIYWQkZ7Ku3C5Fpx8erEDJ5TB'
}
,       {
  name: 'j3SwQpbbAoQrkT2Hx.html', link: 'https://drive.google.com/uc?export=view&id=1KkGIuYmcT8SFdSMkKkQ5Whp7KLmEISMD'
}
,       {
  name: 'mlNdesYabXcJQnCVj.html', link: 'https://drive.google.com/uc?export=view&id=1FxMUjE7Pa6tOTpGNOgUpmWfFS5LhF2DI'
}
,       {
  name: 'EQherrZyQ6S0yqVCF.html', link: 'https://drive.google.com/uc?export=view&id=1FyFyXwhujms98h3wHxyFBO5rt2PO3r7L'
}
,       {
  name: 'UdQvBaIXWM9lepdn4.html', link: 'https://drive.google.com/uc?export=view&id=1SHEqwbpMcQgXl0kn5rA9wrGbUuU6v6Qn'
}
,       {
  name: 'sAqYGSYKSAnRQuZzV.html', link: 'https://drive.google.com/uc?export=view&id=1GkD5La0elvh1mPbJtktZp0MDpEuGfP6i'
}
,          ];
files.forEach(file =>  {
  Logger.log('Processing file: ' + file.name);
form.addSectionHeaderItem().setTitle(`Evaluation for $ {
  file.name
}
`);
form.addPageBreakItem().setTitle(`View File: $ {
  file.name
}
`)          .setHelpText(`You can view the file by clicking the following link: $ {
  file.link
}
`);
form.addMultipleChoiceItem()          .setTitle(`Design of $ {
  file.name
}
`)          .setChoiceValues(['😍 Love it', '😐 Meh', '👎 Don\'t like'])          .setRequired(true);
form.addMultipleChoiceItem()          .setTitle(`Content of $ {
  file.name
}
`)          .setChoiceValues(['😍 Love it', '😐 Meh', '👎 Don\'t like'])          .setRequired(true);
form.addGridItem()          .setTitle(`Position for $ {
  file.name
}
`)          .setRows(['Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Middle Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'])          .setColumns(['Select'])          .setRequired(true);
Logger.log('Added evaluation items for: ' + file.name);

}
);
// Link the form to a new response spreadsheet    const responseSheet = SpreadsheetApp.create('Website Page Evaluator Reel Responses');
form.setDestination(FormApp.DestinationType.SPREADSHEET, responseSheet.getId());
Logger.log('Response sheet created and linked');
// Provide the form URL for the user    Logger.log(`Form URL: $ {
  form.getPublishedUrl()
}
`);

}
catch (error)  {
  Logger.log('Error: ' + error.toString());

}

}
