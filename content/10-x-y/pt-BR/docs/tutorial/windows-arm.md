# Windows 10 no Braço

Se seu aplicativo é executado com Electron 6.0.8 ou mais tarde, agora você pode construí-lo para o Windows 10 no Arm. This considerably improves performance, but requires recompilation of any native modules used in your app. It may also require small fixups to your build and packaging scripts.

## Executando um app básico
Se o seu aplicativo não usa quaisquer módulos nativos, então é realmente fácil criar uma versão do Arm do seu aplicativo.

1. Certifique-se de que o diretório `node_modules` do seu app esteja vazio.
2. Usando um _Command Prompt_, execute `set npm_config_arch=arm64` antes de executar `npm install`/`yarn install` como de costume.
3. [Se você tem electron instalado como uma dependência de desenvolvimento](first-app.md), npm irá baixar e descompactar a versão arm64. Você pode então empacotar e distribuir seu aplicativo normalmente.

## Considerações gerais

### Código de arquitetura específico

Lots of Windows-specific code contains if... else logic that selects between either the x64 or x86 architectures.

```js
if (process.arch === 'x64') {
  // Faça coisas de 64-bit...
} else {
  // Fazer algo de 32-bit...
}
```

Se você quer direcionar o arm64, a lógica normalmente vai selecionar a arquitetura errada, tão cuidadosamente verifique seu aplicativo e scripts de compilação para condições como essa. Em scripts de compilação e embalagem personalizados, você sempre deve verificar o valor de `npm_config_arch` no ambiente, em vez de depender do processo atual.

### Módulos nativos
Se você usar módulos nativos, você deve se certificar de que eles compilam contra v142 do compilador MSVC (fornecido no Visual Studio 2017). Você também deve verificar se qualquer `.dll` ou `pré-construído. arquivos ib` fornecidos ou referenciados pelo módulo nativo estão disponíveis para Windows no Arm.

### Testando seu aplicativo
Para testar seu aplicativo, use um dispositivo Windows no Arm executando o Windows 10 (versão 1903 ou mais tarde). Certifique-se de copiar seu aplicativo para o dispositivo de destino - Chromiumsandbox do Chromium não funcionará corretamente ao carregar seus recursos de aplicativo de um local de rede.

## Pré-requisitos de desenvolvimento
### Node.js/node-gyp

[Recomenda-se o Node.js v12.9.0 ou posterior.](https://nodejs.org/en/) Se atualizar para uma nova versão do Node não for desejável, em vez disso, [atualize a cópia do npm do node-gyp manualmente](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) para a versão 5. .2 ou mais tarde, que contém as alterações necessárias para compilar módulos nativos para o Arm.

### Visual Studio 2017
Visual Studio 2017 (qualquer edição) é necessária para a compilação de módulos nativos. Você pode baixar a Comunidade do Visual Studio 2017 através do [programa Visual Studio Essentials](https://visualstudio.microsoft.com/dev-essentials/) da Microsoft. Após a instalação, você pode adicionar os componentes específicos do braço executando o seguinte a partir de um _Prompt de Comando_:

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeRecomendado
```

#### Criando um prompt de comando cross-compilation
Definir `npm_config_arch=arm64` no ambiente cria o arm64 `correto. arquivos bj` , mas o padrão _Prompt de Comando do Desenvolvedor para VS 2017_ usará o link x64. Para consertar isto:

1. Duplique o _x64_x86 Ferramentas Cruzadas Prompt de Comando para VS 2017_ (por exemplo, ao localizá-lo no menu inicial, ao clicar com o botão direito, selecionando _Abrir Local do Arquivo_, copiar e colar) para algum lugar conveniente.
2. Clique com o botão direito no novo atalho e escolha _Propriedades_.
3. Altere o campo _Alvo_ para ler `vcvarsamd64_arm64.bat` no final ao invés de `vcvarsamd64_x86.bat`.

Se feito com sucesso, o prompt de comando deverá imprimir algo semelhante a isso na inicialização:

```bat
********************************************************************
do Visual Studio 2017 Comando do Desenvolvedor 2017 Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
******************************************************************
[vcvarsall.bat] Environment initialized para: 'x64_arm64'
```

Se você deseja desenvolver seu aplicativo diretamente em um dispositivo do Arm, substitua `vcvarsx86_arm64. no` _Alvo_ para que a compilação cruzada ocorra com a emulação x86 do dispositivo.

### Vinculando com o `node.lib` correto

By default, `node-gyp` unpacks Electron's node headers and downloads the x86 and x64 versions of `node.lib` into `%APPDATA%\..\Local\node-gyp\Cache`, but it does not download the arm64 version ([a fix for this is in development](https://github.com/nodejs/node-gyp/pull/1875).) Para consertar isto:

1. Baixe o arm64 `node.lib` de https://electronjs.org/headers/v6.0.9/win-arm64/node.lib
2. Mova-o para `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

Substitua `6.0.9` pela versão que está usando.


## Compilação entre módulos nativos
Depois de completar tudo acima, abra seu prompt de comando de compilação cruzada e execute `o npm_config_arch=arm64`. Então use o `npm install` para construir seu projeto como normal. Como com a compilação cruzada x86 módulos, você pode precisar remover `node_modules` para forçar a recompilação de módulos nativos se eles tiverem sido compilados anteriormente para outra arquitetura.

## Depurando módulos nativos

Módulos nativos de depuração podem ser feitos com o Visual Studio 2017 (funcionando na sua máquina de desenvolvimento) e correspondentes [Visual Studio Depurador Remoto](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) rodando no dispositivo de destino. Para depurar:

1. Torne seu aplicativo `. Encha` no dispositivo de destino através do _Prompt de Comando_ (passando `--inspect-brk` para pausá-lo antes que qualquer módulo nativo seja carregado).
2. Inicie o Visual Studio 2017 em sua máquina de desenvolvimento.
3. Conectar ao dispositivo de destino selecionando _Debug > Attach to Process..._ e digite o endereço IP do dispositivo e o número da porta exibido pela ferramenta Visual Studio Depurador Remoto.
4. Clique em _Atualizar_ e selecione o [processo de Electron apropriado para anexar](../development/debug-instructions-windows.md).
5. Você pode precisar ter certeza de que quaisquer símbolos para módulos nativos no seu aplicativo estão carregados corretamente. Para configurar isso, vá para _Depurar > Opções..._ no Visual Studio 2017, e adicione as pastas que contém seu `. db` símbolos sob _depuração > Símbolos_.
5. Uma vez anexado, defina quaisquer pontos de quebra apropriados e retome a execução do JavaScript usando as [ferramentas remotas do Chrome para o Node](debugging-main-process.md).

## Obter ajuda adicional
Se você encontrar um problema com esta documentação, ou se seu aplicativo funciona quando compilado para x86, mas não para arm64, por favor [registre um problema](../development/issues.md) com "Windows on Arm" no título.
