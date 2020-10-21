# Webembeds in Electron

Als u webinhoud wilt embedden (derde) in een Electron `BrowserWindow`, er zijn drie opties beschikbaar: `<iframe>` tags, `<webview>` tags en `BrowserViews`. Elke functie is iets anders en is in verschillende situaties nuttig. Om je te helpen te kiezen tussen deze, zal deze gids de verschillen en mogelijkheden van elk van hen uitleggen.

## Iframes

Iframes in Electron gedragen zich als iframes in reguliere browsers. Een `<iframe>` element in uw pagina kan externe webpagina's tonen, mits hun [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) dit toestaat. Om de hoeveelheid mogelijkheden van een site te beperken in een `<iframe>` tag, het wordt aanbevolen om het [`sandbox` attribuut](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) te gebruiken en alleen de mogelijkheden die je wilt ondersteunen toe te staan.

## WebViews

[WebViews](../api/webview-tag.md) zijn gebaseerd op Chromium's WebViews en worden niet expliciet ondersteund door Electron. We garanderen niet dat de WebView API beschikbaar blijft in toekomstige versies van Electron. Dit is de reden, als je `<webview>` tags wilt gebruiken, u moet `webviewTag` instellen op `waar` in de `webPreferences` van uw `Browservenster`.

WebViews zijn een aangepast element (`<webview>`) dat alleen binnen Electron werkt. Ze worden als een "achterhaald iframe" geïmplementeerd. Dit betekent dat alle communicatie met de `<webview>` asynchroon gebeurt met IPC. Het `<webview>` element heeft veel aangepaste methoden en gebeurtenissen, Vergelijkbaar met `webcontent`, waarmee u veel meer controle kunt krijgen over de inhoud.

Vergeleken met een `<iframe>`, `<webview>` is over het algemeen iets trager, maar biedt veel meer controle over het laden en communiceren met de inhoud van de derde partij en het verwerken van verschillende gebeurtenissen.

## BrowserViews

[BrowserViews](../api/browser-view.md) maken geen deel uit van het DOM - in plaats daarvan worden ze gemaakt en gecontroleerd door uw hoofdproces. Ze zijn gewoon een extra laag van webinhoud bovenop uw bestaande venster. Dit betekent dat ze volledig gescheiden zijn van je eigen `BrowserWindow` inhoud en dat hun positie niet wordt bepaald door het DOM of CSS, maar door de grenzen in het hoofdproces in te stellen.

BrowserViews bieden de grootste controle over hun inhoud, omdat ze de `webcontent` implementeren op dezelfde manier als hoe een `BrowserWindow` het implementeert. Ze maken echter geen deel uit van uw DOM maar zijn bovenop hen gezet, wat betekent dat u hun positie handmatig moet beheren.
