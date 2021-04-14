# Instruções para Configuração (Windows)

Siga as instruções abaixo para compilar o Electron no Windows.

## Pré-requisitos

* Windows 10 / Server 2012 R2 ou superior
* Visual Studio 2017 15.7.2 ou superior - [baixar VS 2019 Community Edition para ](https://www.visualstudio.com/vs/)grátis
  * Consulte [a documentação de compilação do Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) para obter mais detalhes sobre quais componentes do Visual Studio são necessários.
  * Se o seu Visual Studio estiver instalado em um diretório diferente do padrão, você precisará definir algumas variáveis de ambiente para apontar as ferramentas para o seu caminho de instalação.
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`, substituindo `2019` e `Community` por suas versões instaladas e substituindo `DRIVE:` pela unidade em que o Visual Studio está. Muitas vezes, isso será `C:`.
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`, substituindo `DRIVE:` pela unidade em que o Windows Kits está. Muitas vezes, isso será `C:`.
  * [Python para Windows (pywin32) Extensões](https://pypi.org/project/pywin32/#files) também é necessário para executar o processo de compilação.
* [Node.js](https://nodejs.org/download/)
* [Git](https://git-scm.com)
* Ferramentas de depuração para Windows of Windows SDK 10.0.15063.468 se você planeja criar uma distribuição completa, uma vez que `symstore.exe` é usado para criar um símbolo armazenar a partir de arquivos `.pdb` .
  * Diferentes versões do SDK podem ser instaladas lado a lado. Para instalar o SDK, abra o Visual Studio Installer, selecione `Change` → `Individual Components`, role para baixo e selecione o SDK apropriado para instalar. Outra opção seria olhar para o [Windows SDK e arquivo emulador](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) e baixar a versão autônoma do SDK, respectivamente.
  * As Ferramentas de Depuração do SDK também devem ser instaladas. Se o Windows 10 SDK foi instalado através do instalador do Visual Studio, então eles podem ser instalados indo para: `Control Panel` → `Programs` → `Programs and Features` → Selecione o "Windows Software Development Kit" → `Change` → `Change` → Verifique "Ferramentas de depuração para Windows" → `Change`. Ou, você pode baixar o instalador SDK autônomo e usá-lo para instalar as Ferramentas de Depuração.

Caso você não tenha uma instalação do Windows, acesso o endereço [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/), tem uma versão para que possa configurar o Electron.

A configuração do Electron é feita totalmente por linha de comando, não é possível fazer pelo o Visual Studio. Você pode desenvolver com Electron utilizando qualquer editor, futuramente haverá suporte para o Visual Studio.

**Note:** Mesmo que o Visual Studio não seja utilizado para desenvolver com Electron, ainda é preciso ter instalado. **required** Porque é necessário a toolchains fornecida.

## Exclua árvore de origem do Windows Security

O Windows Security não gosta de um dos arquivos do código-fonte chromium (ver https://crbug.com/441184), então ele irá excluí-lo constantemente, causando problemas `gclient sync` . Você pode excluir a árvore de origem de ser monitorada pelo Windows Security [seguindo estas instruções](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26).

## Compilando

Veja [Instruções de build: GN](build-instructions-gn.md)

## Compilação 32bit

Para construir para o alvo de 32bits, você precisa passar `target_cpu = "x86"` como um GN arg. Você pode construir o alvo de 32bits ao lado do alvo de 64bits usando um diretório de saída diferente para GN, por exemplo. `out/Release-x86`, com diferentes argumentos .

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Os outros passos para a compilação são os mesmos.

## Projeto Visual Studio

Para gerar um projeto do Visual Studio, você pode passar o parâmetro `--ide=vs2017` para `gn gen`:

```powershell
$ gn gen out/Testing --ide=vs2017
```

## Solução de Problemas

### Comando xxxx não encontrado

Se você encontrar um erro parecido com `Command xxxx not found`, você pode tentar usar o console do `Prompt de Comando do VS2015` para executar os scripts do build.

### Erro fatal do compilador interno: C1001

Verifique se você tem a atualização mais recente do Visual Studio instalada.

### LNK1181: não é possível abrir o arquivo 'kernel32.lib'

Tente reinstalar o Node.js 32bit.

### Erro: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Criar esse diretório [deve corrigir o problema](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp não é reconhecido como um comando interno ou externo

Você pode obter este erro se você estiver usando Git Bash para construção, você deve usar o PowerShell ou VS2015 Command Prompt.

### não pode criar diretório em '...': Nome de arquivo muito longo

nó.js tem alguns [nomes de caminhos extremamente longos](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), e por padrão git nas janelas não lida com nomes de longos caminhos corretamente (mesmo que as janelas os suportem). Isso deve corrigi-lo:

```sh
$ git config --system core.longpaths true
```

### erro: uso do identificador não declarado 'DefaultDelegateCheckMode'

Isso pode acontecer durante a compilação, quando o Depuração de ferramentas para Windows foi instalado com o Windows Driver Kit. Desinstale o Windows Driver Kit e instale ferramentas de depuração com etapas descritas acima.

### ImportError: Nenhum módulo chamado win32file

Certifique-se de ter instalado `pywin32` com `pip install pywin32`.

### Build Scripts Hang Até Keypress

Este bug é um "recurso" do prompt de comando do Windows. Isso acontece ao clicar dentro da janela prompt com `QuickEdit` habilitado e tem como objetivo permitir selecionar e copiar texto de saída facilmente. Uma vez que cada clique acidental pausará o processo de compilação, você pode querer desativar este recurso nas propriedades do prompt de comando.
