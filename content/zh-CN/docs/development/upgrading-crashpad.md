# 更新奔溃报告（Crashpad）

1. 获取crashpad的版本信息
    
    - `libcc/src/third_party/crashpad/README.chromium`将会有一个带有 校验和（checksum）的`Revision:`信息
    - 检出到相应的分支
    - 获取Google的奔溃报告 (https://chromium.googlesource.com/crashpad/crashpad)，
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
    
    - 在`electron-crashpad-vA.B.C.D`中, 单向拣取补丁的校验和
    - `git cherry-pick <checksum>`
    - 消除冲突
    - 首先确保它能构建成功，然后依次执行add, commit, 和 push，将补丁添加到electron 的 crashpad 分支
    - `git push electron electron-crashpad-vA.B.C.D`

4. 更新Electron，构建新的crashpad：
    
    - `cd vendor/crashpad`
    - `git fetch`
    - `git checkout electron-crashpad-v62.0.3202.94`
5. 为两个版本的Electron重新生成相应的Ninja文件 
    - 在Electron根目录的上一级目录中，运行 `script/update.py`
    - `script/build.py -c D --target=crashpad_client`
    - `script/build.py -c D --target=crashpad_handler`
    - 确保两个构建过程没有抛出异常，
6. 将变更内容Push到子模块的引用部分。 
    - (在 electron 的根目录下) `git add vendor/crashpad`
    - `git push origin upgrade-to-chromium-62`