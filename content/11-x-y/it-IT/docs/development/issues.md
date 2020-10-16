# Issues In Electron

* [How to Contribute to Issues](#how-to-contribute-to-issues)
* [Asking for General Help](#asking-for-general-help)
* [Submitting a Bug Report](#submitting-a-bug-report)
* [Triaging a Bug Report](#triaging-a-bug-report)
* [Resolving a Bug Report](#resolving-a-bug-report)

## Come contribuire alle issues

Per ogni issue, ci sono fondamentalmente 3 modi con cui ognuno può contribuire:

1. Aprendo l'issue per una discussione: Se credi di aver trovato un nuovo bug in Electron, dovresti segnalarlo creando una nuova issue nel [`electron/electron` issue tracker](https://github.com/electron/electron/issues).
2. Aiutando il riconoscimento della issue: Puoi farlo sia fornendo dettagli per l'assistenza (una prova riproducibile che dimostri il problema) oppure fornendo suggerimenti su come affrontare il problema.
3. Aiutando a risolvere la issue: Questo può essere fatto dimostrando che la issue non è un problema o è stata sistemata; più spesso, aprendo una pull request che cambi il sorgente in `electron/electron` in modo concreto e revisionabile.

## Asking for General Help

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. Please use the issue tracker for bugs only!

## Submitting a Bug Report

To submit a bug report:

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with a template that should be filled in.

```markdown
<!--
Thanks for opening an issue! A few things to keep in mind:

- The issue tracker is only for bugs and feature requests.
- Before reporting a bug, please try reproducing your issue against
  the latest version of Electron.
- If you need general advice, join our Slack: http://atom-slack.herokuapp.com
-->

* Electron version:
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

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It is easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Triaging a Bug Report

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Resolving a Bug Report

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.
