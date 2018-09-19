# Soporte de Electron

## Encontrar Soporte

Si tiene un problema de seguridad, consulte el [documento de seguridad](../../SECURITY.md).

Si busca ayuda con la programación, respuestas a preguntas o conversaciones con otros desarrolladores que usan Electron, puede interactuar con la comunidad en estos lugares:

* Categoría [`electron`](https://discuss.atom.io/c/electron) en los foros de Atom
* Canal `#atom-shell` en Freenode
* Canal [`Electron`](https://atom-slack.herokuapp.com) en Atom's Slack
* [`electron-ru`](https://telegram.me/electron_ru) *(Ruso)*
* [`electron-br`](https://electron-br.slack.com) *(Portugués Brasileño)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Coreano)*
* [`electron-jp`](https://electron-jp.slack.com) *(Japonés)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(Turco)*
* [`electron-id`](https://electron-id.slack.com) *(Indonesio)*
* [`electron-pl`](https://electronpl.github.io) *(Polaco)*

Si desea contribuir a Electron, consulte el [documento contribuyente](../../CONTRIBUTING.md).

Si has encontrado un error en una [versión soportada](#supported-versions) de Electron, infórmalo con el [rastreador de problemas](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) es una lista mantenida por la comunidad de útiles ejemplos de aplicaciones, herramientas y recursos.

## Versiones Soportadas

Las últimas tres ramas de publicación cuentan con el respaldo del equipo de Electron. Por ejemplo, si la última versión es 2.0.x, entonces la serie 2-0-x es compatible, al igual que las dos versiones anteriores de la serie 1-7-x y 1-8-x.

Cuando una rama de lanzamiento llega al final de su ciclo de soporte, la serie quedará obsoleta en NPM y se realizará una versión final de fin de soporte. This release will add a warning to inform that an unsupported version of Electron is in use.

These steps are to help app developers learn when a branch they're using becomes unsupported, but without being excessively intrusive to end users.

If an application has exceptional circumstances and needs to stay on an unsupported series of Electron, developers can silence the end-of-support warning by omitting the final release from the app's `package.json` `devDependencies`. For example, since the 1-6-x series ended with an end-of-support 1.6.18 release, developers could choose to stay in the 1-6-x series without warnings with `devDependency` of `"electron": 1.6.0 - 1.6.17`.

## Plataformas soportadas

Las siguientes plataformas son apoyadas por Electron:

### macOS

Solo 64bits binarios son previstos para macOS, la versión mínima de macOS soportada es masOS 10.9.

### Windows

Windows 7 y posteriores son soportados, sistemas operativos más viejos no lo son (y no funcionan).

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. Running Electron apps on Windows for ARM devices is possible by using the ia32 binary.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Si el compilado binario puede correr en una distribución depende de que la distribución incluye las librerías a las que está ligada Electron en la plataforma construida, así que solo hay garantía de que Ubuntu 12.04 trabaje, pero las siguientes plataformas también están verificadas para correr el precompilado binario de Electron:

* Ubuntu 12.04 y posteriores
* Fedora 21
* Debian 8