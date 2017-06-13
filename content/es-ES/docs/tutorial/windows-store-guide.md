# Guía de Windows Store

Con Windows 8, la buena win32 viejo ejecutable tiene un nuevo hermano: la plataforma Universal de Windows. El nuevo formato de `.appx` no sólo permite a un número de nuevas API de gran alcance como Cortana o notificaciones Push, pero a través de la tienda de Windows, también simplifica la instalación y actualización.

Microsoft [developed una herramienta que compila aplicaciones de la electrónica como `.appx` packages](https://github.com/catalystcode/electron-windows-store), permitiendo a los desarrolladores a utilizar algunas de las golosinas se encuentra en el nuevo modelo de aplicación. Esta guía explica cómo utilizarlo - y cuáles son las capacidades y limitaciones de un paquete de electrones AppX.

## Antecedentes y requisitos

Windows 10 "Actualización de aniversario" es capaz de ejecutar binarios de win32 `.exe` con el lanzamiento junto con un sistema de archivos virtualizado y registro. Ambos son creados durante la compilación al ejecutar la aplicación y el instalador dentro de un contenedor de Windows, permitiendo que Windows identificar exactamente qué modificaciones en el sistema operativo se realizan durante la instalación. Emparejar el ejecutable con un sistema de archivos virtual y un registro virtual permite Windows permitir la desinstalación y la instalación de un solo clic.

Además, el exe se inicia dentro del modelo de appx - lo que significa que puede usar muchas de las API disponibles para la plataforma Windows Universal. Para obtener aún más funciones, una aplicación electrónica puede emparejarse con una tarea en segundo plano invisible UWP lanzada junto con el `exe` - tipo de marcha como un compañero para ejecutar tareas en segundo plano, recibir notificaciones push, o comunicarse con otras aplicaciones de UWP.

Para compilar cualquier aplicación electrónica existente, asegúrese de que tiene los siguientes requisitos:

* 10 de Windows con la actualización de aniversario (publicado el 02 de agosto de 2016)
* El SDK de Windows 10, [downloadable here](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Nodo por lo menos en 4 (para verificar, ejecutar `node-v`)

Luego, ir e instalar la CLI de windows-`electron-store`:

    MNP instalar -g electrónica-windows-tienda
    

## Paso 1: Paquete de la aplicación de la electrónica

Paquete de la aplicación con [electron-packager](https://github.com/electron-userland/electron-packager) (o una herramienta similar). Asegúrese de quitar `node_modules` que no necesita en su aplicación final, ya que cualquier módulo que realmente no necesita sólo aumentará el tamaño de la aplicación.

La salida debería ser más o menos como este:

    ├── Ghost.exe ├── licencia ├── content_resources_200_percent.pak ├── content_shell.pak ├── d3dcompiler_47.dll ├── ffmpeg.dll ├── icudtl.dat ├── libEGL.dll ├── libGLESv2.dll ├── locales │ ├── am.pak │ ├── ar.pak │ ├── [...] ├── natives_blob.bin ├── node.dll ├── recursos │ ├── app │ └── atom.asar ├── snapshot_blob.bin ├── squirrel.exe └── ui_resources_200_percent.pak
    

## Paso 2: Ejecuta electrón-windows-tienda

De una elevada PowerShell (ejecutarlo "como administrador"), run`electron-windows-store` con los parámetros requeridos, pasando por tanto la entrada y directorios de salida, de la aplicación nombre y versión y confirmación `node_modules` debe ser aplanado.

    electrón-windows-tienda '--directorio de entrada C:\myelectronapp '--directorio de salida C:\output\myelectronapp '--aplanar true '--paquete-version 1.0.0.0 '--nombre del paquete myelectronapp
    

Una vez ejecutado, la herramienta va a trabajar: acepta su aplicación electrónica como entrada, aplanar la `node_modules`. A continuación, archivos de su aplicación como `app.zip`. Usar un instalador y un contenedor de Windows, la herramienta crea un paquete de AppX "ampliado" - incluyendo el manifiesto de aplicación de Windows (`AppXManifest.xml`) así como el sistema de archivos virtuales y el registro virtual dentro de la carpeta de salida.

Una vez creados los archivos AppX ampliados, la herramienta utiliza al empaquetador de aplicaciones de Windows (`MakeAppx.exe`) para crear un paquete de aprox solo archivo de los archivos en el disco. Por último, la herramienta puede utilizarse para crear un certificado de confianza en su equipo para firmar el nuevo paquete de aprox. Con el paquete firmado de AppX, CLI puede instalar automáticamente el paquete en su máquina.

## Paso 3: Utilizando el paquete de AppX

Para poder ejecutar el paquete, los usuarios necesitarán 10 de Windows con el supuesto "aniversario de actualización" - encontrará información sobre cómo actualizar Windows [here](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

En oposición a los tradicionales UWP apps, apps paquetes necesitan someterse a un proceso de verificación manual, para lo cual se puede aplicar [here](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). Mientras tanto, todos los usuarios podrán sólo tiene que instalar el paquete de doble clic en él, por lo que una presentación a la tienda no sería necesaria si simplemente estás buscando un método de instalación más fácil. En entornos administrados (generalmente empresas), el`Add-AppxPackage` [PowerShell Cmdlet puede utilizarse para instalar en un fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx) automatizado.

Otra limitación importante es que el paquete compilado de AppX todavía contiene un ejecutable de win32 - y por lo tanto no funciona en Xbox, HoloLens o los teléfonos.

## Opcional: Añadir funciones UWP mediante un BackgroundTask

Puede asociar su aplicación electrónica para arriba con una tarea en segundo plano UWP invisible que llega a hacer el uso completo de Windows 10 características - como notificaciones push, Cortana integración o azulejos vivo.

Para comprobar hacia fuera cómo una aplicación electrónica que utiliza una tarea de fondo para enviar notificaciones toast y vivir azulejos, [check a los sample](https://github.com/felixrieseberg/electron-uwp-background) proporcionados por Microsoft.

## Opcional: Convertir usando virtualización de envase

Para generar el paquete de AppX, CLI `electron-windows-store` utiliza una plantilla que debería funcionar para la mayoría aplicaciones de electrónica. Sin embargo, si usas a un instalador personalizado, o si experimenta algún problema con el paquete generado, puede intentar crear un paquete de compilación con un contenedor de Windows - en este modo, el CLI se instalará y ejecutar la aplicación en blanco envase de Windows para determinar qué modificaciones su aplicación es exactamente hacer al sistema operativo.

Antes de ejecutar el CLI para el, tienes que instalar el "Windows Desktop App convertidor". Esto le llevará unos pocos minutos, pero no te preocupes, sólo tienes que hacer esto una vez. Descarga y escritorio de la aplicación convertidor de [here](https://www.microsoft.com/en-us/download/details.aspx?id=51691). Usted recibirá dos archivos: `DesktopAppConverter.zip` y `BaseImage-14316.wim`.

  1. Unzip `DesktopAppConverter.zip`. De un PowerShell elevada (abrió con "ejecutar como administrador", asegúrese de que su política de ejecución de sistemas nos permite realizar todo lo que se pretende ejecutar llamando al bypass</code> de `Set-ExecutionPolicy.</li>
<li>A continuación, ejecute la instalación del convertidor de la aplicación de escritorio, pasando en el lugar de la imagen base de Windows (descargada como <code>BaseImage-14316.wim`), llamando al `.\DesktopAppConverter.ps1-.\BaseImage-14316.wim` - BaseImage de configuración.
  2. Si ejecuta las instrucciones de comando anteriores por un reinicio, reinicie su máquina y ejecutar el comando anterior otra vez después de un recomenzar acertado.

Una vez que la instalación tuvo éxito, puede ir a compilar su aplicación electrónica.