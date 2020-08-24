# Electron 이슈

* [이슈에 기여하는 방법](#how-to-contribute-to-issues)
* [일반적인 도움받기](#asking-for-general-help)
* [버그 신고하기](#submitting-a-bug-report)
* [버그 보고서 작성](#triaging-a-bug-report)
* [버그 리포트 해결](#resolving-a-bug-report)

## 이슈에 기여하는 방법

어떤 이슈든, 개인이 근본적으로 기여할수 있는 3가지 방법이 있습니다.:

1. 토론할 이슈를 열어서 : Electron에서 새 버그를 찾은 것 같다면, [`electron/electron` issue tracker](https://github.com/electron/electron/issues)에 새 이슈를 열어서 보고해야 합니다.
2. 이슈를 심사하는데 도움을 줌으로써 : 다음을 수행하여 이 작업을 수행할 수 있습니다. 보조 세부 정보(버그를 보여주는 재현 가능한 테스트 사례) 또는 문제를 해결하기 위한 제안을 제공합니다.
3. 문제 해결에 도움을 줌으로써 : 이 작업은 문제가 버그가 아니거나, 수정된 것임을 보여줌으로써 수행될 수 있습니다. 그러나 이 작업은 `electron/electron` 내 소스를 바꾸는 pull request를 열어서 구체적이고 검토 가능한 방식으로 더 자주 수행될 수 있습니다.

## 일반적인 도움받기

["Finding Support"](../tutorial/support.md#finding-support) 는 프로그래밍 도움, 보안 문제 보고, 기여 등을 위한 리소스 목록을 가지고 있습니다. 이슈트래커는 버그를 위해서만 사용해주세요!

## 버그 신고하기

버그 보고서를 제출한다면

전자 / 전자 문제 추적기에서 새 문제를 연다면 사용자에게 채워져야하는 템플릿이 표시됩니다.

```markdown
이슈를 열어주셔서 감사합니다. 명심해야할 몇 가지 사항 :
- 이슈 추적은 버그만을 위한 것 입니다.
- 버그를 보고하기 전에 최선 버전의 Electron에 대해 문제를 재현해 보세요.
일반적인 충고가 필요하면, Slack : http://atom-slack.herokuapp.com에 가입하세요. -->
### 실제 행동
<!== 실제로 일어나면 어떻게 되나요? -->

### How to reproduce

<!--

Your best chance of getting this bug looked at quickly is to provide a REPOSITORY that can be cloned and run.

You can fork https://github.com/electron/electron-quick-start and include a link to the branch with your changes.

If you provide a URL, please list the commands required to clone/setup/run your repo e.g.

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

만약 여러분이 Electron의 버그를 찾았다고 확신하시면, 이 양식을 당신의 최고의 기술을 이용해 채워주세요.

보고서를 평가하는데 필요한 두 가지 정보는 버그에 대한 설명과 간단한 테스트입니다. 이것을 다시 만들 수 있습니다. 버그를 재현할 수 있으면 수정 하기가 더 쉽습니다.

최소, 완료 및 검증 가능한 예시를 작성하는 방법을 참조하세요.

## 버그 보고서 작성

공개된 이슈를 토론하는 것은 일반적인 것 입니다. 일부 토론자들은 행동이 버그인지 기능인지를 포함하여 의견이 다를 수 있습니다. 이 토론은 프로세스의 일부이며 집중되고 도움이 되는 전문적인 태도를 유지해야 합니다.

추가적인 맥락이나 지원 세부 사항을 제공하지 않는 간결한 답변은 도움이 되지 않거나 전문적이지 않습니다. 많은 사람들에게 반응은 성가시고 비우호적입니다.

토론자들은 협력적으로 문제를 해결하고 서로의 발전을 돕도록 권장합니다. 잘못되었다고 생각하거나 잘못된 정보가 포함된 문제가 발생한다면 추가 지원 컨텍스트를 통해 왜 그런 느낌이 들었는지 설명하고 자신이 틀렸다고 확신할 수 있습니다. 이렇게함으로써, 우리는 종종 정확한 결과에 더 빨리 도달할 수 있습니다.

## 버그 리포트 해결

주요 이슈들은 Pull Request를 열어 해결합니다. 끌어 오기 요청을 열고 검토하는 프로세스는 열기 및 심사 문제와 유사하지만 제안된 변경 사항이 Electron 프로젝트의 최소 품질 및 기능 지침을 충족시키는데 필요한 검토 및 승인 작업 속도와 함께 수행됩니다.
