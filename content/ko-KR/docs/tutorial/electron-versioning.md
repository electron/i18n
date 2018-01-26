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

Note that most chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# Stabilization Branches

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

We allow for multiple stabilization branches to exist simultaneously, and intend to support at least two in parallel at all times, backporting security fixes as necessary. ![](../images/versioning-sketch-2.png)

Older lines will not be supported by GitHub, but other groups can take ownership and backport stability and security fixes on their own. We discourage this, but recognize that it makes life easier for many app developers.

# Beta Releases and Bug Fixes

Developers want to know which releases are *safe* to use. Even seemingly innocent features can introduce regressions in complex applications. At the same time, locking to a fixed version is dangerous because you’re ignoring security patches and bug fixes that may have come out since your version. Our goal is to allow the following standard semver ranges in `package.json` :

* Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
* Use `^2.0.0` to admit non-breaking *reasonably stable* feature work as well as security and bug fixes.

What’s important about the second point is that apps using `^` should still be able to expect a reasonable level of stability. To accomplish this, semver allows for a *pre-release identifier* to indicate a particular version is not yet *safe* or *stable*.

Whatever you choose, you will periodically have to bump the version in your `package.json` as breaking changes are a fact of Chromium life.

The process is as follows:

1. All new major and minor releases lines begin with a `-beta.N` tag for `N >= 1`. At that point, the feature set is **locked**. That release line admits no further features, and focuses only on security and stability. e.g. `2.0.0-beta.1`.
2. Bug fixes, regression fixes, and security patches can be admitted. Upon doing so, a new beta is released incrementing `N`. e.g. `2.0.0-beta.2`
3. If a particular beta release is *generally regarded* as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the *patch* version is incremented accordingly e.g. `2.0.1`.

For each major and minor bump, you should expect too see something like the following:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

An example lifecycle in pictures:

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be pack-ported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* The beta is considered *generally stable* and it is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
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