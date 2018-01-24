# Pag-upgrade ng Crashpad

1. Kuning ang bersyon ng crashpad na gagamitin namin.
    
    - `libcc/src/third_party/crashpad/README.chromium` magkakaroon ng linya `Rebisyon:` na may checksum
    - Kailangan nating tingnan ang kaukulang sangay.
    - Clone Google's crashpad (https://chromium.googlesource.com/crashpad/crashpad)
    - `git clone https://chromium.googlesource.com/crashpad/crashpad`
    - Tingnan ang sangay na may rebisyon na may checksum: 
        - `git checkout <revision checksum>`
    - Magdagdag ng electon's crashpad fork bilang isang remote
    - `git remote add electron https://github.com/electron/crashpad`
    - Tingnan ang bagong sangay para sa update
    - `git checkout -b electron-crashpad-vA.B.C.D`
    - `A.B.C.D` ay ang Chromium bersyon na matatagpuan sa `libcc/VERSION` at magiging tulad nito `62.0.3202.94`

2. Gumawa ng isang checklist ng mga patong ng Electron na kailangang ilapat `git log --oneline`
    
    - O tingnan sa https://github.com/electron/crashpad/commits/previous-branch-name

3. Para sa bawat patch:
    
    - Sa `electron-crashpad-vA.B.C.D`, cherry-pick the patch's checksum
    - `git cherry-pick<checksum>`
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
    - (From electron root) `git add vendor/crashpad`
    - `git push origin upgrade-to-chromium-62`