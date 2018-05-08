# プルリクエスト

* [依存関係](#dependencies)
* [ローカル環境のセットアップ](#setting-up-your-local-environment) 
  * [ステップ1: フォーク](#step-1-fork)
  * [ステップ2: ビルド](#step-2-build)
  * [ステップ3: ブランチ](#step-3-branch)
* [変更を加える](#making-changes) 
  * [ステップ4: コーディング](#step-4-code)
  * [ステップ5: コミット](#step-5-commit) 
    * [コミットメッセージのガイドライン](#commit-message-guidelines)
  * [ステップ6: リベース](#step-6-rebase)
  * [ステップ7: テスト](#step-7-test)
  * [ステップ8: プッシュ](#step-8-push)
  * [ステップ9: プルリクエストを開く](#step-9-opening-the-pull-request)
  * [ステップ10: 議論と更新](#step-10-discuss-and-update) 
    * [承認とリクエストの変更ワークフロー](#approval-and-request-changes-workflow)
  * [ステップ11: 取り込み](#step-11-landing)
  * [継続的インテグレーションテスト](#continuous-integration-testing)

## ローカル環境のセットアップ

### ステップ1: フォーク

[GitHub](https://github.com/electron/electron) でプロジェクトをフォークし、ローカルでフォークをクローンします。

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### ステップ2: ビルド

ビルド手順と依存関係は、オペレーティングシステムによって若干異なります。 Electron をローカルに構築する際は、これらの詳細なガイドを参照してください。

* [macOS 上でビルド](https://electronjs.org/docs/development/build-instructions-osx)
* [Linux 上でビルド](https://electronjs.org/docs/development/build-instructions-linux)
* [Windows 上でビルド](https://electronjs.org/docs/development/build-instructions-windows)

プロジェクトをローカルに構築したら、変更を始める準備が整います！

### ステップ3: ブランチ

開発環境を整理しておくために、作業を支えるローカルのブランチを作りましょう。 これらは、`master` ブランチから直接分岐する必要があります。

```sh
$ git checkout -b my-branch -t upstream/master
```

## 変更を加える

### ステップ4: コーディング

`electron/electron` リポジトリに対して開かれたほとんどのプルリクエストには、`atom/` フォルダや `brightray` フォルダの C/C++ コード、`lib/` フォルダの JavaScript コード、`docs/api/` のドキュメント、`spec/` フォルダのテストの変更が含まれます。

コードの変更時に `npm run lint` を実行して、プロジェクトのコードスタイルに従うようにしてください。

プロジェクトのさまざまな部分でコードを変更する際のベストプラクティスの詳細については、[コーディングスタイル](https://electronjs.org/docs/development/coding-style) を参照してください。

### ステップ5: コミット

変更を個々のコミット内で論理的にグループ化しておくことを推奨します。 コントリビューターの多くが、複数のコミットに分割された変更をより簡単に確認できます。 プルリクエストのコミット数に制限はありません。

```sh
$ git add my/changed/files
$ git commit
```

複数のコミットは、取り込み時にしばしば縮められることに注意してください。

#### コミットメッセージのガイドライン

良いコミットメッセージは、何が何故変更されたのか、が記述されるべきです。 The Electron project uses [semantic commit messages](https://conventionalcommits.org/) to streamline the release process.

Before a pull request can be merged, it should include at least one semantic commit message, though it's not necessary for all commits in the pull request to be semantic. Alternatively, you can **update your pull request title** to start with a semantic prefix.

Examples of commit messages with semantic prefixes:

* `fix: don't overwrite prevent_default if default wasn't prevented`
* `feat: add app.isPackaged() method`
* `docs: app.isDefaultProtocolClient is now available on Linux` 

Common prefixes:

    - fix: A bug fix
    - feat: A new feature
    - docs: Documentation changes
    - test: Adding missing tests or correcting existing tests
    - build: Changes that affect the build system
    - ci: Changes to our CI configuration files and scripts
    - perf: A code change that improves performance
    - refactor: A code change that neither fixes a bug nor adds a feature
    - style: Changes that do not affect the meaning of the code (linting)
    

Other things to keep in mind when writing a commit message:

1. 最初の行は、以下の通りにしてください。 
  * 変更の簡単な説明が含まれている (50文字以下が好ましく、72文字未満である)
  * 適切な名詞、頭字語、および関数/変数名のようなコードを参照する単語を除いて、完全な小文字にする
2. 2行目は空にしてください。
3. 他のすべての行は72列で折り返します。

#### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with Major in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

### ステップ6: リベース

変更をコミットしたら、`git rebase` (`git merge` ではない) を使用してメインリポジトリと作業を同期させることを推奨します。

```sh
$ git fetch upstream
$ git rebase upstream/master
```

これにより作業ブランチに `electron/electron` のマスターの最新の変更が確実に反映されます。

### ステップ7: テスト

バグの修正と機能追加には常にテストが必要です。 プロセスを簡単にするため、[テストガイド](https://electronjs.org/docs/development/testing) が提供されています。 それらがどのように構築されるべきかを見るため、他のテストを見ることでも手助けになれます。

プルリクエストで変更を送信する前に、常に完全なテストスイートを実行してください。 テストを実行するには以下のようにします。

```sh
$ npm run test
```

リンターが問題を報告していないこと、そしてすべてのテストが合格していることを確認してください。 いずれかのチェックに失敗したパッチは提出しないでください。

If you are updating tests and want to run a single spec to check it:

```sh
$ npm run test -match=menu
```

上記の例では `menu` に一致する仕様のモジュールのみが実行されます。これは、テストサイクルの最後の最後にテストに取り組んでいる人にとって役に立ちます。

### ステップ8: プッシュ

コミットの準備 ―― テストに合格して、lint をしている ―― ができたら、GitHub 上 のあなたのフォークに作業ブランチをプッシュして、プルリクエストを開くプロセスを開始します。

```sh
$ git push origin my-branch
```

### ステップ9: プルリクエストを開く

GitHub で、新しいプルリクエストを開くと、記入する必要のあるテンプレートが表示されます。

```markdown
<!--
プルリクエストありがとう。 上に説明を記述して、下の要件を確認してください。

バグ修正や新機能には、テストやベンチマークが含まれている必要があります。

コントリビューターガイド: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### ステップ10: 議論と更新

おそらく、あなたはプルリクエストの変更に対するフィードバックやリクエストを得ます。 これは提出プロセスの大事な部分なので、がっかりさせないでください！ コントリビューターの中には、すぐにプルリクエストを承認する人がいます。 他の人には詳細なコメントやフィードバックがあるかもしれません。 これは、変更が正しいかどうかを評価するために必要なプロセスの一部です。

既存のプルリクエストを変更するには、ローカルブランチに変更を加え、それらの変更で新しいコミットを追加し、それらをあなたのフォークにプッシュします。 GitHub は自動的にプルリクエストを更新します。

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

利用できる `git rebase` を使用して、コミットを管理するためのさらに高度なメカニズムがいくつかありますが、このガイドの範疇を超えています。

あなたが何らかの回答を待っている場合は、Ping レビュー担当者にプルリクエスト内でコメントを投稿してください。 不慣れな言葉や頭字語に遭遇した場合は、この [用語集](https://sites.google.com/a/chromium.org/dev/glossary) を参照してください。

#### 承認とリクエストの変更ワークフロー

すべてのプルリクエストは、取り込むために、変更した部分の [Code Owner](https://github.com/orgs/electron/teams/code-owners) の承認が必要です。 管理者はプルリクエストをレビューするたびに、変更を要求することができます。 これらは、タイプミスを修正するなどの小さなもから、実質的な変更を伴うものまでにもなります。 このような要求は役に立ちますが、時には、特に変更する *やり方* に具体的な提案が含まれていないと、唐突な、または役に立たないものに出くわすことがあります。

がっかりさせないようにしてください。 レビューが不公平であると感じる場合は、そう言い、別のプロジェクトのコントリビューターの意見を求めてください。 しばしば、そのようなコメントは、レビュアーがレビューするのに十分な時間を取らない結果で、意図しないものです。 そのような困難はしばしば少しの忍耐で解決することができます。 これは、査読者は役に立つフィードバックを提供することが期待されるべきだということです。

### ステップ11: 取り込み

取り込まれるには、少なくとも1人の Electron の Code Ownerがレビューして承認し、CI に合格する必要があります。 その後、他のコントリビューターからの異論がない場合、プルリクエストをマージすることができます。

おめでとう、あなたのコントリビューションに感謝します！

### 継続的インテグレーションテスト

すべてのプルリクエストは、継続的インテグレーション (CI) システムでテストされ、 それが Electron のサポートされているプラットフォームで動作することを確認されます。

理想的には、プルリクエストは CI のすべてのプラットフォーム上で合格します ("青になる") 。 これは、すべてのテストが合格し、lint のエラーがないことを意味します。 しかし、CI インフラストラクチャ自体が特定のプラットフォームで失敗したり、いわゆる "flaky" テストに失敗する ("赤になる") ことは珍しいことではありません。 各 CI の失敗を手動で検査して原因を特定する必要があります。

プルリクエストを開くと、CI が自動的に開始されますが、[Releasers](https://github.com/orgs/electron/teams/releasers/members) だけが CI の実行をリスタートできます。 CI が誤検知をしていると思われる場合は、Releaser にテストをリスタートするよう依頼してください。