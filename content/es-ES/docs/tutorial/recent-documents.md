# Documentos Recientes (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

**JumpList:**

![JumpList Recent Files](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Menú de Aplicaciones:**

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

Para añadir archivos a documento a recientes, puede usar el API [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows):

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Y puede usar la API [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) para vaciar la lista de documentos recientes:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Notas de Windows

Para poder usar esta característica en Windows, su aplicación debe ser registrado como un controlador del tipo de archivo del documento; de lo contrario, el archivo no aparecerá en JumpList incluso después de que usted lo haya agregado. Puedes encontrar todo al registrar su aplicación en [Registro de solicitud](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

Cuando un usuario hace clic en un archivo de JumpList, una nueva instancia de su aplicación se iniciará con la ruta del archivo agregado como un argumento de línea de comando.

## notas de macOS

Cuando se solicita un archivo del menú de documentos recientes, el evento `archivo abierto` de `aplicación` se emitirá para él.