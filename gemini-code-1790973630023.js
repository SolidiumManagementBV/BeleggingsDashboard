function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DASHBOARD"); // Pas aan indien je tabblad anders heet
  var rows = sheet.getDataRange().getValues();
  
  if (rows.length < 2) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var headers = rows[0]; // Kolomnamen (Bedrijf, Subsector, Aandelen, Koers, Waarde, Rendement, etc.)
  var result = [];

  // Loop door alle datarijen
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var obj = {};
    
    for (var j = 0; j < headers.length; j++) {
      var headerName = headers[j].toString().trim().toLowerCase();
      if (headerName) {
        obj[headerName] = row[j];
      }
    }
    
    // Alleen meenemen als er een naam/bedrijf is ingevuld
    if (obj['bedrijf'] || obj['positie'] || obj['naam']) {
      result.push(obj);
    }
  }
  
  // Stuur de data terug als schone JSON voor Netlify
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}