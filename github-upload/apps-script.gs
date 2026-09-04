/**
 * CrisYoga — Lead logger para Google Sheets
 * ---------------------------------------------------------
 * Cole este código no Apps Script vinculado à planilha (veja README.md
 * para o passo a passo completo). Ele recebe o POST do formulário da
 * landing page principal (aba "Leads") e, quando o payload vem marcado
 * como data.formulario === "imersao", da página de inscrição de eventos
 * avulsos como a Imersão de Meditação (aba "Imersão").
 *
 * Não lida com nada sensível: só nome, whatsapp, modalidade/evento,
 * formato, origem, campanha (UTM) e data — os mesmos campos que já
 * aparecem nas respectivas páginas.
 */

var SHEET_NAME = "Leads";
var SHEET_NAME_IMERSAO = "Imersão";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Validação simples — evita gravar linhas vazias/lixo se a URL vazar.
    if (!data.nome || !data.whatsapp) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "campos obrigatorios ausentes" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.formulario === "imersao") {
      var sheetImersao = getOrCreateSheetImersao_();
      sheetImersao.appendRow([
        new Date(),
        data.nome || "",
        data.whatsapp || "",
        data.evento || "",
        data.pagina || "",
        "Nova"
      ]);
    } else {
      var sheet = getOrCreateSheet_();
      sheet.appendRow([
        new Date(),
        data.nome || "",
        data.whatsapp || "",
        data.modalidade || "",
        data.formato || "",
        data.origem || "",
        data.campanha || "",
        data.pagina || "",
        "Novo"
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Data/Hora", "Nome", "WhatsApp", "Modalidade", "Formato", "Origem", "Campanha (UTM)", "Pagina", "Status"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateSheetImersao_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME_IMERSAO);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_IMERSAO);
    sheet.appendRow(["Data/Hora", "Nome", "WhatsApp", "Evento", "Pagina", "Status"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
