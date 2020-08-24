## Depurar con XCode

### Generar proyecto xcode para fuentes de depuración (no puede construir código desde xcode)
Ejecutar `gn gen` con el argumento --ide=xcode.
```sh
$ gn gen out/Debug --ide=xcode
```
Esto generará el electron.ninja.xcworkspace. Tendrás que abrir este espacio de trabajo para establecer puntos de interrupción e inspeccionar.

Vea `gn help gen` para más información sobre la generación de proyectos IDE con GN.

### Depuración y puntos de interrupción

Inicia la aplicación Electron después de construir. You can now open the xcode workspace created above and attach to the Electron process through the Debug > Attach To Process > Electron debug menu. [Nota: Si usted quiere depurar el proceso renderizador, necesita adjuntar al Helper de Electron también.]

Ahora puede establecer puntos de interrupción en cualquiera de los archivos indexados. Sin embargo, no podrás establecer puntos de interrupción directamente en la fuente Chromium. To set break points in the Chromium source, you can choose Debug > Breakpoints > Create Symbolic Breakpoint and set any function name as the symbol. Esto establecerá el punto de interrupción para todas las funciones con ese nombre, de todas las clases si hay más de una. También puedes hacer este paso de establecer puntos de interrupción antes de adjuntar el depurador, sin embargo, los puntos de interrupción reales para funciones simbólicas de punto de interrupción pueden no aparecer hasta que el depurador esté adjuntado a la aplicación.
