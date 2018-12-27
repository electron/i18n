# 升级 Node

## 讨论

Chromium 和 Node.js 都依赖于 V8 ， Electron 只包含 了 V8 的一个副本，所以务必确保选择的 V8 版本与构建版本的 Node.js 和 Chromium 相兼容。

升级 Node 比升级 Chromium 容易得多，因此如果首先升级Chromium，然后升级 Node 版本至最接近 Chromiun 所包含的 V8 版本，出现的冲突可能会小一些。

Electron 有它自己的 [ Node 克隆](https://github.com/electron/node), 并对上面提到的 V8 构建细节进行修改, 并用于暴露Electron所需的 API。 一旦选择了一个上游Node的发布版本, 它就被放置在Electron的Node克隆的一个分支中，并且任何Electron Node的补丁会被应用在那里。

另一个因素是Node只给其自己版本的 V8打补丁。如上所述, Electron用一份 V8 副本来构建一切, 所以Node的 V8 补丁必须被移植到该副本。

一旦所有电子的依赖建立和使用相同的副本 V8, 下一步是修复任何电子代码问题引起的节点升级。

[FIXME]关于在 Atom 中的节点调试器, 我们 (例如,) 使用和需要确认的东西不与节点升级中断？

简而言之, 主要步骤如下:

1. 更新电子的节点叉到所需的版本
2. Backport Node's V8 patches to our copy of V8
3. 更新 GN 的构建文件，从 Node 的 GYP 文件移植更改
4. 更新 Electron 的 DEPS 以使用 Node 的新版本

## 更新Electron的Node[克隆](https://github.com/electron/node)

1. 确保 `electron/node` 上的 `master` 已经从 `nodejs/node` 更新过发布标签
2. 在https://github.com/electron/node创建一个分支 `electron-node-vX.X.X` where the base that you're branching from is the tag for the desired update 
  - `vX.X.X` 必须使用与当前版本的 Chromium 兼容的Node 版本
3. 从我们使用的以前版本的 Node 重新应用我们的提交 (`vY.Y.Y`) 到 `v.X.X.X` 
  - 检查发布标签并选择我们需要重新应用的提交的范围
  - Cherry-pick 提交范围： 
    1. 检查 `vY.Y.Y` & `v.X.X.X`
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - 解决遇到的每个文件中的合并冲突，然后： 
    1. `git add <冲突文件>`
    2. `git cherry-pick --continue`
    3. 重复直到完成

## 更新 [V8](https://github.com/electron/node/src/V8) 补丁

We need to generate a patch file from each patch that Node applies to V8.

```sh
$ cd third_party/electron_node
$ CURRENT_NODE_VERSION=vX.Y.Z
# Find the last commit with the message "deps: update V8 to <some version>"
# This commit corresponds to Node resetting V8 to its pristine upstream
# state at the stated version.
$ LAST_V8_UPDATE="$(git log --grep='^deps: update V8' --format='%H' -1 deps/v8)"
# This creates a patch file containing all changes in deps/v8 from
# $LAST_V8_UPDATE up to the current Node version, formatted in a way that
# it will apply cleanly to the V8 repository (i.e. with `deps/v8`
# stripped off the path and excluding the v8/gypfiles directory, which
# isn't present in V8.
$ git format-patch \
    --relative=deps/v8 \
    $LAST_V8_UPDATE..$CURRENT_NODE_VERSION \
    deps/v8 \
    ':(exclude)deps/v8/gypfiles' \
    --stdout \
    > ../../electron/common/patches/v8/node_v8_patches.patch
```

This list of patches will probably include one that claims to make the V8 API backwards-compatible with a previous version of V8. Unfortunately, those patches almost always change the V8 API in a way that is incompatible with Chromium.

It's usually easier to update Node to work without the compatibility patch than to update Chromium to work with the compatibility patch, so it's recommended to revert the compatibility patch and fix any errors that arise when compiling Node.

## 更新 Electron's 的 `DEPS` 文件

Update the `DEPS` file in the root of [electron/electron](https://github.com/electron/electron) to point to the git hash of the updated Node.

## 注意：

- Node维护它自己的V8的克隆 
  - They backport a small amount of things as needed
  - Documentation in Node about how [they work with V8](https://nodejs.org/api/v8.html)
- We update code such that we only use one copy of V8 across all of Electron 
  - E.g Electron, Chromium, and Node.js
- We don’t track upstream closely due to logistics: 
  - Upstream uses multiple repos and so merging into a single repo would result in lost history. So we only update when we’re planning a Node version bump in Electron.
- Chromium is large and time-consuming to update, so we typically choose the Node version based on which of its releases has a version of V8 that’s closest to the version in Chromium that we’re using. 
  - We sometimes have to wait for the next periodic Node release because it will sync more closely with the version of V8 in the new Chromium
  - Electron keeps all its patches in the repo because it’s simpler than maintaining different repos for patches for each upstream project. 
    - Crashpad, Node.js, Chromium, Skia etc. patches are all kept in the same place
  - Building Node: 
    - We maintain our own GN build files for Node.js to make it easier to ensure that eevrything is built with the same compiler flags. This means that every time we upgrade Node.js we have to do a modest amount of work to synchronize the GN files with the upstream GYP files.