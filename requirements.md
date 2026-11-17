# Rainbow.design – Anforderungen an das Frontend

## 1. Globale Oberfläche

**1.1 Sprache**  
Die gesamte Benutzeroberfläche muss auf Deutsch sein.

**1.2 Währung**  
Alle Preise müssen in Euro (€) angezeigt werden.

**1.3 Bezeichnungen**  
Gleiche Funktionen und Bereiche müssen überall gleich bezeichnet werden.

**1.4 Bedienelemente**  
Alle sichtbaren Buttons, Links, Symbole und Formulare müssen funktionsfähig sein.

## 2. Navigation & Footer

**2.1 Logo**  
Das Logo wird über `/assets/logo.svg` geladen. Es muss links in der Navigation angezeigt werden und zur Startseite führen.

**2.2 Navigation** 
Auf allen Hauptseiten der normalen Benutzeroberfläche muss eine einheitliche Navigation vorhanden sein.  
Die Navigation muss die Bereiche Damen, Herren, Kinder, Hunde, Dein Design, Über uns und Kontakt enthalten.
Rechts in der Navigation müssen Symbole für Suche, Benutzerkonto, Wunschliste und Warenkorb angezeigt werden.

**2.3 Warenkorb-Anzahl**  
Enthält der Warenkorb mindestens einen Artikel, muss am Warenkorb-Symbol die Summe der enthaltenen Artikelmengen angezeigt werden. Bei leerem Warenkorb wird keine Anzahl angezeigt.

**2.4 Über uns**  
„Über uns“ muss zum Abschnitt „Über uns“ auf der Startseite führen.

**2.5 Footer**  
Der Footer muss auf allen Seiten der normalen Benutzeroberfläche einheitlich angezeigt werden und enthalten: das Rainbow.design-Logo, Links zu Damen, Herren, Kinder, Hunde, Dein Design, Über uns und Kontakt, den Instagram-Link `https://www.instagram.com/rainbow.georgiandesign?stkn=dGE4M3drcmIxYndu`, den Facebook-Link `https://www.facebook.com/rainbow.georgiandesign` und den Copyright-Hinweis „© Rainbow.design“. Instagram und Facebook müssen in einem neuen Browser-Tab geöffnet werden.

## 3. Startseite

**3.1 Slogan**  
Im oberen Bereich der Startseite muss der Slogan „Rainbow Design bringt Farbe in Regentage“ angezeigt werden.

**3.2 Kategorienbereich**  
Die vier Kategorien Damen, Herren, Kinder und Hunde müssen als direkte Einstiege angezeigt werden: Damen mit `/assets/home/women.jpg`, Herren mit `/assets/home/men.jpg`, Kinder mit `/assets/home/kids.jpg` und Hunde mit `/assets/home/dogs.jpg`. Der Kategoriename muss auf dem jeweiligen Bild angezeigt werden. Ein Klick auf das Bild führt zur entsprechenden Produktkategorie.

**3.3 Dein Design-Bereich**  
Unter den Kategorien muss ein Bereich „Dein Design“ angezeigt werden. Die Motive `designe01.jpg` bis `designe04.jpg` aus `/assets/designs/adult/` müssen dort angezeigt werden.

Text:  
**Dein Regenmantel, dein Design.**  
Finde dein Lieblingsmotiv und mach deinen Regenmantel einzigartig.

Ein Klick auf eines der vier Motive führt zur Seite „Dein Design“ mit diesem Motiv bereits vorausgewählt. Zusätzlich muss ein allgemeiner Einstieg „Dein Design gestalten“ vorhanden sein. Dieser öffnet „Dein Design“ ohne Vorauswahl mit dem vollständigen Motivkatalog.

**3.4 Über uns**  
Unter „Dein Design“ muss ein Abschnitt „Über uns“ angezeigt werden.

Text:  
Rainbow.design steht für handgefertigte Regenmäntel mit individuellen Details. Farben, Rückenmotive und liebevoll gestaltete Taschen machen jedes Stück besonders.

## 4. Produktkategorien

**4.1 Kategorieseiten**  
Für Damen, Herren, Kinder und Hunde muss jeweils eine eigene Produktübersicht vorhanden sein. Angezeigt werden nur Produkte der jeweiligen Kategorie.

**4.2 Kinder-Kategorie**  
Beim Öffnen der Kinder-Seite werden alle Kinderprodukte angezeigt. Über die Auswahl „Alle“, „Mädchen“ und „Jungen“ kann die Ansicht gefiltert werden. Standardmäßig ist „Alle“ ausgewählt. „Mädchen“ zeigt Produkte mit `subcategory: "girls"`, „Jungen“ Produkte mit `subcategory: "boys"`.

**4.3 Datenquelle**  
Alle Produkte werden über `GET /products` geladen. Die Zuordnung erfolgt über `category`: Damen (`women`), Herren (`men`), Kinder (`kids`) und Hunde (`dogs`). Produktname und Farben werden aus den API-Daten übernommen, Bilder aus `imagesByColor` und Preise aus `price`. Bei Kinderprodukten werden die Preise aus `pricesBySize` verwendet.

**4.4 Produktkarten**  
Jedes Produkt der Kategorie muss angezeigt werden. Hat ein Produkt mehrere Farbvarianten mit eigenem Produktbild, muss jede dieser Farbvarianten als eigene Produktkarte dargestellt werden. Die Karte enthält Produktbild, Produktname, Preis, Farbe und Herzsymbol für die Wunschliste.

