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

변경 사항과 그 이유를 담고 있어야 좋은 커밋 메시지라고 할 수 있습니다. Electron 프로젝트는 릴리스 과정을 능률적으로 처리하기 위해 [시맨틱 커밋 메시지](https://conventionalcommits.org/) 를 사용합니다.

Pull request는 merge하기 전에 시맨틱 접두사와 pull request 제목의 형태로 **구성해야 한다**.

시멘틱 접두사를 함께 사용한 커밋 메시지 예시:

* `fix: don't overwrite prevent_default if default wasn't prevented`
* `feat: add app.isPackaged() method`
* `docs: app.isDefaultProtocolClient is now available on Linux`

자주 사용하는 접두사:

    - fix: 버그 수정
    - feat: 새로운 기능
    - docs: 문서 변경
    - test: 누락된 테스트 추가 또는 기존 테스트 수정
    - build: 빌드 시스템에 영향을 주는 변경 사항
    - ci: CI 설정 파일과 스크립트 관련 변경 사항
    - perf: 성능 향상과 관련된 코드 변경
    - refactor: 버그 수정이나 기능 추가 이외의 코드 변경
    - style: 코드에 직접 영향을 주지 않는 변경 사항 (linting 같은)
    - vendor: libchromiumcontent 또는 node 같은 의존성 버전 증가
    

그 밖의 커밋 메시지 작성 시 주의 사항은 다음과 같습니다:

1. 첫 번째 라인 작성 규칙: 
  * 변경 사항에 대한 간단한 설명 (50자 내외, 72자 이내로 작성할 것)
  * 고유 명사, 두문자어, 함수나 변수 이름과 같은 코드와 관련된 단어를 제외하고는 소문자로 작성할 것
2. 두 번째 라인은 공백으로 남겨둘 것
3. 72 줄 이내로 작성할 것

#### 중대한 변화

커밋 메시지 본문이나 footer 섹션이 `BREAKING CHANGE:` 으로 시작하면 API에 중대한 변화(시멘틱 버전 관리에서 메이저 버전 증가에 해당함) 가 있다는 것을 의미합니다. 모든 형태의 커밋은 중대한 변화를 포함할 수 있습니다. 예를 들면, `fix:`, `feat:`, `chore:` 를 포함한 모든 형태의 커밋이 중대한 변화를 포함할 수 있습니다.

더 자세한 내용은 [conventionalcommits.org](https://conventionalcommits.org) 를 참고하시길 바랍니다.

### 6 단계: Rebase

변경 사항에 대한 커밋을 완료했다면 메인 저장소를 기준으로 변경 사항을 동기화하기 위해 `git rebase` (`git merge` 가 아님) 를 수행하는 것이 좋습니다.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

이 명령은 `electron/electron` maste에서 가장 최근에 발생한 변경 사항을 여러분의 작업 브랜치에 반영할 수 있게 도와줄 것입니다.

### 7 단계: 테스트

버그 수정 및 새로운 기능과 관련된 커밋은 항상 테스트를 동반해야 합니다. 테스트 진행을 돕기 위해 [테스팅 가이드 문서](https://electronjs.org/docs/development/testing) 를 제공하고 있습니다. 다른 테스트가 어떤 구조로 작성되었는지 참고하시면 많은 도움이 될 것입니다.

Pull request로 변경 사항을 제출하기 전에, 항상 전체 테스트를 수행하시길 바랍니다. 테스트를 실행하는 명령어는 다음과 같습니다:

```sh
$ npm run test
```

linter가 어떠한 이슈도 보고하지 않았고, 모든 테스트도 통과되었는지 확인하세요. Please do not submit patches that fail either check.

테스트를 수정한 후 단일 spec 에 대한 테스트 결과를 확인하고 싶은 경우 아래의 명령을 사용할 수 있습니다:

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

GitHub에서 새로운 pull request를 생성하면 작성 방법이 서술된 템플릿이 나타날 것입니다.

```markdown
<!--
Thank you for your pull request. Please provide a description above and review
the requirements below.

Bug fixes and new features should include tests and possibly benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### 10 단계: 토론 및 업데이트

제출한 pull request에 대해 피드백을 받거나 내용 수정을 요청받을 수도 있습니다. 이러한 수정 요청이나 피드백은 pull request 처리 과정에서 중요한 부분이므로 거부감을 느끼지 않으셨으면 합니다! Some contributors may sign off on the pull request right away. Others may have detailed comments or feedback. This is a necessary part of the process in order to evaluate whether the changes are correct and necessary.

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