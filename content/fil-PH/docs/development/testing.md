# Pagsusuri

Ang aming layunin ay mapanatili ang saklaw ng kodigo ng Electron na mataas. Hinihiling namin na ang lahat ng pull request ay hindi lamang pumasa sa mga mga naunang pagsusuri, ngunit may mainam na madagdag na bagong pagsusuri upang masakop ang nabagong code at mga bagong sitwasyon. Kung tiyak na nakuha natin ang maraming landas ng code at magamit ang mga kaso ng Electron hangga't maaari ay matitiyak natin na kami ay nagpapadala ng mga app na may mas kaunting mga bug.

Ang imbakang ito ay mayroon nang kasamang panaling tuntunin para sa parehong JavaScript at C++ pati na rin sa intergrasyon ng unit at iba pang pagsusuri. Para malaman pa ang tungkol sa estilo ng pag ko code ng Electron, mangyaring tingnan ang [coding-style(coding-style.md) document.

## Linting

Upang matiyak na ang iyong JavaScript ay sumusunod sa estilo ng pag co code ng Electron, paganahin ang run `npm run lint-js`, kung saan pagaganahin ang `standard` salungat sa kapwa Electron paati narin ang mga pagsusuri sa yunit. If you are using an editor with a plugin/addon system, you might want to use one of the many [StandardJS addons](standard-addons) to be informed of coding style violations before you ever commit them.

To run `standard` with parameters, run `npm run lint-js --` followed by arguments you want passed to `standard`.

To ensure that your C++ is in compliance with the Electron coding style, run `npm run lint-cpp`, which runs a `cpplint` script. We recommend that you use `clang-format` and prepared [a short tutorial](clang-format.md).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Unit Tests

To run all unit tests, run `npm run test`. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only a selected number of tests, run `npm run test -match=NAME`, replacing the `NAME` with the file name of the test suite you would like to run. As an example: If you want to run only IPC suites, you would run `npm run test -match=ipc`.