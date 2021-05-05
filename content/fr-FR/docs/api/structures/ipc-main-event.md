# Object IpcMainInvokeEvent hérite de `Event`

* `processId` Integer - L'ID interne du processus de rendu qui a envoyé ce message
* frameId Integer - L'ID du cadre de rendu qui a envoyé ce message
* `returnValue` any - Attribuez la valeur à retourner dans un message synchronisé
* `sender` WebContents - Retourne le `webContents`qui a envoyé le message
* `senderFrame` WebFrameMain _Lecture seule_ - Le cadre qui a envoyé ce message
* `ports` MessagePortMain[] - Une liste de MessagePorts transférés avec ce message
* `reply` Function - Fonction qui enverra un message IPC au cadre du rendu à l'origine du message que vous êtes en train de traiter.  Vous devez utiliser cette méthode pour "répondre" au message envoyé afin de garantir que la réponse ira aux bons processus et fenêtre.
  * `channel` String
  * `...args` any[]
