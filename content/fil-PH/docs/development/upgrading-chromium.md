# Pagpapaganda ng Chromium

Ito ay isang pangkalahatang-ideya ng mga hakbang na kinakailangan upang maipaganda ang Chromium sa Electron.

- I-upgrade ang libcc sa bagong Chromium bersyon
- Gumawa ng Electron kowd tugma sa bagong libcc
- I-update ang mga dependency ng Electron (crashpad, NodeJS, atbp.) kung kinakailangan
- Gumawa ng panloob na mga build ng libcc at elektron
- I-update ang Electron dokumento kung kinakailangan

## I-upgrade `libcc`sa bagong Chromium bersyon

1. Kuning ang kown at magsimula sa proyekto: 
      sh
      $ git clone git@github.com:electron/libchromiumcontent.git
      $ cd libchromiumcontent
      $ ./script/bootstrap -v

2. I-upgrade ang Chromium sa retrato 
  - Pumili ng numero ng bersyon mula sa [OmahaProxy](https://omahaproxy.appspot.com/) at i-update ang `Bersyon` ng file 
    - Maaari itong gawin nang manu-mano sa pamamagitan ng pagbisita sa OmahaProxy sa isang browser, o awtomatikong:
    - One-liner para sa pinakabagong bersyon ng matibay na mac:`curl -so- https://omahaproxy.appspot.com/mac > Bersyon `
    - One-liner para sa pinakabagong beta version ng win64: `curl -so- https://omahaproxy.appspot.com/all | grep "win64,beta" | awk -F, 'NR==1{print $3}' > Bersyon`
  - tumakbo `$ ./script/update` 
    - Magluto ng ilang tsaa - maaaring tumakbo ito nang 30m o higit pa.
    - Maaaring ito ay mabibigo sa pag-aaplay ng mga patch.
3. Ayusin `*.patch` mga file na nasa `patches` at `patches-mas/` mga polder.
4. (Opsyonal) `script/update` gamitin ang mga patches, ngunit kung kinakailangan ang maraming pagsubok maaari mong manu-manong patakbuhin ang parehong script na iyon `i-update` mga tawag: `$ ./script/apply-patches` 
  - Mayroong pangalawang iskrip, `script/patch.py` na maaaring maging kapaki-pakinabang. Basahin `./script/patch.py -h` para sa karagdagang impormasyon.
5. Patakbuhin ang build kapag ang lahat ng mga patch ay maaaring mailapat nang walang mga error 
  - `$ ./script/build`
  - Kung ang ilang patches ay hindi katugma sa iyong Chromium kowd, ayusing ang mga mali sa paglista.
6. Kapag matagumpay ang build, gumawa ng isang `dist` para sa Electron 
  - `$ ./script/create-dist --no_zip` 
    - Ito ay lilikha ng `dist/main`polder sa root ng libcc repo. Kakailanganin mo ito upang gumawa ng Electron.
7. (Opsyonal) I-update ang mga nilalaman ng script kung may mga error na nagreresulta mula sa mga file na inalis o pinalitan ng pangalan. (`--no_zip` pinipigilan ang iskrip mula sa paglikha `dist` arkibos. Hindi mo ito kinakailangan.)

## I-update Electron's kowd

1. Kuning ang kowd: 
      sh
      $ git clone git@github.com:electron/electron.git
      $ cd electron

2. Kung ikaw ay merong libcc na binuo sa iyong makina sa sarili nitong repo, sabihan ang Electron na gamitin ito: 
      sh
      $ ./script/bootstrap.py -v \
        --libcc_source_path <libcc_folder>/src \
        --libcc_shared_library_path <libcc_folder>/shared_library \
        --libcc_static_library_path <libcc_folder>/static_library

3. Kung hindi ka pa nakagawa ng libcc ngunit dapat na itong ma-upgrade sa isang bagong Chromium, bootstrap Electron gaya ng dati `$ ./script/bootstrap.py -v`
  
  - Tiyakin na ang libcc na submodule (`vendor/libchromiumcontent`) tumugma sa tamang rebisyon

4. Itakda `CLANG_REVISION` sa `script/update-clang.sh` upang tumugma sa bersyon gumamit ng Chromium.
  
  - Matatagpuan sa `electron/libchromiumcontent/src/tools/clang/scripts/update.py`

5. Tingnan mo ang Chromium kung d mo pa nagagawa:
  
  - https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py 
    - (Palitan ang `{VERSION}` placeholder na nasa url sa itaas sa Chromium bersyon libbc na ginagamit.)
6. Gumawa ng Electron. 
  - Subukang gumawa ng Debug bersyon muna: `$ ./script/build.py -c D`
  - Kakailanganin mo itong subukang patakbuhin
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

If there are any compilation errors related to the Crashpad, it probably means you need to update the fork to a newer revision. See [Upgrading Crashpad](upgrading-crashpad.md) for instructions on how to do that.

## Updating NodeJS

Upgrade `vendor/node` to the Node release that corresponds to the v8 version used in the new Chromium release. See the v8 versions in Node on

See [Upgrading Node](upgrading-node.md) for instructions on this.

## Verify ffmpeg support

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

## Useful links

- [Chrome Release Schedule](https://www.chromium.org/developers/calendar)
- [OmahaProxy](http://omahaproxy.appspot.com)
- [Chromium Issue Tracker](https://bugs.chromium.org/p/chromium)