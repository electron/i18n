# Intégration de contenu web

## Vue d'ensemble

Pour intégrer du contenu web (tiers) dans une `BrowserWindow d'Electron` vous disposez des trois options suivantes: soit les balises `<iframe>` ou `<webview>` soit en utilisant les `BrowserViews`. Chacune offre des fonctionnalités légèrement différentes et utile dans des situations différentes. Pour vous aider dans votre choix, ce guide explique les différences et les capacités de chaque option.

### Iframes

Les iframes d'Electron se comportent comme des iframes dans les navigateurs ordinaires. Un élément `<iframe>` dans votre page peut afficher des pages web externes, à condition que leur [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) le permette. Pour limiter les fonctionnalités d’un site dans une balise `<iframe>` , il est recommandé d’utiliser[ l’attribut `sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) et d’autoriser uniquement les fonctionnalités que vous souhaitez prendre en charge.

### WebViews

> Note importante : [nous vous déconseillons d'utiliser WebViews](../api/webview-tag.md#warning), car cette balise subit des changements architecturaux dramatiques qui peuvent affecter la stabilité de votre application. Envisagez de basculer vers les alternatives,`iframe` ,  Electron's `BrowserView` ou une architecture évitant par sa conception d'embarquer du contenu.

[Les WebViews](../api/webview-tag.md) sont basées sur les WebViews de Chromium et ne sont pas explicitement supportés par Electron. Nous ne garantissons pas que l'API WebView restera disponible dans les futures versions d'Electron. Pour utiliser les balises `<webview>` , vous devrez définir `webviewTag` à `true` dans les `webPreferences` de votre `BrowserWindow`.

WebView est un élément personnalisé (`<webview>`) qui ne fonctionnera qu'à l'intérieur d'Electron. Ils sont mis en œuvre en tant que "cadre hors processus". Cela signifie que toute la communication avec la `<webview>` est faite de manière asynchrone en utilisant IPC. L'élément `<webview>` possède de nombreuses méthodes et événements personnalisés, similaire à `webContents`, qui vous donnent un grand contrôle sur le contenu.

Comparé à un `<iframe>`, `<webview>` tend à être légèrement plus lent, mais offre un contrôle beaucoup plus important dans le chargement et la communication avec le contenu tiers et la gestion de divers événements.

### Vues du navigateur

[Les BrowserViews](../api/browser-view.md) sont créés et pilotés par votre processus principal et ne font pas partie du DOM . Ils sont simplement une couche supplémentaire de contenu web au dessus de votre fenêtre existante. Cela signifie qu'ils sont complètement séparés du contenu de votre `BrowserWindow` et leur position n'est contrôlée ni par le DOM ni par le CSS. Au lieu de cela, elle est contrôlée en définissant les limites dans le processus principal.

`BrowserViews` offre le meilleur contrôle sur leur contenu, car ils implémentent le `webContents` de la même façon que la `BrowserWindow`. Cependant, comme les `BrowserViews` ne font pas partie de votre DOM étant plutôt superposés par dessus , vous devrez gérer leur position manuellement.
