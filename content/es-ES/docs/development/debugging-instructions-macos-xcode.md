## Depurar con XCode

### Generar proyecto xcode para fuentes de depuración (no puede construir código desde xcode)

Ejecutar `gn gen` con el argumento --ide=xcode.

```sh
$ gn gen out/Debug --ide=xcode
```

Esto generará el electron.ninja.xcworkspace. Tendrás que abrir este espacio de trabajo para establecer puntos de interrupción e inspeccionar.

Vea `gn help gen` para más información sobre la generación de proyectos IDE con GN.

### Depuración y puntos de interrupción

Inicia la aplicación Electron después de construir. Ahora puedes abrir el espacio de trabajo xcode creado arriba y adjuntar al proceso de Electron a través del Depurador > Adjuntar a Proceso > Menú de depuración Electron. [Nota: Si usted quiere depurar el proceso renderizador, necesita adjuntar al Helper de Electron también.]

You can now set breakpoints in any of the indexed files. However, you will not be able to set breakpoints directly in the Chromium source. To set break points in the Chromium source, you can choose Debug > Breakpoints > Create Symbolic Breakpoint and set any function name as the symbol. This will set the breakpoint for all functions with that name, from all the classes if there are more than one. You can also do this step of setting break points prior to attaching the debugger, however, actual breakpoints for symbolic breakpoint functions may not show up until the debugger is attached to the app.