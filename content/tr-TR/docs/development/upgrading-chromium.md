# Chromium yükseltme

Bu, Elektron'da Chromium'u yükseltmek için gerekli adımların genel bir tasviridir.

- Libcc'yi yeni bir Chromium sürümüne yükseltin
- Electron kodunu yeni libcc ile uyumlu hale getirin
- Gerekirse Electron bağımlılıklarını (crashpad, NodeJS, etc.) Güncelleyin
- Libcc ve electronun iç yapılarını oluşturun
- Gerekirse Electron dokümanlarını güncelleyin

## `libcc` ürünü yeni bir Chromium sürümüne yükseltin

1. Kodu alın ve projeyi başlatın: 
      sh
      $ git clone git@github.com:electron/libchromiumcontent.git
      $ cd libchromiumcontent
      $ ./script/bootstrap -v

2. Chromium anlık görüntüsünü güncelle 
  - Bir sürüm numarası seçin [OmahaProxy](https://omahaproxy.appspot.com/) ve güncelleme `SÜRÜM` Bu dosya ile 
    - Bu, tarayıcıda manuel olarak OmahaProxy'yi ziyaret ederek veya otomatik olarak yapılabilir:
    - En son kararlı mac sürümü için: `curl -so- https://omahaproxy.appspot.com/mac > VERSION`
    - En yeni win64 beta sürümü için: `curl -so- https://omahaproxy.appspot.com/all | grep "win64,beta" | awk -F, 'NR==1{print $3}' > VERSION`
  - çalıştır `$ ./script/update` 
    - Brew some tea -- this may run for 30m or more.
    - It will probably fail applying patches.
3. Klasör`*.patch` files in the `patches/` and `patches-mas/` düzenleme.
4. (Tercihe bağlı) `komut/güncelleme` yamaları uygular, ancak birden fazla deneme yapılması gerekiyorsa aynı komut dosyasını manuel olarak çalıştırabilirsiniz `güncelle` çağrılar: `$ ./script/apply-patches` 
  - İkinci bir senaryo var, `script/patch.py` that may be useful. Read `./script/patch.py -h` daha fazla bilgi için.
5. Tüm yamalar hatasız uygulandığında derlemeyi çalıştırın 
  - `$ ./script/build`
  - Bazı yamalar Chromium kodu ile uyumlu değilse, Derleme hatalarını düzeltin.
6. When the build succeeds, create a `dist` Electron hakkında 
  - `$ ./script/create-dist  --no_zip` 
    - Libcc repo'nun kökünde bir ` dist /main ` klasörü oluşturacaktır. Electron'u oluşturmak için buna ihtiyacınız olacak.
7. (İsteğe bağlı) Dosyalardan kaynaklanan hatalar varsa komut dosyası içeriğini güncelleyin kaldırıldı veya yeniden adlandırıldı. (`--no_zip` prevents script from create `dist` Arşivler. Bunlar gerekmez.)

## Electron kodunu güncelleyin

1. Kod al: 
      sh
      $ git clone git@github.com:electron/electron.git
      $ cd electron

2. If you have libcc built on your machine in its own repo, tell Electron to use it: 
      sh
      $ ./script/bootstrap.py -v \
        --libcc_source_path <libcc_folder>/src \
        --libcc_shared_library_path <libcc_folder>/shared_library \
        --libcc_static_library_path <libcc_folder>/static_library

3. If you haven't yet built libcc but it's already supposed to be upgraded to a new Chromium, bootstrap Electron as usual `$ ./script/bootstrap.py -v`
  
  - Ensure that libcc submodule (`vendor/libchromiumcontent`) points to the right revision

4. Set `CLANG_REVISION` in `script/update-clang.sh` to match the version Chromium is using.
  
  - Located in `electron/libchromiumcontent/src/tools/clang/scripts/update.py`

5. Checkout Chromium if you haven't already:
  
  - https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py 
    - (Replace the `{VERSION}` placeholder in the url above to the Chromium version libcc uses.)
6. Electron kurmak. 
  - Try to build Debug version first: `$ ./script/build.py -c D`
  - You will need it to run tests
7. Fix compilation and linking errors
8. Ensure that Release build can be built too 
  - `$ ./script/build.py -c R`
  - Often the Release build will have different linking errors that you'll need to fix.
  - Some compilation and linking errors are caused by missing source/object files in the libcc `dist`
9. Update `./script/create-dist` in the libcc repo, recreate a `dist`, and run Electron bootstrap script once again.

### Tips for fixing compilation errors

- Fix build config errors first
- Fix fatal errors first, like missing files and errors related to compiler flags or defines
- Try to identify complex errors as soon as possible. 
  - Ask for help if you're not sure how to fix them
- Disable all Electron features, fix the build, then enable them one by one
- Add more build flags to disable features in build-time.

When a Debug build of Electron succeeds, run the tests: `$ ./script/test.py` Fix the failing tests.

Follow all the steps above to fix Electron code on all supported platforms.

## Updating Crashpad

If there are any compilation errors related to the Crashpad, it probably means you need to update the fork to a newer revision. See [Upgrading Crashpad](https://github.com/electron/electron/tree/master/docs/development/upgrading-crashpad.md) for instructions on how to do that.

## NodeJS güncelleniyor

Upgrade `vendor/node` to the Node release that corresponds to the v8 version used in the new Chromium release. See the v8 versions in Node on

See [Upgrading Node](https://github.com/electron/electron/tree/master/docs/development/upgrading-node.md) for instructions on this.

## Ffmpeg desteği doğrulama

Electron ships with a version of `ffmpeg` that includes proprietary codecs by default. A version without these codecs is built and distributed with each release as well. Each Chrome upgrade should verify that switching this version is still supported.

You can verify Electron's support for multiple `ffmpeg` builds by loading the following page. It should work with the default `ffmpeg` library distributed with Electron and not work with the `ffmpeg` library built without proprietary codecs.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Proprietary Codec Check</title>
  </head>
  <body>
    <p>Checking if Electron is using proprietary codecs by loading video from http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p>
    <p id="outcome"></p>
    <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video>
    <script>
      const video = document.querySelector('video')
      video.addEventListener('error', ({target}) => {
        if (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          document.querySelector('#outcome').textContent = 'Not using proprietary codecs, video emitted source not supported error event.'
        } else {
          document.querySelector('#outcome').textContent = `Unexpected error: ${target.error.code}`
        }
      })
      video.addEventListener('playing', () => {
        document.querySelector('#outcome').textContent = 'Using proprietary codecs, video started playing.'
      })
    </script>
  </body>
</html>
```

## Faydalı bağlantılar

- [Chrome Release Schedule](https://www.chromium.org/developers/calendar)
- [OmahaProxy](http://omahaproxy.appspot.com)
- [Chromium Issue Tracker](https://bugs.chromium.org/p/chromium)