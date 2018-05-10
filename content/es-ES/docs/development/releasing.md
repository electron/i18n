# Publicar

Este documento describe el proceso de publicación de una nueva versión de Electron.

## Determinar cual rama publicar primero

- **Si se publica el beta,** ejecute el script abajo desde `maestro`.
- **If releasing a stable version,** run the scripts below from the branch you're stabilizing.

## Encontrar cual es el cambio de versión que se necesita

Corra `npm run prepare-release -- --notesOnly`para ver notas de publicación generadas automáticamente. Las notas generadas deberían ayudarte a determinar si esta es un cambio de versión mayor, menor, un parche, o una versión beta. Para más información lea el [Version Change Rules](../tutorial/electron-versioning.md#semver).

**NB:** If releasing from a branch, e.g. 1-8-x, check out the branch with `git checkout 1-8-x` rather than `git checkout -b remotes/origin/1-8-x`. The scripts need `git rev-parse --abbrev-ref HEAD` to return a short name, e.g. no `remotes/origin/`

## Set your tokens and environment variables

You'll need Electron S3 credentials in order to create and upload an Electron release. Contact a team member for more information.

There are a handful of `*_TOKEN` environment variables needed by the release scripts. Once you've generated these per-user tokens, you may want to keep them in a local file that you can `source` when starting a release. * `ELECTRON_GITHUB_TOKEN`: Create as described at https://github.com/settings/tokens/new, giving the token repo access scope. * `APPVEYOR_TOKEN`: Create a token from https://windows-ci.electronjs.org/api-token If you don't have an account, ask a team member to add you. * `CIRCLE_TOKEN`: Create a token from "Personal API Tokens" at https://circleci.com/account/api

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

Tip: You can test the new version number before running `prepare-release` with a dry run of the `bump-version` script with the same major/minor/patch/beta arguments, e.g.:

```sh
$ ./script/bump-version.py --bump minor --dry-run
```

## Esperar para estructuras :hourglass_flowing_sand:

El script `prepare-release` se disparará en la estructura mediante llamados API. Para monitorear el proceso de estructuración, vea las siguientes páginas:

- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for OS X and Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) para Windows

## Compilar notas de publicación

Escribir notas de publicación es una buena manera de mantenerse ocupado mientras la estructuración está corriendo. Para tener una guía, vea publicación existentes en [the releases page](https://github.com/electron/electron/releases).

Tips: - Cada item en la lista debe hacer referencia a un PR en electron/electron, no un PR de otro repositorio como libcc. No hay necesidad de utilizar marcado de enlace al hacer referencia a PR. Cadenas como `#123` serán automáticamente convertidas a links de github.com. Para ver la versión de Chromium, V8 y Node en cada versión de Electron, visite [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Publicación de parches

Para una publicación de `patch`, use el siguiente formato:

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

### Publicaciones menores

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

### Lanzamientos principales

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

### Publicaciones beta

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

```sh
**Note:** This is a beta release and most likely will have have some
instability and/or regressions.

Por favor notifique cualquier problema que encuentre en ella.

This release is published to [npm](https://www.npmjs.com/package/electron)
under the `beta` tag and can be installed via `npm install electron@beta`.
```

## Editar el borrador de la publicación

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. Edite la publicación y añada notas de publicación.
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. Haga click en 'Salvar borrador'. **N haga click en 'publicar versión'!**
5. Espero por todas las estructuras por pasar por los procedimientos.
6. In the `release` branch, verify that the release's files have been created:

```sh
$ git rev-parse --abbrev-ref HEAD
release
$ npm run release -- --validateRelease
```

## Merge temporary branch (pre-2-0-x branches only)

Una vez que las compilaciones de versión hayan finalizado, fusione la rama `release` dentro de la rama de versión de origen utilizando el script `merge-release`. Si la rama no puede fusionarse con éxito, este script fusionará mediante cambio de base la rama `release` e insertará los cambios, los cuales activarán las compilaciones de versión nuevamente, lo que significa que se necesitará esperar a que las compilaciones de versión se ejecute nuevamente antes de proceder.

### Fusionando nuevamente en el maestro

```sh
npm run merge-release -- master
```

### Fusionar de vuelta dentro de la rama anterior

```sh
npm run merge-release -- 1-7-x
```

## Publica el lanzamiento

Una vez que la fusión haya finalizado con éxito, ejecute el script `release` a través de `npm run release` para finalizar el proceso de lanzamiento. Este script hará lo siguiente: 1. Compile el proyecto para validar que se está lanzando el número de versión correcto. 2. Descargue los binarios y genere los encabezados de los nodos y el enlazador .lib utilizado en Windows por node-gyp para compilar módulos nativos. 3. Cree y cargue los archivos SHASUMS almacenados en S3 para los archivos de nodo. 4. Cree y cargue el archivo SHASUMS256.txt almacenado en la versión de GitHub. 5. Valide que todos los archivos requeridos estén presentes en GitHub y S3 y que tengan las sumas de comprobación correctas como se especifica en los archivos SHASUMS. 6. Publica la versión en GitHub 7. Elimine la rama `release`.

## Publicar en npm

Before publishing to npm, you'll need to log into npm as Electron. Optionally, you may find [npmrc](https://www.npmjs.com/package/npmrc) to be a useful way to keep Electron's profile side-by-side with your own:

```sh
$ sudo npm install -g npmrc
$ npmrc -c electron
Removing old .npmrc (default)
Activating .npmrc "electron"
```

The Electron account's credentials are kept by GitHub. "Electron - NPM" for the URL "https://www.npmjs.com/login".

```sh
$ npm login
Username: electron
Password:
Email: (this IS public) electron@github.com
```

Publish the release to npm.

```sh
$ npm whoami
electron
$ npm run publish-to-npm
```

Note: In general you should be using the latest Node during this process; however, older versions of the `publish-to-npm` script may have trouble with Node 7 or higher. If you have trouble with this in an older branch, try running with an older version of Node, e.g. a 6.x LTS.

## Repare los binarios que faltan de una versión manualmente

En el caso de una versión corrupta con máquinas CI descompuestas, es posible que tengamos que volver a subir los binarios para una versión ya publicada.

El primer paso es ir a la página [Releases](https://github.com/electron/electron/releases) y borrar los archivos binarios dañados con el archivo de suma de comprobación `SHASUMS256.txt`.

Luego, cree manualmente distribuciones para cada plataforma y cárguelas:

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

Después de volver a cargar todas las distribuciones, vuelva a publicar para cargar la suma de comprobación de archivo:

```sh
npm run release
```