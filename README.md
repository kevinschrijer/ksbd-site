# Bid Planner

Eenvoudige lokale planner voor een zelfstandig bid consultant.

## Wat deze tool doet

- projecten tonen op een visuele tijdlijn
- per project startdatum, einddatum, status en uren per week vastleggen
- deliverables per regel toevoegen
- Excel-planningen in `.xlsx` uploaden om deliverables en overlegmomenten automatisch over te nemen
- snel zien hoeveel capaciteit deze week al ingepland is
- gegevens lokaal in de browser bewaren via `localStorage`

## Gebruik

1. Open [index.html](/Users/kevinschrijer/Documents/New%20project/index.html) in je browser.
2. Voeg projecten toe via het formulier links.
3. Voeg handmatig regels toe of upload een planning via `Upload planning`.
4. Gebruik `Voorbeelddata laden` om eerst even te zien hoe het werkt.

## Opmerking

Dit is bewust dependency-vrij gebouwd, zodat je geen abonnement of installatie nodig hebt.

De Excel-import is afgestemd op de twee formats die je hebt gedeeld:

- een tabel met `Wie verantwoordelijk`, `Wat`, `Deadline / tijdstip`
- een planning met `TAAK`, `START`, `EINDE`