**4.5 Produkt auswählen**  
Ein Klick auf Produktbild oder Produktname öffnet die Produktdetailseite.

**4.6 Kinderpreise**  
Bei Kinderprodukten wird der niedrigste Preis aus `pricesBySize` mit „ab“ angezeigt.

## 5. Produktdetailseite

**5.1 Datenquelle**  
Die Produktdetailseite lädt das ausgewählte Produkt über `GET /products/:id`. Produktname, Beschreibung, Farben, Größen, Preis und Bilder werden aus den API-Daten übernommen.

**5.2 Produktinformationen**  
Angezeigt werden Produktname, Beschreibung, Preis, ausgewählte Farbe, verfügbare Größen und Produktbilder.

**5.3 Produktbilder**  
Für die ausgewählte Farbe werden die Bilder aus `imagesByColor` angezeigt. Das erste Bild wird groß dargestellt, weitere Bilder derselben Farbe können über Vorschaubilder ausgewählt werden.

**5.4 Farbauswahl**  
Auf der Produktdetailseite werden nur Farben angeboten, für die in `imagesByColor` Produktbilder vorhanden sind. Die Farbe der angeklickten Produktkarte muss vorausgewählt sein.

**5.5 Größen und Preis**  
Die Größen werden aus `sizes` geladen. Bei Damen-, Herren- und Hundeprodukten wird `price` angezeigt. Bei Kinderprodukten wird der niedrigste Preis aus `pricesBySize` mit „ab“ angezeigt. Nach Auswahl einer Größe wird der zugehörige Preis aus `pricesBySize` angezeigt.

**5.6 In den Warenkorb**  
Vor dem Hinzufügen zum Warenkorb müssen Farbe und Größe ausgewählt sein. Das Produkt wird über `POST /cart` mit Produkt-ID, Farbe, Größe und Menge `1` zum Warenkorb hinzugefügt.

**5.7 Dein Design**  
Bei Produkten mit `customizable: true` muss ein Link „Dein Design“ angezeigt werden. Der Link führt zum Konfigurator. Bei Produkten mit `customizable: false` wird dieser Link nicht angezeigt.

## 6. Dein Design

**6.1 Motivkatalog**  
Beim direkten Öffnen von „Dein Design“ ohne Vorauswahl wird zunächst der vollständige Motivkatalog aus `GET /designs` angezeigt. Ein kurzer Hinweis erklärt, dass zuerst ein Rückenmotiv ausgewählt und der Mantel anschließend für Damen, Herren, Kinder oder Hund konfiguriert wird.
Über die Auswahl „Alle“, „Erwachsene“ und „Kinder“ kann der Motivkatalog gefiltert werden. „Erwachsene“ zeigt Motive aus `adult`, „Kinder“ Motive aus `kids`. Die Filter dienen nur zur Übersicht und schränken die spätere Verwendung eines Motivs nicht ein.

**6.2 Motive anzeigen und auswählen**
Die Motive werden als gut erkennbare, auswählbare Karten mit Vorschaubild dargestellt. Ein Klick auf ein Motiv öffnet die Konfiguration mit diesem Motiv vorausgewählt. Das ausgewählte Motiv wird dort deutlich größer angezeigt und visuell hervorgehoben. Es bleibt während der weiteren Konfiguration erhalten und kann über „Motiv ändern“ gewechselt werden.

**6.3 Auswahl „Für wen?“**  
Nach Auswahl eines Motivs wird zwischen Damen, Herren, Kinder und Hund gewählt. Jedes Rückenmotiv kann unabhängig vom ursprünglichen Katalog für jede dieser Zielgruppen verwendet werden. Verwendet wird das passende Produkt mit `customizable: true`

**6.4 Kinder-Auswahl**  
Nach Auswahl von „Kinder“ muss zusätzlich zwischen Mädchen (`girls`) und Jungen (`boys`) gewählt werden.

**6.5 Datenquelle**  
Die individualisierbaren Produkte werden über `GET /products`, die gemeinsame Farbauswahl über `GET /custom-colors` und die Rückenmotive über `GET /designs` geladen.

**6.6 Farbauswahl und Farbvorschau**  
Für Damen, Herren, Kinder und Hund müssen dieselben über `GET /custom-colors` geladenen Mantelfarben angeboten werden.
Ist für die gewählte Zielgruppe und Farbe ein Bild in `imagesByColor` vorhanden, wird dieses als Vorschau angezeigt. Ist kein Bild vorhanden, wird der Hinweis „Für diese Farbe ist kein Vorschaubild vorhanden. Der Mantel kann trotzdem in dieser Farbe bestellt werden.“ angezeigt.

**6.7 Größe**  
Die Größe muss aus `sizes` gewählt werden.

**6.8 Taschendesign**  
Für das Taschendesign muss ein optionales Freitextfeld vorhanden sein. Zusätzlich wird der Hinweis „Die Taschen werden von der Designerin passend zu Mantelfarbe und Rückenmotiv gestaltet.“ angezeigt.

**6.9 Preis**  
Bei Damen-, Herren- und Hundeprodukten wird `price` verwendet. Bei Kinderprodukten wird der Preis aus `pricesBySize` anhand der gewählten Größe übernommen.

