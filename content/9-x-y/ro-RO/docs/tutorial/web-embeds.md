# Încorporări web în Electron

Dacă vrei să încorporezi conținut web (în partea terță) într-o fereastră Electron `BrowserWin`, aveți la dispoziție trei opțiuni: `<iframe>` etichete, `<webview>` etichete, și `BrowserViews`. Fiecare oferă funcționalitate ușor diferită și este utilă în diferite situații. Pentru a vă ajuta să alegeți între acestea, acest ghid va explica diferențele și capacitățile fiecăruia.

## Iframe

Iframe-urile din Electron se comportă ca iframe-urile în browserele obișnuite. Un element `<iframe>` din pagina ta poate afișa pagini web externe, cu condiția ca [Politica de Securitate a Conținutului](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) să o permită. Pentru a limita numărul de capabilități un site într-un tag `<iframe>` , este recomandat să utilizați atributul [`de tip sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) și să permiteți doar capacitățile pe care doriți să le susținuți.

## WebViews

[WebViews](../api/webview-tag.md) sunt bazate pe WebViews din Chromium și nu sunt acceptate în mod explicit de Electron. Nu garantăm că API-ul WebView va rămâne disponibil în versiunile viitoare ale Electron. De aceea, dacă doriţi să utilizaţi etichetele `<webview>` , va trebui să setați `webviewTag` ca `adevărat` în `Preferințe web` din `BrowserWindow`.

WebViews sunt un element personalizat (`<webview>`) care va funcţiona doar în Electron. Acestea sunt puse în aplicare ca un „cadru de neproces”. Asta înseamnă că toată comunicarea cu `<webview>` este făcută asincron folosind IPC. Elementul `<webview>` are multe metode şi evenimente personalizate, similar cu `webContent`, care vă permite un control mult mai mare asupra conținutului.

Comparativ cu un `<iframe>`, `<webview>` tinde să fie uşor mai lent, dar oferă un control mult mai mare asupra încărcării şi comunicării cu partea terţă a conţinutului şi a manipulării diferitelor evenimente.

## Vizualizări browser

[BrowserViews](../api/browser-view.md) nu fac parte din DOM - în schimb, sunt create și controlate de procesul principal. Acestea sunt doar un alt strat de conținut web de pe fereastra existentă. Asta înseamnă că sunt complet separate de conținutul tău `BrowserWindow` și că poziția lor nu este controlată de DOM sau CSS, ci prin setarea limitelor în procesul principal.

BrowserViews oferă cel mai mare control asupra conținutului lor, deoarece implementează `conținutul web` similar cu modul în care `BrowserWindow` îl implementează. Cu toate acestea, ele nu fac parte din DOM, ci sunt suprasolicitate, ceea ce înseamnă că va trebui să le gestionaţi poziţia manual.
