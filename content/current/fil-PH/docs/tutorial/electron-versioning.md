# Pagbebersyon ng Electron

> Isang detelyadong pagtanaw sa ating pagbebersyon na mga patakaran at implementasyon.

As of version 2.0.0, Electron follows [semver](#semver). The following command will install the most recent stable build of Electron:

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

There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.

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


Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# Pagpapapanatag ng mga Branch

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Since Electron 8, stabilization branches are always **major** version lines, and named against the following template `$MAJOR-x-y` e.g. `8-x-y`.  Prior to that we used **minor** version lines and named them as `$MAJOR-$MINOR-x` e.g. `2-0-x`

Pumapayag kami sa maramihang pagpapanatag ng mga branches para umiral nang sabay-sabay, at tangkain na suportahan kahit sa dalawang magkahanay sa lahat ng oras, ang pagsasaayos ng seguridad sa pagba-backport na kinakailangan. ![](../images/versioning-sketch-2.png)

Ang mga lumang linya ay hindi suportado ng GitHub, pero pwedeng may ibang grupo na magmamay-ari at magba-backport ng katatagan at seguridad na pwedeng umayos sa kanilang sarili. Hindi namin ito minumungkahi, pero kinikilala namin ito dahil ito'y nagpapadali sa buhat ng maraming app developers.

# Beta Releases at ang pagsasaayos ng Bug

Gustong malaman ng mga developers kung aling release ang mga _ligtas_ gamitin. Kahit mga bagong tampok ay tila maaaring ipakilala ang pagbabalik sa mga kumplikadong applications. Kasabay nito, ang pagla-lock sa isang permanenteng bersyon ay delikado dahil ikaw ay nagbabalewala sa seguridad ng patches at pagsasaayos ng bug naa maaring dumating sa iyong bersyon. Ang hangad namin ay upang payagan ang mga sumusunod na pamantayan ng semver na saklaw ng `package.json` :

* Gumamit ng `~2.0.0` para aminin lamang ang katatagan o seguridad katulad ng pagsasaayos sa `2.0.0` na release.
* Gumamit ng `^2.0.0` para aminin ang di paglabag sa _matatag na katwiran_ sa tampok na trabaho pati na rin ang seguridad at pagsasaayos ng mga bug.

Ang importante sa ikalawang punto ay ang mga aplikasyon ay gumagamit ng `^` na dapat paring asahan ang makatuwirang antas ng stabilidad. To accomplish this, semver allows for a _pre-release identifier_ to indicate a particular version is not yet _safe_ or _stable_.

Anuman ang piliin mo, pana-panahon mo pa ring i-bump ang bersyon ng iyong `package.json` para sa mga bagong pagsira ay isang katotohanan sa buhay ng Chromium.

Ang mga sumusunod ay ang proseso:

1. All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. After the first beta, subsequent beta releases must meet all of the following conditions:
    1. The change is backwards API-compatible (deprecations are allowed)
    2. The risk to meeting our stability timeline must be low.
2. If allowed changes need to be made once a release is beta, they are applied and the prerelease tag is incremented, e.g. `2.0.0-beta.2`.
3. If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`. After the first stable, all changes must be backwards-compatible bug or security fixes.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the _patch_ version is incremented e.g. `2.0.1`.

Specifically, the above means:

1. Admitting non-breaking-API changes before Week 3 in the beta cycle is okay, even if those changes have the potential to cause moderate side-affects
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort after Week 3 in the beta cycle is 👎 without a very good reason.

For each major and minor bump, you should expect to see something like the following:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Isang halimbawa ng lifecycle na makikita sa larawan ay:

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* Itinuturi ang beta na _pangkalahatang matatag_ at ito ay inilathala muli bilang di-beta sa ilalim ng `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Ang mga ilang halimbawa kung paano ang iba't-ibang semver na saklaw ay kumukuha sa mga bagong labas:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas
Ang aming istratehiya ay may ilang tradeoffs, na sa ngayon nadarama namin ang aming angkop. Higit sa lahat ang mga bagong tampok sa master ay maaring tumagal bago umabot sa matatag na release line. Kung gusto mong subukan kaagad ang bagong tampok, dapat mong i-build ang Electron ng iyong sarili.

Bilang pagsasaalang-alang sa hinaharap, maari naming ipakilala ang isa o pareho ang mga sumusunod:

* inilabas ng alpha ang maluwag na katatagan na balakid sa mga beta; halimbawa ito'y pinapahintulutan para umamin ang bagong tampok habang ang stabilidad channel ay nasa _alpha_

# Mga tampok na Bandila
Ang mga tampok na bandila ay karaniwang kaugalian sa Chromium, at mahusay na itinatag sa web-development na ecosystem. Sa konteksto ng Electron, ang tampok na bandila o **malambot na branch** ay dapat magkaroon ng sumusunod na katangian:

* it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
* ito'y kumukumpleto sa bahagi ng bago at lumang landas ng kodigo para masuportahan ang bagong tampok na _lumalabag_ sa kontrata ng tampok na bandila
* feature flags are eventually removed after the feature is released

# Mga Commit ng Semantiko

Hangad nating madagdagan ang kalinawan sa lahat ng antas ng proseso sa updeyt at release. Simula sa `2.0.0` kinakailangan natin hilahin ang mga request para umayon sa [Conventional Commits](https://conventionalcommits.org/) spec, na pwedeng ibuod sa sumusunod:

* Commits that would result in a semver **major** bump must start their body with `BREAKING CHANGE:`.
* Ang mga commits na magreresulta sa semver ang **minor** bump ay dapat nagsisimula sa `feat:`.
* Ang mga commits na magreresulta sa semver ang **patch** bump ay dapat nagsisimula sa `fix:`.

* Pumapayag kami sa squashing ng commits, ngunit dapat ang squashed na mensahe ay sumusunod sa format na nasa itaas.
* It is acceptable for some commits in a pull request to not include a semantic prefix, as long as the pull request title contains a meaningful encompassing semantic message.

# Versioned `master`

- The `master` branch will always contain the next major version `X.0.0-nightly.DATE` in its `package.json`
- Ang mga release na branch ay hindi maaring isama ulit sa master
- Ang mga release branches _ba_ay may laman nang tamang bersyon sa kanilang `package.json`
- As soon as a release branch is cut for a major, master must be bumped to the next major.  I.e. `master` is always versioned as the next theoretical release branch