**6.10 Zusammenfassung**  
Vor dem Hinzufügen zum Warenkorb müssen „Für wen?“, Farbe, Größe, Rückenmotiv, Taschenwunsch und Preis angezeigt werden. Bei Kinderprodukten wird zusätzlich Mädchen oder Jungen angezeigt. Wurde kein Taschenwunsch eingetragen, wird „Keine Angabe“ angezeigt.

**6.11 In den Warenkorb**  
Die konfigurierte Auswahl wird über `POST /cart` mit Produkt-ID, Farbe, Größe, `designId`, `pocketRequest` und Menge 1 zum Warenkorb hinzugefügt.

**6.12 Neuer Einstieg in den Konfigurator**  
Wird „Dein Design“ neu geöffnet, beginnt die Konfiguration mit einem neuen Auswahlzustand. Frühere Auswahlen für „Für wen?“, Unterkategorie, Farbe, Größe und Taschenwunsch werden nicht übernommen. Wird der Konfigurator über eines der vier Motive auf der Startseite geöffnet, ist nur dieses Motiv vorausgewählt. Beim allgemeinen Einstieg „Dein Design gestalten“ wird der Motivkatalog ohne Vorauswahl geöffnet.

## 7. Suche

**7.1 Suchfeld**  
Ein Klick auf das Suchsymbol in der Navigation öffnet ein Suchfeld.

**7.2 Suche und Datenquelle**  
Die Suche verwendet die über `GET /products` geladenen Produkte und filtert im Frontend nach Produktname, deutscher Kategoriebezeichnung, gängigen deutschen Synonymen und deutscher Farbbezeichnung. Groß- und Kleinschreibung werden nicht berücksichtigt.
Für die Kategorien müssen mindestens folgende Begriffe berücksichtigt werden:
Damen: „Damen“, „Frau“, „Frauen“
Herren: „Herren“, „Mann“, „Männer“
Kinder: „Kinder“, „Kind“, „Mädchen“, „Jungen“
Hunde: „Hunde“, „Hund“

**7.3 Suchergebnisse**  
Passende Produkte werden direkt unter dem Suchfeld mit Produktbild, Produktname und Preis angezeigt. Erfolgt ein Treffer über eine Farbe, muss die entsprechende Farbvariante des Produkts mit dem dazugehörigen Bild angezeigt werden. Ein Klick auf ein Suchergebnis öffnet die entsprechende Produktdetailseite mit dieser Farbe vorausgewählt.

**7.4 Keine Treffer**  
Werden keine passenden Produkte gefunden, wird „Keine Produkte gefunden.“ angezeigt.

**7.5 Suchfeld-Darstellung**  
Das Suchfeld muss so gestaltet sein, dass eingegebener Text, Platzhaltertext und Symbole jederzeit klar lesbar und vollständig sichtbar sind. Verwendete Symbole wie Such- oder Schließen-Icon dürfen den Texteingabebereich nicht überlagern. Dafür müssen ausreichende Innenabstände vorgesehen werden.

## 8. Wunschliste

**8.1 Zugriff**  
Die Wunschliste ist über das Herzsymbol in der Navigation erreichbar.

**8.2 Produkt speichern**  
Ein eingeloggter Nutzer kann ein Produkt über das Herzsymbol auf der Produktkarte und auf der Produktdetailseite zur Wunschliste hinzufügen. Auf der Produktdetailseite wird die aktuell ausgewählte Farbe gespeichert. Produkt-ID und Farbe werden über `POST /wishlist` gespeichert.

**8.3 Verhalten ohne Login**  
Klickt ein nicht eingeloggter Nutzer auf das Herzsymbol, wird die Login-Seite geöffnet. Von dort kann zur Registrierung gewechselt werden. Die Wunschliste wird nicht lokal für Gäste gespeichert.

**8.4 Wunschliste anzeigen**  
Die gespeicherten Einträge werden über `GET /wishlist` geladen und mit Produktbild, Produktname, Farbe und Preis angezeigt.

**8.5 Produkt entfernen**  
Bei gespeicherten Produkten wird das Herz ausgefüllt dargestellt. Ein erneuter Klick entfernt den Eintrag über `DELETE /wishlist/:itemId` aus der Wunschliste.

**8.6 Produkt auswählen**  
Ein Produkt kann aus der Wunschliste zur Produktdetailseite geöffnet werden. Die gespeicherte Farbe ist dort vorausgewählt. Der Nutzer wählt noch die Größe und kann das Produkt anschließend in den Warenkorb legen.

**8.7 Leere Wunschliste**  
Ist die Wunschliste leer, wird „Deine Wunschliste ist leer.“ angezeigt.

## 9. Warenkorb

**9.1 Zugriff**  
Der Warenkorb ist über das Warenkorb-Symbol in der Navigation erreichbar und kann auch ohne Login verwendet werden.

**9.2 Speicherung des Warenkorbs**  
Bei Gästen wird der Warenkorb der aktuellen Session zugeordnet. Bei eingeloggten Nutzern wird er dem Benutzerkonto zugeordnet. Meldet sich ein Gast mit gefülltem Warenkorb an, werden die Artikel in den Warenkorb des Benutzerkontos übernommen. Identische Artikel werden zusammengefasst und ihre Mengen addiert.

