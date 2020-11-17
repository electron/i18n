# Incorporamenti web in Electron

Se vuoi incorporare contenuti web (di terze parti) in un `BrowserWindows` di Electron, ci sono tre opzioni disponibili per te: `<iframe>` tag, `<webview>` tag, e `BrowserViews`. Ognuno offre funzionalità lievemente differenti ed è utile in situazioni differenti. Per aiutarti a scegliere tra queste, questa guida spiegherà le differenze e le capacità di ognuno.

## Iframes

Gli Iframe in Electron si comportano come gli iframe nei broswer regulari. Un `<iframe>`elemento nella tua pagina può mostrare pagine web esterne, premesso che la loro [Politica sulla Sicurezza del Contenuto](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) lo consenta. Per limitare la quantità delle capacità un sito in un `<iframe>` tag, si consiglia di usare l'[attributo `sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) e consente solo le capacità che vuoi supportare.

## WebViews

[WebViews](../api/webview-tag.md) si basano sulle WebViews di Chromium e non sono esplicitamente supportate da Electron. Non garantiamo che le API di WebView rimarranno disponibile nelle versioni future di Electron. Questo è il motivo per cui, se vuoi usare i tag `<webview>` , dovrai impostare `webviewTag` a `true` nelle `webPreferences` della tua `BrowserWindow`.

WebViews sono un elemento personalizzato (`<webview>`) che funzionerà solo all'interno di Electron. Essi sono attuati come "iframe fuori procedura". Ciò significa che tutta la comunicazione con il `<webview>` è fatta asincronamente utilizzando IPC. L'elemento `<webview>` ha molti metodi ed eventi personalizzati, simile a `webContents`, che ti permettono un controllo molto maggiore sui contenuti.

Rispetto a un `<iframe>`, `<webview>` tende ad essere leggermente più lento, ma offre un controllo molto maggiore nel caricamento e nella comunicazione con i contenuti di terze parti e nella gestione di vari eventi.

## Visualizzazioni

[BrowserViews](../api/browser-view.md) non fanno parte del DOM - invece, sono creati e controllati dal processo principale. Sono semplicemente un altro livello di contenuto web in cima alla finestra esistente. Ciò significa che sono completamente separati dal proprio contenuto `BrowserWindow` e che la loro posizione non è controllata dal DOM o dal CSS, ma impostando i limiti nel processo principale.

BrowserViews offre il più grande controllo sui loro contenuti, poiché implementano il `contenuto web` in modo simile a come una `BrowserWindow` lo implementa. Tuttavia, non fanno parte del vostro DOM ma sono sovrapposti, il che significa che dovrete gestire la loro posizione manualmente.
