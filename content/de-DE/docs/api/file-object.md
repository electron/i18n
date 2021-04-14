# `File` Objekt

> Verwenden Sie die HTML5- `File` -API, um nativ mit Dateien auf dem Dateisystem zu arbeiten.

Die Dateischnittstelle des DOM bietet Abstraktion um native Dateien, um benutzern die arbeitende Arbeit an systemeigenen Dateien direkt mit der HTML5-Datei-API ermöglicht. Electron hat der `File` -Schnittstelle ein `path` -Attribut hinzugefügt, das den echten Pfad der Datei auf dem Dateisystem verfügbar macht.

Beispiel für das Abrufen eines echten Pfads aus einer gezogenen App-Datei:

```html
<div id="holder">
  Ziehen Sie Ihre Datei hier
</div>

<script>
  document.addEventListener('drop', (e) => '
    e.preventDefault();
    e.stopPropagation();

    für (const f of e.dataTransfer.files) -
      console.log('File(s) Sie hierher gezogen haben: ', f.path)
    '
  '
  document.addEventListener('dragover', (e) => '
    e.preventDefault();
    e.stopPropagation();
  ');
</script>
```
