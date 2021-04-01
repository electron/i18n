---
title: 'Projet de la Semaine : Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

Cette semaine, nous avons interviewé le créateur de [Jasper](https://jasperapp.io), un outil basé sur Electron pour gérer les notifications GitHub.

---

## Bonjour! Qui êtes-vous ?

Je suis [Ryo Maruyama](https://github.com/h13i32maru), un développeur de logiciels au Japon. Je développe [Jasper](https://jasperapp.io) et [ESDoc](https://esdoc.org).

## Qu'est-ce que Jasper?

[Jasper](https://jasperapp.io) est un lecteur de tickets flexible et puissant pour GitHub. Il supporte les problèmes et les pull requests sur github.com et GitHub Enterprise.

[![Capture d'écran de l'application Jasper](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## « Pourquoi avez-vous fait? »

Lorsque les gens utilisent GitHub dans leur travail ou leurs activités OSS, ils ont tendance à recevoir de nombreuses notifications chaque jour. Pour vous abonner aux notifications, GitHub fournit des notifications par e-mail et [des notifications web](https://github.com/notifications). Je les ai utilisées pendant quelques années, mais j'ai rencontré les problèmes suivants:

- Il est facile d'ignorer les questions qui m'ont été mentionnées, j'ai commenté, ou je suis en train de regarder.
- J'ai mis quelques problèmes dans un coin de ma tête pour vérifier plus tard, mais je les oublie parfois.
- Pour ne pas oublier les problèmes, je garde plusieurs onglets ouverts dans mon navigateur.
- Il est difficile de vérifier toutes les questions qui me sont liées.
- Il est difficile de saisir toute l'activité de mon équipe.

Je passais beaucoup de temps et d'énergie à essayer de prévenir ces problèmes. j'ai donc décidé de faire un lecteur de problèmes pour GitHub pour résoudre ces problèmes efficacement, et j'ai commencé à développer Jasper.

## Qui utilise Jasper?

Jasper est utilisé par les développeurs, les concepteurs et les gestionnaires dans plusieurs entreprises qui utilisent GitHub. Bien sûr, certains développeurs d'OSS l'utilisent aussi. Et il est également utilisé par certaines personnes sur GitHub !

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## Comment fonctionne Jasper?

Une fois que Jasper est configuré, l'écran suivant s'affiche. De gauche à droite, vous pouvez voir "streams list", "issue list" et "issue body".

[![Écran de démarrage de Jasper](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

Ce "stream" est la caractéristique principale de Jasper. Par exemple, si vous voulez voir "tickets qui sont assignés à @zeke dans le dépôt electron/electron", vous créez le flux suivant :

```
repo:electron/electron assigne:zeke est:issue
```

[![Écran de démarrage Jasper 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

Après avoir créé le flux et en attente pendant quelques secondes, vous pouvez voir les problèmes qui remplissent les conditions.

[![Écran de démarrage de Jasper 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## Que pouvons-nous faire avec les streams?

Je vais introduire les conditions qui peuvent être utilisées pour le flux.

### Utilisateurs et équipes

| Flux                                                | Issues                                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------------------- |
| `mentions:cat mentions:chien`                       | Problèmes qui mentionnent l'utilisateur `chat` ou `chien`                     |
| `auteur:chat auteur:chien`                          | Problèmes créés par l'utilisateur `chat` ou `chien`                           |
| `assigne:cat assigne:dog`                           | Demandes assignées à `chat` ou `chien`                                        |
| `commentaire:commentaire:commentaire:chien`         | Problèmes que `chat` ou `chien` a commentés sur                               |
| `involves:chat impliqué:chien`                      | Problèmes qui "impliquent" `chat` ou `bob`                                    |
| `équipe:équipe animal/chat blanc:animal/chien noir` | Problèmes que `animal/chat blanc` ou `animal/chien noir` sont mentionnés dans |

`implique` signifie `mention`, `auteur`, `cessionnaire` ou `commentaire`

### Dépôts et organisations

| Flux                                             | Issues                                      |
| ------------------------------------------------ | ------------------------------------------- |
| `repo:cat/saut repo:dog/run`                     | Problèmes dans `chat/jump` ou `chien/run`   |
| `org:electron utilisateur:cat utilisateur:chien` | Problèmes dans `electron`, `cat` ou `chien` |

`org` est identique à `utilisateur`

### Attributs

| Flux                                              | Issues                                                                 |
| ------------------------------------------------- | ---------------------------------------------------------------------- |
| `repo:cat/jump milestone:v1.0.0 milestone:v1.0.1` | Problèmes qui sont attachés à `v1.0.0` ou `v1.0.1` dans `chat/jump`    |
| `repo:cat/jump label:bug label:blocker`           | Problèmes qui sont attachés `bogue` **et** `bloqueur` dans `chat/saut` |
| `électron OU atomshell`                           | Problèmes qui incluent `electron` ou `atomshell`                       |

### Statut de la revue

| Flux                         | Issues                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `est :pr relecture:requis`   | Problèmes qui sont nécessaires à la révision dans `chat/saut`                                       |
| `est:pr comment-demandé:cat` | Problèmes qui sont demandés en revue par `chat`. <br/> Mais ceux-ci ne sont pas encore revus. |
| `is:pr évalué par:cat`       | Problèmes qui sont revus par `cat`                                                                  |

<br/>

Comme vous l'avez peut-être remarqué en les regardant, les flux peuvent utiliser les requêtes de recherche de GitHub. Pour plus de détails sur l'utilisation des flux et des requêtes de recherche, voir les URL suivantes.

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [aide.github.com/articles/searching-issues](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper a également des fonctionnalités pour la gestion des problèmes non lus, la gestion des commentaires non lus, le marquage des étoiles, la mise à jour des notifications, le filtrage des problèmes, les raccourcis clavier, etc.

## Est-ce que Jasper est un produit payant? Combien cela coûte-t-il?

Jasper est de 12 $. Cependant vous pouvez utiliser la [version d'essai gratuite](https://jasperapp.io/) pendant 30 jours.

## Pourquoi avez-vous choisi de construire Jasper sur Electron?

J'aime les aspects suivants d'Electron:

- Les applications peuvent être développées avec JavaScript/CSS/HTML.
- Les applications peuvent être construites pour Windows, Mac et Linux.
- Electron est activement développé et a une grande communauté.

Ces fonctionnalités permettent le développement rapide et simple d'applications de bureau. C'est génial ! Si vous avez une idée de produit, vous devriez envisager d'utiliser Electron par tous les moyens.

## Quels sont les défis que vous avez rencontrés en développant Jasper?

J'ai eu du mal à comprendre le concept de "stream". Au début, j'ai envisagé d'utiliser l'API [Notifications](https://developer.github.com/v3/activity/notifications/) de GitHub. Cependant, j'ai remarqué qu'il ne supporte pas certains cas d'utilisation. Après cela, j'ai envisagé d'utiliser l'API [Issues API](https://developer.github.com/v3/issues/) et [Pull Requests API](https://developer.github.com/v3/pulls/), en plus de l'API de notification. Mais ce n'est jamais devenu ce que je voulais. Puis en pensant à diverses méthodes, j'ai réalisé que le sondage de l'API de recherche [de GitHub](https://developer.github.com/v3/search/) offrirait la plus grande flexibilité. Il a fallu environ un mois d'expérimentation pour arriver à ce point, puis j'ai implémenté un prototype de Jasper avec le concept de flux en deux jours.

Note : Le sondage est limité à une fois toutes les 10 secondes au maximum. Ceci est assez acceptable pour la restriction de l'API GitHub.

## Que se passe-t-il ensuite?

J'ai un plan pour développer les fonctionnalités suivantes :

- **Un flux filtré**: Un flux a un flux filtré qui filtre les problèmes dans le flux. C'est comme une vue de SQL.
- **Comptes multiples**: vous pourrez utiliser github.com et GHE
- **Améliorer les performances**: Pour l'instant, le chargement d'un problème dans WebView est de faible vitesse par rapport au navigateur normal.

Suivez [@jasperappio](https://twitter.com/jasperappio) sur Twitter pour les mises à jour.

