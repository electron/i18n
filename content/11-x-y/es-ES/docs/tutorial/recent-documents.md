# Documentos Recientes (Windows & macOS)

Windows y macOS proveen acceso a una lista de documentos recientes abierto por la aplicación a través de JumpList or dock menu, respectivamente.

__JumpList:__

![Archivos Recientes de JumpList][1]

__Menú de Aplicaciones:__

![Menu macOS Dock][2]

Para añadir archivos a documento a recientes, puede usar el API [app.addRecentDocument][addrecentdocument]:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Y puede usar la API [app.clearRecentDocuments][clearrecentdocuments] para vaciar la lista de documentos recientes:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Notas de Windows

Para poder usar esta característica en Windows, su aplicación debe ser registrado como un controlador del tipo de archivo del documento; de lo contrario, el archivo no aparecerá en JumpList incluso después de que usted lo haya agregado. Puedes encontrar todo al registrar su aplicación en [Registro de solicitud][app-registration].

Cuando un usuario hace clic en un archivo de JumpList, una nueva instancia de su aplicación se iniciará con la ruta del archivo agregado como un argumento de línea de comando.

## notas de macOS

### Añadiendo la lista de documentos recientes al menú de aplicación:

![elemento de menú de documentos recientes de macOS][6]

Puede añadir elementos de menú para acceder y borrar documentos recientes añadiendo el siguiente fragmento de código a la plantilla de su menú.

```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"recientdocuments",
      "submenu":[
        {
          "label":"Clear Recent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

Cuando se solicita un archivo del menú de documentos recientes, el evento `archivo abierto` de `aplicación` se emitirá para él.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
