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

Pull request는 merge하기 전에 시맨틱 접두사와 pull request 제목의 형태로 **구성해야 합니다**.

시멘틱 접두사를 함께 사용한 커밋 메시지 예시:

- `fix: don't overwrite prevent_default if default wasn't prevented`
- `feat: add app.isPackaged() method`
- `docs: app.isDefaultProtocolClient is now available on Linux`

자주 사용하는 접두사:

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

그 밖의 커밋 메시지 작성 시 주의 사항은 다음과 같습니다:

1. 첫 번째 라인 작성 규칙:
   - contain a short description of the change (preferably 50 characters or less, and no more than 72 characters)
   - 고유 명사, 두문자어, 함수나 변수 이름과 같은 코드와 관련된 단어를 제외하고는 소문자로 작성할 것
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

이 명령은 `electron/electron` master에서 가장 최근에 발생한 변경 사항을 여러분의 작업 브랜치에 반영할 수 있게 도와줄 것입니다.

### 7 단계: 테스트

버그 수정 및 새로운 기능과 관련된 커밋은 항상 테스트를 동반해야 합니다. 테스트 진행을 돕기 위해 [테스팅 가이드 문서](https://electronjs.org/docs/development/testing) 를 제공하고 있습니다. 다른 테스트가 어떤 구조로 작성되었는지 참고하시면 많은 도움이 될 것입니다.

Pull request로 변경 사항을 제출하기 전에, 항상 전체 테스트를 수행하시길 바랍니다. 테스트를 실행하는 명령어는 다음과 같습니다:

```sh
$ npm run test
```

linter가 어떠한 이슈도 보고하지 않았고, 모든 테스트도 통과되었는지 확인하세요. 테스트에 실패한 패치는 제출하지 마시길 바랍니다.

테스트를 수정한 후 단일 spec 에 대한 테스트 결과를 확인하고 싶은 경우 아래의 명령을 사용할 수 있습니다:

```sh
$ npm run test -match=menu
```

위의 명령어는 `menu`에 해당하는 spec 모듈만 실행하기 때문에, 테스팅 사이클이 거의 끝나가는 시점에서 특정 모듈을 테스트하고 싶을 때 유용합니다.

### 8 단계: Push

커밋에 대한 테스트, linting 과정에서 아무런 문제가 발생하지 않았다면, 이제 GitHub의 fork 저장소에 작업한 브랜치를 push해서 pull request를 생성할 차례입니다.

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

제출한 pull request에 대해 피드백을 받거나 내용 수정을 요청받을 수도 있습니다. 이러한 수정 요청이나 피드백은 pull request 처리 과정에서 중요한 부분이므로 거부감을 느끼지 않으셨으면 합니다! pull request이 제출되면 바로 승인하는 공헌자도 있습니다. 어떤 사람들은 자세한 댓글이나 피드백을 남기기도 합니다. 이러한 참여는 변경 사항의 정확성과 필요성을 평가하기 위해 꼭 필요한 절차입니다.

기존 pull request를 변경하고 싶다면, 로컬 브랜치에서 수정한 후 새로운 커밋을 추가하고 fork 저장소로 해당 커밋을 push 하면 됩니다. GitHub는 자동으로 pull request를 업데이트할 것입니다.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

`git rebase`를 사용해 커밋을 관리하는 고급 메커니즘이 몇 가지 있지만 해당 내용은 이 문서의 범위를 벗어난 주제인 것 같습니다.

리뷰어의 답변을 기다린다면 리뷰어가 확인할 수 있게 pull request에 댓글을 남기시길 바랍니다. 익숙하지 않은 단어나 두문자어가 있다면 [용어집](https://sites.google.com/a/chromium.org/dev/glossary)을 참고하시길 바랍니다.

#### 승인 및 변경 요청 작업 흐름

변경 사항이 발생한 영역의 [코드 소유자(Code Owner)](https://github.com/orgs/electron/teams/code-owners)가 pull request를 승인해야 변경 사항이 최종적으로 반영됩니다. 관리자가 pull request를 리뷰할 때 수정을 요청하는 경우도 있습니다. 사소한 오탈자 수정 요청일 때도 있고 상당히 많은 변화를 요구하는 경우도 있습니다. 이러한 요청은 도움을 주는데 그 목적이 있습니다. 하지만 때로는 퉁명스러운 태도로 요청하는 경우도 있고, *어떻게* 변경해야하는지 구체적으로 제안하지 않는 경우 수정 요청이 전혀 도움이 되지 않을 때도 있습니다.

이런 경우가 발생하더라도 의욕을 잃지 않길 바랍니다. 리뷰 결과가 부당하다고 생각하신다면, 리뷰가 부당하다는 의견을 밝히시거나 다른 공헌자의 의견을 들어보시길 바랍니다. 이런 상황은 악의적인 의도에서 비롯된 것이 아니라 리뷰어가 충분한 시간을 가지고 리뷰하지 않았을 때 주로 발생합니다. 시간이 종종 이 문제를 해결해 줄 수 있습니다. 조금만 인내심을 가지고 기다려주시길 바랍니다. 그렇다 하더라도, 리뷰어는 도움이 되는 피드백을 제공하려고 항상 노력해야 합니다.

### 11 단계: 랜딩

Pull request가 반영되려면 리뷰를 거쳐야 하며, 한 명 이상의 Electron 코드 소유자에게 승인을 받고 CI도 통과해야 합니다. 이후, 다른 공헌자들이 반대하지 않는다면 pull request는 merge 될 수 있습니다.

축하합니다 그리고 공헌해주셔서 감사합니다!

### 지속적인 통합 테스팅

Electron에서 지원하는 모든 플랫폼에서 동작하는 것을 확인하기 위해 모든 pull request는 지속적인 통합 (CI) 시스템에서 테스트됩니다.

Pull request가 모든 CI 플랫폼에서 통과("그린 표시") 하는 것이 가장 이상적일 것입니다. 이것은 모든 테스트를 통과했으며 linting 오류도 없다는 것을 의미합니다. 하지만, CI 인프라 자체에서 특정 플랫폼의 테스트가 실패하거나 "flaky" 테스트는 실패("레드 표시") 하는 경우가 자주 발생합니다. 각 CI의 실패 원인을 파악하려면 수동으로 점검해야 합니다.

Pull request가 생성되면 CI는 자동으로 시작되며, [Releasers](https://github.com/orgs/electron/teams/releasers/members)만이 CI 실행을 재시작할 수 있습니다. CI의 결과가 잘못되었다고 판단된다면 Releaser에게 테스트 재시작을 요청하시길 바랍니다.

