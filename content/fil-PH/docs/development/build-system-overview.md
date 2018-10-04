# Pagbuo ng Buod ng Sistema

Electron uses [GN](https://gn.googlesource.com/gn) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gn` and `.gni` files.

## GN Files

The following `gn` files contain the main rules for building Electron:

* `BUILD.gn` defines how Electron itself is built.
* `brightray/BUILD.gn` defines how `brightray` is built and includes the default configurations for linking with Chromium.
* `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

## Ang Pagbuo ng Bawat Bahagi

Sapagkat ang Chromium ay isang malaking proyekto, ang pag-uugnay nito sa huling yugto ay maaaring magtagal ng ilang minuto na syang dahilan upang ito'y mahirap na maisakatuparan. Upang malutas ang mga ito, ang Chromium ay ipinakilala ang "component build", kung saan ito'y bumubuo ng bawat bahagi na syang sangkap bilang isang hiwalay na shared library na syang nagpapadali at nagpapabilis ng pag-uugnay nito, ngunit maaaring maipagsawalang bahala ang sukat ng file at paggana nito.

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Mga Pagsusuri

**NB** *this section is out of date and contains information that is no longer relevant to the GN-built electron.*

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