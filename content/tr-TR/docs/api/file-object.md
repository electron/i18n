# `File` Object

> HTML5 `File` API kullanarak dosya sistemi içerisindeki dosyalarla çalışın.

DOM'un File arayüzü, HTML5'in dosya API'i ile işletim sistemi seviyesinde dosyalarla iş yapmak için soyutlama sağlar. Electron, `File` arayüzüne dosyanın sistem üzerindeki gerçek yolunu belirten bir `path` özelliği ekledi.

Uygulamaya sürüklenen bir dosyanın gerçek yolunu alma örneği:

```html
<div id="holder">
  Dosyanızı buraya sürükleyin.
</div>

<script>
  document.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();

    for (let f of e.dataTransfer.files) {
      console.log('Sürüklediğiniz dosya(lar): ', f.path)
    }
  });
  document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
</script>
```