# Mettre à jour Chrome

Ce document est destiné à servir de vue d'ensemble des étapes à suivre pour chaque mises à jour de Chrome dans Electron.

Ce sont des choses à faire en plus de mettre à jour le code d'Electron pour toutes modification des API de Chrome/Node.

- Vérifiez que la nouvelle version de Chrome est disponible : https://github.com/zcbenz/chromium-source-tarball/releases
- Mettre à jour la `VERSION` du fichier à la racine de `electron/libchromiumcontent`
- Mettre à jour la `CLANG_REVISION` dans `script/update-clang.sh` à la version qu'utilise Chrome dans `libchromiumcontent/src/tools/clang/scripts/update.py`
- Mettre à jour `vendor/node` à la version de Node qui correspond à la version v8 utilisée dans la nouvelle version de Chrome. Voir les versions v8 dans Node sur https://nodejs.org/en/download/releases pour plus de détails
- Mettre à jour `vendor/crashpad` pour tout changement du rapporteur de crash nécessaire
- Mettre à jour `vendor/depot_tools` pour tout changement des outils de build nécessaire
- Mettre à jour le `libchromiumcontent` SHA-1 à télécharger dans `script/lib/config.py`
- Ouvrez une pull request dans `electron/libchromiumcontent` avec les modifications
- Ouvrez une pull request dans `electron/brightray` avec les modifications 
  - Cela devrait inclure la mise à niveau du sous-module `vendor/libchromiumcontent`
- Ouvrez une pull request dans `electron/electron` avec les modifications 
  - Cela devrait inclure la mise à niveau des sous-modules dans `vendor/` au besoin
- Vérifiez que les version de debug réussissent sur : 
  - macOS
  - Windows 32 bits
  - Windows 64 bits
  - Linux 32 bits
  - Linux 64 bits
  - ARM Linux
- Vérifiez que les versions de release réussissent sur : 
  - macOS
  - Windows 32 bits
  - Windows 64 bits
  - Linux 32 bits
  - Linux 64 bits
  - ARM Linux
- Vérifiez que les tests passent sur : 
  - macOS
  - Windows 32 bits
  - Windows 64 bits
  - Linux 32 bits
  - Linux 64 bits
  - ARM Linux

## Vérifier la prise en charge de ffmpeg

Electron est livré avec une version de `ffmpeg` qui inclut des codecs propriétaires par défaut. Une version sans ces codecs est construite et distribuée à chaque nouvelle version. Chaque mise à jour de Chrome devrait vérifier que la modification de cette version est toujours prise en charge.

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