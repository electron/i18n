## Débogage avec XCode

### Build Debug Electron with Release libchromiumcontent

You can create a debug build of electron by following [build instructions for macOS](build-instructions-osx.md). The bootstrap process will download Release version of libchromiumcontent by default, so you will not be able to step through the chromium source.

### Build Debug Electron with Debug libchromiumcontent

If you want to debug and step through libchromiumcontent, you will have to run the bootsrap script with the `--build_debug_libcc` argument.

```sh
$ cd electron
$ ./script/bootstrap.py -v --build_debug_libcc
```

This can take a significant amount of time depending on build machine as it has to build all of the libchromium source.

Once, the lib is built, create a symlink to the built directory under download

`ln -s vendor/libchromiumcontent/dist/main/shared_library vendor/download/libchromiumcontent/shared_library`

Les versions de débogage d'Electron utiliseront cette bibliothèque partagée pour lier.

```sh
$ ./script/build.py -c D --libcc
```

This will build debug electron with debug version of libchromiumcontent.

### Generate xcode project for debugging sources (cannot build code from xcode)

Exécutez le script de mise à jour avec l'argument --xcode.

```sh
$ ./script/update.py --xcode
```

Cela générera le electron.ninjs.xcworkspace. Vous devrez ouvrir cet espace de travail pour définir des points d'arrêt et inspecter.

### Debugging and breakpoints

Lancer l'application electron après le build. You can now open the xcode workspace created above and attach to the electron process through the Debug > Attach To Process > Electron debug menu. [Note: If you want to debug the renderer process, you need to attach to the Electron Helper as well.]

Vous pouvez maintenant définir des points d'arrêt dans l'un des fichiers indexés. Cependant, vous ne pourrez pas définir des points d'arrêt directement dans la source de chromium. To set break points in the chromium source, you can choose Debug > Breakpoints > Create Symbolic Breakpoint and set any function name as the symbol. This will set the breakpoint for all functions with that name, from all the classes if there are more than one. You can also do this step of setting break points prior to attaching the debugger, however, actual breakpoints for symbolic breakpoint functions may not show up until the debugger is attached to the app.