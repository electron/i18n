# Experimentele API's

Sommige Electrons API's zijn getagd met `_Experimental_` in de documentatie. Deze tag geeft aan dat de API mogelijk niet stabiel is en de API kan worden verwijderd of vaker worden aangepast dan andere API's met minder waarschuwing.

## Voorwaarden voor het taggen van een API als Experimenteel

Iedereen kan vragen om een API te taggen als experimenteel in een functie PR, meningsverschillen over de experimentele aard van een functie kunnen worden besproken in de API WG als ze niet kunnen worden opgelost in de PR.

## Proces voor het verwijderen van de Experimentele tag

Zodra een API stabiel en in ten minste twee belangrijke stabiele releaselijsten is kan hij worden genomineerd om zijn experimentele tag te laten verwijderen.  Deze discussie moet gebeuren tijdens een API WG-vergadering.  Dingen om te bedenken bij het bespreken / voordragen:

* De voorwaarde hierboven "twee grote stallen vrijgavelijnen" moet zijn voldaan
* Gedurende die tijd hadden er geen grote bugs / problemen mogen ontstaan door de invoering van deze functie
* De API is stabiel genoeg en is niet zwaar beïnvloed door de Chromium upgrades
* Is iemand die de API gebruikt?
* Voldoet de API aan de oorspronkelijk voorgestelde useca's? Zijn er hiaten?
