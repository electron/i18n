# Object IpcMainInvokeEvent hérite de `Event`

* frameId Integer - L'ID du cadre de rendu qui a envoyé ce message
* `returnValue` any - Définissez ceci à la valeur à retourner dans un message synchronisé
* sender WebContents - Renvoie les contenus Web qui ont envoyé le message
* reply Function - Fonction qui enverra un message IPC au cadre du rendu qui a envoyé le message d'origine que vous êtes en train de traiter.  Vous devez utiliser cette méthode pour "répondre" au message envoyé afin de garantir que la réponse ira aux bons processus et fenêtre.
  * `...args` any[]
