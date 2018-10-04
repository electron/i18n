# Paglalabas

Ang dokumentong ito ay nagpapakita ng proseso ng pagpapalabas ng isang bagong bersyon ng Electron.

## Set your tokens and environment variables

You'll need Electron S3 credentials in order to create and upload an Electron release. Contact a team member for more information.

There are a handful of `*_TOKEN` environment variables needed by the release scripts:

- `ELECTRON_GITHUB_TOKEN`: Create this by visiting https://github.com/settings/tokens/new?scopes=repo
- `APPVEYOR_TOKEN`: Create a token from https://windows-ci.electronjs.org/api-token If you don't have an account, ask a team member to add you.
- `CIRCLE_TOKEN`: Create a token from "Personal API Tokens" at https://circleci.com/account/api
- `VSTS_TOKEN`: Create a Personal Access Token at https://github.visualstudio.com/_usersSettings/tokens or https://github.visualstudio.com/_details/security/tokens with the scope of `Build (read and execute)`.
- `ELECTRON_S3_BUCKET`:
- `ELECTRON_S3_ACCESS_KEY`:
- `ELECTRON_S3_SECRET_KEY`: If you don't have these, ask a team member to help you.

Once you've generated these tokens, put them in a `.env` file in the root directory of the project. This file is gitignored, and will be loaded into the environment by the release scripts.

## Alamin kung mula sa aling sangay maglalabas

- **Kapag naglalabas ng isang beta,** paganahin ang skrip sa ibaba mula sa `master`.
- **If releasing a stable version,** run the scripts below from the branch you're stabilizing.

## Alamin kung anong pagbabago sa bersyon ang kinakailangan

