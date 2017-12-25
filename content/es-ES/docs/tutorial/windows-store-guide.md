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

## Step 3: Using the AppX Package

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). In the meantime, all users will be able to just install your package by double-clicking it, so a submission to the store might not be necessary if you're simply looking for an easier installation method. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Another important limitation is that the compiled AppX package still contains a win32 executable - and will therefore not run on Xbox, HoloLens, or Phones.

## Optional: Add UWP Features using a BackgroundTask

You can pair your Electron app up with an invisible UWP background task that gets to make full use of Windows 10 features - like push notifications, Cortana integration, or live tiles.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

## Optional: Convert using Container Virtualization

To generate the AppX package, the `electron-windows-store` CLI uses a template that should work for most Electron apps. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Before running the CLI for the first time, you will have to setup the "Windows Desktop App Converter". This will take a few minutes, but don't worry - you only have to do this once. Download and Desktop App Converter from [here](https://www.microsoft.com/en-us/download/details.aspx?id=51691). You will receive two files: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1. Unzip `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2. Then, run the installation of the Desktop App Converter, passing in the location of the Windows base Image (downloaded as `BaseImage-14316.wim`), by calling `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. If running the above command prompts you for a reboot, please restart your machine and run the above command again after a successful restart.

Once installation succeeded, you can move on to compiling your Electron app.