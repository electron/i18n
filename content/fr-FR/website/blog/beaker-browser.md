---
title: 'Projet de la Semaine : Navigateur Beaker'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

Cette semaine, nous avons rattrapé [Paul Frazee](http://pfrazee.github.io/), créateur de [Navigateur Beaker](https://beakerbrowser.com/). Beaker est un navigateur expérimental peer-to-peer qui utilise le protocole Dat pour héberger les sites des périphériques des utilisateurs.

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## Qu'est-ce que Beaker et pourquoi l'avez-vous créé ?

Beaker est un navigateur participatif. C'est un navigateur pour les pirates indépendants.

Le Web est une source fermée. Si vous voulez influencer le fonctionnement des médias sociaux, vous devez travailler sur Facebook ou Twitter. Pour la recherche, Google. Le contrôle est entre les mains des entreprises, plutôt que des utilisateurs eux-mêmes.

Avec Beaker, nous avons un nouveau protocole Web : le [transport d'archives décentralisé](https://datprotocol.com). "Dat". Il crée des sites à la demande, gratuitement, et ensuite les partage à partir de l'appareil. Aucun serveur requis. C'est notre innovation.

![Protocoles Beakers](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Lorsque vous visitez un site Dat à Beaker, vous téléchargez les fichiers. Le site vous appartient, pour toujours. Vous pouvez le sauvegarder, le forker, le modifier et partager gratuitement votre nouvelle version. Tout est open-source.

C'est donc de cela qu'il s'agit : nous créons un navigateur pour les sites Web open-source. Nous voulons que ce soit une boîte à outils pour le piratage social.

## Qui devrait utiliser Beaker?

Hackers. Modeurs. Types de création. Des gens qui aiment bricoler.

## Comment créer un nouveau projet qui utilise Data?

Nous avons [un outil en ligne de commande appelé bkr](https://github.com/beakerbrowser/bkr) qui ressemble à git + npm. Voici la création d'un site :

```bash
$ cd ~/mon-site
$ bkr init
$ echo "Bonjour, monde!" > 'indice.html
$ bkr publier
```

Et voici le forking d'un site :

```bash
$ bkr fork dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "Mon fork n'a aucune considération pour l'index précédent. > 'indice.html
$ bkr publier
```

Ces sites sont ensuite hébergés à partir de votre navigateur. C'est un peu comme BitTorrent; vous partagez les sites dans un maillage P2P.

Si vous voulez une interface graphique, nous avons quelques outils de base intégrés dans le navigateur, mais nous poussons ces outils dans le monde des utilisateurs. Tout cela va être des applications utilisateur modables.

## Pourquoi avez-vous choisi de construire Beaker sur Electron?

Il était évident pour ce projet. Si j'ai forked Chrome moi-même, j'écrirais en C++ dès maintenant ! Personne ne veut le faire. Je connais la pile Web, et je peux y travailler rapidement. C'est un exercice sans cerveau.

La vérité est, je ne suis pas sûr que je pourrais faire tout cela sans Electron. C'est un excellent logiciel.

## Quels sont les défis que vous avez rencontrés lors de la construction de Beaker?

La moitié de la somme est de mettre les outils et de comprendre à quel point je peux m'en tirer.

Il était assez facile de rendre le navigateur lui-même. Electron est pratiquement une boîte à outils pour créer des navigateurs. ... Sauf pour les onglets du navigateur; cela m'a pris pour toujours pour me mettre au bon pied. Je me suis finalement cassé et j'ai appris à faire des SVG. C'est bien plus beau, mais il a fallu 3 ou 4 itérations avant que je me sois bien sorti.

## Dans quels domaines faut-il améliorer Electron ?

Ce serait vraiment génial si je pouvais amarrer les devtools dans une webview.

## Que se passe-t-il à Beaker ?

Noms DNS sécurisés pour les sites Dat. Un schéma d'URL socialement configurable, appelé le ["schéma d'application".](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) Plus d'API Dat.

## Pour les gens qui pourraient être intéressés à contribuer au projet, dans quels domaines Beaker a-t-il besoin d'aide?

Nous avons beaucoup de questions ouvertes. « N'ayez pas peur de me donner. » #beakerbrowser sur freenode. Nous gardons une page [pour les contributeurs](https://beakerbrowser.com/docs/team.html) et nous vous ajouterons. Et si vous visitez Austin, je vais vous acheter une bière.

## Des conseils d'Electron qui pourraient être utiles aux autres développeurs ?

1. Utilisez l'outillage de construction qui se trouve là. Vous ne voulez pas vous battre avec vos propres solutions, croyez-moi. Utilisez electron-builder. Utilisez une chaudière repo.
2. Si vous avez besoin d'ouvrir un problème dans le dépôt Electron, allez dans le coin supérieur droit pour le rendre facile à reproduire. Vous obtiendrez une réponse beaucoup plus rapidement, et l'équipe l'appréciera. Mieux encore, essayez de le réparer vous-même. Il est en fait assez intéressant de voir les intérieurs.
3. Lisez tous les guides et documents avancés au moins une fois.
4. Ne construisez pas un navigateur, c'est un marché saturé.

