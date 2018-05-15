# Instruções para Configuração (Windows)

Siga as instruções abaixo para compilar o Electron no Windows.

## Pré-requisitos

* Windows 7 / Server 2008 R2 ou superior
* Visual Studio 2017 - [Baixe o VS 2017 Community grátis](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Ferramentas para depuração para Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) se você planeja criar uma distribuição completa desde do `symstore.exe` é utilizado o `.pdb`.

Caso você não tenha uma instalação do Windows, acesso o endereço [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/), tem uma versão para que possa configurar o Electron.

A configuração do Electron é feita totalmente por linha de comando, não é possível fazer pelo o Visual Studio. Você pode desenvolver com Electron utilizando qualquer editor, futuramente haverá suporte para o Visual Studio.

**Note:** Mesmo que o Visual Studio não seja utilizado para desenvolver com Electron, ainda é preciso ter instalado. **required** Porque é necessário a toolchains fornecida.

## Obtendo o Código Fonte

```powershell
$ git clone https://github.com/electron/electron.git
```

## Inicialização

O script de inicialização irá baixar todas as dependências necessárias e criar os arquivos de configuração do projeto. Observe que estamos utilizando o `ninja` para compilar o Electron, não existe nenhum projeto gerado pelo o Visual Studio.

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## Compilando

Compilar Release e Debug:

```powershell
$ python script\build.py
```

Você pode também compilar somente o Debug:

```powershell
$ python script\build.py -c D
```

Após a finalização da compilação, você poderá ver o `electron.exe` na pasta `out\D`(debug) ou `out\R` (release).

## Compilação 32bit

Para compilar para 32bit, é necessário informar o parâmetro `--target_arch=ia32` ao executar o script de inicialização:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

Os outros passos para a compilação são os mesmos.

## Projeto Visual Studio

Para você gerar o projeto no Visual Studio, é necessário informar o parâmetro `--msvs`:

```powershell
$ python script\bootstrap.py --msvs
```

## Excluindo

Para excluir os arquivos de compilação:

```powershell
$ npm run clean
```

Para excluir somente os diretórios `out` e `dist`:

```sh
$ npm run clean-build
```

**Nota:** Os dois comandos exigem que seja executado o `bootstrap` novamente antes da compilação.

## Testes

Veja [Visão Geral do Sistema: Testes](build-system-overview.md#tests)

## Solução de Problemas

### Comando xxxx não encontrado

Se você encontrar um erro parecido com `Command xxxx not found`, você pode tentar usar o console do `Prompt de Comando do VS2015` para executar os scripts do build.

### Erro fatal do compilador interno: C1001

Verifique se você tem a atualização mais recente do Visual Studio instalada.

### Assertion failed: ((handle))->activecnt >= 0

Se estiver fazendo build pelo Cygwin, você poderá ter uma falha no `bootstrap.py` com a seguinte mensagem de erro:

```sh
Assertion failed: ((handle))->activecnt >= 0, file src\win\pipe.c, line 1430

Traceback (most recent call last):
  File "script/bootstrap.py", line 87, in <module>
    sys.exit(main())
  File "script/bootstrap.py", line 22, in main
    update_node_modules('.')
  File "script/bootstrap.py", line 56, in update_node_modules
    execute([NPM, 'install'])
  File "/home/zcbenz/codes/raven/script/lib/util.py", line 118, in execute
    raise e
subprocess.CalledProcessError: Command '['npm.cmd', 'install']' returned non-zero exit status 3
```

Isso é causado por um bug ao usar o Cygwin Python e Win32 juntos. A solução ao usar o Python Win32 para executar o script de inicialização (supondo que você tenha instalado o Python em `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: não é possível abrir o arquivo 'kernel32.lib'

Tente reinstalar o Node.js 32bit.

### Erro: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp não é reconhecido como um comando interno ou externo

Você pode obter este erro se você estiver usando Git Bash para construção, você deve usar o PowerShell ou VS2015 Command Prompt.