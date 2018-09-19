# 升级 Node

## 讨论

一个升级中要考虑的问题是为了确保兼容性，Electron的所有内容是用同样的一份V8副本来构建的。 这一点很重要, 因为上游Node和 [ libchromiumcontent ](upgrading-chromium.md) 都使用自己的 V8 版本。

升级Node比升级 libchromiumcontent 容易得多, 因此, 如果首先升级 libchromiumcontent, 然后选择最接近它的 V8 的上游Node版本, 就会发生较少的冲突。

Electron 有它自己的 [ Node 克隆](https://github.com/electron/node), 并对上面提到的 V8 构建细节进行修改, 并用于暴露Electron所需的 API。 一旦选择了一个上游Node的发布版本, 它就被放置在Electron的Node克隆的一个分支中，并且任何Electron Node的补丁会被应用在那里。

另一个因素是Node只给其自己版本的 V8打补丁。如上所述, Electron用一份 V8 副本来构建一切, 所以Node的 V8 补丁必须被移植到该副本。

一旦所有电子的依赖建立和使用相同的副本 V8, 下一步是修复任何电子代码问题引起的节点升级。

[FIXME]关于在 Atom 中的节点调试器, 我们 (例如,) 使用和需要确认的东西不与节点升级中断？

简而言之, 主要步骤如下:

1. 更新电子的节点叉到所需的版本
2. Backport Node's V8 patches to our copy of V8
3. 更新Electron以使用Node的新版本 
  - 更新子模块
  - 更新 Node.js 构建配置

## 更新Electron的Node[克隆](https://github.com/electron/node)

1. Ensure that `master` on `electron/node` has updated release tags from `nodejs/node`
2. 在https://github.com/electron/node创建一个分支 `electron-node-vX.X.X` where the base that you're branching from is the tag for the desired update 
  - `vX.X.X` Must use a version of node compatible with our current version of chromium
3. Re-apply our commits from the previous version of node we were using (`vY.Y.Y`) to `v.X.X.X` 
  - Check release tag and select the range of commits we need to re-apply
  - Cherry-pick commit range: 
    1. Checkout both `vY.Y.Y` & `v.X.X.X`
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - 解决遇到的每个文件中的合并冲突，然后： 
    1. `git add <冲突文件>`
    2. `git cherry-pick --continue`
    3. 重复直到完成

## Updating [V8](https://github.com/electron/node/src/V8) Patches

We need to generate a patch file from each patch applied to V8.

1. Get a copy of Electron's libcc fork 
  - `$ git clone https://github.com/electron/libchromiumcontent`
2. 运行 `script/update` 以取得最新的libcc 
  - This will be time-consuming
3. Remove our copies of the old Node v8 patches 
  - (In libchromiumcontent repo) Read `patches/common/v8/README.md` to see which patchfiles were created during the last update
  - Remove those files from `patches/common/v8/`: 
    - `git rm` 补丁文件
    - edit `patches/common/v8/README.md`
    - commit these removals
4. 检查Node [仓库](https://github.com/electron/node) to see what patches upstream Node used with their v8 after bumping its version 
  - `git log --oneline "deps/v8"`
5. Create a checklist of the patches. This is useful for tracking your work and for having a quick reference of commit hashes to use in the `git diff-tree` step below.
6. 阅读 `patches/common/v8/README.md` 以查看哪些补丁文件来自上一版 V8 并因此需要被移除。 
  - Delete each patchfile referenced in `patches/common/v8/README.md`
7. Apply all patches with the [`get-patch` script](https://github.com/electron/libchromiumcontent/blob/master/script/README.md#get-patch): 
  - `./script/get-patch --repo src/v8 --output-dir patches/v8 --commit abc123 def456 ...`
8. Update `patches/common/v8/README.md` with references to all new patches that have been added so that the next person will know which need to be removed.
9. Update Electron's submodule references: 
      sh
      $ cd electron/vendor/node
      electron/vendor/node$ git fetch
      electron/vendor/node$ git checkout electron-node-vA.B.C
      electron/vendor/node$ cd ../libchromiumcontent
      electron/vendor/libchromiumcontent$ git fetch
      electron/vendor/libchromiumcontent$ git checkout upgrade-to-chromium-X
      electron/vendor/libchromiumcontent$ cd ../..
      electron$ git add vendor
      electron$ git commit -m "update submodule references for node and libcc"
      electron$ git push origin upgrade-to-chromium-<VERSION>
      electron$ script/bootstrap.py -d
      electron$ script/build.py -c -D

## 注意：

- libcc and V8 are treated as a single unit
- Node维护它自己的V8的克隆 
  - They backport a small amount of things as needed
  - Documentation in node about how [they work with V8](https://nodejs.org/api/v8.html)
- We update code such that we only use one copy of V8 across all of electron 
  - E.g electron, libcc, and node
- We don’t track upstream closely due to logistics: 
  - Upstream uses multiple repos and so merging into a single repo would result in lost history. So we only update when we’re planning a node version bump in electron.
- libcc is large and time-consuming to update, so we typically choose the node version based on which of its releases has a version of V8 that’s closest to the version in libcc that we’re using. 
  - We sometimes have to wait for the next periodic Node release because it will sync more closely with the version of V8 in the new libcc
  - Electron keeps all its patches in libcc because it’s simpler than maintaining different repos for patches for each upstream project. 
    - Crashpad, node, libcc, etc. patches are all kept in the same place
  - 构建Node： 
    - There’s a chance we need to change our build configuration to match the build flags that node wants in `node/common.gypi`