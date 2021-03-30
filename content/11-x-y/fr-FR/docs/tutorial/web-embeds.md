# Intégrer le Web dans Electron

Si vous voulez intégrer du contenu web (tiers) dans une `BrowserWindow d'Electron`, il y a trois options disponibles pour vous : `<iframe>` balises, `<webview>` balises et `BrowserViews`. Chacune offre une fonctionnalité légèrement différente et est utile dans différentes situations. Pour vous aider à choisir entre ceux-ci, ce guide vous expliquera les différences et les capacités de chacun.

## Iframes

Les iframes d'Electron se comportent comme des iframes dans les navigateurs ordinaires. Un élément `<iframe>` dans votre page peut afficher des pages Web externes, à condition que leur [Politique de sécurité de contenu](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) le permet. Pour limiter le nombre de capacités d'un site dans une balise `<iframe>` , il est recommandé d'utiliser l'attribut [`bac à sable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) et de ne permettre que les capacités que vous voulez supporter.

## WebViews

Les [WebViews](../api/webview-tag.md) sont basées sur les WebViews de Chromium et ne sont pas explicitement supportés par Electron. Nous ne garantissons pas que l'API WebView restera disponible dans les versions futures d'Electron. C'est pourquoi, si vous voulez utiliser les balises `<webview>` , vous devrez définir `webviewTag` à `true` dans les `webPreferences` de votre `BrowserWindow`.

Les WebViews sont un élément personnalisé (`<webview>`) qui ne fonctionnera qu'à l'intérieur d'Electron. Ils sont mis en œuvre en tant que "cadre hors processus". Cela signifie que toute communication avec le `<webview>` est faite de manière asynchrone en utilisant IPC. L'élément `<webview>` a de nombreuses méthodes et événements personnalisés, similaire à `webContents`, qui vous permettent un plus grand contrôle sur le contenu.

Comparé à un `<iframe>`, `<webview>` tend à être un peu plus lent, mais offre un contrôle beaucoup plus important dans le chargement et la communication avec le contenu de tiers et la gestion de divers événements.

## Vues du navigateur

[Les BrowserViews](../api/browser-view.md) ne font pas partie du DOM - à la place, ils sont créés et pilotés par votre processus principal. Elles sont simplement une couche de contenu web supplémentaire au-dessus de votre fenêtre existante. Cela signifie qu'ils sont complètement séparés de votre propre contenu `BrowserWindow` et que leur position n'est pas contrôlée par le DOM ou le CSS mais en définissant les limites dans le processus principal.

Les BrowserViews offrent le plus grand contrôle sur leur contenu, puisqu'ils implémentent les `webContents` de la même façon qu'une `BrowserWindow` l'implémentation. Cependant, ils ne font pas partie de votre DOM mais sont superposés au-dessus d'eux, ce qui signifie que vous devrez gérer leur position manuellement.
