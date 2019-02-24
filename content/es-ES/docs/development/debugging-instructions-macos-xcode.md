## Depurar con XCode

### Generar proyecto xcode para fuentes de depuración (no puede construir código desde xcode)

Ejecutar `gn gen` con el argumento --ide=xcode.

```sh
$ gn gen out/Debug --ide=xcode
```

Esto generará el electron.ninja.xcworkspace. Tendrás que abrir este espacio de trabajo para establecer puntos de interrupción e inspeccionar.

See `gn help gen` for more information on generating IDE projects with GN.

### Depuración y puntos de interrupción

Inicia la aplicación Electron después de construir. You can now open the xcode workspace created above and attach to the Electron process through the Debug > Attach To Process > Electron debug menu. [Note: If you want to debug the renderer process, you need to attach to the Electron Helper as well.]

You can now set breakpoints in any of the indexed files. However, you will not be able to set breakpoints directly in the Chromium source. To set break points in the Chromium source, you can choose Debug > Breakpoints > Create Symbolic Breakpoint and set any function name as the symbol. This will set the breakpoint for all functions with that name, from all the classes if there are more than one. You can also do this step of setting break points prior to attaching the debugger, however, actual breakpoints for symbolic breakpoint functions may not show up until the debugger is attached to the app.