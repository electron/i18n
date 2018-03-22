# `File` オブジェクト

> HTML5 `File` API を使用して、ファイルシステム上のファイルに、ネイティブに動作します。

DOM のファイル インターフェイスは、HTML5 File API を直接ネイティブのファイル上で作業できるようにするために、ネイティブ ファイルの抽象化を提供します。 Electron は `File` インタフェースに `path` 属性を追加しました。これはファイルシステム上のファイルの実際のパスを公開します。

以下はアプリ上にドラッグされたファイルから実際のパスを取得する例です。

```html
<div id="holder">
  ファイルをここにドロップしてください
</div>

<script>
  document.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
  });
  document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
</script>
```