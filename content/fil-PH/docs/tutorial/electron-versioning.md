# Pagbebersyon ng Electron

> Isang detelyadong pagtanaw sa ating pagbebersyon na mga patakaran at implementasyon.

Sa ngayon ang bersyon ng 2.0.0, Electron ay sumusunod sa [semver](#semver). Ang mga sumusunod na command ay mag-iinstall ng mga pinakabago at matatag na build ng Electron:

```sh
npm install --save-dev electron
```

Upang maka-update ng umiiral na proyekto para makagamit sa matatag at pinakabagong bersyon:

```sh
npm install --save-dev electron@latest
```

## Bersyon 1.x

Electron versions *< 2.0* did not conform to the [semver](http://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. Madali lang para sa mga developers ang pagsasama ng mga katangian, ngunit ito'y nagbibigay ng porblema sa mga developer ng client-facing na mga aplikasyon. Ang pagsusuri sa QA ng mga pangunahing aplikasyon gaya ng Slack, Stride, Teams, Skype, VS Code, Atom, at Desktop ay maaring napakahaba at ang katatagan ay isang tanging hinahangad na resulta. Ngunit mayroong napakapanganib na resulta sa paggamit ng mga bagong katangian para maresolba ng mga bugs na problema.

Isang halimbawa ng 1.x na istratehiya ay:

![](../images/versioning-sketch-0.png)

Ang app na binuo sa `1.8.1` ay hindi makukuha sa `1.8.3` pagsasaayos ng mga bugs na hindi gumagamit ng `1.8.2` na katangian, o sa pagba-backport ng pagsasaayos at pagpapanatili sa linya ng mga bagong labas.

## Bersyon 2.0 at Pataas

May mga ilang malaking pagbabago mula sa ating 1.x na stratehiya na nakabalangkas sa ibaba. Bawat pagbabago ay dapat matugunan ang mga pangangailangan at prayoridad ng mga taga-likha o taga-maintain at sa mga tagalikha ng mga aplikasyon.

1. Striktong paggamit ng semver
2. Pambungad ng semver-compliant `-beta` tags
3. Pambungad sa [conventional commit messages](https://conventionalcommits.org/)
4. Well-defined stabilization branches
5. The `master` branch is versionless; only stabilization branches contain version information

Tatalakayin natin bawat detalye kung paano gumagana ang git branching, pati ang nmp tagging, at kung ano ang aasahang makikita ng mga developers, at kung paano ka makapagbabago ng backport.

# semver

Mula sa 2.0 pataas, ang Electron ay sususnod sa semver.

Ang nasa ibaba ay isang talahanayan ng iba't-ibang uri ng pagmamapa sa mga pagbabago sa nararapat na kategorya ng semver (hal. Major, Minor, Patch).

| Mga karagdagan sa Major na Bersyon                        | Mga karagdagan sa Minor na Bersyon               | Mga karagdagan sa Patch na Bersyon               |
| --------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| Ang pagpapalit ng API dahil sa pagsisira ng Electron nito | Pagpapalit ng API ng hindi lumalabag sa Electron | Ang electron ay nagsasaayos ng mga bug           |
| Node.js major version updates                             | Node.js minor version updates                    | Node.js patch version updates                    |
| Mga updates sa Chromium version                           |                                                  | pagsasaayos ng may kaugnayan sa chromium patches |

Tandaan na karamihan sa chromium updates ay itinuturing nakakasira. Ang pagsasaayos na pwedeng i-backport ay maaring maging cherry-picked na patches.

# Pagpapapanatag ng mga Branch

Ang pagpapapanatag ng mga branch ay mga branch na tumatakbo kahilera sa master, sa pagkuha lang ng cherry-picked commits na may kinalaman sa seguridad at katatagan. Ang mga branch na ito ay hindi na masasama ulit sa master.

![](../images/versioning-sketch-1.png)

Ang pagpapanatag ng branches ay palaging linya sa bersyon ng alinman sa **major** o **minor**, at may pangalan laban sa mga sumusunod na template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

Pumapayag kami sa maramihang pagpapanatag ng mga branches para umiral nang sabay-sabay, at tangkain na suportahan kahit sa dalawang magkahanay sa lahat ng oras, ang pagsasaayos ng seguridad sa pagba-backport na kinakailangan. ![](../images/versioning-sketch-2.png)

Ang mga lumang linya ay hindi suportado ng GitHub, pero pwedeng may ibang grupo na magmamay-ari at magba-backport ng katatagan at seguridad na pwedeng umayos sa kanilang sarili. Hindi namin ito minumungkahi, pero kinikilala namin ito dahil ito'y nagpapadali sa buhat ng maraming app developers.

# Beta Releases at ang pagsasaayos ng Bug

Gustong malaman ng mga developers kung aling release ang mga *ligtas* gamitin. Kahit mga bagong tampok ay tila maaaring ipakilala ang pagbabalik sa mga kumplikadong applications. Kasabay nito, ang pagla-lock sa isang permanenteng bersyon ay delikado dahil ikaw ay nagbabalewala sa seguridad ng patches at pagsasaayos ng bug naa maaring dumating sa iyong bersyon. Ang hangad namin ay upang payagan ang mga sumusunod na pamantayan ng semver na saklaw ng `package.json` :

- Gumamit ng `~2.0.0` para aminin lamang ang katatagan o seguridad katulad ng pagsasaayos sa `2.0.0` na release.
- Gumamit ng `^2.0.0` para aminin ang di paglabag sa *matatag na katwiran* sa tampok na trabaho pati na rin ang seguridad at pagsasaayos ng mga bug.

Ang importante sa ikalawang punto ay ang mga aplikasyon ay gumagamit ng `^` na dapat paring asahan ang makatuwirang antas ng stabilidad. Para maisakatuparan ito, pinapahintulot ng semver ang *indikasyon sa bagong release* upang ipahiwatig ang isang partikular na bersyon na hindi *ligtas* o *matatag*.

Anuman ang piliin mo, pana-panahon mo pa ring i-bump ang bersyon ng iyong `package.json` para sa mga bagong pagsira ay isang katotohanan sa buhay ng Chromium.

Ang mga sumusunod ay ang proseso:

1. Lahat ng mga bagong release na maliit man o malaki ay nagsisimula sa isang `-beta.N` na tag para sa `N >= 1`. Sa puntong iyon, ang itinakdang tampok ay **naka-kandado**. Inaamin ng linyang tampok na iyon na walang higit pang mga tampok, at naka-focus lamang sa seguridad at estabilidad. hal. `2.0.0-beta.1`.
2. Ang mga pagaayos ng bug, regression at seguridad ng patches ay maaring makapasok. Sa paggawa nito, ang isang bagong beta ay inilabas pataas `N`. hal. `2.0.0-beta.2`
3. Kung ang partikyular na beta release ay *itinuturing pangkalahatan* na matatag, ito ay muling ilalabas bilang isang matatag na katayuan, papalitan lang ang impormasyon ng bersyon.
4. Kung may mga pagsasaayos ng bug o para sa seguridad ng patches na kailangan pang gawin pero ang bagong labas ay matatag na, ang mga ito'y ilalapat at ang *patch* na bersyon ay pinapataas nang naaayon hal. `2.0.1`.

For each major and minor bump, you should expect to see something like the following:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Isang halimbawa ng lifecycle na makikita sa larawan ay:

- Isang bagong labas na branch ang nilikha na may pinakabagong tampok. Ito ay inilathala bilang `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
- A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
- Itinuturi ang beta na *pangkalahatang matatag* at ito ay inilathala muli bilang di-beta sa ilalim ng `2.0.0`. ![](../images/versioning-sketch-5.png)
- Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Ang mga ilang halimbawa kung paano ang iba't-ibang semver na saklaw ay kumukuha sa mga bagong labas:

![](../images/versioning-sketch-7.png)

# Mga nawawalang tampok: Alphas, at Nightly

Ang aming istratehiya ay may ilang tradeoffs, na sa ngayon nadarama namin ang aming angkop. Higit sa lahat ang mga bagong tampok sa master ay maaring tumagal bago umabot sa matatag na release line. Kung gusto mong subukan kaagad ang bagong tampok, dapat mong i-build ang Electron ng iyong sarili.

Bilang pagsasaalang-alang sa hinaharap, maari naming ipakilala ang isa o pareho ang mga sumusunod:

- nightly builds off ng master; ito'y nagpapahintulot sa mga folks para subukan kaagad ang mga bagong tampok at magbigay ng feedback
- inilabas ng alpha ang maluwag na katatagan na balakid sa mga beta; halimbawa ito'y pinapahintulutan para umamin ang bagong tampok habang ang stabilidad channel ay nasa *alpha*

# Mga tampok na Bandila

Ang mga tampok na bandila ay karaniwang kaugalian sa Chromium, at mahusay na itinatag sa web-development na ecosystem. Sa konteksto ng Electron, ang tampok na bandila o **malambot na branch** ay dapat magkaroon ng sumusunod na katangian:

- it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
- ito'y kumukumpleto sa bahagi ng bago at lumang landas ng kodigo para masuportahan ang bagong tampok na *lumalabag* sa kontrata ng tampok na bandila
- natatanggal agad ang mga tampok na bandila pagkatapos isanib ang ang malambot na branch

Pinagkasundo namin ang flagged code sa aming bersyoning na istratehiya gaya ng sumusunod:

1. hindi namin isinasaalang-alang ang pag-uulit sa feature-flagged code sa stabilidad ng branch; kahit matalino ang paggamit sa mga tampok na bandila ay walang hindi mapanganib
2. maari mong itigil ang API na kontrata sa feature-flagged code na walang pagbu-bump sa malaking bersyon. Dahil hindi umaayon ang flagged-code sa semver

# Mga Commit ng Semantiko

Hangad nating madagdagan ang kalinawan sa lahat ng antas ng proseso sa updeyt at release. Simula sa `2.0.0` kinakailangan natin hilahin ang mga request para umayon sa [Conventional Commits](https://conventionalcommits.org/) spec, na pwedeng ibuod sa sumusunod:

- Ang mga commits na magreresulta sa semver ang **major** bump ay dapat nagsisimula sa `BREAKING CHANGE:`.
- Ang mga commits na magreresulta sa semver ang **minor** bump ay dapat nagsisimula sa `feat:`.
- Ang mga commits na magreresulta sa semver ang **patch** bump ay dapat nagsisimula sa `fix:`.

- Pumapayag kami sa squashing ng commits, ngunit dapat ang squashed na mensahe ay sumusunod sa format na nasa itaas.

- Ito ay katanggap-tanggap para sa ilang commits sa isang pull request upang hindi isama ang semantikong panlapi, hangga't ang commit ay nasa parehong pull request na may makahulugang nakapalibot na semantik na mensahe.

# Walang pagbabago sa bersyon ng `master`

- Ang `master` branch ay palaging naglalaman ng `0.0.0-dev` sa loob ng `package.json`
- Ang mga release na branch ay hindi maaring isama ulit sa master
- Ang mga release branches *ba*ay may laman nang tamang bersyon sa kanilang `package.json`