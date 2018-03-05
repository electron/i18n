# Mettre à jour Crashpad

1. Télécharger la version de crashpad que nous allons utiliser.
    
    - `libcc/src/third_party/crashpad/README.chromium` aura une ligne `Revision:` avec un checksum
    - Nous avons besoin de vérifier la branche correspondante.
    - Cloner crashpad de Google (https://chromium.googlesource.com/crashpad/crashpad)
    - `git clone https://chromium.googlesource.com/crashpad/crashpad`
    - Vérifiez la branche avec le checksum de révision : 
        - `git checkout <revision checksum>`
    - Add electron's crashpad fork as a remote
    - `git remote add electron https://github.com/electron/crashpad`
    - Check out a new branch for the update
    - `git checkout -b electron-crashpad-vA.B.C.D`
    - `A.B.C.D` is the Chromium version found in `libcc/VERSION` and will be something like `62.0.3202.94`

2. Make a checklist of the Electron patches that need to be applied with `git log --oneline`
    
    - Ou voir https://github.com/electron/crashpad/commits/previous-branch-name

3. Pour chaque patch :
    
    - In `electron-crashpad-vA.B.C.D`, cherry-pick the patch's checksum
    - `git cherry-pick <checksum>`
    - Resolve any conflicts
    - Make sure it builds then add, commit, and push work to electron's crashpad fork
    - `git push electron electron-crashpad-vA.B.C.D`

4. Update Electron to build the new crashpad:
    
    - `cd vendor/crashpad`
    - `git fetch`
    - `git checkout electron-crashpad-v62.0.3202.94`
5. Regenerate Ninja files against both targets 
    - From Electron root's root, run `script/update.py`
    - `script/build.py -c D --target=crashpad_client`
    - `script/build.py -c D --target=crashpad_handler`
    - Both should build with no errors
6. Push changes to submodule reference 
    - (À la racine d'Electron) `git add vendor/crashpad`
    - `git push origin upgrade-to-chromium-62`