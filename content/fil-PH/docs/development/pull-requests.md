# Pull Requests

* [Ang pag-set up ng sariling lokal na kapaligiran](#setting-up-your-local-environment) 
  * [Unang hakbang: Fork](#step-1-fork)
  * [Ikalawang hakbang: Bumuo](#step-2-build)
  * [Ikatlong hakbang: Sangay](#step-3-branch)
* [Paggawa ng Pagbabago](#making-changes) 
  * [Ikaapat na hakbang: Code](#step-4-code)
  * [Ikalimang hakbang: Magtapat](#step-5-commit) 
    * [Magsagawa ng mga alituntunin ng mensahe](#commit-message-guidelines)
  * [Ikaanim na hakbang: Rebase](#step-6-rebase)
  * [Ikapitong hakbang: Pagsubok](#step-7-test)
  * [Ikawalong hakbang: Itulak](#step-8-push)
  * [Ikasiyam na hakbang: Pagbukas ng Kahilingan ng Pull](#step-9-opening-the-pull-request)
  * [Ikasampong hakbang: Talakayin at I-update](#step-10-discuss-and-update) 
    * [Pag-apruba at Kahilingan sa Pagbabago ng Workflow](#approval-and-request-changes-workflow)
  * [Ikalabin-isang hakbang: Landing](#step-11-landing)
  * [Patuloy na Pagsubok sa Pagsasamasama](#continuous-integration-testing)

## Ang pag-set up ng sariling lokal na kapaligiran

### Unang hakbang: Fork

Ibunsod ang proyekto [on GitHub](https://github.com/electron/electron) at i-clone ang iyong fork na lokal.

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### Ikalawang hakbang: Bumuo

Gumawa ng mga hakbang at mga dependencies ay bahagyang naiiba na nagdedepende sa iyong operating system. Tingnan ang mga detalyadong gabay sa pagtatayo ng Electron sa isang local:

* [Pagbuo sa MacOS](https://electronjs.org/docs/development/build-instructions-osx)
* [Pagbuo sa Linux](https://electronjs.org/docs/development/build-instructions-linux)
* [Pagbuo sa Windows](https://electronjs.org/docs/development/build-instructions-windows)

Sa sandaling naitayo mo ang proyekto nang lokal, handa ka nang magsimulang gumawa ng mga pagbabago!

### Ikatlong hakbang: Sangay

Upang mapanatili ang iyong kapaligiran sa pag-unlad, lumikha ng mga lokal na sangay at hawakan ang iyong trabaho. Ang mga ito ay dapat na naka direkta sa branched off ng `master` sangay.

```sh
$ git checkout -b my-branch -t upstream/master
```

## Paggawa ng Pagbabago

### Ikaapat na hakbang: Code

Karamihan sa mga hinatak na kahilingan ay binubuksan laban sa `electron/electron` na sisidlan ay kasama ang mga pagbabago sa alinman sa C/C ++ code sa `atom /` o `brightray/` mga folder, ang JavaScript code sa folder na `lib/`, ang dokumentasyon sa `docs/api/` o pagsusulit sa folder na `spec/`.

Siguraduhing magpatakbo ng `npm run lint` mula sa oras-oras sa anumang mga pagbabago sa code upang matiyak na sinusunod nila ang estilo ng code ng proyekto.

Tingnan ang [coding style](https://electronjs.org/docs/development/coding-style) para sa higit pang impormasyon tungkol sa pinakamahusay na kasanayan kapag binabago ang code sa iba't ibang bahagi ng mga proyekto.

### Ikalimang hakbang: Magtapat

Inirerekomenda na panatilihing lohikal ang iyong mga pagbabago sa loob ng indibidwal na gumawa. Maraming taga-ambag na mas madaling suriin ang mga pagbabago na nahati sa maraming mga gumagawa. Walang limitasyon sa bilang ng mga gumagawa sa isang hinahatak na kahilingan.

```sh
$ git add my/changed/files
$ git commit
```

Tandaan na ang maramihang mga gumagawa ay madalas na na-nasquashed kapag sila ay nakarating.

#### Magsagawa ng mga alituntunin ng mensahe

Ang isang mabuting mensahe ng gumawa ay dapat maglarawan kung ano ang nagbago at kung bakit. The Electron project uses [semantic commit messages](https://conventionalcommits.org/) to streamline the release process.

Before a pull request can be merged, it should include at least one semantic commit message, though it's not necessary for all commits in the pull request to be semantic. Alternatively, you can **update your pull request title** to start with a semantic prefix.

Examples of commit messages with semantic prefixes:

* `fix: don't overwrite prevent_default if default wasn't prevented`
* `feat: add app.isPackaged() method`
* `docs: app.isDefaultProtocolClient is now available on Linux`

Common prefixes:

    - fix: A bug fix
    - feat: A new feature
    - docs: Documentation changes
    - test: Adding missing tests or correcting existing tests
    - build: Changes that affect the build system
    - ci: Changes to our CI configuration files and scripts
    - perf: A code change that improves performance
    - refactor: A code change that neither fixes a bug nor adds a feature
    - style: Changes that do not affect the meaning of the code (linting)
    

Other things to keep in mind when writing a commit message:

1. Ang unang linya ay dapat na: 
  * naglalaman ng isang maikling paglalarawan ng pagbabago (mas mabuti na 50 karakter o mas mababa, at hindi hihigit sa 72 na karakter)
  * maging ganap sa lowercase na may pagbubukod ng mga tamang nouns, acronyms, at ang mga salita na tumutukoy sa code, tulad ng mga pangalan ng function / variable
2. Panatilihing blangko ang ikalawang linya.
3. I-wrap ang lahat ng iba pang mga linya sa 72 na mga haligi.

#### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with Major in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

### Ikaanim na hakbang: Rebase

Kapag nakagawa ka ng iyong mga pagbabago, magandang ideya na gamitin ang `git rebase ` (hindi ` git merge `) upang i-synchronize ang iyong trabaho sa pangunahing repository.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

Tinitiyak nito na ang iyong working branch ay may mga pinakabagong pagbabago mula sa ` electron / electron `.

### Ikapitong hakbang: Pagsubok

Ang mga pag-aayos ng bug at mga tampok ay dapat laging may mga pagsubok. A [testing guide](https://electronjs.org/docs/development/testing) ay upang gawing mas madali ang proseso. Naghahanap sa iba pang mga pagsubok upang makita kung paano sila Dapat ay nakabalangkas din ay maaaring makatulong.

Bago isumite ang iyong mga pagbabago sa kahilingan ng pull, laging patakbuhin ang buong test suite. Upang patakbuhin ang mga pagsusulit:

```sh
$ npm run test
```

Tiyaking ang linter ay hindi nag-uulat ng anumang mga isyu at ang lahat ng mga pagsusulit ay pumasa. Mangyaring huwag magsumite ng mga patch na nabigo sa alinman na mga check.

If you are updating tests and want to run a single spec to check it:

```sh
$ npm run test -match=menu
```

Ang mga nasa itaas ay tatakbo lamang sa pagsasapalaran na tumutugma sa ` menu `, na kapaki-pakinabang para sa sinuman na nagtatrabaho sa mga pagsubok na kung hindi man ay sa dulo ng ang ikot ng pagsubok.

### Ikawalong hakbang: Itulak

Kapag ang iyong mga gawa ay handa na upang pumunta - sa paglipas ng mga pagsubok at linting - simulan ang proseso ng pagbubukas ng paghiling ng pull sa pamamagitan ng pagtulak sa iyong working branch sa iyong tinidor sa GitHub.

```sh
$ git push origin my-branch
```

### Ikasiyam na hakbang: Pagbukas ng Kahilingan ng Pull

Mula sa loob ng GitHub, ang pagbubukas ng isang bagong kahilingan sa pull request ay magpapakita sa iyo ng isang template na dapat mapunan:

```markdown
<!--
Salamat sa iyong kahilingan sa pull. Mangyaring magbigay ng isang paglalarawan sa itaas at repasuhin
ang mga kinakailangan sa ibaba.

Ang mga pag-aayos ng bug at mga bagong tampok ay dapat na magsama ng mga pagsubok at posibleng mga benchmark.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### Ikasampung hakbang: Talakayin at i-update

Marahil ay makakakuha ka ng feedback o mga kahilingan para sa mga pagbabago sa iyong pull request. Ito ay isang malaking bahagi ng proseso ng pagsumite kaya huwag masiraan ng loob! Ang ilang mga kontribyutor ay maaaring mag-sign off sa pull request kaagad. Ang iba ay maaaring magkaroon ng detalyadong mga komento o puna. Ito ay isang mahalagang bahagi ng proseso upang suriin kung ang mga pagbabago ay tama at kinakailangan.

Upang gumawa ng mga pagbabago sa isang umiiral na pull request, gawin ang mga pagbabago sa iyong lokal na sangay, magdagdag ng bagong gumawa sa mga pagbabagong iyon, at itulak ang mga ito sa iyong fork. Awtomatikong i-update ng GitHub ang pull request.

```sh
$ git idagdag ang akin /nabago/mga file
$ git commit
$ git push origin my-branch
```

Mayroong isang bilang ng mga mas advanced na mekanismo para sa pamamahala ng gumawa ng paggamit `git rebase` na maaaring magamit, ngunit hindi lampas sa saklaw ng patnubay na ito.

Huwag mag-post ng komento sa kahilingan ng pull upang i-ping ang mga reviewer kung ikaw ay naghihintay ng isang sagot sa isang bagay. Kung nakatagpo ka ng mga salita o mga acronym na tila hindi pamilyar, sumangguni sa [glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### Pag-apruba at Kahilingan sa Pagbabago ng Workflow

Kinakailangan ang lahat ng mga kahilingan sa pag-apruba mula sa [Code Owner](https://github.com/orgs/electron/teams/code-owners) ng lugar mo binago upang makarating. Satuwing isang reviewer sinusuri ang pull request nila maaaring humiling ng mga pagbabago. Ang mga ito ay maaaring maliit, tulad ng pag-aayos ng isang typo, o maaaring kasangkot sa substantibong mga pagbabago. Ang ganitong mga kahilingan ay inilaan upang maging kapaki-pakinabang, ngunit kung minsan ay maaaring dumating sa kabuuan bilang bigla o walang tulong, lalo na kung hindi nila isama mga kongkretong mungkahi sa *how* upang baguhin ang mga ito.

Subukan na huwag mawalan ng pag-asa. Kung sa palagay mo ay hindi makatarungan ang pagrepaso, sabihin ito o humingi ang input ng isa pang kontribyutor ng proyekto. Kadalasan ang mga ganitong mga komento ay resulta ng ang isang tagasuri ay nagsasagawa ng hindi sapat na oras upang repasuhin at hindi masasadya. Ang ganitong mga problema ay maaaring madalas na malutas na may kaunting pasensya. Na sinabi, Ang mga tagasuri ay dapat na inaasahan na magbigay ng kapaki-pakinabang na pag-uumpisa.

### Ikalabin-isang hakbang: Landing

Upang makarating, isang pull request ang kailangang suriin at maaprubahan ng hindi bababa sa isang May-ari ng Electron Code at pumasa sa CI. Pagkatapos nito, kung walang mga pagtutol mula sa iba pang mga taga-ambag, ang kahilingan ng pull ay maaaring pagsama.

Binabati kita at salamat sa iyong kontribusyon!

### Patuloy na Pagsubok sa Pagsasamasama

Ang bawat pull request ay nasubok sa patuloy na Integrasyon (CI) na sistema kumpirmahin na gumagana ito sa mga suportadong platform ng Electron.

Sa isip, ang kahilingan ng pull ay lilipas ("maging berde") sa lahat ng mga platform ng CI. Nangangahulugan ito na ang lahat ng mga pagsusulit ay pumasa at walang mga pagkakamali. Gayunpaman, ito ay hindi bihira para sa imprastraktura ng CI mismo upang mabigo sa tiyak na platform o para sa mga tinatawag na "flaky" na pagsusulit upang mabigo ("maging pula"). Ang bawat CI Ang kabiguan ay dapat manu-manong sinuri upang matukoy ang dahilan.

Ang CI ay awtomatikong nagsisimula kapag binuksan mo ang kahilingan ng pull, ngunit lamang [Releasers ](https://github.com/orgs/electron/teams/releasers/members) maaaring muling simulan ang isang pagpapatakbo ng CI. Kung naniniwala ka na ang CI ay nagbibigay ng maling negatibong, hilingin sa isang Releaser na muling simulan ang mga pagsubok.