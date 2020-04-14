# Mettre à jour Crashpad

1. Télécharger la version de crashpad que nous allons utiliser.
  - `libcc/src/third_party/crashpad/README.chromium` aura une ligne `Revision:` avec un checksum
    - Nous avons besoin de vérifier la branche correspondante.
  - Clonez crashpad de Google (https://chromium.googlesource.com/crashpad/crashpad)
    - `git clone https://chromium.googlesource.com/crashpad/crashpad`
  - Vérifiez la branche avec le checksum de révision :
      - `git checkout <revision checksum>`
  - Ajoutez le fork de crashpad d'Electron comme remote
    - `git remote add electron https://github.com/electron/crashpad`
  - Changez de branche pour la mise à jour
    - `git checkout -b electron-crashpad-vA.B.C.D`
    - `A.B.C.D` est la version de Chromium trouvable dans `libcc/VERSION` et sera quelque chose comme `62.0.3202.94`

2. Faîtes une liste des correctifs d'Electron qui doivent être appliquées avec `git log --oneline`
    - Ou voir https://github.com/electron/crashpad/commits/previous-branch-name

3. Pour chaque patch :
  - Dans `electron-crashpad-vA.B.C.D`, attrapez le checksum du patch
    - `git cherry-pick <checksum>`
  - Résoudre tous les conflits
  - Assurez-vous qu'il compile, puis ajoutez, commitez et poussez le résultat au fork de crashpad d'Electron
    - `git push electron electron-crashpad-vA.B.C.D`

4. Mettre à jour Electron pour compiler le nouveau crashpad :
  - `cd vendor/crashpad`
  - `git fetch`
  - `git checkout electron-crashpad-v62.0.3202.94`
5. Régénérer les fichiers Ninja pour les deux cibles
  - Depuis la racine d'Electron, exécutez `script/update.py`
  - `script/build.py -c D --target=crashpad_client`
  - `script/build.py -c D --target=crashpad_handler`
  - Les deux devraient se compiler sans erreur
6. Poussez les modifications de la référence sous-module
  - (À la racine d'Electron) `git add vendor/crashpad`
  - `git push origin upgrade-to-chromium-62`
