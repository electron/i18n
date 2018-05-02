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

A good commit message should describe what changed and why. The Electron project uses [semantic commit messages](https://conventionalcommits.org/) to streamline the release process.

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

1. The first line should: 
  * 変更の簡単な説明が含まれている (50文字以下が好ましく、72文字未満である)
  * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code, like function/variable names
2. Keep the second line blank.
3. 他のすべての行は72列で折り返します。

#### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with Major in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

### ステップ6: リベース

Once you have committed your changes, it is a good idea to use `git rebase` (not `git merge`) to synchronize your work with the main repository.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

This ensures that your working branch has the latest changes from `electron/electron` master.

### ステップ7: テスト

Bug fixes and features should always come with tests. A [testing guide](https://electronjs.org/docs/development/testing) has been provided to make the process easier. Looking at other tests to see how they should be structured can also help.

Before submitting your changes in a pull request, always run the full test suite. To run the tests:

```sh
$ npm run test
```

Make sure the linter does not report any issues and that all tests pass. Please do not submit patches that fail either check.

If you are updating tests and just want to run a single spec to check it:

```sh
$ npm run test -match=menu
```

The above would only run spec modules matching `menu`, which is useful for anyone who's working on tests that would otherwise be at the very end of the testing cycle.

### ステップ8: プッシュ

Once your commits are ready to go -- with passing tests and linting -- begin the process of opening a pull request by pushing your working branch to your fork on GitHub.

```sh
$ git push origin my-branch
```

### ステップ9: プルリクエストを開く

From within GitHub, opening a new pull request will present you with a template that should be filled out:

```markdown
<!--
Thank you for your pull request. Please provide a description above and review
the requirements below.

Bug fixes and new features should include tests and possibly benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### ステップ10: 議論と更新

You will probably get feedback or requests for changes to your pull request. This is a big part of the submission process so don't be discouraged! Some contributors may sign off on the pull request right away. Others may have detailed comments or feedback. This is a necessary part of the process in order to evaluate whether the changes are correct and necessary.

To make changes to an existing pull request, make the changes to your local branch, add a new commit with those changes, and push those to your fork. GitHub will automatically update the pull request.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

There are a number of more advanced mechanisms for managing commits using `git rebase` that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the pull request to ping reviewers if you are awaiting an answer on something. If you encounter words or acronyms that seem unfamiliar, refer to this [glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### 承認とリクエストの変更ワークフロー

All pull requests require approval from a [Code Owner](https://github.com/orgs/electron/teams/code-owners) of the area you modified in order to land. Whenever a maintainer reviews a pull request they may request changes. These may be small, such as fixing a typo, or may involve substantive changes. Such requests are intended to be helpful, but at times may come across as abrupt or unhelpful, especially if they do not include concrete suggestions on *how* to change them.

Try not to be discouraged. If you feel that a review is unfair, say so or seek the input of another project contributor. Often such comments are the result of a reviewer having taken insufficient time to review and are not ill-intended. Such difficulties can often be resolved with a bit of patience. That said, reviewers should be expected to provide helpful feeback.

### ステップ11: 取り込み

In order to land, a pull request needs to be reviewed and approved by at least one Electron Code Owner and pass CI. After that, if there are no objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### 継続的インテグレーションテスト

Every pull request is tested on the Continuous Integration (CI) system to confirm that it works on Electron's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms. This means that all tests pass and there are no linting errors. However, it is not uncommon for the CI infrastructure itself to fail on specific platforms or for so-called "flaky" tests to fail ("be red"). Each CI failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only [Releasers](https://github.com/orgs/electron/teams/releasers/members) can restart a CI run. If you believe CI is giving a false negative, ask a Releaser to restart the tests.