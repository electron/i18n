# `File` Object

> Utiliza la API HTML5 `File` para trabajar de forma nativa con los archivos en filesystem.

La interfaz del archivo de DOM proporciona abstracción alrededor de los archivos nativos para permitir a los usuarios trabajar sobre los archivos nativos directamente con la API del archivo HTML5. Electron tiene un atributo `path` adicional a la interfaz `File` el cual revela la ruta real del archivo en filesystem.

Example of getting a real path from a dragged-onto-the-app file:

```html
<div id="holder">
  Drag your file here
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