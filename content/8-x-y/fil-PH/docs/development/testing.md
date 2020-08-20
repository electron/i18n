# Pagsusuri

Ang aming layunin ay mapanatili ang saklaw ng kodigo ng Electron na mataas. Hinihiling namin na ang lahat ng pull request ay hindi lamang pumasa sa mga naunang pagsusuri, ngunit mas mainam na magdagdag ng mga bagong pagsusuri upang masakop ang nabagong code at mga bagong sitwasyon. Kung tiyak na nakuha natin ang maraming landas ng code at magamit ang mga kaso ng Electron hangga't maaari ay matitiyak natin na kami ay nagpapadala ng mga app na may mas kaunting mga bug.

Ang imbakang ito ay mayroon nang kasamang panaling tuntunin para sa parehong JavaScript at C++ pati na rin sa intergrasyon ng unit at iba pang pagsusuri. To learn more about Electron's coding style, please see the [coding-style](coding-style.md) document.

## Linting
Upang matiyak na ang iyong JavaScript ay sumusunod sa estilo ng pag co code ng Electron, paganahin ang run `npm run lint-js`, kung saan pagaganahin ang `standard` salungat sa kapwa Electron paati narin ang mga pagsusuri sa yunit. Kung gumagamit ka ng isang editor gamit ang isang plugin/addon system, maaaring gusto mong gamitin ang isa sa marami [StandardJS addons ][standard-addons] upang malaman ang estilo ng coding ng mga paglabag bago mo ipagkatiwala ang mga ito.

Para paganahin `standard` na may parameter; paganahin `npm run lint-js --` kasunod nito ay ang mga katwiran na gusto mong ipatupad `standard`.

Upang matiyak na ang iyong C++ ay sumusunod sa estilo ng pagko code ng Electron, paganahin ang `npm run lint-cpp`, na nagpapagana ng isang `cpplint` script. Inirerekomenda namin na inyong gamitin ay ang `clang-format` at maghanda ng [isang maiksing tutorial](clang-format.md).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Pagsusuri ng unit

Para patakbuhin ang lahat ng pagsusuri ng unit, patakbuhin ang `npm run test`. Ang yunit na pagsusulit ay isang elektron app (nagulat!) na matatagpuan sa folder ng `spec`. Tandaan na mayroon itong sariling `package.json`at hindi na tinukoy ang mga pinagkakatiwalaan nito sa pinaka mataas na atas ng `package.json`.

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.

### Testing on Windows 10 devices
[Some Windows 10 devices](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) do not ship with the Meiryo font installed, which may cause a font fallback test to fail. To install Meiryo:
1. Push the Windows key and search for _Manage optional features_.
1. Click _Add a feature_.
1. Select _Japanese Supplemental Fonts_ and click _Install_.


Some tests which rely on precise pixel measurements may not work correctly on devices with Hi-DPI screen settings due to floating point precision errors. To run these tests correctly, make sure the device is set to 100% scaling.

To configure display scaling:
1. Push the Windows key and search for _Display settings_.
1. Under _Scale and layout_, make sure that the device is set to 100%.

[standard-addons]: https://standardjs.com/#are-there-text-editor-plugins
