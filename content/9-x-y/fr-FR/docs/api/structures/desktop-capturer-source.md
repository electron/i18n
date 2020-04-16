# Objet DesktopCapturerSource

* `id` String - L'identifiant d'une fenêtre ou un d'un écran qui peut être utilisé comme contrainte `chromeMediaSourceId` lors de l'appel à [`navigator.webkitGetUserMedia`]. Le format de l'identifiant sera `window:XX` ou `screen:XX`, où `XX` est un nombre généré aléatoirement.
* `name` String - Une source d'écran sera appelée soit `Entire Screen` soit `Screen <index>`, tandis que le nom d'une source fenêtre correspondra au titre de la fenêtre.
* `thumbnail` [NativeImage](../native-image.md) - Une miniature. **Remarque :** Il n’y a aucune garantie que la taille de la miniature soit identique à la `thumbnailSize` spécifiée dans les `options` passées à `desktopCapturer.getSources`. La taille réelle dépend de l’échelle de l’écran ou de la fenêtre.
* `display_id` String - Un identifiant unique qui va correspondre à l' `id` du [Display](display.md) correspondant retourné par l'[API Screen](../screen.md). Sur certaines plateformes, c'est l'équivalent de la portion `XX` du champ `id` ci-dessus, et il différera sur d'autres. Ce sera une chaîne de caractères vide si non disponible.
* `appIcon` [NativeImage](../native-image.md) - Un icône de l'application qui possède la fenêtre ou qui est nul si la source a un écran type. La taille de l'icône n'est pas connue à l'avance et dépend de ce que fournit l'application.