**9.3 Datenquelle**  
Die Warenkorbdaten werden über `GET /cart` geladen. Produktinformationen und Preise werden aus `GET /products` ergänzt.

**9.4 Warenkorb anzeigen**  
Für jedes Produkt werden Produktbild, Produktname, Farbe, Größe, Einzelpreis, Menge und Positionspreis angezeigt.

**9.5 Produkte aus „Dein Design“**  
Bei konfigurierten Produkten werden zusätzlich „Für wen?“, Rückenmotiv und Taschenwunsch angezeigt. Das Rückenmotiv wird anhand von `designId` aus `GET /designs` zugeordnet. Ist für die gewählte Farbe kein Produktbild vorhanden, wird das ausgewählte Rückenmotiv als Bild angezeigt.

**9.6 Menge ändern und Produkt entfernen**  
Neben der Menge werden ein Minus- und ein Plus-Button sowie eine Funktion „Löschen“ angezeigt. Plus erhöht die Menge um `1`. Minus verringert sie um `1`, kann die Menge jedoch nicht unter 1 reduzieren. Mengenänderungen werden über PUT /cart/:itemId gespeichert. Ein Klick auf „Löschen“ entfernt den jeweiligen Warenkorb-Eintrag unabhängig von seiner aktuellen Menge vollständig über DELETE /cart/:itemId.

**9.7 Preise**  
Der Positionspreis ergibt sich aus Einzelpreis × Menge. Unter allen Produkten wird die Zwischensumme angezeigt. Versandkosten werden erst im Checkout berücksichtigt.

**9.8 Anmeldung im Warenkorb**  
Ist der Nutzer nicht eingeloggt, muss im Warenkorb zusätzlich die Möglichkeit angeboten werden, sich anzumelden oder zu registrieren. Der Gast kann den Checkout weiterhin ohne Anmeldung fortsetzen. Nach erfolgreicher Anmeldung bleibt der Warenkorb erhalten und wird dem Benutzerkonto zugeordnet.

**9.9 Checkout**  
Ein Button „Zur Kasse“ führt zum Checkout.

**9.10 Leerer Warenkorb**  
Ist der Warenkorb leer, wird „Dein Warenkorb ist leer.“ angezeigt. Bei leerem Warenkorb kann der Checkout nicht geöffnet werden.

## 10. Login und Registrierung

**10.1 Login öffnen**  
Ist kein Nutzer eingeloggt, öffnet das Benutzer-Symbol in der Navigation die Login-Seite. Ein direkter Aufruf des Benutzerkontos ohne Login führt ebenfalls zur Login-Seite.

**10.2 Login**  
Der Login erfolgt mit E-Mail-Adresse und Passwort über `POST /login`.

**10.3 Login-Fehler**  
Bei ungültigen Zugangsdaten wird „E-Mail-Adresse oder Passwort ist falsch.“ angezeigt.

**10.4 Registrierung öffnen**  
Auf der Login-Seite führt der Link „Registrieren“ zur Registrierungsseite.

**10.5 Registrierung**  
Das Registrierungsformular enthält die Felder Vorname, Nachname, E-Mail-Adresse, Passwort, Passwortbestätigung, Straße und Hausnummer, Postleitzahl, Ort und Land.

**10.6 Eingaben prüfen**  
Vorname, Nachname, E-Mail-Adresse, Passwort und Passwortbestätigung sind Pflichtfelder und müssen entsprechend gekennzeichnet werden. Die E-Mail-Adresse muss gültig sein und beide Passwörter müssen übereinstimmen. Die Adressfelder sind bei der Registrierung optional.

**10.7 Benutzer registrieren**  
Vorname, Nachname, E-Mail-Adresse und Passwort sowie gegebenenfalls die eingegebene Adresse werden über `POST /register` gesendet. Die Passwortbestätigung wird nicht an das Backend gesendet.

**10.8 Bereits registrierte E-Mail-Adresse**  
Ist die E-Mail-Adresse bereits registriert, wird die vom Backend zurückgegebene Fehlermeldung angezeigt.

**10.9 Registrierung abgeschlossen**  
Nach erfolgreicher Registrierung wird eine Bestätigung angezeigt und die Login-Seite geöffnet.

**10.10 Login-Status**  
Der Login-Status wird über `GET /me` geprüft.

**10.11 Nach erfolgreichem Login**
Nach erfolgreichem Login wird bei normalen Benutzern das Benutzerkonto geöffnet. Wurde der Login aus dem Warenkorb aufgerufen, wird anschließend wieder der Warenkorb geöffnet.

**10.12 Logout**  
Der Logout erfolgt über `POST /logout`. Anschließend wird die Startseite geöffnet.

## 11. Benutzerkonto

**11.1 Zugriff und Kontoübersicht**
Ist ein Nutzer eingeloggt, öffnet das Benutzer-Symbol das Benutzerkonto. Die Kontoübersicht enthält persönliche Daten, „Meine Bestellungen“, „Meine Wunschliste“, „Passwort ändern“, „Abmelden“ und „Konto löschen“.

