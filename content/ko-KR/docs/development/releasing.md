# 릴리즈

이 문서는 Electron 의 새버전 출시 절차를 설명합니다.

## 임시 브랜치 생성

`release` 혹은 사용자가 원하는 이름의 새 브랜치를 `master` 로부터 생성합니다.

참고: 백 포트 릴리스를 만드는 경우 `master`가 아닌 `1-6-x`, `1-7-x` 등을 체크 아웃합니다.

```sh
git checkout master
git pull
git checkout -b release
```

이 브랜치는 임시 릴리즈 브랜치가 생성되고 CI 빌드가 완료되는 동안 아무도 모르는 PR 병합을 방지하기위한 예방조치로써 생성됩니다.

## 남아있는 초안 확인

업로드 스크립트는 [기존 초안 릴리스를 찾습니다](https://github.com/electron/electron/blob/7961a97d7ddbed657c6c867cc8426e02c236c077/script/upload.py#L173-L181). 새 버전이 기존 초안을 손상시키지 않도록하려면 [릴리스 페이지](https://github.com/electron/electron/releases)를 확인하고 초안이 없는지 확인하십시오.

## 버전 올리기

`major,` `minor`, `patch` 를 인수로 전달하여, `bump-version` 스크립트를 실행하세요:

```sh
npm run bump-version -- patch
git push origin HEAD
```

이것은 여러 파일의 버전 번호를 올릴 것 입니다. 예시로 이 [범프 커밋](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a)을 보세요.

대부분의 릴리즈는 `patch` 수준이 될 것입니다. Chrome 또는 다른 주요 변화를 위한 업그레이드는 `minor` 를 사용해야합니다. 자세한 정보는, [Electron 버전 관리](/docs/tutorial/electron-versioning.md)를 보세요.

## 빌드를 기다리십시오 : hourglass_flowing_sand :

`bump-version` 스크립트로 작성된 커밋 메시지에 [`Bump`](https://github.com/electron/electron/blob/7961a97d7ddbed657c6c867cc8426e02c236c077/script/cibuild-linux#L3-L6)라는 단어가 있으면 [릴리스 프로세스가 시작됩니다](https://github.com/electron/electron/blob/7961a97d7ddbed657c6c867cc8426e02c236c077/script/cibuild#L82-L96).

빌드 진행 상황을 모니터링하려면 다음 페이지를 참조하십시오.

- 208.52.191.140:8080/view/All/builds for Mac and Windows
- jenkins.githubapp.com/label/chromium/ for Linux

## 릴리즈 노트 컴파일

릴리스 노트 작성은 빌드가 실행되는 동안 작업을 계속해서 유지하는 좋은 방법입니다. 또는 선행 기술의 경우, [릴리스 페이지](https://github.com/electron/electron/releases)의 기존 릴리스를 참조하십시오.

팁:

- 나열된 각 항목은 electron/electron의 PR을 참조해야하며 libcc와 같은 다른 repo의 PR은 참조 할 수 없습니다.
- PR을 참조 할 때 링크 마크 업을 사용할 필요가 없습니다. `#123`과 같은 문자열은 github.com의 링크로 자동 변환됩니다.
- Electron의 모든 버전에서 Chromium, V8 및 Node의 버전을 보려면 [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json)을 방문하십시오.

### 패치 릴리즈

`패치` 릴리스의 경우 다음 형식을 사용하십시오.

    ## Bug Fixes
    
    * Fixed a cross-platform thing. #123
    
    ### Linux
    
    * Fixed a Linux thing. #123
    
    ### macOS
    
    * Fixed a macOS thing. #123
    
    ### Windows
    
    * Fixed a Windows thing. #1234
    
    ## API Changes
    
    * Changed a thing. #123
    
    ### Linux
    
    * Changed a Linux thing. #123
    
    ### macOS
    
    * Changed a macOS thing. #123
    
    ### Windows
    
    * Changed a Windows thing. #123
    

### 마이너 릴리즈

`마이너` 버전 (일반적으로 Chromium 업데이트 및 노드 업데이트 일 수도 있음) (예: `1.8.0`, 다음 형식을 사용:

    ** 참고: ** 이것은 베타 릴리스입니다. 이 버전은 Chrome / Node.js / V8의 업그레이드 된 버전에서 실행되는 첫 번째 릴리스이며 일부 불안정성 및 / 또는 회귀 가능성이 높습니다.
    
    버그가 발견되면 새로운 문제를 제출하십시오.
    
    이 릴리즈는`beta '태그 아래 [npm] (https://www.npmjs.com/package/electron)에 게시되며`npm install electron @ beta`를 통해 설치할 수 있습니다.
    
    ## 업그레이드
    
    - Chrome 'oldVersion'에서 'newVersion'으로 업그레이드되었습니다. # 123
    - 노드`oldVersion`에서`newVersion`으로 업그레이드되었습니다. # 123
    - v8`oldVersion`에서`newVersion`으로 업그레이드되었습니다. # 9116
    
    ## 기타 변경 사항
    
    - 다른 변화. #123
    

## 릴리즈 초안 편집

1. [릴리즈 페이지](https://github.com/electron/electron/releases)에 가면 릴리즈 노트 초안과 자리 표시자로써 릴리즈 노트를 볼 수 있습니다.
2. 릴리즈를 편집하고 릴리즈 노트를 추가하세요.
3. `시험판` 확인란이 선택되어 있는지 확인하십시오. 전자 버전 1.7 이상인 경우 자동으로 발생합니다.
4. 'Save draft' 를 클릭하세요. **'Publish release' 를 누르면 안됩니다!**
5. 모든 빌드가 통과할 때 까지 기다리세요. 

## 임시 브랜치 병합

임시를 마스터로 머지 커밋 생성없이 병합합니다.

```sh
git merge release master --no-commit
git push origin master
```

실패하면, 마스터로 리베이스하고 다시 빌드합니다:

```sh
git pull
git checkout release
git rebase master
git push origin HEAD
```

## 로컬 디버그 빌드 실행

당신이 실제로 원하는 버전을 구축하고 있는지 확인하기 위해 로컬 디버그 빌드를 실행합니다. 때때로 새 버전을 릴리즈하고 있다고 생각하지만, 아닌 경우가 있습니다.

```sh
npm run build
npm start
```

창이 현재 업데이트된 버전을 표시하는지 확인하세요.

## 환경 변수 설정

릴리즈를 게시하려면 다음 환경 변수를 설정해야합니다. 이 자격증명에 대해 다른 팀 구성원에게 문의하세요.

- `ELECTRON_S3_BUCKET`
- `ELECTRON_S3_ACCESS_KEY`
- `ELECTRON_S3_SECRET_KEY`
- `ELECTRON_GITHUB_TOKEN` - "저장소" 영역에 대한 개인 접근 토큰.

이것은 한번만 수행해야합니다.

## 릴리즈 게시

이 스크립트는 바이너리를 내려받고 네이티브 모듈 구축을 위해 node-gyp 으로 윈도우에서 사용되는 노드 헤더와 .lib 링커를 생성합니다.

```sh
npm run release
```

참고: 많은 파이썬의 배포판들은 여전히 오래된 HTTPS 인증서와 함께 제공됩니다. `InsecureRequestWarning` 를 볼 수 있지만, 무시해도 됩니다.

## 임시 브랜치 삭제

```sh
git checkout master
git branch -D release # delete local branch
git push origin :release # delete remote branch
```

## Npm에 릴리즈 승격

새로운 릴리즈는 `beta` 태그가있는 npm에 게시됩니다. 좋은 결과가 나오지 않는 한, 모든 릴리스는 결국 안정적으로 승격되어야합니다.

보도 자료는 일반적으로 홍보되기 전에 외부에 약 2 주간 제공됩니다. 출시를 홍보하기 전에 해당 버전에 대한 버그 보고서가 있는지 확인하십시오 (예: `version/ 1.7.x`로 표시된 문제

베타 버전을 성공적으로 사용하고 있다면 슬랙에서 사용자에게 묻는 것이 좋습니다.

특정 시점에 베타 버전과 안정 버전을 확인하는 방법은 다음과 같습니다.

    $ npm dist-tag ls electron  
    beta: 1.7.5
    latest: 1.6.11
    

안정적인 베타 버전 (일명 `latest</ 0>) 을 홍보하려면:</p>

<pre><code>npm dist-tag add electron@1.2.3 latest
`</pre>