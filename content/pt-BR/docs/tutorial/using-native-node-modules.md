# Usando Módulos Nativos do Node

Os módulos nativos do Node são suportados pelo Electron, mas considerando que o Electron provavelmente irá utilizar uma versão do V8 dos binários do Node instalados no seu sistema, você deve especificar manualmente a localização dos headers do Electron quando for copilar módulos nativos.

## Como instalar módulos nativos

Existem três maneiras para instalar módulos nativos:

### Usando `npm`

Definindo algumas variáveis de ambiente, você pode usar `npm` para instalar módulos diretamente.

Um exemplo de instalação de todas as dependências para Electron:

```sh
# Versão do Electron.
export npm_config_target=1.2.3
# A arquitetura do Electron, pode ser ia32 ou x64.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download de headers para Electron.
export npm_config_disturl=https://atom.io/download/electron 
# Diga ao node-pre-gyp que estamos copilando para o Electron.
export npm_config_runtime=electron 
# Diga ao node-pre-gyp para copilar os módulos do código fonte.
export npm_config_build_from_source=true
# Instale todas as dependências e armazene cache para ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Instalando módulos e recopilando para Electron

You can also choose to install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild) package. This module can get the version of Electron and handle the manual steps of downloading headers and building native modules for your app.

An example of installing `electron-rebuild` and then rebuild modules with it:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# On Windows if you have trouble, try:
.\node_modules\.bin\electron-rebuild.cmd
```

### Manually building for Electron

If you are a developer developing a native module and want to test it against Electron, you might want to rebuild the module for Electron manually. You can use `node-gyp` directly to build for Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

The `HOME=~/.electron-gyp` changes where to find development headers. The `--target=1.2.3` is version of Electron. The `--dist-url=...` specifies where to download the headers. The `--arch=x64` says the module is built for 64bit system.

## Solução de Problemas

If you installed a native module and found it was not working, you need to check following things:

* The architecture of the module has to match Electron's architecture (ia32 or x64).
* After you upgrade Electron, you usually need to rebuild the modules.
* When in doubt, run `electron-rebuild` first.

## Modules that rely on `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Modules that rely on `node-pre-gyp`

The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node, and there are ABI changes, bad things may happen. So in general it is recommended to always build native modules from source code.

If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.