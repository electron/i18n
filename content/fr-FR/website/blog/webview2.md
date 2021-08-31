---
title: WebView2 et Electron
author:
  - electron
date: '2021-07-22'
---

Au cours des dernières semaines, nous avons reçu plusieurs questions sur les différences entre la nouvelle [WebView2](https://docs.microsoft.com/en-us/microsoft-edge/webview2/) et Electron.

Les deux équipes ont pour but de transposer la technologie du web pour les application de Bureau de la meilleure façon possible et une comparaison faite en commun est en cours de discussion.

Electron et WebView2 sont des projets en évolution rapide et constante. Nous avons rassemblé un bref aperçu des similitudes et des différences entre Electron et WebView2 telles qu’elles existent aujourd’hui.

---

## Vue d’ensemble de l’architecture

Electron et WebView2 sont tous deux issus des source de Chromium pour le rendu du contenu Web. À proprement parler, WebView2 est généré à partir des sources de Edge, mais Edge est construit à l’aide d’un fork de Chromium. Electron ne partage aucune DLL avec Chrome. Les fichiers binaires WebView2 sont liés fortement à Edge (canal stable à compter d’Edge 90), et partagent certains éléments. Voir [le mode de distribution Evergreen](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution#evergreen-distribution-mode) pour plus d'informations.

Les applications Electron regroupent et distribuent toujours la version exacte d’Electron avec laquelle elles ont été développées. WebView2 a deux options pour la distribution. Vous pouvez soit empaqueter la même bibliothèque WebView2 utilisée pour le développement de votre application, soit utiliser une version partagée du runtime pouvant être déjà présente sur le système. WebView2 fournit des outils pour chaque approche, y compris un programme d’installation d’amorçage au cas où le runtime partagé serait manquant. WebView2 est inclus dans Windows 11.

Les applications qui incluent des frameworks sont responsables de leur mise à jour et ce même pour les versions mineures de sécurité. Pour les applications utilisant le runtime partagé WebView2, WebView2 possède son propre programme de mise à jour, similaire à Chrome ou Edge, qui s’exécute indépendamment de votre application. La mise à jour du code de l’application ou de l’une de ses dépendances est toujours une responsabilité du développeur, comme avec Electron. Electron et WebView2 ne sont pas gérés par Windows Update.

Electron et WebView2 héritent tous deux de l’architecture multi-processus de Chromium - à savoir, un processus principal unique qui communique avec un ou plusieurs processus de rendu. Ces processus sont entièrement séparés des autres applications exécutées sur le système. Chaque application Electron est une arborescence de processus séparée qui contient un processus de navigation racine, des processus utilitaires et éventuellement d'autres processus de rendu. Les applications WebView2 qui utilisent le même [dossier de données utilisateur](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/user-data-folder) (comme le ferait une suite d’applications), partagent les processus qui ne concernent pas le rendu. Les applications WebView2 utilisant différents dossiers de données ne partagent pas de processus.

* Modèle des processus d'Electron:

    ![Modèle des processus d'Electron](/images/Electron-Architecture.png)
* Modèle de processus des applications basées sur WebView2 :

    ![Schéma du modèle du processus WebView2](/images/WebView2-Architecture.png)

Pour en savoir plus sur le modèle de processus de [WebView2,](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/process-model) et sur le modèle de processus d' [Electron,](https://www.electronjs.org/docs/tutorial/process-model) cliquez ici.

Electron fournit des API pour les besoins courants des applications de bureau telles que les menus, l'accès au système de fichiers, les notifications et plus encore. WebView2 est un composant destiné à être intégré dans un framework d'application tel que WinForms, WPF, WinUI ou Win32. WebView2 ne fournit pas d'API vers le système d'exploitation en dehors de la norme web via JavaScript.

Node.js est intégré dans Electron. Les applications Electron peuvent utiliser n'importe quelle API Node.js, module ou node-native-addon depuis le moteur de rendu et les processus principaux. Une application WebView2 ne suppose pas dans quel langage ou infrastructure le reste de votre application est écrit. Votre code JavaScript doit transmettre par proxy tout accès au système d’exploitation via le processus application-hôte.

Electron s'efforce de maintenir la compatibilité avec l'API web, y compris les API développées à partir du [Projet Fugu](https://fugu-tracker.web.app/). Nous avons un aperçu [de la compatibilité de l’API Fugu d’Electron](https://docs.google.com/spreadsheets/d/1APQalp8HCa-lXVOqyul369G-wjM2RcojMujgi67YaoE/edit?usp=sharing). WebView2 maintient une liste similaire de [différences d'API par rapport à Edge](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/browser-features).

Electron a un modèle de sécurité configurable pour le contenu web, de l'accès complet au bac à sable. Le contenu WebView2 est toujours en bac à sable. Electron a [une documentation de sécurité complète](https://www.electronjs.org/docs/tutorial/security) sur le choix de votre modèle de sécurité. WebView2 dispose également de : [les meilleures pratiques de sécurité](https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/security).

Les sources d'Electron sont maintenues et disponibles sur GitHub. Les applications peuvent modifier et leurs propres _version_ d'Electron. Les sources de WebView2 ne sont pas disponibles sur GitHub.

Résumé rapide:

|                                         |        Electron |                   WebView2 |
| --------------------------------------- | ---------------:| --------------------------:|
| Installation des dépendances            |        Chromium |                       Edge |
| Source disponible sur GitHub            |             Oui |                        Non |
| Partage des DLL Edge/Chrome             |             Non | Oui (à compter de Edge 90) |
| Runtime partagé entre applications      |             Non |                 Facultatif |
| API d’application                       |             Oui |                        Non |
| Node.js                                 |             Oui |                        Non |
| Mode bac à sable                        |      Facultatif |                   Toujours |
| Nécessite un Framework d'application    |             Non |                        Oui |
| Plateformes supportées                  | Mac, Win, Linux |      Win (Mac/Linux prévu) |
| Partage de processus entre applications |          Jamais |                 Facultatif |
| Mises à jour du framework gérées par    |     Application |                   WebView2 |

## Discussion sur les performances

En ce qui concerne le rendu de votre contenu web, nous nous attendons à peu de différence de performance entre Electron, WebView2 et tout autre moteur de rendu basé sur Chromium. Nous avons créé [ossatures d'applications construites à l'aide d'Electron, C++ + WebView2, et C# + WebView2](https://github.com/crossplatform-dev/xplat-challenges) pour les personnes intéressées à étudier les différences potentielles de performance.

Il y a quelques différences qui entrent en jeu _en dehors_ du rendu de contenu web, et les gens d'Electron, WebView2, Edge, et d'autres personnes ont exprimé leur intérêt à travailler sur une comparaison détaillée, y compris les PWAs.

### La communication inter-processus(IPC)

_Nous voulons mettre en évidence immédiatement une différence , car nous pensons qu'il s'agit souvent d'une considération de performance dans les applications Electron._

Dans Chromium, le processus du navigateur agit comme un courtier de IPC entre les moteurs de rendu en bac à sable et le reste du système. Tandis qu'Electron autorise les processus de rendu sans bac à sable (sandbox), de nombreuses applications choisissent d'activer le sandbox pour plus de sécurité. WebView2 a toujours le sandbox activé, donc pour la plupart des applications Electron et WebView2 les IPC peut affecter les performances globales.

Même si Electron et WebView2 ont des modèles de processus similaires, les IPC sous-jacents diffèrent. La communication entre JavaScript et C++ ou C# nécessite [marshalling](https://en.wikipedia.org/wiki/Marshalling_(computer_science)), le plus souvent vers une chaîne JSON. La sérialisation/parsing JSON est une opération coûteuse, et les goulots d’étranglement IPC peuvent avoir un impact négatif sur les performances. À partir de Edge 93, WV2 utilisera [CBOR](https://en.wikipedia.org/wiki/CBOR) pour les événements du réseau.

Electron prend en charge les IPC directement entre deux processus via l'API [MessagePorts](https://www.electronjs.org/docs/latest/tutorial/message-ports) , qui utilise [l'algorithme de clonage structuré](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm). Les applications qui tirent parti de cela peuvent éviter de payer le tribut de la sérialisation JSON lors de l'envoi d'objets entre processus.

## Summary

Electron et WebView2 ont un certain nombre de différences, mais ne vous attendez pas à une grande différence par rapport à la façon dont ils effectuent le rendu du contenu web. En définitive, l'architecture d'une application et ses bibliothèques / frameworks JavaScript ont un impact plus important sur la mémoire et les performances que tout autre parce que _Chromium est Chromium_ peu importe où il fonctionne.

Remerciements spéciaux à l'équipe WebView2 pour avoir examiné ce post, et s'assurer que nous avons une vue actualisée de l'architecture WebView2. Ils sont heureux de recevoir tout [commentaire sur le projet](https://github.com/MicrosoftEdge/WebView2Feedback).
