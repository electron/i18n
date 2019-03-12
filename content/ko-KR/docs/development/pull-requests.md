# Pull Requests

* [로컬 환경 설정](#setting-up-your-local-environment) 
  * [1 단계: Fork](#step-1-fork)
  * [2 단계: 빌드](#step-2-build)
  * [3 단계: 브랜치](#step-3-branch)
* [변경 작업 순서](#making-changes) 
  * [4 단계: 코드](#step-4-code)
  * [5 단계: 커밋](#step-5-commit) 
    * [커밋 메시지 가이드라인](#commit-message-guidelines)
  * [6 단계: Rebase](#step-6-rebase)
  * [7 단계: 테스트](#step-7-test)
  * [8 단계: Push](#step-8-push)
  * [9 단계: Pull Request 생성하기](#step-9-opening-the-pull-request)
  * [10 단계: 토론 및 업데이트](#step-10-discuss-and-update) 
    * [승인 및 변경 요청 작업 흐름](#approval-and-request-changes-workflow)
  * [11 단계: 랜딩](#step-11-landing)
  * [지속적인 통합 테스팅](#continuous-integration-testing)

## 로컬 환경 설정

### 1 단계: Fork

Fork the project [GitHub](https://github.com/electron/electron) 에서 프로젝트를 fork하고 로컬에 clone 합니다.

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### 2 단계: 빌드

운영 체제에 따라 빌드 단계나 의존성이 약간씩 차이가 있습니다. Electron을 로컬에서 빌드하는 방법을 다룬 아래 가이드 문서를 참고하세요:

* [MacOS에서 빌드하기](https://electronjs.org/docs/development/build-instructions-macos)
* [리눅스에서 빌드하기](https://electronjs.org/docs/development/build-instructions-linux)
* [Windows에서 빌드하기](https://electronjs.org/docs/development/build-instructions-windows)

로컬에서 프로젝트를 빌드했다면 변경 작업을 시작할 준비는 마쳤다고 보시면 됩니다.

### 3 단계: 브랜치

구성한 개발 환경을 보존하기 위해, 작업 내용을 저장할 로컬 브랜치를 생성합니다. 이 브랜치들은 `master` 브랜치를 기반으로 생성해야 합니다.

```sh
$ git checkout -b my-branch -t upstream/master
```

## 변경 작업 순서

### 4 단계: 코드

`electron/electron` 저장소에 생성된 pull requests 내용에는 `atom/` 폴더의 C/C++ 코드 변경 사항이 포함되기도 하고, `lib/` 폴더의 JavaScript 코드 변경 사항이 포함될 때도 있으며, `docs/api/` 폴더의 문서 내용에 대한 변경 사항, `spec/` 폴더의 테스트 관련 변경 사항이 포함될 때도 있습니다.

프로젝트 코드 스타일 통일을 위해 코드를 변경할 때마다 `npm run lint`를 실행해주시길 바랍니다.

[코딩 스타일](https://electronjs.org/docs/development/coding-style) 문서의 모범 사례를 확인하여 프로젝트 안의 다양한 프로그래밍 언어 코드를 수정할 때 적용해 보시길 바랍니다.

### 5 단계: 커밋

개별 커밋 안에 논리적으로 그룹화해서 변경 사항을 유지하시길 권장합니다. 변경 사항이 여러 개의 커밋으로 구분되어 있으면, 리뷰할 곳을 쉽게 찾을 수 있습니다. Pull request 안의 커밋은 횟수 제한이 없습니다.

```sh
$ git add my/changed/files
$ git commit
```

최종적으로 변경 사항이 코드에 반영될 때 여러 개의 커밋은 squash 하는 경우가 많습니다.

#### 커밋 메시지 가이드라인

A good commit message should describe what changed and why. The Electron project uses [semantic commit messages](https://conventionalcommits.org/) to streamline the release process.

Before a pull request can be merged, it **must** have a pull request title with a semantic prefix.

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
    - vendor: Bumping a dependency like libchromiumcontent or node
    

Other things to keep in mind when writing a commit message:

1. The first line should: 
  * contain a short description of the change (preferably 50 characters or less, and no more than 72 characters)
  * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code, like function/variable names
2. Keep the second line blank.
3. Wrap all other lines at 72 columns.

#### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with Major in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

### 6 단계: Rebase

Once you have committed your changes, it is a good idea to use `git rebase` (not `git merge`) to synchronize your work with the main repository.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

This ensures that your working branch has the latest changes from `electron/electron` master.

### 7 단계: 테스트

Bug fixes and features should always come with tests. A [testing guide](https://electronjs.org/docs/development/testing) has been provided to make the process easier. Looking at other tests to see how they should be structured can also help.

Before submitting your changes in a pull request, always run the full test suite. To run the tests:

```sh
$ npm run test
```

Make sure the linter does not report any issues and that all tests pass. Please do not submit patches that fail either check.

If you are updating tests and want to run a single spec to check it:

```sh
$ npm run test -match=menu
```

The above would only run spec modules matching `menu`, which is useful for anyone who's working on tests that would otherwise be at the very end of the testing cycle.

### 8 단계: Push

Once your commits are ready to go -- with passing tests and linting -- begin the process of opening a pull request by pushing your working branch to your fork on GitHub.

```sh
$ git push origin my-branch
```

### 9 단계: Pull Request 생성하기

From within GitHub, opening a new pull request will present you with a template that should be filled out:

```markdown
<!--
Thank you for your pull request. Please provide a description above and review
the requirements below.

Bug fixes and new features should include tests and possibly benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### 10 단계: 토론 및 업데이트

You will probably get feedback or requests for changes to your pull request. This is a big part of the submission process so don't be discouraged! Some contributors may sign off on the pull request right away. Others may have detailed comments or feedback. This is a necessary part of the process in order to evaluate whether the changes are correct and necessary.

To make changes to an existing pull request, make the changes to your local branch, add a new commit with those changes, and push those to your fork. GitHub will automatically update the pull request.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

There are a number of more advanced mechanisms for managing commits using `git rebase` that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the pull request to ping reviewers if you are awaiting an answer on something. If you encounter words or acronyms that seem unfamiliar, refer to this [glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### 승인 및 변경 요청 작업 흐름

All pull requests require approval from a [Code Owner](https://github.com/orgs/electron/teams/code-owners) of the area you modified in order to land. Whenever a maintainer reviews a pull request they may request changes. These may be small, such as fixing a typo, or may involve substantive changes. Such requests are intended to be helpful, but at times may come across as abrupt or unhelpful, especially if they do not include concrete suggestions on *how* to change them.

Try not to be discouraged. If you feel that a review is unfair, say so or seek the input of another project contributor. Often such comments are the result of a reviewer having taken insufficient time to review and are not ill-intended. Such difficulties can often be resolved with a bit of patience. That said, reviewers should be expected to provide helpful feeback.

### 11 단계: 랜딩

In order to land, a pull request needs to be reviewed and approved by at least one Electron Code Owner and pass CI. After that, if there are no objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### 지속적인 통합 테스팅

Every pull request is tested on the Continuous Integration (CI) system to confirm that it works on Electron's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms. This means that all tests pass and there are no linting errors. However, it is not uncommon for the CI infrastructure itself to fail on specific platforms or for so-called "flaky" tests to fail ("be red"). Each CI failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only [Releasers](https://github.com/orgs/electron/teams/releasers/members) can restart a CI run. If you believe CI is giving a false negative, ask a Releaser to restart the tests.