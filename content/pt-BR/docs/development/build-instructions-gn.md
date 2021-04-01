# Instruções de Compilação

Siga as instruções abaixo para compilar o Electron.

## Pré-requisitos da plataforma

Verifique os pré-requisitos de compilação para sua plataforma antes de prosseguir

* [macOS](build-instructions-macos.md#prerequisites)
* [Linux](build-instructions-linux.md#prerequisites)
* [Windows](build-instructions-windows.md#prerequisites)

## Construir ferramentas

[Ferramentas de Compilação da Electron](https://github.com/electron/build-tools) automatizar grande parte da configuração para compilar o Electron a partir de fontes com diferentes configurações e criar alvos. Se você deseja configurar o ambiente manualmente, as instruções estão listadas abaixo.

## Pré-requisitos GN

Você precisará instalar [`depot_tools`][depot-tools], o toolset usado para obter Chromium e suas dependências.

Além disso, no Windows, você precisará definir a variável ambiente `DEPOT_TOOLS_WIN_TOOLCHAIN=0`. Para isso, abra o Sistema `Control Panel` → `e
segurança` → `System` → `Advanced system settings` e adicione uma variável de sistema `DEPOT_TOOLS_WIN_TOOLCHAIN` com `0`de valor .  Isso diz ao `depot_tools` usar sua versão localmente instalada do Visual Studio (por padrão, `depot_tools` tentará baixar uma versão interna do Google que apenas os Googlers têm acesso).

### Configuração do cache git

Se você planeja verificar a Electron mais de uma vez (por exemplo, para ter vários diretórios paralelos verificados em diferentes ramos), o uso do cache git acelerará as chamadas subsequentes para `gclient`. Para isso, defina uma variável de ambiente `GIT_CACHE_PATH` :

```sh
$ exportação GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# Isso vai usar cerca de 16G.
```

## Obtendo o código

```sh
$ mkdir elétron && cd elétron
$ gclient config --nome "src/elétron" --não gerenciado https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# Isso vai demorar um pouco, vá pegar um café.
```

> Em vez de `https://github.com/electron/electron`, você pode usar seu próprio garfo aqui (algo como `https://github.com/<username>/electron`).

### Uma nota sobre puxar/empurrar

Se você pretende `git pull` ou `git push` do repositório oficial de `electron` no futuro, agora você precisa atualizar as URLs de origem da respectiva pasta.

```sh
$ cd src/elétron
$ git remoto remover origem
$ git remoto adicionar origem https://github.com/electron/electron
$ git checkout master
$ ramo git --set-upstream-to=origin/master
$ cd -
```

:memo: `gclient` funciona verificando um arquivo chamado `DEPS` dentro da pasta `src/electron` para dependências (como Chromium ou Node.js). A execução `gclient sync -f` garante que todas as dependências necessárias para construir Electron correspondam a esse arquivo.

Então, para puxar, você executaria os seguintes comandos:

```sh
$ cd src/elétron
$ git puxar
$ gclient sync -f
```

## Compilando

```sh
$ cd src
$ exportação CHROMIUM_BUILDTOOLS_PATH='pwd'/buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

Ou no Windows (sem o argumento opcional):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\")"
```

Isso gerará um diretório de construção `out/Testing` sob `src/` com configuração de compilação de testes. Você pode substituir `Testing` por outro nome, mas deve ser um subdiretório de `out`. Além disso, você não deve ter que executar `gn gen` novamente — se você quiser mudar o construir argumentos, você pode executar `gn args out/Testing` para trazer um editor.

Para ver a lista de opções de configuração de compilação disponíveis, execute `gn args
/Testando --list`.

**Para gerar testes de construção de Electron:**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

**Para gerar liberação (também conhecida como "não-componente" ou "estática") construir config de Electron:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**Para construir, corra `ninja` com o alvo `electron` :** Nota Bene: Isso também vai demorar um pouco e provavelmente aquecer seu colo.

Para a configuração de teste:

```sh
$ ninja -C out/Testing elétron
```

Para a configuração de lançamento:

```sh
$ ninja -C fora/Liberar elétron
```

Isso construirá todo o que antes era "libcromiumcontent" (ou seja, o diretório `content/` de `chromium` e suas dependências, incl. WebKit e V8), por isso vai demorar um pouco.

O executável construído estará sob `./out/Testing`:

```sh
$ ./out/Testing/Electron.app/Contents/MacOS/Electron
# ou, no Windows
$ ./out/Testing/electron.exe
# ou, no Linux
$ ./out/Testing/electron
```

### Empacotando

No linux, primeiro despir as informações de depuração e símbolo:

```sh
elétron/script/strip-binaries.py -d out/Release
```

Para empacotar a compilação eletrônica como um arquivo zip distribuível:

```sh
ninja -C out/Release electron:electron_dist_zip
```

### Compilação cruzada

Para compilar para uma plataforma que não é a mesma que você está construindo, definir os argumentos `target_cpu` e `target_os` GN. Por exemplo, para compilar um alvo x86 de um host x64, especifique `target_cpu = "x86"` em `gn args`.

```sh
$ gn gen out/Testing-x86 --args='... target_cpu = "x86"'
```

Nem todas as combinações de CPU/OS de origem e destino são suportadas pelo Chromium.

| Host        | Alvo          | Status                  |
| ----------- | ------------- | ----------------------- |
| Windows x64 | Windows arm64 | Experimental            |
| Windows x64 | Windows x86   | Testado automaticamente |
| Linux x64   | Linux x86     | Testado automaticamente |

Se você testar outras combinações e encontrá-las para funcionar, atualize este documento :)

Consulte a referência GN para valores permitidos de [`target_os`][target_os values] e [`target_cpu`][target_cpu values].

#### Windows no Arm (experimental)

Para compilar para Windows on Arm, [siga o guia do Chromium](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio) para obter as dependências necessárias, SDK e bibliotecas, em seguida, construa com `ELECTRON_BUILDING_WOA=1` em seu ambiente antes de executar `gclient sync`.

```bat
conjunto ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Ou (se usando PowerShell):

```powershell
$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Em seguida, corra `gn gen` como acima com `target_cpu="arm64"`.

## Testes

Para executar os testes, primeiro você precisará construir os módulos de teste contra a mesma versão do Node.js que foi construído como parte do processo de construção. Para gerar cabeçalhos de compilação para os módulos compilarem, execute os seguintes sob `src/` diretório.

```sh
$ ninja -C out/Testing third_party/electron_node:headers
```

Agora você pode [executar os testes](testing.md#unit-tests).

Se você está depurando algo, pode ser útil passar algumas bandeiras extras para o binário Electron:

```sh
Teste de execução de $npm -- \
  --habilitar-registro -g 'BrowserWindow module'
```

## Compartilhando o cache git entre várias máquinas

É possível compartilhar o cache de git gclient com outras máquinas exportando-o como compartilhamento de SMB no Linux, mas apenas um processo/máquina pode estar usando o cache em um tempo. As fechaduras criadas pelo script git-cache tentarão evitar isso, mas podem não funcionar perfeitamente em uma rede.

No Windows, o SMBv2 possui um cache de diretório que causará problemas com o script de cache git , por isso é necessário desabilitá-lo definindo a chave de registro

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parâmetros\DirectoryCacheLifetime
```

a 0. Mais informações: https://stackoverflow.com/a/9935126

Isso pode ser definido rapidamente em powershell (ran como administrador):

```powershell
New-ItemProperty -Caminho "HKLM:\System\CurrentControlSet\Services\Lanmanworkstation\Parameters" -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
```

## Solução de Problemas

### gclient sync reclama sobre rebase

Se `gclient sync` for interrompida, a árvore de git pode ser deixada em um estado ruim, levando a uma mensagem enigmática ao executar `gclient sync` no futuro:

```plaintext
2> Conflito enquanto rebassar este ramo.
2> corrigir o conflito e executar gclient novamente.
2> Ver o homem git-rebase para detalhes.
```

Se não houver conflitos ou rebases de git em `src/electron`, você pode precisar abortar um `git am` em `src`:

```sh
Cd $ .. /
$ git am --abortar
$ cd elétron
$ gclient sync -f
```

### Estou pedindo um nome de usuário/senha para chromium-internal.googlesource.com

Se você vir um prompt para `Username for 'https://chrome-internal.googlesource.com':` ao executar `gclient sync` no Windows, provavelmente é porque a variável de ambiente `DEPOT_TOOLS_WIN_TOOLCHAIN` não está definida como 0. Abra `Painel de Controle` → `Sistema e Segurança` → `Sistema` → `Configurações avançadas do sistema` e adicione uma variável de sistema `DEPOT_TOOLS_WIN_TOOLCHAIN` com valor `0`.  Isso diz ao `depot_tools` usar sua versão localmente instalada do Visual Studio (por padrão, `depot_tools` tentará baixar uma versão interna do Google que apenas os Googlers têm acesso).

[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

[target_os values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values
[target_cpu values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values
