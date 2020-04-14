# IpcMainEvent Object extends `Event`

* frameId Integer - L'ID du cadre de rendu qui a envoyé ce message
* `returnValue` any - Set this to the value to be returned in a synchronous message
* sender WebContents - Renvoie les contenus Web qui ont envoyé le message
* reply Function - Fonction qui enverra un message IPC au cadre du rendu qui a envoyé le message d'origine que vous êtes en train de traiter.  You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame.
  * `...args` any[]
