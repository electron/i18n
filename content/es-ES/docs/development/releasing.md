# Publicar

Este documento describe el proceso de publicación de una nueva versión de Electron.

## Configura tus tokens y variables de entorno

Necesitarás las credenciales de Electron S3 para crear y cargar una versión de Electron. Póngase en contacto con un miembro del equipo para obtener más información.

Hay un puñado de variables de entorno `*_TOKEN` que necesitan los scripts de lanzamiento:

- `ELECTRON_GITHUB_TOKEN`: Crea esto visitando https://github.com/settings/tokens/new?scopes=repo
- `APPVEYOR_TOKEN`: Crea un token desde https://windows-ci.electronjs.org/api-token Si no tienes una cuenta, pídele a un miembro del equipo que te agregue.
- `CIRCLE_TOKEN`: Crea un token desde "Personal API Tokens" en https://circleci.com/account/api
- `VSTS_TOKEN`: Cree un Token de Acceso Personal en https://github.visualstudio.com/_usersSettings/tokens o https://github.visualstudio.com/_details/security/tokens con el alcance de `Build (leer y ejecutar)`.
- `ELECTRON_S3_BUCKET`:
- `ELECTRON_S3_ACCESS_KEY`:
- `ELECTRON_S3_SECRET_KEY`: If you don't have these, ask a team member to help you.

Once you've generated these tokens, put them in a `.env` file in the root directory of the project. This file is gitignored, and will be loaded into the environment by the release scripts.

## Determinar cual rama publicar primero

- **Si se publica el beta,** ejecute el script abajo desde `maestro`.
- **If releasing a stable version,** run the scripts below from the branch you're stabilizing.

## Encontrar cual es el cambio de versión que se necesita

Corra `npm run prepare-release -- --notesOnly`para ver notas de publicación generadas automáticamente. Las notas generadas deberían ayudarte a determinar si esta es un cambio de versión mayor, menor, un parche, o una versión beta. Para más información lea el [Version Change Rules](../tutorial/electron-versioning.md#semver).

**NB:** If releasing from a branch, e.g. 1-8-x, check out the branch with `git checkout 1-8-x` rather than `git checkout -b remotes/origin/1-8-x`. The scripts need `git rev-parse --abbrev-ref HEAD` to return a short name, e.g. no `remotes/origin/`

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
npm run prepare-release -- patch --stable
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

- [electron-release-mas-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=19&_a=completed) for MAS builds.
- [electron-release-osx-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=18&_a=completed) for OSX builds.
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for Linux builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron-39ng6](https://windows-ci.electronjs.org/project/AppVeyor/electron-39ng6) for Windows 32-bit builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) for Windows 64-bit builds.

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
3. Haga click en 'Salvar borrador'. **N haga click en 'publicar versión'!**
4. Espero por todas las estructuras por pasar por los procedimientos.
5. In the branch, verify that the release's files have been created:

```sh
$ npm run release -- --validateRelease
```

Note, if you need to run `--validateRelease` more than once to check the assets, run it as above the first time, then `node ./script/release.js --validateRelease` for subsequent calls so that you don't have to rebuild each time you want to check the assets.

## Publica el lanzamiento

Una vez que la fusión haya finalizado con éxito, ejecute el script `release` a través de `npm run release` para finalizar el proceso de lanzamiento. Este script hará lo siguiente: 1. Compile el proyecto para validar que se está lanzando el número de versión correcto. 2. Descargue los binarios y genere los encabezados de los nodos y el enlazador .lib utilizado en Windows por node-gyp para compilar módulos nativos. 3. Cree y cargue los archivos SHASUMS almacenados en S3 para los archivos de nodo. 4. Cree y cargue el archivo SHASUMS256.txt almacenado en la versión de GitHub. 5. Valide que todos los archivos requeridos estén presentes en GitHub y S3 y que tengan las sumas de comprobación correctas como se especifica en los archivos SHASUMS. 6. Publica la versión en GitHub

## Publicar en npm

Before publishing to npm, you'll need to log into npm as Electron. Optionally, you may find [npmrc](https://www.npmjs.com/package/npmrc) to be a useful way to keep Electron's profile side-by-side with your own:

```sh
$ sudo npm install -g npmrc
$ npmrc -c electron
Removing old .npmrc (default)
Activating .npmrc "electron"
```

The Electron account's credentials are kept by GitHub in a password manager. You'll also need to have access to an 2FA authenticator app with the appropriate OTP generator code to log in.

```sh
$ npm login
Username: electron-nightly
Password: <This can be found under NPM Electron Nightly on LastPass>
Email: (this IS public) electron@github.com
```

Publish the release to npm. Before running this you'll need to have set `ELECTRON_NPM_OTP` as an environment variable using a code from the aforementioned 2FA authenticator app.

```sh
$ npm whoami
electron-nightly
$ npm run publish-to-npm
```

After publishing, you can check the `latest` release:

```sh
$ npm dist-tag ls electron
```

If for some reason `npm run publish-to-npm` fails, you can tag the release manually:

```sh
$ npm dist-tag add electron@<version> <tag>
```

e.g.:

```sh
$ npm dist-tag add electron@2.0.0 latest
```

# Problemas

## Rerun broken builds

If a release build fails for some reason, you can use `script/ci-release-build.js` to rerun a release build:

### Rerun all linux builds:

```sh
node script/ci-release-build.js --ci=CircleCI --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

### Rerun all macOS builds:

```sh
node script/ci-release-build.js --ci=VSTS --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

### Rerun all Windows builds:

```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

Additionally you can pass a job name to the script to run an individual job, eg:

```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease --job=electron-x64 TARGET_BRANCH
```

## Repare los binarios que faltan de una versión manualmente

En el caso de una versión corrupta con máquinas CI descompuestas, es posible que tengamos que volver a subir los binarios para una versión ya publicada.

El primer paso es ir a la página [Releases](https://github.com/electron/electron/releases) y borrar los archivos binarios dañados con el archivo de suma de comprobación `SHASUMS256.txt`.

Luego, cree manualmente distribuciones para cada plataforma y cárguelas:

```sh
# Checkout the version to re-upload.
git checkout vX.Y.Z

# Create release build
gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"

# To compile for specific arch, instead set
gn gen out/Release-<TARGET_ARCH> --args='import(\"//electron/build/args/release.gn\") target_cpu = "[arm|x64|ia32]"'

# Build by running ninja with the electron target
ninja -C out/Release electron
ninja -C out/Release electron:dist_zip

# Explicitly allow overwriting a published release.
./script/upload.py --overwrite
```

Allowable values for [target_cpu](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values) and [target_os](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values).

Después de volver a cargar todas las distribuciones, vuelva a publicar para cargar la suma de comprobación de archivo:

```sh
npm run release
```