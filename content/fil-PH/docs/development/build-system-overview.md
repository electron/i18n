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

If you only want to build Electron quickly for testing or development, you can download the shared library versions by passing the `--dev` parameter:

```sh
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## Dalawang paraan ng Pagbuo ng Proyekto

Ang Elektron ay iniuugnay sa iba't-ibang ayos ng libraries sa pagbuo ng `Release` at `Debug`. gayunpaman, ang `gyp` ay hindi sumusuporta sa pag-ayos ng iba't-ibang naka-ugnay sa settings para sa iba't-ibang kumpigurasyon.

Para sa pagtakbo, ang Elektron ay gumagamit ng `gyp` variable `libchromiumcontent_component` upang malimitahan kung anong link settings ang maaaring gamitin at bubuo sa isang Itinatangi nito kung ito'y gagana sa `gyp`.

## Mga Itinatanging Pangalan

Di katulad ng karamihan sa proyekto na gumagamit ng `Release` at `Debug` bilang mga tinatanging pangalan, sa halip, ang Elektron ay gumagamit ng `R` ay `D`. Ito ay sa kadahilanang kapag ang `gyp` ay biglaang bumagsak sa pagbuo ng kahit aliman sa `Release` o `Debug` na tinukoy sa kumpigurasyon, a1ng Elektron ay maaari lamang bumuo ng isang itinatangi sa oras na itinakda ayon sa nakasaad sa itaas.

This only affects developers, if you are building Electron for rebranding you are not affected.

## Mga Pagsusuri

Suriin ang mga pagbabago ayon sa code ng istilo ng proyekto na iyong gagamitin:

```sh
$ npm run lint
```

Subukan kung ito'y gumagana ng maayos gamit ang:

```sh
$ npm test
```

Kapag ika'y nagsagawa ng anumang pagbabago sa source code ng Electron, kinakailangan mong muling paganahin ang naisagawang pagbabago bago ito suriin:

```sh
$ npm run build && npm test
```

Maaaring pabilis ang paggana nito kung ikaw ay magsasagawa ng bukod na pagsusuri tungkol dito o kaya nama'y maaari ring harangin ang kasalukuyan mong ginagawa gamit ang itinatampok ng Mocha na [exclusive tests](https://mochajs.org/#exclusive-tests). Append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

Maaari mong gamitin ang `grep` ng mocha bilang alternatibo para lamang masubukan kung gagana ang magkatugmang ibinigay na regular expression pattern:

```sh
$ npm test -- --grep child_process
```

Pagsusuri kasama ang mga naunang modyul (hal. `runas`) na hindi maipapakita gamit ang nabuong debug (tingnan ang [#2558](https://github.com/electron/electron/issues/2558) para sa mga detalye), ngunit ito'y mapapagana gamit ang release build.

Para masubukan kung gagana gamit ang release build gamitin ang:

```sh
$ npm test -- -R
```