Paganahin ang `npm run prepare-release -- --notesOnly` para makita ang awtomatikong nalikhang mga kopya sa paglalabas. Ang mga kopyang nabuo ay makakatulong upang matukoy kung ito ay major, minor, patch, o kaya beta na pagbabago ng bersyon. Basahin ang [Mga Patakaran sa Pagbabago ng Bersyon](../tutorial/electron-versioning.md#semver) para sa karagdagang impormasyon.

**NB:** If releasing from a branch, e.g. 1-8-x, check out the branch with `git checkout 1-8-x` rather than `git checkout -b remotes/origin/1-8-x`. The scripts need `git rev-parse --abbrev-ref HEAD` to return a short name, e.g. no `remotes/origin/`

## Paganahing ang prepare-release na skrip

Ang prepare release na skrip ay gagawin ang mga sumusunod: 1. Tingnan ang isang lathala kung nasa proseso na at kung ganon ito ay ihinto na. 2. Gumawa ng isang panglathalang sangay. 3. Ibangga ang numero ng bersyon sa maraming mga file. Tingnan ang [bump commit na ito](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) bilang isang halimbawa. 4. Gumawa ng isang draft na lathala sa GitHub kasama ang mga awtomatikong nalikhang mga kopya ng lathala. 5. Itulak ang panlathalang sangay. 6. Tawagin ang mga API para paganahin ang mga panlathalang build.

Kung natukoy mo na kung aling uri ng bersyon ang kailangang baguhin, paganahin ang `prepare-release` na skripkasama ang mga argumento ayon sa iyong pangangailangan: - `[major|minor|patch|beta]` upang iangat ang isa sa mga numero ng bersyon, o - `--stable` upang ipahiwatig na ito ay isang matatag ang bersyon

Halimbawa:

### Pangunahing pagbabago sa bersyon

```sh
npm run prepare-release -- major
```

### Menor na pagbabago sa bersyon

```sh
npm run prepare-release -- minor
```

### Patch na pagbabago sa bersyon

```sh
npm run prepare-release -- patch --stable
```

### Beta na pagbabago sa bersyon

```sh
npm run prepare-release -- beta
```

### Iangat mula beta papuntang stable

```sh
npm run prepare-release -- --stable
```

Tip: You can test the new version number before running `prepare-release` with a dry run of the `bump-version` script with the same major/minor/patch/beta arguments, e.g.:

```sh
$ ./script/bump-version.py --bump minor --dry-run
```

## Hintayin ang mga build :hourglass_flowing_sand:

Ang `prepare-release` na skrip ay magti-trigger sa mga build sa pamamagitan ng mga API na tawag. Upang masubaybayan ang estado ng pagbubuo, tingnan ang mga sumusunod na pahina:

- [electron-release-mas-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=19&_a=completed) for MAS builds.
- [electron-release-osx-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=18&_a=completed) for OSX builds.
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for Linux builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron-39ng6](https://windows-ci.electronjs.org/project/AppVeyor/electron-39ng6) for Windows 32-bit builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) for Windows 64-bit builds.

## Tipunin ang mga kopya ng lathala

Ang pagsulat ng mga panlathalang kopya ay isang paraan upang mapanatiling abala ang iyong sarili habang tumatakbo ang mga build. Para sa naunang sining, tingnan ang mga naunang lathala sa [pahina ng mga lathala](https://github.com/electron/electron/releases).

Mga Mungkahi: - Ang bawat aytem na nakalista na ay kinakailangang isangguni sa isang PR sa electron/electron, hindi isang isyu, at hind rin PR na galing sa ibang repo katulad ng libcc. - Hindi na kailangang gamitin ang link na markup nagsasangguni ng mga PR. Ang mga string na kagaya ng `#123` ay awtomatikong isasalin sa mga link sa github.com. - Upang tingnan ang bersyon ng Chromioum, V8 at Node sa kada bersyon ng Electron, bisitahin ang [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Ang mga Patch na lathala

Para sa isang `patch` na lathala, gumamit ng mga sumusunod na pormat:

```sh
# # Kaayusan sa Bug 

* Naayos na ang isang cross-platform na bagay. #123

### Linux

* Naayos na isang Linux na bagay. #123

### macOS

* Naayos na ang isang macOS na bagay. #123

###Windows

* Naayos na ang isang Windows na bagay. #1234
```

### Mga Menor na Lathala

Para sa `menor` na lathala, e.g. `1.8.0`, gamitin ang pormat na ito:

```sh
## Mga Upgrade

- Na-upgrade mula sa Node na`oldVersion' patungo sa 'newVersion'. #123 

## Mga pagbabago sa API 

* Nabago ang isang bagay. #123

### Linux

* Nabago ang isang Linux na bagay. #123

### macOS

* Nabago ang isang macOS bagay. #123

### Windows

* Nabago ang isang Windows na bagay. #123
```

### Mga Pangunahing Lathala

```sh
## Mga Upgrade

- Na upgrade mula sa Chromium na 'oldVersion' patungo sa 'newVersion'. #123
- Na-upgrade mula sa Node na`oldVersion' patungo sa 'newVersion'. #123 

## Paghahati sa mga API na pagbabago

* Nabago ang isang bagay. #123

### Linux

* Nabago ang isang Linux na bagay. #123

### macOS

* Nabago ang isang macOS bagay. #123

### Windows

* Nabago ang isang Windows na bagay. #123

## Iba pang mga pagbabago 

- Ilang pang pagbabago. #123
```

### Beta na mga lathala

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

```sh
**Note:** This is a beta release and most likely will have have some
instability and/or regressions.

Mangyaring mag-file ng bagong isyu para sa anumang bug na makikita mo dito.

This release is published to [npm](https://www.npmjs.com/package/electron)
under the `beta` tag and can be installed via `npm install electron@beta`.
```

## Baguhin ang draft ng lathala

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. Baguhin ang lathala at magdagdag ng mga kopya ng lathala.
3. Pindutin ang 'Save draft'. **Huwag pindutin ang 'Publish release'!**
4. Hintayin ang lahat ng build na pumasa bago magpatuloy.
5. In the branch, verify that the release's files have been created:

```sh
$ npm run release -- --validateRelease
```

Note, if you need to run `--validateRelease` more than once to check the assets, run it as above the first time, then `node ./script/release.js --validateRelease` for subsequent calls so that you don't have to rebuild each time you want to check the assets.

## Ilathala ang release

Kapag ang pagsasama ay matagumpay na natapos. paganahin ang `release` script sa pamamagitan ng `npm run release` upang tapusin ang proseso ng release. Ang iskrip na ito ay gagawin ang mga sumusunod: 1. Gumawa ng proyekto para patunayan na tama ang numero ng bersyon na nailabas na. 2. I-download ang mga binary at lumikha ng mga node header at ang .lib na linker na ginamit sa Windows sa pamamagitan ng node-gyp para mabuo ang mga native na modyul. 3. Gumawa at i-upload ang SHASUMS files na nakatabi sa S3 para sa node files. 4. Gumawa at i-upload ang SHASUMS256.txt file na nakatabi sa GitHub release. 5. Patunayan na ang lahat ng kinakailangang mga file na ay nasa GitHub at S3 at may mga tamang checksum gaya ng tinutukoy sa SHASUMS na mga file. 6. Ilathala ang release sa GitHub

## Ilathala sa npm

Before publishing to npm, you'll need to log into npm as Electron. Optionally, you may find [npmrc](https://www.npmjs.com/package/npmrc) to be a useful way to keep Electron's profile side-by-side with your own:

```sh
$ sudo npm install -g npmrc
$ npmrc -c electron
Removing old .npmrc (default)
Activating .npmrc "electron"
```

The Electron account's credentials are kept by GitHub in a password manager. You'll also need to have access to an 2FA authenticator app with the appropriate OTP generator code to log in.

```sh
$ npm login
Username: electron-nightly
Password: <This can be found under NPM Electron Nightly on LastPass>
Email: (this IS public) electron@github.com
```

Publish the release to npm. Before running this you'll need to have set `ELECTRON_NPM_OTP` as an environment variable using a code from the aforementioned 2FA authenticator app.

```sh
$ npm whoami
electron-nightly
$ npm run publish-to-npm
```

After publishing, you can check the `latest` release:

```sh
$ npm dist-tag ls electron
```

If for some reason `npm run publish-to-npm` fails, you can tag the release manually:

```sh
$ npm dist-tag add electron@<version> <tag>
```

e.g.:

```sh
$ npm dist-tag add electron@2.0.0 latest
```

# Paghahanap ng ProblemaPaghahanap ng Problema

## Rerun broken builds

If a release build fails for some reason, you can use `script/ci-release-build.js` to rerun a release build:

### Rerun all linux builds:

```sh
node script/ci-release-build.js --ci=CircleCI --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

### Rerun all macOS builds:

```sh
node script/ci-release-build.js --ci=VSTS --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

### Rerun all Windows builds:

```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

Additionally you can pass a job name to the script to run an individual job, eg:

```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease --job=electron-x64 TARGET_BRANCH
```

## Ayusin ang mga nawawalang binary ng isang lathala nang mano-mano

Sa kaso ng isang nasirang release na may sirang CI na mga makina, maaari nating muling i-upload ang mga binary para sa isang nailathalang release.

Ang unang hakbang ay pumunta sa [Mga Lathala](https://github.com/electron/electron/releases) na pahina at tanggalin ang nasirang mga binary kasama ang `SHASUMS256.txt` na checksum file.

Pagkatapos ay manu-manong gawin ang distribusyon para sa bawat plataporma at i-upload ang mga ito:

```sh
# Tingnan ang bersyon na muling i-upload.
git checkout vX.Y.Z

# Create release build
gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"

# To compile for specific arch, instead set
gn gen out/Release-<TARGET_ARCH> --args='import(\"//electron/build/args/release.gn\") target_cpu = "[arm|x64|ia32]"'

# Build by running ninja with the electron target
ninja -C out/Release electron
ninja -C out/Release electron:dist_zip

# Explicitly allow overwriting a published release.
./script/upload.py --overwrite
```

Allowable values for [target_cpu](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values) and [target_os](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values).

Matapos muling pag-upload ang lahat distribusyon, ilathala muli upang mag-upload ang checksum:

```sh
npm paganahin ang release
```