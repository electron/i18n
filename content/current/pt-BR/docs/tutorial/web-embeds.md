# Incorporações da Web no Electron

Se você deseja incorporar conteúdo web (de terceiros) em um aplicativo Electron `BrowserWindow`, existem três opções disponíveis: `<iframe>`, `<webview>` e `BrowserViews`. Cada uma oferece funcionalidade ligeiramente distinta e é útil em diferentes situações. Para ajudar você a escolher entre elas, este guia explicará as distinções e recursos de cada uma.

## Iframes

Iframes no Electron se comportam como em navegadores regulares. Um elemento `<iframe>` em sua página pode mostrar páginas Web externas, desde que a [ Política de Segurança de Conteúdo](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) permita. Para limitar a quantidade de recursos de um site em uma tag `<iframe>` é recomendável usar o [atributo `sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) e permitir apenas os recursos que deseja oferecer suporte.

## WebViews

[WebViews](../api/webview-tag.md) baseiam-se nos WebViews do Chromium e não são explicitamente suportados pela Electron. Não garantimos que a API WebView permaneça disponível em versões futuras do Electron. É por isso que, se você quiser usar as tags `<webview>`, precisará definir `webviewTag` como `true ` nas `WebPreferences` dos seus `BrowserWindow`.

WebViews são um elementos personalizados (`<webview>`) que funcionará apenas dentro do Electron. Eles são implementados como um "iframe fora de processo". Isso significa que toda a comunicação com o `<webview>` é feita de forma assíncrona usando IPC. O elemento `<webview>` possui vários métodos e eventos personalizados, semelhantes ao `webContents`, que permitem um controle maior sobre o conteúdo.

Comparado a um `<iframe>`, `<webview>` tende a ser um pouco mais lento, no entanto oferece um controle maior no carregamento e na comunicação com o conteúdo de terceiros e no manuseio de vários eventos.

## BrowserViews

[BrowserViews](../api/browser-view.md) não fazem parte do DOM - em vez disso, são criados e controlados pelo seu processo principal. Fazem parte de outra camada de conteúdo Web acima da sua janela existente. Isso significa que eles são completamente separados do seu conteúdo ` BrowserWindow ` e que sua posição não é controlada pelo DOM ou CSS, mas definindo os limites no processo principal.

As BrowserViews oferecem o maior controle sobre seu conteúdo, uma vez que implementam o `webContents` da mesma forma que um `BrowserWindow` o implementa. No entanto, eles não fazem parte do seu DOM, mas são sobrepostos em cima deles, o que significa que você precisará gerenciar a posição deles manualmente.
