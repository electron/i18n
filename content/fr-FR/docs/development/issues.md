# Les issues dans Electron

* [How to Contribute to Issues](#how-to-contribute-to-issues)
* [Demander de l'aide générale](#asking-for-general-help)
* [Envoi d'un rapport de bug](#submitting-a-bug-report)
* [Triaging a Bug Report](#triaging-a-bug-report)
* [Résolution d'un rapport de bug](#resolving-a-bug-report)

## How to Contribute to Issues

For any issue, there are fundamentally three ways an individual can contribute:

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues).
2. By helping to triage the issue: You can do this either by providing assistive details (a reproducible test case that demonstrates a bug) or by providing suggestions to address the issue.
3. By helping to resolve the issue: This can be done by demonstrating that the issue is not a bug or is fixed; but more often, by opening a pull request that changes the source in `electron/electron` in a concrete and reviewable manner.

## Demander de l'aide générale

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. Please use the issue tracker for bugs only!

## Envoi d'un rapport de bug

To submit a bug report:

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with a template that should be filled in.

Si vous croyez avoir trouvé un bogue dans Electron, veuillez remplir le modèle au mieux de vos capacités.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It is easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Triaging a Bug Report

Il est fréquent que les questions ouvertes impliquent des discussions. Certains contributeurs peuvent avoir des opinions différentes, y compris si le comportement est un bogue ou une fonctionnalité. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. Pour beaucoup, de telles réponses sont ennuyeuses et peu amicales.

Contributors are encouraged to solve issues collaboratively and help one another make progress. Si vous rencontrez un problème que vous estimez invalide, ou qui contient des informations incorrectes, expliquez *pourquoi* vous pensez de cette façon avec un contexte de soutien supplémentaire, et être prêt à être convaincu que vous pouvez avoir tort. By doing so, we can often reach the correct outcome faster.

## Résolution d'un rapport de bug

La plupart des issues sont résolus en ouvrant une pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.