**11.2 Persönliche Daten**  
Vorname, Nachname, E-Mail-Adresse und die gespeicherte Adresse werden über `GET /me` geladen und zunächst als übersichtliche Kontodaten angezeigt. Über eine Funktion „Bearbeiten“ können Vorname, Nachname, E-Mail-Adresse sowie Straße und Hausnummer, Postleitzahl, Ort und Land bearbeitet werden. Erst im Bearbeitungsmodus werden die entsprechenden Eingabefelder angezeigt. Änderungen werden über `PUT /me` gespeichert. Die Adresse darf leer bleiben. Nicht gespeicherte Adressfelder werden nicht als fehlende Angaben oder Platzhalter dargestellt.

**11.3 Passwort ändern**  
Der Nutzer kann sein Passwort über `PUT /me/password` ändern. Dafür müssen das aktuelle Passwort, ein neues Passwort und eine Bestätigung des neuen Passworts eingegeben werden. Die beiden neuen Passworteingaben müssen übereinstimmen. An das Backend werden nur das aktuelle und das neue Passwort gesendet. Das neue Passwort wird nur gespeichert, wenn das aktuelle Passwort korrekt ist.

**11.4 Meine Bestellungen**  
Im Benutzerkonto werden die Bestellungen des Nutzers über `GET /orders` als kompakte Übersicht angezeigt. Für jede Bestellung werden Bestellnummer, Bestelldatum, Status und Gesamtpreis angezeigt. Zu jeder Bestellung müssen die vollständigen Bestelldetails mit Produkt-, Preis-, Versand- und Kundendaten aufrufbar sein.

**11.5 Bestellung stornieren**  
Eigene Bestellungen mit dem Status `new` oder `processing` können über `PUT /orders/:id/cancel` storniert werden. Vor der Stornierung muss eine Bestätigung verlangt werden. Bestellungen mit dem Status `shipped`, `delivered` oder `cancelled` können nicht storniert werden. Nach erfolgreicher Stornierung wird der Status `cancelled` als „Storniert“ angezeigt. Zusätzlich muss angezeigt werden, dass der Gesamtbetrag der Bestellung auf die ursprünglich verwendete Zahlungsmethode zurückerstattet wird. Der zu erstattende Betrag entspricht dem vollständigen Gesamtpreis der Bestellung einschließlich der Versandkosten. Eine zusätzliche Zahlungs- oder Erstattungs-API ist nicht erforderlich.

**11.6 Meine Wunschliste**  
„Meine Wunschliste“ führt zur Wunschliste des eingeloggten Nutzers. Wird die Wunschliste aus dem Benutzerkonto geöffnet, muss eine direkte Möglichkeit zur Rückkehr zum Benutzerkonto vorhanden sein.

**11.7 Abmelden**  
Der Button „Abmelden“ führt den Logout über `POST /logout` aus.

**11.8 Konto löschen**
Normale Benutzer können ihr eigenes Konto im Benutzerkonto löschen. Vor dem Löschen muss eine Bestätigung verlangt werden. Das Konto wird über `DELETE /me` gelöscht. Nach erfolgreichem Löschen wird die Startseite geöffnet und der Nutzer ist nicht mehr angemeldet.
Beim Löschen des Benutzerkontos bleiben bereits aufgegebene Bestellungen erhalten. Sie können weiterhin im Adminbereich verwaltet werden, sind nach der Kontolöschung jedoch keinem Benutzerkonto mehr zugänglich.

**11.9 Keine Bestellungen**  
Sind keine Bestellungen vorhanden, wird „Du hast noch keine Bestellungen.“ angezeigt.

## 12. Checkout

**12.1 Zugriff**  
Der Checkout wird über den Button „Zur Kasse“ im Warenkorb geöffnet. Eine Bestellung ist mit und ohne Login möglich.

**12.2 Kundendaten**  
Das Formular enthält Vorname, Nachname, E-Mail-Adresse, Straße und Hausnummer, Postleitzahl, Ort und Land. Bei eingeloggten Nutzern werden Vorname, Nachname und E-Mail-Adresse sowie eine vorhandene gespeicherte Adresse aus `GET /me` vorausgefüllt. Alle Felder bleiben editierbar.

**12.3 Adresse im Benutzerkonto speichern**  
Bei eingeloggten Nutzern muss im Checkout die Option „Diese Adresse in meinem Konto speichern“ angeboten werden. Wird sie ausgewählt, wird beim Absenden der Bestellung `saveAddress: true` übermittelt und die im Checkout eingegebene Lieferadresse nach erfolgreicher Bestellung als Adresse des Benutzerkontos gespeichert. Eine bereits gespeicherte Adresse wird dabei ersetzt. Wird die Option nicht ausgewählt, bleibt der Adressstand im Benutzerkonto unverändert.

**12.4 Versandart**  
Die verfügbaren Versandarten und Versandkosten werden über `GET /shipping-options` geladen. Der Nutzer muss eine Versandart auswählen.

**12.5 Zahlung**  
Als Zahlungsmethode wird Kartenzahlung angezeigt. Das Formular enthält Kartennummer, Ablaufdatum und Sicherheitscode. Die eingegebenen Kartendaten werden nur im Frontend geprüft und weder gespeichert noch an das Backend gesendet. An das Backend wird `paymentMethod: "card"` übermittelt. 

**12.6 Bestellübersicht**  
Vor dem Absenden werden Produkte, Mengen, Einzelpreise, Zwischensumme, Versandkosten und Gesamtpreis angezeigt.

