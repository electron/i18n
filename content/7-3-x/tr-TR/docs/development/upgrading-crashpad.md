# Crashpad güncelleniyor

1. Kullanacağınız carshpad sürümünü edinin.
  - ` libcc / src / third_party / crashpad / README.chromium </ 0> satırında <code> Revizyon: </ 0> ile bir sağlaması bulunur

<ul>
<li>We need to check out the corresponding branch.</li>
</ul></li>
<li>google kilit panelini kopyala

<ul>
<li><code>git kopya https://chromium.googlesource.com/crashpad/crashpad`
  2. şubeyi sağlama yaparak kontrol edin
      - `çıkışa git`
  3. Elektron crashpad' i çatal olarak kumandaya ekleyin
    - `elektronu uzaktan eklemek isterseniz https://github.com/electron/crashpad`
  4. Güncelleme için yeni bir dalı kontrol edin
    - `git checkout -b electron-crashpad-vA.B.C.D`
    - `A.B.C.D` is the Chromium version found in `libcc/VERSION` and will be something like `62.0.3202.94`</ul></li>

2. Make a checklist of the Electron patches that need to be applied with `git log --oneline`
    - Yada https://github.com/electron/crashpad/commits/previous-branch-name sayfasını görüntüleyin

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
