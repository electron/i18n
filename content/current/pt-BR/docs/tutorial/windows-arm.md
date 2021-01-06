# Windows 10 no ARM

Se seu aplicativo roda com o Electron 6.0.8 ou superior, agora você pode construí-lo para o Windows 10 no ARM. Isto melhora consideravelmente o desempenho, mas requer a recompilação de todos os módulos nativos usados no seu aplicativo. Também pode exigir pequenas correções nos seus scripts de compilação e empacotamento.

## Executando um app básico

Se o seu aplicativo não usa nenhum módulo nativo, então é muito mais fácil criar uma versão do ARM do seu aplicativo.

1. Certifique-se de que o diretório `node_modules` do seu app esteja vazio.
2. Usando um _Prompt de Comando_, execute `set npm_config_arch=arm64` antes de executar `npm install`/`yarn install` como de costume.
3. [Se você tem o Electron instalado como uma dependência de desenvolvimento](quick-start.md#prerequisites), npm irá baixar e descompactar a versão arm64. Você pode então empacotar e distribuir seu aplicativo normalmente.

## Considerações gerais

### Código de arquitetura específico

Muitos códigos específicos do Windows contém lógica de if... else que seleciona entre as arquiteturas x64 ou x86.

```js
if (process.arch === 'x64') {
  // Faça coisas de 64-bit...
} else {
  // Fazer algo de 32-bit...
}
```

Se você quiser o arm64 como arquitetura de destino, uma lógica como essa normalmente vai selecionar a arquitetura errada, então verifique com muita atenção o seu aplicativo e seus scripts de compilação em busca de condições como essa. Em scripts de compilação e empacotamento personalizados, você sempre deve verificar o valor de `npm_config_arch` no ambiente, em vez de depender da arquitetura no processo atual.

### Módulos nativos

Se você usar módulos nativos, você deve se certificar de que eles compilam contra v142 do compilador MSVC (fornecido no Visual Studio 2017). Você também deve verificar se qualquer `.dll` ou `pré-construído. arquivos ib` fornecidos ou referenciados pelo módulo nativo estão disponíveis para Windows no Arm.

### Testar seu aplicativo

Para testar seu aplicativo, use um dispositivo ARM executando o Windows 10 ARM (versão 1903 ou mais tarde). Certifique-se de copiar seu aplicativo para o dispositivo de destino - a sandbox do Chromium não funcionará corretamente ao carregar seus recursos de aplicativo a partir de um local de rede.

## Pré-requisitos de desenvolvimento

### Node.js/node-gyp

[Recomenda-se o Node.js v12.9.0 ou posterior.](https://nodejs.org/en/) Se atualizar para uma nova versão do Node não for desejável, em vez disso, [atualize a cópia do npm do node-gyp manualmente](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) para a versão 5.0.2 ou posterior, que contém as alterações necessárias para compilar módulos nativos para ARM.

### Visual Studio 2017

O Visual Studio 2017 (qualquer edição) é necessário para a compilação de módulos nativos. Você pode baixar o Visual Studio Community 2017 através do [programa Visual Studio Dev Essentials](https://visualstudio.microsoft.com/dev-essentials/) da Microsoft. Após a instalação, você pode adicionar os componentes específicos do ARM executando o seguinte comando a partir de um _Prompt de Comando_:

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeRecomendado
```

#### Criando um prompt de comando para compilação cruzada

Definir `npm_config_arch=arm64` no ambiente cria os arquivos `.obj` corretos para arm64, mas o _Prompt de Comando do Desenvolvedor para VS 2017_ padrão utilizará o vinculador x64. Para corrigir isto:

1. Duplique o atalho do _Prompt de Comando de Ferramentas Cruzadas do x86_x64 para VS 2017_ (por exemplo, ao localizá-lo no menu iniciar, clique com o botão direito, selecione _Abrir local do arquivo_, copie e cole) para algum lugar conveniente.
2. Clique com o botão direito no novo atalho e clique em _Propriedades_.
3. Altere o campo _Destino_ para que o final dele seja `vcvarsamd64_arm64.bat` ao invés de `vcvarsamd64_x86.bat`.

Se feito com sucesso, o prompt de comando deverá imprimir algo semelhante a isso na inicialização:

```bat
********************************************************************
do Visual Studio 2017 Comando do Desenvolvedor 2017 Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
******************************************************************
[vcvarsall.bat] Environment initialized para: 'x64_arm64'
```

Se você deseja desenvolver seu aplicativo diretamente em um dispositivo do Arm, substitua `vcvarsx86_arm64.bat` no _Destino_ para que a compilação cruzada ocorra com a emulação x86 do dispositivo.

### Vinculando com o `node.lib` correto

Por padrão, o `node-gyp` extrai os cabeçalhos do Node do Electron e baixa as versões x86 e x64 do `node.lib` em `%APPDATA%\..\Local\node-gyp\Cache`, mas ele não baixa a versão arm64 ([uma correção para isso está em desenvolvimento](https://github.com/nodejs/node-gyp/pull/1875).) Para corrigir isto:

1. Baixe a versão arm64 do `node.lib` de https://electronjs.org/headers/v6.0.9/win-arm64/node.lib
2. Mova-a para `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

Substitua `6.0.9` pela versão que você está usando.

## Compilação cruzada de módulos nativos

Depois de completar tudo acima, abra o seu prompt de comando de compilação cruzada e execute `set npm_config_arch=arm64`. Então use o `npm install` para construir seu projeto normalmente. Como com a compilação cruzada de módulos x86, você pode precisar excluir a pasta `node_modules` para forçar a recompilação de módulos nativos se eles tiverem sido compilados anteriormente para outra arquitetura.

## Depurando módulos nativos

Módulos nativos podem ser depurados com o Visual Studio 2017 (funcionando na sua máquina de desenvolvimento) e o [depurador remoto do Visual Studio](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) correspondente rodando no dispositivo de destino. Para depurar:

1. Abra seu aplicativo `. Encha` no dispositivo de destino através do _Prompt de Comando_ (passando `--inspect-brk` para pausá-lo antes que qualquer módulo nativo seja carregado).
2. Inicie o Visual Studio 2017 em sua máquina de desenvolvimento.
3. Conectar ao dispositivo de destino selecionando _Debug > Attach to Process..._ e digite o endereço IP do dispositivo e o número da porta exibido pela ferramenta Visual Studio Depurador Remoto.
4. Clique em _Atualizar_ e selecione o [processo do Electron apropriado para anexar](../development/debug-instructions-windows.md).
5. Você pode precisar ter certeza de que quaisquer símbolos para módulos nativos no seu aplicativo estão carregados corretamente. Para configurar isso, vá para _Depurar > Opções..._ no Visual Studio 2017, e adicione as pastas que contém seu `. db` símbolos sob _depuração > Símbolos_.
6. Uma vez anexados, defina quaisquer pontos de interrupção apropriados e retome a execução do JavaScript usando as [ferramentas remotas do Chrome para o Node](debugging-main-process.md).

## Obter ajuda adicional

Se você encontrar um problema com esta documentação, ou se seu aplicativo funciona quando compilado para x86, mas não para arm64, por favor [registre um problema](../development/issues.md) com "Windows on Arm" no título.
