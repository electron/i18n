## Depurar con XCode

### Generar proyecto xcode para fuentes de depuración (no puede construir código desde xcode)

Ejecutar `gn gen` con el argumento --ide=xcode.

```sh
$ gn gen out/Testing --ide=xcode
```

Esto generará el electron.ninja.xcworkspace. Tendrás que abrir este espacio de trabajo para establecer puntos de interrupción e inspeccionar.

Vea `gn help gen` para más información sobre la generación de proyectos IDE con GN.

### Depuración y puntos de interrupción

Inicia la aplicación Electron después de construir. Ahora puedes abrir el espacio de trabajo xcode creado arriba y adjuntar al proceso de Electron a través del Depurador > Adjuntar a Proceso > Menú de depuración Electron. [Nota: Si usted quiere depurar el proceso renderizador, necesita adjuntar al Helper de Electron también.]

Ahora puede establecer puntos de interrupción en cualquiera de los archivos indexados. Sin embargo, no podrás establecer puntos de interrupción directamente en la fuente Chromium. Para establecer puntos de interrupción en la fuente Chromium, puede elegir Depurar > Breakpoints > Crear Punto de interrupción simbólico y establecer cualquier nombre de función como símbolo. Esto establecerá el punto de interrupción para todas las funciones con ese nombre, de todas las clases si hay más de una. También puedes hacer este paso de establecer puntos de interrupción antes de adjuntar el depurador, sin embargo, los puntos de interrupción reales para funciones simbólicas de punto de interrupción pueden no aparecer hasta que el depurador esté adjuntado a la aplicación.