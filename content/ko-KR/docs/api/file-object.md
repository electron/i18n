# `File` 객체

> 파일 시스템에 있는 파일이 네이티브하게 작동하기 위해, HTML5 `파일`API를 사용합니다.

The DOM's File interface provides abstraction around native files in order to let users work on native files directly with the HTML5 file API. Electron has added a `path` attribute to the `File` interface which exposes the file's real path on filesystem.

드래그 한 앱 파일에서 실제 경로를 가져 오는 예시:

```html
<div id="holder">
  파일을 여기로 끌어다놓으세요
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