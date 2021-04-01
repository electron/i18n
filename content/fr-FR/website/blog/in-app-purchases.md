---
title: "Nouveau dans Electron 2: Achats In-App"
author: zeke
date: '2018-04-04'
---
  
La nouvelle ligne de version d'Electron 2.0 est [empaquetée](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) avec de nouvelles fonctionnalités et correctifs. L'un des points forts de cette nouvelle version majeure est une nouvelle API [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) pour le [Mac App Store](https://support.apple.com/en-us/HT202023) d'Apple.

---

Les achats in-app permettent d'acheter du contenu ou des abonnements directement dans les applications. Cela donne aux développeurs un moyen facile d'embrasser le modèle d'affaires [freemium](https://developer.apple.com/app-store/freemium-business-model/), où les utilisateurs ne paient rien pour télécharger une application et sont proposés en option achats in-app pour des fonctionnalités premium, contenu supplémentaire ou abonnement.

La nouvelle API a été ajoutée à Electron par le contributeur de la communauté [Adrien Fery](https://github.com/AdrienFery) pour activer les achats in-app dans [Amanote](https://amanote.com/), une application Electron à prendre des notes pour les conférences et les conférences. Amanote est gratuit à télécharger et permet d'ajouter des notes claires et structurées aux PDFs, avec des fonctionnalités comme les formules mathématiques, les dessins, l'enregistrement de l'audio , et plus.

Depuis l'ajout du support d'achat in-app à la version Mac d'Amanote, Adrien a noté une augmentation de **40 % des ventes**!

## Commencer

La nouvelle API [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) a déjà atterri dans la dernière bêta d'Electron :

```sh
npm i -D electron@beta
```

Les documents de l'API peuvent être [trouvés sur GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md), et Adrien a eu la gentillesse d'écrire un tutoriel sur l'utilisation de l'API. Pour commencer à ajouter des achats dans l'application à votre application, [consultez le tutoriel](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

D'autres [améliorations à l'API](https://github.com/electron/electron/pull/12464) sont en cours de réalisation et arriveront bientôt dans une prochaine version bêta d'Electron.

## Windows pourrait être le suivant

Ensuite, Adrien espère ouvrir un nouveau canal de revenus pour Amanote en ajoutant la prise en charge des achats in-app de Microsoft Store dans Electron. Restez à l'écoute des développements sur cela !