# Incorporações da Web

## Visão Geral

Se você quiser incorporar (terceiros) conteúdo web em um `BrowserWindow`Electron , há três opções disponíveis para você: tags `<iframe>` , tags `<webview>` , e `BrowserViews`. Cada um oferece funcionalidade ligeiramente diferente e é útil em diferentes situações. Para ajudá-lo a escolher entre estes, este guia explica as diferenças e capacidades de cada opção.

### Iframes

Iframes no Electron se comportam como em navegadores regulares. Um elemento `<iframe>` em sua página pode mostrar páginas da Web externas, desde que sua</a> de política de segurança de conteúdo

permita. Para limitar o número de recursos de um site em uma tag `<iframe>` , é recomendável usar o [`sandbox` atributo](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) e apenas permitir os recursos que você deseja suportar.</p> 



### WebViews



> Nota importante: [não recomendamos que você use o WebViews](../api/webview-tag.md#warning), , pois esta tag sofre mudanças arquitetônicas dramáticas que podem afetar a estabilidade do seu aplicativo. Considere mudar para alternativas, como `iframe` e `BrowserView`da Electron, ou uma arquitetura que evite conteúdo incorporado pelo design.

[WebViews](../api/webview-tag.md) são baseados no WebViews do Chromium e não são explicitamente suportados pela Electron. Não garantimos que a API do WebView permanecerá disponível em versões futuras da Electron. Para usar `<webview>` tags, você precisará definir `webviewTag` para `true` no `webPreferences` de sua `BrowserWindow`.

WebView é um elemento personalizado (`<webview>`) que só funcionará dentro do Electron. Eles são implementados como um "iframe fora de processo". Isso significa que toda comunicação com o `<webview>` é feita de forma assíncronída usando o IPC. O elemento `<webview>` tem muitos métodos e eventos personalizados, semelhantes a `webContents`, que lhe proporcionam maior controle sobre o conteúdo.

Em comparação com um `<iframe>`, `<webview>` tende a ser um pouco mais lento, mas oferece controle muito maior no carregamento e comunicação com o conteúdo de terceiros e manuseio de vários eventos.



### BrowserViews

[BrowserViews](../api/browser-view.md) não fazem parte do DOM - em vez disso, eles são criados e controlados pelo seu processo Principal. Eles são simplesmente outra camada de conteúdo da Web em cima da janela existente. Isso significa que eles estão completamente separados do seu próprio conteúdo `BrowserWindow` e sua posição não é controlada pelo DOM ou CSS. Em vez disso, é controlado definindo os limites no processo Principal.

`BrowserViews` oferecem o maior controle sobre seus conteúdos, uma vez que implementar o `webContents` de forma semelhante à forma como o `BrowserWindow` faz isso. No entanto, como `BrowserViews` não fazem parte do seu DOM, mas são bastante sobrepostas em cima deles, você terá que gerenciar sua posição manualmente.
