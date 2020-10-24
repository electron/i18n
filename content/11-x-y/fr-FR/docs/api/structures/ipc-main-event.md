# Object IpcMainInvokeEvent hérite de `Event`

* frameId Integer - L'ID du cadre de rendu qui a envoyé ce message
* `returnValue` any - Attribuez la valeur à retourner dans un message synchronisé
* `sender` WebContents - Retourne le `webContents`qui a envoyé le message
* `ports` MessagePortMain[] - A list of MessagePorts that were transferred with this message
* `reply` Function - Fonction qui enverra un message IPC au cadre du rendu à l'origine du message que vous êtes en train de traiter.  Vous devez utiliser cette méthode pour "répondre" au message envoyé afin de garantir que la réponse ira aux bons processus et fenêtre.
  * `channel` String
  * `...args` any[]
