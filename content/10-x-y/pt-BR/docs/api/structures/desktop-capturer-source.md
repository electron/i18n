# DesktopCapturerSource Object

* `id` String - O identificador de uma janela ou tela que pode ser utilizado como limitação `chromeMediaSourceId` quando chamado [`navigator.webkitGetUserMedia`]. O formato do identificador será `window:XX` ou `screen:XX`, onde `XX` é um número gerado aleatoriamente.
* `name` String - Uma janela será nomeada ou `Entire Screen` ou `Screen<index>`, onde o nome de uma janela será de acordo com o título da janela.
* `thumbnail` [NativeImage](../native-image.md) - Uma imagem em miniatura. **Notas:** Não há garantias de que o tamanho da miniatura é o mesmo de `thumbnailSize` especificado nas `options` passados por `desktopCapturer.getSources`. O tamanho real depende da escala da tela ou da janela.
* `display_id` String - Um identificador único que corresponderá ao `id` do [display](display.md) retornado pela [Screen API](../screen.md). Em algumas plataformas, isso é equivalente a `xx` porção do campo do `id` acima, e em outras será diferente. Será uma string vazia se não estiver disponível.
* `appIcon` [NativeImage](../native-image.md) - Uma imagem de ícone do aplicativo que tenha uma janela ou nulo se a origem tiver um tipo de tela. O tamanho do ícone não é conhecido antecipadamente e depende do que o aplicativo fornece.
