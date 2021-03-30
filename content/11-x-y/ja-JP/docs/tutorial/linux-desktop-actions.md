# カスタム Linux デスクトップランチャーアクション

多くの Linux 環境では、`.desktop` ファイルを変更することでランチャーにカスタムエントリを追加できます。 Canonical の Unity ドキュメントについては、[ランチャーにショートカットを追加する][unity-launcher] を参照してください。 より一般的な実装については、[freedesktop.org 仕様][spec] を参照してください。

__以下は Audacious のランチャーショートカットです。__

![audacious][3]

一般的に、ショートカットメニューのそれぞれのエントリーには、`Name` と `Exec` のプロパティを追加することで、シュートカットを追加できます。 Unity はユーザーにクリックされたときにその `Exec` フィールドを実行します。 このフォーマットは以下のとおりです。

```plaintext
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

Unity がアプリケーションに何をするのか伝達する好ましい方法は、引数を使用することです。 これらはアプリのグローバル変数 `process.argv` 内にあります。

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
