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

Electron の上流プロジェクトへのすべてのパッチは、`patches/` ディレクトリに含まれています。 `patches/` の各サブディレクトリには、いくつかのパッチファイルと、パッチを適用する順序をリストした `.patches` ファイルが含まれています。 これらのファイルは、チェックアウト後に上流プロジェクト上に適用される一連の git コミットを構成していると考えてください。

```text
patches
├── config.json   <-- これはどのパッチセットディレクトリがどのプロジェクトに適用されるかを記述しています
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

これらのパッチセットを管理しやすくするために、`git-import-patches` と `git-export-patches` の 2 つのツールを提供しています。 `git-import-patches` は、各パッチを正しい順序で適用し、各パッチのコミットを作成することにより、一連のパッチファイルを git リポジトリにインポートします。 `git-export-patches` は逆の処理を行います。 リポジトリ内の一連の git コミットを、ディレクトリ内の一連のファイルとそれに付随する `.patches` ファイルにエクスポートします。

> 補足: パッチの順序に関連した競合を減らすために、各ファイルに `001-` のような番号を追加するのではなく、`.patches` ファイルを使用して適用されるパッチの順序を維持しています。 これにより、2 つの PR の両方が同じ番号である次の連番にパッチを追加し、両方がマージされて重複した識別子になるといった状況を防ぎます。 また、連番の間のパッチが追加または削除された場合の混乱も減ります。

### 使い方

#### 新しいパッチの追加
```bash session
$ cd src/third_party/electron_node
$ vim some/code/file.cc
$ git commit
$ ../../electron/script/git-export-patches -o ../../electron/patches/node
```

> **注**: `git-export-patches` はコミットされていないファイルを無視するため、変更をエクスポートする場合はコミットを作成する必要があります。 パッチファイル名はコミットメッセージの件名に使用し、コミットメッセージの本文にパッチの存在理由を含める必要があります。

パッチを再エクスポートすると、無関連なパッチの SHA サムが変更される場合があります。 これは一般に無害であり、無視することができます (ただし、これらの変更を PR に追加しても他の人には見えません)。

#### 既存のパッチを編集する
```bash session
$ cd src/v8
$ vim some/code/file.cc
$ git log
# 編集するパッチのコミット SHA を見つけます。
$ git commit --fixup [COMMIT_SHA]
$ git rebase --autosquash -i [COMMIT_SHA]^
$ ../electron/script/git-export-patches -o ../electron/patches/v8
```

#### パッチを削除する
```bash session
$ vim src/electron/patches/node/.patches
# 削除するパッチ名の行を削除します
$ cd src/third_party/electron_node
$ git reset --hard refs/patches/upstream-head
$ ../../electron/script/git-import-patches ../../electron/patches/node
$ ../../electron/script/git-export-patches -o ../../electron/patches/node
```

注意として、`git-import-patches` は `refs/patches/upstream-head` として実行されたときに `HEAD` だったコミットをマークします。 これにより、Electron パッチからのコミット (`refs/patches/upstream-head` の後にあるコミット) と上流にあるコミット (`refs/patches/upstream-head` の前にあるコミット) を追跡できます。

#### コンフリクトの解決
上流の依存関係を更新するとき、パッチをきれいに適用できない場合があります。 多くの場合、3 ウェイマージを使用して git で競合を自動的に解決できます。 `-3` の引数を渡すことで、3 ウェイマージアルゴリズムを使用するように `git-import-patches` に指示できます。

```bash session
$ cd src/third_party/electron_node
# パッチの適用が途中で失敗した場合は、以下のようにしてリセットできます。
$ git am --abort
# そして 3 ウェイマージで再試行します。
$ ../../electron/script/git-import-patches -3 ../../electron/patches/node
```

`git-import-patches -3` が自動的に解決できないマージ競合を検出した場合、一時停止し、競合を手動で解決できます。 Once you have resolved the conflict, `git add` the resolved files and continue to apply the rest of the patches by running `git am --continue`.
