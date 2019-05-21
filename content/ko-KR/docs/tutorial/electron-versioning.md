# Electron 버전 관리

> Electron 버전 관리 정책과 구현 방식에 대해 자세히 설명하고 있습니다.

Electron 2.0.0 버전부터는 [semver](#semver) 규칙에 따라 버전을 관리하고 있습니다. 아래의 명령어는 Electron 최신 안정(stable) 버전을 설치할 것입니다:

```sh
npm install --save-dev electron
```

최신 안정 버전을 사용하기 위해 기존 프로젝트를 업데이트하려면 아래 명령어를 사용하세요:

```sh
npm install --save-dev electron@latest
```

## 버전 1.x

Electron 버전 2.0 아래에서는 [semver](http://semver.org) 스펙을 따르지 않았습니다: semver 스펙에서 메이저 버전은 사용자 API 변화, 마이너 버전은 Chromium 메이저 버전 출시, 패치 버전은 새로운 기능이나 버그 수정에 해당합니다. 기능 추가(merge)는 일부 개발자들은 편리하게 느끼겠지만, 클라이언트 애플리케이션을 작성하는 개발자에게는 이 상황이 문제가 될 수 있습니다. Slack, Stride, Teams, Skype, VS Code, Atom, Desktop 과 같은 유명 앱들의 QA 테스트 사이클은 오래 걸리고, 높은 수준의 안정성이 요구됩니다. 버그 수정을 하면서 새로운 기능을 추가하는 것은 상당한 위험 부담이 있습니다.

1.x 버전 전략 예제입니다.

![](../images/versioning-sketch-0.png)

`1.8.1` 버전 앱은 `1.8.2` 기능을 추가하거나 버그를 백포트(backport) 방식으로 수정하고 새로운 출시 라인(release line)을 생성해서 유지하기 전까지는 `1.8.3` 버전 버그 수정을 적용할 수 없습니다.

## 2.0 버전 이상

1.x 전략과 비교하면 아래와 같은 몇 가지 주요한 변화가 있습니다. 각 변경사항은 개발자/관리자, 앱 개발자들의 우선 순위와 요구를 만족시키는데 그 목적이 있습니다.

1. 엄격한 semver 규칙 사용
2. semver 규칙을 준수하는 `-beta` 태그 도입
3. [관례적인 커밋 메시지](https://conventionalcommits.org/) 도입
4. 쉽게 이해할 수 있는 안정화 브랜치
5. `master` 브랜치는 버전 정보가 없음; 안정화 브랜치만 버전 정보를 가지고 있음

git 브랜치 동작 방법, npm 태깅 동작 방식, 개발자가 보고 싶어하는 것, 백포트 방식으로 변경하는 방법에 대해서는 아래에서 자세히 다룰 예정입니다.

# semver

2.0 버전 이후부터 Electron은 semver 규칙을 따르고 있습니다.

변경사항 종류와 semver 카테고리(예. 메이저, 마이너, 패치)를 서로 연결시키면 아래와 같습니다.

| 메이저 버전 증가           | 마이너 버전 증가            | 패치 버전 증가           |
| ------------------- | -------------------- | ------------------ |
| Electron API의 큰 변화  | Electron API의 미세한 변경 | Electron 버그 수정     |
| Node.js 메이저 버전 업데이트 | Node.js 마이너 버전 업데이트  | Node.js 패치 버전 업데이트 |
| Chromium 버전 업데이트    |                      | 수정 관련 chromium 패치  |

대부분의 Chromium 업데이트는 큰 변화로 인식된다는 점을 기억하세요. 백포트 가능한 수정사항은 체리-피크(cherry-pick) 해서 패치로 만들 수 있습니다.

# 안정화 브랜치

안정화 브랜치들은 master 브랜치와 병행해서 운영하는 브랜치이며, 보안과 안정성과 관련된 체리-피크 커밋만 받아들입니다. 이들 브랜치들은 master에 병합(merge)하지 않습니다.

![](../images/versioning-sketch-1.png)

안정화 브랜치들은 항상 **메이저** 또는 **마이너** 버전이며, `$MAJOR-$MINOR-x`와 같은 형태의 이름을 사용하며 `2-0-x`와 같은 이름으로 구성됩니다.

필요에 따라 백포팅을 통한 보안 관련 사항 수정이 필요하기 때문에 최소한 두 개의 안정화 브랜치를 병행해서 지원하며 이로 인해 여러 개의 안정화 브랜치들이 동시에 존재할 수 있습니다. ![](../images/versioning-sketch-2.png)

오래된 라인은 GitHub가 지원하지 않을 것입니다. 하지만 다른 그룹들이 이들에 대해 소유권을 가질 수 있으며 그들만의 안정화, 보안 관련 수정 사항 등을 백포트 할 수 있습니다. 저희는 이를 장려하지는 않지만, 이것이 많은 앱 개발자들의 삶을 훨씬 쉽게 만들어 준다는 사실만은 기억해두시길 바랍니다.

# 베타 출시와 버그 수정

개발자들은 어떤 출시 버전을 *안전하게* 사용할 수 있는지 알고 싶어합니다. 문제가 없는 것처럼 보이는 기능도 복잡한 애플리케이션에서는 회귀(regression) 버그를 일으킬 수 있습니다. 또한, 특정 버전만 고집하는 것은 해당 버전 이후에 발생할 수 있는 보안 패치와 버그 수정을 무시하는 것이기 때문에 매우 위험합니다. 우리의 목표는 아래의 표준 semver 범위에 따라 `package.json`을 작성하도록 만드는 것입니다:

- `~2.0.0`을 사용하면 `2.0.0` 출시 버전에는 안정화, 보안과 관련된 수정사항만 허락됩니다.
- `^2.0.0`을 사용하면 보안, 버그 수정 뿐만 아니라 큰 변화를 초래하지는 않으면서도 *상당히 안정적인* 기능도 추가할 수 있습니다.

두 번째 항목에서 중요한 점은 `^`을 사용하는 앱에서도 상당한 수준의 안정성이 보장되어야 한다는 것입니다. 이를 위해, semver는 아직 *안전하거나* *안정적이지 않은* 특정 버전을 나타내기 위해 *pre-release 식별자(identifier)*를 제공합니다.

어떤 것을 선택하든지, Chromium은 큰 변화가 자주 발생하기 때문에 `package.json` 안의 버전을 주기적으로 증가시켜야 합니다.

프로세스는 다음과 같습니다:

1. 모든 새 메이저와 마이너 릴리즈 라인은 베타 시리즈를 암시하는 프리릴리즈 태그 앞에둡니다. 바로 `beta.N`입니다. 예를 들면 다음 처럼요. `2.0.0-beta.1`. 처음 베타 이후엔, 이어지는 베타 릴리즈들은 다음과 같은 제약사항을 만족해야 합니다. 
    1. 변화는 기존 API 와의 호환성을 보장해야 한다. (비활성화는 괜찮습니다.)
    2. 우리의 안정성 타임라인(stability timeline) 을 만날 위험이 반드시 낮아야 한다.
2. If allowed changes need to be made once a release is beta, they are applied and the prerelease tag is incremented, e.g. `2.0.0-beta.2`.
3. If a particular beta release is *generally regarded* as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`. After the first stable, all changes must be backwards-compatible bug or security fixes.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the *patch* version is incremented e.g. `2.0.1`.

Specifically, the above means:

1. Admitting non-breaking-API changes early in the beta cycle is okay, even if those changes have the potential to cause moderate side-affects
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort very late in the beta cycle is 

메이저, 마이너 버전이 증가하면 다음과 같은 버전 정보를 갖게 될 것입니다:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

주기(lifecycle) 예제를 그림으로 표현하면 다음과 같습니다:

- 최신 기능이 포함된 신규 출시(release) 브랜치가 생성되었습니다. 이 브랜치는 `2.0.0-beta.1`라는 이름으로 공개(publish)됩니다. ![](../images/versioning-sketch-3.png)
- master 브랜치에서 버그 수정을 하고 출시(release) 브랜치로 백포트할 수 있습니다. 패치가 적용된 새로운 베타 버전은 `2.0.0-beta.2`라는 이름으로 공개됩니다. ![](../images/versioning-sketch-4.png)
- 베타 버전이*일반적으로 안정적*이라고 평가받아서 베타 버전이 아닌 `2.0.0`라는 이름으로 다시 공개되었습니다. ![](../images/versioning-sketch-5.png)
- 이후에, zero-day 익스플로잇이 발견되어 master 브랜치가 수정되었습니다. `2-0-x` 라인에서 백포트로 수정 사항을 반영한 다음 `2.0.1` 버전을 출시합니다. ![](../images/versioning-sketch-6.png)

아래는 다양한 semver 범위에 따라 새로운 출시 버전이 결정되는 것을 보여주는 예제들입니다:

![](../images/versioning-sketch-7.png)

# 누락된 기능: 알파

우리의 전략은 몇 가지 단점(tradeoff)이 있지만, 현재 시점에서는 이 전략이 적절하다고 생각합니다. 가장 큰 단점은 master 브랜치의 새로운 기능이 안정 버전 출시 라인에 반영되기 전까지 상당한 시간이 걸릴 수도 있다는 점입니다. 새로운 기능을 즉시 사용하고 싶다면 Electron을 직접 빌드해야 할 것입니다.

향후에는 아래의 사항을 도입할 수도 있습니다:

- 베타 버전에 비해 안정성 요건을 약하게 적용한 알파 출시 버전; 예를 들면, 안정성 채널은 *베타*에 유지하면서 알파 출시 버전에 새로운 기능을 허용할 수 있습니다.

# 기능 플래그(Feature Flags)

기능 플래그는 Chromium에서 자주 쓰이며, 웹 개발 환경에서 일반적으로 사용되고 있습니다. Electron에서 기능 플래그 또는 **소프트 브랜치**는 다음과 특성을 가져야 합니다:

- 런타임 또는 빌드시 활성화/비활성화 할 수 있음; Electron에서는 요청 범위(request-scoped) 기능 플래그 개념은 지원하지 않음
- 새로운 코드 경로와 예전 코드 경로는 완전히 분리됨; 새로운 기능을 지원하기 위해 예전 코드를 리팩토링하는 것은 기능 플래그 규칙을 *위반하는 것임*
- 기능 플래그들은 기능이 배포된 뒤에는 지워집니다.

# 시맨틱 커밋

저희는 업데이트와 출시 과정의 모든 단계에서 명확성이 향상되길 원합니다. `2.0.0` 버전을 기점으로, 모든 pull request는 [관례적인 커밋](https://conventionalcommits.org/) 스펙에 따라 작성되어야 하며, 커밋 스펙을 요약하면 다음과 같습니다:

- semver **메이저** 버전 증가로 이어지는 커밋의 본문은 `BREAKING CHANGE:` 로 시작해야 합니다.
- semver **마이너** 버전 증가로 이어지는 커밋은 `feat:` 로 시작해야 합니다.
- semver **패치** 버전 증가로 이어지는 커밋은 `fix:`로 시작해야 합니다.

- 커밋 스쿼싱(sqaushing)은 허용되며, 스쿼시된 메시지는 앞에서 언급한 메시지 포맷을 따라야 합니다.

- 풀 리퀘스트의 몇몇 커밋이 시맨틱 선행자를 가지지 않는 것은 괜찮습니다. 풀 리퀘스트 타이틀이 시맨틱한 의미를 전달하기만 한다면요.

# Versioned `master`

- `master` 브랜치는 언제나 다음 메이저 버전의 `X.0.0-nightly.DATE` 를 자신의 `package.json` 안에 가지고 있습니다.
- 출시 브랜치는 master 브랜치로 병합되지 않습니다.
- 출시 브랜치는 `package.json` 안에 정확한 버전을 포함*할 수* 있습니다.
- 릴리즈 브랜치가 메이저 배포를 완성하면, 마스터 브랜치는 다음 메이저 버전으로 넘어가야 합니다. 예를 들면, `master`는 언제나 예상되는 다음 릴리즈 브랜치의 버전을 씁니다.