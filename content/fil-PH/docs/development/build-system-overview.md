# Pagbuo ng Buod ng Sistema

Ang Elektron ay gumagamit ng [gyp](https://gyp.gsrc.io/) para sa makalikha ng proyeko at [ninja](https://ninja-build.org/) para sa pagbuo nito. Ang kumpigurasyon ng proyekto ay maaaring matagpuan sa mga file ng `.gyp` at `.gypi`.

## Mga Files ng Gyp

Ang mga sumusunod na `gyp` file ay naglalaman ng mga pangunahing panuntuan para sa pagbuo ng Elektron:

* Ang `electron.gyp` ay tumutukoy sa kung paano ang Elektron ay binuo gamit ang kanyang sarili.
* Ang `commom.gypi` ay tumutulong upang maisaayos ang pagsasagawa ng kumpigurasyon ng Node upang ito'y mabuo kasama ang Chromium.
* Ang `brightray/brightray.gyp` ay tumutukoy sa kung paano ang <brightray</code> ay nabuo at kung saan ito'y nakapaloob sa mga default configuration para sa pag-uugnay nito sa Chromium.
* Ang `brightray/brightray.gypi` ay kinabibilangan ng pangkalahatang pagsasagawa ng kumpigurasyon patungkol sa pagsasabuo nito.

## Ang Pagbuo ng Bawat Bahagi

Sapagkat ang Chromium ay isang malaking proyekto, ang pag-uugnay nito sa huling yugto ay maaaring magtagal ng ilang minuto na syang dahilan upang ito'y mahirap na maisakatuparan. Upang malutas ang mga ito, ang Chromium ay ipinakilala ang "component build", kung saan ito'y bumubuo ng bawat bahagi na syang sangkap bilang isang hiwalay na shared library na syang nagpapadali at nagpapabilis ng pag-uugnay nito, ngunit maaaring maipagsawalang bahala ang sukat ng file at paggana nito.

Sa Elektron, tayo ay kumukuha ng pinakamadaling paraan: para sa pagbubuo ng `Debug`, ang binary ay naka-ugnay sa isang bersyon ng shared library ng iba't-ibang bahagi ng Chromium para maisakatuparan ang pagpapabilis ng pag-uugnay nito; para sa pagbubuo ng `Release`, ang binary ay kailangang iugnay sa bersyon ng static library, nang sa gayon, maaari tayong makakuha ng pinakamagandang sukat at pagtakbo ng ating binary.

## Minimal na Bootstrapping

Ang lahat ng maaaring buuin sa Chromium na mga binary (`libchromiumcontet`) ay maaaaring makuha kapag ang bootstrat script ay gumagana. Kapag default, ang parehong static libraries at shared libraries ay makukuha at ang dapat na sukat ng file ay sa pagitan ng 800MB at 2GB depende sa platform nito.

Bilang default, ang `libchromiumcontent` ay makukuha galing sa Amazon Web Services. Kung ang `LIBCHROMIUMCONTENT_MIRROR` ay nakaayos bilang environment variable, maaaring makuha mula dito ang bootstrap script. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) ay sumasalamin para sa `libchromiumcontent`. Kung ikaw ay nakakaranas ng mahirap na pagpasok sa AWS, maaaring palitan ang nakuhang address nito sa pamamagitan ng `export LIBCHROMIUMCONTENT_MIRROR=http://7xk3d2.dl1.z0.glb.clouddn.com/`

Kung nais mo lamang mapabilis ang pagbuo ng Elektron upang masubukan o pag-unalarin ito, maaaring kunin ang mga bersyon ng shared library sa pamamagitan ng parameter ng `--dev`:

```sh
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## Dalawang paraan ng Pagbuo ng Proyekto

Ang Elektron ay iniuugnay sa iba't-ibang ayos ng libraries sa pagbuo ng `Release` at `Debug`. `gyp`, however, doesn't support configuring different link settings for different configurations.

To work around this Electron uses a `gyp` variable `libchromiumcontent_component` to control which link settings to use and only generates one target when running `gyp`.

## Target Names

Unlike most projects that use `Release` and `Debug` as target names, Electron uses `R` and `D` instead. This is because `gyp` randomly crashes if there is only one `Release` or `Debug` build configuration defined, and Electron only has to generate one target at a time as stated above.

This only affects developers, if you are just building Electron for rebranding you are not affected.

## Tests

Test your changes conform to the project coding style using:

```sh
$ npm run lint
```

Test functionality using:

```sh
$ npm test
```

Whenever you make changes to Electron source code, you'll need to re-run the build before the tests:

```sh
$ npm run build && npm test
```

You can make the test suite run faster by isolating the specific test or block you're currently working on using Mocha's [exclusive tests](https://mochajs.org/#exclusive-tests) feature. Just append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

Alternatively, you can use mocha's `grep` option to only run tests matching the given regular expression pattern:

```sh
$ npm test -- --grep child_process
```

Tests that include native modules (e.g. `runas`) can't be executed with the debug build (see [#2558](https://github.com/electron/electron/issues/2558) for details), but they will work with the release build.

To run the tests with the release build use:

```sh
$ npm test -- -R
```