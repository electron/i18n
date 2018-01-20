# Pagsusuri

Ang aming layunin ay mapanatili ang saklaw ng kodigo ng Electron na mataas. Hinihiling namin na ang lahat ng pull request ay hindi lamang pumasa sa mga mga naunang pagsusuri, ngunit may mainam na madagdag na bagong pagsusuri upang masakop ang nabagong code at mga bagong sitwasyon. Kung tiyak na nakuha natin ang maraming landas ng code at magamit ang mga kaso ng Electron hangga't maaari ay matitiyak natin na kami ay nagpapadala ng mga app na may mas kaunting mga bug.

Ang imbakang ito ay mayroon nang kasamang panaling tuntunin para sa parehong JavaScript at C++ pati na rin sa intergrasyon ng unit at iba pang pagsusuri. Para malaman pa ang tungkol sa estilo ng pag ko code ng Electron, mangyaring tingnan ang [coding-style(coding-style.md) document.

## Linting

Upang matiyak na ang iyong JavaScript ay sumusunod sa estilo ng pag co code ng Electron, paganahin ang run `npm run lint-js`, kung saan pagaganahin ang `standard` salungat sa kapwa Electron paati narin ang mga pagsusuri sa yunit. Kung ikaw ay gumagamit ng editor na may sistema na plugin/addon, maaari mo ring gamitin ang isa sa maraming [StandardJS addons](standard-addons) na nagpapaalam ng mga paglabag sa pag co code bago mo man ito magawa.

Para paganahin `standard` na may parameter; paganahin `npm run lint-js --` kasunod nito ay ang mga katwiran na gusto mong ipatupad `standard`.

Upang matiyak na ang iyong C++ ay sumusunod sa estilo ng pagko code ng Electron, paganahin ang `npm run lint-cpp`, na nagpapagana ng isang `cpplint` script. Inirerekomenda namin na inyong gamitin ay ang `clang-format` at maghanda ng [isang maiksing tutorial](clang-format.md).

Walang masyadong Phyton sa imbakan na ito, ngunit ito rin ay pinamamahalaan ng mga tuntunin ng istilo ng pag ko code.`npm run lint-py`ay titignan ang lahat ng Phyton gamit ang `pylint` upang gawin ito.

## Unit Tests

To run all unit tests, run `npm run test`. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only a selected number of tests, run `npm run test -match=NAME`, replacing the `NAME` with the file name of the test suite you would like to run. As an example: If you want to run only IPC suites, you would run `npm run test -match=ipc`.