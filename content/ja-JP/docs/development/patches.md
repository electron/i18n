# Electron のパッチ

Electron は、Chromium と Node.js という 2 つのメジャーな上流プロジェクトで構築されています。 これらのプロジェクトにも、それぞれ独自の依存関係がいくつかあります。 これらの依存関係をそのまま使用するように最善を尽くしていますが、ユースケースに合わせて上流の依存関係にパッチを適用しないと目標を達成できない場合があります。

## パッチの正当性

Electron でのパッチは、すべてメンテナンスの負担になります。 上流のコードが変更されると、パッチが壊れる―パッチの競合やコンパイルエラーが発生することがあります。 これはパッチセットを最新かつ効果的に保つための継続的な取り組みです。 そのため、パッチの数を最小限に抑えるよう努めています。 そのために、すべてのパッチには、コミットメッセージに存在する理由を記述する必要があります。 その理由は、以下のいずれかでなければなりません。

1. パッチは一時的なものであり、上流にコミットされる (またはされている) か、最終的に削除されることを意図している。 上流の PR へのリンク、利用可能であればそのコードレビュー、後でパッチがまだ必要かどうかを確認する手順、これらのうちいずれかを含めている。
2. このパッチによってコードが Electron 環境でコンパイルできようになるが、Electron 固有の処理 (たとえば、Chrome の `Profile` への参照のパッチを当てる) であるため上流にできない。 パッチなし (たとえば、サブクラス化またはコードのコピーによるもの) では変更を実装できない理由についての論述を含む。
3. パッチは、基本的に上流と互換性のない機能に Electron 固有の変更を加えます。

基本的に、私たちが作業するすべての上流プロジェクトは友好的な人々が携わっており、問題のコードが Electron と上流プロジェクトの両方と互換性を持つようにするリファクタリングを喜んで受け入れてくれます。 (たとえば、Chromium の [この](https://chromium-review.googlesource.com/c/chromium/src/+/1637040) 変更を挙げると、同じことを行ったパッチを削除しています。また、Node の [この](https://github.com/nodejs/node/pull/22110) 変更は、 Electron のバグ修正でもあります。) **可能な限り上流の変更を目指し、無期限のパッチを避けるべきです**。

## パッチシステム

上流プロジェクトにパッチを適用することによってのみ行うことができる変更を行う必要がある、という不幸な立場にいる場合は、Electron でパッチを管理する方法を知る必要があります。

Electron の上流プロジェクトへのすべてのパッチは、`patches/` ディレクトリに含まれています。 Each subdirectory of `patches/` contains several patch files, along with a `.patches` file which lists the order in which the patches should be applied. Think of these files as making up a series of git commits that are applied on top of the upstream project after we check it out.

```text
patches
├── config.json   <-- this describes which patchset directory is applied to what project
├── chromium
│   ├── .patches
│   ├── accelerator.patch
│   ├── add_contentgpuclient_precreatemessageloop_callback.patch
│   ⋮
├── node
│   ├── .patches
│   ├── add_openssl_is_boringssl_guard_to_oaep_hash_check.patch
│   ├── build_add_gn_build_files.patch
│   ⋮
⋮
```

To help manage these patch sets, we provide two tools: `git-import-patches` and `git-export-patches`. `git-import-patches` imports a set of patch files into a git repository by applying each patch in the correct order and creating a commit for each one. `git-export-patches` does the reverse; it exports a series of git commits in a repository into a set of files in a directory and an accompanying `.patches` file.

> Side note: the reason we use a `.patches` file to maintain the order of applied patches, rather than prepending a number like `001-` to each file, is because it reduces conflicts related to patch ordering. It prevents the situation where two PRs both add a patch at the end of the series with the same numbering and end up both getting merged resulting in a duplicate identifier, and it also reduces churn when a patch is added or deleted in the middle of the series.

### 使い方

#### Adding a new patch
```bash session
$ cd src/third_party/electron_node
$ vim some/code/file.cc
$ git commit
$ ../../electron/script/git-export-patches -o ../../electron/patches/node
```

> **NOTE**: `git-export-patches` ignores any uncommitted files, so you must create a commit if you want your changes to be exported. The subject line of the commit message will be used to derive the patch file name, and the body of the commit message should include the reason for the patch's existence.

Re-exporting patches will sometimes cause shasums in unrelated patches to change. This is generally harmless and can be ignored (but go ahead and add those changes to your PR, it'll stop them from showing up for other people).

#### Editing an existing patch
```bash session
$ cd src/v8
$ vim some/code/file.cc
$ git log
# Find the commit sha of the patch you want to edit.
$ git commit --fixup [COMMIT_SHA]
$ git rebase --autosquash -i [COMMIT_SHA]^
$ ../electron/script/git-export-patches -o ../electron/patches/v8
```

#### Removing a patch
```bash session
$ vim src/electron/patches/node/.patches
# Delete the line with the name of the patch you want to remove
$ cd src/third_party/electron_node
$ git reset --hard refs/patches/upstream-head
$ ../../electron/script/git-import-patches ../../electron/patches/node
$ ../../electron/script/git-export-patches -o ../../electron/patches/node
```

Note that `git-import-patches` will mark the commit that was `HEAD` when it was run as `refs/patches/upstream-head`. This lets you keep track of which commits are from Electron patches (those that come after `refs/patches/upstream-head`) and which commits are in upstream (those before `refs/patches/upstream-head`).

#### コンフリクトの解決
When updating an upstream dependency, patches may fail to apply cleanly. Often, the conflict can be resolved automatically by git with a 3-way merge. You can instruct `git-import-patches` to use the 3-way merge algorithm by passing the `-3` argument:

```bash session
$ cd src/third_party/electron_node
# If the patch application failed midway through, you can reset it with:
$ git am --abort
# And then retry with 3-way merge:
$ ../../electron/script/git-import-patches -3 ../../electron/patches/node
```

If `git-import-patches -3` encounters a merge conflict that it can't resolve automatically, it will pause and allow you to resolve the conflict manually. Once you have resolved the conflict, `git add` the resolved files and continue to apply the rest of the patches by running `git am --continue`.
