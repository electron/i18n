# Depuração no Windows

Se experimentar falhas ou problemas no Electron que acredita que não são causados pelo seu aplicativo de JavaScript, mas devido ao próprio Electron, a depuração pode ser um pouco complicada, especialmente para os desenvolvedores que não usam a depuração nativa/C++. No entanto, usando o Visual Studio, o servidor símbolo hospedado da Electron, e o código-fonte Electron, você pode habilitar a depuração passo-a-passo com pontos de interrupção dentro do código fonte da Electron.

**Veja também**: Há uma riqueza de informações sobre depuração do Cromo, muitos dos quais também se aplicam à Electron, no site de desenvolvedores do Chromium: [Debugging Chromium no Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## Requisitos

* **Depurar uma compilação de Electron**: A maneira mais fácil é normalmente construí-lo você mesmo, usando as ferramentas e os pré-requisitos listados na [construir instruções para Windows](build-instructions-windows.md). Embora você possa anexar e depurar Electron como você pode baixá-lo diretamente, você descobrirá que ele é fortemente otimizado, tornando a depuração substancialmente mais difícil: O depurador não será capaz de mostrar-lhe o conteúdo de todas as variáveis e o caminho de execução pode parecer estranho por causa da inlinação, chamadas de cauda e outras otimizações do compilador.

* **Visual Studio com ferramentas C++**: As edições de comunidade livre de Visual Studio de 2013 e Visual Studio 2015, ambos trabalham. Uma vez instalado, [configurar o Visual Studio para usar o servidor Símbolo da Electron](setting-up-symbol-server.md). Permitirá que o Visual Studio obtenha uma melhor compreensão do que acontece dentro de Electron, tornando mais fácil para apresentar as variáveis num formato legível.

* ****ProcMon : A ferramenta SysInternals [gratuita][sys-internals] permite inspecionar parâmetros de processos, alças de arquivo e operações de registro.

## Anexar e depurar o Electron

Para iniciar uma sessão de depuração, abrá CMD/PowerShell e execute a sua compilação para depuração do Electron, usando o aplicativo para abrir como um parâmetro.

```powershell
$ ./out/Testing/electron.exe ~/my-electron-app/
```

### Definir pontos de interrupção

Em seguida, abra o Visual Studio. O Electron não é construído com o Visual Studio e, portanto, não contém um arquivo de projeto - você pode, no entanto, abrir os arquivos de código-fonte "Como Arquivo", o que significa que o Visual Studio irá abri-los sozinho. Você pode ainda definir pontos de interrupção - o Visual Studio descobrirá automaticamente que o código-fonte corresponde ao código em execução no processo anexado e quebra de acordo.

Arquivos de código relevantes podem ser encontrados em `./shell/`.

### Anexar

Você pode anexar o depurador do Visual Studio a um processo de execução em um computador remoto local ou . Após a execução do processo, clique em Depurar / Anexar ao processo (ou pressione `CTRL+ALT+P`) para abrir a caixa de diálogo "Anexar ao Processo". Você pode usar esse recurso para depurar aplicativos que estão sendo executados em um computador local ou remoto, depurar vários processos simultaneamente.

Se a Electron estiver sendo executado em uma conta de usuário diferente, selecione a `Show processes from all users` caixa de seleção. Observe que, dependendo de quantas BrowserWindows seu aplicativo abriu, você verá vários processos. Um aplicativo típico de de uma janela resultará em Visual Studio apresentando-lhe duas entradas `Electron.exe` - uma para o processo principal e outra para o processo de renderização . Como a lista só lhe dá nomes, atualmente não há uma maneira confiável de descobrir qual é qual.

### A que processo devo me anexar?

O código executado dentro do processo principal (ou seja, código encontrado ou eventualmente executado pelo seu arquivo JavaScript principal) será executado dentro do processo principal, enquanto outros códigos serão executados dentro de seu respectivo processo de renderização.

Você pode ser anexado a vários programas quando estiver depurando, mas apenas um programa está ativo no depurador a qualquer momento. Você pode definir o do programa ativo na barra de ferramentas `Debug Location` ou na `Processes window`.

## Usando o ProcMon para observar um processo

Embora o Visual Studio seja fantástico para inspecionar caminhos específicos de código, a força do ProcMon está realmente em observar tudo o que seu aplicativo está fazendo com o sistema operacional - ele captura Arquivo, Registro, Rede, Processo e Perfil detalhes dos processos. Ele tenta registrar **todos os eventos** que ocorrem e pode ser bastante avassalador, mas se você busca entender o que e como sua aplicação está fazendo com o sistema operacional, pode ser um recurso valioso.

Para uma introdução aos recursos básicos e avançados de depuração do ProcMon, vá verificar [este tutorial de vídeo][procmon-instructions] fornecido pela Microsoft.

[sys-internals]: https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx
[procmon-instructions]: https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor
