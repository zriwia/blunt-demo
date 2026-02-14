/**
 * H10 Framing Test — Google Apps Script Backend
 * 
 * SETUP (2 minutes):
 * 1. Go to https://docs.google.com/spreadsheets/create
 * 2. Name it "H10 Framing Test Data"
 * 3. Add headers in row 1: timestamp | prolificPID | condition | trust_1 | trust_2 | trust_3 | trust_4 | trust_5 | attention | openEnded | aiFamiliarity | age | gender | passed
 * 4. Go to Extensions → Apps Script
 * 5. Delete everything, paste this entire file
 * 6. Click Deploy → New Deployment → Web App
 * 7. Execute as: "Me", Access: "Anyone"
 * 8. Copy the URL and paste it in h10-survey.html (line ~340)
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Calculate if attention check passed (5 or 6 = "Somewhat Agree")
    const attentionPassed = data.attentionCheck === 5 || data.attentionCheck === 6;
    
    // Append row
    sheet.appendRow([
      new Date().toISOString(),
      data.prolificPID,
      data.condition,
      data.responses?.trust_1 || '',
      data.responses?.trust_2 || '',
      data.responses?.trust_3 || '',
      data.responses?.trust_4 || '',
      data.responses?.trust_5 || '',
      data.attentionCheck,
      data.openEnded,
      data.aiFamiliarity,
      data.demographics?.age || '',
      data.demographics?.gender || '',
      attentionPassed ? 'PASS' : 'FAIL'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'H10 Backend is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
