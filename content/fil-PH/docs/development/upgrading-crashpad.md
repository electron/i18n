# Pag-upgrade ng Crashpad

1. Kuning ang bersyon ng crashpad na gagamitin natin.
    
    - `libcc/src/third_party/crashpad/README.chromium` magkakaroon ng linya `Rebisyon:` na may checksum
    - We need to check out the corresponding branch.
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
    - Lutasin ang ano mang kasalungat
    - Tiyaking bumuo ito pagkatapos ay idagdag, gumawa, at itulak ang trabaho sa electron's crashpad fork
    - `git itulak ang electron electron-crashpad-vA.B.C.D`

4. I-update ang Electron na gumawa ng bagong crashpad:
    
    - `cd vendor/crashpad`
    - `git fetch`
    - `git checkout electron-crashpad-v62.0.3202.94`
5. Muling buuhin ang Ninja files laban sa parehong target 
    - Mula sa Electron root's ugat, paganahin ang `cript/update.py`
    - `script/build.py -c D --target=crashpad_client`
    - `script/build.py -c D --target=crashpad_handler`
    - Dapat parehong walang mga mali sa paggawa
6. Isulong ang mga pagbabago sa reperensiya ng submodule 
    - (Mula sa ugat ng electron) `git add vendor/crashpad`
    - `git pinagmulang ng tulak upgrade-to-chromium-62`