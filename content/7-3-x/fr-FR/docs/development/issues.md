# Les issues dans Electron

* [Comment contribuer dans les Issues](#how-to-contribute-in-issues)
* [Demander de l'aide générale](#asking-for-general-help)
* [Envoi d'un rapport de bug](#submitting-a-bug-report)
* [Triaging a Bug Report](#triaging-a-bug-report)
* [Résolution d'un rapport de bug](#resolving-a-bug-report)

## Comment contribuer dans les Issues

Pour toute question, il y a fondamentalement trois façons pour une personne de Contribuer:

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the `electron/electron` issue tracker.
2. En aidant à trier le problème : vous pouvez le faire soit en fournissant des détails supplémentaires (un cas de test reproductible qui démontre un bogue) soit en fournissant des suggestions pour résoudre le problème.
3. En aidant à résoudre le problème : cela peut être fait en démontrant que le problème n'est pas un bug ou qu'il est résolu ; mais plus souvent, en ouvrant une pull request (demande de tirage) qui modifie la source dans `electron/electron` d'une manière concrète et vérifiable.

## Demander de l'aide générale

["Trouver un soutien"](../tutorial/support.md#finding-support) a un liste de ressources pour obtenir de l’aide à la programmation, signaler les problèmes de sécurité, contribuer, et plus encore. Veuillez utiliser le gestionnaire de tickets uniquement pour les bugs !

## Envoi d'un rapport de bug

When opening a new issue in the `electron/electron` issue tracker, users will be presented with a template that should be filled in.

```markdown<!--
Merci d'avoir signaler un problème ! Garder à l'esprit que:

- Le suivi de tickets est uniquement pour les bugs et les demandes de fonctionnalités.
- Avant de signaler un bug, veuillez essayer de reproduire votre problème avec
  la dernière version d'Electron.
- If you need general advice, join our Slack: http://atom-slack.herokuapp.com
-->* Electron version:
* Operating system:

### Expected behavior

<!-- What do you think should happen? -->

### Actual behavior

<!-- What actually happens? -->

### How to reproduce

<!--

Your best chance of getting this bug looked at quickly is to provide a REPOSITORY that can be cloned and run.

You can fork https://github.com/electron/electron-quick-start and include a link to the branch with your changes.

If you provide a URL, please list the commands required to clone/setup/run your repo e.g.

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Triaging a Bug Report

Il est fréquent que les questions ouvertes impliquent des discussions. Certains contributeurs peuvent avoir des opinions différentes, y compris si le comportement est un bogue ou une fonctionnalité. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. Pour beaucoup, de telles réponses sont ennuyeuses et peu amicales.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Résolution d'un rapport de bug

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.
