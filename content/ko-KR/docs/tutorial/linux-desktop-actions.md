# Custom Linux Desktop Launcher Actions

많은 Linux 환경에서 실행 프로그램에, `.desktop`을 수정하여 사용자 정의 항목을 추가 할 수 있습니다. Canonical's Unity 문서는 여기를 참조하세요([Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher)). 좀 더 일반적인 구현에 대한 자세한 내용은 [freedesktop.org Specification](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html) 참조하십시오.

**Audacious(오디오 플레이어) 의 Launcher shortcuts:**

![audacious(linux의 오디오 플레이어)](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

일반적으로, 단축키 메뉴의 각 항목에 대해 `Name` 및 `Exec`속성을 제공하여 바로 가기를 추가합니다. Unity는 사용자의 클릭에 의해 `Exec`필드를 실행합니다. 양식은 아래와 같습니다.

```text
Actions=PlayPause;Next;Previous

[Desktop Action PlayPause]
Name=Play-Pause
Exec=audacious -t
OnlyShowIn=Unity;

[Desktop Action Next]
Name=Next
Exec=audacious -f
OnlyShowIn=Unity;

[Desktop Action Previous]
Name=Previous
Exec=audacious -r
OnlyShowIn=Unity;
```

여러분의 애플리케이션이 무엇을 할지를 알려주는 Unity의 선호 된 방법은 매개 변수를 사용하는 것입니다. 앱의 전역 변수 `process.argv`에서 찾을 수 있습니다.