**12.7 Bestellung abschließen**  
Die Bestellung wird über `POST /orders` mit Kundendaten, Versandart, `paymentMethod`, Warenkorbartikeln und gegebenenfalls `saveAddress` gesendet. Die endgültigen Preise werden vom Backend berechnet.

**12.8 Bestellbestätigung**  
Nach erfolgreicher Bestellung wird eine Bestätigungsseite mit der vom Backend zurückgegebenen Bestellnummer und einer Zusammenfassung der Bestellung angezeigt. Das Backend leert den Warenkorb nach erfolgreichem Bestellabschluss.

**12.9 Bestellung im Benutzerkonto**  
Bei eingeloggten Nutzern muss die abgeschlossene Bestellung anschließend unter „Meine Bestellungen“ erscheinen. Gastbestellungen werden keinem Benutzerkonto zugeordnet.

**12.10 Eingabeprüfung**  
Alle Kundendaten im Checkout sind Pflichtfelder. Die E-Mail-Adresse muss ein gültiges Format haben. Die Test-Kartennummer muss 16 Ziffern, das Ablaufdatum das Format `MM/YY` und der Sicherheitscode 3 Ziffern haben. Die Bestellung kann erst nach gültiger Eingabe und Auswahl einer Versandart abgesendet werden.

## 13. Kontakt

**13.1 Kontaktseite**  
Die Kontaktseite muss über den Navigationspunkt „Kontakt“ erreichbar sein.

**13.2 Kontaktformular**  
Das Formular enthält Name, E-Mail-Adresse, Betreff und Nachricht. Bei eingeloggten Nutzern werden Name und E-Mail-Adresse aus `GET /me` vorausgefüllt. Die Felder bleiben editierbar.

**13.3 Eingabeprüfung**  
Alle Felder sind Pflichtfelder. Die E-Mail-Adresse muss ein gültiges Format haben.

**13.4 Nachricht senden**  
Das Formular wird über `POST /contact` gesendet.

**13.5 Bestätigung**  
Nach erfolgreichem Senden wird „Vielen Dank für deine Nachricht.“ angezeigt und das Formular geleert.

**13.6 Social Media**  
Auf der Kontaktseite müssen Links zu Instagram und Facebook angezeigt werden.

Instagram: `https://www.instagram.com/rainbow.georgiandesign?stkn=dGE4M3drcmIxYndu`  
Facebook: `https://www.facebook.com/rainbow.georgiandesign`

## 14. Adminbereich

**14.1 Zugriff**  
Der Adminbereich ist nur für angemeldete Benutzer mit der Rolle `admin` oder `main_admin` zugänglich.

**14.2 Anmeldung**
Die Anmeldung erfolgt über den vorhandenen Login. Nach erfolgreicher Anmeldung eines Administrators wird ausschließlich der Adminbereich geöffnet.

**14.3 Admin-Oberfläche**
Der Adminbereich ist eine eigenständige Oberfläche. Er enthält nur die Bereiche „Produkte“, „Benutzer“, „Bestellungen“, „Administratoren“ und „Abmelden“. Shop-Navigation, Shop-Footer und Funktionen der normalen Benutzeroberfläche werden nicht angezeigt.

**14.4 Produkte anzeigen**
Im Bereich „Produkte“ werden alle Produkte aus `GET /products` angezeigt. Für jedes Produkt muss eine Bearbeitungsfunktion vorhanden sein.

**14.5 Produkte bearbeiten**
Der Administrator kann Produktname, Beschreibung und Preis bearbeiten. Bei Kinderprodukten können die Preise aus `pricesBySize` bearbeitet werden.

**14.6 Produktänderungen speichern**
Produktänderungen werden über `PUT /products/:id` gespeichert. Nach erfolgreichem Speichern müssen die aktualisierten Produktdaten angezeigt werden.

**14.7 Benutzer anzeigen**
Im Bereich „Benutzer“ werden die registrierten Benutzer mit der Rolle `user` über `GET /users` angezeigt. Angezeigt werden Vorname, Nachname, E-Mail-Adresse, gespeicherte Adresse und die zugehörigen Bestellungen. Die Benutzerdaten können im Adminbereich nicht bearbeitet oder gelöscht werden.
Sind keine normalen Benutzer registriert, wird ein entsprechender Hinweis angezeigt.

**14.8 Bestellungen eines Benutzers**  
Bei jedem Benutzer werden dessen bisherige Bestellungen anhand der `userId` zugeordnet. Angezeigt werden Bestellnummer, Bestelldatum, Gesamtpreis und Status. Zu jeder Bestellung müssen die zugehörigen Bestelldetails aufrufbar sein. Hat ein Benutzer keine Bestellungen, wird im Adminbereich ein neutraler Hinweis angezeigt, dass für diesen Benutzer keine Bestellungen vorhanden sind.

**14.9 Bestellungen anzeigen**
Im Bereich „Bestellungen“ werden alle Bestellungen über `GET /orders` geladen und mit der neuesten Bestellung zuerst angezeigt. Angezeigt werden Bestellnummer, Bestelldatum, Kunde, Gesamtpreis und Status. Sind keine Bestellungen vorhanden, wird im Adminbereich ein entsprechender Hinweis angezeigt.

