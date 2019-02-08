# Nodeのアップグレード

## ディスカッション

Chromium と Node.js はどちらも V8 に依存しており、Electron には V8 のコピーが1つしか含まれていないため、選択した V8 のバージョンがビルドの Node.js と Chromium のバージョンと互換性があることを確認することが重要です。

Node のアップグレードは Chromium のアップグレードよりもはるかに簡単なので、最初に Chromium をアップグレードし、次に Chromium に含まれるバージョンに最も近い V8 のバージョンを持つ上流の Node リリースを選択すると、競合は少なくなります。

Electron には、上記の V8 ビルドの詳細と Electron が必要とする API を公開するための修正を加えた、独自の [Node フォーク](https://github.com/electron/node) があります。 上流の Node リリースが選択されると、それが Electron の Node フォークのブランチに置かれ、そこに Electron Node パッチが適用されます。

他には、Node プロジェクトがそのバージョンの V8 にパッチを適用する手段があります。 上記のように、Electron は V8 の単一コピーですべてを構築するので、Node の V8 パッチはそのコピーに移植されなければなりません。

Electron のすべての依存関係が同じ V8 のコピーを構築して使用したら、次の段階は Node のアップグレードによって引き起こされた Electron コードの問題を修正することです。

[FIXME] Atom の Node デバッガで、私たち (例: deepak) が使用したり、確認したりする必要があるものは Node アップグレードで壊れないのですか?

要するに、主要な手段は以下になります。

1. Electron の Node フォークを希望のバージョンにアップデートする
2. Backport Node's V8 patches to our copy of V8
3. Update the GN build files, porting changes from node's GYP files
4. Update Electron's DEPS to use new version of Node

## Updating Electron's Node [fork](https://github.com/electron/node)

1. Ensure that `master` on `electron/node` has updated release tags from `nodejs/node`
2. Create a branch in https://github.com/electron/node: `electron-node-vX.X.X` where the base that you're branching from is the tag for the desired update 
  - `vX.X.X` Must use a version of Node compatible with our current version of Chromium
3. Re-apply our commits from the previous version of Node we were using (`vY.Y.Y`) to `v.X.X.X` 
  - Check release tag and select the range of commits we need to re-apply
  - Cherry-pick commit range: 
    1. Checkout both `vY.Y.Y` & `v.X.X.X`
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - Resolve merge conflicts in each file encountered, then: 
    1. `git add <conflict-file>`
    2. `git cherry-pick --continue`
    3. Repeat until finished

## Updating [V8](https://github.com/electron/node/src/V8) Patches

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

## Update Electron's `DEPS` file

Update the `DEPS` file in the root of [electron/electron](https://github.com/electron/electron) to point to the git hash of the updated Node.

## 注釈

- Node maintains its own fork of V8 
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