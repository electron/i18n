# Webové vložení do Electronu

Pokud chcete vložit (třetí stranu) webový obsah do Electron `BrowserWindow`, jsou vám k dispozici tři možnosti: `<iframe>` tagy, `<webview>` tagy a `Prohlížeče`. Každý z nich nabízí mírně odlišné funkce a je užitečný v různých situacích. Abyste vám pomohli vybrat mezi nimi, tato příručka vysvětlí rozdíly a možnosti každého z nich.

## Ilomy

Isnímky v Electronu se chovají jako iframy v běžných prohlížečích. Prvek `<iframe>` na vaší stránce může zobrazit externí webové stránky za předpokladu, že to umožňuje jejich [Zásady zabezpečení obsahu](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). To limit the amount of capabilities a site in an `<iframe>` tag, it's recommended to use the [`sandbox` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) and only allow the capabilities you want to support.

## WebViews

[WebViews](../api/webview-tag.md) jsou založeny na WebViews Chromia a nejsou Electronem výslovně podporovány. Nezaručujeme, že WebView API zůstane k dispozici v budoucích verzích Electronu. Proto, pokud chcete použít značky `<webview>` , musíte nastavit `webviewTag` na `true` v nastavení `webPreferences` vašeho `BrowserWindow`.

Webová zobrazení jsou vlastním prvkem (`<webview>`), který bude fungovat pouze uvnitř Electronu. Jsou prováděny jako "mimoprocesní iframe". To znamená, že veškerá komunikace s `<webview>` probíhá asynchronně pomocí IPC. Prvek `<webview>` má mnoho vlastních metod a událostí, podobně jako `webContent`, který vám umožňuje mnohem větší kontrolu nad obsahem.

Ve srovnání s `<iframe>` `<webview>` má tendenci být poněkud pomalejší, ale nabízí mnohem větší kontrolu při načítání a komunikaci s obsahem třetích stran a zvládání různých událostí.

## Zobrazení prohlížeče

[BrowserViews](../api/browser-view.md) nejsou součástí DOM - místo toho jsou vytvořeny a řízeny vaším hlavním procesem. Jsou pouze další vrstvou webového obsahu nad vaším existujícím oknem. To znamená, že jsou zcela oddělené od vašeho obsahu `BrowserWindow` a že jejich pozice není řízena DOM nebo CSS, ale nastavením mezí v hlavním procesu.

BrowserViews nabízí největší kontrolu nad svým obsahem, protože implementují `webový obsah` , podobně jako jak jej `BrowserWindow` implementuje. Nejsou však součástí vašeho DOM, ale jsou překryty, což znamená, že budete muset svou pozici spravovat ručně.
