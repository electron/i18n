# Instruções para Configuração (Windows)

Siga as instruções abaixo para compilar o Electron no Windows.

## Pré-requisitos

* Windows 7 / Server 2008 R2 ou maior
* Visual Studio 2015 Update 3 - [Baixe o VS 2015 Community grátis](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](http://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Ferramentas para depuração para Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) se você planeja criar uma distribuição completa desde do `symstore.exe` é utilizado o `.pdb`.

Caso você não tenha uma instalação do Windows, acesso o endereço [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/), tem uma versão para que possa configurar o Electron.

A configuração do Electron é feita totalmente por linha de comando, não é possível fazer pelo o Visual Studio. Você pode desenvolver com Electron utilizando qualquer editor, futuramente haverá suporte para o Visual Studio.

**Note:** Mesmo que o Visual Studio não seja utilizado para desenvolver com Electron, ainda é preciso ter instalado. **required** Porque é necessário a toolchains fornecida.

## Obtendo o código fonte

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

```bash
$ npm run clean-build
```

**Nota:** Os dois comandos exigem que seja executado o `bootstrap` novamente antes da compilação.

## Testes

Veja [Visão Geral do Sistema: Testes](build-system-overview.md#tests)

## Solução de Problemas

### Comando xxxx não encontrado

If you encountered an error like `Command xxxx not found`, you may try to use the `VS2015 Command Prompt` console to execute the build scripts.

### Fatal internal compiler error: C1001

Make sure you have the latest Visual Studio update installed.

### Assertion failed: ((handle))->activecnt >= 0

If building under Cygwin, you may see `bootstrap.py` failed with following error:

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
    

This is caused by a bug when using Cygwin Python and Win32 Node together. The solution is to use the Win32 Python to execute the bootstrap script (assuming you have installed Python under `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

Try reinstalling 32bit Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Simply making that directory [should fix the problem](http://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

You may get this error if you are using Git Bash for building, you should use PowerShell or VS2015 Command Prompt instead.