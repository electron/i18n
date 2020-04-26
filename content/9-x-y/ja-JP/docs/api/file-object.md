# `File` オブジェクト

> ファイルシステム上のファイルでネイティブに機能するHTML5 `File` APIを使用します。

DOMのファイルインターフェースは、ユーザーがHTML5ファイルAPIで直接ネイティブファイルを扱えるように、ネイティブファイルを抽象化します。 Electronは、`File` インターフェースにファイルシステム上のファイルの実際のパスを公開する `path` 属性を追加しています。

アプリの上にドラッグされたファイルから実際のパスを取得する例:

```html
<div id="holder">
  ファイルをここにドラッグ
</div>

<script>
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (const f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
  });
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
</script>
```