**14.10 Bestelldetails**
Für jede Bestellung werden alle für die Bestellung relevanten Produkt-, Preis-, Versand- und Kundendaten angezeigt. Dazu gehören auch Farbe, Größe, Menge, die vollständige Konfiguration von Produkten aus „Dein Design“, Versandart, Versandkosten, Zahlungsmethode sowie die vollständige Lieferadresse. Bei Gastbestellungen werden die im Checkout angegebenen Kundendaten verwendet. 
Die Bestelldetails bleiben Teil des Adminbereichs. Die Admin-Navigation und der Kontext des Adminbereichs müssen erhalten bleiben. Kundenbezogene Formulierungen wie „Deine Bestellung“ dürfen in dieser Ansicht nicht verwendet werden. Bei Bestellungen registrierter Benutzer muss erkennbar sein, welchem Benutzer die Bestellung zugeordnet ist.

**14.11 Bestellstatus**  
Der Administrator kann bei einer nicht stornierten Bestellung ausschließlich den Bestellstatus ändern. Über `PUT /orders/:id/status` können die Status `new`, `processing`, `shipped` und `delivered` gesetzt werden, die in der Oberfläche als „Bestätigt“, „In Bearbeitung“, „Versendet“ und „Zugestellt“ angezeigt werden. Der Status `cancelled` wird als „Storniert“ angezeigt. Eine stornierte Bestellung kann im Adminbereich nicht mehr auf einen anderen Status gesetzt werden.

**14.12 Administratoren verwalten**  
Im Bereich „Administratoren“ werden alle Administratoren über `GET /admins` angezeigt. Der Hauptadministrator (`main_admin`) wird immer zuerst angezeigt. Danach folgen die normalen Administratoren (`admin`) in der Reihenfolge ihrer Erstellung.

Der Hauptadministrator kann über `POST /admins` neue Administratoren anlegen sowie andere Administratoren über `PUT /admins/:id` bearbeiten und über `DELETE /admins/:id` löschen. Neue Administratoren erhalten immer die Rolle `admin`. Das eigene Administratorkonto darf nicht gelöscht werden.

Normale Administratoren besitzen dieselben Verwaltungsrechte für Produkte, Benutzer und Bestellungen wie der Hauptadministrator. Sie können alle Administratoren sehen, dürfen jedoch keine anderen Administratoren anlegen, bearbeiten oder löschen.

Jeder Administrator kann seine eigenen persönlichen Daten bearbeiten und sein eigenes Passwort über `PUT /me/password` ändern. Ein normaler Administrator darf über `PUT /admins/:id` nur sein eigenes Administratorkonto bearbeiten.

**14.13 Neuen Administrator anlegen**  
Zum Anlegen eines Administrators werden Vorname, Nachname, E-Mail-Adresse und Passwort eingegeben. Alle Felder sind Pflichtfelder. Die E-Mail-Adresse muss gültig sein. Ist sie bereits registriert, wird die vom Backend zurückgegebene Fehlermeldung angezeigt.

## 15. Fehler und Sonderfälle

**15.1 Ladezustand**  
Während Daten vom Backend geladen werden, muss ein sichtbarer Ladehinweis angezeigt werden.

**15.2 API-Fehler**  
Können Daten nicht vom Backend geladen oder gespeichert werden, muss eine verständliche Fehlermeldung angezeigt werden.

**15.3 Nicht vorhandene Seite**  
Bei einer ungültigen URL oder einem nicht vorhandenen Produkt muss eine 404-Seite mit einem Link zur Startseite angezeigt werden.

**15.4 Statusmeldungen**  
Erfolgsmeldungen und andere temporäre Hinweise müssen nach kurzer Zeit automatisch verschwinden und können zusätzlich manuell geschlossen werden. Sie dürfen nach einem Seitenwechsel nicht weiterhin angezeigt werden.

**15.5 Technische Hinweise**  
Technische Hinweise aus den Anforderungen, die nur der Umsetzung dienen, dürfen nicht als sichtbare Texte in der Benutzeroberfläche erscheinen.

**15.6 Formularvalidierung**  
Fehlende oder ungültige Eingaben müssen am jeweiligen Formular verständlich gekennzeichnet werden. Fehlermeldungen dürfen erst nach einem Absendeversuch oder nach Bearbeitung des betroffenen Feldes angezeigt werden.

## 16. Daten und Backend-Anbindung

**16.1 Backend-Adresse**  
Das Frontend verwendet die REST-API unter `http://localhost:3000`.

**16.2 Sessions**  
API-Anfragen müssen Session-Cookies mitsenden. Bei `fetch` wird dafür `credentials: "include"` verwendet.

**16.3 Asset-Pfade**  
Pfade mit `/assets/...` beziehen sich auf das Backend unter `http://localhost:3000`. Ein Pfad wie `/assets/logo.svg` wird deshalb als `http://localhost:3000/assets/logo.svg` geladen. Dasselbe gilt für Bildpfade aus `imagesByColor` und `GET /designs`.

