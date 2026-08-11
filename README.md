# MANTAS Bauleistungen — Website

Statische Website (HTML/CSS/JS). Kein Build-Schritt, keine Datenbank, keine
externen Dienste. Der Ordner kann so wie er ist auf einen Webserver kopiert werden.

```
index.html          Startseite
datenschutz.html    Datenschutzerklärung
danke.html          Bestätigungsseite nach dem Absenden des Formulars
kontakt.php         Formular-Handler (nur bei Variante A nötig)
styles.css          gesamtes Styling
script.js           Mobilmenü, Footer-Muster, Video-Autostart
assets/             Bilder, Video, Logos, Schriftarten

dev.js              Vorschau-Server zum Arbeiten   ← nicht hochladen
fotos.js            Fotos zur Galerie hinzufügen   ← nicht hochladen
neue-fotos/         Ablage für neue Fotos          ← nicht hochladen
README.md           diese Datei                    ← nicht hochladen
```

---

## Beim Arbeiten: Live-Vorschau

Solange die Seite noch entwickelt wird, im Terminal einmal starten:

```bash
node dev.js
```

Dann `http://localhost:3000` im Browser öffnen **und das Fenster offen lassen**.
Ab jetzt gilt: Datei speichern → der Browser lädt die Seite von selbst neu.
Kein Aktualisieren, kein Hochladen, keine Installation nötig.

Beim Start zeigt das Terminal zusätzlich eine Adresse wie
`http://192.168.1.136:3000`. Diese im **Handy-Browser** öffnen, solange Handy und
Rechner im selben WLAN sind — so lässt sich die mobile Ansicht live prüfen.

Beenden mit `Strg + C`.

---

## Fotos zur Galerie hinzufügen

1. Fotos in den Ordner **`neue-fotos/`** legen — Originalgröße aus der Kamera ist in Ordnung.
2. Im Terminal:

   ```bash
   node fotos.js
   ```

3. Die Bilder werden automatisch verkleinert (max. 900 px, ca. 100 KB statt 10 MB),
   nach `assets/gallery/` verschoben und in `index.html` eingetragen.
4. Zum Schluss die Bildbeschreibungen in **`assets/gallery/galerie.json`**
   ergänzen — wichtig für Google und für blinde Besucher — und `node fotos.js`
   noch einmal ausführen.

Fotos entfernen: den Eintrag aus `galerie.json` löschen und `node fotos.js`
ausführen. Der Bildbereich in `index.html` wird nicht von Hand bearbeitet.

---

## Schritt 1 — Platzhalter ausfüllen

Alle offenen Stellen sind im Browser **gelb hinterlegt**, damit nichts übersehen wird.

| Datei | Stelle | Was eintragen |
|---|---|---|
| `index.html` | „Unsere Erfahrung“ | `[X Jahre]` → tatsächliche Jahre |
| `datenschutz.html` | Stand | Datum der Veröffentlichung |
| `datenschutz.html` | Ziffer 3 | Name + Anschrift des Hosting-Anbieters |
| `datenschutz.html` | Ziffer 3 | Speicherdauer der Server-Logfiles (beim Hoster erfragen) |
| `datenschutz.html` | Ziffer 5 | Formular-Dienstleister — oder Absatz löschen (Variante A) |
| `datenschutz.html` | Ziffer 9 | Drittlandübermittlung ja/nein |

Außerdem zu klären:

- **`IBM M. Stankevičius`** — im Brandbook steht `IHB`, die übliche deutsche
  Abkürzung für einen Einzelunternehmer ist `Inh.` (Inhaber). Bitte vor dem
  Livegang festlegen; die Angabe steht im Impressum und muss korrekt sein.
- **Social-Media-Links** im Footer stehen auf `#`. Entweder echte Profile
  eintragen oder die drei Icons entfernen.
- **`service-renovierung.jpg`** ist derzeit ein Platzhalter (Bad vorher/nachher).
  Das Fliesenleger-Foto einfach unter diesem Namen in `assets/` ablegen.
- **E-Mail-Adresse**: `montexs@gmail.com` steht im Impressum. Eine Adresse auf der
  eigenen Domain (`info@mantasbau.de`) wirkt deutlich professioneller und ist bei
  den unten genannten Hostern inklusive.

---

## Schritt 2 — Domain

Laut Brandbook existiert `www.mantasbau.de` bereits. Prüfen, ob die Domain noch
auf Sie registriert ist:

```bash
whois mantasbau.de
```

Falls sie bei einem alten Anbieter liegt, können Sie sie per **KK-Antrag**
(Auth-Code beim alten Anbieter anfordern) kostenlos zum neuen Hoster umziehen.

---

## Schritt 3 — Hosting wählen

### Variante A — klassischer Webspace (empfohlen)

Deutscher Hoster, Server in Deutschland, PHP inklusive. Vorteile: einfachster
Datenschutz-Nachweis (AV-Vertrag auf Deutsch, keine Drittlandübermittlung),
E-Mail-Postfächer inklusive, das Formular läuft ohne Fremddienst.

| Anbieter | ca. Preis/Monat | Anmerkung |
|---|---|---|
| All-inkl.com „Privat“ | ~5 € | sehr guter Support, AVV im Kundenmenü |
| IONOS | ~4 € | größter deutscher Anbieter |
| Hetzner Webhosting | ~3 € | günstig, technisch solide |
| Strato | ~5 € | weit verbreitet |

