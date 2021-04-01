---
title: Échantillons simples d'Electron
author: zeke
date: '2017-01-19'
---

Nous avons récemment hébergé un hackathon Electron au QG GitHub pour les membres de [Hackbright Academy](https://hackbrightacademy.com), une école de codage pour femmes fondée à San Francisco. Pour aider les participants à démarrer leurs projets, notre [Kevin Sawicki](https://github.com/kevinsawicki) a créé quelques exemples d'applications Electron.

---

Si vous êtes nouveau dans le développement d'Electron ou que vous n'avez pas encore essayé, ces exemples d'applications sont un bon endroit pour commencer. Ils sont petits, faciles à lire, et le code est fortement commenté pour expliquer comment tout fonctionne.

Pour commencer, cloner ce dépôt :

```sh
git clone https://github.com/electron/simple-samples
```

Pour exécuter l'une des applications ci-dessous, changez dans le répertoire de l'application, installez des dépendances, puis démarrez :

```sh
cd moniteur d'activité
npm install
npm start
```

## Moniteur d'activité

Affiche un tableau de bord du système de CPU, de l'utilisateur et de la durée d'activité inactive.

[![Capture d'écran](https://cloud.githubusercontent.com/assets/671378/20894933/3882a328-bacc-11e6-865b-4bc1c5ac7ec7.png)](https://github.com/kevinsawicki/electron-samples/tree/master/activity-monitor)

## Hachage

Affiche les valeurs de hachage du texte entré en utilisant différents algorithmes.

[![capture d'écran](https://cloud.githubusercontent.com/assets/671378/21204178/de96fa12-c20a-11e6-8e94-f5b16e676eee.png)](https://github.com/kevinsawicki/electron-samples/tree/master/hash)

## Miroir

Joue une vidéo de la caméra de l'ordinateur à une taille maximisée comme regarder dans un miroir. Inclut un effet optionnel de filtre arc-en-ciel qui utilise des animations CSS.

## Prix

Affiche le prix actuel du pétrole, de l'or et de l'argent à l'aide de l'API financière Yahoo.

[![capture d'écran](https://cloud.githubusercontent.com/assets/671378/21198004/6e7a3798-c1f2-11e6-8228-495de90b7797.png)](https://github.com/kevinsawicki/electron-samples/tree/master/prices)

## URL

Charge une URL passée sur la ligne de commande dans une fenêtre.

## Autres Ressources

Nous espérons que ces applications vous aideront à commencer à utiliser Electron. Voici une poignée d'autres ressources pour en apprendre plus:

- [electron-quick-start](https://github.com/electron/electron-quick-start): Une chaudière minimale pour Electron.
- [Démos d'Electron API](https://github.com/electron/electron-api-demos): Une application interactive qui démontre les fonctionnalités principales de l'API Electron
- [electronjs.org/docs/all](https://electronjs.org/docs/all/): Toute la documentation d'Electron ensemble sur une seule page interrogeable.
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps): Une autre collection d'exemples d'applications pour Electron, compilée par le mainteneur d'Electron [Haojian Wu](https://github.com/hokein).
- [awesome-electron](https://github.com/sindresorhus/awesome-electron) - Un dépôt GitHub qui collecte les plus récents et les plus grands tutoriels liés à Electron, livres, vidéos, etc.