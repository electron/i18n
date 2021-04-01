---
title: "Le nouveau site Internet internationalisé d'Electron"
author: zeke
date: '2017-11-13'
---

Electron a un nouveau site web sur [electronjs.org](https://electronjs.org)! Nous avons remplacé notre site Jekyll statique par un nœud. , nous donnant la flexibilité de internationaliser le site et ouvrant la voie à de nouvelles fonctionnalités plus excitantes.

---

## 🌍 Traductions

Nous avons commencé le processus d'internationalisation du site web avec l'objectif de rendre le développement d'applications Electron accessible à un public mondial de développeurs. Nous utilisons une plateforme de traduction appelée [Crowdin](https://crowdin.com/project/electron) qui intègre avec GitHub, ouvrir et mettre à jour automatiquement les demandes de fusion car le contenu est traduit dans différentes langues.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav en chinois simplifié">
    <figcaption>Nav d'Electron en chinois simplifié</figcaption>
  </a>
</figure>

Bien que nous ayons travaillé tranquillement sur cet effort jusqu'à présent, plus de 75 membres de la communauté Electron ont déjà découvert le projet organiquement et se sont joints à l'effort d'internationalisation du site web et de traduire la documentation d'Electron dans plus de 20 langues. Nous voyons [quotidiennement contributions](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) de personnes dans le monde entier, avec des traductions pour langues comme le français, le vietnamien, l'indonésien et le chinois en tête.

Pour choisir votre langue et afficher les progrès de la traduction, visitez [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Langues cibles actuelles sur Crowdin">
    <figcaption>Traductions en cours sur Crowdin</figcaption>
  </a>
</figure>

Si vous êtes multilingue et que vous souhaitez aider à traduire les documents d'Electron et le site Web, visitez le dépôt [electron/electron-i18n](https://github.com/electron/electron-i18n#readme) , ou sautez directement en traduisant sur [Crowdin](https://crowdin.com/project/electron), où vous pouvez vous connecter en utilisant votre compte GitHub.

Il y a actuellement 21 langues activées pour le projet Electron sur Crowdin. Ajouter le support pour plus de langues est facile, donc si vous êtes intéressé par aider à traduire mais que vous ne voyez pas votre langue listée, [laissez-nous savoir](https://github.com/electron/electronjs.org/issues/new) et nous l'activerons.

## Documents traduits bruts

Si vous préférez lire la documentation dans les fichiers markdown bruts, vous pouvez maintenant le faire dans n'importe quelle langue :

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Pages de l'application

À partir d'aujourd'hui, n'importe quelle application Electron peut facilement avoir sa propre page sur le site d'Electron . Pour quelques exemples, consultez [Etcher](https://electronjs.org/apps/etcher), [1Presse-papiers](https://electronjs.org/apps/1clipboard), ou [GraphQL Playground](https://electronjs.org/apps/graphql-playground), photographié ici sur la version japonaise du site :

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="Terrain de jeu GraphQL">
  </a>
</figure>

Il y a des applications incroyables d'Electron, mais elles ne sont pas toujours faciles à trouver, et tous les développeurs n'ont pas le temps ou les ressources pour construire un site web approprié pour commercialiser et distribuer leur application.

En utilisant juste un fichier d'icône PNG [et une petite quantité de métadonnées de l'application](https://github.com/electron/electron-apps/blob/master/contributing.md), nous sommes en mesure de collecter beaucoup d'informations sur une application donnée. En utilisant les données collectées depuis GitHub, les pages des applications peuvent maintenant afficher des captures d'écran, des liens de téléchargement, versions, notes de publication et READMEs pour chaque application qui a un dépôt public. En utilisant une palette de couleurs extraite de l'icône de chaque application, nous pouvons produire [couleurs en gras et accessibles](https://github.com/zeke/pick-a-good-color) pour donner à chaque page d'application une distinction visuelle.

La page d'index des [applications](https://electronjs.org/apps) a maintenant également des catégories et un filtre par mot clé pour trouver des applications intéressantes comme [interfaces GraphQL](https://electronjs.org/apps?q=graphql) et [outils p2p](https://electronjs.org/apps?q=graphql).

Si vous avez une application Electron que vous aimeriez voir sur le site, ouvrez une pull request sur le dépôt [electron/electron-apps](https://github.com/electron/electron-apps).

## Installation en une ligne avec Homebrew

Le gestionnaire de paquets [Homebrew](https://brew.sh) pour macOS a une sous-commande appelée [cask](https://caskroom.github.io) qui facilite l'installation d'applications de bureau en utilisant une seule commande dans votre terminal, comme `brew cask install atom`.

Nous avons commencé à collecter des noms de cask Homebrew pour les applications populaires d'Electron et sont maintenant afficher la commande d'installation (pour les visiteurs de macOS) sur chaque page de l'application qui a un cercle:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Options d'installation adaptées à votre plateforme : macOS, Windows, Linux</figcaption>
  </a>
</figure>

Pour voir toutes les applications qui ont des noms de casques homebrew, visitez [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Si vous connaissez d'autres applications avec des casques que nous n'avons pas encore indexés, [veuillez les ajouter !](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Un nouveau domaine

Nous avons déplacé le site de electron.atom.io vers un nouveau domaine : [electronjs.org](https://electronjs.org).

Le projet Electron est né dans [Atom](https://atom.io), l'éditeur de texte open-source de GitHub construit sur les technologies web. Electron s'appelait à l'origine `atom-shell`. Atom a été la première application à l'utiliser, mais il n'a pas fallu longtemps pour que les gens se rendent compte que cette exécution magique Chromium + Node pouvait être utilisée pour toutes sortes d'applications différentes. Lorsque des entreprises comme Microsoft et Slack ont commencé à utiliser `atom-shell`, il est devenu clair que le projet avait besoin d'un nouveau nom.

C'est ainsi que "Electron" est né. Début 2016, GitHub a assemblé une nouvelle équipe pour concentrer spécifiquement sur le développement et la maintenance d'Electron, à l'exception d'Atom. En temps depuis, Electron a été adopté par des milliers de développeurs d'applications, et dépend maintenant de nombreuses grandes entreprises, dont beaucoup ont des équipes d'Electron propres.

Soutenir les projets Electron de GitHub comme Atom et [GitHub Desktop](https://desktop.github.com) reste une priorité pour notre équipe, mais en passant à un nouveau domaine, nous espérons contribuer à clarifier la distinction technique entre Atom et Electron.

## 🐢🚀 Node.js partout

Le site Web précédent d'Electron a été construit avec [Jekyll](https://jekyllrb.com), le générateur de site statique basé sur la rue. Jekyll est un excellent outil pour la construction de sites Web statiques, mais le site Web a commencé à le dépasser. Nous voulions des capacités plus dynamiques comme des redirections appropriées et un rendu de contenu dynamique, donc un serveur [Node.js](https://nodejs.org) était le choix évident.

L'écosystème Electron inclut des projets avec des composants écrits dans plusieurs langages de programmation différents, de Python à C++ à Bash. Mais JavaScript est le fondement d'Electron, et c'est le langage le plus utilisé dans notre communauté.

En migrant le site de Ruby vers Node.js, nous visons à abaisser la barrière à l'entrée pour les personnes souhaitant contribuer au site Web.

## ⚡ Participation Open-Source plus facile

Si vous avez [nœud. s](https://nodejs.org) (8 ou plus) et [git](https://git-scm.org) installé sur votre système, vous pouvez facilement faire fonctionner le site localement :

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

Le nouveau site est hébergé sur Heroku. Nous utilisons des pipelines de déploiement et la fonctionnalité [Revoir les applications](https://devcenter.heroku.com/articles/github-integration-review-apps) , qui crée automatiquement une copie en cours d'exécution de l'application pour chaque requête Pull . Cela facilite aux examinateurs de voir les effets réels d'une pull request sur une copie en direct du site.

## 🙏 Merci aux contributeurs

Nous aimerions remercier tout particulièrement tous les gens du monde entier qui ont contribué à améliorer Electron. La passion de la communauté open-source a contribué de manière incommensurable à faire d'Electron un succès. Merci!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>