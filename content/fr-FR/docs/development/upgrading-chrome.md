# Mettre à jour Chrome

Ce document est destiné à servir de vue d'ensemble des étapes à suivre pour chaque mises à jour de Chrome dans Electron.

Ce sont des choses à faire en plus de mettre à jour le code d'Electron pour toutes modification des API de Chrome/Node.

- Verify the new Chrome version is available from https://github.com/zcbenz/chromium-source-tarball/releases
- Update the `VERSION` file at the root of the `electron/libchromiumcontent` repository
- Update the `CLANG_REVISION` in `script/update-clang.sh` to match the version Chrome is using in `libchromiumcontent/src/tools/clang/scripts/update.py`
- Upgrade `vendor/node` to the Node release that corresponds to the v8 version being used in the new Chrome release. See the v8 versions in Node on https://nodejs.org/en/download/releases for more details
- Upgrade `vendor/crashpad` for any crash reporter changes needed
- Upgrade `vendor/depot_tools` for any build tools changes needed
- Update the `libchromiumcontent` SHA-1 to download in `script/lib/config.py`
- Open a pull request on `electron/libchromiumcontent` with the changes
- Open a pull request on `electron/brightray` with the changes 
  - This should include upgrading the `vendor/libchromiumcontent` submodule
- Open a pull request on `electron/electron` with the changes 
  - This should include upgrading the submodules in `vendor/` as needed
- Verify debug builds succeed on: 
  - macOS
  - 32-bit Windows
  - 64-bit Window
  - 32-bit Linux
  - 64-bit Linux
  - ARM Linux
- Verify release builds succeed on: 
  - macOS
  - 32-bit Windows
  - 64-bit Window
  - 32-bit Linux
  - 64-bit Linux
  - ARM Linux
- Verify tests pass on: 
  - macOS
  - 32-bit Windows
  - 64-bit Window
  - 32-bit Linux
  - 64-bit Linux
  - ARM Linux

## Vérifier la prise en charge de ffmpeg

Electron est livré avec une version de `ffmpeg` qui inclut des codecs propriétaires par défaut. Une version sans ces codecs est construite et distribuée à chaque nouvelle version. Each Chrome upgrade should verify that switching this version is still supported.

Vous pouvez vérifier le support d'Electron pour plusieurs compilations `ffmpeg` en chargeant la page suivante. Il devrait fonctionner avec la bibliothèque `ffmpeg` par défaut distribuée avec Electron et ne fonctionnera pas avec la bibliothèque `ffmpeg` construite sans codecs propriétaires.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Verification des codecs propriétaires</title>
  </head>
  <body>
    <p>Vérifie si Electron utilise des codecs propriétaires en chargeant la vidéo : http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p>
    <p id="outcome"></p>
    <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video>
    <script>
      const video = document.querySelector('video')
      video.addEventListener('error', ({target}) => {
        if (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          document.querySelector('#outcome').textContent = 'N'utilise pas de codecs propriétaires, source d'émission vidéo non prise en charge.'
        } else {
          document.querySelector('#outcome').textContent = `Erreur non expectée: ${target.error.code}`
        }
      })
      video.addEventListener('playing', () => {
        document.querySelector('#outcome').textContent = 'À l'aide de codecs propriétaires, la vidéo a commencé la lecture.'
      })
    </script>
  </body>
</html>
```

## Liens

- [Calendrier des mises à jour Chrome](https://www.chromium.org/developers/calendar)