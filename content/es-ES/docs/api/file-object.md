# `File` Object

> Utiliza la API HTML5 `File` para trabajar de forma nativa con los archivos en filesystem.

La interfaz del archivo de DOM proporciona abstracción alrededor de los archivos nativos para permitir a los usuarios trabajar sobre los archivos nativos directamente con la API del archivo HTML5. Electron tiene un atributo `path` adicional a la interfaz `File` el cual revela la ruta real del archivo en filesystem.

Ejemplo para obtener una ruta real desde un archivo arrastrado dentro de la aplicación:

```html
<div id="holder">
  arrastra tu archivo aquí
</div>

<script>
  documento. addEventListener (' Drop ', (e) => {
    e. preventDefault ();
    e. stopPropagation ();

    for (const f of e. dataTransfer. files) {
      Console. log (' archivo (s) que arrastraste aquí: ', f. Path)
    }
  });
  Document. addEventListener (' DragOver ', (e) => {
    e. preventDefault ();
    e. stopPropagation ();
  });
</script>
```
