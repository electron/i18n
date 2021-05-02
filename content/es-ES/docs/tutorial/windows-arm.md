# Ventanas 10 en brazo

Si tu aplicación se ejecuta con Electron 6.0.8 o posterior, ahora puedes construirla para Windows 10 en Arm. Esto aumenta considerablemente el rendimiento, pero necesitará recopilar cualquier módulo nativo usado en tu app. It may also require small fixups to your build and packaging scripts.

## Ejecutar una aplicación básica

Si tu aplicación no utiliza ningún módulo nativo, entonces es muy fácil crear una versión de armamento de tu aplicación.

1. Asegúrate de que el directorio `node_modules` de tu aplicación está vacío.
2. Usando un _Comando Prompt_, ejecute `set npm_config_arch=arm64` antes de ejecutar `npm install`/`yarn install` como de costumbre.
3. [Si tienes Electron instalado como una dependencia de desarrollo](quick-start.md#prerequisites), npm descargará y desempaquetará la versión de arm64. Entonces puedes empaquetar y distribuir tu aplicación de forma normal.

## Consideraciones generales

### Código específico de archivo

Lots of Windows-specific code contains if... else logic that selects between either the x64 or x86 architectures.

```js
if (process.arch === 'x64') {
  // Do 64-bit thing...
} else {
  // Do 32-bit thing...
}
```

Si quieres apuntar a arm64, la lógica como esta normalmente seleccionará la arquitectura equivocada, tan cuidadosamente compruebe su aplicación y construya scripts para condiciones como esta. En scripts de compilación y empaquetado personalizados, siempre debería comprobar el valor de `npm_config_arch` en el entorno, en lugar de depender de la arquitectura de proceso actual.

### Módulos nativos

Si utiliza módulos nativos, debe asegurarse de que compilan contra v142 del compilador MSVC (proporcionado en Visual Studio 2017). También debe verificar que cualquier pre-compilado `.dll` o `. ib` archivos proporcionados o referenciados por el módulo nativo están disponibles para Windows en Arm.

### Probando tu aplicación

Para probar su aplicación, utilice un dispositivo Windows en Arm con Windows 10 (versión 1903 o superior). Asegúrese de copiar su aplicación al dispositivo de destino - el sandbox de Chromium no funcionará correctamente al cargar los activos de su aplicación desde una ubicación de red.

## Prerrequisitos para el desarrollo

### Node.js/node-gyp

[Se recomienda Node.js v12.9.0 o posterior.](https://nodejs.org/en/) Si actualizar a una nueva versión del nodo no es posible puedes [actualizar manualmente la copia de node-gyp de npm](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) a la versión 5. .2 o posterior, que contiene los cambios necesarios para compilar módulos nativos para Arm.

### Visual Studio 2017

Visual Studio 2017 (cualquier edición) es necesario para compilar módulos nativos. Puede descargar Visual Studio Community 2017 a través del [programa Visual Studio Dev Essentials](https://visualstudio.microsoft.com/dev-essentials/) de Microsoft. Después de la instalación, puede añadir los componentes específicos de la armadura ejecutando lo siguiente desde un _Prompt de comando_:

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeRecommended
```

#### Crear un símbolo de comando de compilación cruzada

Establecer `npm_config_arch=arm64` en el entorno crea el arm64 correcto `. bj` archivos, pero el estándar _Developer Command Prompt for VS 2017_ usará el enlazador x64. Para arreglar esto:

1. Duplicar el _comando de herramientas cruzadas x64_x86 para VS 2017_ (p. ej. ubicándolo en el menú de inicio, haciendo clic con el botón derecho, seleccionando _Abrir ubicación de archivo_, copiando y pegando en algún lugar conveniente.
2. Haga clic con el botón derecho del ratón en el nuevo acceso directo y elija _Propiedades_.
3. Cambia el campo _Objetivo_ para leer `vcvarsamd64_arm64.bat` al final en lugar de `vcvarsamd64_x86.bat`.

Si se hace con éxito, el símbolo del comando debería imprimir algo similar al de inicio del sistema:

```bat
**********************************************************************
** Visual Studio 2017 Developer Command Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
**********************************************************************
[vcvarsall.bat] Environment initialized for: 'x64_arm64'
```

Si desea desarrollar su aplicación directamente en un Windows en un dispositivo Arm, sustituya `vcvarsx86_arm64. en` en _Objetivo_ para que la compilación cruzada pueda ocurrir con la emulación x86 del dispositivo.

### Enlazando contra el `node.lib` correcto

By default, `node-gyp` unpacks Electron's node headers and downloads the x86 and x64 versions of `node.lib` into `%APPDATA%\..\Local\node-gyp\Cache`, but it does not download the arm64 version ([a fix for this is in development](https://github.com/nodejs/node-gyp/pull/1875).) Para arreglar esto:

1. Descargar el arm64 `node.lib` desde https://electronjs.org/headers/v6.0.9/win-arm64/node.lib
2. Muévelo a `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

Sustituye `6.0.9` para la versión que estás usando.

## Módulos nativos multicompiladores

Después de completar todo lo anterior, abre el símbolo del comando de compilación cruzada y ejecuta `set npm_config_arch=arm64`. Luego usa `npm install` para compilar tu proyecto de forma normal. Como con la compilación cruzada de módulos x86, puede necesitar eliminar `node_modules` para forzar la recompilación de módulos nativos si fueron compilados previamente para otra arquitectura.

## Depurando módulos nativos

La depuración de módulos nativos puede hacerse con Visual Studio 2017 (ejecutándose en su equipo de desarrollo) y el correspondiente [depurador remoto de Visual Studio](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) ejecutando en el dispositivo de destino. Para depurar:

1. Lanza tu aplicación `. xe` en el dispositivo de destino a través del _Prompt de comando_ (pasando `--inspect-brk` para pausarlo antes de que se cargen los módulos nativos).
2. Inicie Visual Studio 2017 en su máquina de desarrollo.
3. Conéctate al dispositivo de destino seleccionando _Depurar > Adjuntar al proceso..._ e introduzca la dirección IP del dispositivo y el número de puerto mostrado por la herramienta de debugger remoto de Visual Studio.
4. Haga clic en _Actualizar_ y seleccione el [proceso de Electron apropiado para adjuntar](../development/debug-instructions-windows.md).
5. Puede que necesite asegurarse de que cualquier símbolo para los módulos nativos de su aplicación se carga correctamente. Para configurar esto, dirígete a _Debug > Opciones..._ en Visual Studio 2017, y añadir las carpetas que contienen su `. símbolos db` bajo _Debugging > Symbols_.
6. Una vez adjunto, establezca cualquier punto de interrupción apropiado y reanude la ejecución de JavaScript usando las [herramientas remotas de Chrome para Node](debugging-main-process.md).

## Obteniendo ayuda adicional

Si encuentra un problema con esta documentación, o si su aplicación funciona cuando se compila para x86 pero no para arm64, por favor [presente un problema](../development/issues.md) con "Windows on Arm" en el título.
