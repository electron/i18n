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

```markdown
<!--
Salamat sa pagbukas ng isang isyu! Ilang mga bagay na dapat tandaan:

- Ang tagagsubaybay sa isyu ay para sa mga bug at mga paghiling ng katangian.
Bago mag-ulat ng isang bug, pakiusap subukang gawin ulit ang iyong isyu laban sa pinakabagong  bersyon ng Electron.
-Kung kailangan mo ng pangkalahatang mungkahi, sumali ka sa aming Slack: http://atom-slack.herokuapp.com
-->

*Bersyon ng Electron:
*Sistemang pang-operasyon:

###Inaasahang paggalaw

<!-- Anong sa tingin mo ang dapat mangyari? -->

### Aktwal na paggalaw

<!-- Ano ba ang aktwal na nangyari? -->

### Paano magparami

<!--
Ang pinakamahusay na pagkakataon upang madaling masuri ang bug na ito ay ang magbigay ng isang REPOSITORI na maaaring kopyahin at patakbuhin.

Maari mong i-fork ang https://github.com/electron/electron-quick-start at isama ang isang link sa iyong sangay kasama ang mga pagbabago.

Kung magbibigay ka ng URL, mangyaring ilista ang mga utos na kinakailangan upang kopyahin/i-setup/paganahin ang iyong repo e.g.

$ git clone $YOUR_URL -b $BRANCH
$ npm install
$ npm start || electron.

-->
```

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It is easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Pagta-triage ng isang Ulat ukol sa Bug

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Paglulutas ng isang Ulat ukol sa Bug

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.