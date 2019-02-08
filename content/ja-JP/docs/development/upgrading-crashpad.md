# Crashpad のアップグレード

1. これから使う Crashpad のバージョンを取得してください。
    
    - `libcc/src/third_party/crashpad/README.chromium` の `Revision:` 行にチェックサムがあります
    - 対応するブランチをチェックアウトする必要があります。
    - Google の Crashpad をクローンします (https://chromium.googlesource.com/crashpad/crashpad)
    - `git clone https://chromium.googlesource.com/crashpad/crashpad`
    - リビジョンチェックサムでブランチをチェックアウトしてください。 
        - `git checkout <revision checksum>`
    - Electron の Crashpad フォークをリモートとして追加します
    - `git remote add electron https://github.com/electron/crashpad`
    - 更新のために新しいブランチにチェックアウトします
    - `git checkout -b electron-crashpad-vA.B.C.D`
    - `A.B.C.D` は `libcc/VERSION` にある Chromium のバージョンで、`62.0.3202.94` のようになります

2. `git log --oneline` で適用する必要がある Electron パッチのチェックリストを作ります
    
    - Or view https://github.com/electron/crashpad/commits/previous-branch-name

3. For each patch:
    
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
    - (From electron root) `git add vendor/crashpad`
    - `git push origin upgrade-to-chromium-62`