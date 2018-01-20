# Pagsusuri

Ang aming layunin ay mapanatili ang saklaw ng kodigo ng Electron na mataas. Hinihiling namin na ang lahat ng pull request ay hindi lamang pumasa sa mga mga naunang pagsusuri, ngunit may mainam na madagdag na bagong pagsusuri upang masakop ang nabagong code at mga bagong sitwasyon. Kung tiyak na nakuha natin ang maraming landas ng code at magamit ang mga kaso ng Electron hangga't maaari ay matitiyak natin na kami ay nagpapadala ng mga app na may mas kaunting mga bug.

Ang imbakang ito ay mayroon nang kasamang panaling tuntunin para sa parehong JavaScript at C++ pati na rin sa intergrasyon ng unit at iba pang pagsusuri. Para malaman pa ang tungkol sa estilo ng pag ko code ng Electron, mangyaring tingnan ang [coding-style(coding-style.md) document.

## Linting

Upang matiyak na ang iyong JavaScript ay sumusunod sa estilo ng pag co code ng Electron, paganahin ang run `npm run lint-js`, kung saan pagaganahin ang `standard` salungat sa kapwa Electron paati narin ang mga pagsusuri sa yunit. Kung ikaw ay gumagamit ng editor na may sistema na plugin/addon, maaari mo ring gamitin ang isa sa maraming [StandardJS addons](standard-addons) na nagpapaalam ng mga paglabag sa pag co code bago mo man ito magawa.

Para paganahin `standard` na may parameter; paganahin `npm run lint-js --` kasunod nito ay ang mga katwiran na gusto mong ipatupad `standard`.

Upang matiyak na ang iyong C++ ay sumusunod sa estilo ng pagko code ng Electron, paganahin ang `npm run lint-cpp`, na nagpapagana ng isang `cpplint` script. Inirerekomenda namin na inyong gamitin ay ang `clang-format` at maghanda ng [isang maiksing tutorial](clang-format.md).

Walang masyadong Phyton sa imbakan na ito, ngunit ito rin ay pinamamahalaan ng mga tuntunin ng istilo ng pag ko code.`npm run lint-py`ay titignan ang lahat ng Phyton gamit ang `pylint` upang gawin ito.

## Pagsusuri ng unit

Para patakbuhin ang lahat ng pagsusuri ng unit, patakbuhin ang `npm run test`. Ang yunit na pagsusulit ay isang elektron app (nagulat!) na matatagpuan sa folder ng `spec`. Tandaan na mayroon itong sariling `package.json`at hindi na tinukoy ang mga pinagkakatiwalaan nito sa pinaka mataas na atas ng `package.json`.

Upang patakbuhin ang napiling bilang ng pagsusuri, patakbuhin `npm subukang patakbuhin-katugma=NAME`, palitan ang `NAME` pangal ng file ng test suiite na gusto mong paganahin. Halimbawa: Kung nais mong patakbuhin lamang ang IPC suites, ang iyong pagaganahin ay `npm run test -match=ipc`.