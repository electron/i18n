# Guía de Windows Store

Con Windows 10, el buen ejecutable anterior win32 obtuvo un nuevo hermano: La Plataforma Universal de Windows. El nuevo formato `.appx` no solo permite un nuevo número de nuevas y poderosas API como Cortana o Notificaciones Push, pero a través de la Tienda Windows, también simplifica la instalación y la actualización.

Microsoft [desarrolló una herramienta que compila las aplicaciones Electron como `.appx` paquetes](https://github.com/catalystcode/electron-windows-store), permitiendo a los desarrolladores usar algunas de las buenas cosas encontradas en la nueva aplicación modelo. Esta guía explica cómo usarla - y cuáles son las capacidades y limitaciones de un paquete de Electron AppX.

## Antecedentes y Requerimientos

Windows 10 "Actualización Aniversario" puede ejecutar los binarios win32 `.exe` con su lanzamiento junto a un sistema de archivos y registro virtualizados. Ambos se crean durante la compilación mediante la ejecución de la aplicación y el instalador dentro de un Contenedor de Windows, lo que permite a Windows identificar exactamente qué modificaciones en el sistema operativo se realizan durante la instalación. Emparejar el ejecutable con un sistema de archivos virtual y un registro virtual permite que Windows habilite la instalación y desinstalación con un solo clic.

Además, el exe es lanzado dentro del modelo de appx, lo que significa que puede usar muchas de las API disponibles para la Plataforma Universal de Windows. Para obtener aún más capacidades, una aplicación de Electron puede emparejarse con una tarea de fondo UWP invisible lanzada junto con el `exe` - un tipo de lanzamiento similar a un sidekick para ejecutar tareas en segundo plano, recibir notificaciones push, o comunicarse con otras aplicaciones UWP.

Para compilar cualquier aplicación Electron existente, asegúrese de tener los siguientes requisitos:

* Windows 10 con la Actualización Aniversario (lanzada el 2 de agosto de 2016)
* El SDK de Windows 10, [descargable aquí](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Al menos Node 4 (para verificar, ejecutar `node -v`)

Luego, vaya e instale la CLI `electron-windows-store`:

```sh
npm install -g electron-windows-store
```

## Paso 1: Empaqueta tu aplicación Electron

Empaque la aplicación usando [electron-packager](https://github.com/electron-userland/electron-packager) (o una herramienta similar). Asegúrese de eliminar `node_modules` que no necesite en su aplicación final, ya que cualquier módulo que realmente no necesite solo aumentará el tamaño de su aplicación.

La salida debería verse más o menos de esta forma:

```text
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
├── natives_blob.bin
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── snapshot_blob.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Paso 2: Ejecutando electron-windows-store

Desde un PowerShell elevado (ejecútelo como "Administrador"), ejecute `electron-windows-store` con los parámetros requeridos, pasando los directorios de entrada y salida, el nombre y la versión de la aplicación y la confirmación de que `node_modules` debe ser aplanado.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Una vez ejecutada, la herramienta comienza a funcionar: acepta su aplicación Electron como entrada, aplanando los `node_modules`. Luego, archiva su aplicación como `app.zip`. Utilizando un instalador y un contenedor de Windows, la herramienta crea un paquete AppX "expandido", incluido el Manifiesto de Aplicación de Windows (`AppXManifest.xml`), así como el sistema de archivos virtual y el registro virtual dentro de su carpeta de salida.

Una vez que se crean los archivos de AppX expandidos, la herramienta usa el Empaquetador de Aplicaciones de Windows (`MakeAppx.exe`) para crear un paquete de AppX de un solo archivo a partir de esos archivos en el disco. Finalmente, la herramienta se puede usar para crear un certificado de confianza en su computadora para firmar el nuevo paquete AppX. Con el paquete AppX firmado, la CLI también puede instalar automáticamente el paquete en su máquina.

## Paso 3: Usando el Paquete AppX

Para ejecutar su paquete, sus usuarios necesitarán Windows 10 con la llamada "Actualización Aniversario". Se pueden encontrar detalles sobre cómo actualizar Windows [aquí](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

En oposición a las aplicaciones UWP tradicionales, las aplicaciones empaquetadas actualmente necesitan someterse a un proceso de verificación manual, para lo cual puede aplicar [aquí](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). Mientras tanto, todos los usuarios podrán simplemente instalar su paquete haciendo doble clic en él, por lo que un envío a la tienda no sería necesario si simplemente está buscando un método de instalación más sencillo. En entornos administrados (generalmente empresas), se puede usar el `Add-AppxPackage` [PowerShell Cmdlet se puede utilizar para instalarlo de forma automática](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Otra limitación importante es que el paquete AppX compilado todavía contiene un ejecutable Win32 - y por lo tanto, no se ejecutará en Xbox, HoloLens o teléfonos.

## Opcional: Añadir características UWP usando un BackgroundTask

Puede asociar su aplicación Electron con una tarea de fondo UWP invisible que haga uso completo de las características de Windows 10, como notificaciones push, integración Cortana o Live Tiles.

Para comprobar cómo una aplicación de Electron que es utilizada por una tarea en segundo plano envía notificaciones Toast y Lives Tiles, [dale una mirada al ejemplo proporcionado por Microsoft](https://github.com/felixrieseberg/electron-uwp-background).

## Opcional: Convertir utilizando la Virtualización de Contenedores

Para generar el paquete AppX, la CLI `electron-windows-store` usa una plantilla que debería funcionar para la mayoría de las aplicaciones Electron. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Before running the CLI for the first time, you will have to setup the "Windows Desktop App Converter". This will take a few minutes, but don't worry - you only have to do this once. Download and Desktop App Converter from [here](https://www.microsoft.com/en-us/download/details.aspx?id=51691). You will receive two files: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1. Unzip `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2. Then, run the installation of the Desktop App Converter, passing in the location of the Windows base Image (downloaded as `BaseImage-14316.wim`), by calling `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. If running the above command prompts you for a reboot, please restart your machine and run the above command again after a successful restart.

Once installation succeeded, you can move on to compiling your Electron app.