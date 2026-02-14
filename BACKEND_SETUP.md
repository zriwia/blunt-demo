# H10 Survey Backend Setup

**Zeit:** 2-5 Minuten
**Optionen:** Formspree (instant) oder Google Sheets (robust)

---

## Option A: Formspree (Empfohlen für Soft Launch)

**Vorteile:** Sofort nutzbar, keine Google-Account-Abhängigkeit, 50 free submissions/Monat

### Setup (2 Min)

1. Gehe zu https://formspree.io
2. Klicke "Get Started Free"
3. Erstelle einen Account (oder "Try without signing up")
4. Klicke "New Form"
5. Kopiere die Form ID (z.B. `xyzabcde`)
6. Öffne `h10-survey.html`, finde Zeile ~340:
   ```javascript
   const FORMSPREE_URL = 'https://formspree.io/f/XXXXXXXX';
   ```
7. Ersetze `XXXXXXXX` mit deiner Form ID
8. Push zu GitHub: `git add . && git commit -m "Add Formspree backend" && git push`

**Fertig!** Responses erscheinen in deinem Formspree Dashboard.

---

## Option B: Google Sheets (Robust für Full Launch)

**Vorteile:** Alle Daten in einem Sheet, einfach zu analysieren, unbegrenzt

### Setup (5 Min)

1. **Sheet erstellen:**
   - Gehe zu https://docs.google.com/spreadsheets/create
   - Benenne es "H10 Framing Test Data"
   - Füge diese Headers in Zeile 1 ein:
     ```
     timestamp | prolificPID | condition | trust_1 | trust_2 | trust_3 | trust_4 | trust_5 | attention | openEnded | aiFamiliarity | age | gender | passed
     ```

2. **Apps Script hinzufügen:**
   - Im Sheet: Extensions → Apps Script
   - Lösche alles im Editor
   - Kopiere den gesamten Inhalt von `backend/google-apps-script.gs`
   - Füge ein, speichere (Ctrl+S)

3. **Deployen:**
   - Klicke "Deploy" → "New Deployment"
   - Typ: "Web App"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Klicke "Deploy"
   - Kopiere die Web App URL

4. **In Survey eintragen:**
   - Öffne `h10-survey.html`
   - Finde Zeile ~343:
     ```javascript
     // const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
     ```
   - Entferne `//` am Anfang
   - Ersetze die URL mit deiner Web App URL
   - Ändere Zeile ~346 zu: `const backendUrl = GOOGLE_SCRIPT_URL;`

5. **Push:**
   ```bash
   git add . && git commit -m "Add Google Sheets backend" && git push
   ```

---

## Testen

Nach dem Setup:

1. Öffne https://zriwia.github.io/blunt-demo/h10-survey.html
2. Fülle die Survey aus
3. Prüfe:
   - **Formspree:** Dashboard zeigt neue Submission
   - **Google Sheets:** Neue Zeile erscheint im Sheet

---

## Troubleshooting

**"No backend configured" in Console:**
→ FORMSPREE_URL oder GOOGLE_SCRIPT_URL ist noch nicht gesetzt

**CORS-Error:**
→ Bei Google Sheets: Prüfe dass "Anyone" Zugriff hat
→ Bei Formspree: Prüfe dass der Account aktiviert ist

**Daten kommen nicht an:**
→ Daten werden immer in localStorage gespeichert als Backup
→ Console öffnen (F12), nach Errors suchen
