# Instruções para Configuração (Windows)

Siga as instruções abaixo para compilar o Electron no Windows.

## Pré-requisitos

* Windows 10 / Server 2012 R2 ou superior
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Ferramentas para depuração para Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) se você planeja criar uma distribuição completa desde do `symstore.exe` é utilizado o `.pdb`.

Caso você não tenha uma instalação do Windows, acesso o endereço [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/), tem uma versão para que possa configurar o Electron.

A configuração do Electron é feita totalmente por linha de comando, não é possível fazer pelo o Visual Studio. Você pode desenvolver com Electron utilizando qualquer editor, futuramente haverá suporte para o Visual Studio.

**Note:** Mesmo que o Visual Studio não seja utilizado para desenvolver com Electron, ainda é preciso ter instalado. **required** Porque é necessário a toolchains fornecida.

## Compilando

See [Build Instructions: GN](build-instructions-gn.md)

## Compilação 32bit

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Os outros passos para a compilação são os mesmos.

## Projeto Visual Studio

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## Solução de Problemas

### Comando xxxx não encontrado

Se você encontrar um erro parecido com `Command xxxx not found`, você pode tentar usar o console do `Prompt de Comando do VS2015` para executar os scripts do build.

### Erro fatal do compilador interno: C1001

Verifique se você tem a atualização mais recente do Visual Studio instalada.

### LNK1181: não é possível abrir o arquivo 'kernel32.lib'

Tente reinstalar o Node.js 32bit.

### Erro: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp não é reconhecido como um comando interno ou externo

Você pode obter este erro se você estiver usando Git Bash para construção, você deve usar o PowerShell ou VS2015 Command Prompt.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```