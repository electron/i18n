# `File` Object

> Use the HTML5 `File` API to work natively with files on the filesystem.

L'interface de fichier du DOM fournit une abstraction autour des fichiers natifs afin de permettre aux utilisateurs de travailler sur des fichiers natifs directement avec l'API HTML5 File. Electron a ajouté un attribut `path` à l'interface `File` qui expose le chemin réel du fichier sur le système de fichiers.

Exemple pour obtenir le chemin réel d'un fichier glissé dans l'application :

```html
<div id="holder">
  faites glisser votre fichier
</div>

<script>
  document.addEventListener ('drop', e) => {
    e.preventDefault();
    e.stopPropagation();

    pour (const f de e.dataTransfer.files) { console
      .log ('File(s) que vous avez traîné ici: ', f.path)
    }
  });
  document.addEventListener ('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
</script>
```
