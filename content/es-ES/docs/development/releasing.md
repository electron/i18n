# Publicar

Este documento describe el proceso de publicación de una nueva versión de Electron.

## Determinar cual rama publicar primero

- **Si se publica el beta,** ejecute el script abajo desde `maestro`.
- **Si se publica una version estable,** corra los scripts de abajo desde `1-7-x` o `1-6-x`, dependiendo en la versión que está publicando.

## Encontrar cual es el cambio de versión que se necesita

Corra `npm run prepare-release -- --notesOnly`para ver notas de publicación generadas automáticamente. Las notas generadas deberían ayudarte a determinar si esta es un cambio de versión mayor, menor, un parche, o una versión beta. Para más información lea el [Version Change Rules](../tutorial/electron-versioning.md#semver).

## Corra el script preparado para la publicación

El script de preparación para la publicación hará lo siguiente: 1. Verificar si una publicación está ya en proceso y si se detendrá. 2. Crea una rama de publicación. 3. Cambia el número de la versión en varios archivos. Vea [este cambio comprometido](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) como ejemplo. 4. Crea un borrador de publicación en GitHub con notas de publicación autogeneradas. 5. Presiona la rama de publicación. 6. Llama al API para correr lo lo construido en la publicación.

Una vez que ha determinado que tipo de cambio de versión es necesitado, corra el script `prepare-release` con argumentos correspondientes con lo que necesita: - `[major|minor|patch|beta]` para incrementar uno de los números de la versión o - `--stable` para indicar que es una versión estable

Por ejemplo:

### Cambio mayor de versión

```sh
npm run prepare-release -- major
```

### Cambio menor de versión

```sh
npm run prepare-release -- minor
```

### Cambio de parche de versión

```sh
npm run prepare-release -- patch
```

### Cambio de versión beta

```sh
npm run prepare-release -- beta
```

### Promover beta a estable

```sh
npm run prepare-release -- --stable
```

## Esperar para estructuras :hourglass_flowing_sand:

El script `prepare-release` se disparará en la estructura mediante llamados API. Para monitorear el proceso de estructuración, vea las siguientes páginas:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) para la tienda de aplicación Mac
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) para OS X
- [circleci.com/gh/electron](https://circleci.com/gh/electron) para Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) para Windows

## Compilar notas de publicación

Escribir notas de publicación es una buena manera de mantenerse ocupado mientras la estructuración está corriendo. Para tener una guía, vea publicación existentes en [the releases page](https://github.com/electron/electron/releases).

Tips: - Each listed item should reference a PR on electron/electron, not an issue, nor a PR from another repo like libcc. - No need to use link markup when referencing PRs. Strings like `#123` will automatically be converted to links on github.com. - To see the version of Chromium, V8, and Node in every version of Electron, visit [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Patch releases

For a `patch` release, use the following format:

```sh
## Bug Fixes

* Fixed a cross-platform thing. #123

### Linux

* Fixed a Linux thing. #123

### macOS

* Fixed a macOS thing. #123

### Windows

* Fixed a Windows thing. #1234
```

### Minor releases

For a `minor` release, e.g. `1.8.0`, use this format:

```sh
## Upgrades

- Upgraded from Node `oldVersion` to `newVersion`. #123

## API Changes

* Changed a thing. #123

### Linux

* Changed a Linux thing. #123

### macOS

* Changed a macOS thing. #123

### Windows

* Changed a Windows thing. #123
```

### Major releases

```sh
## Upgrades

- Upgraded from Chromium `oldVersion` to `newVersion`. #123
- Upgraded from Node `oldVersion` to `newVersion`. #123

## Breaking API changes

* Changed a thing. #123

### Linux

* Changed a Linux thing. #123

### macOS

* Changed a macOS thing. #123

### Windows

* Changed a Windows thing. #123

## Other Changes

- Some other change. #123
```

### Beta releases

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

```sh
**Note:** This is a beta release and most likely will have have some instability and/or regressions.

Please file new issues for any bugs you find in it.

This release is published to [npm](https://www.npmjs.com/package/electron) under the `beta` tag and can be installed via `npm install electron@beta`.
```

## Edit the release draft

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. Edit the release and add release notes.
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. Click 'Save draft'. **Do not click 'Publish release'!**
5. Wait for all builds to pass before proceeding.
6. You can run `npm run release --validateRelease` to verify that all of the required files have been created for the release.

## Merge temporary branch

Once the release builds have finished, merge the `release` branch back into the source release branch using the `merge-release` script. If the branch cannot be successfully merged back this script will automatically rebase the `release` branch and push the changes which will trigger the release builds again, which means you will need to wait for the release builds to run again before proceeding.

### Merging back into master

```sh
npm run merge-release -- master
```

### Merging back into old release branch

```sh
npm run merge-release -- 1-7-x
```

## Publish the release

Once the merge has finished successfully, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Publish the release on GitHub 7. Delete the `release` branch.

## Publish to npm

Once the publish is successful, run `npm run publish-to-npm` to publish to release to npm.

## Fix missing binaries of a release manually

In the case of a corrupted release with broken CI machines, we might have to re-upload the binaries for an already published release.

The first step is to go to the [Releases](https://github.com/electron/electron/releases) page and delete the corrupted binaries with the `SHASUMS256.txt` checksum file.

Then manually create distributions for each platform and upload them:

```sh
# Checkout the version to re-upload.
git checkout vTHE.RELEASE.VERSION

# Do release build, specifying one target architecture.
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# Explicitly allow overwritting a published release.
./script/upload.py --overwrite
```

After re-uploading all distributions, publish again to upload the checksum file:

```sh
npm run release
```