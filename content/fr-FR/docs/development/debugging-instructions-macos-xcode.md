## Débogage avec XCode

### Generate xcode project for debugging sources (cannot build code from xcode)

Run `gn gen` with the --ide=xcode argument.

```sh
$ gn gen out/Testing --ide=xcode
```

Cela générera le electron.ninja.xcworkspace. Vous devrez ouvrir cet espace de travail pour définir des points d'arrêt et inspecter.

See `gn help gen` for more information on generating IDE projects with GN.

### Debugging and breakpoints

Launch Electron app after build. Vous pouvez maintenant ouvrir l’espace de travail xcode créé ci-dessus et vous attacher au de processus Electron via le menu de débug > Joindre au processus > 'électrons. [Note: If you want to debug the renderer process, you need to attach to the Electron Helper as well.]

Vous pouvez maintenant définir des points d'arrêt dans l'un des fichiers indexés. However, you will not be able to set breakpoints directly in the Chromium source. Pour définir des points de rupture dans la source Chrome, vous pouvez choisir Debug > Breakpoints > Créer un point de rupture symbolique et définir n’importe quel nom de fonction comme symbole. This will set the breakpoint for all functions with that name, from all the classes if there are more than one. You can also do this step of setting break points prior to attaching the debugger, however, actual breakpoints for symbolic breakpoint functions may not show up until the debugger is attached to the app.
