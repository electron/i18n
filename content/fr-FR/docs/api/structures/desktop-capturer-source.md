# Objet DesktopCapturerSource

* `id` String - L'identifiant d'une fenêtre ou un écran qui peut être utilisé comme contrainte `chromeMediaSourceId` lors de l'appel à [`navigator.webkitGetUserMedia`]. Le format de l'identifiant sera `window:XX` ou `screen:XX`, dont `XX` est un nombre aléatoire généré.
* `name` String - Une source d'écran sera appelée `Entire Screen` ou `Screen <index>`, tant que le nom de la source d'écran correspond au titre de la fenêtre.
* `thumbnail` [NativeImage](../native-image.md) - Une miniature. **Remarque :** Il n’y a aucune garantie que la taille de la miniature est identique à la `thumbnailSize` spécifiées dans les `options` passées à `desktopCapturer.getSources`. La taille réelle dépend de l’échelle de l’écran ou la fenêtre.