# Test

Notre essayons de garder une couverture de code élevée pour Electron. Nous demandons à ce que toutes les demandes de "pull" passent tout les tests existants, mais ajoutent aussi des tests couvrant les changements de codes et les nouveaux scénarios. Cela nous assure ainsi que nous intégrons le plus de code possible tout en étant sûr que Electron soit livré avec le moins de bugs possible.

Ce dépôt utilise des règles de qualité de code pour JavaScript et C++ ainsi que des tests unitaires et d'intégrations. Pour en apprendre plus sur le style de code d'Electron, référez-vous au document [style de code](coding-style.md).

## Linting
To ensure that your JavaScript is in compliance with the Electron coding style, run `npm run lint-js`, which will run `standard` against both Electron itself as well as the unit tests. If you are using an editor with a plugin/addon system, you might want to use one of the many [StandardJS addons](https://standardjs.com/#are-there-text-editor-plugins) to be informed of coding style violations before you ever commit them.

To run `standard` with parameters, run `npm run lint-js --` followed by arguments you want passed to `standard`.

To ensure that your C++ is in compliance with the Electron coding style, run `npm run lint-cpp`, which runs a `cpplint` script. We recommend that you use `clang-format` and prepared [a short tutorial](clang-format.md).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Tests unitaires

To run all unit tests, run `npm run test`. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.
