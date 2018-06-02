# Upgrading Crashpad

1. 获取crashpad的版本信息
    
    - `libcc/src/third_party/crashpad/README.chromium`将会有一个带有 校验和（checksum）的`Revision:`信息
    - 检出到相应的分支
    - 获取Google的crashpad (https://chromium.googlesource.com/crashpad/crashpad)，
    - `git clone https://chromium.googlesource.com/crashpad/crashpad`
    - 用版本校验和检出分支 
        - `git checkout <revision checksum>`
    - 将electron's的crashpad分支作为一个远程
    - `git remote add electron https://github.com/electron/crashpad`
    - 为更新检出一个新的分支
    - `git checkout -b electron-crashpad-vA.B.C.D`
    - `A.B.C.D`是 Chromium 的版本，可以在 `libcc/VERSION`中查看，版本信息将应类似于 `62.0.3202.94`

2. 用`git log --oneline`为Electron的补丁生成一个分支列表。
    
    - 可参考https://github.com/electron/crashpad/commits/previous-branch-name

3. 每一个补丁：
    
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