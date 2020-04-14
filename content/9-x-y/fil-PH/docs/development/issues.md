# Mga Isyu sa Electron

* [How to Contribute to Issues](#how-to-contribute-to-issues)
* [Paghingi ng Pangkalahatang Tulong](#paghihingi-ng-pangkalahatang-tulong)
* [Pagsusumite ng isang Ulat ukol sa Bug](#pagsusumite-ng-isang-ulat-ukol-sa-bug)
* [Pagta-triage ng isang Ulat ukol sa Bug](#pata-triage-ng-isang-ulat-ukol-sa-bug)
* [Paglulutas ng isang Ulat ukol sa Bug](#paglulutas-ng-isang-ulat-ukol-sa-bug)

## How to Contribute to Issues

Para sa anumang isyu, mayroong tatlong pangunahing pamamaraan na ang isang indibidwal ay makapag-ambag:

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues).
2. Sa pamamagitan nang pagtulong upang ma-triage ang isyu: Magagawa mo ito sa pagbibigay ng asistibong mga detalye (isang mapaparaming kaso ng pagsusuri na nagpapakita ng isang bug) o sa pamamagitan ng pagbibigay ng mga mungkahi upang malutas ang isyu.
3. Sa pamamagitan ng pagtulong sa paglutas ng isyu: Ito ay maaaring gawin sa pamamagitan ng pagpapakita na ang isyu ay hindi bug o ito ay naayos na; pero kadalasan, sa pamamagitan nang pagbukas ng isang pull request na nagbabago sa pinagmulan sa `electron/electron` sa isang konkreto at masusuring paraan.

## Paghingi ng Pangkalahatang Tulong

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. Please use the issue tracker for bugs only!

## Pagsusumite ng isang Ulat ukol sa Bug

To submit a bug report:

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with a template that should be filled in.

```markdown<!--
Salamat sa pagbukas ng isang isyu! Ilang mga bagay na dapat tandaan:

- Ang tagagsubaybay sa isyu ay para sa mga bug at mga paghiling ng katangian.
Bago mag-ulat ng isang bug, pakiusap subukang gawin ulit ang iyong isyu laban sa pinakabagong  bersyon ng Electron.
-Kung kailangan mo ng pangkalahatang mungkahi, sumali ka sa aming Slack: http://atom-slack.herokuapp.com
-->*Bersyon ng Electron:
*Sistemang pang-operasyon:

###Inaasahang paggalaw<!-- Anong sa tingin mo ang dapat mangyari? -->### Aktwal na paggalaw<!-- Ano ba ang aktwal na nangyari? -->### Paano magparami<!--
Ang pinakamahusay na pagkakataon upang madaling masuri ang bug na ito ay ang magbigay ng isang REPOSITORI na maaaring kopyahin at patakbuhin.

Maari mong i-fork ang https://github.com/electron/electron-quick-start at isama ang isang link sa iyong sangay kasama ang mga pagbabago.

Kung magbibigay ka ng URL, mangyaring ilista ang mga utos na kinakailangan upang kopyahin/i-setup/paganahin ang iyong repo e.g.

$ git clone $YOUR_URL -b $BRANCH
$ npm install
$ npm start || electron.

-->```

Kung naniniwala ka na nakshanap ka ng isang bug sa Elektron, pakiusap punan mo ang form na ito sa abot ng iyong makakaya.

Ang dalawang pinakamahahalagang piraso ng impormasyon na kailangan upang masuri ang ulat ay isang paglalarawan ng bug at isang simpleng kaso ng pagsusuri upang muling likhain ito. It is easier to fix a bug if it can be reproduced.

Tingnan ang [Paano makagawa ng isang Minimal, Kumpleto, at Mapapatunayang halimbawa](https://stackoverflow.com/help/mcve).

## Pagta-triage ng isang Ulat ukol sa Bug

Karaniwan ito para sa mga bukas na isyu upang makasali sa diskusyon. Ilan sa mga mag-aambag ay maaaring mayroong ibat-ibang mga opinyon, kabilang ang kung ang paggalaw ay isang bug o katangian. Ang talakayang ito ay bahagi ng proseso at dapat na napanatiling napagtuonan, nakakatulong, at propesyonal.

Ang mga Terse na kasagutan na nagbibigay ng wala sa karagdagang konteksto o ang pagsuporta sa mga detalye ay hindi kapaki-pakinabang o propesyonal. Sa nakararami, ang mga tugong ito ay nakakainis at hindi makaibigan.

Hinihikayat ang mga taga-ambag na lutasin ng magkasama ang mga isyu at tulungan ang isat isa para makagawa ng progreso. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. Sa paggawa nito, madalas naming maaabot ang tamang kinalalabasan sa mas mabilis na paraan.

## Paglulutas ng isang Ulat ukol sa Bug

Karamihan sa mga isyu ay nalulutas sa pamamagitan ng pagbukas ng isang pull request. Ang proseso sa pagbukas at pagsusuri sa isang pull request ay kapareho ng pagbukas at pag-triage ng mga isyu, pero nagdadala ito ng mga kainakailangang pagsusuri at pag-apruba na workflow na nagtitiyak na ang ipinanukalang mga pagbabago ay tumutugon sa minimal na kalidad at umiiral na alintuntunin ng proyekto ng Electron.
