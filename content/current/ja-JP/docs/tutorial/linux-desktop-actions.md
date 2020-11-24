# カスタム Linux デスクトップランチャーアクション

## 概要

多くの Linux 環境では、`.desktop` ファイルを変更することでシステムランチャーにカスタムエントリを追加できます。 Canonical の Unity ドキュメントについては、[ランチャーにショートカットを追加する](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher) を参照してください。 より一般的な実装については、[freedesktop.org 仕様](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html) を参照してください。

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

> 注意: 上のスクリーンショットは Audacious オーディオプレーヤーのランチャーショートカットの例です。

ショートカットを作成するには、ショートカットメニューに追加したいエントリごとに `Name` と `Exec` プロパティを指定する必要があります。 Unity は、ユーザーがショートカットのメニューアイテムをクリックした後に `Exec` フィールドで定義されたコマンドを実行します。 `.desktop` ファイルの例を以下に示します。

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

Unity がアプリケーションにやることを指定する好ましい方法は、引数の利用です。 これはアプリケーション内からグローバル変数 `process.argv` で参照できます。
