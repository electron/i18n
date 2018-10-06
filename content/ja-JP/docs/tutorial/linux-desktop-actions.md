# カスタム Linux デスクトップランチャーアクション

多くのLinux環境で、あなたは`.desktop`ファイルを修正して、そのランチャーにカスタムエントリーを追加できます。 Canonicalの Unity ドキュメントについては、[Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher)を参照してください。 より一般的な実装については、[freedesktop.org Specification](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html)を参照してください。

**Audaciousのランチャーショートカット:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

一般的に、ショートカットメニューのそれぞれのエントリーには、`Name` と`Exec`のプロパティを追加することで、シュートカットを追加できます。 Unityはユーザーがクリックしたときに`Exec`フィールドを実行します。 このフォーマットは以下のとおりです。

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

Unity's preferred way of telling your application what to do is to use parameters. You can find these in your app in the global variable `process.argv`.