**So geht es:**

1. Paket buchen und die Domain `mantasbau.de` dort aufschalten.
2. Im Kundenmenü **SSL/TLS aktivieren** (Let's Encrypt, überall kostenlos).
   Danach unbedingt „HTTP → HTTPS umleiten“ einschalten.
3. **AV-Vertrag** (Auftragsverarbeitung, Art. 28 DSGVO) abschließen — bei allen
   genannten Anbietern ein Klick im Kundenmenü. Das ist Pflicht.
4. Postfach `noreply@mantasbau.de` anlegen (für den Formularversand).
5. Den **Inhalt** dieses Ordners per FTP/SFTP in das Web-Verzeichnis kopieren
   (heißt meist `httpdocs`, `htdocs` oder `public_html`). Kostenloses
   FTP-Programm: [FileZilla](https://filezilla-project.org).
   Wichtig: den *Inhalt* hochladen, nicht den Ordner `site-de` selbst.
   **Nicht** hochladen: `dev.js`, `fotos.js`, `neue-fotos/`, `README.md` —
   das sind reine Arbeitswerkzeuge und gehören nicht auf den Webserver.
6. In `kontakt.php` oben die drei Werte anpassen (Empfänger, Absender, Dankeseite).
7. `https://mantasbau.de` aufrufen und das Formular einmal selbst testen.

### Variante B — Netlify (kostenlos, ohne FTP)

Kein PHP nötig, Formular ist eingebaut, aber der Anbieter sitzt in den USA
(muss dann in der Datenschutzerklärung genannt werden).

1. Konto auf [netlify.com](https://netlify.com) anlegen.
2. Den Ordner auf „Sites → Add new site → Deploy manually“ ziehen. Fertig, die
   Seite ist sofort unter einer `*.netlify.app`-Adresse online.
3. Eigene Domain unter „Domain settings“ verbinden, SSL kommt automatisch.
4. In `index.html` das `<form>`-Tag ersetzen durch:
   ```html
   <form class="contact__form" name="kontakt" method="post"
         data-netlify="true" netlify-honeypot="website" action="/danke.html">
     <input type="hidden" name="form-name" value="kontakt">
   ```
   `kontakt.php` wird dann nicht mehr gebraucht und kann gelöscht werden.
5. Anfragen stehen im Netlify-Dashboard unter „Forms“; unter
   „Forms → Notifications“ eine E-Mail-Benachrichtigung einrichten.

---

## Schritt 4 — Anfragen empfangen

**Variante A:** `kontakt.php` schickt jede Anfrage an `$empfaenger`. Das `Reply-To`
ist auf den Kunden gesetzt — Sie können in Ihrem Mailprogramm direkt auf
„Antworten“ klicken und schreiben dem Kunden.

Enthalten sind bereits:

- Pflichtfeld-Prüfung und E-Mail-Validierung
- **Honeypot** gegen Spam-Bots (unsichtbares Feld)
- Schutz gegen Header-Injection
- Protokollierung der Datenschutz-Einwilligung in der E-Mail

**Landen die Mails im Spam?** Fast immer liegt es am Absender. `$absender` muss
eine Adresse Ihrer eigenen Domain sein (nicht gmail), und beim Hoster sollten
**SPF** und **DKIM** aktiviert sein — bei den genannten Anbietern ein Schalter im
Kundenmenü.

**Kein Postfach gewünscht?** Dann `$empfaenger` einfach auf die Gmail-Adresse
lassen — nur der *Absender* muss die eigene Domain sein.

---

## Schritt 5 — Vor dem Livegang prüfen

- [ ] Alle gelben Platzhalter ersetzt
- [ ] Impressum-Schreibweise geklärt (IBM / IHB / Inh.)
- [ ] Datenschutzerklärung anwaltlich oder durch die IHK geprüft
- [ ] AV-Vertrag mit dem Hoster abgeschlossen
- [ ] HTTPS aktiv, HTTP leitet weiter
- [ ] Formular einmal echt getestet, Mail kam an, „Antworten“ funktioniert
- [ ] Auf dem eigenen Handy angeschaut
- [ ] Hinweiskasten oben in `datenschutz.html` gelöscht

---

## Technische Hinweise

- **Keine externen Verbindungen.** Poppins liegt selbst gehostet unter
  `assets/fonts/`. Google Fonts wurde bewusst entfernt: das Einbinden überträgt
  die IP-Adresse der Besucher an Google und wurde vom LG München I
  (20.01.2022, Az. 3 O 17493/20) als DSGVO-Verstoß gewertet — eine der häufigsten
  Abmahnungsursachen bei deutschen Websites. Bitte nicht wieder einbauen.
- **Keine Cookies, kein Tracking** — deshalb ist auch kein Cookie-Banner nötig.
  Sobald Google Analytics, Maps oder ein Facebook-Pixel dazukommt, ändert sich
  das, und die Datenschutzerklärung muss erweitert werden.
- **Seitengewicht** rund 2,8 MB gesamt, ca. 520 KB beim ersten Bildaufbau.
  Bilder unterhalb des sichtbaren Bereichs werden nachgeladen, das Video startet
  erst beim Scrollen.
- **Bilder tauschen:** einfach die Datei in `assets/` unter gleichem Namen
  ersetzen. Vorher verkleinern (max. 1800 px breit), sonst wird die Seite langsam.
