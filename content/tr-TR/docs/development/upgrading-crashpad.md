# Crashpad güncelleniyor

1. Kullanacağınız carshpad sürümünü edinin.
    
    - `libcc/src/third_party/crashpad/README.chromium` will have a line `Revision:` with a checksum
    - We need to check out the correponding branch.
    - Clone Google's crashpad (https://chromium.googlesource.com/crashpad/crashpad)
    - `git clone https://chromium.googlesource.com/crashpad/crashpad`
    - Check out the branch with the revision checksum: 
        - `git checkout <revision checksum>`
    - Add electron's crashpad fork as a remote
    - `git remote add electron https://github.com/electron/crashpad`
    - Güncelleme için yeni bir dalı kontrol edin
    - `git checkout -b electron-crashpad-vA.B.C.D`
    - `A.B.C.D` is the Chromium version found in `libcc/VERSION` and will be something like `62.0.3202.94`

2. Make a checklist of the Electron patches that need to be applied with `git log --oneline`
    
    - Yada http://github.com/electron/crashpad/commits/previous-branch-name sayfasını görüntüleyin

3. Her yama için:
    
    - In `electron-crashpad-vA.B.C.D`, cherry-pick the patch's checksum 
    - `git cherry-pick <checksum>`
    - Çakışmaları çöz
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
6. Değişiklikleri alt modül başvurusuna gönderin 
    - (From electron root) `git add vendor/crashpad`
    - `git push origin upgrade-to-chromium-62`