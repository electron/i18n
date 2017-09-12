# Objet `File`

> L'API HTML5 `File` permet de travailler nativement avec les fichiers sur le système de fichiers.

L'interface de fichier du DOM fournit une abstraction autour des fichiers natifs afin de permettre aux utilisateurs de travailler sur des fichiers natifs directement avec l'API HTML5 File. Electron a ajouté un attribut `path` à l'interface `File` qui expose le chemin réel du fichier sur le système de fichiers.

Exemple pour obtenir le chemin réel d'un fichier glissé dans l'application :

```html
<div id="holder">
  Glissez vos fichiers ici
</div>

<script>
  const holder = document.getElementById('holder')
  holder.ondragover = () => {
    return false;
  }
  holder.ondragleave = holder.ondragend = () => {
    return false;
  }
  holder.ondrop = (e) => {
    e.preventDefault()
    for (let f of e.dataTransfer.files) {
      console.log('Fichier(s) que vous avez déposé : ', f.path)
    }
    return false;
  }
</script>
```