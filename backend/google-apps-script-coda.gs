/**
 * H10 Framing Test — Google Apps Script → Coda Backend
 * 
 * SETUP:
 * 1. Go to https://script.google.com → New Project
 * 2. Paste this file
 * 3. Add Coda Token in Script Properties: CODA_TOKEN = e20f5aaa-4705-4cd8-bffe-15a8c3bcf380
 * 4. Deploy → Web App → Execute as "Me", Access "Anyone"
 * 5. Copy URL to h10-survey.html
 * 
 * CODA CONFIG:
 * Doc ID: oKHU8eLt_5
 * Table: H10 Survey Results (create this table with columns below)
 */

const CODA_DOC_ID = 'oKHU8eLt_5';
const CODA_TABLE_NAME = 'H10 Survey Results';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Calculate if attention check passed (5 or 6 = "Somewhat Agree")
    const attentionPassed = data.attentionCheck === 5 || data.attentionCheck === 6;
    
    // Get Coda token from Script Properties
    const codaToken = PropertiesService.getScriptProperties().getProperty('CODA_TOKEN');
    
    if (!codaToken) {
      throw new Error('CODA_TOKEN not set in Script Properties');
    }
    
    // Prepare row for Coda
    const row = {
      cells: [
        { column: 'Timestamp', value: new Date().toISOString() },
        { column: 'Prolific PID', value: data.prolificPID || '' },
        { column: 'Condition', value: data.condition || '' },
        { column: 'Trust 1', value: data.responses?.trust_1 || 0 },
        { column: 'Trust 2', value: data.responses?.trust_2 || 0 },
        { column: 'Trust 3', value: data.responses?.trust_3 || 0 },
        { column: 'Trust 4', value: data.responses?.trust_4 || 0 },
        { column: 'Trust 5', value: data.responses?.trust_5 || 0 },
        { column: 'Attention Check', value: data.attentionCheck || 0 },
        { column: 'Attention Passed', value: attentionPassed },
        { column: 'Open Ended', value: data.openEnded || '' },
        { column: 'AI Familiarity', value: data.aiFamiliarity || '' },
        { column: 'Age', value: data.demographics?.age || '' },
        { column: 'Gender', value: data.demographics?.gender || '' },
        { column: 'Start Time', value: data.startTime || '' },
        { column: 'End Time', value: data.endTime || '' }
      ]
    };
    
    // Post to Coda
    const codaResponse = UrlFetchApp.fetch(
      `https://coda.io/apis/v1/docs/${CODA_DOC_ID}/tables/${encodeURIComponent(CODA_TABLE_NAME)}/rows`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${codaToken}`,
          'Content-Type': 'application/json'
        },
        payload: JSON.stringify({ rows: [row] }),
        muteHttpExceptions: true
      }
    );
    
    const codaResult = JSON.parse(codaResponse.getContentText());
    
    if (codaResponse.getResponseCode() !== 202 && codaResponse.getResponseCode() !== 200) {
      console.log('Coda error:', codaResult);
      throw new Error('Coda API error: ' + JSON.stringify(codaResult));
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', coda: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.log('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', backend: 'coda', message: 'H10 Backend ready' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function - run this to verify Coda connection
function testCodaConnection() {
  const codaToken = PropertiesService.getScriptProperties().getProperty('CODA_TOKEN');
  
  if (!codaToken) {
    console.log('ERROR: Set CODA_TOKEN in Script Properties first');
    return;
  }
  
  const response = UrlFetchApp.fetch(
    `https://coda.io/apis/v1/docs/${CODA_DOC_ID}`,
    {
      headers: { 'Authorization': `Bearer ${codaToken}` }
    }
  );
  
  console.log('Coda connection:', response.getContentText());
}
