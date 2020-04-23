# Prova

We aim to keep the code coverage of Electron high. Chiediamo che tutte le richieste pull passino non solo tutti i test esistenti, ma idealmente aggiungano anche nuovi test per coprire il codice modificato e i nuovi scenari. Ensuring that we capture as many code paths and use cases of Electron as possible ensures that we all ship apps with fewer bugs.

This repository comes with linting rules for both JavaScript and C++ – as well as unit and integration tests. To learn more about Electron's coding style, please see the [coding-style](coding-style.md) document.

## Linting

To ensure that your JavaScript is in compliance with the Electron coding style, run `npm run lint-js`, which will run `standard` against both Electron itself as well as the unit tests. If you are using an editor with a plugin/addon system, you might want to use one of the many [StandardJS addons](https://standardjs.com/#are-there-text-editor-plugins) to be informed of coding style violations before you ever commit them.

To run `standard` with parameters, run `npm run lint-js --` followed by arguments you want passed to `standard`.

To ensure that your C++ is in compliance with the Electron coding style, run `npm run lint-cpp`, which runs a `cpplint` script. We recommend that you use `clang-format` and prepared [a short tutorial](clang-format.md).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Unit Tests

If you are not using [build-tools](https://github.com/electron/build-tools), ensure that that name you have configured for your local build of Electron is one of `Testing`, `Release`, `Default`, `Debug`, or you have set `process.env.ELECTRON_OUT_DIR`. Without these set, Electron will fail to perform some pre-testing steps.

To run all unit tests, run `npm run test`. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.

### Testing su macchine Windows 10

#### Extra steps to run the unit test:

1. Visual Studio 2019 deve essere installato.
2. Node headers have to be compiled for your configuration.
   ```powershell
   ninja -C out\Testing third_party\electron_node:headers
   ```
3. The electron.lib has to be copied as node.lib.
   ```powershell
   cd out\Testing
   mkdir gen\node_headers\Release
   copy electron.lib gen\node_headers\Release\node.lib
   ```

#### Caratteri mancanti
Alcune macchine Windows 10<0> vengono distribuite prive del font Meiryo; questa circostanza potrebbe causare il fallimento di uno o più test sulla sostituzione dei font. Per installare Meiryo:</p> 

1. Premere il tasto Windows e cercare _Gestisci funzionalità opzionali_.
2. Clicca _Aggiungi una funzione_.
3. Seleziona _Caratteri aggiuntivi giapponesi_ e clicca _Installa_.



#### Dimensioni dei pixel

Alcuni test che si basano su dimensioni precise dei pixel potrebbero non funzionare correttamente su dispositivi con impostazioni schermo Hi-DPI a causa di errori di precisione nei punti mobili. Per eseguire correttamente questi test, assicurati che il ridimensionamento del dispositivo sia impostato su 100%.

To configure display scaling:

1. Premi il tasto Windows e cerca _Impostazioni di visualizzazione_.
2. Under _Scale and layout_, make sure that the device is set to 100%.
