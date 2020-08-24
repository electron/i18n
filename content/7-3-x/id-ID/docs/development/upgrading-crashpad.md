# Upgrade Crashpad

1. Dapatkan versi crashpad yang akan kita gunakan.
  - `libcc/src/third_party/crashpad/README.chromium` akan memiliki garis `Revisi:` dengan checksum
    - We need to check out the corresponding branch.
  - Clone Google's crashpad (https://chromium.googlesource.com/crashpad/crashpad)
    - `git klon https://chromium.googlesource.com/crashpad/crashpad`
  - Periksa cabang dengan checksum revisi:
      - `git checkout <revision checksum>`
  - Add electron's crashpad fork as a remote
    - `git remote add electron https://github.com/electron/crashpad`
  - Lihat cabang baru untuk pembaruan
    - `git checkout -b elektron-crashpad-vA.B.C.D`
    - `A.B.C.D` adalah versi kromium yang ditemukan di `libcc/VERSION` dan akan menjadi seperti `62.0.3202.94`

2. Buatlah daftar checklist dari Electron patch yang perlu diaplikasikan dengan `git log --oneline`
    - Or view https://github.com/electron/crashpad/commits/previous-branch-name

3. Untuk setiap patch:
  - In `electron-crashpad-vA.B.C.D`, cherry-pick the patch's checksum
    - `git cherry-pick <checksum>`
  - Selesaikan konflik
  - Make sure it builds then add, commit, and push work to electron's crashpad fork
    - `git dorong elektron elektron-crashpad-vA.B.C.D`

4. Update Electron untuk membangun tabrakan baru:
  - `cd vendor/crashpad`
  - `git fetch`
  - `git checkout elektron-crashpad-v62.0.3202.94`
5. Regenerasi file Ninja terhadap kedua target
  - Dari akar akar elektron, jalankan `script/update.py`
  - `script/build.py -c D --target=crashpad_client`
  - `script/build.py -c D --target=crashpad_handler`
  - Keduanya harus membangun tanpa kesalahan
6. Dorong perubahan ke referensi submodule
  - (Dari akar elektron) `git tambahkan vendor/crashpad`
  - `git push origin upgrade-to-chromium-62`
