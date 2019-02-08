# Nodeのアップグレード

## ディスカッション

Chromium と Node.js はどちらも V8 に依存しており、Electron には V8 のコピーが1つしか含まれていないため、選択した V8 のバージョンがビルドの Node.js と Chromium のバージョンと互換性があることを確認することが重要です。

Node のアップグレードは Chromium のアップグレードよりもはるかに簡単なので、最初に Chromium をアップグレードし、次に Chromium に含まれるバージョンに最も近い V8 のバージョンを持つ上流の Node リリースを選択すると、競合は少なくなります。

Electron には、上記の V8 ビルドの詳細と Electron が必要とする API を公開するための修正を加えた、独自の [Node フォーク](https://github.com/electron/node) があります。 上流の Node リリースが選択されると、それが Electron の Node フォークのブランチに置かれ、そこに Electron Node パッチが適用されます。

他には、Node プロジェクトがそのバージョンの V8 にパッチを適用する手段があります。 上記のように、Electron は V8 の単一コピーですべてを構築するので、Node の V8 パッチはそのコピーに移植されなければなりません。

Electron のすべての依存関係が同じ V8 のコピーを構築して使用したら、次の段階は Node のアップグレードによって引き起こされた Electron コードの問題を修正することです。

[FIXME] Atom の Node デバッガで、私たち (例: deepak) が使用したり、確認したりする必要があるものは Node アップグレードで壊れないのですか?

要するに、主要な手段は以下になります。

1. Electron の Node フォークを希望のバージョンにアップデートします
2. Node の V8 パッチを私たちの V8 のコピーに後方移植します
3. Node の GYP ファイルでの変更を移植するため、GN ビルドファイルを更新します
4. 新しいバージョンの Node を使用するように Electron の DEPS を更新します

## Electron の Node [フォーク](https://github.com/electron/node) のアップデート

1. `electron/node` 上の `master` のリリースタグが `nodejs/node` よりも新しいことを確認します
2. https://github.com/electron/node で以下のようにブランチを作成します。 `electron-node-vX.X.X` とし、分岐元のベースが目的のアップデートのタグであるようにします。 
  - `vX.X.X` は現在の Chromium のバージョンと互換性のある Node のバージョンを使用しなければなりません
3. 使用していた以前のバージョンのNode (`vY.Y.Y`) から `v.X.X.X へコミットを再適用します。` 
  - リリースタグを確認して、再適用する必要があるコミットの範囲を選択します
  - Cherry-pick コミットの範囲は以下の通りです。 
    1. `vY.Y.Y` と `v.X.X.X` 両方をチェックアウトします
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - それぞれのファイルでマージコンフリクトを解決します。それから、 
    1. `git add <conflict-file>`
    2. `git cherry-pick --continue`
    3. 終わるまで繰り返します

## [V8](https://github.com/electron/node/src/V8) パッチのアップデート

Node が V8 に適用する各パッチからパッチファイルを生成する必要があります。

```sh
$ cd third_party/electron_node
$ CURRENT_NODE_VERSION=vX.Y.Z
# "deps: update V8 to <some version>" というメッセージの最後のコミットを探します
# このコミットは、指定されたバージョンでノードが
# V8 を元の上流の状態にリセットするものに対応します。
$ LAST_V8_UPDATE="$(git log --grep='^deps: update V8' --format='%H' -1 deps/v8)"
# これにより、$LAST_V8_UPDATE から現在の Node バージョンまでの
# deps/v8 のすべての変更を含むパッチファイルが作成され、
# V8 リポジトリ (すなわち `deps/v8`) にきれいに適用されるよう整形されます
# パスを削除し、V8には存在しない
# v8/gypfiles ディレクトリを除外します。
$ git format-patch \
    --relative=deps/v8 \
    $LAST_V8_UPDATE..$CURRENT_NODE_VERSION \
    deps/v8 \
    ':(exclude)deps/v8/gypfiles' \
    --stdout \
    > ../../electron/common/patches/v8/node_v8_patches.patch
```

このパッチのリストには、おそらく V8 API を以前のバージョンの V8 と後方互換性を持たせるとしているものが含まれています。 残念ながら、これらのパッチはほとんどの場合 Chromiumと互換性のない方法で V8 API を変更します。

Chromium を互換性パッチで動作するように更新するよりも互換性パッチなしで動作するように Node を更新する方が通常は簡単です。したがって、互換性パッチを元に戻して Node のコンパイル時に発生するエラーを修正することを推奨します。

## Electron の `DEPS` ファイルをアップデートする

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