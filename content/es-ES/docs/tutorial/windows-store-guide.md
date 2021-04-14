# Guía de Windows Store

Con Windows 10, el buen ejecutable anterior win32 obtuvo un nuevo hermano: La Plataforma Universal de Windows. El nuevo formato `.appx` no solo permite un nuevo número de nuevas y poderosas API como Cortana o Notificaciones Push, pero a través de la Tienda Windows, también simplifica la instalación y la actualización.

Microsoft [desarrolló una herramienta que compila las aplicaciones Electron como `.appx` paquetes][electron-windows-store], permitiendo a los desarrolladores usar algunas de las buenas cosas encontradas en la nueva aplicación modelo. Esta guía explica cómo usarla - y cuáles son las capacidades y limitaciones de un paquete de Electron AppX.

## Antecedentes y Requerimientos

Windows 10 "Actualización Aniversario" puede ejecutar los binarios win32 `.exe` con su lanzamiento junto a un sistema de archivos y registro virtualizados. Ambos se crean durante la compilación mediante la ejecución de la aplicación y el instalador dentro de un Contenedor de Windows, lo que permite a Windows identificar exactamente qué modificaciones en el sistema operativo se realizan durante la instalación. Emparejar el ejecutable con un sistema de archivos virtual y un registro virtual permite que Windows habilite la instalación y desinstalación con un solo clic.

Además, el exe es lanzado dentro del modelo de appx, lo que significa que puede usar muchas de las API disponibles para la Plataforma Universal de Windows. Para obtener aún más capacidades, una aplicación de Electron puede emparejarse con una tarea de fondo UWP invisible lanzada junto con el `exe` - un tipo de lanzamiento similar a un sidekick para ejecutar tareas en segundo plano, recibir notificaciones push, o comunicarse con otras aplicaciones UWP.

Para compilar cualquier aplicación Electron existente, asegúrese de tener los siguientes requisitos:

* Windows 10 con la Actualización Aniversario (lanzada el 2 de agosto de 2016)
* El SDK de Windows 10, [descargable aquí][windows-sdk]
* Al menos Node 4 (para verificar, ejecutar `node -v`)

Luego, vaya e instale la CLI `electron-windows-store`:

```sh
npm install -g electron-windows-store
```

## Paso 1: Empaqueta tu aplicación Electron

Empaque la aplicación usando [electron-packager][electron-packager] (o una herramienta similar). Asegúrese de eliminar los `node_modules` que no necesita en su aplicación final, ya que cualquier módulo que realmente no necesite, aumentará el tamaño de su aplicación.

La salida debería verse más o menos de esta forma:

```plaintext
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── node.dll
├── resources
│   └── app.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Paso 2: Ejecutando electron-windows-store

Desde un PowerShell elevado (ejecútelo como "Administrador"), ejecute `electron-windows-store` con los parámetros requeridos, pasando los directorios de entrada y salida, el nombre y la versión de la aplicación y la confirmación de que `node_modules` debe ser aplanado.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Una vez ejecutada, la herramienta comienza a funcionar: acepta su aplicación Electron como entrada, aplanando los `node_modules`. Luego, archiva su aplicación como `app.zip`. Utilizando un instalador y un contenedor de Windows, la herramienta crea un paquete AppX "expandido", incluido el Manifiesto de Aplicación de Windows (`AppXManifest.xml`), así como el sistema de archivos virtual y el registro virtual dentro de su carpeta de salida.

Una vez que se crean los archivos de AppX expandidos, la herramienta usa el Empaquetador de Aplicaciones de Windows (`MakeAppx.exe`) para crear un paquete de AppX de un solo archivo a partir de esos archivos en el disco. Finalmente, la herramienta se puede usar para crear un certificado de confianza en su computadora para firmar el nuevo paquete AppX. Con el paquete AppX firmado, la CLI también puede instalar automáticamente el paquete en su máquina.

## Paso 3: Usando el Paquete AppX

Para ejecutar su paquete, sus usuarios necesitarán Windows 10 con la llamada "Actualización Aniversario". Se pueden encontrar detalles sobre cómo actualizar Windows [aquí][how-to-update].

En oposición a las aplicaciones UWP tradicionales, las aplicaciones empaquetadas actualmente necesitan someterse a un proceso de verificación manual, para lo cual puede aplicar [aquí][centennial-campaigns]. Mientras tanto, todos los usuarios podrán instalar sus paquetes haciendo doble clic en él, podría no ser necesario volver a enviar el paquete a la tienda, si lo que esta buscando es un metodo de instalacion mas sencillo. En entornos administrados (generalmente empresas), se puede usar el `Add-AppxPackage` [PowerShell Cmdlet se puede utilizar para instalarlo de forma automática][add-appxpackage].

Otra limitación importante es que el paquete AppX compilado todavía contiene un ejecutable Win32 - y por lo tanto, no se ejecutará en Xbox, HoloLens o teléfonos.

## Opcional: Añadir características UWP usando un BackgroundTask

Puede asociar su aplicación Electron con una tarea de fondo UWP invisible que haga uso completo de las características de Windows 10, como notificaciones push, integración Cortana o Live Tiles.

Para comprobar cómo una aplicación de Electron que es utilizada por una tarea en segundo plano envía notificaciones Toast y Lives Tiles, [dale una mirada al ejemplo proporcionado por Microsoft][background-task].

## Opcional: Convertir utilizando la Virtualización de Contenedores

Para generar el paquete AppX, la CLI `electron-windows-store` usa una plantilla que debería funcionar para la mayoría de las aplicaciones Electron. Sin embargo, si está utilizando un instalador personalizado o experimenta algún problema con el paquete generado, puede intentar crear un paquete mediante la compilación con un contenedor de Windows: en este modo, la CLI instalará y ejecutará su aplicación en un contenedor en blanco de Windows para determinar qué modificaciones está haciendo exactamente su aplicación al sistema operativo.

Antes de ejecutar la CLI por primera vez, deberá configurar el "Windows Desktop App Converter". Esto llevará algunos minutos, pero no te preocupes, solo tienes que hacerlo esta vez. Descarga y Desktop App Converter desde [aquí][app-converter]. Recibirá dos archivos: `DesktopAppConverter.zip` y `BaseImage-14316.wim`.

1. Descomprima `DesktopAppConverter.zip`. Desde un PowerShell elevado (abierto con "ejecutar como administrador", asegúrese de que la política de ejecución de su sistema nos permita ejecutar todo lo que pretendemos ejecutar llamando a `Set-ExecutionPolicy bypass`.
2. A continuación, ejecute la instalación del Desktop App Converter, pasando la ubicación de la imagen base de Windows (descargada como `BaseImage-14316.wim`), llamando a `.\DesktopAppConverter.ps1 -Setup -BaseImage.\BaseImage-14316.wim`.
3. Si ejecuta el comando anterior para reiniciar, reinicie su máquina y vuelva a ejecutar el comando anterior luego de un reinicio exitoso.

Una vez que la instalación haya tenido éxito, puede pasar a la compilación de su aplicación Electron.

[windows-sdk]: https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk
[app-converter]: https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter
[add-appxpackage]: https://technet.microsoft.com/en-us/library/hh856048.aspx
[electron-packager]: https://github.com/electron/electron-packager
[electron-windows-store]: https://github.com/catalystcode/electron-windows-store
[background-task]: https://github.com/felixrieseberg/electron-uwp-background
[centennial-campaigns]: https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge
[how-to-update]: https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update
