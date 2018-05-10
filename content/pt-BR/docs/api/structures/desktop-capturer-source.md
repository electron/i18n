# DesktopCapturerSource Object

* `id` String - O identificador de uma janela ou tela que pode ser utilizado como limitação `chromeMediaSourceId` quando chamado [`navigator.webkitGetUserMedia`]. O formato do identificador será `window:XX` ou `screen:XX`, onde `XX` é um número gerado aleatoriamente.
* `name` String - Uma janela será nomeada ou `Entire Screen` ou `Screen<index>`, onde o nome de uma janela será de acordo com o título da janela.
* `thumbnail` [NativeImage](../native-image.md) - Uma imagem em miniatura. **Notas:** Não é garantias de que o tamanho da miniatura é o mesmo de `thumbnailSize` especificado nas `options` passados por `desktopCapturer.getSources`. O tamanho real depende da escala da tela ou da janela.