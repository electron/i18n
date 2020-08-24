# Pag-upgrade ng Crashpad

1. Kuning ang bersyon ng crashpad na gagamitin natin.
  - Ang `libcc/src/third_party/crashpad/README.chromium` ay magkakaroon ng linya `Rebisyon:` na may checksum
    - Kailangan nating suriin ang katugmang sangay.
  - Kopyahin ang crashpad ng Google (https://chromium.googlesource.com/crashpad/crashpad)
    - `git clone https://chromium.googlesource.com/crashpad/crashpad`
  - Tingnan ang sangay na may rebisyong checksum:
      - `git checkout <revision checksum>`
  - Idagdag ng crashpad fork ng electron bilang isang remote
    - `git remote add electron https://github.com/electron/crashpad`
  - Tingnan ang bagong sangay para sa update
    - `git checkout -b electron-crashpad-vA.B.C.D`
    - Ang `A.B.C.D` ay ang Chromium bersyon na matatagpuan sa `libcc/VERSION` at magiging tulad nito `62.0.3202.94`

2. Gumawa ng isang checklist ng mga patch ng Electron na kailangang ilapat gamit ang `git log --oneline`
    - O tingnan sa https://github.com/electron/crashpad/commits/previous-branch-name

3. Para sa bawat patch:
  - Sa `electron-crashpad-vA.B.C.D`, i-cherry-pick ang checksum ng patch
    - `git cherry-pick<checksum>`
  - Lutasin ang ano mang mga problema
  - Tiyaking bumuo ito pagkatapos ay idagdag, gumawa, at itulak ang trabaho sa crashpad fork ng electron
    - `git push electron electron-crashpad-vA.B.C.D`

4. I-update ang Electron upang gawin ang bagong crashpad:
  - `cd vendor/crashpad`
  - `git fetch`
  - `git checkout electron-crashpad-v62.0.3202.94`
5. Muling buuhin ang mga Ninja file laban sa dalawang target
  - Mula sa ugat ng Electron root, paganahin ang `script/update.py`
  - `script/build.py -c D --target=crashpad_client`
  - `script/build.py -c D --target=crashpad_handler`
  - Dapat magbuo ang dalawa nang walang mga mali
6. Isulong ang mga pagbabago sa batayang submodule
  - (Mula sa ugat ng electron) `git add vendor/crashpad`
  - `git push origin upgrade-to-chromium-62`
