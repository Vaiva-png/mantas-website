<?php
/**
 * MANTAS Bauleistungen — Kontaktformular-Handler
 * -----------------------------------------------------------------------------
 * Nimmt das Formular von index.html entgegen und schickt es per E-Mail weiter.
 * Läuft auf jedem klassischen PHP-Webspace (All-inkl, IONOS, Strato, Hetzner …).
 *
 * EINRICHTUNG: nur die drei Werte in der KONFIGURATION unten anpassen.
 *
 * Wenn Sie stattdessen Netlify benutzen, brauchen Sie diese Datei NICHT —
 * siehe README.md, Abschnitt "Variante B".
 */

// ----------------------------- KONFIGURATION --------------------------------

/** Wohin sollen die Anfragen geschickt werden? */
$empfaenger = 'montexs@gmail.com';

/**
 * Absenderadresse. WICHTIG: Muss eine Adresse Ihrer eigenen Domain sein,
 * sonst landen die Mails im Spam (SPF/DMARC). Legen Sie dafür beim Hoster
 * ein Postfach wie noreply@mantasbau.de an.
 */
$absender = 'noreply@mantasbau.de';

/** Seite, auf die nach dem Absenden weitergeleitet wird. */
$danke_seite = 'danke.html';

// ------------------------- AB HIER NICHTS ÄNDERN ----------------------------

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html', true, 303);
    exit;
}

/** Entfernt Zeilenumbrüche — verhindert das Einschleusen von Mail-Headern. */
function sauber(string $wert): string {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', $wert));
}

function abbruch(string $grund): void {
    header('Location: index.html?fehler=' . urlencode($grund) . '#kontakt', true, 303);
    exit;
}

// Spam-Falle: echte Menschen sehen dieses Feld nicht und füllen es nie aus.
if (!empty($_POST['website'] ?? '')) {
    header('Location: ' . $GLOBALS['danke_seite'], true, 303); // Bots ins Leere laufen lassen
    exit;
}

$name      = sauber($_POST['name']      ?? '');
$email     = sauber($_POST['email']     ?? '');
$leistung  = sauber($_POST['leistung']  ?? 'keine Angabe');
$nachricht = trim($_POST['nachricht']   ?? '');
$consent   = isset($_POST['datenschutz']);

// Pflichtfelder prüfen
if ($name === '' || mb_strlen($name) > 100)          abbruch('name');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))      abbruch('email');
if (!$consent)                                        abbruch('datenschutz');
if (mb_strlen($nachricht) > 5000)                     abbruch('nachricht');

// Nachricht zusammenbauen
$betreff = 'Neue Anfrage über mantasbau.de: ' . $leistung;

$text = "Neue Anfrage über das Kontaktformular\n"
      . str_repeat('-', 48) . "\n\n"
      . "Name:      $name\n"
      . "E-Mail:    $email\n"
      . "Leistung:  $leistung\n\n"
      . "Nachricht:\n"
      . ($nachricht !== '' ? $nachricht : '(keine Nachricht hinterlassen)') . "\n\n"
      . str_repeat('-', 48) . "\n"
      . "Eingegangen: " . date('d.m.Y H:i:s') . "\n"
      . "IP-Adresse:  " . ($_SERVER['REMOTE_ADDR'] ?? 'unbekannt') . "\n"
      . "Einwilligung Datenschutz: erteilt\n";

$headers = [
    'From: MANTAS Website <' . $absender . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',   // Antworten gehen direkt an den Kunden
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$ok = mail(
    $empfaenger,
    '=?UTF-8?B?' . base64_encode($betreff) . '?=',
    $text,
    implode("\r\n", $headers),
    '-f' . $absender
);

if (!$ok) {
    abbruch('versand');
}

header('Location: ' . $danke_seite, true, 303);
exit;
