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
  - paganahin `$ ./script/update` 
    - Magluto ng ilang tsaa - maaaring tumakbo ito nang 30m o higit pa.
    - Maaaring ito ay mabibigo sa pag-aaplay ng mga patch.
3. Ayusin ang `*.patch` mga file na nasa `patches` at `patches-mas/` mga polder.
4. (Opsyonal) `script/update` ay nag-aaplay sa mga patch, ngunit kung kinakailangan ang maraming pagsubok maaari mong manu-manong patakbuhin ang parehong script na `nag-update` sa mga tawag: `$ ./script/apply-patches` 
  - Mayroong pangalawang iskrip, `script/patch.py` na maaaring maging kapaki-pakinabang. Basahin `./script/patch.py -h` para sa karagdagang impormasyon.
5. Patakbuhin ang build kapag ang lahat ng mga patch ay maaaring mailapat nang walang mga error 
  - `$ ./script/build`
  - Kung ang ilang patches ay hindi katugma sa iyong Chromium kowd, ayusing ang mga mali sa paglista.
6. Kapag matagumpay ang build, gumawa ng isang `dist` para sa Electron 
  - `$ ./script/create-dist --no_zip` 
    - Ito ay lilikha ng `dist/main` na folder sa root ng libcc repo. Kakailanganin mo ito upang gumawa ng Electron.
7. (Opsyonal) I-update ang mga nilalaman ng script kung may mga error na nagreresulta mula sa mga file na inalis o pinalitan ng pangalan. (`--no_zip` pinipigilan ang iskrip mula sa create `dist` na mga archive. Hindi mo sila kinakailangan.)

## I-update code ng Electron

1. Kuning ang code: 
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

4. Itakda `CLANG_REVISION` sa `script/update-clang.sh` upang tumugma sa bersyon ginagamit ng Chromium.
  
  - Matatagpuan sa `electron/libchromiumcontent/src/tools/clang/scripts/update.py`

5. Tingnan mo ang Chromium kung d mo pa nagagawa:
  
  - https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py 
    - (Palitan ang `{VERSION}` placeholder na nasa url sa itaas sa Chromium bersyon libbc na ginagamit.)
6. Itayo ang Electron. 
  - Subukang gumawa ng Debug na bersyon muna: `$ ./script/build.py -c D`
  - Kakailanganin mo itong sa pagpapatakbo ng mga pagsusuri
7. Ayusin ang kompilasyon at naglilink na mga error
8. Siguradihin na ang Release build ay magawa din 
  - `$ ./script/build.py -c R`
  - Kadalasan ang Release build ay magkakaroon ng iba't ibang mga error sa pag-uugnay na kinakailangan mong ayusin.
  - Ang ilang mga kompilasyon at nalilink na mga error ay sanhi ng nawawalang pinagmulan / bagay na mga file sa libcc `dist`
9. I-update `./script/create-dist` sa libcc repo, gumawa muli ng `dist`, at patakbuhin ang Electron Bootstrap na iskrip muli.

### Mga mungkahi para sa pag-aayos ng mga error sa kompilasyon

- Ayusin ang Build config na mga mali muna
- Ayusin muna ang grabeng na mga error, tulad ng nawawalang mga file at mga error na may kaugnayan sa tagatala na flag o mga takda
- Subukang kilalanin ang mga kumplikadong mga error sa lalong madaling panahon. 
  - Humingi ng tulong kung hindi ka sigurado kung paano ayusin ang mga ito
- Huwag paganahin ang lahat ng mga tampok ng Electron, ayusin ang build, pagkatapos paganahin ang mga ito ng isa-isa
- Magdagdag pa ng mga flags ng build upang huwag paganahin ang mga tampok sa build-time.

When a Debug build of Electron succeeds, run the tests: `$ npm run test` Fix the failing tests.

Sundin ang lahat ng mga hakbang sa itaas upang ayusin ang Electron kowd sa lahat ng mga sinusuportahang plataporma.

## Pag-a-update sa Crashpad

Kung mayroong anumang mga error sa kompilasyon na may kaugnayan sa Crashpad, marahil ay nangangahulugan ito na kailangan mong i-update ang fork sa isang mas bagong rebisyon. Tingnan ang [pag-upgrade ng Crashpad](upgrading-crashpad.md) para sa mga instruksiyon kung paano gawin iyon.

## Pag-update ng NodeJS

I-upgrade `vendor/node` sa release ng Node na tumutugon sa v8 na bersyon na ginamit sa bagong paglabas ng Chromium. Tingnan ang v8 na bersyon sa Node on

Tingnan [pag-upgrade ng Node](upgrading-node.md) para sa mga instruksiyon tungkol dito.

## I-verify ang suporta ng ffmpeg

Electron ships na may bersyon ng `ffmpeg` kabilang dito ang proprietary codecs sa pamamagitan ng default. Ang isang bersyon na walang mga codec na ito ay binuo at ipinamamahagi sa bawat release din. Dapat i-verify ng bawat pag-upgrade ng Chrome na ang paglipat sa bersyong ito ay sinusuportahan pa rin.

Maaaari mong i-verify ang suporta ng Electron para sa maramihang `ffmpeg` na mga build sa pamamagitan ng paglo-load ng sumusunod na pahina. Dapat itong gumana sa default na `ffmpeg` na library ni ipinamamahagi ng Electron at hindi gumagana sa `ffmpeg` ang library na itinayo nang walang proprietary codecs.

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
      video.addEventListener('error', ({ target }) => {
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

## Mga kapakipakinabang na link

- [Iskedyul ng Chrome na Lathala](https://www.chromium.org/developers/calendar)
- [OmahaProxy](http://omahaproxy.appspot.com)
- [Tagasubaybay ng Isyu ng Chromium](https://bugs.chromium.org/p/chromium)