# IpcMainEvent Object extends `Event`

* frameId Integer - L'ID du cadre de rendu qui a envoyé ce message
* return Value any - Définit la valeur à renvoyer dans un message synchrone
* sender WebContents - Renvoie les contenus Web qui ont envoyé le message
* reply Function - Fonction qui enverra un message IPC au cadre du rendu qui a envoyé le message d'origine que vous êtes en train de traiter.  Vous devez utiliser cette méthode pour "répondre" au message envoyé afin de garantir que la réponse ira au processus et au cadre corrects.
  * ... args n'importe quel [] IpcRenderer
