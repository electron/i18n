# Mise à jour de liste de contrôle de Chrome

Ce document est destiné à servir à un aperçu de ce que des mesures sont nécessaires sur chaque Chrome mise à niveau en électrons.

Ce sont des choses à faire en outre à mettre à jour le code électronique pour tout changement de Chrome/noeud API.

- Vérifiez que la nouvelle version de Chrome est disponible à https://github.com/zcbenz/chromium-source-tarball/releases
- Mise à jour le fichier `VERSION` à la racine du référentiel `electron/libchromiumcontent`
- Mise à jour de la `CLANG_REVISION` en `script/mise à jour-clang.sh` pour correspondre à la version que Chrome utilise en `libchromiumcontent/src/tools/clang/scripts/update.py`
- Mise à niveau `vendor/node` à la libération de nœud qui correspond à la version v8 utilisée dans la nouvelle version de Chrome. Voir les versions v8 en nœud sur https://nodejs.org/en/download/releases pour plus de détails
- Mise à jour de `vendor/crashpad` pour un crash changements journaliste nécessaires
- Outils de mise à niveau `vendor/depot_tools` pour n’importe quel build changements nécessaires
- Mise à jour le `libchromiumcontent` SHA-1 à télécharger sous `script/lib/config.py`
- Ouvrez une demande de tirer sur les `electron/libchromiumcontent` avec les modifications
- Ouvrez une demande de tirer sur `électronique/brightray` avec les changements 
  - Cela devrait inclure la mise à niveau le sous-module de `vendor/libchromiumcontent`
- Ouvrez une demande de tirer sur `électron/électron` avec les changements 
  - Cela devrait inclure la mise à niveau les sous-modules dans `vendor/` selon les besoins
- Vérifiez les versions debug donne gain de cause : 
  - macOS
  - Windows 32 bits
  - Fenêtre de 64 bits
  - Linux 32 bits
  - Linux 64 bits
  - ARM Linux
- Vérifiez les versions release donne gain de cause : 
  - macOS
  - Windows 32 bits
  - Fenêtre de 64 bits
  - Linux 32 bits
  - Linux 64 bits
  - ARM Linux
- Vérifiez que les tests passent : 
  - macOS
  - Windows 32 bits
  - Fenêtre de 64 bits
  - Linux 32 bits
  - Linux 64 bits
  - ARM Linux

## Vérifier la prise en charge de ffmpeg

Électrons est livré avec une version de `ffmpeg` qui inclut des codecs propriétaires par défaut. Une version sans ces codecs est construite et distribuée à chaque nouvelle version aussi bien. Chaque mise à jour de Chrome doit vérifier que cette version de commutation est toujours supporté.

Vous pouvez vérifier la prise en charge de l’électron pour plusieurs `ffmpeg` construit par le chargement de la page suivante. Il doit travailler avec la bibliothèque de `ffmpeg` par défaut distribuée avec des électrons et ne fonctionne pas avec la bibliothèque de `ffmpeg` construite sans codecs propriétaires.

```html
< ! DOCTYPE html><html> <head> <meta charset="utf-8"> <title>Proprietary Codec Check</title> </head> <body> <p>Checking si électron utilise des codecs propriétaires en chargeant les vidéo de http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p> <p id="outcome"></p> <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video> <script> const video = document.querySelector('video')
      video.addEventListener ('erreur', ({target}) = > {si (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {document.querySelector('#outcome').textContent = « ne pas à l’aide de codecs propriétaires, vidéo source émis pas soutenu événement d’erreur. »
        } else {document.querySelector('#outcome').textContent = "une erreur inattendue : ${target.error.code}'}}) video.addEventListener (« jouer », () = > {document.querySelector('#outcome').textContent = « À l’aide de codecs propriétaires, vidéo a commencé à jouer. »
     </html> de </body> </script>})
```

## Liens

- [Calendrier des parutions chrome](https://www.chromium.org/developers/calendar)