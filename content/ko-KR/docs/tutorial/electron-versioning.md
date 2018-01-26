# Electron 버전 관리

> Electron 버전 관리 정책과 구현에 대해 자세히 설명하고 있습니다.

Electron 2.0.0 버전부터 [semver](#semver)규칙에 따라 버전을 관리하고 있습니다. 아래의 명령어는 Electron 최신 안정(stable) 버전을 설치할 것 입니다:

```sh
npm install --save-dev electron
```

최신 안정 버전을 사용하기 위해 기존 프로젝트를 업데이트하려면 아래 명령어를 사용하세요:

```sh
npm install --save-dev electron@latest
```

## 버전 1.x

Electron *< 2.0* 버전은 [semver](http://semver.org) 스펙을 따르지 않았습니다. 메이저 버전은 사용자(end-user) API 변화와 관련있습니다. 마이너 버전은 Chromium 메이저 버전 출시에 연관되어 있습니다. 패치 버전은 새로운 기능, 버그 수정에 해당합니다. 기능 추가(merge)는 일부 개발자들은 편리하게 느낄 수 있을지 모르겠지만, 클라이언트 애플리케이션을 작성하는 개발자에게는 이 상황이 문제가 될 수 있습니다. Slack, Stride, Teams, Skype, VS Code, Atom, Desktop 과 같은 유명 앱들의 QA 테스트 사이클은 오래 걸리고, 높은 수준의 안정성이 요구됩니다. 버그 수정을 하면서 새로운 기능을 추가하는 것은 상당한 위험 부담이 있습니다.

1.x 버전 전략 예제입니다.

![](../images/versioning-sketch-0.png)

`1.8.1` 버전 앱은 `1.8.2` 기능을 추가하거나 버그를 백포트(backport) 방식으로 수정하고 새로운 출시 라인(release line)을 유지하기 전까지는 `1.8.3` 버전 버그 수정을 적용할 수 없습니다.

## 2.0 버전 이상

1.x 전략과 비교하면 아래와 같은 몇 가지 주요한 변화가 있습니다. 각 변경사항은 개발자/관리자, 앱 개발자들의 우선 순위와 요구를 만족시키는데 그 목적이 있습니다.

1. 엄격한 semver 규칙 사용
2. semver 규칙을 준수하는 `-beta` 태그 도입
3. [관례적인 커밋 메시지](https://conventionalcommits.org/) 도입
4. 확실하게 정의된 안정화(stabilization) 브랜치
5. `master` 브랜치는 버전이 없음; stability 브랜치만 버전 정보를 포함하고 있음

git 브랜치 동작 방법, npm 태깅 동작 방식, 개발자가 보기를 원하는 것, 백포트 방식으로 변경하는 방법에 대해서는 아래에서 자세히 다룰 예정입니다.

# semver

2.0 버전 이후부터 Electron은 semver 규칙을 따르고 있습니다.

변경사항 종류와 semver 카테고리(예. 메이저, 마이너, 패치)를 서로 연결시키면 아래와 같습니다.

* **메이저 버전 증가** 
    * Chromium 버전 업데이트
    * node.js 메이저 버전 업데이트
    * Electron API의 큰 변화
* **마이너 버전 증가** 
    * node.js 마이너 버전 업데이트
    * Electron API의 미세한 변경
* **패치 버전 증가** 
    * node.js 패치 버전 업데이트
    * 수정 관련 chromium 패치
    * electron 버그 수정

대부분의 chromium 업데이트는 큰 변화로 인식된다는 점을 기억하세요. 백포트 가능한 수정사항들은 패치로 체리-피크(cherry-pick)될 수 있습니다.

# 안정화(Stabilization) 브랜치

안정화 브랜치들은 master 브랜치와 병행해서 운영하는 브랜치이며, 보안과 안정성과 관련된 체리-피크 커밋만 받아들입니다. 이들 브랜치들은 master에 절대 병합(merge)하지 않습니다.

![](../images/versioning-sketch-1.png)

안정화 브랜치들은 항상 **메이저** 또는 **마이너** 버전이며, `$MAJOR-$MINOR-x`와 같은 형태의 이름을 사용하며 예를 들어 `2-0-x`와 같은 이름으로 구성됩니다.

필요에 따라 보안 관련 백포팅 수정이 필요하기 때문에 최소한 두 개의 안정화 브랜치를 병행해서 지원하며 이로 인해 여러 개의 안정화 브랜치들이 동시에 존재할 수 있습니다. ![](../images/versioning-sketch-2.png)

오래된 라인은 GitHub가 지원하지 않을 것입니다. 하지만 다른 그룹들이 이들에 대해 소유권을 가질 수 있으며 백포트 안정화, 보안 관련 사항 수정 등을 할 수 있습니다. 저희는 이를 장려하지는 않지만, 이것이 많은 앱 개발자들의 삶을 훨씬 쉽게 만들어 준다는 사실은 알아두시길 바랍니다.

# 베타 출시와 버그 수정

개발자들은 어떤 출시 버전을 *안전하게* 사용할 수 있는지 알고 싶어합니다. 문제가 없는 것처럼 보이는 기능도 복잡한 애플리케이션에서는 회귀(regression) 버그를 일으킬 수 있습니다. 또한, 특정 버전만 고집하는 것은 해당 버전이후에 발생할 수 있는 보안 패치와 버그 수정을 무시하는 것이기 때문에 매우 위험합니다. 우리의 목표는 `package.json` 안에서 아래의 표준 semver 범위를 따르도록 하는 것입니다:

* `~2.0.0`을 사용하면 `2.0.0` 출시 버전에 안정화, 보안과 관련된 수정사항만 허락합니다.
* `^2.0.0`을 사용하면 보안, 버그 수정 뿐만 아니라 매우 크지는 않지만 *상당히 안정적인* 기능들도 허락합니다.

두 번째 항목에서 중요한 점은 `^`을 사용하는 앱에서도 상당한 수준의 안정성이 보장되어야 한다는 것입니다. 이를 위해, semver는 아직 *안전하거나* *안정적이지 않은* 특정 버전을 나타내기 위해 *pre-release identifier*를 제공합니다.

어떤 것을 선택하든지, Chromium은 큰 변화가 자주 발생하기 때문에 `package.json` 안의 버전을 주기적으로 증가시켜야 합니다.

프로세스는 다음과 같습니다:

1. 모든 신규 메이저, 마이너 버전 출시 라인은 `-beta.N` 태그로 시작하고, `N >= 1` 이어야 한다. 이 시점에서는, 기능과 관련된 부분은 **잠깁니다(locked)**. 이 출시 라인은 기능 추가는 허용되지 않으며, 보안과 안정성에만 초점을 맞추고 있습니다. 예. `2.0.0-beta.1`.
2. 버그 수정, 회귀(regression) 수정, 보안 패치가 허용됩니다. 이를 위해 새로운 베타 버전은 `N` 을 증가시켜 출시합니다. 예. `2.0.0-beta.2`
3. 특정 베타 출시 버전이 *일반적으로* 안정적이라고 여겨지면, 안정적인 빌드 버전으로 버전 정보만 수정해서 재출시될 것입니다. 예. `2.0.0`.
4. 안정 버전이 출시된 이후에 버그 수정이나 보안 패치 등이 필요한 경우 *패치* 버전을 증가시킵니다 예. `2.0.1`.

메이저, 마이너 버전 증가를 위해 아래와 같은 것을 보길 원할 것입니다.

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

주기(lifecycle) 예제를 그림으로 표현했습니다:

* 최신 기능이 포함된 신규 출시(release) 브랜치가 생성되었습니다. 이 브랜치는 `2.0.0-beta.1`라는 이름을 갖고 있습니다. ![](../images/versioning-sketch-3.png)
* 출시(release) 브랜치로 백포트 가능한 master 브랜치에서 버그 수정이 발생했습니다. 패치를 적용하고 새로운 베타 버전이 `2.0.0-beta.2`라는 이름으로 출시되었습니다. ![](../images/versioning-sketch-4.png)
* 베타 버전이*일반적으로 안정적*이라고 평가받아서 베타 버전이 아닌 `2.0.0`라는 이름으로 다시 출시되었습니다. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We pack-port the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

A few examples of how various semver ranges will pick up new releases:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas, and Nightly

Our strategy has a few tradeoffs, which for now we feel are appropriate. Most importantly that new features in master may take a while before reaching a stable release line. If you want to try a new feature immediately, you will have to build Electron yourself.

As a future consideration, we may introduce one or both of the following:

* nightly builds off of master; these would allow folks to test new features quickly and give feedback
* alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in *alpha*

# Feature Flags

Feature flags are a common practice in Chromium, and are well-established in the web-development ecosystem. In the context of Electron, a feature flag or **soft branch** must have the following properties:

* is is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
* it completely segments new and old code paths; refactoring old code to support a new feature *violates* the feature-flag contract
* feature flags are eventually removed after the soft-branch is merged

We reconcile flagged code with our versioning strategy as follows:

1. we do not consider iterating on feature-flagged code in a stability branch; even judicious use of feature flags is not without risk
2. you may break API contracts in feature-flagged code without bumping the major version. Flagged code does not adhere to semver

# Semantic Commits

We seek to increase clarity at all levels of the update and releases process. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

* Commits that would result in a semver **major** bump must start with `BREAKING CHANGE:`.
* Commits that would result in a semver **minor** bump must start with `feat:`.
* Commits that would result in a semver **patch** bump must start with `fix:`.

* We allow squashing of commits, provided that the squashed message adheres the the above message format.

* It is acceptable for some commits in a pull request to not include a semantic prefix, as long as a later commit in the same pull request contains a meaningful encompassing semantic message.

# Versionless `master`

* The `master` branch will always contain `0.0.0-dev` in its `package.json`
* Release branches are never merged back to master
* Release branches *do* contain the correct version in their `package.json`