**16.4 API-Endpunkte**  
Verwendet werden `GET /products`, `GET /products/:id`, `PUT /products/:id`, `GET /custom-colors`, `GET /designs`, `POST /register`, `POST /login`, `GET /me`, `PUT /me`, `PUT /me/password`, `DELETE /me`, `POST /logout`, `GET /users`, `GET /admins`, `POST /admins`, `PUT /admins/:id`, `DELETE /admins/:id`, `GET /wishlist`, `POST /wishlist`, `DELETE /wishlist/:itemId`, `GET /cart`, `POST /cart`, `PUT /cart/:itemId`, `DELETE /cart/:itemId`, `GET /shipping-options`, `POST /orders`, `GET /orders`, `PUT /orders/:id/cancel`, `PUT /orders/:id/status` und `POST /contact`.

**16.5 Backend-Daten**  
Produktdaten, Preise, Größen, Farben, Produktbilder, Designkataloge, Benutzerdaten einschließlich gespeicherter Adressen, Benutzerrollen, Versandarten, Wunschlisten, Warenkörbe, Bestellungen und Bestellstatus werden über die vorgesehenen API-Endpunkte geladen oder gespeichert und nicht im Frontend dupliziert.

**16.6 Kategorien und Unterkategorien**  
Die API-Werte werden in der Oberfläche deutsch dargestellt: `women` = Damen, `men` = Herren, `kids` = Kinder, `dogs` = Hunde, `girls` = Mädchen, `boys` = Jungen.

**16.7 Farben**  
Die Farbcodes werden in der Oberfläche deutsch dargestellt: `black` = Schwarz, `red` = Rot, `blue` = Blau, `aquablue` = Aquablau, `turquoise` = Türkis, `pink` = Rosa, `yellow` = Gelb, `plum` = Pflaume, `green` = Grün, `grey` = Grau, `magenta` = Magenta, `beige` = Beige, `brown` = Braun, `orange` = Orange, `silver` = Silber.

**16.8 Kindergrößen**  
Die API-Werte `2-3`, `4-7` und `8-12` werden als „2–3 Jahre“, „4–7 Jahre“ und „8–12 Jahre“ angezeigt.

**16.9 Bestellstatus**  
Die API-Werte werden in der Oberfläche deutsch dargestellt: `new` = Bestätigt, `processing` = In Bearbeitung, `shipped` = Versendet, `delivered` = Zugestellt und `cancelled` = Storniert.

**16.10 Benutzerrollen**  
Die API-Werte für Benutzerrollen werden in der Oberfläche deutsch dargestellt: `user` = Benutzer, `admin` = Administrator und `main_admin` = Hauptadministrator.

## 17. Bilder und Assets

**17.1 Bereitgestellte Bilder**  
Es dürfen ausschließlich die vom Backend unter `/assets/` bereitgestellten Bilder verwendet werden. Externe, generierte und Platzhalterbilder sind nicht erlaubt.

**17.2 Asset-Struktur**  
Dateinamen und Ordnerstruktur der bereitgestellten Assets dürfen nicht verändert werden.

## 18. Darstellung und Bedienbarkeit

**18.1 Responsive Darstellung**  
Die Anwendung muss auf Desktop, Tablet und Smartphone ohne horizontales Scrollen nutzbar sein. Inhalte und Bedienelemente dürfen sich nicht überlagern, abgeschnitten werden oder außerhalb ihres vorgesehenen Bereichs liegen.

**18.2 Einheitliches Erscheinungsbild**  
Navigation, Buttons, Formulare, Produktkarten, Bildbereiche, Abstände und Schriftgestaltung müssen in der gesamten Anwendung visuell konsistent sein. Gleichartige Elemente innerhalb desselben Bereichs müssen einheitlich und ausgewogen dargestellt werden.

**18.3 Lesbarkeit**  
Texte und Bedienelemente müssen gut lesbar sein. Text auf Bildern muss einen ausreichenden Kontrast zum Hintergrund haben.

**18.4 Tastaturbedienung**  
Links, Buttons, Formulare und andere interaktive Elemente müssen per Tastatur bedienbar sein. Der aktuell fokussierte Bereich muss sichtbar erkennbar sein.

**18.5 Formulare**  
Jedes Eingabefeld muss eine eindeutige sichtbare Beschriftung haben.
 
**18.6 Bilddarstellung**  
Bilder müssen proportional skaliert und sinnvoll an den vorgesehenen Darstellungsbereich angepasst werden. Personen, Produkte und andere wesentliche Bildinhalte sollen vollständig oder möglichst vollständig sichtbar bleiben und dürfen nicht unangemessen abgeschnitten werden. Der Bildausschnitt muss auf unterschiedlichen Bildschirmgrößen sinnvoll dargestellt werden.

**18.7 Auswahlzustände**  
Bei auswählbaren Optionen muss die aktuell ausgewählte Option visuell eindeutig erkennbar sein.

**18.8 Bedienelementzustände**  
Aktive, ausgewählte und deaktivierte Bedienelemente müssen für den Nutzer visuell eindeutig erkennbar sein.

**18.9 Eingabefelder und Symbole**  
Eingabefelder müssen so gestaltet sein, dass eingegebener Text und Platzhalter vollständig sichtbar und gut lesbar sind. Symbole innerhalb eines Eingabefeldes dürfen den Text nicht überlagern.

**18.10 Navigation und Seitenstruktur**  
Unnötige zusätzliche Navigationsebenen sollen vermieden werden. Zusammengehörige Inhalte sollen möglichst direkt erreichbar sein, ohne dass Nutzer mehrere Zwischenseiten durchlaufen müssen.