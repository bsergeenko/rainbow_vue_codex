# Rainbow.design

Frontend mit Vue 3, JavaScript und Vue Router. Vite dient als Entwicklungs- und Build-Werkzeug. Es werden keine UI- oder Komponentenframeworks verwendet.

## Starten

Das vorhandene Backend muss unter `http://localhost:3000` laufen.

```sh
npm install
npm run dev
```

Das Frontend ist unter `http://localhost:5173` erreichbar. API-Anfragen senden Session-Cookies mit. Alle Bilder werden vom Backend geladen.

## Technische Prüfungen

```sh
npm run build
npm test
npm run test:e2e
```

Die Browserprüfungen verwenden lokal installiertes Google Chrome. Sie lesen den aktuellen Produkt- und Motivkatalog vom laufenden Backend; Schreibzugriffe und Benutzersitzungen werden im Browser simuliert. Vorhandene Backend-Daten werden durch die Tests nicht verändert.

Für eine Vorschau des Produktionsbuilds: `npm run preview`. Beim Bereitstellen muss der Webserver unbekannte Frontend-Pfade auf `index.html` weiterleiten, damit direkte Seitenaufrufe mit Vue Router funktionieren.
